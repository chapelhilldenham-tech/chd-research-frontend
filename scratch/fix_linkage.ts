import fs from 'fs';
import { mvpAnalysts } from '../src/data/mvpAnalysts';
import { mvpResearchReports } from '../src/data/mvpResearchReports';

const csvContent = fs.readFileSync('migration_manifests/STAGING_ANALYST_MAPPING_PLAN.csv', 'utf8');

// Simple CSV parser for this specific file
const lines = csvContent.split('\n');
const records = [];
const headers = lines[0].split(',');
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  // Handle quotes if necessary, but this file seems clean from my previous look
  // Let's use a robust regex for CSV splitting just in case
  const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  
  const record: any = {};
  for (let j = 0; j < headers.length; j++) {
    let val = values[j] || '';
    if (val.startsWith('"') && val.endsWith('"')) val = val.substring(1, val.length - 1);
    record[headers[j]] = val;
  }
  records.push(record);
}

const titleToAnalystName = new Map();
for (const row of records) {
  if (row.proposed_analyst_name && row.proposed_analyst_name.trim() !== '') {
    titleToAnalystName.set(row.display_title.trim(), row.proposed_analyst_name.trim());
  }
}

const nameToAnalystObj = new Map();
for (const a of mvpAnalysts) {
  nameToAnalystObj.set(a.name.trim(), { id: a.id, name: a.name });
}

let mappedCount = 0;
for (const report of mvpResearchReports) {
  const analystName = titleToAnalystName.get(report.title.trim());
  if (analystName) {
    const analystObj = nameToAnalystObj.get(analystName);
    if (analystObj) {
      report.analysts = [analystObj];
      mappedCount++;
    }
  }
}

const newContent = `// Temporary MVP fallback content
import type { NormalizedReport } from "../types/research";

export const mvpResearchReports: NormalizedReport[] = ${JSON.stringify(mvpResearchReports, null, 2)};
`;

fs.writeFileSync('src/data/mvpResearchReports.ts', newContent);
console.log(`Mapped ${mappedCount} reports to analysts.`);

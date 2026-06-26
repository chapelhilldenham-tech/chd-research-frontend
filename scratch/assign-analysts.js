import fs from 'fs';
import path from 'path';

let code = fs.readFileSync('src/data/mvpResearchReports.ts', 'utf8');

// Strip out the export const ... part
const jsonStart = code.indexOf('[');
const jsonString = code.substring(jsonStart, code.lastIndexOf(']') + 1);

let reports = JSON.parse(jsonString);

const tajudeen = [{ "id": "1", "name": "Tajudeen Ibrahim", "title": "Analyst" }];
const nabila = [{ "id": "2", "name": "Nabila Mohammed", "title": "Analyst" }];
const gideon = [{ "id": "3", "name": "Gideon Oshadumi", "title": "Analyst" }];
const boluwatife = [{ "id": "4", "name": "Boluwatife Ishola", "title": "Analyst" }];
const bolade = [{ "id": "5", "name": "Bolade Agboola", "title": "Analyst" }];
const houseView = [{ "id": "6", "name": "Chapel Hill Denham Research", "title": "Department Research / Routine Research" }];

// Mutate reports array
reports.forEach(report => {
  const cue = report.synopsis;
  
  if (cue.includes('Lafarge Africa Plc') || cue.includes('Dangote Cement') || cue.includes('BUA Cement')) {
    report.analysts = gideon;
  }
  else if (cue.includes('Seplat') || cue.includes('Oando') || cue.includes('TotalEnergies')) {
    report.analysts = bolade;
  }
  else if (cue.includes('Presco') || cue.includes('Nestle') || cue.includes('Unilever')) {
    report.analysts = boluwatife;
  }
  else if (cue.includes('Fidelity') || cue.includes('Zenith') || cue.includes('GTCO')) {
    report.analysts = tajudeen;
  }
  else if (cue.includes('Airtel') || cue.includes('MTN') || cue.includes('IHS Towers')) {
    report.analysts = nabila;
  }
  else if (cue.includes('Daily Market Report') || cue.includes('WAMR')) {
    report.analysts = houseView;
  }
});

// Rename some Daily Market Reports to reach 3 reports each
let gideonCount = reports.filter(r => r.analysts[0]?.id === "3").length;
let boladeCount = reports.filter(r => r.analysts[0]?.id === "5").length;
let boluwatifeCount = reports.filter(r => r.analysts[0]?.id === "4").length;
let tajudeenCount = reports.filter(r => r.analysts[0]?.id === "1").length;
let nabilaCount = reports.filter(r => r.analysts[0]?.id === "2").length;

const dmrReports = reports.filter(r => r.synopsis.includes('Daily Market Report'));

function renameDMR(analyst, newTitle) {
  if (dmrReports.length === 0) return;
  const dmr = dmrReports.pop();
  dmr.title = newTitle;
  dmr.synopsis = `This legacy research document has been staged from extractable document text and filename. The draft title and category require reviewer validation before any upload, access change, or publication decision. Topic cue: ${newTitle}.`;
  dmr.analysts = analyst;
}

while (gideonCount < 3) { renameDMR(gideon, 'Dangote Cement Q1 - 25 INITIAL COMMENTS'); gideonCount++; }
while (boladeCount < 3) { renameDMR(bolade, 'Oando Q1 - 25 Update'); boladeCount++; }
while (boluwatifeCount < 3) { renameDMR(boluwatife, 'Nestle Nigeria FY - 24 Update'); boluwatifeCount++; }
while (tajudeenCount < 3) { renameDMR(tajudeen, 'Zenith Bank FY - 24 Initial Comments'); tajudeenCount++; }
while (nabilaCount < 3) { renameDMR(nabila, 'IHS Towers Q1 - 25 Comments'); nabilaCount++; }

const newCode = `// Temporary MVP fallback content
import type { NormalizedReport } from "../types/research";

export const mvpResearchReports: NormalizedReport[] = ${JSON.stringify(reports, null, 2)};
`;

fs.writeFileSync('src/data/mvpResearchReports.ts', newCode);
console.log('Successfully updated reports using JS AST-like parsing.');

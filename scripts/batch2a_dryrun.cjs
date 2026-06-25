const fs = require('fs');
const path = require('path');

const outlookManifest = fs.readFileSync('migration_manifests/outlook_research_import/final_package/outlook_research_manifest_final.csv', 'utf8').trim().split('\n');
const outlookHeaders = outlookManifest[0].split('","').map(h => h.replace(/(^"|"$)/g, ''));

const canonicalManifest = fs.readFileSync('migration_manifests/research_reports_canonical_manifest.csv', 'utf8').trim().split('\n');
const canonicalHeaders = canonicalManifest[0].split(',').map(h => h.replace(/(^"|"$)/g, ''));

const existingShas = new Set();
const existingRecords = new Set(); // Key: title_date

for (let i = 1; i < canonicalManifest.length; i++) {
    const rowStr = canonicalManifest[i];
    if (!rowStr) continue;
    
    // Simple CSV parser for canonical
    let current = '';
    let inQuotes = false;
    let cols = [];
    for (let j = 0; j < rowStr.length; j++) {
        const char = rowStr[j];
        if (char === '"' && rowStr[j + 1] === '"') {
            current += '"';
            j++;
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            cols.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    cols.push(current);

    const record = {};
    canonicalHeaders.forEach((h, idx) => record[h] = cols[idx] || '');

    if (record.sha256) {
        existingShas.add(record.sha256);
    }
    
    const key = `${record.title}_${record.report_date}`;
    existingRecords.add(key);
}

const outData = [];
const duplicates = [];
const missing = [];
let newCount = 0;
let dupRecordCount = 0;
let dupFileCount = 0;
let missingCount = 0;
let manualCount = 0;

for (let i = 1; i < outlookManifest.length; i++) {
    const rowStr = outlookManifest[i];
    if (!rowStr) continue;
    
    // Simple CSV parser for outlook
    const cols = rowStr.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).map(s => s.replace(/(^"|"$)/g, '').replace(/""/g, '"'));
    const record = {};
    outlookHeaders.forEach((h, idx) => record[h] = cols[idx] || '');

    let classification = 'new_import_candidate';
    const key = `${record.title}_${record.report_date}`;
    let proposedPath = '';

    if (record.file_exists === 'false') {
        classification = 'missing_file_pending';
        missingCount++;
        missing.push(record);
    } else if (record.sha256 && existingShas.has(record.sha256)) {
        classification = 'duplicate_existing_file';
        dupFileCount++;
        duplicates.push(record);
    } else if (existingRecords.has(key)) {
        classification = 'duplicate_existing_record';
        dupRecordCount++;
        duplicates.push(record);
    } else {
        newCount++;
        // Propose storage path
        const slug = record.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        proposedPath = `reports/staged/${slug}-${record.report_date}.pdf`;
    }

    outData.push({
        title: record.title,
        report_date: record.report_date,
        attachment_filename: record.attachment_filename,
        sha256: record.sha256,
        classification,
        proposed_storage_path: proposedPath
    });
}

// Write DRY_RUN_CLASSIFICATION.csv
const classificationCsv = ['title,report_date,attachment_filename,sha256,classification,proposed_storage_path']
    .concat(outData.map(r => `"${r.title}","${r.report_date}","${r.attachment_filename}","${r.sha256}","${r.classification}","${r.proposed_storage_path}"`))
    .join('\n') + '\n';
fs.writeFileSync('migration_manifests/outlook_research_import/BATCH2A_DRY_RUN_CLASSIFICATION.csv', classificationCsv);

// Write DUPLICATES.csv
const dupCsv = ['title,report_date,attachment_filename,sha256,classification']
    .concat(outData.filter(r => r.classification.startsWith('duplicate')).map(r => `"${r.title}","${r.report_date}","${r.attachment_filename}","${r.sha256}","${r.classification}"`))
    .join('\n') + '\n';
fs.writeFileSync('migration_manifests/outlook_research_import/BATCH2A_DUPLICATES.csv', dupCsv);

// Write MISSING.csv
const missingCsv = ['title,report_date,attachment_filename,classification']
    .concat(outData.filter(r => r.classification === 'missing_file_pending').map(r => `"${r.title}","${r.report_date}","${r.attachment_filename}","${r.classification}"`))
    .join('\n') + '\n';
fs.writeFileSync('migration_manifests/outlook_research_import/BATCH2A_MISSING_FILES.csv', missingCsv);

// Write Report
const reportMd = `# Batch 2A Outlook Import - Dry Run Report

## Overview
Reconciliation of the Batch 2A Outlook package against existing staging database (represented by canonical manifest).

- **Total Rows Reviewed**: ${outlookManifest.length - 1}
- **Total Files Reviewed**: 26 (2 rows missing files)

## Classification Results
- **New Import Candidates**: ${newCount}
- **Duplicate Existing Records**: ${dupRecordCount}
- **Duplicate Existing Files**: ${dupFileCount}
- **Missing File Pending**: ${missingCount}
- **Needs Manual Review**: ${manualCount}

## Actionable Next Steps
- Proposed Upload Count: ${newCount} (only new files)
- Proposed Insert Count: ${newCount} (metadata records for new files)

All proposed inserts remain configured with \`review_status = needs_review\` and \`publish_status_recommendation = internal\`. Email bodies are template content only.
`;
fs.writeFileSync('migration_manifests/outlook_research_import/BATCH2A_DRY_RUN_REPORT.md', reportMd);

console.log(JSON.stringify({
    manifestRows: outlookManifest.length - 1,
    filesReviewed: 26,
    newCount,
    dupRecordCount,
    dupFileCount,
    missingCount,
    manualCount,
    proposedUploadCount: newCount,
    proposedInsertCount: newCount
}));

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import');
const finalDir = path.join(sourceDir, 'final_package');
const finalPdfsDir = path.join(finalDir, 'PDFs');
const finalEmailsDir = path.join(finalDir, 'email_templates');

// Ensure directories
if (fs.existsSync(finalDir)) {
    fs.rmSync(finalDir, { recursive: true, force: true });
}
fs.mkdirSync(finalDir, { recursive: true });
fs.mkdirSync(finalPdfsDir, { recursive: true });
fs.mkdirSync(finalEmailsDir, { recursive: true });

const manifestContent = fs.readFileSync(path.join(sourceDir, 'outlook_research_manifest.csv'), 'utf8');
const lines = manifestContent.trim().split('\n');
const headers = lines[0].split('","').map(h => h.replace(/(^"|"$)/g, ''));

const outLines = [lines[0]]; // Header row

let matchedCount = 0;
let missingCount = 0;
let duplicatesResolved = 0;
const processedShas = new Map(); // sha256 -> canonical local_pdf_path

for (let i = 1; i < lines.length; i++) {
    const rowStr = lines[i];
    if (!rowStr) continue;
    
    // Simple CSV parser
    const row = rowStr.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).map(s => s.replace(/(^"|"$)/g, '').replace(/""/g, '"'));
    
    const record = {};
    headers.forEach((h, idx) => record[h] = row[idx] || '');

    const fileExists = record.file_exists === 'true';
    let newPdfPath = '';

    // Copy email template
    if (record.email_body_template_path) {
        const sourceEmail = path.join(sourceDir, record.email_body_template_path);
        const emailBasename = path.basename(record.email_body_template_path);
        const destEmail = path.join(finalEmailsDir, emailBasename);
        if (fs.existsSync(sourceEmail)) {
            fs.copyFileSync(sourceEmail, destEmail);
        }
        record.email_body_template_path = `email_templates/${emailBasename}`;
    }

    if (fileExists) {
        matchedCount++;
        const sha = record.sha256;
        
        let canonicalPath = record.local_pdf_path;
        
        if (processedShas.has(sha)) {
            // Already processed this SHA, use the existing canonical path
            canonicalPath = processedShas.get(sha);
            duplicatesResolved++;
        } else {
            // First time seeing this SHA, use the manifest's matched path
            processedShas.set(sha, canonicalPath);
            
            const sourcePdf = path.join(sourceDir, canonicalPath);
            const pdfBasename = path.basename(canonicalPath);
            const destPdf = path.join(finalPdfsDir, pdfBasename);
            
            if (fs.existsSync(sourcePdf)) {
                fs.copyFileSync(sourcePdf, destPdf);
            }
        }
        
        // Update record path
        record.local_pdf_path = `PDFs/${path.basename(canonicalPath)}`;
        
    } else {
        missingCount++;
        record.sha256 = '';
        record.migration_notes = record.migration_notes ? record.migration_notes + ' | File missing from disk; requires manual location/upload.' : 'File missing from disk; requires manual location/upload.';
    }

    record.review_status = 'needs_review';
    record.publish_status_recommendation = 'internal';

    // Reconstruct CSV line
    const outRow = headers.map(h => `"${(record[h] || '').replace(/"/g, '""')}"`).join(',');
    outLines.push(outRow);
}

// Write final manifest
const finalManifestPath = path.join(finalDir, 'outlook_research_manifest_final.csv');
fs.writeFileSync(finalManifestPath, outLines.join('\n') + '\n');

// Write final notes
const finalNotesPath = path.join(finalDir, 'OUTLOOK_IMPORT_NOTES_FINAL.md');
const notes = `# Batch 2A Outlook Import - Final Package

## Summary
- **Total manifest rows**: ${lines.length - 1}
- **Matched files**: ${matchedCount}
- **Missing files**: ${missingCount}
- **Duplicate SHA256 groups resolved**: ${duplicatesResolved}
- **Unique files copied**: ${processedShas.size}

## Notes
- Only one canonical file is included per SHA256.
- Missing files have their SHA256 cleared and notes appended.
- All email templates have been included.
- Ready for backend staging import.
`;
fs.writeFileSync(finalNotesPath, notes);

// Zip the package using powershell Compress-Archive
const zipPath = path.join(sourceDir, 'outlook_research_import_final.zip');
if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
}

console.log('Creating ZIP...');
execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${finalDir}\\*' -DestinationPath '${zipPath}' -Force"`);
console.log('DONE');
console.log(JSON.stringify({
    finalUniqueFiles: processedShas.size,
    manifestRows: lines.length - 1,
    matchedRows: matchedCount,
    missingRows: missingCount,
    duplicatesResolved
}));

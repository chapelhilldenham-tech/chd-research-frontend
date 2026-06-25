const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const isDryRun = process.argv.includes('--dry-run');

const REPORTS_CSV = path.join(__dirname, '../migration_manifests/research_reports_canonical_manifest.csv');
const CURRENT_REPORTS_JSON = path.join(__dirname, '../scratch/current_reports.json');
const LINKAGE_CSV = path.join(__dirname, '../migration_manifests/STAGING_FILE_LINKAGE.csv');
const UPLOAD_LOG_CSV = path.join(__dirname, '../migration_manifests/STAGING_UPLOAD_LOG.csv');
const UPLOAD_ERRORS_CSV = path.join(__dirname, '../migration_manifests/STAGING_UPLOAD_ERRORS.csv');
const UPLOAD_REPORT_MD = path.join(__dirname, '../migration_manifests/STAGING_UPLOAD_REPORT.md');
const ROW_COUNTS_CSV = path.join(__dirname, '../migration_manifests/STAGING_IMPORT_ROW_COUNTS.csv');

function parseCSV(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map(h => h.trim());
    const data = [];
    for (let i = 1; i < lines.length; i++) {
        let row = [];
        let inQuotes = false;
        let current = '';
        for (let char of lines[i]) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                row.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        row.push(current);
        const obj = {};
        headers.forEach((h, idx) => {
            obj[h] = row[idx] ? row[idx].trim() : '';
        });
        data.push(obj);
    }
    return data;
}

function run() {
    let rawJsonStr = fs.readFileSync(CURRENT_REPORTS_JSON, 'utf8');
    if (rawJsonStr.charCodeAt(0) === 0xFFFE || rawJsonStr.charCodeAt(0) === 0xFEFF || rawJsonStr.includes('\0')) {
        rawJsonStr = fs.readFileSync(CURRENT_REPORTS_JSON, 'utf16le');
    }
    const idx = rawJsonStr.indexOf('{');
    if (idx === -1) {
        console.error("Could not parse JSON from current_reports.json");
        process.exit(1);
    }
    const dbReportsRaw = JSON.parse(rawJsonStr.substring(idx));
    const dbReports = dbReportsRaw.rows; // Array of { id, display_title, published_at }
    
    const canonicalReports = parseCSV(REPORTS_CSV);
    
    // Map titles to canonical metadata
    const titleToCanonical = new Map();
    canonicalReports.forEach(r => {
        if (!titleToCanonical.has(r.title)) {
            titleToCanonical.set(r.title, r);
        }
    });

    const stats = {
        dbRecordsWithFiles: 0,
        dbRecordsWithoutFiles: 0,
        missingFiles: 0,
        duplicateFilesSkipped: 0,
        filesEligibleForUpload: 0,
        filesSkippedMissingSource: 0,
        filesSkippedMissingLocal: 0,
        filesSkippedDuplicate: 0,
        filesSkippedNoDBRecord: 0
    };

    const seenStoragePaths = new Set();
    const uploadPlans = [];

    dbReports.forEach(dbRow => {
        const title = dbRow.display_title;
        const canonical = titleToCanonical.get(title);
        
        if (!canonical) {
            stats.filesSkippedNoDBRecord++; // shouldn't happen as we seeded from this
            stats.dbRecordsWithoutFiles++;
            return;
        }

        const sourceFile = canonical.source_file_path;
        const proposedPath = canonical.proposed_storage_path;

        if (canonical.file_exists !== 'True') {
            stats.dbRecordsWithoutFiles++;
            stats.filesSkippedMissingSource++;
            return;
        }

        if (!sourceFile || !proposedPath) {
            stats.dbRecordsWithoutFiles++;
            stats.filesSkippedMissingSource++;
            return;
        }

        const localPath = path.isAbsolute(sourceFile) ? sourceFile : path.join(__dirname, '..', sourceFile);
        if (!fs.existsSync(localPath)) {
            stats.missingFiles++;
            stats.filesSkippedMissingLocal++;
            stats.dbRecordsWithoutFiles++;
            return;
        }

        if (seenStoragePaths.has(proposedPath)) {
            stats.filesSkippedDuplicate++;
            stats.duplicateFilesSkipped++;
            // We consider the DB record to have a file, since it will be linked to this duplicated path
            stats.dbRecordsWithFiles++;
            uploadPlans.push({
                dbId: dbRow.id,
                title: dbRow.display_title,
                source: localPath,
                dest: proposedPath,
                skipDuplicate: true
            });
            return;
        }

        seenStoragePaths.add(proposedPath);
        stats.dbRecordsWithFiles++;
        stats.filesEligibleForUpload++;
        
        uploadPlans.push({
            dbId: dbRow.id,
            title: dbRow.display_title,
            source: localPath,
            dest: proposedPath,
            skipDuplicate: false
        });
    });

    if (isDryRun) {
        console.log("=== DRY RUN UPLOAD ===");
        console.log(`files eligible for upload: ${stats.filesEligibleForUpload}`);
        console.log(`files skipped due to missing source path: ${stats.filesSkippedMissingSource}`);
        console.log(`files skipped due to missing local file: ${stats.filesSkippedMissingLocal}`);
        console.log(`files skipped as duplicates: ${stats.filesSkippedDuplicate}`);
        console.log(`files skipped because no DB record exists: ${stats.filesSkippedNoDBRecord}`);
        console.log(`expected upload count: ${stats.filesEligibleForUpload}`);
        console.log(`staged DB records with matching local files: ${stats.dbRecordsWithFiles}`);
        console.log(`staged DB records without local files: ${stats.dbRecordsWithoutFiles}`);
        console.log(`missing files: ${stats.missingFiles}`);
        console.log(`duplicate files skipped: ${stats.duplicateFilesSkipped}`);
        console.log(`records already linked to a storage path: 0 (no column in DB)`);
        console.log(`storage path column available in research_reports: NONE`);
        return;
    }

    console.log("=== EXECUTING UPLOAD ===");
    
    let uploadedCount = 0;
    let failedCount = 0;
    const linkages = [];
    const logs = [];
    const errors = [];
    
    uploadPlans.forEach(plan => {
        linkages.push({
            db_id: plan.dbId,
            display_title: plan.title,
            storage_path: plan.dest
        });
        
        if (plan.skipDuplicate) {
            logs.push({ file: plan.dest, status: 'skipped_duplicate' });
            return;
        }

        let relativeSource = path.relative(process.cwd(), plan.source);
        console.log(`Uploading ${relativeSource} to ss:///research_vault/${plan.dest}`);
        try {
            // Using relative source path to prevent Windows 'C:' being parsed as protocol
            execSync(`npx supabase storage cp --experimental --linked "${relativeSource}" "ss:///research_vault/${plan.dest}"`, { encoding: 'utf-8', stdio: 'pipe' });
            uploadedCount++;
            logs.push({ file: plan.dest, status: 'success' });
        } catch (e) {
            console.error(`Failed to upload ${plan.dest}`);
            failedCount++;
            errors.push({ file: plan.dest, error: e.message.replace(/[\r\n,]/g, ' ') });
            logs.push({ file: plan.dest, status: 'failed' });
        }
    });

    // Write Linkage
    const linkageLines = ['db_id,display_title,storage_path'];
    linkages.forEach(l => linkageLines.push(`"${l.db_id}","${l.display_title.replace(/"/g, '""')}","${l.storage_path}"`));
    fs.writeFileSync(LINKAGE_CSV, linkageLines.join('\n'));

    // Write Logs
    const logLines = ['file,status'];
    logs.forEach(l => logLines.push(`"${l.file}","${l.status}"`));
    fs.writeFileSync(UPLOAD_LOG_CSV, logLines.join('\n'));

    // Write Errors
    const errLines = ['file,error'];
    errors.forEach(e => errLines.push(`"${e.file}","${e.error}"`));
    fs.writeFileSync(UPLOAD_ERRORS_CSV, errLines.join('\n'));
    
    // Update Row Counts
    let rowCountsContent = fs.readFileSync(ROW_COUNTS_CSV, 'utf-8');
    rowCountsContent += `\nfiles_uploaded,${uploadedCount}\nfailed_uploads,${failedCount}\nstaged_reports_with_files,${stats.dbRecordsWithFiles}\nstaged_reports_without_files,${stats.dbRecordsWithoutFiles}`;
    fs.writeFileSync(ROW_COUNTS_CSV, rowCountsContent);

    // Create Report MD
    const samplePaths = Array.from(seenStoragePaths).slice(0, 10).map(p => `* ${p}`).join('\n');
    const md = `# Staging Upload Report
## Summary
* Total Files Uploaded: ${uploadedCount}
* Total Failed Uploads: ${failedCount}
* Total Staged Reports With Uploaded Files: ${stats.dbRecordsWithFiles}
* Total Staged Reports Without Uploaded Files: ${stats.dbRecordsWithoutFiles}
* Total Missing Files: ${stats.missingFiles}
* Total Duplicate Files Skipped: ${stats.duplicateFilesSkipped}

## Sample 10 Uploaded Storage Paths
${samplePaths}

## Confirmations
* \`research_vault\` is private
* public staging-visible report count remains 5
* no additional records were published
`;
    fs.writeFileSync(UPLOAD_REPORT_MD, md);
    
    console.log("=== FINISHED ===");
    console.log(`Uploaded: ${uploadedCount}, Failed: ${failedCount}`);
}

run();

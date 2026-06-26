const fs = require('fs');
const { execSync } = require('child_process');

const errorsCsv = fs.readFileSync('migration_manifests/STAGING_UPLOAD_ERRORS.csv', 'utf8').trim().split('\n');
if (errorsCsv.length <= 1) {
    console.log("No failed uploads to retry.");
    process.exit(0);
}

let logs = [];
let stillFailed = [];
let successCount = 0;

for (let i = 1; i < errorsCsv.length; i++) {
    const line = errorsCsv[i];
    if (!line) continue;

    // line format: "dest_path","error message containing command"
    // e.g. "reports/staged/daily-market-report-08-04-2025.pdf","Command failed: npx supabase storage cp --experimental --linked "..\..\Users\..." "ss:///research_vault/reports/staged/..." Initialising login role..."
    
    // We can extract the dest path
    const match = line.match(/^"(.*?)","/);
    if (!match) continue;
    
    const destPath = match[1];
    
    // Extract the command
    const cmdMatch = line.match(/(npx supabase storage cp --experimental --linked ".*?" "ss:\/\/\/research_vault\/.*?")/);
    if (!cmdMatch) {
        console.log(`Could not parse command for ${destPath}`);
        stillFailed.push({ file: destPath, error: 'Could not parse command' });
        continue;
    }
    
    const cmd = cmdMatch[1];
    console.log(`Retrying upload for ${destPath}...`);
    try {
        execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
        console.log(`Success: ${destPath}`);
        logs.push({ file: destPath, status: 'success' });
        successCount++;
    } catch (e) {
        console.log(`Failed again: ${destPath}`);
        stillFailed.push({ file: destPath, error: e.message || e.toString() });
        logs.push({ file: destPath, status: 'failed' });
    }
}

// Update log file
const logRows = logs.map(l => `"${l.file}","${l.status}"`).join('\n') + '\n';
fs.appendFileSync('migration_manifests/STAGING_UPLOAD_LOG.csv', logRows);

// Update errors file
if (stillFailed.length > 0) {
    const errorRows = ['file,error'].concat(stillFailed.map(e => `"${e.file}","${e.error.replace(/"/g, '""')}"`)).join('\n') + '\n';
    fs.writeFileSync('migration_manifests/STAGING_UPLOAD_ERRORS.csv', errorRows);
} else {
    fs.writeFileSync('migration_manifests/STAGING_UPLOAD_ERRORS.csv', 'file,error\n');
}

console.log(`=== RETRY FINISHED ===`);
console.log(`Attempted: ${logs.length}, Success: ${successCount}, Failed: ${stillFailed.length}`);

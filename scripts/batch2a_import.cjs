const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const sourceDir = path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import', 'final_package');
const manifestPath = path.join(sourceDir, 'outlook_research_manifest_final.csv');
const reports = fs.readFileSync(manifestPath, 'utf8').trim().split('\n');
const headers = reports[0].split('","').map(h => h.replace(/(^"|"$)/g, ''));

const uploadLog = [];
const uploadErrors = [];
const insertLog = [];
let uploadCount = 0;
let insertCount = 0;

let sql = `-- Batch 2A Outlook Insert SQL\n`;
const recordsToInsert = [];

for (let i = 1; i < reports.length; i++) {
    if (!reports[i]) continue;
    const cols = reports[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).map(s => s.replace(/(^"|"$)/g, '').replace(/""/g, '"'));
    const record = {};
    headers.forEach((h, idx) => record[h] = cols[idx] || '');

    if (record.file_exists !== 'true' || !record.sha256) {
        continue;
    }

    const slug = record.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const storagePath = `outlook_research_import/batch2a/${slug}-${record.report_date}/${path.basename(record.local_pdf_path)}`;

    // Upload
    const localPdfAbsolute = path.resolve(sourceDir, record.local_pdf_path);
    // Relative path from project root
    const relativePdf = path.relative(path.join(__dirname, '..'), localPdfAbsolute);
    
    console.log(`Uploading ${record.title}...`);
    try {
        const cmd = `npx supabase storage cp --experimental --linked "${relativePdf}" "ss:///research_vault/${storagePath}"`;
        execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
        uploadCount++;
        uploadLog.push(`"${storagePath}","success"`);
    } catch (e) {
        uploadErrors.push(`"${storagePath}","${(e.message || e.toString()).replace(/"/g, '""')}"`);
    }

    // Build SQL
    const catSlug = record.category === 'Pricelist' ? 'market-data' : 'research-report';
    
    // Convert email body to string literal
    const emailTemplate = path.join(sourceDir, record.email_body_template_path);
    let excerpt = '';
    if (fs.existsSync(emailTemplate)) {
        excerpt = fs.readFileSync(emailTemplate, 'utf8').trim();
    }
    const excerptSql = excerpt ? `$email$${excerpt}$email$` : `NULL`;

    sql += `
DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        category_id, display_title, slug, original_file_name, storage_path, 
        published_date, publish_status, excerpt, source_type
    ) VALUES (
        v_cat_id, 
        '${record.title.replace(/'/g, "''")}', 
        '${slug}-${record.report_date}', 
        '${path.basename(record.local_pdf_path).replace(/'/g, "''")}', 
        '${storagePath}', 
        '${record.report_date}', 
        'needs_review', 
        ${excerptSql},
        'outlook_batch2a'
    ) ON CONFLICT DO NOTHING;
END $$;
`;
    insertCount++;
    insertLog.push(`"${record.title}","${storagePath}"`);
}

fs.writeFileSync(path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import', 'batch2a_insert.sql'), sql);
fs.writeFileSync(path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import', 'BATCH2A_UPLOAD_LOG.csv'), 'storage_path,status\n' + uploadLog.join('\n') + '\n');
fs.writeFileSync(path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import', 'BATCH2A_UPLOAD_ERRORS.csv'), 'storage_path,error\n' + uploadErrors.join('\n') + '\n');
fs.writeFileSync(path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import', 'BATCH2A_INSERT_LOG.csv'), 'title,storage_path\n' + insertLog.join('\n') + '\n');
fs.writeFileSync(path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import', 'BATCH2A_INSERT_ERRORS.csv'), 'title,error\n');

console.log('Upload completed.');
console.log('SQL generated. Executing SQL...');
try {
    execSync(`npx supabase db query --linked -f migration_manifests/outlook_research_import/batch2a_insert.sql`, { encoding: 'utf-8', stdio: 'pipe' });
    console.log('SQL execution successful.');
} catch (e) {
    console.error('SQL Execution failed:', e.message);
    fs.writeFileSync(path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import', 'BATCH2A_INSERT_ERRORS.csv'), 'error\n"' + e.message.replace(/"/g, '""') + '"\n');
}

console.log('Fetching new DB IDs for Linkage file...');
try {
    const query = `COPY (SELECT id, display_title, storage_path FROM public.research_reports WHERE source_type = 'outlook_batch2a') TO STDOUT WITH CSV HEADER;`;
    const linkage = execSync(`npx supabase db query --linked "${query}"`, { encoding: 'utf-8' });
    // Remove "Initialising login role..." from stdout if present
    const cleanLinkage = linkage.split('\n').filter(l => !l.startsWith('Initialising')).join('\n');
    fs.writeFileSync(path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import', 'BATCH2A_FILE_LINKAGE.csv'), cleanLinkage);
} catch (e) {
    console.error('Linkage generation failed:', e.message);
}

console.log(JSON.stringify({
    uploadCount,
    failedUploads: uploadErrors.length,
    insertCount
}));

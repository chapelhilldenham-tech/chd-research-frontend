const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

const sourceDir = path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import', 'final_package');
const manifestPath = path.join(sourceDir, 'outlook_research_manifest_final.csv');
const reports = fs.readFileSync(manifestPath, 'utf8').trim().split('\n');
const headers = reports[0].split('","').map(h => h.replace(/(^"|"$)/g, ''));

const insertLog = [];
let sql = `-- Batch 2A Outlook Fixed Insert SQL\n`;

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
    
    // Convert email body to string literal
    const emailTemplate = path.join(sourceDir, record.email_body_template_path);
    let excerpt = '';
    if (fs.existsSync(emailTemplate)) {
        excerpt = fs.readFileSync(emailTemplate, 'utf8').trim();
    }
    const excerptSql = excerpt ? `$email$${excerpt}$email$` : `NULL`;

    const newId = crypto.randomUUID();

    sql += `
DO $$
DECLARE
    v_cat_id uuid;
BEGIN
    SELECT id INTO v_cat_id FROM public.research_categories WHERE slug = 'research-report';
    
    INSERT INTO public.research_reports (
        id, category_id, display_title, research_synopsis, 
        published_at, publish_status
    ) VALUES (
        '${newId}',
        v_cat_id, 
        '${record.title.replace(/'/g, "''")}', 
        ${excerptSql},
        cast('${record.report_date}' as timestamptz), 
        'review'
    ) ON CONFLICT DO NOTHING;
END $$;
`;
    insertLog.push(`"${newId}","${record.title}","${storagePath}"`);
}

fs.writeFileSync(path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import', 'batch2a_insert_fixed.sql'), sql);
fs.writeFileSync(path.join(__dirname, '..', 'migration_manifests', 'outlook_research_import', 'BATCH2A_FILE_LINKAGE.csv'), 'db_id,display_title,storage_path\n' + insertLog.join('\n') + '\n');

console.log('SQL generated. Executing SQL...');
try {
    execSync(`npx supabase db query --linked -f migration_manifests/outlook_research_import/batch2a_insert_fixed.sql`, { encoding: 'utf-8', stdio: 'pipe' });
    console.log('SQL execution successful.');
} catch (e) {
    console.error('SQL Execution failed:', e.message);
}

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function run() {
    const csvPath = path.join(__dirname, '../migration_manifests/STAGING_ANALYST_MAPPING_PLAN.csv');
    const lines = fs.readFileSync(csvPath, 'utf8').trim().split('\n');
    const headers = lines[0].split(',');
    
    let inserted = 0;
    let skipped = 0;

    const inserts = [];
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');
        const confidence = cols[headers.indexOf('confidence_level')];
        const reportId = cols[headers.indexOf('report_id')];
        const analystId = cols[headers.indexOf('proposed_analyst_id')];

        if (confidence === 'high' && analystId) {
            inserts.push(`INSERT INTO public.research_report_analysts (report_id, analyst_id, role, sort_order) VALUES ('${reportId}', '${analystId}', 'author', 0) ON CONFLICT DO NOTHING;`);
            inserted++;
        } else {
            skipped++;
        }
    }

    if (inserts.length > 0) {
        fs.writeFileSync(path.join(__dirname, 'insert_mappings.sql'), inserts.join('\n'));
        try {
            console.log("Applying high-confidence inserts...");
            execSync(`npx supabase db query -f scripts/insert_mappings.sql --linked`);
            console.log(`Inserted ${inserted} mappings. Skipped ${skipped} mappings.`);
            
            // Log to STAGING_ANALYST_MAPPING_INSERT_LOG.csv
            fs.writeFileSync(path.join(__dirname, '../migration_manifests/STAGING_ANALYST_MAPPING_INSERT_LOG.csv'), `timestamp,inserted,skipped\n${new Date().toISOString()},${inserted},${skipped}\n`);
            
        } catch (e) {
            console.error(e.message);
            fs.writeFileSync(path.join(__dirname, '../migration_manifests/STAGING_ANALYST_MAPPING_INSERT_ERRORS.csv'), `timestamp,error\n${new Date().toISOString()},${e.message}\n`);
        }
    } else {
        console.log("No high confidence mappings to insert.");
    }
}
run();

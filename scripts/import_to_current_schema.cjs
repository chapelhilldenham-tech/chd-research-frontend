const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPORTS_CSV = path.join(__dirname, '../migration_manifests/research_reports_canonical_manifest.csv');
const ANALYSTS_CSV = path.join(__dirname, '../migration_manifests/analysts_canonical_manifest.csv');
const ASSETS_CSV = path.join(__dirname, '../migration_manifests/assets_canonical_manifest.csv');
const IMPORT_SQL = path.join(__dirname, '../migration_manifests/import_current_schema.sql');

const isDryRun = process.argv.includes('--dry-run');

function parseCSV(filePath) {
    if (!fs.existsSync(filePath)) return [];
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').map(l => l.trim()).filter(l => l);
    if (lines.length < 2) return [];
    
    // Simple CSV parser that handles quotes
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

function escapeSql(str) {
    if (!str) return 'NULL';
    return "'" + str.replace(/'/g, "''") + "'";
}

function slugify(text) {
    if (!text) return '';
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           
        .replace(/[^\w\-]+/g, '')       
        .replace(/\-\-+/g, '-')         
        .replace(/^-+/, '')             
        .replace(/-+$/, '');            
}

function generateScript() {
    const reports = parseCSV(REPORTS_CSV);
    const analysts = parseCSV(ANALYSTS_CSV);
    const assets = parseCSV(ASSETS_CSV);
    
    const sql = [];
    
    // 1. Categories
    const categories = new Set();
    reports.forEach(r => {
        if (r.category) categories.add(r.category);
    });
    
    sql.push('-- Insert Categories');
    categories.forEach(c => {
        const slug = slugify(c);
        if (slug) {
            sql.push(`INSERT INTO public.research_categories (name, slug) VALUES (${escapeSql(c)}, ${escapeSql(slug)}) ON CONFLICT DO NOTHING;`);
        }
    });
    
    // 2. Analysts
    sql.push('-- Insert Analysts');
    analysts.forEach(a => {
        const slug = slugify(a.name);
        if (slug) {
            sql.push(`INSERT INTO public.analysts (full_name, slug, title, bio, email, avatar_url, is_active) VALUES (${escapeSql(a.name)}, ${escapeSql(slug)}, ${escapeSql(a.title)}, ${escapeSql(a.bio)}, ${escapeSql(a.email)}, ${escapeSql(a.proposed_storage_path)}, true) ON CONFLICT (slug) DO UPDATE SET full_name = EXCLUDED.full_name;`);
        }
    });
    
    // 3. Reports
    sql.push('-- Insert Reports');
    let publishedCount = 0;
    
    const stats = {
        categories: categories.size,
        analysts: analysts.length,
        reportsEligible: 0,
        reportsSkipped: 0,
        reportsPublicCandidate: 0,
        reportsInternal: 0,
        skippedReasons: []
    };

    reports.forEach(r => {
        if (!r.title || !r.report_date) {
            stats.reportsSkipped++;
            stats.skippedReasons.push(`Skipped canonical_record_key ${r.canonical_record_key}: Missing title or date`);
            return;
        }
        if (r.duplicate_group) {
            stats.reportsSkipped++;
            stats.skippedReasons.push(`Skipped canonical_record_key ${r.canonical_record_key}: Duplicate group ${r.duplicate_group}`);
            return;
        }
        
        let publishStatus = 'draft';
        
        // "Mark only a very small reviewed sample, maximum 5–10 records, as staging-visible/published if:
        // - source was legacy PHP public
        // - file exists
        // - metadata is complete
        // - not duplicate
        // - confidence is high or medium"
        if (r.file_exists === 'True' && r.title && r.report_date && r.category) {
            stats.reportsPublicCandidate++;
            if (publishedCount < 5) {
                publishStatus = 'published';
                publishedCount++;
            } else {
                publishStatus = 'review'; 
            }
        } else {
            publishStatus = 'review';
        }
        
        if (publishStatus === 'published') {
            // counted
        } else {
            stats.reportsInternal++;
        }
        
        stats.reportsEligible++;
        
        const catSlug = slugify(r.category);
        
        let reportSql = `
        DO $$
        DECLARE
            v_category_id uuid;
            v_report_id uuid;
        BEGIN
            SELECT id INTO v_category_id FROM public.research_categories WHERE slug = ${escapeSql(catSlug)};
            
            INSERT INTO public.research_reports (
                category_id, display_title, short_summary, research_synopsis, publish_status, published_at
            ) VALUES (
                v_category_id,
                ${escapeSql(r.title)},
                ${escapeSql(r.draft_summary)},
                ${escapeSql(r.draft_excerpt)},
                ${escapeSql(publishStatus)},
                ${escapeSql(r.report_date)}
            )
            RETURNING id INTO v_report_id;
        `;
        
        if (r.analyst_names) {
            const authors = r.analyst_names.split(';').map(a => a.trim());
            authors.forEach((author, i) => {
                if (!author) return;
                const authSlug = slugify(author);
                reportSql += `
                INSERT INTO public.research_report_analysts (report_id, analyst_id, role, sort_order)
                SELECT v_report_id, id, 'author', ${i+1} FROM public.analysts WHERE slug = ${escapeSql(authSlug)}
                ON CONFLICT DO NOTHING;
                `;
            });
        }
        
        reportSql += `END $$;`;
        sql.push(reportSql);
    });

    if (isDryRun) {
        console.log("=== DRY RUN ===");
        console.log(`categories to insert: ${stats.categories}`);
        console.log(`analysts to insert/update: ${stats.analysts}`);
        console.log(`reports eligible for insert: ${stats.reportsEligible}`);
        console.log(`reports skipped due to missing/duplicate: ${stats.reportsSkipped}`);
        console.log(`records that would be public-staging candidates: ${stats.reportsPublicCandidate}`);
        console.log(`records that would remain internal/needs_review: ${stats.reportsInternal}`);
        console.log(`schema fields not available: legacy_id, legacy_url, source_system, document_url, visibility`);
        
        console.log("\nSkipped reasons sample (first 10):");
        stats.skippedReasons.slice(0, 10).forEach(r => console.log(r));
        return;
    }

    fs.writeFileSync(IMPORT_SQL, sql.join('\n'));
    console.log(`SQL generated at ${IMPORT_SQL}`);
    
    try {
        console.log("Executing SQL...");
        const result = execSync(`npx supabase db query --linked -f "${IMPORT_SQL}"`, { encoding: 'utf-8' });
        console.log(result);
        console.log("Database insert successful!");
    } catch (e) {
        console.error("Database insert failed!");
        console.error(e.message);
        if (e.stdout) console.error(e.stdout);
        if (e.stderr) console.error(e.stderr);
        process.exit(1);
    }
}

generateScript();

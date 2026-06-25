import csv
import json
import os
import hashlib
import re

def slugify(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9]+', '-', text)
    return text.strip('-')

# Read Analyst Mapping
analyst_mapping = {}
if os.path.exists('migration_manifests/STAGING_ANALYST_MAPPING_PLAN.csv'):
    with open('migration_manifests/STAGING_ANALYST_MAPPING_PLAN.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            r_id = row['report_id']
            if r_id not in analyst_mapping:
                analyst_mapping[r_id] = []
            analyst_mapping[r_id].append({
                'id': row['proposed_analyst_id'] or hashlib.md5(row['proposed_analyst_name'].encode()).hexdigest(),
                'name': row['proposed_analyst_name'],
                'title': "Analyst"
            })

# Read File Linkages
safe_files = {}
if os.path.exists('migration_manifests/STAGING_FILE_LINKAGE.csv'):
    with open('migration_manifests/STAGING_FILE_LINKAGE.csv', 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            if row.get('status') == 'success' and row.get('public_url'):
                safe_files[row['db_id']] = row['public_url']

# Read Reports
reports = []
with open('migration_manifests/research_reports_canonical_manifest.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        r_id = row['canonical_record_key'] or hashlib.md5(row['title'].encode()).hexdigest()
        
        mapped_analysts = analyst_mapping.get(r_id, [])
        
        tags = [t.strip() for t in row.get('tags', '').split(',') if t.strip()] if row.get('tags') else []
        summary = row.get('draft_summary') or 'Published research metadata is available for this report.'
        synopsis = row.get('draft_excerpt') or summary
        file_url = safe_files.get(r_id, None)
        raw_date = row.get('report_date', '1970-01-01')
        published_at = raw_date if 'T' in raw_date else raw_date + 'T00:00:00Z'
        category = row.get('category', 'Research Report').replace('-', ' ').title()
        
        reports.append({
            'id': r_id,
            'slug': slugify(row['title']),
            'title': row['title'],
            'category': category,
            'categorySlug': slugify(category),
            'publishedAt': published_at,
            'summary': summary,
            'synopsis': synopsis,
            'analysts': mapped_analysts,
            'tags': tags,
            'documentType': 'PDF',
            'isFallback': True,
            'downloadAvailable': bool(file_url),
            'file_url': file_url
        })

reports.sort(key=lambda x: x['publishedAt'], reverse=True)
mvp_reports = reports[:150]

os.makedirs('src/data', exist_ok=True)

def write_ts_file(path, var_name, data):
    with open(path, 'w', encoding='utf-8') as f:
        f.write('// Temporary MVP fallback content\n')
        f.write('import type { NormalizedReport } from "../types/research";\n\n')
        json_str = json.dumps(data, indent=2).replace('"file_url": null', '"file_url": undefined')
        f.write(f'export const {var_name}: NormalizedReport[] = {json_str};\n')

write_ts_file('src/data/mvpResearchReports.ts', 'mvpResearchReports', mvp_reports)
print(f"Generated {len(mvp_reports)} fallback reports.")

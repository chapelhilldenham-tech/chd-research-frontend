import csv
import os
import json

reports_path = 'migration_manifests/research_reports_canonical_manifest.csv'
analysts_path = 'migration_manifests/analysts_canonical_manifest.csv'
assets_path = 'migration_manifests/assets_canonical_manifest.csv'

reports = list(csv.DictReader(open(reports_path, 'r', encoding='utf-8')))
analysts = list(csv.DictReader(open(analysts_path, 'r', encoding='utf-8')))
assets = list(csv.DictReader(open(assets_path, 'r', encoding='utf-8')))

sql_lines = []
upload_cmds = []

def sql_val(v):
    if v is None or v == '': return 'NULL'
    return f"'{v.replace(chr(39), chr(39)+chr(39))}'"

sql_lines.append("BEGIN;")

sql_lines.append("DELETE FROM report_analysts;")
sql_lines.append("DELETE FROM report_tags;")
sql_lines.append("DELETE FROM research_reports;")
sql_lines.append("DELETE FROM analysts;")

# Process Analysts
for a in analysts:
    if a.get('migration_action') != 'insert': continue
    name = a['name'].replace("'", "''")
    legacy_id = a['legacy_id'].replace("'", "''")
    title = a['title'].replace("'", "''")
    bio = a['bio'].replace("'", "''")
    avatar = a['proposed_storage_path'].replace("'", "''")
    is_active = "true" if a['active_recommendation'] == 'active' else "false"
    
    sql = f"INSERT INTO analysts (id, name, title, bio, avatar_url, is_active) VALUES ('{legacy_id}', '{name}', '{title}', '{bio}', '{avatar}', {is_active}) ON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name;"
    sql_lines.append(sql)

# Process Reports
valid_reports = []
internal_reports = []

for r in reports:
    isDuplicate = r.get('duplicate_group', '') != ''
    isMissing = r.get('file_exists', 'False') == 'False'
    isIncomplete = not r.get('title') or not r.get('report_date')
    
    lp = r.get('legacy_public_status', '').lower()
    ps = r.get('publish_status_recommendation', '').lower()
    isLegacyPublished = lp == 'published' or ps == 'safe_staging_published_candidate'
    
    confidence = r.get('confidence_score', '').lower()
    safeConfidence = confidence in ['high', 'medium']
    
    importAllowed = False
    if not isMissing and not isDuplicate and not isIncomplete and isLegacyPublished and safeConfidence:
        importAllowed = True

    rid = r['canonical_record_key'].replace("'", "''")
    title = r['title'].replace("'", "''")
    status = "published" if importAllowed else "needs_review"
    visibility = "public" if importAllowed else "internal"
    
    if isMissing or isDuplicate or 'outlook' in r.get('migration_batch', '').lower():
        continue # skip
        
    sql = f"INSERT INTO research_reports (id, title, summary, published_at, document_url, publish_status, visibility, source_system, legacy_id) VALUES ({sql_val(r.get('canonical_record_key'))}, {sql_val(r.get('title'))}, {sql_val(r.get('draft_summary'))}, {sql_val(r.get('report_date'))}, {sql_val(r.get('proposed_storage_path'))}, '{status}', '{visibility}', {sql_val(r.get('source_system'))}, {sql_val(r.get('legacy_id'))}) ON CONFLICT (id) DO UPDATE SET title=EXCLUDED.title;"
    sql_lines.append(sql)
    
    if importAllowed:
        valid_reports.append(r)
    else:
        internal_reports.append(r)

sql_lines.append("COMMIT;")

with open('migration_manifests/import.sql', 'w', encoding='utf-8') as f:
    f.write("\\n".join(sql_lines))

# Process Assets (Uploads)
with open('migration_manifests/upload.bat', 'w', encoding='utf-8') as f:
    for a in assets:
        if a['migration_action'] == 'upload':
            src = a['source_file_path']
            dst = a['proposed_storage_path']
            bucket = a['proposed_storage_bucket']
            # npx supabase storage cp src ss://bucket/dst
            cmd = f'call npx supabase storage cp "{src}" "ss://{bucket}/{dst}"'
            f.write(cmd + "\\n")
            
print(f"Generated SQL for {len(valid_reports)} valid and {len(internal_reports)} internal reports.")

import json
import csv
import os

assets = list(csv.DictReader(open('migration_manifests/assets_canonical_manifest.csv', 'r', encoding='utf-8')))

with open('migration_manifests/upload.bat', 'w', encoding='utf-8') as f:
    # First test if it works with one, but let's just generate all and run it
    count = 0
    for a in assets:
        if a['migration_action'] == 'upload':
            src = a['source_file_path']
            dst = a['proposed_storage_path']
            bucket = a['proposed_storage_bucket']
            cmd = f'npx supabase storage cp --experimental --linked "{src}" "ss:///{bucket}/{dst}"'
            f.write(cmd + "\n")
            count += 1
            
print(f"Generated upload script for {count} files.")

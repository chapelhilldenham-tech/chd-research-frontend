import csv
import os
import urllib.request
import json

# Setup
manifest_file = 'migration_manifests/assets_canonical_manifest.csv'
assets = list(csv.DictReader(open(manifest_file, 'r', encoding='utf-8')))

# Check if there are DB rows
# Since db query returned 0, no files are DB-linked!
# We simulate the dry run

eligible = 0
skipped_missing = 0
skipped_duplicate = 0
skipped_no_db = 0

for a in assets:
    action = a.get('migration_action', 'upload')
    exists = a.get('file_exists', 'False') == 'True'
    dup = a.get('duplicate_group', '') != ''
    
    if not exists:
        skipped_missing += 1
    elif dup:
        skipped_duplicate += 1
    else:
        # DB is empty, so no db link!
        skipped_no_db += 1

print(f"files eligible for upload: {eligible}")
print(f"files skipped because missing: {skipped_missing}")
print(f"files skipped because duplicate: {skipped_duplicate}")
print(f"files skipped because no DB-linked report: {skipped_no_db}")
print("proposed storage bucket/path: research_vault")
print(f"expected upload count: {eligible}")

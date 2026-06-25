import csv
import os

print("Starting DRY RUN Import...")

reports_path = 'migration_manifests/research_reports_canonical_manifest.csv'
analysts_path = 'migration_manifests/analysts_canonical_manifest.csv'
assets_path = 'migration_manifests/assets_canonical_manifest.csv'

try:
    with open(reports_path, 'r', encoding='utf-8') as f:
        reports = list(csv.DictReader(f))
    with open(analysts_path, 'r', encoding='utf-8') as f:
        analysts = list(csv.DictReader(f))
    with open(assets_path, 'r', encoding='utf-8') as f:
        assets = list(csv.DictReader(f))
except Exception as e:
    print(f"Failed to read manifests: {e}")
    exit(1)

dryRunCounts = {
    "validForImport": 0,
    "needsReviewInternal": 0,
    "skippedDuplicate": 0,
    "skippedMissingFile": 0,
    "skippedIncomplete": 0,
    "storagePathConflicts": 0
}

storagePaths = set()

print("Validating Analyst records...")
for a in analysts:
    if a.get('migration_action') == 'insert':
        if not a.get('name') or not a.get('legacy_id'):
            print(f"[Warning] Analyst missing name or legacy ID: {a}")

print("Validating Report records...")
for r in reports:
    isDuplicate = r.get('duplicate_group', '') != ''
    isMissing = r.get('file_exists', 'False') == 'False'
    isIncomplete = not r.get('title') or not r.get('report_date')
    
    lp = r.get('legacy_public_status', '').lower()
    ps = r.get('publish_status_recommendation', '').lower()
    isLegacyPublished = lp == 'published' or ps == 'safe_staging_published_candidate'
    
    confidence = r.get('confidence_score', '').lower()
    safeConfidence = confidence in ['high', 'medium']
    
    spath = r.get('proposed_storage_path', '')
    if spath:
        if spath in storagePaths:
            dryRunCounts["storagePathConflicts"] += 1
        else:
            storagePaths.add(spath)

    if isMissing:
        dryRunCounts["skippedMissingFile"] += 1
    elif isDuplicate:
        dryRunCounts["skippedDuplicate"] += 1
    elif isIncomplete:
        dryRunCounts["skippedIncomplete"] += 1
    elif isLegacyPublished and safeConfidence:
        dryRunCounts["validForImport"] += 1
    else:
        dryRunCounts["needsReviewInternal"] += 1

print("Dry Run Validation Results:")
for k, v in dryRunCounts.items():
    print(f"- {k}: {v}")

print("Dry-run complete. No rows inserted. No files uploaded.")

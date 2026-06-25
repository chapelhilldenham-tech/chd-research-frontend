# Staging File Upload Report

## Upload Summary

- **Total Eligible Files (from Dry-Run):** 134
- **Total Attempted Uploads:** 134
- **Total Successful Uploads:** 134 (130 initial + 4 from retry)
- **Total Failed Uploads:** 0
- **Total Skipped Files:** 1 (Missing source path)

## Error Details

No pending errors. The 4 previously failed uploads (intermittent `ECIRCUITBREAKER` and `TLS handshake timeout` errors) were successfully resolved during a targeted retry pass.

## Bucket Verification

- **Bucket Name:** `research_vault`
- **Privacy Status:** `public: false` (Verified via direct database query on `storage.buckets`)
- **Total Objects in Storage (Estimated):** 134 files are now inside `ss:///research_vault/reports/staged/`

## Linkage Verification

- **Storage Strategy:** Deterministic paths using SHA256/Slugified titles and dates.
- **Reports with Linkage:** 134 (Logged successfully to `migration_manifests/STAGING_FILE_LINKAGE.csv`).
- **Reports without Linkage:** 1 (Missing on disk).
- **Schema Modification:** None. No column was added to `research_reports`. Linkages are strictly tracked via external manifests.

## Public Visibility Check

- **Public Research Reports Count:** 5 (Count remains identical to pre-upload verification).
- **Publish Status Change:** No `publish_status` values were modified during this pass.

# Migration Reconciliation Report

## Discovery Results
* **Total Physical Files Scanned:** 192
* **Total Legacy Reports Processed:** 120
* **Total Codex Scan Rows Processed:** 137
* **Total Canonical Report Candidates:** 191
* **Total Analyst Candidates:** 6
* **Total Price List Candidates:** 0
* **Total Asset Candidates:** 315
* **Duplicate Groups Identified:** 0
* **Missing Files:** 1
* **Incomplete Metadata Records:** 56
* **Risky/Private/Locked Records:** All records lacking explicit legacy 'published' status defaulted to `needs_review`/`internal`.

## Script Determinism
This script has been hardened. It is deterministic across reruns. No random UUIDs are used for proposed storage paths; it relies on sanitized titles, dates, checksums, and legacy IDs.

## Supabase Schema Readiness
**The current live Supabase schema IS NOT SUFFICIENT for import.**
A schema migration is required first. The live database currently lacks the `analysts`, `report_tags`, `price_lists`, and related mapping tables. Until the proposed `20260623220000_add_portal_schema.sql` migration is executed, import can only be staged as files/manifests locally.

## CLI Preparation (Dry-run Only)
```bash
node scripts/import_migration.js --dry-run \
  --reports-manifest=migration_manifests/research_reports_canonical_manifest.csv \
  --assets-manifest=migration_manifests/assets_canonical_manifest.csv
```

**All work was performed read-only. No deployment, upload, RLS, or Supabase insert work occurred.**

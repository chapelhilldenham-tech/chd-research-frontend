# Missing Artifacts Inventory

## 1. Analyst Photos
* **Total Analysts in Staging:** 6
* **Missing Photos in Supabase:** 1 (1 record has a null `avatar_url`).
* **Legacy Check:** Some legacy assets are mapped. Missing high-res photos require user-provided assets.

## 2. Report Files
* **Total Reports in Staging:** 161
* **Reports Missing Linkage in DB:** 161 (The `research_reports` table does NOT contain a `file_path`, `document_url`, or `storage_path` column natively; storage routing happens via frontend or conventions).
* **Storage Objects:** 164 objects exist in `research_vault`.

## 3. Price Lists
* **Price List Records in Staging:** 3
* **Missing Files Locally:** Some historic Excel files exist in `outlook_research_import`.
* **Database Linkage:** Needs to be synchronized with local files.

## 4. Analyst-Report Mappings
* **Total Reports Mapped in DB:** 132 mappings exist in `research_report_analysts`.
* **Public Mappings:** 132 mappings exist in `public_research_report_analysts`.

## 5. Analytics
* **Missing Sections:** ALL (Source workbook not found locally).

## 6. MVP Readiness
* **Safe to Show Now:** Public views using `src/data/mvpResearchReports.ts` fallback data for reports, and `src/data/mvpAnalysts.ts` fallback data for analysts. `public_research_reports` has 5 published reports.
* **Fallback Dependent:** The frontend is mostly dependent on fallback JSON/TS data because only 5 reports are currently published in the DB.

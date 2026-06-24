# CHD Research Portal Backend Binding Plan

## Current Branch

- Branch: `backend-binding-staging`
- Baseline commit: `322e9605885648729f22f11f2875a77303bafce1`
- Target: Vercel staging/preview only.

## Integration Scope

This branch starts controlled frontend binding to Supabase without changing database schema, RLS, auth, storage, uploads, imports, or deployment configuration.

## Public Read-Only Data

- Public pages must consume only Supabase public views that are already filtered to published/public/active rows.
- `/reports` reads `public_research_reports`, `public_research_report_tags`, and `public_research_report_analysts`.
- `/report/:id` uses the same public report bundle and falls back to mock data only if the Supabase read fails locally.
- `/analysts` already reads `public_analysts` with mock fallback.
- `/price-lists` already reads `public_price_lists`, but the PHP-style date layout remains intact.
- `/analytics` reads public market views passively; chart/layout values remain visual-baseline safe until a data-shape pass is approved.

## Admin Read-Only Data

- Admin pages remain non-writing in this pass.
- `/admin/reports` and `/admin/reports/:id` continue using staging mock/admin data until authenticated staff read policies are approved.
- `/admin/analytics` and `/admin/price-lists` may show public read counts/rows only; no internal or staged records are exposed through frontend keys yet.

## Staged Upload/Import Workflow

- `/admin/reports/import` remains a visual placeholder.
- No file picker upload is wired.
- No Supabase Storage bucket is created or modified.
- Future imported PDF metadata must default to:
  - `review_status = needs_review`
  - `visibility = internal`
  - `publish_status = draft` or `internal`
  - `published_at = null`
  - no public file URL
- Email bodies from Research, DMR, and Tajudeen research emails may be used only as draft metadata for review.

## Publishing Workflow

- No report is published automatically.
- Public views must expose only `publish_status = published`.
- Publish/archive actions require staff auth, RLS hardening, review audit logging, and explicit user approval before implementation.

## Auth/RLS Hardening

- Auth is not wired in this pass.
- Before admin writes, replace the current `raw_user_meta_data` staff check with a safe staff role source such as app metadata or a dedicated staff roles table.
- Do not add `service_role` keys to frontend or Vercel public env vars.

## Audit Trail Requirements

Before writes are enabled, add audit capture for:

- import package ingestion
- file upload
- metadata edit
- review status change
- publish/archive action
- failed or rejected import records

## Next Safe Step

After this branch is reviewed, the next safe implementation step is an admin read-only schema/view design for staged reports, followed by an RLS/Auth hardening migration plan. Do not enable uploads or writes before that work is approved.

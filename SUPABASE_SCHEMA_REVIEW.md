# Supabase Schema Review

## Existing Client Configuration

- Client file: `src/lib/supabase.ts`
- Required Vite variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_PUBLISHABLE_KEY`
- No service-role key is used by the frontend.

## Tracked Migrations

- `20260623220000_add_portal_schema.sql`
- `20260623220001_seed_portal_data.sql`

The tracked schema supports:

- `research_categories`
- `research_reports`
- `analysts`
- `report_tags`
- `research_report_tags`
- `research_report_analysts`
- `price_lists`
- `market_data_series`
- `market_data_points`
- `contact_submissions`

## Public Views

Existing public read views:

- `public_analysts`
- `public_report_tags`
- `public_research_reports`
- `public_research_report_tags`
- `public_research_report_analysts`
- `public_price_lists`
- `public_market_data_series`
- `public_market_data_points`

These views use `security_invoker = true`, so RLS on the underlying tables remains relevant.

## Existing Safety Model

- Public report read policy limits `research_reports` to `publish_status = 'published'`.
- Price lists are public only when `is_active = true` and `visibility = 'public'`.
- Market data is public only when series are active and public.
- Analysts and tags are public only when active.

## Important Risk

`security.is_research_staff()` currently checks `auth.users.raw_user_meta_data`. That metadata is user-editable in Supabase and should not be used for authorization. Do not enable admin writes until this is replaced with safer authorization data.

## Untracked Migration Review

File inspected:

- `supabase/migrations/20260624111921_add_legacy_research_import_workflow.sql`

It would change `public.research_reports` by adding:

- `review_status`
- `visibility`
- `file_upload_status`
- `file_path`
- `source_file_path`
- `original_filename`
- `source_file_size_bytes`
- `extraction_status`
- `title_confidence`
- `synopsis_confidence`
- `suggested_tags`
- `imported_at`
- `reviewed_at`
- `reviewed_by`

It would also:

- replace the `publish_status` check to allow `draft`, `review`, `internal`, `published`, `archived`
- add review, visibility, upload, extraction, and confidence constraints
- add indexes for review/status/date/original filename fields
- replace `public.public_research_reports`
- grant select on `public.public_research_reports` to `anon` and `authenticated`

It does not create:

- tables
- functions
- policies
- triggers
- storage buckets
- storage policies

Assessment:

- Useful but incomplete.
- Do not apply as-is.
- Needs revision because requested status vocabulary includes staged/needs_review/published/archived, while this migration uses a different `review_status` vocabulary.
- Does not address private PDF storage or admin-safe staged reads.
- Does not fix the staff authorization risk.

## Supabase Changelog Note

Supabase has announced that public schema tables may not be exposed to the Data API by default for new projects. Any future table/view intended for frontend access should include explicit grants plus RLS policies.

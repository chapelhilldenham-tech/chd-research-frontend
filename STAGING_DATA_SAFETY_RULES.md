# Staging Data Safety Rules

## Environment Boundary

- This work targets Vercel staging/preview only.
- Do not deploy production.
- Do not touch production data.
- Do not expose secrets or service-role credentials.

## Public Read Rules

- Public routes may read only public Supabase views.
- Public report records must be published before they can appear on `/reports` or `/report/:id`.
- Public views must not expose staged, needs-review, internal, archived, rejected, or draft report records.

## Admin Rules

- Admin routes are not authenticated in the current frontend.
- Admin routes must not perform writes until Supabase Auth and staff RLS are approved.
- Admin route data can remain mock/read-only until safe admin views and staff authorization are implemented.

## Import Rules

- Research, DMR, and Tajudeen research email PDFs are source material only.
- Imported files default to staged/private review.
- Imported metadata defaults to needs review and cannot become public automatically.
- Email body summaries are draft metadata only and require human review before public use.

## Storage Rules

- Do not create public PDF buckets by default.
- Do not generate public file URLs for staged reports.
- Uploaded/imported PDFs must remain private until explicit publish approval and storage policy review.

## Publishing Rules

- Publishing must be an explicit reviewed action.
- No import, upload, or metadata edit may set public visibility automatically.
- Publish/archive actions require an audit trail.

## Migration Rules

- Do not apply migrations without approval.
- Do not modify the existing untracked migration unless explicitly requested.
- Do not weaken RLS.
- Do not add `service_role` logic to frontend code.

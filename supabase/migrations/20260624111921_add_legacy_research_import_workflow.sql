-- Additive staging workflow fields for legacy research report imports.
-- This migration does not import report rows or upload files.

alter table public.research_reports
  add column if not exists review_status text not null default 'needs_review',
  add column if not exists visibility text not null default 'internal',
  add column if not exists file_upload_status text not null default 'pending_manual_upload',
  add column if not exists file_path text,
  add column if not exists source_file_path text,
  add column if not exists original_filename text,
  add column if not exists source_file_size_bytes bigint,
  add column if not exists extraction_status text,
  add column if not exists title_confidence text,
  add column if not exists synopsis_confidence text,
  add column if not exists suggested_tags text[] not null default '{}',
  add column if not exists imported_at timestamptz not null default now(),
  add column if not exists reviewed_at timestamptz,
  add column if not exists reviewed_by uuid references auth.users(id);

alter table public.research_reports
  drop constraint if exists research_reports_publish_status_check;

alter table public.research_reports
  add constraint research_reports_publish_status_check
  check (publish_status in ('draft', 'review', 'internal', 'published', 'archived'));

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'research_reports_review_status_check'
      and conrelid = 'public.research_reports'::regclass
  ) then
    alter table public.research_reports
      add constraint research_reports_review_status_check
      check (review_status in ('needs_review', 'approved', 'rejected', 'needs_rework'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'research_reports_visibility_check'
      and conrelid = 'public.research_reports'::regclass
  ) then
    alter table public.research_reports
      add constraint research_reports_visibility_check
      check (visibility in ('internal', 'public', 'subscriber'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'research_reports_file_upload_status_check'
      and conrelid = 'public.research_reports'::regclass
  ) then
    alter table public.research_reports
      add constraint research_reports_file_upload_status_check
      check (file_upload_status in ('pending_manual_upload', 'uploaded', 'missing', 'not_required'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'research_reports_extraction_status_check'
      and conrelid = 'public.research_reports'::regclass
  ) then
    alter table public.research_reports
      add constraint research_reports_extraction_status_check
      check (extraction_status in ('extracted', 'filename_only', 'skipped', 'error'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'research_reports_title_confidence_check'
      and conrelid = 'public.research_reports'::regclass
  ) then
    alter table public.research_reports
      add constraint research_reports_title_confidence_check
      check (title_confidence in ('high', 'medium', 'low'));
  end if;

  if not exists (
    select 1
    from pg_constraint
    where conname = 'research_reports_synopsis_confidence_check'
      and conrelid = 'public.research_reports'::regclass
  ) then
    alter table public.research_reports
      add constraint research_reports_synopsis_confidence_check
      check (synopsis_confidence in ('high', 'medium', 'low'));
  end if;
end $$;

create index if not exists research_reports_review_status_idx
  on public.research_reports (review_status);

create index if not exists research_reports_visibility_idx
  on public.research_reports (visibility);

create index if not exists research_reports_publish_status_idx
  on public.research_reports (publish_status);

create index if not exists research_reports_published_at_idx
  on public.research_reports (published_at desc);

create index if not exists research_reports_data_period_end_idx
  on public.research_reports (data_period_end desc);

create index if not exists research_reports_original_filename_idx
  on public.research_reports (original_filename);

create or replace view public.public_research_reports
with (security_invoker = true)
as
select
  reports.id,
  reports.category_id,
  categories.slug as category_slug,
  categories.name as category_name,
  reports.display_title,
  reports.short_summary,
  reports.research_synopsis,
  reports.core_thesis,
  reports.key_points,
  reports.investment_implication,
  reports.risk_factors,
  reports.document_type,
  reports.published_at,
  reports.data_period_start,
  reports.data_period_end
from public.research_reports reports
left join public.research_categories categories on categories.id = reports.category_id
where reports.publish_status = 'published';

grant select on public.public_research_reports to anon, authenticated;

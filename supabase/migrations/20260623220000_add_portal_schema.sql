-- Additive public portal schema for the React Research Portal.
-- Review-only migration: do not apply to a live Supabase project until approved.

create schema if not exists security;

create or replace function security.is_research_staff()
returns boolean
language sql security definer set search_path = public
as $$
  select exists (
    select 1
    from auth.users
    where id = auth.uid()
      and raw_user_meta_data->>'is_research_staff' = 'true'
  );
$$;

create table if not exists public.research_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint research_categories_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.research_reports (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.research_categories(id),
  display_title text not null,
  short_summary text,
  research_synopsis text,
  core_thesis text,
  key_points jsonb,
  investment_implication text,
  risk_factors text,
  document_type text,
  publish_status text not null default 'draft',
  published_at timestamptz,
  data_period_start date,
  data_period_end date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint research_reports_publish_status_check check (publish_status in ('draft', 'review', 'published', 'archived'))
);

create table if not exists public.analysts (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  slug text not null unique,
  title text,
  bio text,
  email text,
  avatar_url text,
  photo_position text,
  coverage text[] not null default '{}',
  sectors text[] not null default '{}',
  is_featured boolean not null default false,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint analysts_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.report_tags (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint report_tags_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.research_report_tags (
  report_id uuid not null references public.research_reports(id) on delete cascade,
  tag_id uuid not null references public.report_tags(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (report_id, tag_id)
);

create table if not exists public.research_report_analysts (
  report_id uuid not null references public.research_reports(id) on delete cascade,
  analyst_id uuid not null references public.analysts(id) on delete cascade,
  role text not null default 'author',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  primary key (report_id, analyst_id),
  constraint research_report_analysts_role_check check (role in ('author', 'contributor', 'reviewer'))
);

create table if not exists public.price_lists (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  category text not null,
  asset_class text,
  effective_date date not null,
  file_label text,
  file_path text,
  file_type text,
  visibility text not null default 'public',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint price_lists_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint price_lists_visibility_check check (visibility in ('public', 'subscriber', 'internal'))
);

create table if not exists public.market_data_series (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null,
  unit text,
  source text,
  frequency text,
  is_public boolean not null default true,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint market_data_series_slug_format check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.market_data_points (
  id uuid primary key default gen_random_uuid(),
  series_id uuid not null references public.market_data_series(id) on delete cascade,
  as_of_date date not null,
  value numeric not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (series_id, as_of_date)
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  company text,
  subject text,
  message text not null,
  source text not null default 'research_portal',
  status text not null default 'new',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references auth.users(id),
  constraint contact_submissions_status_check check (status in ('new', 'reviewing', 'closed')),
  constraint contact_submissions_source_check check (source in ('research_portal', 'staging_preview'))
);

create index if not exists analysts_active_sort_idx on public.analysts (is_active, sort_order, full_name);
create index if not exists report_tags_active_sort_idx on public.report_tags (is_active, sort_order, name);
create index if not exists research_report_tags_tag_idx on public.research_report_tags (tag_id);
create index if not exists research_report_analysts_analyst_idx on public.research_report_analysts (analyst_id);
create index if not exists price_lists_public_date_idx on public.price_lists (visibility, is_active, effective_date desc);
create index if not exists market_data_series_public_idx on public.market_data_series (is_public, is_active, category, slug);
create index if not exists market_data_points_series_date_idx on public.market_data_points (series_id, as_of_date desc);
create index if not exists contact_submissions_created_idx on public.contact_submissions (created_at desc);

alter table public.research_categories enable row level security;
alter table public.research_reports enable row level security;
alter table public.analysts enable row level security;
alter table public.report_tags enable row level security;
alter table public.research_report_tags enable row level security;
alter table public.research_report_analysts enable row level security;
alter table public.price_lists enable row level security;
alter table public.market_data_series enable row level security;
alter table public.market_data_points enable row level security;
alter table public.contact_submissions enable row level security;

drop policy if exists "Public can read active research categories" on public.research_categories;
create policy "Public can read active research categories"
on public.research_categories
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Staff can manage research categories" on public.research_categories;
create policy "Staff can manage research categories"
on public.research_categories
for all
to authenticated
using (security.is_research_staff())
with check (security.is_research_staff());

drop policy if exists "Public can read published research reports" on public.research_reports;
create policy "Public can read published research reports"
on public.research_reports
for select
to anon, authenticated
using (publish_status = 'published');

drop policy if exists "Staff can manage research reports" on public.research_reports;
create policy "Staff can manage research reports"
on public.research_reports
for all
to authenticated
using (security.is_research_staff())
with check (security.is_research_staff());

drop policy if exists "Public can read active analysts" on public.analysts;
create policy "Public can read active analysts"
on public.analysts
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Staff can manage analysts" on public.analysts;
create policy "Staff can manage analysts"
on public.analysts
for all
to authenticated
using (security.is_research_staff())
with check (security.is_research_staff());

drop policy if exists "Public can read active report tags" on public.report_tags;
create policy "Public can read active report tags"
on public.report_tags
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Staff can manage report tags" on public.report_tags;
create policy "Staff can manage report tags"
on public.report_tags
for all
to authenticated
using (security.is_research_staff())
with check (security.is_research_staff());

drop policy if exists "Public can read published report tag mappings" on public.research_report_tags;
create policy "Public can read published report tag mappings"
on public.research_report_tags
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.research_reports reports
    where reports.id = research_report_tags.report_id
      and reports.publish_status = 'published'
  )
);

drop policy if exists "Staff can manage report tag mappings" on public.research_report_tags;
create policy "Staff can manage report tag mappings"
on public.research_report_tags
for all
to authenticated
using (security.is_research_staff())
with check (security.is_research_staff());

drop policy if exists "Public can read published report analyst mappings" on public.research_report_analysts;
create policy "Public can read published report analyst mappings"
on public.research_report_analysts
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.research_reports reports
    where reports.id = research_report_analysts.report_id
      and reports.publish_status = 'published'
  )
);

drop policy if exists "Staff can manage report analyst mappings" on public.research_report_analysts;
create policy "Staff can manage report analyst mappings"
on public.research_report_analysts
for all
to authenticated
using (security.is_research_staff())
with check (security.is_research_staff());

drop policy if exists "Public can read public price lists" on public.price_lists;
create policy "Public can read public price lists"
on public.price_lists
for select
to anon, authenticated
using (is_active = true and visibility = 'public');

drop policy if exists "Staff can manage price lists" on public.price_lists;
create policy "Staff can manage price lists"
on public.price_lists
for all
to authenticated
using (security.is_research_staff())
with check (security.is_research_staff());

drop policy if exists "Public can read public market data series" on public.market_data_series;
create policy "Public can read public market data series"
on public.market_data_series
for select
to anon, authenticated
using (is_active = true and is_public = true);

drop policy if exists "Staff can manage market data series" on public.market_data_series;
create policy "Staff can manage market data series"
on public.market_data_series
for all
to authenticated
using (security.is_research_staff())
with check (security.is_research_staff());

drop policy if exists "Public can read public market data points" on public.market_data_points;
create policy "Public can read public market data points"
on public.market_data_points
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.market_data_series series
    where series.id = market_data_points.series_id
      and series.is_active = true
      and series.is_public = true
  )
);

drop policy if exists "Staff can manage market data points" on public.market_data_points;
create policy "Staff can manage market data points"
on public.market_data_points
for all
to authenticated
using (security.is_research_staff())
with check (security.is_research_staff());

drop policy if exists "Anyone can create contact submissions" on public.contact_submissions;
create policy "Anyone can create contact submissions"
on public.contact_submissions
for insert
to anon, authenticated
with check (status = 'new' and source in ('research_portal', 'staging_preview'));

drop policy if exists "Staff can read contact submissions" on public.contact_submissions;
create policy "Staff can read contact submissions"
on public.contact_submissions
for select
to authenticated
using (security.is_research_staff());

drop policy if exists "Staff can update contact submissions" on public.contact_submissions;
create policy "Staff can update contact submissions"
on public.contact_submissions
for update
to authenticated
using (security.is_research_staff())
with check (security.is_research_staff());

create or replace view public.public_analysts
with (security_invoker = true)
as
select id, full_name, slug, title, bio, email, avatar_url, photo_position, coverage, sectors, is_featured, sort_order
from public.analysts
where is_active = true;

create or replace view public.public_report_tags
with (security_invoker = true)
as
select id, name, slug, description, sort_order
from public.report_tags
where is_active = true;

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

create or replace view public.public_research_report_tags
with (security_invoker = true)
as
select mappings.report_id, tags.id as tag_id, tags.name, tags.slug
from public.research_report_tags mappings
join public.report_tags tags on tags.id = mappings.tag_id
where tags.is_active = true;

create or replace view public.public_research_report_analysts
with (security_invoker = true)
as
select
  mappings.report_id,
  mappings.role,
  mappings.sort_order,
  analysts.id as analyst_id,
  analysts.full_name,
  analysts.slug,
  analysts.title,
  analysts.avatar_url,
  analysts.photo_position,
  analysts.coverage,
  analysts.sectors
from public.research_report_analysts mappings
join public.analysts analysts on analysts.id = mappings.analyst_id
where analysts.is_active = true;

create or replace view public.public_price_lists
with (security_invoker = true)
as
select id, title, slug, description, category, asset_class, effective_date, file_label, file_path, file_type
from public.price_lists
where is_active = true and visibility = 'public';

create or replace view public.public_market_data_series
with (security_invoker = true)
as
select id, name, slug, category, unit, source, frequency
from public.market_data_series
where is_active = true and is_public = true;

create or replace view public.public_market_data_points
with (security_invoker = true)
as
select points.id, points.series_id, points.as_of_date, points.value, points.metadata
from public.market_data_points points
join public.market_data_series series on series.id = points.series_id
where series.is_active = true and series.is_public = true;

grant select on
  public.public_analysts,
  public.public_report_tags,
  public.public_research_reports,
  public.public_research_report_tags,
  public.public_research_report_analysts,
  public.public_price_lists,
  public.public_market_data_series,
  public.public_market_data_points
to anon, authenticated;

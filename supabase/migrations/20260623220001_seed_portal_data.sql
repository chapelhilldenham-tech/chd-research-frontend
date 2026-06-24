-- Sanitized placeholder seed data for local/staging review only.
-- Do not treat this as CHD/client/subscriber data. Do not apply to production.

insert into public.analysts (
  full_name,
  slug,
  title,
  bio,
  email,
  avatar_url,
  photo_position,
  coverage,
  sectors,
  is_featured,
  sort_order,
  is_active
) values
  (
    'Sample Research Lead',
    'sample-research-lead',
    'Director, Research',
    'Placeholder profile for validating the public analyst directory layout.',
    'research-lead@example.invalid',
    '/assets/img/analysts/placeholder-research-lead.jpg',
    '50% 0%',
    array['Telecommunications'],
    array['Telecommunications'],
    true,
    1,
    true
  ),
  (
    'Sample Financials Analyst',
    'sample-financials-analyst',
    'Analyst',
    'Placeholder profile for validating financial services coverage displays.',
    'financials-analyst@example.invalid',
    '/assets/img/analysts/placeholder-financials.jpg',
    '50% 0%',
    array['Financial Services'],
    array['Financial Services'],
    true,
    2,
    true
  ),
  (
    'Sample Consumer Analyst',
    'sample-consumer-analyst',
    'Analyst',
    'Placeholder profile for validating consumer and agriculture coverage displays.',
    'consumer-analyst@example.invalid',
    '/assets/img/analysts/placeholder-consumer.jpg',
    '50% 24%',
    array['Consumer Goods', 'Agriculture'],
    array['Consumer Goods', 'Agriculture'],
    false,
    3,
    true
  )
on conflict (slug) do update set
  full_name = excluded.full_name,
  title = excluded.title,
  bio = excluded.bio,
  email = excluded.email,
  avatar_url = excluded.avatar_url,
  photo_position = excluded.photo_position,
  coverage = excluded.coverage,
  sectors = excluded.sectors,
  is_featured = excluded.is_featured,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.report_tags (name, slug, description, sort_order, is_active) values
  ('Equity Research', 'equity-research', 'Placeholder tag for equity research reports.', 1, true),
  ('Fixed Income', 'fixed-income', 'Placeholder tag for fixed income reports.', 2, true),
  ('Macroeconomic', 'macroeconomic', 'Placeholder tag for macroeconomic strategy reports.', 3, true),
  ('Sector Update', 'sector-update', 'Placeholder tag for sector update reports.', 4, true),
  ('Market Data', 'market-data', 'Placeholder tag for analytics and data products.', 5, true)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;

insert into public.price_lists (
  title,
  slug,
  description,
  category,
  asset_class,
  effective_date,
  file_label,
  file_path,
  file_type,
  visibility,
  is_active
) values
  (
    'Sample Equity Price List',
    'sample-equity-price-list',
    'Placeholder record for validating the price list index.',
    'Daily',
    'Equity',
    date '2026-06-23',
    'Sample CSV',
    '/sample-assets/price-lists/sample-equity-price-list.csv',
    'CSV',
    'public',
    true
  ),
  (
    'Sample Fixed Income Price List',
    'sample-fixed-income-price-list',
    'Placeholder record for validating fixed income price list metadata.',
    'Daily',
    'Fixed Income',
    date '2026-06-23',
    'Sample CSV',
    '/sample-assets/price-lists/sample-fixed-income-price-list.csv',
    'CSV',
    'public',
    true
  ),
  (
    'Sample Monthly Market Summary',
    'sample-monthly-market-summary',
    'Placeholder record for validating archive-style price list entries.',
    'Monthly',
    'Multi-Asset',
    date '2026-05-31',
    'Sample PDF',
    '/sample-assets/price-lists/sample-monthly-market-summary.pdf',
    'PDF',
    'public',
    true
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  category = excluded.category,
  asset_class = excluded.asset_class,
  effective_date = excluded.effective_date,
  file_label = excluded.file_label,
  file_path = excluded.file_path,
  file_type = excluded.file_type,
  visibility = excluded.visibility,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.market_data_series (
  name,
  slug,
  category,
  unit,
  source,
  frequency,
  is_public,
  is_active
) values
  ('Sample Equity Index', 'sample-equity-index', 'Equity', 'Index points', 'Sample source', 'daily', true, true),
  ('Sample Inflation Indicator', 'sample-inflation-indicator', 'Macroeconomic', 'Percent', 'Sample source', 'monthly', true, true),
  ('Sample FX Indicator', 'sample-fx-indicator', 'Currency', 'Local currency per USD', 'Sample source', 'daily', true, true)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  unit = excluded.unit,
  source = excluded.source,
  frequency = excluded.frequency,
  is_public = excluded.is_public,
  is_active = excluded.is_active,
  updated_at = now();

insert into public.market_data_points (series_id, as_of_date, value, metadata)
select series.id, point.as_of_date, point.value, point.metadata
from public.market_data_series series
join (
  values
    ('sample-equity-index', date '2026-06-21', 100000.00::numeric, '{"note":"placeholder"}'::jsonb),
    ('sample-equity-index', date '2026-06-22', 100750.00::numeric, '{"note":"placeholder"}'::jsonb),
    ('sample-equity-index', date '2026-06-23', 101200.00::numeric, '{"note":"placeholder"}'::jsonb),
    ('sample-inflation-indicator', date '2026-04-30', 24.10::numeric, '{"note":"placeholder"}'::jsonb),
    ('sample-inflation-indicator', date '2026-05-31', 23.80::numeric, '{"note":"placeholder"}'::jsonb),
    ('sample-fx-indicator', date '2026-06-21', 1500.00::numeric, '{"note":"placeholder"}'::jsonb),
    ('sample-fx-indicator', date '2026-06-22', 1505.00::numeric, '{"note":"placeholder"}'::jsonb),
    ('sample-fx-indicator', date '2026-06-23', 1498.00::numeric, '{"note":"placeholder"}'::jsonb)
) as point(series_slug, as_of_date, value, metadata)
  on point.series_slug = series.slug
on conflict (series_id, as_of_date) do update set
  value = excluded.value,
  metadata = excluded.metadata;

-- Report-to-analyst and report-to-tag mappings are intentionally omitted.
-- They should be seeded only after a reviewer chooses compatible research_reports rows.

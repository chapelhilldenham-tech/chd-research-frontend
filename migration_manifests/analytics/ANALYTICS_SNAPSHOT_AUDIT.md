# Analytics Snapshot Audit

## Source Material
* **Source File Expected:** Excel analytics workbook
* **Status:** NOT FOUND locally in `C:\dev\chd-research-frontend`, `C:\CHD`, or user `Downloads` folders.

## Data Extracted
* Headline KPIs: missing
* NGX ASI: missing
* FX: missing
* Inflation: missing
* MPR: missing
* Brent: missing
* GDP Growth: missing
* Macro Indicators: missing
* Market Summary: missing
* Sector Metrics: missing

## Proposed Database Schema
If an analytics table does not exist, a minimal viable schema is proposed for dry-run evaluation only (not applied):

```sql
CREATE TABLE IF NOT EXISTS public.analytics_snapshots (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  snapshot_date date NOT NULL,
  source_file text,
  payload jsonb NOT NULL,
  status text CHECK (status IN ('staging', 'approved', 'archived')) DEFAULT 'staging',
  created_at timestamp with time zone DEFAULT now()
);

-- Note: RLS and policies should be applied before production use.
```

## Recommended Next Steps
1. The user must provide the analytics Excel workbook or place it in the `migration_manifests/analytics/` directory.
2. Re-run parsing once the file is available.

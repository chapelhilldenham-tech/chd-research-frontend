
# Staging Visibility Verification

## 1. Counts
- research_reports: 161
- analysts: 9
- report_analysts: 132
- research_categories: 5
- public_research_reports: 5
- public_research_report_analysts: 132
- public_research_report_tags: 0

## 2. Batch 1 Legacy Records
- Total inserted (Linkage): 134
- With file linkage: 134
- Without file linkage: 5
- Public-visible: 5
- Internal/review: 29

## 3. Batch 2A Outlook Records
- Total inserted (Linkage): 26
- With file linkage: 26
- Missing file rows: 2
- Public-visible: 0

## 4. Analyst Display Readiness
**Sample Public Reports:**
{"analyst_names":"Gideon Oshadumi","display_title":"Dangote Cement Plc FY - 25 Company Update (1)"}
{"analyst_names":"Nabila Mohammed","display_title":"Accesscorp Company Update 2025"}
{"analyst_names":"Gideon Oshadumi","display_title":"Dangote Cement 9M - 24 Initial Comment"}
{"analyst_names":"Tajudeen Ibrahim","display_title":"Airtel Africa Plc Company Research Update"}
{"analyst_names":"Chapel Hill Denham Research","display_title":"2025 Debt TAI"}

**Sample Internal Reports:**
{"display_title":"Downstream Sector 2025: Pricing Reform Creates New Winners","publish_status":"review"}
{"display_title":"2025 Debt TAI","publish_status":"published"}
{"display_title":"Accesscorp Company Update 2025","publish_status":"published"}
{"display_title":"Airtel Africa Plc Company Research Update","publish_status":"published"}
{"display_title":"Dangote Cement 9M - 24 Initial Comment","publish_status":"published"}

## 6. Frontend Data Contract
**public_research_reports:**
id, category_id, category_slug, category_name, display_title, short_summary, research_synopsis, core_thesis, key_points, investment_implication, risk_factors, document_type, published_at, data_period_start, data_period_end

**public_research_report_analysts:**
report_id, role, sort_order, analyst_id, full_name, slug, title, avatar_url, photo_position, coverage, sectors

**public_research_report_tags:**
report_id, tag_id, name, slug

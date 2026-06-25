SELECT 
  table_name, 
  column_name, 
  data_type, 
  is_nullable, 
  column_default 
FROM information_schema.columns 
WHERE table_name IN (
  'research_reports', 
  'research_categories', 
  'analysts', 
  'report_tags', 
  'research_report_tags', 
  'research_report_analysts', 
  'price_lists',
  'public_research_reports',
  'public_analysts',
  'public_price_lists'
)
ORDER BY table_name, ordinal_position;

SELECT 'total_categories' as metric, count(*) as count FROM research_categories
UNION ALL
SELECT 'total_analysts', count(*) FROM analysts
UNION ALL
SELECT 'total_reports', count(*) FROM research_reports
UNION ALL
SELECT 'total_tags', count(*) FROM report_tags
UNION ALL
SELECT 'total_public_reports', count(*) FROM public_research_reports
UNION ALL
SELECT 'publish_status_' || publish_status, count(*) FROM research_reports GROUP BY publish_status;

SELECT id, display_title, published_at FROM public_research_reports LIMIT 5;
SELECT id, display_title, publish_status, published_at FROM research_reports WHERE publish_status != 'published' LIMIT 5;

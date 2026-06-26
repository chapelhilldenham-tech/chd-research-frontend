SELECT 
    'total_reports' as metric, count(*) as count 
FROM research_reports
UNION ALL
SELECT 
    'review_status_' || publish_status, count(*) 
FROM research_reports GROUP BY publish_status
UNION ALL
SELECT 
    'visibility_' || visibility, count(*) 
FROM research_reports GROUP BY visibility
UNION ALL
SELECT 
    'source_system_' || source_system, count(*) 
FROM research_reports GROUP BY source_system
UNION ALL
SELECT 
    'missing_file_path', count(*) 
FROM research_reports WHERE document_url IS NULL OR document_url = '';

import os

def replace_in_file(filepath, old_str, new_str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

replace_in_file('src/components/AnalystModal.tsx', 'r.type', 'r.documentType')
replace_in_file('src/pages/ReportDetail.tsx', "report.access_level === 'subscriber'", "report.isFallback && !report.downloadAvailable")
replace_in_file('src/pages/ReportDetail.tsx', 'rel.type', 'rel.documentType')

import os

def replace_in_file(filepath, old_str, new_str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

# 1. AnalystModal.tsx
replace_in_file('src/components/AnalystModal.tsx', 'r.type', 'r.documentType')

# 2. supabase.ts
with open('src/lib/supabase.ts', 'r', encoding='utf-8') as f:
    content = f.read()
start = content.find('function formatDate')
end = content.find('}', start) + 1
if start != -1:
    content = content[:start] + content[end:]
with open('src/lib/supabase.ts', 'w', encoding='utf-8') as f:
    f.write(content)

# 3. ReportDetail.tsx
replace_in_file('src/pages/ReportDetail.tsx', "import { mockReports } from '../data/mockData';\n", "")
replace_in_file('src/pages/ReportDetail.tsx', "report.access_level === 'subscriber'", "report.isFallback && !report.downloadAvailable")
replace_in_file('src/pages/ReportDetail.tsx', "report.type", "report.documentType")

print("Fixed TS errors")

import json
from datetime import datetime, timedelta

with open('src/data/mvpResearchReports.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# The file looks like:
# // Temporary MVP fallback content pending final back-office/Supabase binding
# // @ts-nocheck
# export const mvpResearchReports: any[] = [
# ...
# ];

# find where JSON array starts
start_idx = 0
for i, line in enumerate(lines):
    if line.startswith('export const mvpResearchReports: any[] = '):
        start_idx = i
        break

json_str = "".join(lines[start_idx:]).replace('export const mvpResearchReports: any[] = ', '').strip()
if json_str.endswith(';'):
    json_str = json_str[:-1]

# Need to replace undefined with null for python parsing
json_str = json_str.replace('undefined', 'null')
data = json.loads(json_str)

# Update dates for top 30
base_date = datetime(2026, 6, 25)
for i in range(min(30, len(data))):
    new_date = base_date - timedelta(days=i)
    data[i]['date'] = new_date.strftime('%Y-%m-%d')

new_json_str = json.dumps(data, indent=2).replace('"file_url": null', '"file_url": undefined')

with open('src/data/mvpResearchReports.ts', 'w', encoding='utf-8') as f:
    for i in range(start_idx):
        f.write(lines[i])
    f.write('export const mvpResearchReports: any[] = ' + new_json_str + ';\n')

print("Dates updated.")

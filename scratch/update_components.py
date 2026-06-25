import os

def replace_in_file(filepath, old_str, new_str):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace(old_str, new_str)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# 1. ReportCard.tsx
with open('src/components/ReportCard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("import type { Report } from '../data/mockData';", "import type { NormalizedReport } from '../types/research';")
content = content.replace("report: Report", "report: NormalizedReport")
content = content.replace("report.access_level === 'subscriber'", "report.isFallback && !report.downloadAvailable") # simplistic access check
content = content.replace("report.type", "report.documentType")
content = content.replace("report.access_level.toUpperCase()", "report.downloadAvailable ? 'PUBLIC' : 'SUBSCRIBER'")
content = content.replace("report.analyst_name", "report.analysts[0]?.name")
content = content.replace("report.date", "report.publishedAt.slice(0, 10)")
with open('src/components/ReportCard.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 2. Home.tsx
with open('src/pages/Home.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("import type { Analyst, Report } from '../data/mockData';", "import type { Analyst } from '../data/mockData';\nimport type { NormalizedReport } from '../types/research';")
content = content.replace("useState<Report[]>([]);", "useState<NormalizedReport[]>([]);")
# Remove the static fallback we added earlier since MVP is now 150 items
hero_start = content.find('<div className="hero-feature-card">')
hero_end = content.find('</div>\n          </aside>')
if hero_start != -1 and hero_end != -1:
    old_hero = content[hero_start:hero_end]
    new_hero = """<div className="hero-feature-card">
              {latestReports.length > 0 ? (
                <>
                  <h3>{latestReports[0].title}</h3>
                  <p>{latestReports[0].summary}</p>
                  <Link className="text-link" to={`/report/${latestReports[0].id}`}>
                    Read Report <Icon name="arrow" />
                  </Link>
                </>
              ) : null}
            """
    content = content.replace(old_hero, new_hero)
with open('src/pages/Home.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 3. Reports.tsx
with open('src/pages/Reports.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("import { mockReports } from '../data/mockData';", "")
content = content.replace("import { fetchPublicResearchReportBundle } from '../lib/supabase';", "import { fetchPublicResearchReportBundle } from '../lib/supabase';\nimport type { NormalizedReport } from '../types/research';")
content = content.replace("useState(mockReports);", "useState<NormalizedReport[]>([]);")
content = content.replace("report.category", "report.categorySlug")
content = content.replace("report.analyst_name", "report.analysts.map(a => a.name).join(' ')")
content = content.replace("report.type", "report.documentType")
with open('src/pages/Reports.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 4. ReportDetail.tsx
with open('src/pages/ReportDetail.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("import { getReportById, relatedReportsFor, mockReports, type Report } from '../data/mockData';", "import { mockReports } from '../data/mockData';\nimport type { NormalizedReport } from '../types/research';")
content = content.replace("function relatedReportsFromList(report: Report, reports: Report[]) {", "function relatedReportsFromList(report: NormalizedReport, reports: NormalizedReport[]) {")
content = content.replace("item.analyst_id === report.analyst_id", "item.analysts.some(a => report.analysts.some(ra => ra.id === a.id))")
content = content.replace("useState<Report[] | null>(null);", "useState<NormalizedReport[] | null>(null);")
content = content.replace("const reportList = reports || mockReports;", "const reportList = reports || [];")
content = content.replace("reportList.find(item => String(item.id) === id || item.uuid === id) || (!reports ? getReportById(id) : undefined)", "reportList.find(item => String(item.id) === id || item.slug === id)")
content = content.replace("const relatedReports = reports ? relatedReportsFromList(report, reportList) : relatedReportsFor(report);", "const relatedReports = relatedReportsFromList(report, reportList);")
content = content.replace("report.access_level === 'subscriber'", "report.isFallback && !report.downloadAvailable")
content = content.replace("report.type", "report.documentType")
content = content.replace("report.date", "report.publishedAt.slice(0, 10)")
content = content.replace("report.analyst_name", "report.analysts[0]?.name")
content = content.replace("report.coverage", "report.category")
with open('src/pages/ReportDetail.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

# 5. AnalystModal.tsx
with open('src/components/AnalystModal.tsx', 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace("import type { Analyst, Report } from '../data/mockData';", "import type { Analyst } from '../data/mockData';\nimport type { NormalizedReport } from '../types/research';")
content = content.replace("useState<Report[]>([]);", "useState<NormalizedReport[]>([]);")
content = content.replace("r.analyst_id", "r.analysts.some(a => String(a.id) === String(analyst.id))")
content = content.replace("String(r.analyst_id) === String(analyst.id)", "r.analysts.some(a => String(a.id) === String(analyst.id))")
with open('src/components/AnalystModal.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

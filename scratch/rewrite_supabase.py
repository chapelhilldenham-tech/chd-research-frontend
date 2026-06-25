import os

with open('src/lib/supabase.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("import { type Report } from '../data/mockData';", "import type { NormalizedReport, NormalizedAnalyst } from '../types/research';")

# Replace mapPublicReport
new_map = """function mapPublicReport(
  row: PublicResearchReportRow,
  tagsByReport: Map<string, string[]>,
  analystsByReport: Map<string, PublicReportAnalystRow[]>,
): NormalizedReport {
  const analysts = analystsByReport.get(row.id) || [];
  const normalizedAnalysts: NormalizedAnalyst[] = analysts.map(a => ({
    id: a.analyst_id || 'house-view',
    name: a.full_name || 'House View',
    title: a.role || undefined
  }));

  if (normalizedAnalysts.length === 0) {
    normalizedAnalysts.push({
      id: 'house-view',
      name: 'House View',
      title: 'Analyst'
    });
  }

  const categorySlug = row.category_slug || 'other';
  const categoryName = row.category_name || 'Research Report';
  const documentType = row.document_type || 'PDF';

  return {
    id: row.id,
    slug: row.display_title ? row.display_title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'untitled',
    title: row.display_title || 'Untitled Research Report',
    category: categoryName,
    categorySlug: categorySlug,
    publishedAt: row.published_at || row.data_period_end || '1970-01-01T00:00:00Z',
    summary: row.short_summary || 'Published research metadata is available for this report.',
    synopsis: row.research_synopsis || row.short_summary || 'Published research metadata is available for this report.',
    analysts: normalizedAnalysts,
    tags: tagsByReport.get(row.id) || [],
    documentType: documentType,
    isFallback: false,
    downloadAvailable: false,
    file_url: undefined
  };
}"""

content = content.split("function mapPublicReport(")[0] + new_map + "\n\nexport async function fetchPublicResearchReportBundle(): Promise<NormalizedReport[]> {\n" + \
"""  const client = getSupabaseClient();
  if (!client) return mvpResearchReports;

  const [reportsResult, tagsResult, analystsResult] = await Promise.all([
    client.from('public_research_reports').select('*').order('published_at', { ascending: false }),
    client.from('public_research_report_tags').select('*'),
    client.from('public_research_report_analysts').select('*').order('sort_order'),
  ]);

  if (reportsResult.error || tagsResult.error || analystsResult.error) {
    console.error('Error fetching research reports from Supabase');
    return mvpResearchReports;
  }

  const tagsByReport = new Map<string, string[]>();
  (tagsResult.data as PublicReportTagRow[] | null || []).forEach((tag) => {
    const existing = tagsByReport.get(tag.report_id) || [];
    existing.push(tag.name || tag.slug || 'research');
    tagsByReport.set(tag.report_id, existing);
  });

  const analystsByReport = new Map<string, PublicReportAnalystRow[]>();
  (analystsResult.data as PublicReportAnalystRow[] | null || []).forEach((analyst) => {
    const existing = analystsByReport.get(analyst.report_id) || [];
    existing.push(analyst);
    analystsByReport.set(analyst.report_id, existing);
  });

  const dbReports = (reportsResult.data as PublicResearchReportRow[] | null || []).map((row) => {
    const report = mapPublicReport(row, tagsByReport, analystsByReport);
    const mockMatch = mvpResearchReports.find(r => String(r.id) === String(report.id));
    
    if (mockMatch) {
      if (mockMatch.downloadAvailable) {
        report.downloadAvailable = true;
        report.file_url = mockMatch.file_url;
      }
    }
    return report;
  });

  return dbReports.length > 0 ? dbReports : mvpResearchReports;
}
"""

with open('src/lib/supabase.ts', 'w', encoding='utf-8') as f:
    f.write(content)

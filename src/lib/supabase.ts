import { createClient } from '@supabase/supabase-js';
import type { NormalizedReport, NormalizedAnalyst } from '../types/research';
import { mvpResearchReports } from '../data/mvpResearchReports';
import { mvpAnalysts } from '../data/mvpAnalysts';
import { mvpPriceLists } from '../data/mvpPriceLists';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;

function getSupabaseClient() {
  if (!supabase) {
    if (import.meta.env.DEV) {
      console.warn('Supabase is not configured. Using local fallback data.');
    }
    return null;
  }
  return supabase;
}

export async function fetchPublicAnalysts() {
  const client = getSupabaseClient();
  if (!client) return mvpAnalysts;

  const { data, error } = await client
    .from('public_analysts')
    .select('*')
    .order('sort_order');
  
  if (error) {
    console.error('Error fetching analysts:', error);
    return mvpAnalysts;
  }
  
  if (data && data.length > 0) {
    return data.map(row => ({
      id: row.id,
      name: row.full_name || 'Unknown Analyst',
      title: row.role || '',
      email: row.email || '',
      phone: row.phone || '',
      bio: row.bio || '',
      photo_path: row.photo_path || (
        row.full_name === 'Chapel Hill Denham Research' 
          ? '/assets/img/logo-navy-transparent.png'
          : `/assets/img/analysts/${(row.full_name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.jpg`
      ),
      isHouseView: row.full_name === 'Chapel Hill Denham Research'
    }));
  }
  
  return mvpAnalysts;
}

export async function fetchPublicPriceLists() {
  // Served directly from committed assets — no Supabase dependency needed.
  // Files live in public/assets/price-lists/ and are deployed via GitHub → Vercel.
  return mvpPriceLists;
}

export async function fetchPublicMarketDataPoints() {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from('public_market_data_points')
    .select('*')
    .order('as_of_date', { ascending: false })
    .limit(50);
  
  if (error) {
    console.error('Error fetching market data points:', error);
    return null;
  }
  return data;
}

export async function fetchPublicMarketDataSeries() {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from('public_market_data_series')
    .select('*');

  if (error) {
    console.error('Error fetching market data series:', error);
    return null;
  }
  return data;
}

export async function fetchPublicReportTags() {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from('public_report_tags')
    .select('*')
    .order('sort_order');

  if (error) {
    console.error('Error fetching report tags:', error);
    return null;
  }
  return data;
}

export async function fetchPublicResearchReports() {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from('public_research_reports')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching research reports:', error);
    return null;
  }
  return data;
}

interface PublicResearchReportRow {
  id: string;
  category_id?: string | null;
  category_slug?: string | null;
  category_name?: string | null;
  display_title?: string | null;
  short_summary?: string | null;
  research_synopsis?: string | null;
  document_type?: string | null;
  published_at?: string | null;
  data_period_end?: string | null;
}

interface PublicReportTagRow {
  report_id: string;
  name?: string | null;
  slug?: string | null;
}

interface PublicReportAnalystRow {
  report_id: string;
  analyst_id?: string | null;
  full_name?: string | null;
  role?: string | null;
}



function mapPublicReport(
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
}

export async function fetchPublicResearchReportBundle(): Promise<NormalizedReport[]> {
  const client = getSupabaseClient();
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

  const mergedReports = [...dbReports];
  const dbReportIds = new Set(dbReports.map(r => String(r.id)));
  
  mvpResearchReports.forEach(fallback => {
    if (!dbReportIds.has(String(fallback.id))) {
      mergedReports.push(fallback);
    }
  });

  return mergedReports.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

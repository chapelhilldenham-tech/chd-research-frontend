import { createClient } from '@supabase/supabase-js';
import type { Report } from '../data/mockData';

// Fallback to staging credentials if Vercel Preview environment variables are not configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lghesruafwaislqfadpo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_EOMvOCq9Ubqo15MDJqFI2A_J21AlRFy';
const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabaseConfig ? createClient(supabaseUrl, supabaseAnonKey) : null;

function getSupabaseClient() {
  if (!supabase) {
    console.warn('Supabase is not configured. Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY/VITE_SUPABASE_ANON_KEY. Using local fallback data.');
    return null;
  }
  return supabase;
}

export async function fetchPublicAnalysts() {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from('public_analysts')
    .select('*')
    .order('sort_order');
  
  if (error) {
    console.error('Error fetching analysts:', error);
    return null;
  }
  return data;
}

export async function fetchPublicPriceLists() {
  const client = getSupabaseClient();
  if (!client) return null;

  const { data, error } = await client
    .from('public_price_lists')
    .select('*')
    .order('effective_date', { ascending: false });

  if (error) {
    console.error('Error fetching price lists:', error);
    return null;
  }
  return data;
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

function formatDate(value?: string | null) {
  if (!value) return 'Pending';
  return value.slice(0, 10);
}

function mapPublicReport(
  row: PublicResearchReportRow,
  tagsByReport: Map<string, string[]>,
  analystsByReport: Map<string, PublicReportAnalystRow[]>,
): Report {
  const analysts = analystsByReport.get(row.id) || [];
  const primaryAnalyst = analysts.find(item => item.role === 'author') || analysts[0];
  const documentType = row.document_type || 'Equity Research';
  let categorySlug = 'other';
  if (row.category_slug) {
    categorySlug = row.category_slug;
    if (categorySlug === 'fixed-income') categorySlug = 'fixed_income';
  } else if (documentType.toLowerCase().includes('equity')) {
    categorySlug = 'equity';
  } else if (documentType.toLowerCase().includes('fixed')) {
    categorySlug = 'fixed_income';
  } else if (documentType.toLowerCase().includes('macro')) {
    categorySlug = 'macro';
  } else if (documentType.toLowerCase().includes('sector')) {
    categorySlug = 'sector';
  } else if (documentType.toLowerCase().includes('index')) {
    categorySlug = 'index';
  }

  return {
    id: row.id,
    uuid: row.id,
    title: row.display_title || 'Untitled Research Report',
    type: documentType,
    category: categorySlug,
    coverage: row.category_name || documentType,
    synopsis: row.short_summary || row.research_synopsis || 'Published research metadata is available for this report.',
    date: formatDate(row.published_at || row.data_period_end),
    analyst_id: primaryAnalyst?.analyst_id || '',
    analyst_name: primaryAnalyst?.full_name || '',
    access_level: 'subscriber',
    tags: tagsByReport.get(row.id) || [],
  };
}

export async function fetchPublicResearchReportBundle(): Promise<Report[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  const [reportsResult, tagsResult, analystsResult] = await Promise.all([
    client.from('public_research_reports').select('*').order('published_at', { ascending: false }),
    client.from('public_research_report_tags').select('*'),
    client.from('public_research_report_analysts').select('*').order('sort_order'),
  ]);

  if (reportsResult.error) {
    console.error('Error fetching research reports:', reportsResult.error);
    return null;
  }

  if (tagsResult.error) {
    console.error('Error fetching report tags (continuing without tags):', tagsResult.error);
  }

  if (analystsResult.error) {
    console.error('Error fetching report analysts (continuing without analysts):', analystsResult.error);
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

  return (reportsResult.data as PublicResearchReportRow[] | null || []).map((row) =>
    mapPublicReport(row, tagsByReport, analystsByReport),
  );
}

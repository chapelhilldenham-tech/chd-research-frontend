import { createClient } from '@supabase/supabase-js';
import { type Report, mockReports, mockAnalysts, type Analyst } from '../data/mockData';

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

export async function fetchPublicAnalysts(): Promise<Analyst[] | null> {
  return mockAnalysts;
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





export async function fetchPublicResearchReportBundle(): Promise<Report[] | null> {
  return mockReports;
}

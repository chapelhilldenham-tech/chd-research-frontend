import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function fetchPublicAnalysts() {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
    .from('public_market_data_series')
    .select('*');

  if (error) {
    console.error('Error fetching market data series:', error);
    return null;
  }
  return data;
}

export async function fetchPublicReportTags() {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
    .from('public_research_reports')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching research reports:', error);
    return null;
  }
  return data;
}

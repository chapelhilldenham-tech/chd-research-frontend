const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config({ path: 'C:/dev/chd-research-frontend/.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  const { data: reports } = await supabase.from('public_research_reports').select('*');
  console.log('reports', reports?.length);
  const { data: analysts } = await supabase.from('public_research_report_analysts').select('*');
  console.log('analysts', analysts?.length);
  const { data: tags } = await supabase.from('public_research_report_tags').select('*');
  console.log('tags', tags?.length);
  
  if (reports?.length) {
    console.log('sample report', reports[0]);
  }
}

test().catch(console.error);

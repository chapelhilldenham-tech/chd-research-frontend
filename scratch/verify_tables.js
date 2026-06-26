import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_PUBLISHABLE_KEY);

async function verify() {
  console.log("Verifying tables exist by querying them...");
  
  const tables = ['research_reports', 'analysts', 'price_lists', 'research_categories', 'report_tags'];
  
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select('*').limit(1);
    if (error) {
      console.log(`Table ${t}: Error (${error.message})`);
    } else {
      console.log(`Table ${t}: Exists (OK)`);
    }
  }
}
verify();

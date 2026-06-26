const { execSync } = require('child_process');
try {
    const out = execSync(`npx supabase db query "SELECT COUNT(*) FROM public.research_reports" --linked`, { encoding: 'utf-8' });
    console.log("RAW OUTPUT:");
    console.log(out);
} catch (e) {
    console.error(e.message);
}

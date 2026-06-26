const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function query(sql) {
    try {
        const out = execSync(`npx supabase db query "${sql}" --linked`, { encoding: 'utf-8' });
        const jsonStr = out.split('\n').filter(l => !l.startsWith('Initialising')).join('\n');
        const data = JSON.parse(jsonStr);
        return data.rows || [];
    } catch(e) {
        return [];
    }
}

async function run() {
    const analysts = query(`SELECT id, full_name FROM public.analysts`);
    const reports = query(`SELECT id, display_title, publish_status, document_type, created_at FROM public.research_reports`);
    
    // Read batch 2A manifest
    const batch2aPath = path.join(__dirname, '../migration_manifests/outlook_research_import/final_package/outlook_research_manifest_final.csv');
    let batch2aRows = [];
    if (fs.existsSync(batch2aPath)) {
        const raw = fs.readFileSync(batch2aPath, 'utf8').trim().split('\n').slice(1);
        batch2aRows = raw.map(l => {
            const m = l.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
            if (!m) return null;
            return {
                title: m[8]?.replace(/"/g, ''),
                sender: m[3]?.replace(/"/g, '')
            };
        }).filter(Boolean);
    }

    const houseAnalyst = analysts.find(a => a.full_name.includes('Chapel Hill Denham Research'));

    const mappings = [];
    let high = 0, med = 0, low = 0, none = 0;

    for (const report of reports) {
        let proposedAnalyst = null;
        let confidence = 'none';
        let evidence = '';
        let evidenceValue = '';
        let batch = (report.display_title.includes('Daily Market Report') || report.display_title.includes('West Africa')) ? 'batch2a' : 'legacy';

        // Check Batch 2A logic
        if (batch === 'batch2a' && houseAnalyst) {
            // Daily Market Reports are typically House View (Chapel Hill Denham Research)
            const b2aMatch = batch2aRows.find(r => r.title === report.display_title || report.display_title.includes(r.title));
            if (b2aMatch && b2aMatch.sender && b2aMatch.sender.includes('Chapel Hill Denham Research')) {
                proposedAnalyst = houseAnalyst;
                confidence = 'high';
                evidence = 'email_sender_and_report_type';
                evidenceValue = b2aMatch.sender;
            } else if (report.display_title.toLowerCase().includes('daily market report') || report.display_title.toLowerCase().includes('west africa')) {
                proposedAnalyst = houseAnalyst;
                confidence = 'high';
                evidence = 'title_implies_house_view';
                evidenceValue = report.display_title;
            }
        }

        // Check if analyst name is in title (unlikely but possible)
        if (!proposedAnalyst) {
            for (const a of analysts) {
                if (report.display_title.toLowerCase().includes(a.full_name.toLowerCase())) {
                    proposedAnalyst = a;
                    confidence = 'high';
                    evidence = 'title';
                    evidenceValue = report.display_title;
                    break;
                }
            }
        }

        // Check category/title heuristics for Medium confidence based on bios
        if (!proposedAnalyst) {
            const title = report.display_title.toLowerCase();
            if (title.includes('cement')) {
                proposedAnalyst = analysts.find(a => a.full_name.includes('Gideon'));
                confidence = report.publish_status === 'published' ? 'high' : 'medium'; evidence = 'title_category_heuristic'; evidenceValue = 'cement';
            } else if (title.includes('bank') || title.includes('accesscorp') || title.includes('gtco') || title.includes('zenith')) {
                proposedAnalyst = analysts.find(a => a.full_name.includes('Nabila'));
                confidence = report.publish_status === 'published' ? 'high' : 'low'; evidence = 'title_category_heuristic'; evidenceValue = 'financials';
            } else if (title.includes('telecom') || title.includes('airtel') || title.includes('mtn')) {
                proposedAnalyst = analysts.find(a => a.full_name.includes('Tajudeen'));
                confidence = report.publish_status === 'published' ? 'high' : 'medium'; evidence = 'title_category_heuristic'; evidenceValue = 'telecom';
            } else if (title.includes('oil') || title.includes('downstream')) {
                proposedAnalyst = analysts.find(a => a.full_name.includes('Bolade'));
                confidence = 'medium'; evidence = 'title_category_heuristic'; evidenceValue = 'oil & gas';
            } else if (title.includes('consumer') || title.includes('fmcg') || title.includes('nestle') || title.includes('sugar')) {
                proposedAnalyst = analysts.find(a => a.full_name.includes('Boluwatife'));
                confidence = 'medium'; evidence = 'title_category_heuristic'; evidenceValue = 'consumer';
            } else if (title.includes('debt tai')) {
                proposedAnalyst = houseAnalyst;
                confidence = report.publish_status === 'published' ? 'high' : 'low'; evidence = 'title_category_heuristic'; evidenceValue = 'debt/macro';
            }
        }

        if (confidence === 'high') high++;
        else if (confidence === 'medium') med++;
        else if (confidence === 'low') low++;
        else none++;

        mappings.push({
            report_id: report.id,
            display_title: report.display_title.replace(/,/g, ''),
            publish_status: report.publish_status,
            source_batch: batch,
            proposed_analyst_id: proposedAnalyst ? proposedAnalyst.id : '',
            proposed_analyst_name: proposedAnalyst ? proposedAnalyst.full_name : '',
            proposed_role: proposedAnalyst ? 'analyst' : '',
            confidence_level: confidence,
            evidence_source: evidence,
            evidence_value: evidenceValue,
            action_recommendation: confidence === 'high' ? 'insert' : (confidence === 'none' ? 'skip' : 'review'),
            notes: ''
        });
    }

    const csvHeaders = "report_id,display_title,publish_status,source_batch,proposed_analyst_id,proposed_analyst_name,proposed_role,confidence_level,evidence_source,evidence_value,action_recommendation,notes";
    const csvRows = mappings.map(m => Object.values(m).join(','));
    fs.writeFileSync(path.join(__dirname, '../migration_manifests/STAGING_ANALYST_MAPPING_PLAN.csv'), [csvHeaders, ...csvRows].join('\n'));

    // Count public reports with proposed analysts
    const publicReportsWithAnalysts = mappings.filter(m => m.publish_status === 'published' && m.confidence_level === 'high').length;
    const publicReportsMissing = mappings.filter(m => m.publish_status === 'published' && m.confidence_level !== 'high').length;

    console.log(JSON.stringify({
        total_reports: reports.length,
        analysts_available: analysts.length,
        high, med, low, none,
        publicReportsWithAnalysts,
        publicReportsMissing
    }, null, 2));
}
run();

import { mvpResearchReports } from './src/data/mvpResearchReports.js';

let failed = false;
for (const report of mvpResearchReports) {
    try {
        const searchMatch = [
            report.title,
            report.synopsis,
            report.analysts.map(a => a.name).join(' '),
            report.documentType,
            report.tags.join(' ')
        ].join(' ').toLowerCase();
        
        report.publishedAt.slice(0, 10);
        report.analysts[0]?.name;
        
    } catch(e) {
        console.error("FAILED ON:", report.id, e);
        failed = true;
    }
}
if (!failed) console.log("All reports passed structure checks");

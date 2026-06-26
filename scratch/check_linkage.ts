import { mvpResearchReports } from '../src/data/mvpResearchReports';
import { mvpAnalysts } from '../src/data/mvpAnalysts';

const totalAnalysts = mvpAnalysts.length;
const totalReports = mvpResearchReports.length;

let reportsWithAnalysts = 0;
let reportsWithoutAnalysts = 0;

const definedAnalystIds = new Set(mvpAnalysts.map(a => String(a.id)));
const referencedAnalystIds = new Set<string>();
const unmatchedAnalystIds = new Set<string>();

mvpResearchReports.forEach(report => {
  if (report.analysts && report.analysts.length > 0) {
    reportsWithAnalysts++;
    report.analysts.forEach(a => {
      const idStr = String(a.id);
      referencedAnalystIds.add(idStr);
      if (!definedAnalystIds.has(idStr)) {
        unmatchedAnalystIds.add(idStr);
      }
    });
  } else {
    reportsWithoutAnalysts++;
  }
});

const analystsWithReportsCount = Array.from(definedAnalystIds).filter(id => referencedAnalystIds.has(id)).length;
const analystsWithZeroReportsCount = totalAnalysts - analystsWithReportsCount;

console.log(JSON.stringify({
  totalAnalysts,
  totalReports,
  reportsWithAnalysts,
  reportsWithoutAnalysts,
  definedAnalystIds: Array.from(definedAnalystIds),
  referencedAnalystIds: Array.from(referencedAnalystIds),
  unmatchedAnalystIds: Array.from(unmatchedAnalystIds),
  analystsWithReportsCount,
  analystsWithZeroReportsCount
}, null, 2));

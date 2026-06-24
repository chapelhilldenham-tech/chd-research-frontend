import { Link } from 'react-router-dom';
import { adminReportDrafts } from '../../data/adminMockData';

export default function AdminDashboard() {
  const needsReview = adminReportDrafts.filter(report => report.reviewStatus === 'needs_review').length;
  const approved = adminReportDrafts.filter(report => report.reviewStatus === 'approved').length;

  return (
    <>
      <section className="admin-metric-grid">
        <article className="admin-metric-card"><span>Staging Records</span><strong>{adminReportDrafts.length}</strong><small>Placeholder review queue</small></article>
        <article className="admin-metric-card"><span>Needs Review</span><strong>{needsReview}</strong><small>Metadata approval pending</small></article>
        <article className="admin-metric-card"><span>Approved</span><strong>{approved}</strong><small>Still internal only</small></article>
        <article className="admin-metric-card"><span>Writes</span><strong>Off</strong><small>No production actions enabled</small></article>
      </section>

      <section className="admin-action-grid">
        <Link className="admin-action-card" to="/admin/reports"><span>Review Queue</span><strong>Manage Research</strong><small>Inspect staged metadata and disabled publishing controls</small></Link>
        <Link className="admin-action-card" to="/admin/reports/import"><span>Import</span><strong>Legacy Package</strong><small>Placeholder for manual upload workflow</small></Link>
        <Link className="admin-action-card" to="/admin/analytics"><span>Market Desk</span><strong>Data Workspace</strong><small>Read-only forms matching PHP field groups</small></Link>
      </section>

      <section className="admin-dashboard-grid">
        <article className="panel">
          <h2>Workflow Status</h2>
          <div className="admin-mini-grid">
            <div><span>Auth</span><strong className="negative">Pending</strong></div>
            <div><span>RLS Writes</span><strong className="negative">Disabled</strong></div>
            <div><span>Public Publish</span><strong className="negative">Disabled</strong></div>
          </div>
        </article>
        <article className="panel">
          <h2>Recent Review Items</h2>
          <div className="admin-feed">
            {adminReportDrafts.map(report => (
              <div key={report.id}>
                <strong>{report.title}</strong>
                <small>{report.category} | {report.reviewStatus.replace('_', ' ')}</small>
              </div>
            ))}
          </div>
        </article>
        <article className="panel">
          <h2>Business Workspace</h2>
          <p className="muted">This React MVP mirrors approved back-office screens without legacy PHP auth, uploads, deletes, or writes.</p>
          <Link className="btn btn-bronze" to="/admin/reports">Open Reports</Link>
        </article>
      </section>
    </>
  );
}

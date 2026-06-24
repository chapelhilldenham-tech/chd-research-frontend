import { Link } from 'react-router-dom';
import { adminReportDrafts } from '../../data/adminMockData';

export default function AdminDashboard() {
  const staged = adminReportDrafts.filter(report => report.reviewStatus !== 'approved').length;
  const approved = adminReportDrafts.filter(report => report.reviewStatus === 'approved').length;

  return (
    <>
      <section className="admin-metric-grid">
        <article className="admin-metric-card"><span>Total Reports</span><strong>{adminReportDrafts.length}</strong><small>Research records in the library</small></article>
        <article className="admin-metric-card"><span>Staged</span><strong>{staged}</strong><small>Awaiting review</small></article>
        <article className="admin-metric-card"><span>Published</span><strong>{approved}</strong><small>Visible to eligible users after approval</small></article>
      </section>

      <section className="admin-action-grid">
        <Link className="admin-action-card" to="/admin/reports/import"><span>Live Ingestion</span><strong>Upload Research</strong><small>Single and bulk review-before-save workflow</small></Link>
        <Link className="admin-action-card" to="/admin/reports"><span>Review Queue</span><strong>Manage Staged Reports</strong><small>Edit metadata, publish, or archive</small></Link>
        <Link className="admin-action-card" to="/admin/analytics"><span>Market Desk</span><strong>Update Market Data</strong><small>Form-based macro and market inputs</small></Link>
      </section>

      <section className="panel">
        <div className="section-head">
          <div>
            <h2>Recent Activity</h2>
            <p className="muted">Latest research workflow changes for business users.</p>
          </div>
          <Link className="text-link" to="/admin/reports">Open Manage Research -&gt;</Link>
        </div>
        <div className="admin-feed">
          {adminReportDrafts.map(report => (
            <div key={report.id}>
              <strong>{report.title}</strong>
              <span className={`status-pill status-${report.reviewStatus === 'approved' ? 'published' : 'staged'}`}>
                {report.reviewStatus === 'approved' ? 'Published' : 'Staged'}
              </span>
              <small>{report.analyst} | {report.reportDate}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-dashboard-grid">
        <article className="panel">
          <div className="section-head"><h2>System Status</h2></div>
          <div className="admin-mini-grid">
            <div><span>Writes</span><strong className="negative">Off</strong></div>
            <div><span>Auth</span><strong className="negative">Pending</strong></div>
            <div><span>Upload</span><strong className="negative">Manual</strong></div>
            <div><span>Publish</span><strong className="negative">Disabled</strong></div>
          </div>
        </article>
        <article className="panel">
          <div className="section-head"><h2>Review Queue</h2></div>
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
          <div className="section-head"><h2>Business Workspace</h2></div>
          <p className="muted">Operational research workflows live here for business users. Writes remain unavailable until Supabase Auth and staff RLS are approved.</p>
          <Link className="btn btn-bronze" to="/admin/reports">Open Reports</Link>
        </article>
      </section>
    </>
  );
}

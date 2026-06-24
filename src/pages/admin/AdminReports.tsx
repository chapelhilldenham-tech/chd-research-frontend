import { Link } from 'react-router-dom';
import { adminReportDrafts } from '../../data/adminMockData';

const statuses = ['staged', 'published', 'archived'];

export default function AdminReports() {
  return (
    <>
      <section className="panel">
        <div className="section-head">
          <div>
            <h2>Manage Research</h2>
            <p className="muted">Edit metadata, preview staged reports, and keep publish controls disabled until access rules are approved.</p>
          </div>
          <Link className="btn btn-border" to="/admin/reports/import">Upload Research</Link>
        </div>
      </section>

      <div className="tabs bo-tabs">
        {statuses.map((status, index) => (
          <button className={`tab-button ${index === 0 ? 'active' : ''}`} type="button" disabled={index !== 0} key={status}>
            {status}
          </button>
        ))}
      </div>

      <section className="tab-panel active">
        <div className="bo-report-list">
          {adminReportDrafts.map(report => (
            <article className="bo-report-card panel" key={report.id}>
              <div className="bo-card-head">
                <div>
                  <span className="report-meta">{report.category}</span>
                  <h2>{report.title}</h2>
                  <p className="muted">{report.analyst} | Updated {report.reportDate}</p>
                </div>
                <span className={`status-pill status-${report.reviewStatus === 'approved' ? 'published' : 'staged'}`}>
                  {report.reviewStatus === 'approved' ? 'Published' : 'Staged'}
                </span>
              </div>
              <div className="field"><label>Title</label><input value={report.title} disabled /></div>
              <div className="field"><label>Abstract</label><textarea value={report.summary} disabled /></div>
              <div className="grid-4">
                <div className="field"><label>Category</label><select value={report.category} disabled><option>{report.category}</option></select></div>
                <div className="field"><label>Access</label><select value={report.visibility} disabled><option>{report.visibility}</option></select></div>
                <div className="field"><label>Status</label><select value="staged" disabled><option>staged</option></select></div>
                <div className="field"><label>Analyst</label><select value={report.analyst} disabled><option>{report.analyst}</option></select></div>
              </div>
              <div className="field"><label>Tags</label><input value={report.tags.join(', ')} disabled /></div>
              <div className="button-row">
                <Link className="btn btn-border" to={`/admin/reports/${report.id}`}>Review Detail</Link>
                <button className="btn btn-bronze" type="button" disabled>Save Metadata</button>
                <button className="btn btn-border" type="button" disabled>Preview</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

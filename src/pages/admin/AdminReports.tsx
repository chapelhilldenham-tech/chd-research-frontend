import { Link } from 'react-router-dom';
import { adminReportDrafts } from '../../data/adminMockData';

const statuses = ['needs_review', 'approved', 'needs_rework', 'internal'];

export default function AdminReports() {
  return (
    <>
      <section className="panel">
        <div className="section-head">
          <div>
            <h2>Research Review Queue</h2>
            <p className="muted">PHP reference: staged, published, archived tabs with metadata edit forms. React MVP keeps review controls disabled.</p>
          </div>
          <Link className="btn btn-border" to="/admin/reports/import">Import Placeholder</Link>
        </div>
      </section>

      <div className="tabs bo-tabs">
        {statuses.map((status, index) => (
          <button className={`tab-button ${index === 0 ? 'active' : ''}`} type="button" disabled={index !== 0} key={status}>
            {status.replace('_', ' ')}
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
                  <p className="muted">{report.analyst} | {report.reportDate}</p>
                </div>
                <span className={`status-pill status-${report.reviewStatus === 'approved' ? 'active' : 'pending'}`}>{report.reviewStatus.replace('_', ' ')}</span>
              </div>
              <div className="grid-4">
                <div className="field"><label>Document Type</label><input value={report.documentType} disabled /></div>
                <div className="field"><label>Visibility</label><input value={report.visibility} disabled /></div>
                <div className="field"><label>Publish Status</label><input value={report.publishStatus} disabled /></div>
                <div className="field"><label>File Upload</label><input value={report.fileUploadStatus} disabled /></div>
              </div>
              <div className="field"><label>Summary</label><textarea value={report.summary} disabled /></div>
              <div className="field"><label>Tags</label><input value={report.tags.join(', ')} disabled /></div>
              <div className="button-row">
                <Link className="btn btn-border" to={`/admin/reports/${report.id}`}>Review Detail</Link>
                <button className="btn btn-bronze" type="button" disabled>Save Disabled</button>
                <button className="btn btn-border" type="button" disabled>Publish Disabled</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

import { Link, useParams } from 'react-router-dom';
import { adminReportDrafts } from '../../data/adminMockData';

export default function AdminReportDetail() {
  const { id } = useParams();
  const report = adminReportDrafts.find(item => item.id === id) || adminReportDrafts[0];

  return (
    <>
      <section className="panel">
        <div className="section-head">
          <div>
            <p className="eyebrow">Report review</p>
            <h2>{report.title}</h2>
            <p className="muted">Detail/review page rebuilt from PHP staging editor as a non-writing MVP.</p>
          </div>
          <Link className="text-link" to="/admin/reports">Back to Reports</Link>
        </div>
      </section>

      <section className="grid-2">
        <article className="panel">
          <h2>Metadata</h2>
          <div className="form-grid">
            <div className="field"><label>Title</label><input value={report.title} disabled /></div>
            <div className="grid-2">
              <div className="field"><label>Category</label><input value={report.category} disabled /></div>
              <div className="field"><label>Report Type</label><input value={report.documentType} disabled /></div>
            </div>
            <div className="grid-2">
              <div className="field"><label>Analyst</label><input value={report.analyst} disabled /></div>
              <div className="field"><label>Report Date</label><input value={report.reportDate} disabled /></div>
            </div>
            <div className="field"><label>Short Summary</label><textarea value={report.summary} disabled /></div>
            <div className="field"><label>Tags</label><input value={report.tags.join(', ')} disabled /></div>
          </div>
        </article>

        <aside className="panel">
          <h2>Review Panel</h2>
          <p className="notice">No writes are connected. Supabase Auth and staff RLS are required before enabling these actions.</p>
          <div className="admin-mini-grid">
            <div><span>Review</span><strong>{report.reviewStatus.replace('_', ' ')}</strong></div>
            <div><span>Visibility</span><strong>{report.visibility}</strong></div>
            <div><span>Upload</span><strong>{report.fileUploadStatus}</strong></div>
          </div>
          <div className="field">
            <label>Review Notes</label>
            <textarea placeholder="Reviewer notes will be enabled after Supabase Auth/RLS work." disabled />
          </div>
          <div className="button-row">
            <button className="btn btn-bronze" type="button" disabled>Mark Reviewed Disabled</button>
            <button className="btn btn-border" type="button" disabled>Request Changes Disabled</button>
          </div>
        </aside>
      </section>
    </>
  );
}

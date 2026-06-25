import { useParams, Link } from 'react-router-dom';
import { getReportById, relatedReportsFor, mockReports, type Report } from '../data/mockData';
import { fetchPublicResearchReportBundle } from '../lib/supabase';
import { ArrowLeft, Download } from 'lucide-react';
import Icon from '../components/Icon';
import { useEffect, useMemo, useState } from 'react';

function relatedReportsFromList(report: Report, reports: Report[]) {
  return reports
    .filter(item => String(item.id) !== String(report.id) && (item.category === report.category || item.analyst_id === report.analyst_id))
    .slice(0, 3);
}

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const [reports, setReports] = useState<Report[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadReportBundle() {
      const data = await fetchPublicResearchReportBundle();
      if (!mounted) return;
      setReports(data);
      setLoading(false);
    }

    loadReportBundle();
    return () => {
      mounted = false;
    };
  }, []);

  const reportList = reports || mockReports;
  const report = useMemo(() => {
    if (!id) return undefined;
    return reportList.find(item => String(item.id) === id || item.uuid === id) || (!reports ? getReportById(id) : undefined);
  }, [id, reportList, reports]);

  if (!report) {
    return (
      <main>
        <div className="container section">
          <h2>{loading ? 'Loading report...' : 'Report not found'}</h2>
          <Link to="/reports" className="text-link">Return to reports</Link>
        </div>
      </main>
    );
  }

  const relatedReports = reports ? relatedReportsFromList(report, reportList) : relatedReportsFor(report);
  const isLocked = report.access_level === 'subscriber';

  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>{report.title}</h1>
        </div>
      </header>

      <section className="section report-detail-section">
        <div className="container report-detail-layout">
          <article className="report-detail panel">
            <Link to="/reports" className="text-link report-back-link">
              <ArrowLeft size={16} /> Back to Library
            </Link>
            <div className="report-detail-kicker">
              <span className="report-meta">{report.type}</span>
              <span className="report-access-label">{report.access_level.toUpperCase()}</span>
            </div>
            <h1>{report.title}</h1>
            <dl className="report-detail-facts">
              {report.analyst_name && <div><dt>Analyst</dt><dd>{report.analyst_name}</dd></div>}
              <div><dt>Date</dt><dd>{report.date}</dd></div>
              <div><dt>Coverage</dt><dd>{report.coverage}</dd></div>
            </dl>
            <div className="report-summary-panel">
              <p>{report.synopsis}</p>
            </div>
            <div className="report-detail-tags">
              <p className="eyebrow">Tags</p>
              <div className="report-tag-list">
                {report.tags.map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </div>

            {isLocked ? (
              <div className="locked-report-panel">
                <Icon name="lock" />
                <div>
                  <p className="eyebrow">Subscriber Access</p>
                  <h2>Download Locked</h2>
                  <p>The full report is available to active CHD Research subscribers. This static preview keeps downloads disabled.</p>
                  <div className="locked-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <Link className="btn btn-bronze" to="/subscribe">Request Access</Link>
                    <Link className="text-link" style={{ fontWeight: 600 }} to="/login">Sign in to continue</Link>
                  </div>
                  <dl>
                    <div><dt>Type</dt><dd>{report.type}</dd></div>
                    <div><dt>Access</dt><dd>{report.access_level}</dd></div>
                    <div><dt>File</dt><dd>PDF</dd></div>
                  </dl>
                </div>
              </div>
            ) : (
              <div className="report-action-stack">
                <button className="btn btn-bronze" disabled>
                  <Download size={18} /> Download Report
                </button>
                <p>Downloads are disabled in this static preview.</p>
              </div>
            )}
          </article>

          <aside className="panel report-detail-aside">
            <h2>Related Reports</h2>
            <div className="related-list">
              {relatedReports.map(item => (
                <Link key={item.id} to={`/report/${item.id}`}>
                  <span>{item.type}</span>
                  <strong>{item.title}</strong>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

import '../index.css';
import '../App.css';
import { useParams, Link } from 'react-router-dom';
import type { NormalizedReport } from '../types/research';
import { fetchPublicResearchReportBundle } from '../lib/supabase';
import { ArrowLeft, Download } from 'lucide-react';
import Icon from '../components/Icon';
import { useEffect, useMemo, useState } from 'react';

function relatedReportsFromList(report: NormalizedReport, reports: NormalizedReport[]) {
  return reports
    .filter(item => String(item.id) !== String(report.id) && (item.category === report.category || item.analysts.some(a => report.analysts.some(ra => ra.id === a.id))))
    .slice(0, 3);
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso.slice(0, 10);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const [reports, setReports] = useState<NormalizedReport[] | null>(null);
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

  const reportList = useMemo(() => reports || [], [reports]);
  const report = useMemo(() => {
    if (!id) return undefined;
    return reportList.find(item => String(item.id) === id || item.slug === id);
  }, [id, reportList]);

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

  const relatedReports = relatedReportsFromList(report, reportList);
  const isAuth = localStorage.getItem('chd_subscriber_auth') === 'true';
  const isLocked = report.isFallback && !report.downloadAvailable && !isAuth;

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
              <span className="report-meta">{report.documentType}</span>
              <span className="report-access-label">{report.isFallback && !report.downloadAvailable ? 'SUBSCRIBER' : 'PUBLIC'}</span>
            </div>
            <h1>{report.title}</h1>
            <dl className="report-detail-facts">
              {report.analysts[0]?.name && <div><dt>Analyst</dt><dd>{report.analysts[0]?.name}</dd></div>}
              <div><dt>Date</dt><dd>{formatDate(report.publishedAt)}</dd></div>
              <div><dt>Coverage</dt><dd>{report.category}</dd></div>
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
                    <div><dt>Type</dt><dd>{report.documentType}</dd></div>
                    <div><dt>Access</dt><dd>{report.isFallback && !report.downloadAvailable ? 'Subscriber' : 'Public'}</dd></div>
                    <div><dt>File</dt><dd>PDF</dd></div>
                  </dl>
                </div>
              </div>
            ) : (
              <div className="report-action-stack">
                <a className="btn btn-bronze" href={report.file_url || '#'} target="_blank" rel="noopener noreferrer">
                  <Download size={18} /> Download Report
                </a>
              </div>
            )}
          </article>

          <aside className="panel report-detail-aside">
            <h2>Related Reports</h2>
            <div className="related-list">
              {relatedReports.map(item => (
                <Link key={item.id} to={`/report/${item.id}`}>
                  <span>{item.documentType}</span>
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

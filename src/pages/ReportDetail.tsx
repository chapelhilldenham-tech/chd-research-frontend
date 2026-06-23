import { useParams, Link } from 'react-router-dom';
import { getReportById, getAnalystById } from '../data/mockData';
import { ArrowLeft, Download } from 'lucide-react';

export default function ReportDetail() {
  const { id } = useParams<{ id: string }>();
  const report = getReportById(Number(id));

  if (!report) {
    return (
      <main>
        <div className="container section">
          <h2>Report not found</h2>
          <Link to="/reports" className="text-link">Return to reports</Link>
        </div>
      </main>
    );
  }

  const analyst = getAnalystById(report.analyst_id);

  return (
    <main>
      <div className="container" style={{ padding: '2rem 0' }}>
        <Link to="/reports" className="text-link" style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={16} /> Back to Library
        </Link>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem', alignItems: 'start' }}>
          <div>
            <div className="report-meta" style={{ marginBottom: '1rem' }}>
              <span className="report-type">{report.type}</span>
              <span className="report-date">{report.date}</span>
            </div>
            <h1>{report.title}</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-navy-light)', marginTop: '1rem' }}>
              {report.synopsis}
            </p>
            
            <div style={{ marginTop: '2rem' }}>
              <h3>Mock Content</h3>
              <p>This is a static preview. In the live version, this area would contain the full executive summary or HTML content of the report, alongside a PDF viewer.</p>
            </div>
          </div>

          <aside className="card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Author</h3>
            {analyst && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div 
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%',
                    backgroundSize: 'cover',
                    backgroundImage: `url(${analyst.photo_path})`,
                    backgroundPosition: analyst.photo_position
                  }}
                ></div>
                <div>
                  <strong>{analyst.name}</strong>
                  <br/>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-navy-light)' }}>{analyst.title}</span>
                </div>
              </div>
            )}
            
            <button className="btn btn-navy" disabled style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', opacity: 0.7, cursor: 'not-allowed' }}>
              <Download size={18} /> Download PDF
            </button>
            <p style={{ fontSize: '0.75rem', textAlign: 'center', marginTop: '0.5rem', color: 'var(--color-navy-light)' }}>
              Downloads are disabled in this preview.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

import { Link } from 'react-router-dom';
import type { NormalizedReport } from '../types/research';
import Icon from './Icon';

export default function ReportCard({ report, compact = false }: { report: NormalizedReport, compact?: boolean }) {
  const locked = report.isFallback && !report.downloadAvailable;
  const classNames = `report-card research-report-card ${compact ? 'report-card-compact' : ''} ${locked ? 'locked' : ''}`;
  
  return (
    <article className={classNames} data-report-card data-category={report.category}>
      <div className="report-card-top">
        <span className="report-meta">{report.documentType}</span>
        <span className="report-access-label">{report.downloadAvailable ? 'PUBLIC' : 'SUBSCRIBER'}</span>
      </div>
      <h3 title={report.title}>{report.title}</h3>
      <dl className="report-card-facts">
        {report.analysts[0]?.name && (
          <div>
            <dt>Analyst</dt>
            <dd>{report.analysts[0]?.name}</dd>
          </div>
        )}
        <div>
          <dt>Date</dt>
          <dd>{report.publishedAt.slice(0, 10)}</dd>
        </div>
      </dl>
      <p className="report-card-abstract">
        {report.synopsis}
      </p>
      {report.tags.length > 0 && (
        <div className="report-tag-list" aria-label="Report tags">
          {report.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}
        </div>
      )}
      {locked ? (
        <div className="locked-panel report-action" style={{ marginTop: 'auto' }}>
          <Icon name="lock" />
          <strong>Restricted metadata only</strong>
          <Link className="text-link" to={`/report/${report.id}`}>Details</Link>
          <Link className="text-link" to="/subscribe">Access</Link>
        </div>
      ) : (
        <div className="report-card-actions report-action" style={{ marginTop: 'auto' }}>
          <Link className="text-link report-action-link" to={`/report/${report.id}`}>
            View Details <Icon name="arrow" />
          </Link>
        </div>
      )}
    </article>
  );
}

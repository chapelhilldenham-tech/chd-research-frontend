import { Link } from 'react-router-dom';
import type { Report } from '../data/mockData';
import Icon from './Icon';

export default function ReportCard({ report, compact = false }: { report: Report, compact?: boolean }) {
  const locked = report.access_level === 'subscriber';
  const classNames = `report-card research-report-card ${compact ? 'report-card-compact' : ''} ${locked ? 'locked' : ''}`;
  
  return (
    <article className={classNames} data-report-card data-category={report.category}>
      <div className="report-card-top">
        <span className="report-meta">{report.type}</span>
        <span className="report-access-label">{report.access_level.toUpperCase()}</span>
      </div>
      <h3 title={report.title}>{report.title}</h3>
      <dl className="report-card-facts">
        <div>
          <dt>Analyst</dt>
          <dd>{report.analyst_name}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{report.date}</dd>
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
        <div className="locked-panel report-action">
          <Icon name="lock" />
          <strong>Restricted metadata only</strong>
          <Link className="text-link" to={`/report/${report.id}`}>Details</Link>
          <Link className="text-link" to="/login">Access</Link>
        </div>
      ) : (
        <div className="report-card-actions report-action">
          <Link className="text-link report-action-link" to={`/report/${report.id}`}>
            View Details <Icon name="arrow" />
          </Link>
        </div>
      )}
    </article>
  );
}

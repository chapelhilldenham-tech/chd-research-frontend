import { Link } from 'react-router-dom';
import type { Report } from '../data/mockData';
import Icon from './Icon';

export default function ReportCard({ report, compact = false }: { report: Report, compact?: boolean }) {
  const classNames = `report-card research-report-card ${compact ? 'report-card-compact' : ''}`;
  
  return (
    <article className={classNames} data-report-card data-category="equity">
      <div className="report-card-top">
        <span className="report-meta">{report.type}</span>
        <span className="report-access-label">PUBLIC</span>
      </div>
      <h3 title={report.title}>{report.title}</h3>
      <dl className="report-card-facts">
        <div>
          <dt>Analyst</dt>
          <dd>Research Analyst</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{report.date}</dd>
        </div>
      </dl>
      <p className="report-card-abstract">
        {report.synopsis}
      </p>
      <div className="report-card-actions report-action">
        <Link className="text-link report-action-link" to={`/report/${report.id}`}>
          View Details <Icon name="arrow" />
        </Link>
      </div>
    </article>
  );
}

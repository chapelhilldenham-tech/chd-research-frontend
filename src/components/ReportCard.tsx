import type { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { NormalizedReport } from '../types/research';
import Icon from './Icon';

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso.slice(0, 10);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function getCategoryBadge(categorySlug: string): { label: string, badgeClass: string } {
  switch (categorySlug) {
    case 'equity-research':
    case 'equity':
      return { label: 'Equity Research', badgeClass: 'badge-equity' };
    case 'fixed-income':
    case 'fixed_income':
      return { label: 'Fixed Income', badgeClass: 'badge-fixed-income' };
    case 'macro':
      return { label: 'Macro', badgeClass: 'badge-macro' };
    case 'sector':
    case 'sector-research':
      return { label: 'Sector Research', badgeClass: 'badge-sector' };
    case 'strategy-outlook':
      return { label: 'Strategy & Outlook', badgeClass: 'badge-strategy' };
    case 'index':
      return { label: 'Index', badgeClass: 'badge-index' };
    case 'research-report':
      return { label: 'Market Update', badgeClass: 'badge-market-update' };
    default:
      return { label: 'Research', badgeClass: 'badge-other' };
  }
}

export default function ReportCard({ report, compact = false }: { report: NormalizedReport, compact?: boolean }) {
  const navigate = useNavigate();
  const isSubscriberOnly = ['sector', 'sector-research', 'strategy-outlook'].includes(report.categorySlug);
  const classNames = `report-card research-report-card report-card-hoverable ${compact ? 'report-card-compact' : ''}`;
  const { label, badgeClass } = getCategoryBadge(report.categorySlug);

  const handleCardClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) return;
    navigate(`/report/${report.id}`);
  };
  
  return (
    <article
      className={classNames}
      data-report-card
      data-category={report.category}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <span className={`report-category-badge ${badgeClass}`}>{label}</span>
      <div className="report-card-top">
        {report.documentType && report.documentType !== 'research' && (
          <span className="report-meta">{report.documentType}</span>
        )}
        {isSubscriberOnly ? (
          <span className="report-access-badge access-subscriber">Subscriber</span>
        ) : (
          <span className="report-access-badge access-public">Public</span>
        )}
      </div>
      <h3 title={report.title}>{report.title}</h3>
      <dl className="report-card-facts">
        {report.analysts[0]?.name && (
          <div>
            <dt>Analyst</dt>
            <dd>
              <span className="analyst-avatar-initial">
                {report.analysts[0]?.name?.charAt(0)?.toUpperCase() || 'C'}
              </span>
              {report.analysts[0]?.name}
            </dd>
          </div>
        )}
        <div>
          <dt>Date</dt>
          <dd>{formatDate(report.publishedAt)}</dd>
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
      <div className="report-card-actions report-action" style={{ marginTop: 'auto' }}>
        <Link className="report-view-link" to={`/report/${report.id}`}>
          View Details <Icon name="arrow" />
        </Link>
      </div>
    </article>
  );
}

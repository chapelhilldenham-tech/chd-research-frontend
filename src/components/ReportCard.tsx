import { Link } from 'react-router-dom';
import type { Report } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

export default function ReportCard({ report, compact = false }: { report: Report, compact?: boolean }) {
  return (
    <div className={`report-card card ${compact ? 'report-compact' : ''}`}>
      <div className="card-body">
        <div className="report-meta">
          <span className="report-type">{report.type}</span>
          <span className="report-date">{report.date}</span>
        </div>
        <h3 className="report-title">{report.title}</h3>
        {!compact && (
          <p className="report-synopsis">{report.synopsis}</p>
        )}
      </div>
      <div className="card-footer">
        <Link className="text-link" to={`/report/${report.id}`}>
          Read Report <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

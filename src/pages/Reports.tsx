import ReportCard from '../components/ReportCard';
import { mockReports } from '../data/mockData';

export default function Reports() {
  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Research Library</h1>
          <p>Explore institutional insights, macro strategy, and sector updates.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="report-grid">
            {mockReports.map(report => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

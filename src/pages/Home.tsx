import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnalystStrip from '../components/AnalystStrip';
import ReportCard from '../components/ReportCard';
import { mockAnalysts, mockReports } from '../data/mockData';

export default function Home() {
  const latestReports = mockReports.slice(0, 4);

  return (
    <main className="enterprise-home">
      <section 
        className="enterprise-hero" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(16,37,48, 1) 40%, rgba(16,37,48, 0.4) 100%), url(/assets/img/hero/paramount-index.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>Chapel Hill Denham<br/>Research</h1>
            <p className="hero-val">Institutional research, market intelligence, and investment insights for professional investors.</p>
            <div className="hero-actions">
              <Link className="btn btn-navy" to="/reports">Explore Research</Link>
              <Link className="btn btn-border" to="/analytics">Data &amp; Analytics</Link>
              <Link className="text-link" to="/login">Research Access <ArrowRight size={16} /></Link>
            </div>
          </div>

          <aside className="hero-latest-panel">
            <div className="panel-header"><span>Latest Research</span></div>
            <div className="hero-feature-card">
              <h3>{latestReports[0].title}</h3>
              <p>{latestReports[0].synopsis}</p>
              <Link className="text-link" to={`/report/${latestReports[0].id}`}>
                Read Report <ArrowRight size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="credibility-strip">
        <div className="container">
          <div className="cred-grid">
            <div className="cred-card">
              <span className="cred-val">Published</span>
              <span className="cred-label">Research Reports</span>
            </div>
            <div className="cred-card">
              <span className="cred-val">Comprehensive</span>
              <span className="cred-label">Sector Coverage</span>
            </div>
            <div className="cred-card">
              <span className="cred-val">Live</span>
              <span className="cred-label">Market Analytics</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Latest Research</h2>
            <Link className="text-link" to="/reports">View All Reports <ArrowRight size={16} /></Link>
          </div>
          <div className="report-grid report-grid-compact">
            {latestReports.map(report => (
              <ReportCard key={report.id} report={report} compact={true} />
            ))}
          </div>
        </div>
      </section>

      <section className="section light-teaser data-teaser">
        <div className="container">
          <div className="teaser-content">
            <h2>Market Data &amp; Analytics</h2>
            <p>Subscriber access includes macro indicators, live market tracking, historical data, valuation multiples, and value-added analytics for professional investors.</p>
            <Link className="btn btn-border" to="/analytics">Explore Analytics</Link>
          </div>
        </div>
      </section>

      <section className="section alt coverage-section">
        <div className="container">
          <h2>Research by Coverage</h2>
          <div className="category-grid">
            <Link className="tile coverage-tile" to="/reports?category=equity">
              <h3>Equity Research</h3>
              <p>In-depth company analysis, earnings reviews and stock coverage.</p>
              <span className="text-link">Explore <ArrowRight size={16} /></span>
            </Link>
            <Link className="tile coverage-tile" to="/reports?category=fixed_income">
              <h3>Fixed Income</h3>
              <p>FGN bond strategy, T-bill auctions and yield curve analysis.</p>
              <span className="text-link">Explore <ArrowRight size={16} /></span>
            </Link>
            <Link className="tile coverage-tile" to="/reports?category=macro">
              <h3>Macroeconomic Analysis</h3>
              <p>GDP, inflation, FX and monetary policy insights.</p>
              <span className="text-link">Explore <ArrowRight size={16} /></span>
            </Link>
            <Link className="tile coverage-tile" to="/reports?category=sector">
              <h3>Sector Updates</h3>
              <p>Banking, telecoms, cement, FMCG, oil & gas and pension coverage.</p>
              <span className="text-link">Explore <ArrowRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Meet the Research Team</h2>
          <AnalystStrip analysts={mockAnalysts} />
        </div>
      </section>

      <section className="access-gate">
        <div>
          <h2>Gain Full Access</h2>
          <p>Join institutional investors leveraging our insights.</p>
          <Link className="btn btn-bronze" to="/contact">Subscribe Now</Link>
        </div>
      </section>
    </main>
  );
}

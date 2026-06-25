import { Link } from 'react-router-dom';
import AnalystStrip from '../components/AnalystStrip';
import ReportCard from '../components/ReportCard';
import Icon from '../components/Icon';
import { useEffect, useState } from 'react';
import { fetchPublicAnalysts, fetchPublicResearchReportBundle } from '../lib/supabase';
import type { Analyst, Report } from '../data/mockData';

export default function Home() {
  const [latestReports, setLatestReports] = useState<Report[]>([]);
  const [analysts, setAnalysts] = useState<Analyst[]>([]);

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      const [reportsData, analystsData] = await Promise.all([
        fetchPublicResearchReportBundle(),
        fetchPublicAnalysts()
      ]);
      
      if (!mounted) return;
      
      if (reportsData) {
        setLatestReports(reportsData.slice(0, 6));
      }
      
      if (analystsData) {
        setAnalysts(analystsData as Analyst[]);
      }
      
    }
    loadData();
    return () => { mounted = false; };
  }, []);

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
              <Link className="text-link" to="/reports">Explore Research <Icon name="arrow" /></Link>
            </div>
          </div>

          <aside className="hero-latest-panel">
            <div className="panel-header"><span>Latest Research</span></div>
            <div className="hero-feature-card">
              {latestReports.length > 0 ? (
                <>
                  <h3>{latestReports[0].title}</h3>
                  <p>{latestReports[0].synopsis}</p>
                  <Link className="text-link" to={`/report/${latestReports[0].id}`}>
                    Read Report <Icon name="arrow" />
                  </Link>
                </>
              ) : (
                <p>Loading latest research...</p>
              )}
            </div>
          </aside>
        </div>
      </section>

      <section className="credibility-strip">
        <div className="container">
          <div className="cred-grid">
            <div className="cred-card">
              <span className="cred-val">{latestReports.length > 0 ? latestReports.length : '--'}</span>
              <span className="cred-label">Research Reports</span>
            </div>
            <div className="cred-card">
              <span className="cred-val">6</span>
              <span className="cred-label">Sector Coverage</span>
            </div>
            <div className="cred-card">
              <span className="cred-val">4</span>
              <span className="cred-label">Market Analytics</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Latest Research</h2>
            <Link className="text-link" to="/reports">View All Reports <Icon name="arrow" /></Link>
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
            <Link className="tile coverage-tile" to="/reports?category=equity" aria-label="View Equity Research">
              <h3>Equity Research</h3>
              <p>In-depth company analysis, earnings reviews and stock coverage.</p>
              <span className="text-link">Explore <Icon name="arrow" /></span>
            </Link>
            <Link className="tile coverage-tile" to="/reports?category=fixed_income" aria-label="View Fixed Income">
              <h3>Fixed Income</h3>
              <p>FGN bond strategy, T-bill auctions and yield curve analysis.</p>
              <span className="text-link">Explore <Icon name="arrow" /></span>
            </Link>
            <Link className="tile coverage-tile" to="/reports?category=macro" aria-label="View Macroeconomic Analysis">
              <h3>Macroeconomic Analysis</h3>
              <p>GDP, inflation, FX and monetary policy insights.</p>
              <span className="text-link">Explore <Icon name="arrow" /></span>
            </Link>
            <Link className="tile coverage-tile" to="/reports?category=sector" aria-label="View Sector Updates">
              <h3>Sector Updates</h3>
              <p>Banking, telecoms, cement, FMCG, oil & gas and pension coverage.</p>
              <span className="text-link">Explore <Icon name="arrow" /></span>
            </Link>
            <Link className="tile coverage-tile" to="/reports?search=strategy" aria-label="View Strategy/Outlooks">
              <h3>Strategy/Outlooks</h3>
              <p>Top-down equity strategy and thematic investment research.</p>
              <span className="text-link">Explore <Icon name="arrow" /></span>
            </Link>
            <Link className="tile coverage-tile" to="/analytics" aria-label="View Data & Analytics">
              <h3>Data & Analytics</h3>
              <p>Subscriber-only macro indicators, market data, and value-added analytics.</p>
              <span className="text-link">Explore <Icon name="arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Meet the Research Team</h2>
          {analysts.length > 0 ? (
             <AnalystStrip analysts={analysts} />
          ) : (
             <p>Loading analysts...</p>
          )}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link className="text-link" to="/analysts">View All Analysts <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section access-section alt">
        <div className="container access-container">
          <h2>Subscriber Sign In and Sign Up</h2>
          <p>Chapel Hill Denham research publications and live market intelligence are available exclusively to approved institutional clients and subscribers.</p>
          <div className="access-actions">
            <Link className="btn btn-navy" to="/login">Sign In</Link>
            <Link className="btn btn-border" to="/signup">Sign Up</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

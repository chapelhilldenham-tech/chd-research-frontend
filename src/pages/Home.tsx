import { Link } from 'react-router-dom';
import AnalystStrip from '../components/AnalystStrip';
import ReportCard from '../components/ReportCard';
import Icon from '../components/Icon';
import { useEffect, useState } from 'react';
import { fetchPublicAnalysts, fetchPublicResearchReportBundle } from '../lib/supabase';
import type { Analyst } from '../data/mockData';
import type { NormalizedReport } from '../types/research';

export default function Home() {
  const [latestReports, setLatestReports] = useState<NormalizedReport[]>([]);
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
        setLatestReports(reportsData.slice(0, 7));
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
              <Link className="text-link" to="/login">Sign in to your account <Icon name="arrow" /></Link>
            </div>
          </div>

          <aside className="hero-latest-panel">
            <div className="panel-header"><span>Latest Research</span></div>
            <div className="hero-feature-card">
              {latestReports.length > 0 ? (
                <>
                  <h3>{latestReports[0].title}</h3>
                  <p>{latestReports[0].summary}</p>
                  <Link className="text-link" to={`/report/${latestReports[0].id}`}>
                    Read Report <Icon name="arrow" />
                  </Link>
                </>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      <div className="ticker-strip">
        <div className="ticker-content">
          <span className="ticker-item">
            <span className="ticker-label">NGX ASI</span>
            <span className="ticker-value">240,743</span>
            <span className="ticker-change positive">▲1.06%</span>
          </span>
          <span className="ticker-divider">|</span>
          <span className="ticker-item">
            <span className="ticker-label">USD/NGN</span>
            <span className="ticker-value">1,370.64</span>
          </span>
          <span className="ticker-divider">|</span>
          <span className="ticker-item">
            <span className="ticker-label">MPR</span>
            <span className="ticker-value">26.50%</span>
          </span>
          <span className="ticker-divider">|</span>
          <span className="ticker-item">
            <span className="ticker-label">Inflation</span>
            <span className="ticker-value">15.93%</span>
          </span>
          <span className="ticker-divider">|</span>
          <span className="ticker-item">
            <span className="ticker-label">Paramount YTD</span>
            <span className="ticker-value">+11.42%</span>
            <span className="ticker-change positive">▲</span>
          </span>
          <span className="ticker-divider">|</span>
          <span className="ticker-item">
            <span className="ticker-label">Brent Crude</span>
            <span className="ticker-value">$74.20</span>
          </span>
        </div>
      </div>

      <section className="credibility-strip">
        <div className="container">
          <div className="cred-grid">
            <div className="cred-card">
              <span className="cred-val">150+</span>
              <span className="cred-label">Research Reports Published</span>
            </div>
            <div className="cred-card">
              <span className="cred-val">6</span>
              <span className="cred-label">Sectors Under Coverage</span>
            </div>
            <div className="cred-card">
              <span className="cred-val">10+</span>
              <span className="cred-label">Years of Market Intelligence</span>
            </div>
            <div className="cred-card">
              <span className="cred-val">₦500bn+</span>
              <span className="cred-label">Assets Under Advisory</span>
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
            {latestReports.slice(1).map(report => (
              <ReportCard key={report.id} report={report} compact={true} />
            ))}
          </div>
        </div>
      </section>

      <section className="section light-teaser data-teaser">
        <div className="container">
          <div className="teaser-content">
            <div>
              <h2>Exclusive Market Intelligence</h2>
              <p>Subscriber access includes macro indicators, live market tracking, sector analysis, and Paramount Index intelligence for professional investors.</p>
              <div className="teaser-actions">
                <Link className="btn btn-navy" to="/analytics">Explore Analytics</Link>
                <Link className="btn btn-border" to="/subscribe">Subscribe for Access</Link>
              </div>
            </div>
            <div className="teaser-kpi-row">
              <div className="teaser-kpi">
                <span className="teaser-kpi-label">NGX ASI</span>
                <span className="teaser-kpi-value">240,743</span>
                <span className="teaser-kpi-change positive">+1.06%</span>
              </div>
              <div className="teaser-kpi">
                <span className="teaser-kpi-label">Inflation</span>
                <span className="teaser-kpi-value">15.93%</span>
                <span className="teaser-kpi-change negative">+0.24ppt</span>
              </div>
              <div className="teaser-kpi">
                <span className="teaser-kpi-label">MPR</span>
                <span className="teaser-kpi-value">26.50%</span>
                <span className="teaser-kpi-change neutral">Unchanged</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt coverage-section">
        <div className="container">
          <h2>Research by Coverage</h2>
          <div className="category-grid">
            <Link className="tile coverage-tile" to="/reports?category=equity" aria-label="View Equity Research">
              <div className="coverage-tile-head">
                <span className="coverage-icon" aria-hidden="true">📈</span>
                <h3>Equity Research</h3>
              </div>
              <p>In-depth company analysis, earnings reviews and stock coverage.</p>
              <span className="text-link">Explore <Icon name="arrow" /></span>
            </Link>
            <Link className="tile coverage-tile" to="/reports?category=fixed_income" aria-label="View Fixed Income">
              <div className="coverage-tile-head">
                <span className="coverage-icon" aria-hidden="true">💰</span>
                <h3>Fixed Income</h3>
              </div>
              <p>FGN bond strategy, T-bill auctions and yield curve analysis.</p>
              <span className="text-link">Explore <Icon name="arrow" /></span>
            </Link>
            <Link className="tile coverage-tile" to="/reports?category=macro" aria-label="View Macroeconomic Analysis">
              <div className="coverage-tile-head">
                <span className="coverage-icon" aria-hidden="true">🌍</span>
                <h3>Macroeconomic Analysis</h3>
              </div>
              <p>GDP, inflation, FX and monetary policy insights.</p>
              <span className="text-link">Explore <Icon name="arrow" /></span>
            </Link>
            <Link className="tile coverage-tile" to="/reports?category=sector" aria-label="View Sector Updates">
              <div className="coverage-tile-head">
                <span className="coverage-icon" aria-hidden="true">🏭</span>
                <h3>Sector Updates</h3>
              </div>
              <p>Banking, telecoms, cement, FMCG, oil & gas and pension coverage.</p>
              <span className="text-link">Explore <Icon name="arrow" /></span>
            </Link>
            <Link className="tile coverage-tile" to="/reports?search=strategy" aria-label="View Strategy/Outlooks">
              <div className="coverage-tile-head">
                <span className="coverage-icon" aria-hidden="true">🎯</span>
                <h3>Strategy/Outlooks</h3>
              </div>
              <p>Top-down equity strategy and thematic investment research.</p>
              <span className="text-link">Explore <Icon name="arrow" /></span>
            </Link>
            <Link className="tile coverage-tile" to="/analytics" aria-label="View Data & Analytics">
              <div className="coverage-tile-head">
                <span className="coverage-icon" aria-hidden="true">📊</span>
                <h3>Data & Analytics</h3>
              </div>
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
             <div className="analyst-skeleton-row">
               {[1, 2, 3, 4].map((index) => (
                 <div key={index} className="analyst-skeleton-card" aria-hidden="true" />
               ))}
             </div>
          )}
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link className="text-link" to="/analysts">View All Analysts <Icon name="arrow" /></Link>
          </div>
        </div>
      </section>

      <section className="section access-section alt">
        <div className="container access-container">
          <h2>Exclusive Access for Professional Investors</h2>
          <p>Chapel Hill Denham research publications and live market intelligence are available exclusively to approved institutional clients and subscribers.</p>
          <div className="access-actions">
            <Link className="btn btn-navy" to="/login">Sign In</Link>
            <Link className="btn btn-border" to="/signup">Request Access</Link>
          </div>
        </div>
      </section>
    </main>
  );
}

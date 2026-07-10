import { Link } from 'react-router-dom';
import AnalystStrip from '../components/AnalystStrip';
import ReportCard from '../components/ReportCard';
import Icon from '../components/Icon';
import { useEffect, useState } from 'react';
import { fetchPublicAnalysts, fetchPublicResearchReportBundle, fetchMarketSnapshot } from '../lib/supabase';
import type { Analyst } from '../data/mockData';
import type { NormalizedReport } from '../types/research';

interface HomepageStat { label: string; value: string }
interface MarketKpi { label: string; value: string; change: string; effectiveDate: string }

const defaultCredStats: HomepageStat[] = [
  { label: 'Research Reports Published', value: '150+' },
  { label: 'Sectors Under Coverage', value: '7' },
  { label: 'Years of Market Intelligence', value: '20+' },
  { label: 'Assets Under Advisory', value: '\u20a6500bn+' },
];

const defaultHeadlineKpis: MarketKpi[] = [
  { label: 'NGX ASI', value: '240,743.19', change: '+1.06%', effectiveDate: '23 Jun 2026' },
  { label: 'FX', value: '1,370.64', change: '+0.11%', effectiveDate: '23 Jun 2026' },
  { label: 'Inflation', value: '15.93%', change: '+0.24ppt', effectiveDate: '23 May 2026' },
  { label: 'MPR', value: '26.50%', change: '0.00ppt', effectiveDate: '23 Jun 2026' },
  { label: 'Commodities', value: 'Brent $76.80', change: '-0.93%', effectiveDate: '23 Jun 2026' },
];



function findKpi(kpis: MarketKpi[], label: string): MarketKpi | undefined {
  return kpis.find(k => k.label === label);
}

export default function Home() {
  const [latestReports, setLatestReports] = useState<NormalizedReport[]>([]);
  const [analysts, setAnalysts] = useState<Analyst[]>([]);
  const [credStats, setCredStats] = useState<HomepageStat[]>(defaultCredStats);
  const [headlineKpis, setHeadlineKpis] = useState<MarketKpi[]>(defaultHeadlineKpis);


  useEffect(() => {
    let mounted = true;
    async function loadData() {
      const [reportsData, analystsData, dashboardSnapshot] = await Promise.all([
        fetchPublicResearchReportBundle(),
        fetchPublicAnalysts(),
        fetchMarketSnapshot('analytics_dashboard'),
      ]);

      if (!mounted) return;

      if (reportsData) {
        setLatestReports(reportsData.slice(0, 7));
      }

      if (analystsData) {
        setAnalysts(analystsData as Analyst[]);
      }

      const liveStats = dashboardSnapshot?.payload?.homepageStats as HomepageStat[] | undefined;
      if (liveStats && liveStats.length > 0) {
        setCredStats(liveStats);
      }

      const liveKpis = dashboardSnapshot?.payload?.headlineKpis as MarketKpi[] | undefined;
      if (liveKpis && liveKpis.length > 0) {
        setHeadlineKpis(liveKpis);
      }



    }
    loadData();
    return () => { mounted = false; };
  }, []);

  const ngxAsi = findKpi(headlineKpis, 'NGX ASI') ?? defaultHeadlineKpis[0];
  const fx = findKpi(headlineKpis, 'FX') ?? defaultHeadlineKpis[1];
  const inflation = findKpi(headlineKpis, 'Inflation') ?? defaultHeadlineKpis[2];
  const mpr = findKpi(headlineKpis, 'MPR') ?? defaultHeadlineKpis[3];
  const commodities = findKpi(headlineKpis, 'Commodities') ?? defaultHeadlineKpis[4];

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
          {[0, 1].map(pass => (
            <span key={pass} style={{ display: 'contents' }}>
              <span className="ticker-item">
                <span className="ticker-label">NGX ASI</span>
                <span className="ticker-value">{ngxAsi.value}</span>
                <span className={`ticker-change ${ngxAsi.change.startsWith('-') ? 'negative' : 'positive'}`}>{ngxAsi.change.startsWith('-') ? '▼' : '▲'}{ngxAsi.change.replace(/^[+-]/, '')}</span>
              </span>
              <span className="ticker-divider">|</span>
              <span className="ticker-item">
                <span className="ticker-label">USD/NGN</span>
                <span className="ticker-value">{fx.value}</span>
              </span>
              <span className="ticker-divider">|</span>
              <span className="ticker-item">
                <span className="ticker-label">MPR</span>
                <span className="ticker-value">{mpr.value}</span>
              </span>
              <span className="ticker-divider">|</span>
              <span className="ticker-item">
                <span className="ticker-label">Inflation</span>
                <span className="ticker-value">{inflation.value}</span>
              </span>
              <span className="ticker-divider">|</span>
              <span className="ticker-item">
                <span className="ticker-label">Brent Crude</span>
                <span className="ticker-value">{commodities.value.replace(/^Brent\s*/i, '')}</span>
              </span>
            </span>
          ))}
        </div>
      </div>

      <section className="credibility-strip">
        <div className="container">
          <div className="cred-grid">
            {credStats.map(stat => (
              <div className="cred-card" key={stat.label}>
                <span className="cred-val">{stat.value}</span>
                <span className="cred-label">{stat.label}</span>
              </div>
            ))}
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
                <span className="teaser-kpi-value">{ngxAsi.value}</span>
                <span className={`teaser-kpi-change ${ngxAsi.change.startsWith('-') ? 'negative' : 'positive'}`}>{ngxAsi.change}</span>
              </div>
              <div className="teaser-kpi">
                <span className="teaser-kpi-label">Inflation</span>
                <span className="teaser-kpi-value">{inflation.value}</span>
                <span className={`teaser-kpi-change ${inflation.change.startsWith('-') ? 'positive' : 'negative'}`}>{inflation.change}</span>
              </div>
              <div className="teaser-kpi">
                <span className="teaser-kpi-label">MPR</span>
                <span className="teaser-kpi-value">{mpr.value}</span>
                <span className="teaser-kpi-change neutral">{mpr.change === '0.00ppt' ? 'Unchanged' : mpr.change}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section alt coverage-section">
        <div className="container">
          <h2>Research by Coverage</h2>
          <div className="category-grid">
            {[
              { icon: '📈', title: 'Equity Research', desc: 'In-depth company analysis, earnings reviews and stock coverage.', to: '/reports?category=equity' },
              { icon: '💰', title: 'Fixed Income', desc: 'FGN bond strategy, T-bill auctions and yield curve analysis.', to: '/reports?category=fixed_income' },
              { icon: '🌍', title: 'Macroeconomic Analysis', desc: 'GDP, inflation, FX and monetary policy insights.', to: '/reports?category=macro' },
              { icon: '🏭', title: 'Sector Updates', desc: 'Banking, telecoms, cement, FMCG, oil & gas and pension coverage.', to: '/reports?category=sector' },
              { icon: '🎯', title: 'Strategy/Outlooks', desc: 'Top-down equity strategy and thematic investment research.', to: '/reports?category=strategy-outlook' },
              { icon: '📊', title: 'Data & Analytics', desc: 'Subscriber-only macro indicators, market data, and value-added analytics.', to: '/analytics' },
            ].map((area) => (
              <Link key={area.title} className="tile coverage-tile" to={area.to} aria-label={`View ${area.title}`}>
                <span className="coverage-icon" aria-hidden="true">{area.icon}</span>
                <h3>{area.title}</h3>
                <p>{area.desc}</p>
                <span className="coverage-explore-link">Explore <Icon name="arrow" /></span>
              </Link>
            ))}
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

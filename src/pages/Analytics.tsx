import { useEffect, useState } from 'react';
import {
  fetchPublicMarketDataPoints,
  fetchPublicMarketDataSeries,
} from '../lib/supabase';

const AS_AT = 'As at: 2026-06-16 11:22';

const marketRows = [
  ['DANGCEM', '751.00', '+12.00', '+1.62%'],
  ['MTNN', '248.50', '-2.10', '-0.84%'],
  ['GTCO', '64.30', '+1.80', '+2.88%'],
  ['ACCESSCORP', '24.45', '+0.35', '+1.45%'],
  ['ZENITHBANK', '52.80', '+0.95', '+1.83%'],
  ['NGXGROUP', '31.20', '+0.80', '+2.63%'],
  ['SEPLAT', '5,240.00', '+90.00', '+1.75%'],
];

const paramountRows = [
  ['DANGCEM', 'Dangote Cement', '26.40%', '950.00', '+1.60%'],
  ['MTNN', 'MTN Nigeria', '17.20%', '720.00', '-0.69%'],
  ['AIRTELAFRI', 'Airtel Africa', '16.50%', '2,100.00', '0.00%'],
  ['BUACEMENT', 'BUA Cement', '9.60%', '210.00', '+0.50%'],
  ['GTCO', 'GTCO Plc', '6.20%', '110.00', '-0.45%'],
  ['ZENITHBANK', 'Zenith Bank', '5.80%', '105.50', '+1.15%'],
  ['SEPLAT', 'Seplat Energy', '4.50%', '3,600.00', '+2.85%'],
];

function MacroChart() {
  return (
    <div className="chart-shell chart-shell-tall analytics-svg-chart" aria-label="Inflation and MPR line chart">
      <svg viewBox="0 0 760 300" role="img">
        <g className="chart-grid">
          {[40, 78, 116, 154, 192, 230, 268].map((y) => (
            <line key={y} x1="44" x2="734" y1={y} y2={y} />
          ))}
        </g>
        <g className="chart-axis-labels chart-y-labels">
          {['34.00%', '32.00%', '30.00%', '28.00%', '26.00%', '24.00%', '22.00%'].map((label, index) => (
            <text key={label} x="0" y={45 + index * 38}>{label}</text>
          ))}
        </g>
        <g className="chart-axis-labels chart-x-labels">
          {['Q3 2023', 'Q4 2023', 'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'].map((label, index) => (
            <text key={label} x={50 + index * 94} y="292">{label}</text>
          ))}
        </g>
        <g className="chart-legend">
          <circle cx="350" cy="25" r="7" className="chart-line-primary-fill" />
          <text x="362" y="29">Inflation</text>
          <circle cx="418" cy="25" r="7" className="chart-line-secondary-fill" />
          <text x="430" y="29">MPR</text>
        </g>
        <polyline
          className="chart-line-secondary"
          points="54,260 124,266 194,245 264,202 334,156 404,132 474,126 544,126 614,126 704,126"
        />
        <polyline
          className="chart-line-primary"
          points="54,172 124,148 194,120 264,88 334,56 404,50 474,66 544,88 614,145 704,202"
        />
      </svg>
    </div>
  );
}

function ParamountChart() {
  return (
    <div className="chart-shell chart-shell-paramount analytics-svg-chart paramount-svg-chart" aria-label="Paramount Index trend chart">
      <svg viewBox="0 0 920 280" role="img">
        <defs>
          <linearGradient id="paramountArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#c7752d" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#c7752d" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <g className="chart-grid">
          {[30, 68, 106, 144, 182, 220].map((y) => (
            <line key={y} x1="48" x2="890" y1={y} y2={y} />
          ))}
        </g>
        <g className="chart-axis-labels chart-y-labels">
          {['3000.00', '2900.00', '2800.00', '2700.00', '2600.00', '2500.00'].map((label, index) => (
            <text key={label} x="0" y={35 + index * 38}>{label}</text>
          ))}
        </g>
        <g className="chart-axis-labels chart-x-labels">
          {['Jun 2024', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan 2025', 'Feb', 'Mar', 'Apr', 'May'].map((label, index) => (
            <text key={label} x={48 + index * 76} y="264">{label}</text>
          ))}
        </g>
        <path
          className="chart-area-primary"
          d="M48 220 L124 198 L200 176 L276 154 L352 132 L428 108 L504 78 L580 48 L656 42 L732 82 L808 128 L808 238 L48 238 Z"
        />
        <polyline
          className="chart-line-primary"
          points="48,220 124,198 200,176 276,154 352,132 428,108 504,78 580,48 656,42 732,82 808,128"
        />
      </svg>
    </div>
  );
}

export default function Analytics() {
  const [dataReadStatus, setDataReadStatus] = useState('Latest available update');

  useEffect(() => {
    let mounted = true;

    async function loadReadOnlyMarketData() {
      const [series, points] = await Promise.all([
        fetchPublicMarketDataSeries(),
        fetchPublicMarketDataPoints(),
      ]);

      if (mounted && series && points) {
        setDataReadStatus('Latest available update');
      }
    }

    loadReadOnlyMarketData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="analytics-page">
      <div className="analytics-container">
        <section className="analytics-intro">
          <div>
            <p className="eyebrow">Executive Dashboard</p>
            <h1>Data &amp; Analytics</h1>
            <p>Macro, Market, Sector, and Paramount Index Intelligence.</p>
          </div>
          <aside>
            <p className="analytics-disclaimer">
              Market data displayed is for information purposes only. All data updated manually by Chapel
              Hill Denham Research team. Chapel Hill Denham makes no warranty as to accuracy or
              completeness.
            </p>
          </aside>
        </section>

        <section className="analytics-dashboard-kpis" aria-label="Dashboard summary">
          <span className="kpi-strip-as-at">{AS_AT}</span>
          <article>
            <span>NGX ASI</span>
            <strong>109,847.23</strong>
            <small>+0.39%</small>
          </article>
          <article>
            <span>FX</span>
            <strong>1,385.00</strong>
            <small>+0.0ppt</small>
          </article>
          <article>
            <span>Inflation</span>
            <strong>15.38%</strong>
            <small>+0.32ppt</small>
          </article>
          <article>
            <span>MPR</span>
            <strong>26.50%</strong>
            <small>-0.50ppt</small>
          </article>
          <article>
            <span>Commodities</span>
            <strong>Brent $84.10</strong>
            <small>+0.00</small>
          </article>
        </section>

        <div className="analytics-dashboard-grid">
          <section className="analytics-section dashboard-panel" id="macro-desk">
            <div className="analytics-section-heading with-meta">
              <span>01</span>
              <h2>Key Macro Indicators</h2>
              <small>{AS_AT}</small>
            </div>
            <div className="macro-layout">
              <div className="macro-panel-main">
                <div className="kmi-tabs" aria-label="Macro indicator views">
                  <button className="kmi-tab active" type="button">Inflation vs MPR</button>
                  <button className="kmi-tab" type="button">GDP Growth</button>
                </div>
                <MacroChart />
                <p className="analytics-commentary-date">March 2026</p>
                <p className="analytics-commentary">
                  Inflation reversed its downward trend, climbing to 15.38% in March. The CBN reduced
                  the MPR by 50 bps to 26.50% in February, keeping it steady through Q1. The naira
                  traded around &#8358;1,385 at the official window.
                </p>
              </div>
              <div className="macro-kpi-grid">
                <article className="analytics-kpi">
                  <span>GDP Growth (%)</span>
                  <strong>3.80%</strong>
                  <small>&uarr; +0.20ppt</small>
                </article>
                <article className="analytics-kpi">
                  <span>CPI / Inflation (%)</span>
                  <strong>15.38%</strong>
                  <small>&uarr; +0.32ppt</small>
                </article>
                <article className="analytics-kpi">
                  <span>Credit Growth (%)</span>
                  <strong>18.60%</strong>
                  <small>&uarr; +1.80ppt</small>
                </article>
                <article className="analytics-kpi">
                  <span>Debt/GDP (%)</span>
                  <strong>38.50%</strong>
                  <small>&darr; -0.40ppt</small>
                </article>
              </div>
            </div>
          </section>

          <section className="analytics-section dashboard-panel" id="market-data">
            <div className="analytics-section-heading with-meta">
              <span>02</span>
              <h2>Market Data</h2>
              <small>{dataReadStatus}</small>
            </div>
            <div className="market-layout">
              <div>
                <div className="market-summary-row">
                  <article className="analytics-kpi compact">
                    <span>NGX ASI</span>
                    <strong>109,847.23</strong>
                  </article>
                  <article className="analytics-kpi compact">
                    <span>Market Cap</span>
                    <strong>N61.30trn</strong>
                  </article>
                  <article className="analytics-kpi compact">
                    <span>Volume</span>
                    <strong>387.40mn</strong>
                  </article>
                </div>
                <div className="analytics-table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Ticker</th>
                        <th className="num">Price</th>
                        <th className="num">Change</th>
                        <th className="num">%</th>
                      </tr>
                    </thead>
                    <tbody>
                      {marketRows.map(([ticker, price, change, percent]) => (
                        <tr key={ticker}>
                          <td>{ticker}</td>
                          <td className="num">{price}</td>
                          <td className="num">{change}</td>
                          <td className="num">{percent}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <aside className="market-stat-stack">
                <article className="market-stat-card">
                  <span>NGX ASI Change</span>
                  <strong>+428.11 / +0.39%</strong>
                  <small>Day change</small>
                </article>
                <article className="market-stat-card">
                  <span>Top Gainer</span>
                  <strong>LAFARGE +3.04%</strong>
                  <small>Leading advance</small>
                </article>
                <article className="market-stat-card">
                  <span>Top Loser</span>
                  <strong>BUACEMENT -1.07%</strong>
                  <small>Steepest decline</small>
                </article>
                <article className="market-stat-card">
                  <span>Total Gainers</span>
                  <strong>8.00</strong>
                  <small>Advancing issues</small>
                </article>
                <article className="market-stat-card">
                  <span>Total Losers</span>
                  <strong>2.00</strong>
                  <small>Declining issues</small>
                </article>
              </aside>
            </div>
          </section>

          <section className="analytics-section dashboard-panel" id="sector-data">
            <div className="analytics-section-heading with-meta">
              <span>03</span>
              <h2>Sector Data &amp; Analytics</h2>
              <small>{AS_AT}</small>
            </div>
            <div className="sector-panel-layout">
              <aside className="sector-pill-column">
                <div className="sector-pill-group">
                  {['Banking', 'Insurance', 'Pension', 'Telecoms', 'Oil & Gas', 'Consumer Goods'].map((sector, index) => (
                    <button className={`sector-pill${index === 0 ? ' active' : ''}`} type="button" key={sector}>
                      {sector}
                    </button>
                  ))}
                </div>
              </aside>
              <div className="sector-detail-panel">
                <div className="sector-detail-head">
                  <h3>Banking</h3>
                </div>
                <div className="sector-stat-grid">
                  <article className="sector-stat-box">
                    <span>ROE</span>
                    <strong>26.50%</strong>
                  </article>
                  <article className="sector-stat-box">
                    <span>NIM</span>
                    <strong>8.80%</strong>
                  </article>
                  <article className="sector-stat-box">
                    <span>NPL Ratio</span>
                    <strong>4.30%</strong>
                  </article>
                  <article className="sector-stat-box">
                    <span>CAR</span>
                    <strong>18.10%</strong>
                  </article>
                  <article className="sector-stat-box">
                    <span>LDR</span>
                    <strong>60.50%</strong>
                  </article>
                  <article className="sector-stat-box">
                    <span>Total Assets</span>
                    <strong>N135.20trn</strong>
                  </article>
                  <article className="sector-stat-box">
                    <span>Cost-to-Income</span>
                    <strong>42.50%</strong>
                  </article>
                </div>
                <div className="sector-commentary">
                  <p><strong>Sector Commentary</strong></p>
                  <p>Q1 banking results showed resilience, with net interest margins expanding as a result of the high MPR.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="analytics-section dashboard-panel" id="paramount-index">
            <div className="analytics-section-heading with-meta">
              <span>04</span>
              <h2>Paramount Index</h2>
              <small>{AS_AT}</small>
            </div>
            <div className="paramount-strip">
              <div>
                <span>Index Value</span>
                <strong>2,750.40</strong>
              </div>
              <div>
                <span>1D</span>
                <strong>+1.15%</strong>
              </div>
              <div>
                <span>1W</span>
                <strong>+3.10%</strong>
              </div>
              <div>
                <span>1M</span>
                <strong>+5.40%</strong>
              </div>
              <div>
                <span>YTD</span>
                <strong>+36.50%</strong>
              </div>
            </div>
            <ParamountChart />
            <details className="methodology" open>
              <summary>Index Methodology</summary>
              <p>
                The Paramount Index is Chapel Hill Denham&apos;s proprietary benchmark for selected Nigerian
                equities. Constituents are screened for liquidity and market relevance, weighted by
                free-float market capitalisation, and reviewed quarterly.
              </p>
            </details>
            <div className="analytics-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Company</th>
                    <th className="num">Weight %</th>
                    <th className="num">Last Price</th>
                    <th className="num">1D Change</th>
                  </tr>
                </thead>
                <tbody>
                  {paramountRows.map(([ticker, company, weight, lastPrice, change]) => (
                    <tr key={ticker}>
                      <td>{ticker}</td>
                      <td>{company}</td>
                      <td className="num">{weight}</td>
                      <td className="num">{lastPrice}</td>
                      <td className="num">{change}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

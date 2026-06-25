import { useState } from 'react';
import {
  analyticsSnapshot,
  analyticsSectorOrder,
  type AnalyticsSectorName,
} from '../data/analyticsSnapshot';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const macroTabs = ['Inflation vs MPR', 'GDP Growth'] as const;

/*
function sourceStatus(item: object) {
  return 'sourceStatus' in item ? String(item.sourceStatus) : '';
}
*/

function MacroChart({ activeTab }: { activeTab: (typeof macroTabs)[number] }) {
  const isGdpChart = activeTab === 'GDP Growth';
  const data: any[] = activeTab === 'Inflation vs MPR'
    ? analyticsSnapshot.macroChart.inflationMpr.map(p => ({ name: p.label, Inflation: p.inflation, MPR: p.mpr }))
    : analyticsSnapshot.macroChart.gdpGrowth.map(p => ({ name: p.label, 'GDP Growth': p.value }));

  return (
    <div className="chart-shell chart-shell-tall analytics-svg-chart" style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        {isGdpChart ? (
          <BarChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e303a" />
            <XAxis dataKey="name" stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={val => val + '%'} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2028', border: '1px solid #2e303a', borderRadius: '4px' }} itemStyle={{ color: '#c7752d' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="GDP Growth" fill="#c7752d" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e303a" />
            <XAxis dataKey="name" stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={val => val + '%'} />
            <Tooltip contentStyle={{ backgroundColor: '#1f2028', border: '1px solid #2e303a', borderRadius: '4px' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="Inflation" stroke="#c7752d" strokeWidth={3} activeDot={{ r: 6 }} dot={{ strokeWidth: 2 }} />
            <Line type="monotone" dataKey="MPR" stroke="#c7a17c" strokeWidth={3} activeDot={{ r: 6 }} dot={{ strokeWidth: 2 }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

function ParamountChart() {
  return (
    <div className="chart-shell chart-shell-paramount analytics-svg-chart" style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={analyticsSnapshot.paramount.points} margin={{ top: 20, right: 30, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e303a" />
          <XAxis dataKey="label" stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} domain={['dataMin - 100', 'dataMax + 100']} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ backgroundColor: '#1f2028', border: '1px solid #2e303a', borderRadius: '4px' }} />
          <Line type="monotone" dataKey="value" stroke="#c7752d" strokeWidth={3} activeDot={{ r: 6 }} dot={false} name="Index Value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import { Navigate } from 'react-router-dom';

export default function Analytics() {
  const isAuth = localStorage.getItem('chd_subscriber_auth') === 'true';

  const [activeMacroTab, setActiveMacroTab] = useState<(typeof macroTabs)[number]>('Inflation vs MPR');
  const [activeSector, setActiveSector] = useState<AnalyticsSectorName>('Banking');
  const selectedSector = analyticsSnapshot.sectors[activeSector];

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

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
          {analyticsSnapshot.headlineKpis.map((kpi) => (
            <article key={kpi.label}>
              <span>{kpi.label}</span>
              <strong>{kpi.value}</strong>
              <small>{kpi.change} | {kpi.effectiveDate}</small>
            </article>
          ))}
        </section>

        <div className="analytics-dashboard-grid">
          <section className="analytics-section dashboard-panel" id="macro-desk">
            <div className="analytics-section-heading with-meta">
              <span>01</span>
              <h2>Key Macro Indicators</h2>
              <small>Mixed effective dates</small>
            </div>
            <div className="macro-layout">
              <div className="macro-panel-main">
                <div className="kmi-tabs" aria-label="Macro indicator views">
                  {macroTabs.map((tab) => (
                    <button
                      className={`kmi-tab${activeMacroTab === tab ? ' active' : ''}`}
                      type="button"
                      key={tab}
                      onClick={() => setActiveMacroTab(tab)}
                      aria-pressed={activeMacroTab === tab}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <MacroChart activeTab={activeMacroTab} />
                <p className="analytics-commentary-date">{activeMacroTab === 'Inflation vs MPR' ? analyticsSnapshot.macroChart.effectiveDate : 'Q1 2026'}</p>
                <p className="analytics-commentary">
                  {activeMacroTab === 'Inflation vs MPR'
                    ? 'Inflation reached 15.93% in May 2026 while MPR remained at 26.50%.'
                    : 'GDP growth reached 3.89% in Q1 2026, compared with 4.07% in Q4 2025.'}
                </p>
              </div>
              <div className="macro-kpi-grid">
                {analyticsSnapshot.macroIndicators.map((indicator) => (
                  <article className="analytics-kpi" key={indicator.label}>
                    <span>{indicator.label}</span>
                    <strong>{indicator.value}</strong>
                    <small>{indicator.change} | {indicator.effectiveDate}</small>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/*
          <section className="analytics-section dashboard-panel" id="market-data">
            <div className="analytics-section-heading with-meta">
              <span>02</span>
              <h2>Market Data</h2>
              <small>{analyticsSnapshot.market.effectiveDate}</small>
            </div>
            <div className="market-layout">
              <div>
                <div className="market-summary-row">
                {analyticsSnapshot.market.summary.map((item) => (
                  <article className="analytics-kpi compact" key={item.label}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                    {sourceStatus(item) && <small>{sourceStatus(item)}</small>}
                  </article>
                ))}
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
                      {analyticsSnapshot.market.rows.length > 0 ? analyticsSnapshot.market.rows.map((row) => (
                        <tr key={row.ticker}>
                          <td>{row.ticker}{row.sourceStatus && <small style={{ display: 'block' }}>{row.sourceStatus}</small>}</td>
                          <td className="num">{row.price}</td>
                          <td className="num">{row.change}</td>
                          <td className="num">{row.percent}</td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan={4}>Ticker-level market rows are pending update for this staging snapshot.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <aside className="market-stat-stack">
                {analyticsSnapshot.market.stats.map((stat) => (
                  <article className="market-stat-card" key={stat.label}>
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                    <small>{sourceStatus(stat) || stat.change}</small>
                  </article>
                ))}
              </aside>
            </div>
          </section>
          */}

          <section className="analytics-section dashboard-panel" id="sector-data">
            <div className="analytics-section-heading with-meta">
              <span>03</span>
              <h2>Sector Data &amp; Analytics</h2>
              <small>{selectedSector.effectiveDate || 'Pending update'}</small>
            </div>
            <div className="sector-panel-layout">
              <aside className="sector-pill-column">
                <div className="sector-pill-group">
                  {analyticsSectorOrder.map((sector) => (
                    <button
                      className={`sector-pill${activeSector === sector ? ' active' : ''}`}
                      type="button"
                      key={sector}
                      onClick={() => setActiveSector(sector)}
                      aria-pressed={activeSector === sector}
                    >
                      {sector}
                    </button>
                  ))}
                </div>
              </aside>
                <div className="sector-detail-panel">
                  <div className="sector-detail-head">
                  <h3>{activeSector}</h3>
                </div>
                <div className="sector-stat-grid">
                  {selectedSector.status === 'available' ? selectedSector.metrics.map((metric) => (
                    <article className="sector-stat-box" key={metric.label}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                      <small>{metric.change} | {metric.effectiveDate}</small>
                    </article>
                  )) : (
                    <article className="sector-stat-box">
                      <span>{activeSector}</span>
                      <strong>Pending update</strong>
                    </article>
                  )}
                </div>
                <div className="sector-commentary">
                  <p><strong>Sector Commentary</strong></p>
                  <p>{selectedSector.commentary}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="analytics-section dashboard-panel" id="paramount-index">
            <div className="analytics-section-heading with-meta">
              <span>04</span>
              <h2>Paramount Index</h2>
              <small>{analyticsSnapshot.paramount.effectiveDate}</small>
            </div>
            <div className="paramount-strip">
              {analyticsSnapshot.paramount.summary.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                  {item.sourceStatus && <small>{item.sourceStatus}</small>}
                </div>
              ))}
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
                      <th>Indices</th>
                      <th className="num">1YR</th>
                      <th className="num">2YR</th>
                      <th className="num">3YR</th>
                      <th className="num">5YR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsSnapshot.paramount.performance.map((row) => (
                      <tr key={row.index}>
                        <td>{row.index}</td>
                        <td className="num" style={{ color: row['1YR'].startsWith('-') ? 'var(--color-danger)' : 'var(--color-navy)' }}>{row['1YR']}</td>
                        <td className="num" style={{ color: row['2YR'].startsWith('-') ? 'var(--color-danger)' : 'var(--color-success)' }}>{row['2YR']}</td>
                        <td className="num" style={{ color: row['3YR'].startsWith('-') ? 'var(--color-danger)' : 'var(--color-success)' }}>{row['3YR']}</td>
                        <td className="num" style={{ color: row['5YR'].startsWith('-') ? 'var(--color-danger)' : 'var(--color-success)' }}>{row['5YR']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <h3 style={{ marginTop: '24px', fontSize: '18px', color: 'var(--chd-navy)' }}>Index Composition & Weights</h3>
              <div className="analytics-table-scroll" style={{ marginTop: '12px' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Ticker</th>
                      <th className="num">Weight %</th>
                      <th className="num">Last Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsSnapshot.paramount.weights && analyticsSnapshot.paramount.weights.length > 0 ? analyticsSnapshot.paramount.weights.map((row) => (
                      <tr key={row.ticker}>
                        <td>{row.ticker}</td>
                        <td className="num">{row.weight.toFixed(2)}%</td>
                        <td className="num">{row.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={3}>Ticker-level weights are pending update for this staging snapshot.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
        </div>
      </div>
    </main>
  );
}

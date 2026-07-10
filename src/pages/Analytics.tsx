import { useEffect, useState } from 'react';
import {
  analyticsSnapshot,
  analyticsSectorOrder,
  type AnalyticsSectorName,
  type ForecastRow,
} from '../data/analyticsSnapshot';
import { fetchMarketSnapshot } from '../lib/supabase';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LiveForecastEntry { year: string; value: string }
interface LiveMacroForecastMetric {
  key: string;
  label: string;
  currentValue: string;
  change: string;
  effectiveDate: string;
  forecasts: LiveForecastEntry[];
}
interface LiveSimpleKpi { label: string; value: string; change: string; effectiveDate: string }
interface LiveBondRow { bond: string; maturity: string; coupon: string; yield: string; price: string }
interface LiveSectorMetric { label: string; value: string; change: string; effectiveDate: string }
interface LiveSectorForm { effectiveDate: string; commentary: string; metrics: LiveSectorMetric[] }
interface LiveParamountPerformanceRow { index: string; '1YR': string; '2YR': string; '3YR': string; '5YR': string }

interface AnalyticsDashboardPayload {
  headlineKpis?: LiveSimpleKpi[];
  creditGrowth?: LiveSimpleKpi;
  debtGdp?: LiveSimpleKpi;
  macroForecasts?: LiveMacroForecastMetric[];
  lcyBonds?: LiveBondRow[];
  eurobonds?: LiveBondRow[];
  sectors?: Record<string, LiveSectorForm>;
  paramountIndexValue?: string;
  paramount1yr?: string;
  paramount2yr?: string;
  paramount3yr?: string;
  paramount5yr?: string;
  paramountPerformance?: LiveParamountPerformanceRow[];
  paramountMethodology?: string;
  macroSourcesNote?: string;
  fixedIncomeSourcesNote?: string;
  sectorSourcesNote?: string;
  paramountSourcesNote?: string;
}

function macroMetricFromLive(m: LiveMacroForecastMetric) {
  return {
    label: m.label,
    value: m.currentValue,
    change: m.change,
    effectiveDate: m.effectiveDate,
    forecast: m.forecasts
      .filter(f => f.year.trim() !== '')
      .map(f => ({ year: f.year, value: f.value || '—', isPlaceholder: !f.value })),
  };
}

const DEFAULT_PARAMOUNT_METHODOLOGY =
  "The Paramount Index is Chapel Hill Denham's proprietary benchmark for selected Nigerian equities. Constituents are screened for liquidity and market relevance, weighted by free-float market capitalisation, and reviewed quarterly.";

const macroTabs = ['Inflation vs MPR', 'GDP Growth'] as const;
const fixedIncomeTabs = ['LCY Bonds', 'Eurobonds'] as const;

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
    <div className="chart-shell chart-shell-tall analytics-svg-chart" style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        {isGdpChart ? (
          <BarChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e303a" />
            <XAxis dataKey="name" stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={val => val + '%'} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', borderRadius: '4px' }} labelStyle={{ color: '#102530' }} itemStyle={{ color: '#102530' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar dataKey="GDP Growth" fill="#c7752d" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={data} margin={{ top: 20, right: 30, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e303a" />
            <XAxis dataKey="name" stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis stroke="#6b6375" tick={{ fill: '#6b6375', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={val => val + '%'} />
            <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', borderRadius: '4px' }} labelStyle={{ color: '#102530' }} itemStyle={{ color: '#102530' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="MPR" stroke="#c7a17c" strokeWidth={3} activeDot={{ r: 6 }} dot={{ strokeWidth: 2 }} />
            <Line type="monotone" dataKey="Inflation" stroke="#c7752d" strokeWidth={3} activeDot={{ r: 6 }} dot={{ strokeWidth: 2 }} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

// Format '2018-03' → 'Mar-18' to match Nabila's requested Excel style
const MONTH_ABBR: Record<string, string> = {
  '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
  '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
  '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec',
};
function fmtParamountLabel(label: any) {
  if (typeof label !== 'string') return String(label ?? '');
  const [yr, mo] = label.split('-');
  if (!yr || !mo) return label;
  return `${MONTH_ABBR[mo] ?? mo}-${yr.slice(2)}`;
}

function ParamountChart() {
  return (
    <div className="chart-shell chart-shell-paramount analytics-svg-chart" style={{ width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={analyticsSnapshot.paramount.points} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2e303a" />
          <XAxis
            dataKey="label"
            stroke="#6b6375"
            tick={{ fill: '#6b6375', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={fmtParamountLabel}
            ticks={analyticsSnapshot.paramount.points.map(p => p.label).filter(l => l.endsWith('-06'))}
          />
          <YAxis
            stroke="#6b6375"
            tick={{ fill: '#6b6375', fontSize: 12 }}
            domain={[0, 800]}
            ticks={[0, 100, 200, 300, 400, 500, 600, 700, 800]}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e5e5', borderRadius: '4px' }}
            labelStyle={{ color: '#102530' }}
            itemStyle={{ color: '#102530' }}
            labelFormatter={fmtParamountLabel}
          />
          <Legend wrapperStyle={{ paddingTop: '16px', fontSize: '12px', color: '#6b6375' }} />
          <Line type="monotone" dataKey="paramount" stroke="#c7752d" strokeWidth={3} activeDot={{ r: 6 }} dot={false} name="Paramount" />
          <Line type="monotone" dataKey="ngxAllShare" stroke="#2a9d5c" strokeWidth={2} activeDot={{ r: 5 }} dot={false} name="NGX All Share" strokeDasharray="3 3" />
          <Line type="monotone" dataKey="ngx30" stroke="#1a6bbd" strokeWidth={2} activeDot={{ r: 5 }} dot={false} name="NGX30" strokeDasharray="6 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import { Navigate } from 'react-router-dom';

export default function Analytics() {
  const isAuth = localStorage.getItem('chd_subscriber_auth') === 'true';

  const [activeMacroTab, setActiveMacroTab] = useState<(typeof macroTabs)[number]>('Inflation vs MPR');
  const [activeFixedIncomeTab, setActiveFixedIncomeTab] = useState<(typeof fixedIncomeTabs)[number]>('LCY Bonds');
  const [activeSector, setActiveSector] = useState<AnalyticsSectorName>('Banking');
  const [live, setLive] = useState<AnalyticsDashboardPayload | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let mounted = true;
    fetchMarketSnapshot('analytics_dashboard').then((snapshot) => {
      if (!mounted) return;
      if (snapshot?.payload) {
        setLive(snapshot.payload as AnalyticsDashboardPayload);
        setIsLive(true);
      }
    });
    return () => { mounted = false; };
  }, []);

  const headlineKpis = live?.headlineKpis && live.headlineKpis.length > 0 ? live.headlineKpis : analyticsSnapshot.headlineKpis;

  const macroIndicators = live?.macroForecasts
    ? [
        ...live.macroForecasts.map(macroMetricFromLive),
        live.creditGrowth ?? analyticsSnapshot.macroIndicators[4],
        live.debtGdp ?? analyticsSnapshot.macroIndicators[5],
      ]
    : analyticsSnapshot.macroIndicators;

  const lcyBonds = live?.lcyBonds && live.lcyBonds.length > 0 ? live.lcyBonds : analyticsSnapshot.fixedIncome.lcyBonds;
  const eurobonds = live?.eurobonds && live.eurobonds.length > 0 ? live.eurobonds : analyticsSnapshot.fixedIncome.eurobonds;

  const liveSectors = live?.sectors && Object.keys(live.sectors).length > 0 ? live.sectors : null;
  const selectedSector = liveSectors
    ? { status: 'available' as const, ...liveSectors[activeSector] }
    : analyticsSnapshot.sectors[activeSector];

  const paramountSummary = live
    ? [
        { label: 'Paramount Index', value: live.paramountIndexValue ?? '', change: '', sourceStatus: '' },
        { label: '1YR', value: live.paramount1yr ?? '', change: '', sourceStatus: '' },
        { label: '2YR', value: live.paramount2yr ?? '', change: '', sourceStatus: '' },
        { label: '3YR', value: live.paramount3yr ?? '', change: '', sourceStatus: '' },
        { label: '5YR', value: live.paramount5yr ?? '', change: '', sourceStatus: '' },
      ]
    : analyticsSnapshot.paramount.summary;
  const paramountPerformance = live?.paramountPerformance ?? analyticsSnapshot.paramount.performance;
  const paramountMethodology = live?.paramountMethodology ?? DEFAULT_PARAMOUNT_METHODOLOGY;

  const macroSourcesNote = live?.macroSourcesNote ?? analyticsSnapshot.macroSourcesNote;
  const fixedIncomeSourcesNote = live?.fixedIncomeSourcesNote ?? analyticsSnapshot.fixedIncomeSourcesNote;
  const sectorSourcesNote = live?.sectorSourcesNote ?? analyticsSnapshot.sectorSourcesNote;
  const paramountSourcesNote = live?.paramountSourcesNote ?? analyticsSnapshot.paramountSourcesNote;

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
          <aside style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            {isLive && <span className="status-pill status-live" style={{ marginBottom: 12, display: 'inline-block' }}>Live data</span>}
            <p className="analytics-disclaimer" style={{ margin: 0 }}>
              Market data displayed is for information purposes only. All data updated manually by Chapel
              Hill Denham Research team. Chapel Hill Denham makes no warranty as to accuracy or
              completeness.
            </p>
          </aside>
        </section>
        <section className="analytics-dashboard-kpis" aria-label="Dashboard summary">
          {headlineKpis.map((kpi) => {
            const changeClass = kpi.change?.startsWith('+') ? 'kpi-positive' : kpi.change?.startsWith('-') ? 'kpi-negative' : 'kpi-neutral';
            return (
              <article key={kpi.label} className={changeClass}>
                <span className="kpi-label">{kpi.label}</span>
                <strong className="kpi-value">{kpi.value}</strong>
                <small className="kpi-meta">{kpi.change} | {kpi.effectiveDate}</small>
              </article>
            );
          })}
        </section>

        <div className="analytics-dashboard-grid">
          <section className="analytics-section dashboard-panel" id="macro-desk">
            <div className="analytics-section-heading with-meta">
              <span className="section-number" aria-hidden="true">01</span>
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
                <p className="analytics-commentary analytics-commentary-text">
                  {activeMacroTab === 'Inflation vs MPR'
                    ? 'Inflation reached 15.93% in May 2026 while MPR remained at 26.50%.'
                    : 'GDP growth reached 3.89% in Q1 2026, compared with 4.07% in Q4 2025.'}
                </p>
              </div>
              <div className="macro-kpi-grid">
                {macroIndicators.map((indicator) => {
                  const hasForecast = 'forecast' in indicator && Array.isArray(indicator.forecast) && indicator.forecast.length > 0;
                  return (
                    <article className={`analytics-kpi${hasForecast ? ' has-forecast' : ''}`} key={indicator.label}>
                      <span>{indicator.label}</span>
                      <strong>{indicator.value}</strong>
                      <small>{indicator.change} | {indicator.effectiveDate}</small>
                      {hasForecast && (
                        <div className="analytics-kpi-forecast-rows">
                          {(indicator as typeof indicator & { forecast: ForecastRow[] }).forecast.map((row) => (
                            <div className={`forecast-row${row.isPlaceholder ? ' is-placeholder' : ''}`} key={row.year}>
                              <span>{row.year}:</span>
                              <span>{row.value}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
              <p className="analytics-sources-note">{macroSourcesNote}</p>
            </div>
          </section>

          {/*
          <section className="analytics-section dashboard-panel" id="market-data">
            <div className="analytics-section-heading with-meta">
              <span className="section-number" aria-hidden="true">02</span>
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

          <section className="analytics-section dashboard-panel" id="fixed-income">
            <div className="analytics-section-heading with-meta">
              <span className="section-number" aria-hidden="true">02</span>
              <h2>Fixed Income</h2>
              <small>{analyticsSnapshot.fixedIncome.effectiveDate}</small>
            </div>
            <div className="sector-panel-layout">
              <aside className="sector-pill-column">
                <div className="sector-pill-group">
                  {fixedIncomeTabs.map((tab) => (
                    <button
                      className={`sector-pill${activeFixedIncomeTab === tab ? ' active' : ''}`}
                      type="button"
                      key={tab}
                      onClick={() => setActiveFixedIncomeTab(tab)}
                      aria-pressed={activeFixedIncomeTab === tab}
                      aria-current={activeFixedIncomeTab === tab ? 'true' : undefined}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </aside>
              <div className="sector-detail-panel">
                <div className="sector-detail-head">
                  <h3>{activeFixedIncomeTab}</h3>
                </div>
                <div className="analytics-table-scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>Bond</th>
                        <th>Maturity</th>
                        <th className="num">Coupon (%)</th>
                        <th className="num">Yield (%)</th>
                        <th className="num">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(activeFixedIncomeTab === 'LCY Bonds'
                        ? lcyBonds
                        : eurobonds
                      ).map((row, i) => (
                        <tr key={`${activeFixedIncomeTab}-${i}`}>
                          <td>{row.bond}</td>
                          <td>{row.maturity}</td>
                          <td className="num">{row.coupon}</td>
                          <td className="num">{row.yield}</td>
                          <td className="num">{row.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="analytics-sources-note">{fixedIncomeSourcesNote}</p>
              </div>
            </div>
          </section>

          <section className="analytics-section dashboard-panel" id="sector-data">
            <div className="analytics-section-heading with-meta">
              <span className="section-number" aria-hidden="true">03</span>
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
                      aria-current={activeSector === sector ? 'true' : undefined}
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
                  {selectedSector.metrics.length > 0 ? selectedSector.metrics.map((metric) => (
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
                <p className="analytics-sources-note">{sectorSourcesNote}</p>
              </div>
            </div>
          </section>

          <section className="analytics-section dashboard-panel" id="paramount-index">
            <div className="analytics-section-heading with-meta">
              <span className="section-number" aria-hidden="true">04</span>
              <h2>Paramount Index</h2>
              <small>{analyticsSnapshot.paramount.effectiveDate}</small>
            </div>
            <div className="paramount-strip">
              {paramountSummary.map((item) => (
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
              <p>{paramountMethodology}</p>
            </details>
            <p className="analytics-sources-note">{paramountSourcesNote}</p>
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
                    {paramountPerformance.map((row) => {
                      const isParamount = row.index === 'Paramount';
                      return (
                        <tr key={row.index}>
                          <td>{row.index}</td>
                          <td className="num" style={{ color: row['1YR'].startsWith('-') ? 'var(--color-danger)' : 'var(--color-navy)' }}>{row['1YR']}</td>
                          <td className="num" style={{ color: row['2YR'].startsWith('-') ? 'var(--color-danger)' : (isParamount ? 'var(--color-success)' : 'var(--color-navy)') }}>{row['2YR']}</td>
                          <td className="num" style={{ color: row['3YR'].startsWith('-') ? 'var(--color-danger)' : (isParamount ? 'var(--color-success)' : 'var(--color-navy)') }}>{row['3YR']}</td>
                          <td className="num" style={{ color: row['5YR'].startsWith('-') ? 'var(--color-danger)' : (isParamount ? 'var(--color-success)' : 'var(--color-navy)') }}>{row['5YR']}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
            </section>
        </div>
      </div>
    </main>
  );
}

import { useState } from 'react';
import {
  analyticsSectorOrder,
  analyticsSnapshot,
  type AnalyticsSectorName,
} from '../data/analyticsSnapshot';

const macroTabs = ['Inflation vs MPR', 'GDP Growth'] as const;

type ChartPoint = {
  label: string;
  value: number;
  secondary?: number;
};

function sourceStatus(item: object) {
  return 'sourceStatus' in item ? String(item.sourceStatus) : '';
}

function rangeFor(points: ChartPoint[]) {
  const values = points.flatMap((point) => [point.value, point.secondary]).filter((value): value is number => typeof value === 'number');
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = Math.max((max - min) * 0.12, 1);
  return { min: Math.floor(min - pad), max: Math.ceil(max + pad) };
}

function polyline(points: ChartPoint[], min: number, max: number, key: 'value' | 'secondary') {
  const xStart = 54;
  const xEnd = 704;
  const yTop = 44;
  const yBottom = 238;
  const xStep = points.length > 1 ? (xEnd - xStart) / (points.length - 1) : 0;
  return points
    .map((point, index) => {
      const raw = key === 'value' ? point.value : point.secondary;
      const y = yBottom - (((raw ?? point.value) - min) / (max - min || 1)) * (yBottom - yTop);
      return `${xStart + index * xStep},${y}`;
    })
    .join(' ');
}

function barGeometry(points: ChartPoint[], min: number, max: number) {
  const xStart = 54;
  const xEnd = 704;
  const yTop = 44;
  const yBottom = 238;
  const slot = (xEnd - xStart) / Math.max(points.length, 1);
  const width = Math.min(44, slot * 0.54);
  return points.map((point, index) => {
    const height = ((point.value - min) / (max - min || 1)) * (yBottom - yTop);
    return {
      x: xStart + index * slot + (slot - width) / 2,
      y: yBottom - height,
      width,
      height,
    };
  });
}

function MacroChart({ activeTab }: { activeTab: (typeof macroTabs)[number] }) {
  const points: ChartPoint[] = activeTab === 'Inflation vs MPR'
    ? analyticsSnapshot.macroChart.inflationMpr.map((point) => ({
        label: point.label,
        value: point.inflation,
        secondary: point.mpr,
      }))
    : analyticsSnapshot.macroChart.gdpGrowth.map((point) => ({
        label: point.label,
        value: point.value,
      }));
  const { min, max } = rangeFor(points);
  const yLabels = Array.from({ length: 6 }, (_, index) => max - ((max - min) / 5) * index);
  const isGdpChart = activeTab === 'GDP Growth';

  return (
    <div className="chart-shell chart-shell-tall analytics-svg-chart" aria-label={`${activeTab} chart`}>
      <svg viewBox="0 0 760 300" role="img">
        <g className="chart-grid">
          {[44, 82, 120, 158, 196, 234].map((y) => (
            <line key={y} x1="44" x2="734" y1={y} y2={y} />
          ))}
        </g>
        <g className="chart-axis-labels chart-y-labels">
          {yLabels.map((label, index) => (
            <text key={label} x="0" y={49 + index * 38}>{label.toFixed(2)}%</text>
          ))}
        </g>
        <g className="chart-axis-labels chart-x-labels">
          {points.map((point, index) => (
            <text key={point.label} x={50 + index * (650 / Math.max(points.length - 1, 1))} y="292">{point.label}</text>
          ))}
        </g>
        <g className="chart-legend">
          <circle cx="350" cy="25" r="7" className="chart-line-primary-fill" />
          <text x="362" y="29">{activeTab === 'Inflation vs MPR' ? 'Inflation' : 'GDP Growth'}</text>
          {activeTab === 'Inflation vs MPR' && (
            <>
              <circle cx="438" cy="25" r="7" className="chart-line-secondary-fill" />
              <text x="450" y="29">MPR</text>
            </>
          )}
        </g>
        {activeTab === 'Inflation vs MPR' && (
          <polyline
            className="chart-line-secondary"
            points={polyline(points, min, max, 'secondary')}
            style={{ transition: 'all 0.5s ease-in-out' }}
          />
        )}
        {isGdpChart ? (
          <g className="chart-bars">
            {barGeometry(points, min, max).map((bar, index) => (
              <rect
                key={points[index].label}
                className="chart-line-primary-fill"
                x={bar.x}
                y={bar.y}
                width={bar.width}
                height={bar.height}
                rx="2"
                style={{ transition: 'all 0.5s ease-in-out' }}
              />
            ))}
          </g>
        ) : (
          <polyline
            className="chart-line-primary"
            points={polyline(points, min, max, 'value')}
            style={{ transition: 'all 0.5s ease-in-out' }}
          />
        )}
      </svg>
    </div>
  );
}

const paramountPoints: ChartPoint[] = [
  { label: 'Jan', value: 2100 },
  { label: 'Feb', value: 2250 },
  { label: 'Mar', value: 2310 },
  { label: 'Apr', value: 2450 },
  { label: 'May', value: 2600 },
  { label: 'Jun', value: 2750.40 },
];

function ParamountChart() {
  const { min, max } = rangeFor(paramountPoints);
  const yLabels = Array.from({ length: 6 }, (_, index) => max - ((max - min) / 5) * index);

  return (
    <div className="chart-shell chart-shell-paramount analytics-svg-chart paramount-svg-chart" aria-label="Paramount Index trend">
      <svg viewBox="0 0 760 300" role="img">
        <g className="chart-grid">
          {[44, 82, 120, 158, 196, 234].map((y) => (
            <line key={y} x1="44" x2="734" y1={y} y2={y} />
          ))}
        </g>
        <g className="chart-axis-labels chart-y-labels">
          {yLabels.map((label, index) => (
            <text key={label} x="0" y={49 + index * 38}>{Math.round(label)}</text>
          ))}
        </g>
        <g className="chart-axis-labels chart-x-labels">
          {paramountPoints.map((point, index) => (
            <text key={point.label} x={50 + index * (650 / Math.max(paramountPoints.length - 1, 1))} y="292">{point.label}</text>
          ))}
        </g>
        <polyline
          className="chart-line-primary"
          points={polyline(paramountPoints, min, max, 'value')}
          style={{ transition: 'all 0.5s ease-in-out' }}
        />
      </svg>
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
                    <th>Ticker</th>
                    <th className="num">Weight %</th>
                    <th className="num">Last Price</th>
                    <th className="num">1D Change</th>
                  </tr>
                </thead>
                <tbody>
                  {analyticsSnapshot.paramount.weights.map((row) => (
                    <tr key={row.ticker}>
                      <td>{row.ticker}{sourceStatus(row) && <small style={{ display: 'block' }}>{sourceStatus(row)}</small>}</td>
                      <td className="num">{row.weight}</td>
                      <td className="num">{row.lastPrice}</td>
                      <td className="num">{row.change}</td>
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

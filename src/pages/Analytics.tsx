import { useEffect, useState } from 'react';
import { marketMetrics, type MarketMetric } from '../data/mockData';
import { fetchPublicMarketDataSeries, fetchPublicMarketDataPoints } from '../lib/supabase';

export default function Analytics() {
  const [metrics, setMetrics] = useState<MarketMetric[]>(marketMetrics);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      const seriesData = await fetchPublicMarketDataSeries();
      const pointsData = await fetchPublicMarketDataPoints();

      if (seriesData && pointsData && seriesData.length > 0 && pointsData.length > 0) {
        // Build the latest point for each series
        const latestPoints: Record<string, any> = {};
        pointsData.forEach((pt: any) => {
          if (!latestPoints[pt.series_id] || new Date(pt.as_of_date) > new Date(latestPoints[pt.series_id].as_of_date)) {
            latestPoints[pt.series_id] = pt;
          }
        });

        const newMetrics: MarketMetric[] = [];
        seriesData.forEach((s: any) => {
          const point = latestPoints[s.id];
          if (point) {
            newMetrics.push({
              label: s.name,
              value: point.value.toString() + (s.unit === 'Percent' ? '%' : ''),
              note: point.metadata?.note || s.frequency || 'latest print'
            });
          }
        });

        if (newMetrics.length > 0) {
          setMetrics(newMetrics);
        }
      }
      setLoading(false);
    }
    loadAnalytics();
  }, []);

  return (
    <main>
      <section className="analytics-page">
        <div className="container">
          <div className="analytics-intro">
            <div>
              <p className="eyebrow">Subscriber Analytics</p>
              <h1>Data &amp; Analytics</h1>
              <p>Curated macro indicators, market data, and internal reference charts used by the Research Desk.</p>
            </div>
          </div>

          {loading ? (
            <p>Loading analytics data...</p>
          ) : (
            <div className="analytics-dashboard-kpis">
              {metrics.map(metric => (
                <article key={metric.label}>
                  <span>{metric.label}</span>
                  <strong>{metric.value}</strong>
                  <small>{metric.note}</small>
                </article>
              ))}
            </div>
          )}

          <div className="analytics-dashboard-grid">
            <section className="panel analytics-preview-gate">
              <div className="analytics-preview-blur">
                <h2>Key Macro Indicators</h2>
                <div className="chart-box" aria-hidden="true">
                  <span style={{ height: '42%' }}></span>
                  <span style={{ height: '64%' }}></span>
                  <span style={{ height: '51%' }}></span>
                  <span style={{ height: '78%' }}></span>
                  <span style={{ height: '58%' }}></span>
                </div>
                <div className="table-wrap light">
                  <table>
                    <thead><tr><th>Indicator</th><th>Latest</th><th>Direction</th></tr></thead>
                    <tbody>
                      {metrics.slice(0, 3).map(metric => (
                        <tr key={metric.label}>
                          <td>{metric.label}</td>
                          <td>{metric.value}</td>
                          <td>-</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="analytics-preview-overlay">
                <span>Preview</span>
                <h2>Subscriber analytics layer</h2>
                <p>Static preview only. Live market analytics remain disabled until the data source is approved.</p>
              </div>
            </section>

            <section className="panel">
              <h2>Market Data</h2>
              <p>Sample data mirrors the PHP reference treatment without connecting to Supabase or live feeds.</p>
              <div className="chart-box" aria-hidden="true">
                <span style={{ height: '32%' }}></span>
                <span style={{ height: '45%' }}></span>
                <span style={{ height: '54%' }}></span>
                <span style={{ height: '68%' }}></span>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

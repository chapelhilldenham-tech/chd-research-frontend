import { useEffect, useState } from 'react';
import { adminMarketFields } from '../../data/adminMockData';
import { fetchPublicMarketDataPoints, fetchPublicMarketDataSeries } from '../../lib/supabase';

export default function AdminAnalytics() {
  const [seriesCount, setSeriesCount] = useState(0);
  const [pointCount, setPointCount] = useState(0);

  useEffect(() => {
    async function loadReadOnlyCounts() {
      const [series, points] = await Promise.all([
        fetchPublicMarketDataSeries(),
        fetchPublicMarketDataPoints(),
      ]);
      setSeriesCount(series?.length || 0);
      setPointCount(points?.length || 0);
    }
    loadReadOnlyCounts();
  }, []);

  return (
    <>
      <section className="panel">
        <div className="section-head">
          <div>
            <h2>Market Data Workspace</h2>
            <p className="muted">Rebuilt from PHP macro, NGX, yields, Paramount, and sector tabs. Fields are disabled until write RLS is approved.</p>
          </div>
          <span className="status-pill status-active">{seriesCount} public series / {pointCount} points</span>
        </div>
      </section>

      <div className="tabs">
        {Object.keys(adminMarketFields).map((key, index) => (
          <button className={`tab-button ${index === 0 ? 'active' : ''}`} type="button" disabled={index !== 0} key={key}>{key}</button>
        ))}
      </div>

      <section className="tab-panel active panel">
        <h2>Macro</h2>
        <div className="grid-4">
          {adminMarketFields.macro.map(field => (
            <div className="field" key={field}><label>{field}</label><input placeholder="Read-only staging" disabled /></div>
          ))}
        </div>
        <div className="field"><label>Commentary</label><textarea placeholder="Commentary writes disabled." disabled /></div>
        <button className="btn btn-bronze" type="button" disabled>Save Macro Disabled</button>
      </section>

      <section className="grid-2" style={{ marginTop: 24 }}>
        {(['ngx', 'yields', 'paramount', 'sectors'] as const).map(group => (
          <article className="panel" key={group}>
            <h2>{group}</h2>
            <div className="form-grid">
              {adminMarketFields[group].map(field => (
                <div className="field" key={field}><label>{field}</label><input placeholder="Pending write workflow" disabled /></div>
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

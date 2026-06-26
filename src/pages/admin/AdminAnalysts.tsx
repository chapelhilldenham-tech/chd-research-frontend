import { useEffect, useState } from 'react';
import { fetchPublicAnalysts } from '../../lib/supabase';
import { mockAnalysts, type Analyst } from '../../data/mockData';

export default function AdminAnalysts() {
  const [analysts, setAnalysts] = useState<Analyst[]>(mockAnalysts);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    async function loadAnalysts() {
      const data = await fetchPublicAnalysts();
      if (data && data.length > 0) {
        setAnalysts(data.map((row: any) => ({
          id: row.id,
          name: row.full_name,
          title: row.title,
          coverage: row.coverage || [],
          sectors: row.sectors || [],
          bio: row.bio || '',
          photo_path: row.avatar_url || '',
          photo_position: row.photo_position || '50% 0%',
          isHouseView: row.slug === 'house-view',
        })));
        setUsingFallback(false);
      } else {
        setUsingFallback(true);
      }
      setLoading(false);
    }
    loadAnalysts();
  }, []);

  return (
    <>
      <section className="panel">
        <div className="section-head">
          <div>
            <h2>Analyst Profiles</h2>
            <p className="muted">Based on PHP analyst management: name, title, coverage, bio, sort order, portrait focus, and active status.</p>
          </div>
          <span className="status-pill status-active">House View protected</span>
        </div>
        {usingFallback && <p className="notice">Supabase analyst rows unavailable. Showing local fallback profiles.</p>}
      </section>

      {loading ? <p>Loading analysts...</p> : (
        <section className="bo-analyst-list">
          {analysts.map(analyst => (
            <article className="bo-analyst-card panel" key={analyst.id}>
              <div className="bo-card-head">
                <div><h2>{analyst.name}</h2><p className="muted">{analyst.title}</p></div>
                <span className="status-pill status-active">Active</span>
              </div>
              <div className="grid-2">
                <div className="field"><label>Name</label><input value={analyst.name} disabled /></div>
                <div className="field"><label>Title</label><input value={analyst.title} disabled /></div>
              </div>
              <div className="field"><label>Coverage</label><input value={((analyst.coverage && analyst.coverage.length) ? analyst.coverage : (analyst.sectors || [])).join(', ')} disabled /></div>
              <div className="field"><label>Bio</label><textarea value={analyst.bio} disabled /></div>
              <div className="grid-2">
                <div className="field"><label>Portrait Focus</label><input value={analyst.photo_position} disabled /></div>
                <div className="field"><label>Portrait URL</label><input value={analyst.photo_path || 'No image'} disabled /></div>
              </div>
              <div className="button-row">
                <button className="btn btn-bronze" type="button" disabled>Save Analyst Disabled</button>
                <button className="btn btn-border" type="button" disabled>Deactivate Disabled</button>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}

import { useEffect, useState } from 'react';
import AnalystStrip from '../components/AnalystStrip';
import { mockAnalysts, type Analyst } from '../data/mockData';
import { fetchPublicAnalysts } from '../lib/supabase';

export default function Analysts() {
  const [analysts, setAnalysts] = useState<Analyst[]>(mockAnalysts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalysts() {
      const data = await fetchPublicAnalysts();
      if (data && data.length > 0) {
        const mappedAnalysts: Analyst[] = data.map((a: any) => ({
          id: a.id,
          name: a.full_name,
          title: a.title,
          coverage: a.coverage || [],
          bio: a.bio,
          photo_path: a.avatar_url,
          photo_position: a.photo_position,
          isHouseView: a.slug === 'house-view', // Or another indicator if present
        }));
        setAnalysts(mappedAnalysts);
      }
      setLoading(false);
    }
    loadAnalysts();
  }, []);

  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Research Coverage</h1>
          <p>Chapel Hill Denham's research team provides independent analysis across Nigeria's major sectors.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="section-head compact">
            <div>
              <p className="eyebrow">Analyst profiles</p>
              <h2>Coverage by sector and house view</h2>
            </div>
          </div>
          {loading ? (
            <p>Loading analysts...</p>
          ) : (
            <AnalystStrip analysts={analysts} />
          )}
        </div>
      </section>
    </main>
  );
}

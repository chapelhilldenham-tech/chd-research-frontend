import { useEffect, useState } from 'react';
import AnalystModal from '../components/AnalystModal';
import Icon from '../components/Icon';
import { mockAnalysts, type Analyst } from '../data/mockData';
import { fetchPublicAnalysts } from '../lib/supabase';

export default function Analysts() {
  const [analysts, setAnalysts] = useState<Analyst[]>(mockAnalysts);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [selectedAnalyst, setSelectedAnalyst] = useState<Analyst | null>(null);

  useEffect(() => {
    async function loadAnalysts() {
      const data = await fetchPublicAnalysts();
      if (data && data.length > 0) {
        setAnalysts(data as Analyst[]);
        setUsingFallback(false);
      } else {
        setUsingFallback(true);
      }
      setLoading(false);
    }
    loadAnalysts();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

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

          {usingFallback && (
            <p className="notice">Live analyst profiles are temporarily unavailable. Showing local preview profiles.</p>
          )}

          {loading ? (
            <p>Loading analysts...</p>
          ) : (
            <div className="analyst-grid" aria-label="Research team profiles">
              {analysts.map(analyst => {
                const coverage = analyst.coverage.length > 0 ? analyst.coverage : analyst.sectors || [];

                return (
                  <article
                    key={analyst.id}
                    className="analyst-card"
                    data-analyst-card
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedAnalyst(analyst)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedAnalyst(analyst);
                      }
                    }}
                  >
                    <div
                      className={`analyst-photo ${analyst.isHouseView ? 'analyst-photo-house' : ''}`}
                      style={{ '--analyst-photo-position': analyst.photo_position } as React.CSSProperties}
                    >
                      {analyst.isHouseView ? (
                        <img className="analyst-house-logo" src={analyst.photo_path} alt="Chapel Hill Denham" />
                      ) : analyst.photo_path ? (
                        <img src={analyst.photo_path} alt={analyst.name} />
                      ) : (
                        <span className="analyst-initials">{getInitials(analyst.name)}</span>
                      )}
                    </div>
                    <div className="analyst-info">
                      <p className="analyst-role">{analyst.title}</p>
                      <h3>{analyst.name}</h3>
                      <div className="analyst-coverage" aria-label="Coverage sectors">
                        {coverage.map((item, index) => (
                          <span key={`${analyst.id}-${item}-${index}`}>{item}</span>
                        ))}
                      </div>
                      <p className="analyst-bio-preview">
                        {analyst.bio ? analyst.bio : `${analyst.name} is a member of the Chapel Hill Denham Research team.`}
                      </p>
                      <span className="text-link analyst-link">
                        View Coverage <Icon name="arrow" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selectedAnalyst && (
        <AnalystModal analyst={selectedAnalyst} onClose={() => setSelectedAnalyst(null)} />
      )}
    </main>
  );
}

import AnalystStrip from '../components/AnalystStrip';
import { mockAnalysts } from '../data/mockData';

export default function Analysts() {
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
          <AnalystStrip analysts={mockAnalysts} />
        </div>
      </section>
    </main>
  );
}

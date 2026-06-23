import AnalystStrip from '../components/AnalystStrip';
import { mockAnalysts } from '../data/mockData';

export default function Analysts() {
  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Meet the Research Team</h1>
          <p>Our analysts provide deep sector coverage and macroeconomic insights.</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <AnalystStrip analysts={mockAnalysts} />
        </div>
      </section>
    </main>
  );
}

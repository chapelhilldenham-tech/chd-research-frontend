export default function Analytics() {
  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Data & Analytics</h1>
          <p>Subscriber access includes macro indicators, live market tracking, and valuation multiples.</p>
        </div>
      </header>

      <section className="section" style={{ backgroundColor: 'var(--color-neutral-bg)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Mock Chart Cards */}
            <div className="card" style={{ padding: '2rem', backgroundColor: '#fff', textAlign: 'center' }}>
              <div style={{ width: '100%', height: '200px', backgroundColor: '#f0f4f8', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                Chart Placeholder
              </div>
              <h3>GDP Growth Rate</h3>
              <p>Historical trends and forecasts</p>
            </div>
            
            <div className="card" style={{ padding: '2rem', backgroundColor: '#fff', textAlign: 'center' }}>
              <div style={{ width: '100%', height: '200px', backgroundColor: '#f0f4f8', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                Chart Placeholder
              </div>
              <h3>Inflation CPI</h3>
              <p>Monthly tracking vs targets</p>
            </div>
            
            <div className="card" style={{ padding: '2rem', backgroundColor: '#fff', textAlign: 'center' }}>
              <div style={{ width: '100%', height: '200px', backgroundColor: '#f0f4f8', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                Chart Placeholder
              </div>
              <h3>FX Reserves</h3>
              <p>CBN gross reserves tracking</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

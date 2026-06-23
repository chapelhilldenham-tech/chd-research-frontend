export default function Login() {
  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Sign In</h1>
          <p>Access your institutional research account.</p>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ maxWidth: '400px' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email Address</label>
                <input type="email" disabled placeholder="demo@example.com" style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Password</label>
                <input type="password" disabled placeholder="••••••••" style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              </div>
              <button className="btn btn-navy" disabled style={{ width: '100%', opacity: 0.7, cursor: 'not-allowed' }}>Sign In</button>
            </form>
            <p style={{ fontSize: '0.875rem', textAlign: 'center', marginTop: '1rem', color: 'var(--color-navy-light)' }}>
              Authentication is disabled in this static preview.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

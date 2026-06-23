export default function Contact() {
  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Reach out to the Chapel Hill Denham Research team.</p>
        </div>
      </header>

      <section className="section">
        <div className="container" style={{ maxWidth: '600px' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <form onSubmit={(e) => e.preventDefault()}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>First Name</label>
                  <input type="text" disabled style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Last Name</label>
                  <input type="text" disabled style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                </div>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Email</label>
                <input type="email" disabled style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Message</label>
                <textarea disabled rows={5} style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}></textarea>
              </div>
              <button className="btn btn-navy" disabled style={{ opacity: 0.7, cursor: 'not-allowed' }}>Send Message</button>
            </form>
            <p style={{ fontSize: '0.875rem', marginTop: '1rem', color: 'var(--color-navy-light)' }}>
              Forms are disabled in this static preview.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

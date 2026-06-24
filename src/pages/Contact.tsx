export default function Contact() {
  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Reach the Chapel Hill Denham team.</p>
        </div>
      </header>

      <section className="section">
        <div className="container contact-layout">
          <div className="panel">
            <h2>Send a Message</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-grid">
                <div className="field">
                  <label>Full Name</label>
                  <input type="text" disabled />
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input type="email" disabled />
                </div>
                <div className="field">
                  <label>Subject</label>
                  <select disabled>
                    <option>General Enquiry</option>
                    <option>Research Access</option>
                    <option>Media & Press</option>
                    <option>Investment Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea disabled rows={5}></textarea>
                </div>
                <button className="btn btn-navy" disabled>Send Message</button>
              </div>
            </form>
            <p className="notice compact">Forms are disabled in this static preview.</p>
          </div>
          <aside className="panel contact-card">
            <h2>Chapel Hill Denham</h2>
            <p>10 Bankole Oki Road, Ikoyi, Lagos, Nigeria</p>
            <p>Tel: +234 (1) 2799561-4</p>
            <p>research@chapelhilldenham.com</p>
            <div className="contact-map" aria-hidden="true"></div>
            <a className="text-link contact-map-link" href="#" onClick={(event) => event.preventDefault()}>Open in Maps</a>
          </aside>
        </div>
      </section>
    </main>
  );
}

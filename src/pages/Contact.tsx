import { useState } from 'react';
import type { FormEvent } from 'react';

export default function Contact() {
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=10%20Bankole%20Oki%20Road%2C%20Ikoyi%2C%20Lagos%2C%20Nigeria';
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setMessage('Please complete the required fields before sending your message.');
      form.reportValidity();
      return;
    }
    setMessage('Contact form submission is not enabled in this staging preview. Please email research@chapelhilldenham.com.');
  };

  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <p>Reach the Chapel Hill Denham team.</p>
        </div>
      </header>

      <section className="section">
        <div className="container contact-layout">
          <div className="contact-form-panel">
            <h2>Send a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {message && <p className="notice login-message">{message}</p>}
                <div className="field">
                  <label>Full Name</label>
                  <input type="text" required />
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input type="email" required />
                </div>
                <div className="field">
                  <label>Subject</label>
                  <select defaultValue="General Enquiry">
                    <option>General Enquiry</option>
                    <option>Research Access</option>
                    <option>Media & Press</option>
                    <option>Investment Enquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea rows={5} required></textarea>
                </div>
                <button
                  className="btn btn-navy"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <aside className="panel contact-card">
            <h2>Chapel Hill Denham</h2>
            <p>10 Bankole Oki Road, Ikoyi, Lagos, Nigeria</p>
            <p>Tel: +234 (1) 2799561-4</p>
            <p>research@chapelhilldenham.com</p>
            <div className="contact-map" aria-hidden="true"></div>
            <a className="text-link contact-map-link" href={mapsUrl} target="_blank" rel="noopener noreferrer">Open in Maps</a>
          </aside>
        </div>
      </section>
    </main>
  );
}

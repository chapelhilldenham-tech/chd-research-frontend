export default function Subscribe() {
  return (
    <main>
      <header className="page-hero">
        <div className="container">
          <h1>Subscribe to Chapel Hill Denham Research</h1>
        </div>
      </header>

      <section className="section subscribe-page">
        <div className="container subscribe-layout">
          <section className="panel subscribe-pricing-card">
            <h2>Annual Research Access</h2>
            <p className="subscribe-price"><strong>Contact research desk</strong><span>per year</span></p>
            <ul className="subscribe-feature-list">
              <li>Subscriber reports</li>
              <li>Market data</li>
              <li>Price lists</li>
              <li>Paramount Index data</li>
              <li>Research desk access</li>
            </ul>
            <p>What you get immediately after payment: full subscriber access to Chapel Hill Denham Research.</p>
            <button className="btn btn-bronze" type="button" disabled>Pay with Paystack</button>
            <p className="notice subscribe-payment-notice">
              Online payment is currently unavailable in this staging preview. To subscribe, contact research@chapelhilldenham.com.
            </p>
          </section>

          <aside className="panel subscribe-trust-card">
            <h2>Why Subscribe?</h2>
            <div className="subscribe-trust-list">
              <p><span>Paystack CBN-licensed payment processing</span></p>
              <p><span>SSL secure checkout</span></p>
              <p><span>Annual access, cancel anytime</span></p>
              <p><span>Instant access after payment</span></p>
              <p><span>Used by Nigeria's leading investment firms</span></p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

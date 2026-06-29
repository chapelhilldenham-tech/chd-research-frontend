import { Link } from 'react-router-dom';

const interests = [
  'Equity Research',
  'Fixed Income',
  'Macroeconomic Analysis',
  'Sector Research',
  'The Paramount Index',
];

export default function Signup() {
  return (
    <main>
      <header className="page-hero hero-signup">
        <div className="container">
          <h1>Access Chapel Hill Denham Research</h1>
          <p>Nigeria's leading independent research, built for professionals.</p>
        </div>
      </header>

      <section className="section signup-page">
        <div className="container split signup-layout">
          <section className="signup-form-panel">
            <h2>Create Your Account</h2>
            <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
              <p className="notice">Account creation is not enabled in this staging preview. Contact the research desk for access.</p>
              <div className="field"><label>Full Name*</label><input type="text" required /></div>
              <div className="field"><label>Email Address*</label><input type="email" required /></div>
              <div className="field"><label>Phone Number</label><input type="tel" placeholder="+234..." /></div>
              <div className="field"><label>Organisation*</label><input type="text" required /></div>
              <div className="field"><label>Job Title / Role*</label><input type="text" required /></div>
              <div className="field">
                <label>Industry</label>
                <select defaultValue="Asset Management">
                  <option>Asset Management</option>
                  <option>Banking</option>
                  <option>Insurance</option>
                  <option>Pension</option>
                  <option>Corporate Finance</option>
                  <option>Private Equity</option>
                  <option>Government/Regulatory</option>
                  <option>Academia</option>
                  <option>Other</option>
                </select>
              </div>
              <fieldset>
                <legend>Research Interest</legend>
                {interests.map((interest) => (
                  <div className="checkbox-item" key={interest}>
                    <input id={`interest-${interest.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} type="checkbox" />
                    <label htmlFor={`interest-${interest.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{interest}</label>
                  </div>
                ))}
              </fieldset>
              <div className="field">
                <label>How did you hear about us?</label>
                <select defaultValue="Colleague referral">
                  <option>Colleague referral</option>
                  <option>Chapel Hill Denham event</option>
                  <option>LinkedIn</option>
                  <option>Web search</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="checkbox-item">
                <input id="terms" type="checkbox" required />
                <label htmlFor="terms">I agree to the Terms of Use and Privacy Policy</label>
              </div>
              <div className="signup-staging-notice">
                <p className="notice">Account creation is not enabled in this staging preview.</p>
                <button className="btn btn-navy" type="button" disabled aria-disabled="true">Create Account</button>
              </div>
              <Link className="text-link" to="/login">Already have an account? Sign in →</Link>
            </form>
          </section>

          <aside className="panel signup-summary">
            <h2>What's included</h2>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Free</th>
                    <th>Subscriber</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Public research</td><td>Yes</td><td>Yes</td></tr>
                  <tr><td>Subscriber reports</td><td>No</td><td>Yes</td></tr>
                  <tr><td>Market data</td><td>No</td><td>Yes</td></tr>
                  <tr><td>Price lists</td><td>Yes</td><td>Yes</td></tr>
                  <tr><td>Paramount Index data</td><td>No</td><td>Yes</td></tr>
                  <tr><td>Research desk access</td><td>No</td><td>Yes</td></tr>
                </tbody>
              </table>
            </div>
            <h3>Annual Subscription</h3>
            <p className="subscription-price">Annual subscription — contact the research desk for pricing.</p>
            <Link className="btn btn-bronze" to="/subscribe">Subscribe Now</Link>
            <hr />
            <p>Questions? Contact us: research@chapelhilldenham.com</p>
          </aside>
        </div>
      </section>
    </main>
  );
}

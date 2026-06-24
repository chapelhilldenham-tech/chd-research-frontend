import { Link } from 'react-router-dom';

export default function ResetPassword() {
  return (
    <main>
      <section className="section auth-page-section">
        <div className="container auth-preview-container">
          <div className="auth-card">
            <img src="/assets/img/logo-navy-transparent.png" alt="Chapel Hill Denham" />
            <h1>Reset Your Password</h1>
            <p>Enter your email address and we'll send you a reset link.</p>
            <form className="form-grid" onSubmit={(event) => event.preventDefault()}>
              <p className="notice">Password reset email delivery is not enabled in this staging preview.</p>
              <div className="field">
                <label>Email Address</label>
                <input type="email" required />
              </div>
              <button className="btn btn-navy" type="button" disabled>Send Reset Link</button>
              <Link className="text-link" to="/login">Return to Sign In</Link>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

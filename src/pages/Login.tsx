import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <main>
      <section className="section auth-page-section">
        <div className="container auth-preview-container">
          <div className="auth-card">
            <img src="/assets/img/logo-navy-transparent.png" alt="Chapel Hill Denham" />
            <h1>Sign In</h1>
            <p>Welcome back.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label>Email Address</label>
                <input type="email" />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" />
              </div>
              <Link className="text-link" to="/reset-password">Forgot password?</Link>
              <button
                className="btn btn-navy"
                type="button"
                disabled
                title="Sign in is not enabled in this staging preview"
              >
                Sign In
              </button>
            </form>
            <p className="auth-create-row">
              <Link className="text-link" to="/signup">
                Don't have an account? Create one <span aria-hidden="true">-&gt;</span>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

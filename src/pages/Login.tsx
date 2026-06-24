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
              <a className="text-link" href="#" onClick={(event) => event.preventDefault()}>Forgot password?</a>
              <button className="btn btn-navy" type="submit">Sign In</button>
            </form>
            <p className="auth-create-row">
              <a className="text-link" href="#" onClick={(event) => event.preventDefault()}>
                Don't have an account? Create one <span aria-hidden="true">-&gt;</span>
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

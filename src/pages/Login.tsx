export default function Login() {
  return (
    <main>
      <section className="section">
        <div className="container auth-preview-container">
          <div className="auth-card">
            <img src="/assets/img/logo-navy-transparent.png" alt="Chapel Hill Denham" />
            <h1>Sign In</h1>
            <p>Welcome back.</p>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label>Email Address</label>
                <input type="email" disabled />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" disabled />
              </div>
              <a className="text-link" href="#" onClick={(event) => event.preventDefault()}>Forgot password?</a>
              <button className="btn btn-navy" disabled>Sign In</button>
            </form>
            <p>Don't have an account? <a className="text-link" href="#" onClick={(event) => event.preventDefault()}>Create one</a></p>
            <p className="notice compact">Authentication is disabled in this static preview.</p>
          </div>
        </div>
      </section>
    </main>
  );
}

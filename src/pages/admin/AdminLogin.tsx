export default function AdminLogin() {
  return (
    <main className="access-gate">
      <div className="auth-card">
        <img src="/assets/img/logo-navy-transparent.png" alt="Chapel Hill Denham" style={{ width: 190, margin: '0 auto 24px', display: 'block' }} />
        <p className="eyebrow">Back-office access</p>
        <h1>Admin Sign In</h1>
        <p className="notice">Visual preview only. Supabase Auth and staff authorization are not enabled yet.</p>
        <form>
          <div className="field">
            <label htmlFor="admin-email">Email Address</label>
            <input id="admin-email" type="email" placeholder="research-admin@example.com" disabled />
          </div>
          <div className="field">
            <label htmlFor="admin-password">Password</label>
            <input id="admin-password" type="password" placeholder="Supabase Auth pending" disabled />
          </div>
          <button className="btn btn-navy" type="button" disabled>Sign In Disabled</button>
        </form>
      </div>
    </main>
  );
}

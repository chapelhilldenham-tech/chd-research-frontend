import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (email === 'test@chd.com' && password === 'password') {
      localStorage.setItem('chd_subscriber_auth', 'true');
      setLoading(false);
      navigate('/analytics');
    } else {
      setError('Invalid credentials. Use test@chd.com / password for this preview.');
      setLoading(false);
    }
  };

  return (
    <main>
      <section className="section auth-page-section">
        <div className="container auth-preview-container">
          <div className="auth-card">
            <img src="/assets/img/logo-navy-transparent.png" alt="Chapel Hill Denham" />
            <h1>Sign In</h1>
            <p>Welcome back. (Use test@chd.com / password)</p>
            <form onSubmit={handleLogin}>
              <div className="field">
                <label>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="field">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {error && <p className="form-error-message">{error}</p>}
              <button
                className="btn btn-navy"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
              <Link className="text-link" to="/reset-password">Forgot password?</Link>
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

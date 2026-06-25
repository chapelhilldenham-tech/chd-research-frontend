import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'test@chd.com' && password === 'password') {
      localStorage.setItem('chd_subscriber_auth', 'true');
      navigate('/analytics');
    } else {
      setError('Invalid credentials. Use test@chd.com / password for this preview.');
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
              {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '1rem' }}>{error}</p>}
              <Link className="text-link" to="/reset-password">Forgot password?</Link>
              <button
                className="btn btn-navy"
                type="submit"
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

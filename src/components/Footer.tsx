import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <div className="brand-lockup footer-brand">
          <img src="/assets/img/logo-white-transparent.png" alt="Chapel Hill Denham" />
        </div>
        <p>Institutional research for Africa's capital markets.</p>
      </div>
      <div>
        <h3>Research</h3>
        <Link to="/reports">Reports</Link>
        <Link to="/analytics">Data & Analytics</Link>
        <Link to="/analysts">Analysts</Link>
      </div>
      <div>
        <h3>Contact</h3>
        <p>10 Bankole Oki Road, Ikoyi, Lagos, Nigeria</p>
        <p>research@chapelhilldenham.com</p>
      </div>
      <div>
        <h3>Access</h3>
        <Link to="/contact">Create Account</Link>
        <Link to="/login">Sign In</Link>
        <Link to="/contact">Subscribe</Link>
      </div>
      <p className="copyright">&copy; {new Date().getFullYear()} Chapel Hill Denham Securities Limited.</p>
    </footer>
  );
}

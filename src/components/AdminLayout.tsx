import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const adminNav = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/analytics', label: 'Data & Analytics' },
  { to: '/admin/price-lists', label: 'Price Lists' },
  { to: '/admin/analysts', label: 'Analysts' },
];

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.className = 'theme-dark';
    document.body.removeAttribute('data-has-hero');
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="admin-shell">
      <div className={`admin-drawer-overlay ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <button className="admin-sidebar-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close admin navigation">x</button>
        <img src="/assets/img/logo-white-transparent.png" alt="Chapel Hill Denham" />
        {adminNav.map(item => (
          <NavLink key={item.to} to={item.to} end={item.end}>
            {item.label}
          </NavLink>
        ))}
        <NavLink to="/admin/login">Login Preview</NavLink>
        <NavLink to="/">Public Portal</NavLink>
      </aside>
      <main className="admin-main">
        <div className="admin-top">
          <button className="admin-menu" type="button" onClick={() => setMenuOpen(true)}>Menu</button>
          <div>
            <p className="eyebrow">Staging back office</p>
            <h1>Research Administration</h1>
          </div>
          <span className="status-pill status-pending">Auth placeholder</span>
        </div>
        <Outlet />
      </main>
    </div>
  );
}

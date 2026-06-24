import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Icon from './Icon';

export default function Navigation() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isHome = location.pathname === '/';

  const navClass = isHome ? 'site-nav nav-transparent' : 'site-nav nav-solid';
  const logoSrc = isHome ? '/assets/img/logo-white-transparent.png' : '/assets/img/logo-navy-transparent.png';

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  return (
    <>
      <nav className={navClass} data-nav>
        <Link className="brand brand-lockup" to="/">
          <img data-logo src={logoSrc} alt="Chapel Hill Denham" />
        </Link>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/reports">Reports</Link>
          <Link to="/analytics">Data & Analytics</Link>
          <Link to="/analysts">Analysts</Link>
          <Link to="/price-lists">Price Lists</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        
        <Link className="btn btn-border nav-cta" to="/reports">EXPLORE RESEARCH</Link>
        
        <button 
          className="nav-toggle" 
          type="button" 
          aria-label="Open menu" 
          onClick={() => setIsDrawerOpen(true)}
        >
          <Icon name="menu" />
        </button>
      </nav>

      {isDrawerOpen && (
        <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}></div>
      )}
      <aside className={`mobile-drawer ${isDrawerOpen ? 'open' : ''}`} style={{ transform: isDrawerOpen ? 'translateX(0)' : 'translateX(100%)' }}>
        <button 
          className="drawer-close" 
          type="button" 
          aria-label="Close menu" 
          onClick={() => setIsDrawerOpen(false)}
        >
          x
        </button>
        <Link to="/">Home</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/analytics">Data & Analytics</Link>
        <Link to="/analysts">Analysts</Link>
        <Link to="/price-lists">Price Lists</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/reports">EXPLORE RESEARCH</Link>
      </aside>
    </>
  );
}

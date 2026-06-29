import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Icon from './Icon';

export default function Navigation() {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = location.pathname === '/';

  const navClass = `site-nav ${isHome && !scrolled ? 'nav-transparent' : 'nav-solid'} ${scrolled ? 'nav-scrolled' : ''}`;
  const logoSrc = isHome && !scrolled ? '/assets/img/logo-white-transparent.png' : '/assets/img/logo-navy-transparent.png';

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={navClass} data-nav>
        <Link className="brand brand-lockup" to="/">
          <img data-logo src={logoSrc} alt="Chapel Hill Denham" />
        </Link>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/reports">Reports</NavLink>
          <NavLink to="/analytics">Data & Analytics</NavLink>
          <NavLink to="/analysts">Analysts</NavLink>
          <NavLink to="/price-lists">Price Lists</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </div>
        
        {localStorage.getItem('chd_subscriber_auth') === 'true' ? (
          <button 
            className="btn btn-border nav-cta" 
            onClick={() => { localStorage.removeItem('chd_subscriber_auth'); window.location.href = '/login'; }}
          >
            SIGN OUT
          </button>
        ) : (
          <Link className="btn btn-navy nav-cta" to="/login">SIGN IN</Link>
        )}
        
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
          ×
        </button>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/reports">Reports</NavLink>
        <NavLink to="/analytics">Data & Analytics</NavLink>
        <NavLink to="/analysts">Analysts</NavLink>
        <NavLink to="/price-lists">Price Lists</NavLink>
        <NavLink to="/contact">Contact Us</NavLink>
      </aside>
    </>
  );
}

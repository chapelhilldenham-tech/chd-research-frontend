import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    document.body.className = 'theme-light';
    if (isHome) {
      document.body.setAttribute('data-has-hero', 'true');
    } else {
      document.body.removeAttribute('data-has-hero');
    }
  }, [isHome]);

  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

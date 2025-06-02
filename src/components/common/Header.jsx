import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Menu, X, AlertCircle, Server} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <Server className="nav-logo" />
          <span>WakeWeb</span>
        </Link>

      {/*<header className={`header ${scrolled ? 'header-scrolled' : ''}`}>*/}
      {/*  <div className="container header-container">*/}
      {/*    <Link to="/" className="logo" onClick={closeMobileMenu}>*/}
      {/*      <img src="/public/wake-web-logo.png" alt="WakeWeb Logo" className="logo-icon rounded-logo" />*/}
      {/*      <span>WakeWeb</span>*/}
      {/*    </Link>*/}

        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <nav className={`nav-menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          {isAuthenticated ? (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
              <button className="btn-logout" onClick={() => { logout(); closeMobileMenu(); }}>
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' && !location.hash ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Get Started
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
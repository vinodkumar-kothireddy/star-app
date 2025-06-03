import React, { useState, useEffect } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlHeader = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <header className={`header ${hideHeader ? 'header--hidden' : ''}`}>
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + '/images/logo.jpg'} className="logo-img" />
        <span className="logo-text">Star 2025</span>
      </div>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/AboutUs">About</Link>
        <a href="#committee">Committee</a>
        <a href="#faculty">Faculty</a>
        <a href="#abstract">Abstract</a>
        <Link to="/register">Register</Link>
      </nav>

      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        ☰
      </div>
    </header>
  );
};

export default Header;

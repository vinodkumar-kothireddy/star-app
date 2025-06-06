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

  const handleLinkClick = () => {
    setMenuOpen(false); // Close mobile menu after click
  };

  useEffect(() => {
    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, [lastScrollY]);

  return (
    <header className={`header ${hideHeader ? 'header--hidden' : ''}`}>
      <div className="logo-container">
        <img
          src={process.env.PUBLIC_URL + '/images/logo.jpg'}
          alt="Logo"
          className="logo-img"
        />
        <span className="logo-text">Star 2025</span>
      </div>

      <nav className={`nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/star-app/" onClick={handleLinkClick}>Home</Link>
        <Link to="/star-app/AboutUs" onClick={handleLinkClick}>About</Link>
        <a href="#committee" onClick={handleLinkClick}>Committee</a>
        <a href="#faculty" onClick={handleLinkClick}>Faculty</a>
        <Link to="/star-app/Abstract" onClick={handleLinkClick}>Abstract</Link>
        <Link to="/star-app/register" onClick={handleLinkClick}>Register</Link>
        <Link to="/star-app/ViewAbstracts" onClick={handleLinkClick}>ViewAbstracts</Link>
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

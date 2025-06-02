// src/components/NavBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/committee">Committee</Link></li>
        <li><Link to="/faculty">Faculty</Link></li>
        <li><Link to="/abstract">Abstract</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;

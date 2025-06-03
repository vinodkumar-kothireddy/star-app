import React from 'react';
import './HeroSection.css';

const HeroSection = () => (
  <section className="hero-banner">
    <img src={process.env.PUBLIC_URL + '/images/banner2.jpg'} alt="NEOCON 2025" className="banner-image" />
    <div className="banner-text">
    </div>
  </section>
);

export default HeroSection;

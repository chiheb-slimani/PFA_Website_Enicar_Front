import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-image-overlay"></div>
      <div className="hero-content">
        <h1>Nous vous souhaitons la bienvenue sur notre plateforme</h1>
        <p className="hero-subtitle">un outil dédié à rendre vos stages PFA plus accessibles et mieux organisés.</p>
        <Link to="/login" className="button cta-button">Commencer</Link>
      </div>
    </section>
  );
};

export default HeroSection;
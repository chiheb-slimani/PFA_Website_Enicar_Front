import React from 'react';
import '../Css/MainFooter.css';

const MainFooter = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <p>© 2025 ENICARTHAGE</p>
        <div className="footer-links">
          <a href="/privacy"> Politique de confidentialité</a>
          <a href="/terms">Conditions d'utilisations</a>
          <a href="/contact">Contactz nous</a>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
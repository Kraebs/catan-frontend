import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css'; 

const Footer = () => {
  const jahr = new Date().getFullYear();

  return (
    <footer className="catan-footer">
      <div>© {jahr}</div>
      <Link to="/kontakt" className="footer-link">Kontakt</Link>
      <Link to="/impressum" className="footer-link">Impressum</Link>
    </footer>
  );
};

export default Footer;

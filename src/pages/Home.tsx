import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuoteSection from '../components/Quote';

// Globale Styles importieren (z.B. einmal in App.tsx oder hier falls noch nicht)
import '../style.css';

// Spezifische Styles nur für Home
import '../styles/Home.css';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="home-main">
        <section className="hero-section">
          <picture>
            <source media="(max-width: 768px)" srcSet="/startseite_bild_mobile.png" />
            <img
              src="/startseite_bild.png"
              alt="Catan Startbild"
              className="hero-image"
              draggable={false}
            />
          </picture>
          <div className="hero-text-overlay">
            <h1>Willkommen im Catan Dashboard</h1>
            <p>Hier ist das Zuhause von Cataner in Opferbaum.</p>
          </div>
        </section>

        <QuoteSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;

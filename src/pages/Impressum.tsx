import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';

const Impressum: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container className="my-5" style={{ maxWidth: '800px' }}>
        <h2>Impressum</h2>
        <p>Angaben gemäß § 5 TMG (Telemediengesetz):</p>

        <p>
          <strong>Name:</strong><br />
          Tim Dees<br />
        </p>
        <p>
          <strong>Kontakt:</strong><br />
          E-Mail: tim.dees@web.de<br />
        </p>

        <p className="mt-4"><strong>Haftungsausschluss:</strong></p>
        <p>
          Diese Website dient ausschließlich privaten und nicht-kommerziellen Zwecken.
          Für die Inhalte externer Links wird keine Haftung übernommen.
          Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
        </p>

        <p className="mt-4"><strong>Urheberrecht:</strong></p>
        <p>
          Die Inhalte dieser Seite unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung
          und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
          des jeweiligen Autors bzw. Erstellers.
        </p>
      </Container>
      <Footer />
    </>
  );
};

export default Impressum;

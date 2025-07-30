import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Container, Button } from 'react-bootstrap';

const NotFound: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container className="text-center my-5">
        <h1 style={{ fontSize: '10rem', fontWeight: '900', lineHeight: 1 }}>404</h1>
        <p style={{ fontSize: '1.5rem' }}>
          Diese Seite gibt es leider nicht. Vielleicht hast du dich verklickt – oder der Räuber war am Werk?
        </p>
        <Button
          href="/"
          variant="danger"
          style={{ backgroundColor: 'var(--color-catan-rot)', border: 'none' }}
        >
          Zurück zur Startseite
        </Button>
      </Container>
      <Footer />
    </>
  );
};

export default NotFound;

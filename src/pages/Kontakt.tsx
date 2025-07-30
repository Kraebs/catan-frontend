import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Kontakt: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nachricht, setNachricht] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !nachricht) {
      setFeedback('Bitte alle Felder ausfüllen, damit wir dir antworten können.');
      return;
    }
    setFeedback(`Danke, ${name}! Deine Nachricht wurde erfolgreich gesendet.`);
    setName('');
    setEmail('');
    setNachricht('');
  };

  return (
    <>
      <Navbar />
      <div className="container my-5" style={{ maxWidth: 600 }}>
        <h2>Kontaktieren Sie uns</h2>
        <p>
          Haben Sie Fragen oder Anregungen?
        </p>
        <p>
          Wir freuen uns auf Ihr Feedback aus Catan!
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Ihr Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
              placeholder="Wie werden Sie in Catan angesprochen?"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-Mail Adresse</label>
            <input
              id="email"
              type="email"
              className="form-control"
              placeholder="Hier bitte Ihre catanische Mail eingeben"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="nachricht" className="form-label">Nachricht</label>
            <textarea
              id="nachricht"
              className="form-control"
              placeholder="Hier Ihre Nachricht eingeben..."
              rows={4}
              value={nachricht}
              onChange={(e) => setNachricht(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-danger">
            Nachricht absenden
          </button>
        </form>

        {feedback && (
          <div className="alert alert-info mt-4" role="alert">
            {feedback}
          </div>
        )}

        <hr />
        <p className="text-muted" style={{ fontStyle: 'italic' }}>
          Ihre Daten werden vertraulich behandelt und nicht an Barbaren oder Räuber weitergegeben.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default Kontakt;

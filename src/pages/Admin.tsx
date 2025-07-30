import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';

const Admin: React.FC = () => {
  const [name, setName] = useState('');
  const [spieler, setSpieler] = useState<string[]>([]);
  const [validierung, setValidierung] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const fetchPlayers = async () => {
    try {
      const res = await fetch(`${apiUrl}/spieler`);
      const data = await res.json();
      setSpieler(data);
    } catch (err) {
      setError('Fehler beim Laden der Spieler.');
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const isValid = validierung === 'Klaus Teuber' && name.trim() !== '';

  const handleAdd = async () => {
    setError(null);
    setSuccess(null);

    if (!isValid) {
      setError('Validierung fehlgeschlagen.');
      return;
    }

    try {
      const res = await fetch(`${apiUrl}/spieler`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (res.ok) {
        setSuccess(`Spieler "${name.trim()}" wurde hinzugefügt.`);
        setName('');
        setValidierung('');
        setTouched(false);
        fetchPlayers();
      } else {
        const errData = await res.json();
        setError(errData.error || 'Fehler beim Hinzufügen.');
      }
    } catch (err) {
      setError('Verbindung fehlgeschlagen.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: 500 }}>
        <h2 className="mb-4">Spieler verwalten</h2>

        <div className="mb-3">
          <label htmlFor="spielerName" className="form-label">Neuen Spieler hinzufügen:</label>
          <input
            id="spielerName"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Spielername"
          />
        </div>

        <div className="mb-3">
          <label className="form-label d-flex align-items-center gap-1" style={{ userSelect: 'none' }}>
            Validierung&nbsp;
            <OverlayTrigger
              placement="right"
              overlay={<Tooltip>Wer war die einflussreichste Person im 21. Jahrhundert?</Tooltip>}
            >
              <FaInfoCircle style={{ color: 'var(--color-catan-rot)', cursor: 'pointer' }} />
            </OverlayTrigger>
          </label>
          <input
            type="text"
            className={`form-control ${touched && validierung !== 'Klaus Teuber' ? 'is-invalid' : ''}`}
            value={validierung}
            onChange={(e) => setValidierung(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Antwort"
          />
          {touched && validierung !== 'Klaus Teuber' && (
            <div className="invalid-feedback">Antwort falsch</div>
          )}
        </div>

        <button
          className="btn"
          onClick={handleAdd}
          disabled={!isValid}
          style={{
            backgroundColor: 'var(--color-catan-rot)',
            color: 'var(--color-white)',
            border: 'none',
          }}
        >
          Spieler hinzufügen
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}

        <hr />
        <h5>Aktuelle Spieler:</h5>
        {spieler.length === 0 ? (
          <p className="text-muted">Keine Spieler vorhanden.</p>
        ) : (
          <ul
            className="list-group mb-5"
            style={{
              backgroundColor: 'var(--color-catan-rot)',
              borderRadius: '0.25rem',
              paddingLeft: 0,
              userSelect: 'none',
            }}
          >
            {spieler.map((s, index) => (
              <li
                key={s}
                className="list-group-item"
                style={{
                  backgroundColor: 'var(--color-catan-rot)',
                  color: 'var(--color-white)',
                  border: 'none',
                  borderBottom: index !== spieler.length - 1 ? '1px solid white' : 'none',
                }}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Admin;

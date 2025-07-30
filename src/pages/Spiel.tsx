import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  Form,
  Button,
  OverlayTrigger,
  Tooltip,
  Modal,
  Container,
} from 'react-bootstrap';
import { FaInfoCircle } from 'react-icons/fa';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Spiel: React.FC = () => {
  // Spieler aus DB laden
  const [allPlayers, setAllPlayers] = useState<string[]>([]);
  const [loadingPlayers, setLoadingPlayers] = useState<boolean>(true);
  const [playersError, setPlayersError] = useState<string | null>(null);

  const [spieler, setSpieler] = useState<string[]>(['', '', '', '']);
  const [dauer, setDauer] = useState<string>('');
  const [sieger, setSieger] = useState<string>('');
  const [punkte, setPunkte] = useState<string[]>(['', '', '', '']);
  const [validierung, setValidierung] = useState<string>('');
  const [formValid, setFormValid] = useState<boolean>(false);

  const [errors, setErrors] = useState<{
    spieler: string[];
    dauer: string;
    sieger: string;
    punkte: string[];
    validierung: string;
  }>({
    spieler: ['', '', '', ''],
    dauer: '',
    sieger: '',
    punkte: ['', '', '', ''],
    validierung: '',
  });

  const [touched, setTouched] = useState<{
    spieler: boolean[];
    dauer: boolean;
    sieger: boolean;
    punkte: boolean[];
    validierung: boolean;
  }>({
    spieler: [false, false, false, false],
    dauer: false,
    sieger: false,
    punkte: [false, false, false, false],
    validierung: false,
  });

  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    // Spieler vom Backend laden
    const fetchPlayers = async () => {
      try {
        setLoadingPlayers(true);
        const response = await fetch(`${apiUrl}/spieler`);
        if (!response.ok) throw new Error('Fehler beim Laden der Spieler');
        const data: string[] = await response.json();
        setAllPlayers(data);
      } catch (error: any) {
        setPlayersError(error.message || 'Unbekannter Fehler');
      } finally {
        setLoadingPlayers(false);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    validateForm();
  }, [spieler, dauer, sieger, punkte, validierung]);

  const handleSpielerChange = (index: number, value: string) => {
    const newSpieler = [...spieler];
    newSpieler[index] = value;
    setSpieler(newSpieler);
  };

  const handlePunkteChange = (index: number, value: string) => {
    const newPunkte = [...punkte];
    newPunkte[index] = value;
    setPunkte(newPunkte);
  };

  const validateForm = () => {
    const newErrors = {
      spieler: ['', '', '', ''],
      dauer: '',
      sieger: '',
      punkte: ['', '', '', ''],
      validierung: '',
    };

    const selectedSpieler = spieler.filter((s) => s);
    const spielerSet = new Set(selectedSpieler);

    if (spieler[0] === '') newErrors.spieler[0] = 'Pflichtfeld';
    if (spieler[1] === '') newErrors.spieler[1] = 'Pflichtfeld';
    if (spieler[2] === '') newErrors.spieler[2] = 'Pflichtfeld';

    if (spielerSet.size !== selectedSpieler.length) {
      selectedSpieler.forEach((sp, i) => {
        if (selectedSpieler.indexOf(sp) !== i) newErrors.spieler[i] = 'Spieler doppelt';
      });
    }

    if (!dauer || isNaN(Number(dauer)) || Number(dauer) <= 0) {
      newErrors.dauer = 'Gültige Zahl benötigt';
    }

    // Punkte validieren
    punkte.forEach((pkt, i) => {
      if (spieler[i]) {
        const num = Number(pkt);
        if (!pkt || isNaN(num) || num < 1 || num > 20 || !Number.isInteger(num)) {
          newErrors.punkte[i] = 'Zahl 1–20 erforderlich';
        }
      }
    });

    // Sieger validierung
    const siegerInSpieler = selectedSpieler.includes(sieger);
    if (!sieger || !siegerInSpieler) {
      newErrors.sieger = 'Sieger muss teilnehmen';
    } else {
      // Prüfe, ob Sieger auch die meisten Punkte hat
      const validPunkte = punkte
        .slice(0, selectedSpieler.length)
        .map((p) => Number(p));
      const maxPunkte = Math.max(...validPunkte);
      const siegerIndex = selectedSpieler.indexOf(sieger);
      if (validPunkte[siegerIndex] !== maxPunkte) {
        newErrors.sieger = 'Sieger muss die meisten Punkte haben';
      }
    }

    if (validierung !== 'Klaus Teuber') {
      newErrors.validierung = 'Antwort falsch';
    }

    setErrors(newErrors);

    const isValid =
      newErrors.spieler.every((e) => e === '') &&
      newErrors.dauer === '' &&
      newErrors.sieger === '' &&
      newErrors.punkte.every((e) => e === '') &&
      newErrors.validierung === '';

    setFormValid(isValid);
  };

  const resetForm = () => {
    setSpieler(['', '', '', '']);
    setDauer('');
    setSieger('');
    setPunkte(['', '', '', '']);
    setValidierung('');
    setErrors({
      spieler: ['', '', '', ''],
      dauer: '',
      sieger: '',
      punkte: ['', '', '', ''],
      validierung: '',
    });
    setTouched({
      spieler: [false, false, false, false],
      dauer: false,
      sieger: false,
      punkte: [false, false, false, false],
      validierung: false,
    });
    setFormValid(false);
  };

  const handleSubmit = async () => {
    validateForm();
    if (!formValid) return;

    const dataToSend = {
      spieler: spieler.filter((s) => s),
      dauer: Number(dauer),
      sieger,
      punkte: punkte
        .slice(0, spieler.filter((s) => s).length)
        .map((p) => Number(p)),
    };

    try {
      const response = await fetch(`${apiUrl}/spiele`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) throw new Error('Fehler beim Absenden');

      setShowPopup(true);
      resetForm();
    } catch (err: any) {
      alert('Fehler beim Absenden: ' + err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Container className="my-4" style={{ maxWidth: '700px' }}>
        <h2 className="text-center mb-4">Spiel eingeben</h2>

        {playersError && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            Fehler beim Laden der Spieler: {playersError}
          </div>
        )}

        <Form>
          {spieler.map((sp, i) => (
            <Form.Group key={i} className="mb-3">
              <Form.Label>
                Spieler {i + 1} {i < 3 ? '*' : ''}
              </Form.Label>
              <Form.Select
                value={sp}
                onChange={(e) => handleSpielerChange(i, e.target.value)}
                onBlur={() => {
                  const t = { ...touched };
                  t.spieler[i] = true;
                  setTouched(t);
                }}
                isInvalid={touched.spieler[i] && !!errors.spieler[i]}
                disabled={loadingPlayers}
              >
                <option value="">Bitte wählen</option>
                {allPlayers
                  .filter((p) => !spieler.includes(p) || p === sp)
                  .map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.spieler[i]}
              </Form.Control.Feedback>
            </Form.Group>
          ))}

          <Form.Group className="mb-3">
            <Form.Label>Dauer (in Minuten) *</Form.Label>
            <Form.Control
              type="number"
              value={dauer}
              onChange={(e) => setDauer(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, dauer: true }))}
              isInvalid={touched.dauer && !!errors.dauer}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dauer}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gewinner *</Form.Label>
            <Form.Select
              value={sieger}
              onChange={(e) => setSieger(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, sieger: true }))}
              isInvalid={touched.sieger && !!errors.sieger}
            >
              <option value="">Bitte wählen</option>
              {spieler
                .filter((s) => s)
                .map((sp) => (
                  <option key={sp} value={sp}>
                    {sp}
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.sieger}
            </Form.Control.Feedback>
          </Form.Group>

          {spieler.map(
            (sp, i) =>
              sp && (
                <Form.Group className="mb-3" key={i}>
                  <Form.Label>Punkte {sp}</Form.Label>
                  <Form.Control
                    type="number"
                    value={punkte[i]}
                    onChange={(e) => handlePunkteChange(i, e.target.value)}
                    onBlur={() => {
                      const t = { ...touched };
                      t.punkte[i] = true;
                      setTouched(t);
                    }}
                    isInvalid={touched.punkte[i] && !!errors.punkte[i]}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.punkte[i]}
                  </Form.Control.Feedback>
                </Form.Group>
              )
          )}

          <Form.Group className="mb-3">
            <Form.Label>
              Validierung *{' '}
              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip>
                    Wer war die einflussreichste Person im 21. Jahrhundert?
                  </Tooltip>
                }
              >
                <FaInfoCircle
                  size={18}
                  className="ms-1"
                  style={{ color: 'var(--color-catan-rot)', cursor: 'pointer' }}
                />
              </OverlayTrigger>
            </Form.Label>
            <Form.Control
              type="text"
              value={validierung}
              onChange={(e) => setValidierung(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, validierung: true }))}
              isInvalid={touched.validierung && !!errors.validierung}
            />
            <Form.Control.Feedback type="invalid">
              {errors.validierung}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
          disabled={!formValid}
          onClick={handleSubmit}
          className="mb-5"
          variant="danger"
          style={{ backgroundColor: 'var(--color-catan-rot)', border: 'none' }}
        >
          Spiel eintragen
        </Button>

        </Form>

        <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
  <Modal.Header closeButton style={{ backgroundColor: '#FEEC81' }} />
  <Modal.Body className="text-center" style={{ backgroundColor: '#FEEC81' }}>
    <h5>Klaus Teuber ist stolz auf dich!</h5>
    <img
      src="/pop_up_bild.png"
      alt="Pop Up"
      style={{ width: '100%', height: 'auto' }}
    />
  </Modal.Body>
  <Modal.Footer className="justify-content-center" style={{ backgroundColor: '#FEEC81' }}>
    <Button variant="danger" onClick={() => setShowPopup(false)}>
      Weiter
    </Button>
  </Modal.Footer>
</Modal>

      </Container>
      <Footer />
    </>
  );
};

export default Spiel;

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { berechneLeaderboard } from '../utils/ratingUtils';
import type { SpielerStats } from '../utils/ratingUtils';
import '../styles/Tabelle.css'; // Dein individuelles Stylefile

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

type Spiel = {
  id: number;
  datum: string;
  dauer: number;
  spieler1: string;
  spieler2: string;
  spieler3: string;
  spieler4?: string | null;
  sieger: string;
  punkte1: number;
  punkte2: number;
  punkte3: number;
  punkte4?: number | null;
};

const ITEMS_PER_PAGE = 5;

const Tabelle = () => {
  const [spiele, setSpiele] = useState<Spiel[]>([]);
  const [leaderboard, setLeaderboard] = useState<SpielerStats[]>([]);
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'spiele'>('leaderboard');
  const [leaderboardPage, setLeaderboardPage] = useState(1);
  const [spielePage, setSpielePage] = useState(1);

  useEffect(() => {
    fetch(`${apiUrl}/spiele`)
      .then((res) => res.json())
      .then((data: Spiel[]) => {
        setSpiele(data);
        setLeaderboard(berechneLeaderboard(data));
      })
      .catch((err) => console.error('Fehler beim Laden der Spiele:', err));
  }, []);

  const paginatedLeaderboard = leaderboard.slice(
    (leaderboardPage - 1) * ITEMS_PER_PAGE,
    leaderboardPage * ITEMS_PER_PAGE
  );

  const paginatedSpiele = spiele.slice(
    (spielePage - 1) * ITEMS_PER_PAGE,
    spielePage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: 'var(--color-catan-yellow)', minHeight: '100vh' }}>
        <div className="container py-5">

          {/* Tabs */}
          <div className="tab-buttons">
  <button
    className={`tab-button ${activeTab === 'leaderboard' ? 'active' : ''}`}
    onClick={() => setActiveTab('leaderboard')}
  >
    🏆 Leaderboard
  </button>
  <button
    className={`tab-button ${activeTab === 'spiele' ? 'active' : ''}`}
    onClick={() => setActiveTab('spiele')}
  >
    📜 Vergangene Spiele
  </button>
</div>


          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <>
              <div className="table-responsive mb-3">
                <table className="table table-bordered table-hover shadow rounded-3 overflow-hidden">
                  <thead>
                    <tr>
                      <th>Platz</th>
                      <th>Spieler</th>
                      <th>ELO</th>
                      <th>Spiele</th>
                      <th>Siege</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLeaderboard.map((spieler, index) => (
                      <tr key={spieler.name}>
                        <td>{(leaderboardPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td>{spieler.name}</td>
                        <td>{Math.round(spieler.elo)}</td>
                        <td>{spieler.spiele}</td>
                        <td>{spieler.siege}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Leaderboard */}
              <div className="d-flex justify-content-center mb-5">
                <button
                  className="btn btn-outline-dark me-2"
                  onClick={() => setLeaderboardPage((p) => Math.max(1, p - 1))}
                  disabled={leaderboardPage === 1}
                >
                  Zurück
                </button>
                <span className="align-self-center">
                  Seite {leaderboardPage} von {Math.ceil(leaderboard.length / ITEMS_PER_PAGE)}
                </span>
                <button
                  className="btn btn-outline-dark ms-2"
                  onClick={() =>
                    setLeaderboardPage((p) =>
                      p < Math.ceil(leaderboard.length / ITEMS_PER_PAGE) ? p + 1 : p
                    )
                  }
                  disabled={leaderboardPage >= Math.ceil(leaderboard.length / ITEMS_PER_PAGE)}
                >
                  Weiter
                </button>
              </div>
            </>
          )}

          {/* Spiele Tab */}
          {activeTab === 'spiele' && (
            <>
              <div className="table-responsive mb-3">
                <table className="table table-bordered table-hover shadow rounded-3 overflow-hidden">
                  <thead>
                    <tr>
                      <th>Datum</th>
                      <th>Spielzeit</th>
                      <th>Spieler 1</th>
                      <th>Spieler 2</th>
                      <th>Spieler 3</th>
                      <th>Spieler 4</th>
                      <th>Gewinner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedSpiele.map((s) => (
                      <tr key={s.id}>
                        <td>{new Date(s.datum).toLocaleDateString()}</td>
                        <td>{s.dauer} min</td>
                        <td>{s.spieler1}</td>
                        <td>{s.spieler2}</td>
                        <td>{s.spieler3}</td>
                        <td>{s.spieler4 || ''}</td>
                        <td>
                          <span className="badge bg-success">{s.sieger}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Spiele */}
              <div className="d-flex justify-content-center mb-5">
                <button
                  className="btn btn-outline-dark me-2"
                  onClick={() => setSpielePage((p) => Math.max(1, p - 1))}
                  disabled={spielePage === 1}
                >
                  Zurück
                </button>
                <span className="align-self-center">
                  Seite {spielePage} von {Math.ceil(spiele.length / ITEMS_PER_PAGE)}
                </span>
                <button
                  className="btn btn-outline-dark ms-2"
                  onClick={() =>
                    setSpielePage((p) =>
                      p < Math.ceil(spiele.length / ITEMS_PER_PAGE) ? p + 1 : p
                    )
                  }
                  disabled={spielePage >= Math.ceil(spiele.length / ITEMS_PER_PAGE)}
                >
                  Weiter
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Tabelle;

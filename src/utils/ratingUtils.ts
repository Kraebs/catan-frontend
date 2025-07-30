export type SpielerStats = {
  name: string;
  elo: number;
  spiele: number;
  siege: number;
  unentschieden: number;
  niederlagen: number;
};

export type Spiel = {
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

const START_ELO = 1500;
const K = 32;

function erwarteteWahrscheinlichkeit(ratingA: number, ratingB: number) {
  return 1 / (1 + Math.pow(10, (ratingB - ratingA) / 400));
}

function berechneElo(eloA: number, eloB: number, scoreA: number): [number, number] {
  const erwarteteA = erwarteteWahrscheinlichkeit(eloA, eloB);
  const erwarteteB = erwarteteWahrscheinlichkeit(eloB, eloA);

  const neuerEloA = eloA + K * (scoreA - erwarteteA);
  const neuerEloB = eloB + K * ((1 - scoreA) - erwarteteB);

  return [neuerEloA, neuerEloB];
}

export function berechneLeaderboard(spiele: Spiel[]): SpielerStats[] {
  const stats: Record<string, SpielerStats> = {};

  function initSpieler(name: string) {
    if (!stats[name]) {
      stats[name] = {
        name,
        elo: START_ELO,
        spiele: 0,
        siege: 0,
        unentschieden: 0,
        niederlagen: 0,
      };
    }
  }

  for (const spiel of spiele) {
    const spieler = [
      { name: spiel.spieler1, punkte: spiel.punkte1 },
      { name: spiel.spieler2, punkte: spiel.punkte2 },
      { name: spiel.spieler3, punkte: spiel.punkte3 },
    ];

    if (spiel.spieler4) {
      spieler.push({ name: spiel.spieler4, punkte: spiel.punkte4 ?? 0 });
    }

    // Spieler initialisieren & Spiele zählen (1 Spiel pro Spieler)
    for (const p of spieler) {
      initSpieler(p.name);
      stats[p.name].spiele++;
    }

    // Gewinner-Name aus dem Spiel
    const gewinner = spiel.sieger;

    // Siege/Niederlagen/Unentschieden für jeden Spieler pro Spiel
    for (const p of spieler) {
      if (p.name === gewinner) {
        stats[p.name].siege++;
      } else if (
        // Unentschieden, falls Punkte gleich Gewinner Punkte aber Name nicht Sieger
        p.punkte === spieler.find(s => s.name === gewinner)?.punkte
      ) {
        stats[p.name].unentschieden++;
      } else {
        stats[p.name].niederlagen++;
      }
    }

    // ELO Updates — paarweise unter Spielern im Spiel
    for (let i = 0; i < spieler.length; i++) {
      for (let j = i + 1; j < spieler.length; j++) {
        const a = spieler[i];
        const b = spieler[j];

        // Ergebnis für Spieler a gegen b
        let scoreA = 0.5;
        if (a.punkte > b.punkte) scoreA = 1;
        else if (a.punkte < b.punkte) scoreA = 0;

        const [neuerEloA, neuerEloB] = berechneElo(stats[a.name].elo, stats[b.name].elo, scoreA);
        stats[a.name].elo = neuerEloA;
        stats[b.name].elo = neuerEloB;
      }
    }
  }

  return Object.values(stats).sort((a, b) => b.elo - a.elo);
}

// src/types/spiel.ts

export type Spiel = {
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

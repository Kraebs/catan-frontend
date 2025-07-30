// src/utils/api.ts
export async function fetchSpielStatistiken() {
  try {
    const res = await fetch('http://localhost:4000/statistiken'); // z.B. deine API-Route
    if (!res.ok) throw new Error('Fehler beim Laden der Statistiken');
    const data = await res.json();
    return data; // z.B. { spieleImLetztenMonat: number, minutenGespielt: number }
  } catch (error) {
    console.error(error);
    return { spieleImLetztenMonat: 0, minutenGespielt: 0 };
  }
}

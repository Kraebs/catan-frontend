# Catan Frontend

Dieses Projekt ist das Frontend für die Catan-App, basierend auf React und Vite.

## Installation

1. Repository klonen:

```bash
git clone <dein-repo-url>
cd <dein-frontend-ordner>
````

2. Abhängigkeiten installieren:

```bash
npm install
```

## Entwicklung starten

```bash
npm run dev
```

Der Entwicklungsserver läuft dann unter [http://localhost:5173](http://localhost:5173).

## Build

Um eine Produktionsversion zu erstellen, nutze:

```bash
npm run build
```

Die gebauten Dateien findest du im Ordner `dist`.

## Deployment

Im Build-Prozess wird das Frontend für die Produktion optimiert. Stelle sicher, dass in der `.env` Datei die Variable `VITE_API_URL` auf die Backend-URL zeigt, z.B.:

```
VITE_API_URL=https://the-catan-backend.onrender.com
```

## .gitignore

Empfohlene Einträge für `.gitignore`:

```
node_modules/
dist/
.env
```

---

Viel Spaß beim Catan spielen! 🎲

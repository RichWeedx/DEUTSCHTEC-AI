# DeutschTec AI

A future landscape web experience for DeutschTec AI.

The first Deutschtec landing experience is served as a lightweight Vite app from the root `index.html`.

## Structure

- `index.html` - page markup and the existing inline style system, preserved to keep the visual cascade stable.
- `src/app.js` - page interactions: placeholder animation, mode picker, language picker, pricing selection, section ordering, and reveal observers.
- `public/` - wordmark, flags, model logos, and studio icons served as static assets.
- `assets/` - source design references and palette documentation.

## Planned Structure

- `src/` - website source files
- `public/` - static assets served as-is
- `assets/` - source design and media assets

## Getting Started

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173/`.

## Deployment

The intended destination is GitHub Pages or another static hosting provider. Add the deployment workflow after the site build process is established.

# ESAIL website

This is a simple static website for the European Association for AI Literacy Research (ESAIL), designed to be hosted on GitHub Pages.

## Files

- `index.html` — the single-page landing page
- `styles.css` — page styling and responsive layout
- `script.js` — small enhancement for the footer year and language handling
- `locales/en.json` — English copy for a language-ready structure that can be extended easily

## Localisation approach

The site is built to support easy translation without a build step or backend. Text content is stored in JSON locale files and loaded by the browser. This keeps the site suitable for GitHub Pages while making it simple to add other languages later.

## Local preview

From the project root, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in a browser.

## GitHub Pages

If you publish the repository on GitHub, GitHub Pages can serve the site directly from the root of the repository using the default branch.

# AGENTS.md

## Project Overview

DOLZ — a static website showcasing web templates and digital applications. Deployed to **GitHub Pages** on push to `main`.

## Structure

- `/index.html` — Landing page (hub for all templates)
- `/script.js` — Template & system card data arrays + rendering logic
- `/style.css` — All styles (CSS custom properties, dark theme vars)
- `/assets/` — SVG thumbnails for cards
- `/apps/klik-oyen/` — Self-contained cat-tap game (inline CSS+JS, Malay UI)
- `/apps/dolz-master-prompt/` — Self-contained prompt library app (inline CSS+JS, localStorage persist)
- `/.github/workflows/pages.yml` — Deploys entire repo root to GitHub Pages

## Key Facts

- **No build step.** No package.json, no bundler, no transpiler. Open `index.html` directly or serve statically.
- **No lint, format, or typecheck** tools are configured. There are none to run.
- **No tests.** The project has zero test infrastructure.
- **`.gitignore` uses a whitelist.** Only the listed files are tracked. If you add new files, they must be explicitly un-ignored in `.gitignore`.
- `kids-learning-app/` exists on disk but is **not tracked** by this repo's git — it's a separate project.
- Sub-apps (`apps/`) are fully self-contained single HTML files with inline `<style>` and `<script>`. They do not share CSS/JS with the root site.

## Adding a New Template or System

Edit the `templates` or `systems` array in `script.js`. Each entry needs: `id`, `name`, `description`, `category`, `thumbnail` (path under `assets/`), `url`, `status`, `tags`. Cards render automatically.

Valid `status` values: `"New"`, `"Available"`, `"Beta"`, `"Coming Soon"`.

## Deployment

Push to `main` triggers GitHub Pages deployment. The workflow uploads the repo root as-is — no build step, no artifact processing.

## Gotchas

- The `apps/klik-oyen` game UI is in **Bahasa Melayu** (Malay), not English.
- `style.css` uses CSS custom properties (design tokens) defined in `:root` — edit those for theme changes, not individual values.
- Both `script.js` arrays (`templates`, `systems`) use the same `createCard()` function. If you change card rendering, it affects both sections.

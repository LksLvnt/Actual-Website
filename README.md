# LOKOS LEVENTE — Portfolio

Personal portfolio site. Street/skate aesthetic, dark theme, neon accents.

## Stack

Frontend: Astro + Tailwind CSS.
Backend: Express + SQLite (`server/` folder) for projects API, translations, and contact form.

## What's in here

```
src/
  pages/index.astro     – main page
  layouts/Base.astro    – base HTML layout
  components/           – Nav, Hero, Quote, About, TechStack, Hobbies, Projects, Contact, Footer, SnakeGame
  scripts/main.ts       – i18n, API calls, contact form, gimmicks
  styles/global.css     – custom styles (cards, stickers, timeline, etc)
public/
  favicon.png           – site icon
  logo.svg              – logo
  CNAME                 – custom domain config
server/
  index.js              – Express API
  package.json          – backend dependencies
  data/                 – SQLite DB (auto-created)
  .env                  – email config (not in git)
```

## Running locally

Frontend:
```
npm install
npm run dev
```

Backend:
```
cd server
cp .env.example .env
npm install
npm run dev
```

## Deploy

`npm run build` outputs static files to `dist/`. Push to GitHub Pages.

## Easter eggs

- Triple-click the logo
- ↑↑↓↓←→←→BA

## TODO

- [x] Add actual projects to the work section
- [x] Wire up the contact form
- [x] Add EN/HU language switching
- [x] Migrate to Astro + Tailwind
- [ ] Deploy backend somewhere
- [ ] Project detail pages
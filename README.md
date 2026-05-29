# lokoslevente.com

Personal portfolio site built with Astro and Tailwind CSS.

## Tech Stack

- **Astro** — static site generator
- **Tailwind CSS** — utility-first styling
- **Lenis** — smooth scroll
- **Web3Forms** — contact form delivery
- **Playfair Display + Geist** — typography

## Project Structure

```
src/
├── components/
│   ├── Navbar.astro        — fixed nav, hamburger animation, lang toggle
│   ├── Hero.astro          — split hero with photo
│   ├── About.astro         — bio with background text effect
│   ├── Projects.astro      — project cards grid
│   ├── TechStack.astro     — languages / frameworks / tools
│   ├── Hobbies.astro       — hobby cards with Lucide SVG icons
│   ├── Timeline.astro      — career/education timeline
│   ├── Contact.astro       — contact form (Web3Forms)
│   └── Footer.astro        — social links, copyright
├── layouts/
│   └── Layout.astro        — base HTML layout
├── pages/
│   └── index.astro         — page assembly + client scripts
├── scripts/
│   └── i18n.ts             — EN/HU translations
├── styles/
│   └── global.css          — design tokens, component styles
└── public/
    └── hero.png            — hero photo
```

## Features

- Bilingual (EN/HU) with animated language switch
- Smooth scroll (Lenis)
- Scroll-aware navbar with blur backdrop
- Hamburger-to-X animation on mobile
- Scroll reveal animations
- Contact form sends emails via Web3Forms
- Fully responsive

## Setup

```bash
npm install
npx astro dev
```

## Build

```bash
npx astro build
```

## Contact Form

Get an access key from [web3forms.com](https://web3forms.com) and replace `YOUR_ACCESS_KEY_HERE` in `src/components/Contact.astro`.

## License

MIT
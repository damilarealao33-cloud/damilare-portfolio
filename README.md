# Damilare Alao — Web Developer Portfolio

A static, zero-build personal portfolio built with **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)** using a near-black and warm amber design system.

## Project Structure

```text
Damilare-portfolio/
├── index.html                  # Main single-page document & accessible modal
├── style.css                   # Entry stylesheet importing modular CSS layers
├── script.js                   # Navigation, scroll-spy, filters, modal, copy, scroll reveal
├── README.md                   # Project documentation
├── styles/
│   ├── tokens.css              # Design tokens (colors, typography, spacing, motion)
│   ├── base.css                # Reset, typography, focus-visible & skip-link utilities
│   ├── components.css          # Header, buttons, filters, project cards & dialog modal
│   ├── sections.css            # Hero, Work, Services, About, Contact, Footer & breakpoints
│   └── animations.css          # Keyframes, staggered reveal & prefers-reduced-motion
├── assets/
│   └── hero-sculpture.jpg      # 3D abstract metallic & glass hero sculpture
└── portfolio screenshot/       # Project preview screenshots
    ├── clothing-store.png
    ├── dluxe-affairs.png
    ├── frieslandcampinademo.png
    └── vai.png
```

## Features

- **Design System:** Near-black surfaces (`#09090b` / `#0e0e12` / `#141418`) with warm amber accents (`#f59e0b` / `#fbbf24`), `Manrope`, `Instrument Serif`, and `DM Mono`.
- **Interactive Project Showcase:** Category filtering (`All`, `Web App`, `WordPress`, `Demos`) and an accessible `<dialog>` project details modal.
- **Navigation & Scroll:** Sticky header with scroll elevation, active section scroll-spy, and responsive mobile drawer.
- **Accessibility:** Skip-to-content link, `:focus-visible` outlines, ARIA attributes, and `prefers-reduced-motion` support.

## Run Locally

Open the folder in VS Code and launch `index.html` with the **Live Server** extension, or serve the directory with any static file server:

```bash
npx serve .
```

## Deployment

This is a static website and can be hosted directly on **GitHub Pages**, **Netlify**, **Vercel**, or **Firebase Hosting**.

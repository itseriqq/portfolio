# ERICK.md

Portfolio as a scroll-driven short film, in the spirit of human-md.ai, but smaller.
A dark room, a lamp, a laptop, sticky notes. Scrolling plays the scene; the captions are the readme.

## Stack
- **Vite** (vanilla JS, no framework)
- **GSAP + ScrollTrigger**: one timeline, scrubbed by scroll
- **Lenis**: smooth scroll
- Illustration is **hand-written inline SVG** in `index.html`, every object is its own "puppet" group
- Fonts self-hosted via Fontsource: Fraunces, Space Grotesk, JetBrains Mono

## Language
EN and PT. The `EN · PT` button switches everything (film, captions, notes, plain text, the downloaded .md) without losing your place in the scroll.
First visit picks the browser language; the choice is saved. Links can force one: `?lang=pt` or `?lang=en`.

## Static files
Anything in `public/` is copied as-is to the build: the CV (`public/src/cv-erick-augusto.pdf`) and the old SaborBrasil site (`public/project-saborbrasil/`), so their URLs stay the same.

## Where things live
- `src/content.js`: all the text, in both languages, plus the sticky-note links. The film captions, the plain-text article, the side index and the downloadable `ERICK.md` come from here. Edit this to change content.
- `src/main.js`: the film. Each chapter is a block in the timeline (`marks.who`, `marks.does`...).
- `src/style.css`: layout, HUD, captions, grain.
- `index.html`: the SVG scene.

## Accessibility
The full text is always in the DOM as a semantic `<article>`. Screen readers read that; the film is `aria-hidden`.
With `prefers-reduced-motion`, visitors get only the plain page. "read as text" switches to it manually.

## Run
```bash
npm install
npm run dev      # local
npm run build    # -> dist/
```

## Deploy (GitHub Pages)
`.github/workflows/deploy.yml` builds and publishes on every push to `main`.
In the repo: Settings → Pages → Source: **GitHub Actions**. `base: './'` in `vite.config.js` makes it work under `/portfolio/`.

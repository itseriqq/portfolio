import '@fontsource-variable/fraunces';
import '@fontsource-variable/space-grotesk';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './style.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { LANGS, content, projectsFor, stack, toMarkdown } from './content.js';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const NS = 'http://www.w3.org/2000/svg';
// shrink an SVG <text> until it fits a width (labels differ in length per language)
const fit = (el, max, min = 8) => {
  let size = parseFloat(el.getAttribute('font-size'));
  while (el.getComputedTextLength() > max && size > min) el.setAttribute('font-size', (size -= 0.5));
};
const store = {
  get: () => { try { return localStorage.getItem('erick-md:lang'); } catch { return null; } },
  set: (v) => { try { localStorage.setItem('erick-md:lang', v); } catch { /* private mode */ } },
};

/* ------------------------------------------------------------------ *
 * language: ?lang=pt|en  >  saved choice  >  browser language
 * ------------------------------------------------------------------ */
const fromUrl = new URLSearchParams(location.search).get('lang');
let lang = LANGS.includes(fromUrl) ? fromUrl : LANGS.includes(store.get()) ? store.get() : navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const film = reduce.matches ? null : createFilm();
if (!film) document.documentElement.classList.add('no-motion');

let reading = false;
applyLanguage(lang);

$('#lang').addEventListener('click', () => {
  lang = lang === 'en' ? 'pt' : 'en';
  store.set(lang);
  applyLanguage(lang);
});

$('#download').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([toMarkdown(lang)], { type: 'text/markdown' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: content[lang].meta.file });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});

$('#toggle-read').addEventListener('click', () => {
  reading = document.documentElement.classList.toggle('is-reading');
  labelReadButton();
  film?.lenis.scrollTo(0, { immediate: true });
  if (!reading) ScrollTrigger.refresh();
});

reduce.addEventListener('change', () => location.reload());

function labelReadButton() {
  const { ui } = content[lang];
  $('#toggle-read').textContent = reading ? ui.watch : ui.read;
}

function applyLanguage(l) {
  const { ui, meta } = content[l];
  document.documentElement.lang = l === 'pt' ? 'pt-BR' : 'en';
  document.title = `${meta.file} — ${meta.name}`;
  $('meta[name="description"]').setAttribute('content', meta.description);
  $('#skip').textContent = ui.skip;
  $('#download').textContent = ui.download;
  $('#hint-t').textContent = ui.scroll;
  $$('#lang span').forEach((s) => s.classList.toggle('is-on', s.dataset.l === l));
  labelReadButton();
  renderArticle(l);
  film?.build(l);
}

/* ------------------------------------------------------------------ *
 * 1. the plain file (always in the DOM, for screen readers & no-motion)
 * ------------------------------------------------------------------ */
function renderArticle(l) {
  const { meta, chapters } = content[l];
  const read = $('#read');
  read.lang = document.documentElement.lang;
  read.innerHTML = `
    <header>
      <p class="by">${esc(meta.name.toUpperCase())} · ${meta.date}</p>
      <h1>${meta.file}</h1>
      <blockquote>${meta.tagline.map((t) => `<p>${esc(t)}</p>`).join('')}</blockquote>
    </header>
    ${chapters
      .map(
        (c) => `<section id="t-${c.id}">
          <h2>${esc(c.title)}</h2>
          ${c.lines.map((t) => `<p>${esc(t)}</p>`).join('')}
          ${c.links ? `<p>${c.links.map((k) => `<a href="${k.href}">${esc(k.label)}</a>`).join(' · ')}</p>` : ''}
        </section>`
      )
      .join('')}`;
}

/* ------------------------------------------------------------------ *
 * 2. the film
 * ------------------------------------------------------------------ */
function createFilm() {
  const svg = $('#scene');

  const chipsG = document.createElementNS(NS, 'g');
  chipsG.id = 'chips';
  chipsG.setAttribute('font-family', 'JetBrains Mono, monospace');
  svg.appendChild(chipsG);

  // Light sources live above the darkness layer, so they actually glow.
  ['#cone', '#pool', '#screen-glow', '#lid', '#bulb', '#city-lights', '#phone-light', '#wires', '#chips', '#notes', '#wire-labels'].forEach((id) =>
    svg.appendChild($(id))
  );

  // portrait screens: re-frame on the desk and the wall instead of the whole room
  const frame = () => {
    const portrait = innerWidth / innerHeight < 0.8;
    svg.setAttribute('viewBox', portrait ? '470 40 540 960' : '0 0 1600 1000');
    gsap.set(['#notes', '#wires', '#wire-labels', '#chips'], { scale: portrait ? 0.7 : 1, svgOrigin: '700 260' });
  };
  frame();
  addEventListener('resize', frame);

  /* ---- idle motion (always running, tiny) ---- */
  gsap.to('#leaves ellipse', { rotation: 3, svgOrigin: '1410 620', duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.3 });
  gsap.fromTo('#steam path', { y: 6, opacity: 0 }, { y: -14, opacity: 1, duration: 2.2, ease: 'sine.out', repeat: -1, stagger: 0.7, yoyo: true });
  gsap.to('#caret', { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: 'steps(1)' });
  gsap.set('#city-lights rect', { opacity: () => (Math.random() > 0.5 ? 1 : 0.2) });
  gsap.to('#city-lights rect', { opacity: 0.15, duration: 1.4, repeat: -1, yoyo: true, stagger: { each: 0.6, from: 'random' }, ease: 'steps(1)' });

  /* ---- smooth scroll ---- */
  const lenis = new Lenis({ lerp: 0.09 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // sticky note geometry (viewBox units)
  const W = 165, H = 120;
  const colors = ['#ffd2a8', '#f4e27a', '#b9e3c6', '#f6b5a0', '#bcd0ff', '#e0c9f5'];
  const pad = { x: 380, y: 601, scale: 0.55, rotation: 0 }; // lies flat on the notepad
  const wall = [
    { x: 470, y: 150, rotation: -5 }, { x: 690, y: 125, rotation: 4 }, { x: 890, y: 170, rotation: -3 },
    { x: 520, y: 320, rotation: 5 }, { x: 735, y: 300, rotation: -4 }, { x: 905, y: 345, rotation: 3 },
  ];
  const grid = [
    { x: 460, y: 140 }, { x: 675, y: 140 }, { x: 890, y: 140 },
    { x: 460, y: 320 }, { x: 675, y: 320 }, { x: 890, y: 320 },
  ].map((g) => ({ ...g, rotation: 0 }));

  let tl, st, hud, indexHandler;

  /* Everything with words in it is (re)built per language. Switching languages
     rewinds the old timeline (so every object returns to its first frame),
     throws it away, builds a new one and lands on the same scroll position. */
  function build(l) {
    const { ui, meta, chapters } = content[l];
    const progress = st ? st.progress : 0;
    if (tl) { tl.progress(0); tl.kill(); st.kill(); hud.kill(); }

    /* ---- captions ---- */
    const words = (t) => esc(t).split(' ').map((w) => `<span class="w">${w}</span>`).join(' ');
    $('#caps').innerHTML =
      `<div class="cap cap--intro" data-id="intro">
        <h1>ERICK<em>.md</em></h1>
        ${meta.tagline.map((t) => `<p>${esc(t)}</p>`).join('')}
      </div>` +
      chapters
        .map(
          (c) => `<div class="cap" data-id="${c.id}">
            <h2>${esc(c.title)}</h2>
            ${(c.cap || c.lines).map((t) => `<p>${words(t)}</p>`).join('')}
            ${c.links ? `<div class="links">${c.links.map((k) => `<a href="${k.href}" target="_blank" rel="noopener">${esc(k.label)}</a>`).join('')}</div>` : ''}
          </div>`
        )
        .join('');

    /* ---- wire labels ---- */
    const [w1, w2, w3, w4] = ui.wires;
    $('#wire-labels').innerHTML = `
      <text x="650" y="190">${w1}</text><text x="865" y="190">${w2}</text>
      <text x="650" y="370">${w3}</text><text x="865" y="370">${w4}</text>
      <text x="460" y="118" text-anchor="start">${esc(ui.system)}</text>`;

    /* ---- sticky notes (each one a puppet) ---- */
    const notesG = $('#notes');
    notesG.innerHTML = '';
    const notes = projectsFor(l).map((p, i) => {
      const a = document.createElementNS(NS, 'a');
      a.setAttribute('href', p.href);
      a.setAttribute('target', '_blank');
      a.innerHTML = `
        <g class="note">
          <rect class="note-paper" width="${W}" height="${H}" rx="3" fill="${colors[i]}" />
          <rect x="${W / 2 - 22}" y="-8" width="44" height="16" fill="#efe7d8" opacity=".55" />
          <text x="14" y="42" font-size="18" font-weight="500" fill="#17181d">${esc(p.name)}</text>
          <text x="14" y="66" font-size="10" fill="#17181d" opacity=".72">${esc(p.tag)}</text>
          <text x="14" y="${H - 14}" font-size="11" fill="#17181d" opacity=".55">${esc(ui.open)}</text>
        </g>`;
      notesG.appendChild(a);
      $$('text', a).forEach((t) => fit(t, W - 26));
      return a.firstElementChild;
    });
    notes.forEach((n) => gsap.set(n, { ...pad, opacity: 0, transformOrigin: '50% 50%' }));

    /* ---- stack chips, flowed onto the wall group by group ---- */
    const stackCh = chapters.find((c) => c.id === 'stack');
    const chipColors = { front: '#bcd0ff', back: '#b9e3c6', data: '#f4e27a', cloud: '#ffd2a8' };
    chipsG.innerHTML = '';
    const chips = [];
    const X0 = 460, X1 = 1055, CH = 26, GAP = 8;
    let y = 118;
    for (const g of stack) {
      const head = document.createElementNS(NS, 'text');
      Object.entries({ x: X0, y: y + 12, 'font-size': 11, fill: '#d7ff3a' }).forEach(([k, v]) => head.setAttribute(k, v));
      head.textContent = `// ${stackCh.groups[g.id]}`;
      chipsG.appendChild(head);
      chips.push(head);
      y += 22;
      let x = X0;
      for (const item of g.items) {
        const c = document.createElementNS(NS, 'g');
        c.innerHTML = `<rect height="${CH}" rx="${CH / 2}" fill="${chipColors[g.id]}" /><text x="11" y="17" font-size="12" fill="#17181d">${esc(item)}</text>`;
        chipsG.appendChild(c);
        const w = c.querySelector('text').getComputedTextLength() + 22;
        c.querySelector('rect').setAttribute('width', w);
        if (x + w > X1) { x = X0; y += CH + GAP; }
        gsap.set(c, { x, y, transformOrigin: '50% 50%' });
        x += w + GAP;
        chips.push(c);
      }
      y += CH + 16;
    }
    gsap.set(chips, { opacity: 0, scale: 0.4 });

    /* ---- the scroll timeline ---- */
    const wires = $$('.wire');
    const solid = wires.filter((p) => !p.hasAttribute('stroke-dasharray'));
    solid.forEach((p) => { const len = p.getTotalLength(); gsap.set(p, { strokeDasharray: len, strokeDashoffset: len }); });
    gsap.set(wires, { opacity: 0 });
    gsap.set('#lid', { scaleY: 0.04, svgOrigin: '760 690' });
    gsap.set('#code rect:not(#caret)', { scaleX: 0, transformOrigin: '0% 50%' });

    const capEl = (id) => $(`.cap[data-id="${id}"]`);
    tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } });
    const marks = {};
    const showCap = (id, at) => {
      const el = capEl(id);
      tl.fromTo(el, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power3.out' }, at);
      const w = $$('.w', el);
      if (w.length) tl.fromTo(w, { opacity: 0.15 }, { opacity: 1, stagger: 0.01, duration: 0.1 }, at + 0.05);
    };
    const hideCap = (id, at) => tl.to(capEl(id), { autoAlpha: 0, y: -16, duration: 0.2, ease: 'power2.in' }, at);

    // 0 · intro: a dark room
    marks.intro = 0;
    tl.fromTo(capEl('intro'), { autoAlpha: 1 }, { autoAlpha: 1, duration: 0.01 }, 0);
    tl.fromTo('#hint', { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.15 }, 0.1);
    hideCap('intro', 0.7);

    // 1 · who: the lamp clicks on
    marks.who = 1;
    tl.fromTo('#bulb', { opacity: 0.08 }, { opacity: 1, duration: 0.05, ease: 'none' }, 1)
      .to('#bulb', { opacity: 0.3, duration: 0.03, ease: 'none' }, 1.06)
      .to('#bulb', { opacity: 1, duration: 0.03, ease: 'none' }, 1.1)
      .fromTo(['#cone', '#pool'], { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.1)
      .fromTo('#dark', { opacity: 0.86 }, { opacity: 0.5, duration: 0.3 }, 1.1);
    showCap('who', 1.05);
    hideCap('who', 1.8);

    // 2 · what I do: the laptop opens, code types itself
    marks.does = 2;
    tl.to('#lid', { scaleY: 1, duration: 0.35, ease: 'back.out(1.4)' }, 2)
      .fromTo('#screen-glow', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 2.2)
      .to('#code rect:not(#caret)', { scaleX: 1, stagger: 0.05, duration: 0.08, ease: 'none' }, 2.25);
    showCap('does', 2.05);
    hideCap('does', 2.8);

    // 3 · stack: the tools pop onto the wall, then get packed into the laptop
    marks.stack = 3;
    tl.to(chips, { opacity: 1, scale: 1, duration: 0.12, stagger: 0.012, ease: 'back.out(2)' }, 3.05);
    tl.to(chips, { opacity: 0, scale: 0.2, y: 600, duration: 0.2, stagger: { each: 0.006, from: 'end' }, ease: 'power2.in' }, 3.8);
    showCap('stack', 3.05);
    hideCap('stack', 3.8);

    // 4 · where I worked: notes peel off the pad and get pinned to the wall
    marks.built = 4.0;
    notes.forEach((n, i) => {
      const t = 4 + i * 0.1;
      tl.set(n, { opacity: 1 }, t).to(
        n,
        { keyframes: [
          { y: 560, scale: 0.8, rotation: wall[i].rotation * -2, duration: 0.12, ease: 'power2.out' },
          { ...wall[i], scale: 1, duration: 0.2, ease: 'back.out(1.6)' },
        ] },
        t
      );
    });
    showCap('built', 4.05);
    hideCap('built', 5.05);

    // 5 · how I work: the notes become one system; dawn comes up
    marks.next = 5.3;
    notes.forEach((n, i) => tl.to(n, { ...grid[i], duration: 0.3, ease: 'power3.inOut' }, 5.3 + i * 0.03));
    tl.to(wires, { opacity: 1, duration: 0.01 }, 5.6)
      .to(solid, { strokeDashoffset: 0, duration: 0.3, stagger: 0.05, ease: 'none' }, 5.6)
      .fromTo('#wire-labels', { opacity: 0 }, { opacity: 1, duration: 0.2 }, 5.9)
      .fromTo('#dawn', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'none' }, 5.5)
      .fromTo('#sun', { opacity: 0, attr: { cy: 560 } }, { opacity: 1, attr: { cy: 400 }, duration: 0.9, ease: 'none' }, 5.5)
      .fromTo('#city-lights', { opacity: 1 }, { opacity: 0, duration: 0.5 }, 5.8)
      .to('#dark', { opacity: 0.12, duration: 0.8, ease: 'none' }, 5.5)
      .to(['#cone', '#pool'], { opacity: 0.35, duration: 0.5 }, 5.8);
    showCap('next', 5.35);
    hideCap('next', 6.3);

    // 6 · say hi: the phone lights up
    marks.hello = 6.5;
    tl.fromTo('#phone-light', { opacity: 0 }, { opacity: 1, duration: 0.05, repeat: 3, yoyo: true, ease: 'steps(1)' }, 6.5)
      .to('#phone-light', { opacity: 1, duration: 0.05 }, 6.75)
      .to('#phone', { y: -3, duration: 0.03, repeat: 5, yoyo: true, ease: 'none' }, 6.5)
      .to('#dark', { opacity: 0, duration: 0.3 }, 6.5);
    showCap('hello', 6.55);
    tl.to({}, { duration: 0.5 }, 7); // hold the last frame

    st = ScrollTrigger.create({ trigger: '#scroll', start: 'top top', end: 'bottom bottom', animation: tl, scrub: 0.8 });
    tl.progress(progress); // land on the same frame after a language switch

    /* ---- HUD: line counter + index ---- */
    const totalLines = toMarkdown(l).split('\n').length;
    const ids = Object.keys(marks);
    const index = $('#index');
    index.innerHTML = ids
      .map((id) => `<button type="button" data-id="${id}"><span>${esc(id === 'intro' ? ui.top : chapters.find((c) => c.id === id).title)}</span></button>`)
      .join('');
    const toScroll = (t) => st.start + (t / tl.duration()) * (st.end - st.start);
    if (indexHandler) index.removeEventListener('click', indexHandler);
    indexHandler = (e) => {
      const b = e.target.closest('button');
      if (b) lenis.scrollTo(toScroll(marks[b.dataset.id] + (b.dataset.id === 'intro' ? 0 : 0.45)), { duration: 1.6 });
    };
    index.addEventListener('click', indexHandler);

    const btns = $$('button', index);
    const paint = (p) => {
      $('#ln').textContent = `Ln ${Math.max(1, Math.round(p * totalLines))}/${totalLines}`;
      const t = p * tl.duration();
      let cur = ids[0];
      ids.forEach((id) => { if (t >= marks[id] - 0.05) cur = id; });
      btns.forEach((b) => b.classList.toggle('is-on', b.dataset.id === cur));
    };
    hud = ScrollTrigger.create({ trigger: '#scroll', start: 'top top', end: 'bottom bottom', onUpdate: (self) => paint(self.progress) });
    paint(progress);
  }

  return { build, lenis };
}

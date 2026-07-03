/* =========================================================
   Edwin Santos · Portfolio — Cinematic entrance
   First-visit splash, ambient hero particles, cursor-follow
   ambient orb, name scramble, role typewriter.

   Same fail-open philosophy as scroll-animations.js:
   - The splash is CSS-driven (html[data-splash] is set by a tiny
     inline <head> script BEFORE first paint). It animates itself
     out with pure CSS; the JS below only hard-removes the node as
     a safety net. If this file never runs, the splash still ends.
   - Text effects only REWRITE text that is already in the DOM.
     If they never run, the hero reads perfectly static.
   - The terminal "query result" reveal is pure CSS (see styles.css),
     no JS involved.
   - Everything respects prefers-reduced-motion and pointer type.

   Coordination with scroll-animations.js:
   - window.__introDelay  → seconds the hero timeline waits for the splash
   - window.__statReadyAt → performance.now() timestamp when hero stat
                            counters are allowed to start (script.js reads it)
   - window.__fx          → { scrambleName, typeRole } called by the GSAP
                            hero timeline at the right beats. If GSAP never
                            loads, a fallback below runs them standalone.
   ========================================================= */
(() => {
  'use strict';

  if (typeof window === 'undefined') return;

  const reduced     = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const hasSplash   = document.documentElement.hasAttribute('data-splash');

  // Seconds the hero choreography waits so it starts as the splash fades out.
  const INTRO_DELAY = (!reduced && hasSplash) ? 0.75 : 0;
  window.__introDelay = INTRO_DELAY;
  // Hero stat counters start when the stats row is revealed by the timeline
  // (intro delay + 1.9s beat). Under reduced motion they run immediately.
  window.__statReadyAt = reduced ? 0 : performance.now() + (INTRO_DELAY + 1.9) * 1000;

  /* -----------------------------------------------------
     Text FX — called by the GSAP hero timeline via window.__fx.
     Both are idempotent (dataset guard) and no-ops under
     reduced motion, so double-scheduling is harmless.
     ----------------------------------------------------- */

  // Name resolves from scrambled glyphs, left to right.
  function scrambleName() {
    const el = document.querySelector('.hero-name');
    if (!el || el.dataset.fxDone || reduced) return;
    el.dataset.fxDone = '1';

    const target = el.textContent;
    const glyphs = '█▓▒░<>/{}[]=+*#$%&';
    const DURATION = 900;
    const t0 = performance.now();
    let frame = 0;

    const tick = (now) => {
      const p = Math.min((now - t0) / DURATION, 1);
      if (p >= 1) { el.textContent = target; return; }
      const solved = Math.floor(p * target.length);
      let out = target.slice(0, solved);
      // Refresh the unsolved glyphs every other frame so they flicker
      // without strobing.
      for (let i = solved; i < target.length; i++) {
        const ch = target[i];
        out += ch === ' ' ? ' ' : glyphs[(Math.random() * glyphs.length) | 0];
      }
      if (frame % 2 === 0) el.textContent = out;
      frame++;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Role subtitle types on, span by span, with a blinking caret.
  function typeRole() {
    const role = document.querySelector('.hero-role');
    if (!role || role.dataset.fxDone || reduced) return;
    role.dataset.fxDone = '1';

    const spans = Array.from(role.children).filter(n => n.tagName === 'SPAN');
    if (!spans.length) return;
    const finals = spans.map(s => s.textContent);

    // Reserve the rendered height so clearing the text doesn't shift
    // the description/CTAs below while we type.
    role.style.minHeight = role.offsetHeight + 'px';
    spans.forEach(s => { s.textContent = ''; });

    const caret = document.createElement('span');
    caret.className = 'type-caret';
    caret.setAttribute('aria-hidden', 'true');

    let si = 0, ci = 0, done = false;
    const settle = () => {
      if (done) return;
      done = true;
      spans.forEach((s, i) => { s.textContent = finals[i]; });
      role.style.minHeight = '';
      // Let the caret blink a beat at the end, then clean up.
      setTimeout(() => caret.remove(), 1400);
    };

    // If the user flips language mid-type, resolve instantly so the
    // i18n pass in script.js writes onto settled text.
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) langBtn.addEventListener('click', settle, { once: true });

    const step = () => {
      if (done) return;
      if (si >= spans.length) { settle(); return; }
      const span = spans[si];
      if (caret.parentNode !== span) span.appendChild(caret);
      if (ci < finals[si].length) {
        caret.insertAdjacentText('beforebegin', finals[si][ci]);
        ci++;
        setTimeout(step, 18 + Math.random() * 22);
      } else {
        si++; ci = 0;
        setTimeout(step, 90);
      }
    };
    step();
  }

  window.__fx = { scrambleName, typeRole };

  /* -----------------------------------------------------
     Ambient particles — small accent-colored dots drifting
     inside the hero. Drift + fade-in are pure CSS; JS only
     seeds the random positions/speeds as custom properties.
     ----------------------------------------------------- */
  function initParticles() {
    const wrap = document.querySelector('.hero-particles');
    if (!wrap) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const count = isMobile ? 12 : 24;
    // indigo, purple, pink, sky — the brand accents at low alpha
    const colors = ['99 102 241', '168 85 247', '236 72 153', '14 165 233'];
    const frag = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const d = document.createElement('span');
      d.className = 'particle';
      const big = i % 7 === 0; // occasional larger, softer dot
      const size = big ? 6 + Math.random() * 3 : 2 + Math.random() * 3;
      d.style.setProperty('--p-rgb', colors[i % colors.length]);
      d.style.setProperty('--p-a', (big ? 0.18 : 0.3 + Math.random() * 0.3).toFixed(2));
      d.style.setProperty('--p-s', size.toFixed(1) + 'px');
      d.style.setProperty('--p-x', (Math.random() * 100).toFixed(2) + '%');
      d.style.setProperty('--p-y', (Math.random() * 100).toFixed(2) + '%');
      d.style.setProperty('--p-dx', ((Math.random() - 0.5) * 60).toFixed(0) + 'px');
      d.style.setProperty('--p-dy', (-(20 + Math.random() * 50)).toFixed(0) + 'px');
      d.style.setProperty('--p-dur', (9 + Math.random() * 12).toFixed(1) + 's');
      // negative delay → particles start mid-flight, not in unison
      d.style.setProperty('--p-del', (-(Math.random() * 20)).toFixed(1) + 's');
      if (big) d.style.filter = 'blur(1.5px)';
      frag.appendChild(d);
    }
    wrap.appendChild(frag);
  }

  /* -----------------------------------------------------
     Cursor-follow ambient orb — a soft blurred gradient that
     trails the pointer and swells over interactive elements.
     Desktop / fine pointer only; hidden in light theme (CSS).
     ----------------------------------------------------- */
  function initCursorOrb() {
    if (!finePointer) return;

    const orb = document.createElement('div');
    orb.className = 'cursor-orb';
    orb.setAttribute('aria-hidden', 'true');
    document.body.appendChild(orb);

    let tx = -600, ty = -600, x = tx, y = ty, raf = null;

    const step = () => {
      x += (tx - x) * 0.09;
      y += (ty - y) * 0.09;
      orb.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) {
        raf = requestAnimationFrame(step);
      } else {
        raf = null; // settled — stop ticking until the pointer moves again
      }
    };

    window.addEventListener('mousemove', (e) => {
      tx = e.clientX; ty = e.clientY;
      orb.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(step);
    }, { passive: true });

    document.addEventListener('mouseover', (e) => {
      const interactive = e.target.closest && e.target.closest('a, button, .btn, input, textarea, select, [role="button"]');
      orb.classList.toggle('is-grow', !!interactive);
    });

    document.documentElement.addEventListener('mouseleave', () => orb.classList.remove('is-on'));
  }

  /* -----------------------------------------------------
     Splash safety net — CSS animates it out on its own;
     this guarantees the node stops intercepting paint even
     if the CSS animation is interrupted.
     ----------------------------------------------------- */
  function cleanupSplash() {
    const splash = document.querySelector('.splash');
    if (!splash) return;
    // NOTE: html[data-splash] stays — styles.css keys the terminal-result
    // timing (--term-run) off it, and removing it mid-flight would retime
    // those CSS animations. Only the overlay node itself is removed.
    setTimeout(() => splash.remove(), hasSplash ? 1600 : 0);
  }

  const init = () => {
    cleanupSplash();
    if (reduced) return;
    initParticles();
    initCursorOrb();
    // Fallback: if GSAP/ScrollTrigger never load, the hero timeline never
    // calls the text FX — run them standalone so the hero still gets its
    // moment. Both are idempotent, so a double call is a no-op.
    setTimeout(() => {
      if (!window.gsap) { scrambleName(); typeRole(); }
    }, INTRO_DELAY * 1000 + 1400);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

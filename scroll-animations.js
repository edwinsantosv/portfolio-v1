/* =========================================================
   Edwin Santos · Portfolio — Apple-style scroll animations
   Powered by GSAP + ScrollTrigger (loaded via CDN in index.html)

   Design principles:
   - Fail-open: elements are visible by default (via CSS). GSAP only
     ENHANCES them. If GSAP fails to load, ScrollTrigger misfires,
     or the trigger point is off (e.g. iOS Safari address-bar dynamics),
     the text/UI still renders correctly — nothing stays hidden.
   - `immediateRender: false` on every ScrollTrigger-based .from() so the
     hidden state is only applied when the trigger actually fires.
   - `once: true` on every ScrollTrigger so we never revert on scroll up
     (Apple-style, and avoids double-animation edge cases).
   - Mobile bypass: complex/expensive effects (3D perspective, clip-path
     reveals, timeline SVG scrub) are skipped on <=768px viewports.
   ========================================================= */
(() => {
  'use strict';

  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const start = () => {
    if (!window.gsap || !window.ScrollTrigger) return; // CSS reveal fallback

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const intensity = isMobile ? 0.6 : 1;

    // Signal to CSS that GSAP took over and mark reveal items as "in" so their
    // resting state is opacity:1 / translateY(0). Any subsequent GSAP .from()
    // uses immediateRender:false, so nothing stays hidden if a trigger fails.
    document.documentElement.classList.add('gsap-ready');
    const revealItems = document.querySelectorAll('.reveal');
    revealItems.forEach(el => el.classList.add('in'));
    gsap.set(revealItems, { clearProps: 'transition,transform,opacity' });

    // Standard trigger config: fires early (element barely visible) + once only.
    const stCfg = (trigger, extras = {}) => ({
      trigger, start: 'top bottom-=50', once: true, ...extras,
    });

    // Shorthand for a fail-open scroll-in
    const revealIn = (target, fromProps, trigger) => gsap.from(target, {
      ...fromProps,
      immediateRender: false,
      scrollTrigger: stCfg(trigger || target),
    });

    /* -----------------------------------------------------
       Scroll progress bar
       ----------------------------------------------------- */
    const progress = document.querySelector('.scroll-progress');
    if (progress) {
      gsap.to(progress, {
        scaleX: 1, ease: 'none',
        scrollTrigger: {
          trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3,
        },
      });
    }

    /* -----------------------------------------------------
       HERO — entrance choreography (no ScrollTrigger, plays on load)
       ----------------------------------------------------- */
    const heroTL = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1 } });
    heroTL
      .from('.hero-badge',      { y: 24, opacity: 0 })
      .from('.hero-greet',      { y: 18, opacity: 0 }, '-=0.8')
      .from('.hero-name',       { y: 28, opacity: 0 }, '-=0.8')
      .from('.hero-role',       { y: 18, opacity: 0 }, '-=0.8')
      .from('.hero-desc',       { y: 16, opacity: 0 }, '-=0.75')
      .from('.hero-cta .btn',   { y: 16, opacity: 0, stagger: 0.1 }, '-=0.7')
      .from('.hero-stats .stat',{ y: 16, opacity: 0, scale: 0.92, stagger: 0.08 }, '-=0.55')
      .from('.terminal',        { y: 30, opacity: 0, scale: 0.97, duration: 1.1 }, '-=1.1')
      .from('.floating-card',   { scale: 0.5, opacity: 0, stagger: 0.15, duration: 0.8, ease: 'back.out(2)' }, '-=0.55');

    // Fancy terminal reveal only on desktop (clip-path can be janky on mobile)
    if (!isMobile) {
      const code = document.querySelector('.terminal-body code');
      if (code) {
        gsap.fromTo(code,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power2.inOut', delay: 0.8 }
        );
      }
    }

    // Parallax layers on scroll-out (skipped on mobile — costs perf, low reward)
    if (!isMobile) {
      gsap.to('.card-1', {
        yPercent: -30, xPercent: -8, rotation: -4, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.card-2', {
        yPercent: 25, xPercent: 6, rotation: 5, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-visual', {
        yPercent: 10, scale: 0.95, opacity: 0.5, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      // Background mesh parallax (desktop only)
      gsap.to('.mesh-1', { yPercent: 25, ease: 'none',
        scrollTrigger: { start: 'top top', end: 'bottom top', scrub: true, trigger: document.body },
      });
      gsap.to('.mesh-2', { yPercent: -20, ease: 'none',
        scrollTrigger: { start: 'top top', end: 'bottom top', scrub: true, trigger: document.body },
      });
      gsap.to('.mesh-3', { yPercent: 15, ease: 'none',
        scrollTrigger: { start: 'top top', end: 'bottom top', scrub: true, trigger: document.body },
      });
    }

    /* -----------------------------------------------------
       Data cube — scroll-driven 4-face rotation with copy sync
       ----------------------------------------------------- */
    (function initDataCube() {
      const section = document.querySelector('.cube-section');
      const cube    = document.getElementById('data-cube-el');
      if (!section || !cube) return;

      const faces = [
        { key: 'query',     title: 'Query',     desc: 'Turn raw data into precise questions with SQL.' },
        { key: 'model',     title: 'Model',     desc: 'Design metrics with DAX, dbt and star schemas.' },
        { key: 'visualize', title: 'Visualize', desc: 'Ship decision-ready dashboards in Power BI, Looker or Tableau.' },
        { key: 'automate',  title: 'Automate',  desc: 'Wire it all together with Power Automate, n8n and custom MCPs.' }
      ];

      const titleEl = document.getElementById('cube-title');
      const descEl  = document.getElementById('cube-desc');
      const dots    = document.querySelectorAll('.cube-dot');
      let currentFace = 0;

      function setActiveFace(idx) {
        if (idx === currentFace) return;
        currentFace = idx;
        const f = faces[idx];
        if (titleEl) titleEl.textContent = f.title;
        if (descEl)  descEl.textContent  = f.desc;
        dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
      }

      // Rotate cube 270° in sync with the scroll.
      // Desktop: pin the section so the cube stays in view while it rotates.
      // Mobile: no pin — the section scrolls naturally and the cube rotates
      // as it enters/exits the viewport (feels much more native on touch).
      const stConfig = isMobile
        ? {
            trigger: section,
            start: 'top bottom',   // rotation begins as section enters viewport
            end:   'bottom top',   // rotation ends as section leaves viewport
            scrub: 0.6,
            pin: false
          }
        : {
            trigger: section,
            start: 'top top',
            end:   '+=180%',
            scrub: 0.6,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1
          };
      stConfig.onUpdate = (self) => {
        const idx = Math.min(3, Math.floor(self.progress * 4));
        setActiveFace(idx);
      };

      gsap.to(cube, { rotationY: -270, ease: 'none', scrollTrigger: stConfig });
    })();

    /* -----------------------------------------------------
       Section headers — number, title, line reveal in sequence.
       `immediateRender: false` on every child .from() so nothing stays
       invisible if the ScrollTrigger misfires (mobile Safari quirk).
       ----------------------------------------------------- */
    document.querySelectorAll('.section-head').forEach((head) => {
      const num   = head.querySelector('.section-num');
      const title = head.querySelector('.section-title');
      const line  = head.querySelector('.section-line');
      const tl = gsap.timeline({
        defaults: { ease: 'expo.out', duration: 0.9, immediateRender: false },
        scrollTrigger: stCfg(head),
      });
      if (num)   tl.from(num,   { y: 24, opacity: 0, immediateRender: false }, 0);
      if (title) tl.from(title, { y: 30, opacity: 0, immediateRender: false }, 0.1);
      if (line)  tl.from(line,  { scaleX: 0, transformOrigin: 'left center', duration: 1.1, immediateRender: false }, 0.2);
    });

    /* -----------------------------------------------------
       About highlights — icons + text stagger
       ----------------------------------------------------- */
    gsap.utils.toArray('.about-highlights .highlight').forEach((el) => {
      const icon = el.querySelector('.highlight-icon');
      const txt  = el.querySelectorAll('h4, p');
      const tl = gsap.timeline({
        defaults: { immediateRender: false },
        scrollTrigger: stCfg(el),
      });
      tl.from(el, { x: -24 * intensity, opacity: 0, duration: 0.6, ease: 'expo.out', immediateRender: false });
      if (icon) tl.from(icon, { scale: 0.5, rotation: -30, opacity: 0, duration: 0.6, ease: 'back.out(1.8)', immediateRender: false }, '-=0.45');
      if (txt.length) tl.from(txt, { y: 10, opacity: 0, stagger: 0.08, duration: 0.4, immediateRender: false }, '-=0.35');
    });

    /* -----------------------------------------------------
       Skills cards — animate the CARD only (3D perspective on desktop,
       simple lift on mobile). The children (icon pop, tag stagger) are
       handled by the existing CSS `.skill-card.reveal.in ...` rules,
       which are much more reliable across devices. Trying to also
       control them via GSAP left them stuck at opacity 0 on mobile
       when child tweens applied their `from` state before ScrollTrigger
       fired (immediateRender doesn't propagate from timeline to child).
       ----------------------------------------------------- */
    gsap.utils.toArray('.skill-card').forEach((card) => {
      const cardFrom = isMobile
        ? { y: 40, opacity: 0, duration: 0.7, ease: 'expo.out' }
        : { y: 50, opacity: 0, rotationX: 18, transformPerspective: 900, transformOrigin: 'bottom center', duration: 0.85, ease: 'expo.out' };
      gsap.from(card, {
        ...cardFrom,
        immediateRender: false,
        scrollTrigger: stCfg(card),
      });
    });

    /* -----------------------------------------------------
       Projects — cards reveal (parallax image only on desktop)
       ----------------------------------------------------- */
    gsap.utils.toArray('.project-card').forEach((card) => {
      const isFeature = card.classList.contains('project-feature');
      gsap.from(card, {
        y: 60, opacity: 0, scale: isFeature ? 0.96 : 0.98,
        duration: 0.9, ease: 'expo.out',
        immediateRender: false,
        scrollTrigger: stCfg(card),
      });

      if (!isMobile) {
        const img = card.querySelector('.project-img');
        if (img) {
          gsap.fromTo(img,
            { yPercent: -5 },
            { yPercent: 5, ease: 'none',
              scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        }
      }
    });

    /* -----------------------------------------------------
       Timeline (Experience) — draw line only on desktop
       ----------------------------------------------------- */
    const timeline = document.querySelector('.timeline');
    if (timeline) {
      if (!isMobile) {
        timeline.classList.add('gsap-timeline-active');
        gsap.fromTo(timeline,
          { '--tl-progress': 0 },
          { '--tl-progress': 1, ease: 'none',
            scrollTrigger: { trigger: timeline, start: 'top 70%', end: 'bottom 80%', scrub: 0.4 },
          }
        );
      }

      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        const fromLeft = i % 2 === 0;
        const tl = gsap.timeline({
          defaults: { immediateRender: false },
          scrollTrigger: stCfg(item),
        });
        if (dot) tl.from(dot, { scale: 0, opacity: 0, duration: 0.45, ease: 'back.out(2)', immediateRender: false });
        if (content) tl.from(content, {
          x: (fromLeft ? -30 : 30) * intensity, opacity: 0, duration: 0.7, ease: 'expo.out', immediateRender: false,
        }, '-=0.3');
      });
    }

    /* -----------------------------------------------------
       Certifications & Awards — cascade
       ----------------------------------------------------- */
    gsap.utils.toArray('.cert-card, .award-card').forEach((el) => {
      gsap.from(el, {
        y: 30, opacity: 0, scale: 0.97, duration: 0.7, ease: 'expo.out',
        immediateRender: false,
        scrollTrigger: stCfg(el),
      });
    });

    /* -----------------------------------------------------
       Contact — staggered CTA reveal
       ----------------------------------------------------- */
    const contact = document.querySelector('#contact');
    if (contact) {
      const targets = contact.querySelectorAll('.contact-card, .contact-form, .contact-info, .contact-actions a, .contact-item');
      if (targets.length) {
        gsap.from(targets, {
          y: 24, opacity: 0, stagger: 0.07, duration: 0.7, ease: 'expo.out',
          immediateRender: false,
          scrollTrigger: stCfg(contact),
        });
      }
    }

    /* -----------------------------------------------------
       Refresh triggers after fonts / images finish loading —
       positions can shift and misalign trigger points otherwise.
       ----------------------------------------------------- */
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);

    /* -----------------------------------------------------
       SAFETY NET — after 2.5s, force-show any content element still
       stuck at opacity 0 (trigger never fired, mobile viewport quirk,
       etc). Belt-and-suspenders. Checks reveal items AND common child
       targets (skill tags, headings, timeline content, contact items).
       ----------------------------------------------------- */
    setTimeout(() => {
      const suspects = document.querySelectorAll([
        '.reveal',
        '.skill-tags li', '.skill-head h3', '.skill-icon',
        '.highlight-icon', '.highlight h4', '.highlight p',
        '.timeline-dot', '.timeline-content',
        '.section-num', '.section-title', '.section-line',
        '.contact-card', '.contact-form', '.contact-info',
        '.contact-actions a', '.contact-item',
        '.cert-card', '.award-card', '.project-card',
      ].join(','));
      suspects.forEach(el => {
        const cs = window.getComputedStyle(el);
        if (parseFloat(cs.opacity) < 0.05) {
          gsap.set(el, { clearProps: 'all', opacity: 1, x: 0, y: 0, scale: 1, rotation: 0, rotationX: 0 });
        }
      });
    }, 2500);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

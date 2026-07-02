/* =========================================================
   Edwin Santos · Portfolio — Apple-style scroll animations
   Powered by GSAP + ScrollTrigger (loaded via CDN in index.html)

   Layered on top of the existing IntersectionObserver reveal.
   If GSAP fails to load or the user prefers reduced motion,
   this module bails out and the CSS `.reveal.in` fallback keeps
   the site fully functional.
   ========================================================= */
(() => {
  'use strict';

  if (typeof window === 'undefined') return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const start = () => {
    if (!window.gsap || !window.ScrollTrigger) {
      // GSAP missing — CSS reveal fallback stays active.
      return;
    }

    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const intensity = isMobile ? 0.6 : 1; // scale distances down on phones

    // Prevent the CSS reveal fallback from double-animating the elements
    // we're about to control with GSAP. Mark html as "gsap ready" so we can
    // neutralize the CSS transition, then lock the base state via gsap.set.
    document.documentElement.classList.add('gsap-ready');
    const revealItems = document.querySelectorAll('.reveal');
    revealItems.forEach(el => el.classList.add('in'));
    gsap.set(revealItems, { clearProps: 'transition', opacity: 1, y: 0 });

    /* -----------------------------------------------------
       Scroll progress bar (thin gradient bar under the nav)
       ----------------------------------------------------- */
    const progress = document.querySelector('.scroll-progress');
    if (progress) {
      gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    }

    /* -----------------------------------------------------
       Hero — entrance choreography + parallax on scroll out
       ----------------------------------------------------- */
    const heroTL = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.1 } });
    heroTL
      .from('.hero-badge', { y: 30, opacity: 0 })
      .from('.hero-greet', { y: 24, opacity: 0 }, '-=0.85')
      .from('.hero-name',  { y: 32, opacity: 0 }, '-=0.85')
      .from('.hero-role',  { y: 24, opacity: 0 }, '-=0.85')
      .from('.hero-desc',  { y: 20, opacity: 0 }, '-=0.75')
      .from('.hero-cta .btn', { y: 20, opacity: 0, stagger: 0.12 }, '-=0.75')
      .from('.hero-stats .stat', { y: 20, opacity: 0, scale: 0.9, stagger: 0.1 }, '-=0.6')
      .from('.terminal', { y: 40, opacity: 0, scale: 0.96, duration: 1.2 }, '-=1.2')
      .from('.floating-card', { scale: 0.5, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'back.out(2)' }, '-=0.6');

    // Terminal "line by line" reveal — data-analytics themed touch
    const terminalCode = document.querySelector('.terminal-body code');
    if (terminalCode) {
      // Split by newline text nodes to reveal line by line via a clipping mask
      gsap.fromTo(terminalCode,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.8, ease: 'power2.inOut', delay: 0.8 }
      );
    }

    // Parallax the floating cards while user scrolls the hero out
    gsap.to('.card-1', {
      yPercent: -30 * intensity, xPercent: -8 * intensity, rotation: -4,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    gsap.to('.card-2', {
      yPercent: 25 * intensity, xPercent: 6 * intensity, rotation: 5,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    // Hero terminal recedes slightly as user scrolls (Apple keynote feel)
    gsap.to('.hero-visual', {
      yPercent: 10 * intensity, scale: 0.95, opacity: 0.4,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    /* -----------------------------------------------------
       Background mesh — slow parallax layers
       ----------------------------------------------------- */
    gsap.to('.mesh-1', {
      yPercent: 25, ease: 'none',
      scrollTrigger: { start: 'top top', end: 'bottom top', scrub: true, trigger: document.body },
    });
    gsap.to('.mesh-2', {
      yPercent: -20, ease: 'none',
      scrollTrigger: { start: 'top top', end: 'bottom top', scrub: true, trigger: document.body },
    });
    gsap.to('.mesh-3', {
      yPercent: 15, ease: 'none',
      scrollTrigger: { start: 'top top', end: 'bottom top', scrub: true, trigger: document.body },
    });

    /* -----------------------------------------------------
       Section headers — Apple keynote-style reveal
       (num counts up, title slides, line grows horizontally)
       ----------------------------------------------------- */
    document.querySelectorAll('.section-head').forEach((head) => {
      const num   = head.querySelector('.section-num');
      const title = head.querySelector('.section-title');
      const line  = head.querySelector('.section-line');

      const tl = gsap.timeline({
        defaults: { ease: 'expo.out', duration: 1 },
        scrollTrigger: { trigger: head, start: 'top 82%', toggleActions: 'play none none none' },
      });

      if (num)   tl.from(num,   { y: 30, opacity: 0, letterSpacing: '0.4em' }, 0);
      if (title) tl.from(title, { y: 40, opacity: 0 }, 0.1);
      if (line)  tl.from(line,  { scaleX: 0, transformOrigin: 'left center', duration: 1.2 }, 0.2);
    });

    /* -----------------------------------------------------
       About highlights — icons rotate/scale, text stagger
       ----------------------------------------------------- */
    gsap.utils.toArray('.about-highlights .highlight').forEach((el, i) => {
      const icon = el.querySelector('.highlight-icon');
      const txt  = el.querySelectorAll('h4, p');
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      });
      tl.from(el, { x: -30, opacity: 0, duration: 0.7, ease: 'expo.out' });
      if (icon) tl.from(icon, { scale: 0.4, rotation: -45, opacity: 0, duration: 0.7, ease: 'back.out(2)' }, '-=0.55');
      if (txt.length) tl.from(txt, { y: 12, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.4');
    });

    /* -----------------------------------------------------
       Skills — cards enter with 3D perspective + tag stagger
       ----------------------------------------------------- */
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
      const icon = card.querySelector('.skill-icon');
      const tags = card.querySelectorAll('.skill-tags li');
      const head = card.querySelector('.skill-head h3');

      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
      });

      tl.from(card, {
        y: 60, opacity: 0, rotationX: 22, transformPerspective: 900, transformOrigin: 'bottom center',
        duration: 0.9, ease: 'expo.out',
      });
      if (icon) tl.from(icon, { scale: 0.4, rotation: -90, opacity: 0, duration: 0.6, ease: 'back.out(1.9)' }, '-=0.6');
      if (head) tl.from(head, { y: 10, opacity: 0, duration: 0.5 }, '-=0.5');
      if (tags.length) tl.from(tags, { y: 10, opacity: 0, stagger: 0.05, duration: 0.4 }, '-=0.35');
    });

    /* -----------------------------------------------------
       Projects — cards reveal with subtle parallax on image
       ----------------------------------------------------- */
    gsap.utils.toArray('.project-card').forEach((card) => {
      const img = card.querySelector('.project-img');
      const isFeature = card.classList.contains('project-feature');

      gsap.from(card, {
        y: 80, opacity: 0, scale: isFeature ? 0.95 : 0.98,
        duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
      });

      if (img) {
        gsap.fromTo(img,
          { yPercent: -6 * intensity },
          {
            yPercent: 6 * intensity, ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      }
    });

    /* -----------------------------------------------------
       Timeline — line "draws" as you scroll + cards slide
       ----------------------------------------------------- */
    const timeline = document.querySelector('.timeline');
    if (timeline) {
      // The vertical line uses CSS ::before. We scale it in via a scrub.
      timeline.classList.add('gsap-timeline-active');
      gsap.fromTo(timeline,
        { '--tl-progress': 0 },
        {
          '--tl-progress': 1, ease: 'none',
          scrollTrigger: { trigger: timeline, start: 'top 70%', end: 'bottom 80%', scrub: 0.4 },
        }
      );

      gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        const dot = item.querySelector('.timeline-dot');
        const content = item.querySelector('.timeline-content');
        const fromLeft = i % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: item, start: 'top 82%', toggleActions: 'play none none none' },
        });
        if (dot) tl.from(dot, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)' });
        if (content) tl.from(content, {
          x: (fromLeft ? -40 : 40) * intensity, opacity: 0, duration: 0.8, ease: 'expo.out',
        }, '-=0.35');
      });
    }

    /* -----------------------------------------------------
       Certifications & Awards — cascade reveal
       ----------------------------------------------------- */
    gsap.utils.toArray('.cert-card, .award-card').forEach((el, i) => {
      gsap.from(el, {
        y: 40, opacity: 0, scale: 0.96, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });

    /* -----------------------------------------------------
       Contact — CTA pop
       ----------------------------------------------------- */
    const contact = document.querySelector('#contact');
    if (contact) {
      gsap.from(contact.querySelectorAll('.contact-card, .contact-form, .contact-info, .contact-actions a, .contact-item'), {
        y: 30, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: contact, start: 'top 78%', toggleActions: 'play none none none' },
      });
    }

    // Refresh once fonts load to keep triggers accurate
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  };

  // GSAP is loaded via <script> tag in index.html with `defer`. Wait until the
  // DOM is parsed and the CDN scripts have executed before initializing.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();

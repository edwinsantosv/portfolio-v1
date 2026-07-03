# Portfolio v2 — Round 2 Brief for Fable 5

> Follow-up to the Round 1 handoff (`docs/handoff-fable5.md`). Round 1 shipped the cinematic entrance (splash, particles, orb, name scramble, terminal execution, Lenis). This round tackles: (1) bugs found in QA, (2) scroll performance, (3) extending parallax + 3D throughout the whole page (not just the hero).

**Live:** https://edwinsantos.netlify.app
**Repo:** `github.com/edwinsantosv/portfolio-v2.github.io`, branch `published`, auto-deploys via Netlify.
**Round 1 commit for reference:** `08e9147 feat(hero): cinematic entrance — splash, particles, cursor orb, text FX, Lenis`

---

## 1. Bugs to fix

### 🐛 Bug A — Data cube parks between faces

**Symptom:** the cube rotates as user scrolls, but sometimes lands at an intermediate angle (~30-60° between two faces), showing two faces simultaneously. Screenshot attached showed Model face + Visualize peek at the same time, while the label + dot indicated "Model". Feels broken.

**Root cause hypothesis:** the ScrollTrigger `scrub: 0.6` maps rotation linearly to scroll progress. If the user parks their scroll at a partial progress value, the cube parks at a partial rotation. This is technically correct behavior but jarring UX.

**Fix options (pick one):**

- **Snap-to-face (recommended):** use `ScrollTrigger.snap([0, 0.25, 0.5, 0.75, 1])` on the cube tween so the cube always lands on a face when the user stops scrolling. Snap duration ~0.4s with `power2.inOut`. This is the Apple pattern.
- **Alternative:** listen for `scrollEnd` and animate `rotationY` to the nearest 90° increment.
- **Alternative:** replace scroll-scrub with discrete triggers per face — each face has its own ScrollTrigger with `toggleActions`, and the cube tweens to that face's angle.

Whichever approach: the cube should never rest at 45°.

### 🐛 Bug B — Perceived scroll lag

**Symptom:** scrolling feels heavy / laggy compared to native.

**Likely causes:**
1. Lenis lerp too aggressive (default `lerp: 0.1` = ~100ms latency)
2. Multiple ScrollTriggers running scrubbed on the same scroll (parallax + cube + hero visual + meshes + tilts + reveals)
3. Filter/blur styles on many stacked elements repainted per frame
4. Ambient particles doing many CSS transforms per frame

**Fixes to try (in order):**

1. Tune Lenis:
   ```js
   new Lenis({ lerp: 0.08, duration: 1.05, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
   ```
   `lerp: 0.08` feels snappier without losing the smoothness.

2. Use `will-change: transform` **only** on actively-animated elements. Remove from everything else — `will-change` is a hint to promote to compositor layer, and *overusing it thrashes GPU memory*.

3. Consolidate scroll-driven animations into fewer ScrollTrigger instances. Currently we probably have 15+ triggers listening on the same scroll. Batch them where possible.

4. Reduce particle count further on mid-range devices — 24 desktop → 16, 12 mobile → 6. Or turn them off entirely once the user scrolls past the hero (destroy the DOM nodes).

5. Guard heavy effects behind a "quality" flag detected via `navigator.hardwareConcurrency < 4` or `deviceMemory < 4` — those devices skip particles + orb.

6. Use `transform` and `opacity` only in animated properties. NEVER animate `background`, `filter`, `box-shadow`, or `width/height` directly.

### 🐛 Bug C — Terminal execution result overlap (potential)

Check if the terminal execution mini-table sometimes clips into the floating chips at certain viewport widths. Likely fine but worth a QA sweep on 375px, 768px, 1024px, 1440px, 2560px.

---

## 2. Extend parallax + 3D beyond the hero (this is the request)

The hero looks premium after Round 1. Now the *rest of the page* feels flat by comparison. Add signature 3D + parallax moments per section — but each one must feel intentional, not decorative noise.

### Section-by-section proposals

Below assumes the current section order: Hero → About → Data Cube → Skills → Projects → Experience → Education → Certifications → Awards → Contact.

#### About (`01`)
- **Depth-of-field portrait card:** the About narrative sits inside a card that subtly parallaxes on mouse move (3-5° tilt with `gsap.quickTo`). Behind the card, a *floating geometric shape* (indigo diamond or torus knot in CSS 3D) drifts slowly.
- **Highlight cards (3 of them):** on mouse hover, each highlight card lifts + tilts + reveals a soft indigo glow. Extend the existing tilt from cards.

#### Skills (`02`)
- **Skill category cards float in 3D:** as they enter viewport, each card enters with a slight 3D rotation (rotateY from -30° to 0°, staggered). Cards feel like they're pages being turned.
- **Interactive category selector:** on hover of one category card, others recede slightly (translateZ negative), the hovered one comes forward. Depth-of-focus effect.
- **Background:** subtle floating geometry (dots grid or wireframe cube pattern) at 30% opacity, drifting slowly on scroll.

#### Projects (`03`)
- **Projects grid with per-card 3D tilt** — already exists from Round 1. Extend with:
  - On hover, the card's *image* has an extra parallax layer (moves slightly relative to the card body, like Apple's product cards)
  - When card enters viewport, it rotates in from a slight tilt (rotateY -8° → 0°, delay staggered by card index)
- **Background:** parallax gradient blob that follows the cursor at 40% viewport width, softly blurred (`filter: blur(80px)`)

#### Experience (`04`)
- **The vertical timeline draws itself** (already exists?) — verify it's smooth
- **Timeline dots pulse** when in view, subtle indigo halo
- **Each experience card has a subtle parallax on scroll** — content shifts up slightly relative to card border, creating depth

#### Education (`05`)
- Same treatment as Experience for consistency
- **Add a subtle background sigil** — a small geometric mark for each institution (like the University crests, if I can source them cleanly). Fades in behind each card.

#### Certifications
- **3D flip cards on hover:** front shows logo + issuer + year. Back shows credential ID + Verify link. Flip animation on click, not hover (prevents accidental flips)
- **Grid entrance:** cards fan in from center like a hand of cards being dealt (rotateY + delayed stagger by proximity to center)

#### Awards (`06`)
- **Trophy cards in 3D:** the 2 award cards get a subtle mouse-tilt (5°) and glow on hover
- **Background:** subtle metallic gradient that shifts as user scrolls (`background-position` animated via scroll)

#### Contact (`07`)
- **Form field parallax:** as user scrolls into contact, the form container tilts slightly forward (perspective effect)
- **CTA button:** magnetic effect — button subtly follows cursor when nearby (within 100px), snaps to cursor when hovered
- **Background:** the same cursor-follow orb from hero could return here, larger, warmer (pink dominant)

### Global additions

- **Marquee band between Skills and Projects:** horizontally scrolling tech tags ("BUSINESS INTELLIGENCE • AUTOMATION • MCPs • POWER PLATFORM • DAX • n8n • Power BI • ..."). Continuous scroll, pauses on hover. Sits at ~60px height between sections.
- **Section entrance choreography variation** — currently every section fades in similarly. Give each section a signature entrance (see Round 1 brief for concrete ideas, Priority 2).
- **Chapter markers (optional):** small full-viewport transition cards between major sections. Simple: dark background + "01 · Story" + "02 · Skills" etc. Fades in and out over 100vh of scroll each. Apple keynote-style. Feels too much? Skip.

### 🌌 Global background effect that evolves with scroll (Edwin's explicit request)

The entire page should have an **ambient background layer that changes as the user scrolls**. It sits behind all content, adds depth, and gives the sense that the whole page is one continuous scene rather than 10 stacked sections.

**Requirements:**
- Fixed to viewport (`position: fixed`) — doesn't scroll with content, but its *appearance* changes based on scroll position
- Subtle — never fights with the foreground content for attention
- Respects `prefers-reduced-motion` — reduces to a static gradient
- Cheap to render — <2% CPU overhead, no jank at 60fps

**Chosen approach — Aurora waves. Ship this exactly.**

### Spec

- Fixed layer behind all content: `position: fixed; inset: 0; z-index: -1; pointer-events: none;`
- 3 soft blurred color blobs rendered as full-viewport `radial-gradient` divs:
  - Blob 1: indigo `#6366f1`
  - Blob 2: purple `#a855f7`
  - Blob 3: pink `#ec4899`
- Each blob has independent slow drift animation (40-60s per cycle) so movement feels ambient, not directed
- Positions + opacities interpolate based on scroll progress through the whole page:

| Scroll % | Section | Dominant color | Blob layout |
|---|---|---|---|
| 0% | Hero | indigo | top-left, ~120vw wide |
| 25% | About / Skills | indigo→purple | center-right shifts up |
| 50% | Projects / Experience | purple + pink emerging | pink joins bottom, indigo fades |
| 75% | Certifications / Awards | pink dominant | indigo drifts off, purple mid |
| 100% | Contact | warm pink + purple | top-right dominant |

- Uses CSS `radial-gradient` + `filter: blur(120px)` on each blob — no WebGL, no canvas
- Interpolation driven by GSAP ScrollTrigger with `scrub: 1` on a body-wide trigger (`start: 'top top', end: 'bottom bottom'`)
- Very cheap: 3 divs, transform + opacity only, no per-frame repaints

### Reduced-motion fallback

- Blobs stay visible but *static* — positioned at their ~50% state. No drift, no scroll interpolation.

### Layer with the existing hero mesh

- The hero already has `.bg-mesh` with 3 layers (`.mesh-1/2/3`). *Unify these* — remove the hero-only mesh and let the new global aurora handle the hero background too. Prevents double-blur / stacking cost.

### Bonus polish (if timing allows)

- The Round 1 cursor-follow orb can inherit the *current dominant color* of the aurora, so as user scrolls, orb warmth shifts. Ties Round 1 and Round 2 together.
- On mobile, reduce blur radius (60px instead of 120px) and lock the aurora to a simpler 2-state interpolation (top-half indigo, bottom-half pink). Preserves the effect at lower render cost.
- Keep blob movement subtle enough that a user could squint and think "is that moving?" — that ambient uncertainty is what makes it feel premium (Vercel/Linear pattern).

---

## 3. Libraries + resources (all free)

### For 3D + WebGL
- **Three.js** — heavy but powerful. Use only if we need real 3D beyond CSS.
- **OGL** — 300KB alternative to Three.js. Recommended over Three.js for our use case.
- **Curtains.js** — WebGL rendered on top of DOM elements. Good for image effects.
- **Vanta.js** — pre-made animated backgrounds (Three.js under the hood). One-line to add a shimmering wave, birds, cells, etc.
- **Spline** — 3D scenes designed in a Figma-like editor, embedded via `<spline-viewer>`. Free tier: 100k renders/month.
- **Rive** — interactive animations. Free tier + very small runtime.

### For text + reveal
- **Splitting.js** — text splitting into characters/lines/words (~4KB)
- **GSAP TextPlugin** (free) — typewriter, scramble effects native
- **GSAP MorphSVGPlugin** — free now (used to be paid)

### For inspiration + copy-paste demos
- **codrops.com** — free tutorials with full source
- **codepen.io** — search "portfolio 3d", "scroll parallax", "cursor follow"
- **awwwards.com/websites** — inspiration only (not code)
- **studio.spline.design/gallery** — free 3D scenes to remix
- **lottiefiles.com** — free vector animations
- **hover.dev** — Tailwind + Framer Motion components (adapt to vanilla)

### Specific demos worth copying

- **Codrops — On-Scroll Distortion effects** — WebGL distortion on scroll
- **Codrops — Grid to Fullscreen animations** — cards expanding into full-page reveal
- **Codrops — Distorted Text effects** — SVG text distortions on hover
- **CodePen "Vercel edge network"** — searches for community rebuilds of Vercel's hero grid
- **CodePen "3D flip card"** — dozens of clean implementations
- **CodePen "Magnetic button GSAP"** — mouse-follow button behaviors

---

## 4. Non-negotiables from Round 1

Do NOT remove or break:
- The cinematic hero (splash + particles + orb + name scramble + terminal execution)
- Lenis smooth scroll (tune it, don't rip it out)
- The data cube (fix its parking bug, don't remove)
- Contact form → n8n → Notion + WhatsApp flow
- ES/EN i18n toggle
- Dark mode default
- All existing CVs, Linktree, project case pages

---

## 5. Performance budget for Round 2

After adding all the new effects, we still need:

- **Lighthouse Performance ≥ 90 on mobile 4G, ≥ 95 on desktop cable**
- **First Contentful Paint (FCP) < 1.5s**
- **Largest Contentful Paint (LCP) < 2.5s**
- **Cumulative Layout Shift (CLS) < 0.1**
- **Interaction to Next Paint (INP) < 200ms**
- **JS bundle total ≤ 60KB gzipped (excluding CDN libs)**
- **Total page weight ≤ 500KB above the fold** (fonts + first images + critical CSS)

If any addition drops us below these, disable it behind a media query or device capability check.

---

## 6. QA checklist (before shipping Round 2)

1. Cube: rotate through all 4 faces cleanly, never park at intermediate angle
2. Scroll: feel snappy — no perceived lag on 60Hz screens
3. Mobile: all new effects have mobile-optimized versions or are cleanly disabled
4. `prefers-reduced-motion`: all new decorative animations disabled
5. i18n: no new hard-coded English strings that don't respect `data-i18n`
6. Contact form still submits successfully to n8n
7. Cube face content still correct (Query/Model/Visualize/Automate with respective visuals)
8. GA still tracks page views + form_submit event
9. No console errors in production
10. Lighthouse Performance score matches target
11. No layout shift when animations kick in (`will-change` scoped correctly)
12. Light theme still respectable (all new effects work or degrade cleanly)

---

## 7. What Edwin can also send this round

If available:
- Real professional headshot (1200x1500 minimum for retina) — unlocks priority 3 "content depth" from Round 1 brief
- Screenshots of Power BI dashboards (client data blurred) — for future case studies
- Any specific portfolios he saw and liked (URL + what he liked)
- Confirmation on marquee copy: what tech tags should scroll?

---

*Round 2 brief written after QA of Round 1. Prioritize bugs (§1) → performance (§1B) → extended parallax (§2). §3 is a library reference, not a to-do.*

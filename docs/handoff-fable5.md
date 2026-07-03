# Portfolio v2 — Handoff Brief for Fable 5

> Comprehensive brief to hand off to a new tool/agent for the next iteration of Edwin Santos' personal portfolio. Written 2026-07-03 after a full evening of shipping.

---

## 1. Who this is for

**Owner:** Edwin Santos Vidal — Business Analyst + Automation Consultant + Instructor. Based in Lima. Working with international teams across US, Canada and Europe. Currently pursuing MSc in Business Analytics @ Pontificia Universidad Católica de Chile (#1 LATAM).

**Positioning goal:** attract senior / lead roles in Business Intelligence, Automation and Data Strategy — full-time, consulting or advisory — at rates aligned with US/EU salaries ($90–130K/yr or $75–150/hr).

**Brand voice:** rigurous like an engineer, strategic like a business leader. Data-driven, precise, warm. Bilingual (ES primary, EN priority for reach).

---

## 2. Current stack

| Layer | Tech |
|---|---|
| Frontend | Vanilla HTML + CSS + JS (no framework, no build step) |
| Animations | GSAP 3.x + ScrollTrigger, CDN-loaded |
| Hosting | Netlify (`edwinsantos.netlify.app`) — deploys from `published` branch of `github.com/edwinsantosv/portfolio-v2.github.io` |
| Analytics | Google Analytics 4 (`G-V2CNC24LTD`) via shared `analytics.js` |
| Contact | n8n Cloud webhook → Notion database (leads capture) + CallMeBot WhatsApp alert |
| Assets | Local — no CDN dependencies except GSAP |
| Fonts | System stack + JetBrains Mono for code |

---

## 3. Current state (live now)

**Live:** https://edwinsantos.netlify.app

### Sections (in order)
1. **Hero** — badge + name + role + description + 2 CTAs (Projects, Book a call) + 3 stats (60 dashboards / 4 countries / 100+ students) + SQL terminal + 2 floating chips (Power BI · Power Platform)
2. **About** (`01`) — narrative + 3 highlight cards
3. **Data Cube** — 3D rotating cube between About and Skills, 4 faces (Query, Model, Visualize, Automate). Rotates as user scrolls past.
4. **Skills** (`02`) — 4 categories with tags (Databases / BI & Viz / ML+AI / Leadership)
5. **Projects** (`03`) — 8 project cards, each linking to a detailed case page
6. **Experience** (`04`) — vertical timeline, 5 roles (Wings4U, USMP, CQ Fluency, Valia, Ove Decors), each with org logo + link
7. **Education** (`05`) — vertical timeline, 4 items (MSc PUC Chile, Mohawk grad cert, PUCP diploma, PUCP bachelor)
8. **Certifications** — 8 credentials grid (PL-300, IBM x2, DeepLearning.AI, LinkedIn x2, Platzi n8n, Google Cloud ML)
9. **Awards** (`06`) — HEAD Competition 1st + NASA Space Apps 1st Global Nominee
10. **Contact** (`07`) — copy + contact form (name/email/subject/message) → n8n → Notion + WhatsApp

### Features already implemented
- Dark mode default (light theme togglable, persists in localStorage)
- English default with one-time reset flag (Spanish still toggleable)
- i18n system via `data-i18n` attributes with `i18n` dict object in `script.js`
- GSAP scroll-in reveal for all sections
- 3D mouse-tilt on project cards, cert cards, skill cards (excludes hero terminal)
- Scroll parallax on hero visual (fades/scales as you scroll)
- 3D data cube pinned scene between About and Skills
- Contact form fetches n8n webhook, includes GA event tracking (`form_submit`, `form_error`)
- 3 CV PDFs (2-page modern, 1-page compact, Harvard OCS style) + 4-page Portfolio brochure PDF
- Standalone Linktree page (`linktree.html`)
- Mobile-first responsive
- `prefers-reduced-motion` respected everywhere

### Files (repo root)
- `index.html` — main portfolio
- `linktree.html` — standalone Linktree
- `cv.html` — web-based CV (print-friendly)
- `styles.css` (1614+ lines) — all portfolio styles
- `script.js` — i18n, theme, form, tilt, reveal, counters
- `scroll-animations.js` — GSAP timelines + ScrollTrigger orchestration
- `analytics.js` — GA4 loader (shared)
- `project-dark.css` / `project-dark.js` — shared styling for case pages
- `assets/logos/` — org + issuer logos (SVG/PNG mix)
- `infra/n8n-portfolio-contact.json` — n8n workflow (importable)
- Multiple `*.tex` + `*.pdf` files for CVs and brochure

---

## 4. What we want to level up — priority order

### 🔥 Priority 1 — Cinematic entrance (this is the request)

**Goal:** first 3 seconds after landing should feel like Apple / Vercel / Linear / Awwwards. Right now the hero is competent but static.

Ideas (pick the ones that fit best, they can combine):

#### a) Layered parallax intro
- 3-5 parallax layers behind the hero (gradient mesh, particle field, geometric shapes moving at different speeds on mouse move + on scroll)
- Foreground content stays crisp, background scrolls slower — depth feel
- Consider a subtle animated grid floor that recedes to horizon (Vercel Edge Network vibe)

#### b) Cursor-follow ambient orb
- A soft blurred orb (indigo→pink gradient, `mix-blend-mode: overlay`) that follows the cursor with easing (~200ms lag)
- Grows when hovering interactive elements, shrinks when over text
- Disabled on touch devices

#### c) Text scramble / typewriter on name
- The name "Edwin Santos" starts as scrambled characters (`█▓▒░` or random glyphs) and resolves letter-by-letter into the correct name
- Alternatively: typewriter effect on the role subtitle ("Business Analyst" → "Automation Consultant" → "Data Strategist" — cycling roles)

#### d) SQL terminal upgrade
- Right now the terminal writes SQL via clip-path (visible on desktop only)
- Level up: animate the SQL execution — after the query is written, show results appearing as a small table below or as bar chart bars growing
- Add a fake "cursor blink" at the end
- On hover, the query runs "again" — cursor moves back to start, chars re-appear

#### e) Loading screen (first visit only)
- Full-screen splash: "ES" logo mark expanding into the portfolio
- 800-1200ms total, blocks initial render until CSS + fonts load
- Store flag in sessionStorage so it doesn't run twice per session
- Add option to skip with `?nointro=1` query param

#### f) Smooth scroll (Lenis)
- Replace native scroll with [Lenis](https://github.com/darkroomengineering/lenis) — silky-smooth easing
- Makes every ScrollTrigger animation feel more premium
- ~4KB gzipped, minimal integration effort
- Compatible with GSAP ScrollTrigger via bridge

#### g) Custom cursor (subtle)
- 12px circle that follows cursor with slight lag
- Morphs to text-cursor over headings, expands into 40px circle over buttons/links
- Vercel-style, minimal, complements the ambient orb (d)

### 🎯 Priority 2 — Section transitions & scroll storytelling

Currently sections just... appear one after another. Level up with:

- **Sticky headers per section** that reveal a mini-navigation (like Apple product pages)
- **Marquee bands** between sections — horizontal scrolling text ("BUSINESS INTELLIGENCE • AUTOMATION • MCPs • POWER PLATFORM • ...") that pauses on hover
- **Section entrance choreography** — right now every section fades in similarly. Give each section a signature transition:
  - Skills: cards rise from bottom staggered like a wave
  - Projects: cards fan out from center like a hand of cards
  - Experience: timeline draws itself with the line snaking through dots
  - Education: books stacking up
- **Scroll-driven "chapter" cards** — brief full-viewport transitional cards ("Chapter 1: The Analyst") between major sections. Optional, Apple keynote-style.

### 🖼️ Priority 3 — Content depth & credibility

- **Real professional headshot** in hero + About + Linktree (currently placeholder "ES" avatar)
- **Testimonials section** between Awards and Contact — 3-4 short quotes (2-3 sentences) from PMs at CQ Fluency, Wings4U team, USMP students. Format: quote + photo + name + role/company + LinkedIn link.
- **Case study standardization** — some project cards go to detailed pages, some don't. Every project deserves:
  - The problem (1 paragraph)
  - The approach (bulleted or numbered steps)
  - The result (metrics + before/after)
  - Tech stack (labeled tags)
  - Screenshots or short GIFs
  - Timeline (how long it took)
  - Client testimonial if available
- **Wings4U MCPs case page** — new dedicated page (`wings4u-mcps.html`) once the current work is stable enough to show. Positioning as a novel niche.
- **Certifications: allow filter by issuer** — quick pills (`All · Microsoft · IBM · LinkedIn · DeepLearning.AI · Google · Platzi`) to filter the 8 cards.

### 📊 Priority 4 — Interactive skills

Current skills are static tags in 4 cards. Ideas:

- **Skill constellation** — a force-directed graph of skills, connected by relations (Power BI ↔ DAX ↔ Data Modeling). Interactive: drag nodes, hover shows years of experience.
- **Skill spectrum** — horizontal bar per skill with a "proficiency" indicator (level 1-5) and years of experience. Sorted by descending proficiency.
- **Skills radar chart** — polar chart with 6-8 axes (Data Modeling, Visualization, Automation, Leadership, Cloud, ML, Storytelling, Strategy). Animates on scroll into view.

Any of these adds narrative and depth vs the current tag list.

### 🌐 Priority 5 — Language & i18n

- **Auto-detect browser language** on first visit (default currently is force-EN via reset flag — that's fine, but next iteration should intelligently choose)
- **Persist choice** with a proper localStorage key (existing `lang` key is fine)
- **Add third language: Portuguese** — big market in Brazil for BI roles, and PUC Chile has PT crossover
- **Translate the Data Cube captions and Certification descriptions** — currently English only, need ES coverage

### 📈 Priority 6 — SEO + growth

- **Meta tags OG / Twitter Cards** — when portfolio URL is shared in Slack/WhatsApp/LinkedIn, preview should show hero image + title + description. Currently no OG image.
- **Sitemap.xml + robots.txt** — auto-generated is fine
- **Favicon suite** — 16, 32, 48, 180 (iOS), 192/512 (Android), site.webmanifest
- **JSON-LD structured data** — Person schema with jobTitle, alumniOf, sameAs (LinkedIn, GitHub) — helps Google rich results
- **Custom domain** — `edwinsantos.com` or `edwinsantos.dev` ($10-15/yr). Namecheap or Cloudflare Registrar, connect to Netlify DNS in 5 min.
- **Meta description per page** — 155 chars, keyword-tuned
- **Link Google Search Console → GA4** — organic traffic + queries insights

### 🔊 Priority 7 — Micro-interactions

- **Number counters animate** when stats enter viewport (probably already partially exists, needs polish)
- **Copy-to-clipboard** on email/phone with subtle "Copied!" tooltip
- **Progress bar** at top showing scroll % (already exists — verify still works after all changes)
- **Reading time** on any long-form content (e.g., Wings4U MCPs case study)
- **Table of contents** for long pages, sticky at right edge on desktop
- **Toast notifications** for form success (nicer than the current inline `<p>`)
- **Sound effects toggle** (optional): subtle UI clicks and section transitions. Off by default, opt-in in nav.

### ♿ Priority 8 — Accessibility, performance, resilience

- **WCAG AA audit** — color contrast, keyboard nav, focus indicators, alt texts
- **Skip-to-content link** for keyboard users
- **Screen reader testing** with NVDA/VoiceOver
- **Lighthouse audit** — target 95+ on all 4 categories on both mobile + desktop
- **Image optimization** — WebP + AVIF fallbacks, aspect-ratio boxes, `loading="lazy"`, correct `width/height` attributes to prevent CLS
- **Code splitting** — currently all JS loads on every page, split by page
- **Preload critical fonts** — reduce FOUT
- **CSP headers** — via Netlify `_headers` file
- **Preview builds on PRs** — Netlify does this automatically, use them for design reviews

---

## 5. Deep dive — parallax & dynamic entrance

Since the request emphasized parallax and entrance dynamism, here's the concrete detail.

### What we have

- Hero has 3 mesh gradient layers (`.mesh-1`, `.mesh-2`, `.mesh-3`) that move at different yPercent speeds on scroll (via GSAP ScrollTrigger)
- 2 floating chips (Power BI, Power Platform) have `yPercent + xPercent + rotation` parallax on scroll
- Hero terminal has `yPercent + scale + opacity` parallax as user scrolls past
- Project card images have a small internal parallax

### What's missing

**On the hero:** the parallax is only vertical + scroll-driven. Missing:
1. **Mouse parallax** — layers subtly react to mouse position (0-5° tilt on mouse move, capped)
2. **Depth of field** — background layers should blur slightly while foreground stays sharp
3. **Ambient particles** — 15-30 small floating dots (indigo/pink) drifting at different speeds, with occasional larger ones
4. **Terminal execution animation** — after SQL is written, show the query executing (a mini result appearing below)

**Section-to-section:** transitions are abrupt. Ideas:
1. **Wipe reveals** — as you scroll past section boundary, a diagonal wipe uncovers the next section
2. **Color washes** — each section has its own accent color, background subtly shifts as you enter
3. **Parallax layers behind each section** — subtle scrolling geometric shapes behind heavy-content sections (Projects, Experience) to give depth

### Suggested libraries

| Library | Purpose | Size |
|---|---|---|
| **Lenis** | Smooth scroll | ~4KB |
| **GSAP + ScrollTrigger** | Already in use — keep | — |
| **Splitting.js** | Text split for character-level animation | ~4KB |
| **Motion One** | Alternative to GSAP, smaller — only if replacing GSAP | ~5KB |
| **Barba.js** | Page transitions (if we add multi-page routes) | ~9KB |

Don't reach for Three.js unless the design truly demands 3D scenes beyond the cube we already have.

### Cinematic hero — recommended sequence

Target: 3-4 seconds from page load to fully-settled hero.

```
0.0s  Loading splash: ES logo fades in (200ms)
0.4s  Logo scales up + fades out
0.7s  Ambient particles start drifting in from edges (staggered)
0.9s  Mesh gradient layers fade in (600ms, staggered by 150ms)
1.2s  Badge slides in from top (300ms)
1.4s  "Hello, I'm" fades in
1.5s  Name scrambles + resolves character-by-character (800ms total)
2.0s  Role subtitle types on
2.5s  Description fades in (400ms)
2.8s  CTA buttons scale in (staggered)
3.0s  Stats count up from 0 to target (700ms)
3.2s  Terminal appears + SQL writes character-by-character (900ms)
3.9s  Floating chips scale in from center (back.out easing)
4.1s  Fully settled — scroll indicator pulses
```

Every element respects `prefers-reduced-motion` and skips animation.

---

## 6. Constraints & non-negotiables

Do NOT:
- Change branding: colors stay indigo (#6366F1) → pink (#EC4899) gradient; JetBrains Mono for code
- Remove the ES/EN toggle
- Break the data cube — it's a signature element and required
- Rip out GSAP for something exotic — GSAP is proven and works
- Add a JS framework (React, Vue, Svelte) — this must stay vanilla for edit speed and Netlify simplicity
- Break the n8n contact form flow — the Notion + WhatsApp pipeline is critical
- Lose the LaTeX CVs or the standalone Linktree

Do KEEP:
- All existing case study pages (project-*.html)
- The organization logo monograms + real logo hybrid
- The dark theme as default
- English as default with ES toggle
- All the SEO-ready copy already written for each section

Design language:
- Dark background primary (`#0a0a0f` range)
- Accent gradients: indigo → pink for CTAs and highlights
- Card style: subtle 1px border with gradient (indigo/pink at low opacity), rounded 12-22px, soft shadow
- Typography: sans-serif system stack; monospace = JetBrains Mono
- Section headers: number badge + title + horizontal line

---

## 7. Success criteria

Ship criteria for the next iteration:

1. Portfolio still deploys in <60s on Netlify with no build errors
2. Lighthouse: 95+ Performance / 95+ Accessibility / 100 Best Practices / 90+ SEO on mobile and desktop
3. The entrance sequence lasts 3-4 seconds and feels cinematic without blocking the user from scrolling
4. All existing functionality (contact form, GA tracking, CV downloads, i18n, cube, tilts, PDFs) still works
5. `prefers-reduced-motion` disables all decorative animations cleanly
6. Mobile experience matches desktop quality — no "desktop-only" effects that leave mobile empty
7. Every new interaction has a fallback (no library? no animation? Fine, page still functions)

---

## 8. Repository access

- Repo: `github.com/edwinsantosv/portfolio-v2.github.io`, branch `published`
- Deploy: Netlify auto-deploys on push to `published`
- No secrets in code — all API keys (Notion, n8n) live in n8n workflow only

Local dev:
```bash
git clone https://github.com/edwinsantosv/portfolio-v2.github.io.git
cd portfolio-v2.github.io
# Serve locally — any static server works:
python -m http.server 8080
# or: npx serve .
```

No build step required. Refresh browser to see changes.

---

## 9. What NOT to do (learnings from this iteration)

- Don't `position: sticky` a scroll-scene without matching section height — creates trailing empty scroll
- Don't `pin: true` + `scrub` on mobile without user warning — feels blocking
- Don't override GSAP transforms with inline `style.transform` on the same element (e.g., mouse-tilt on hero visual conflicts with scroll parallax GSAP)
- Don't apply `transform: translateZ(0)` to children of GSAP-animated elements — kills their animation
- Don't animate `clip-path` on mobile Safari without a fail-open guard (opacity 1 fallback after 2.5s)
- Don't forget: n8n Webhook node has its OWN CORS `allowedOrigins` — separate from the Respond node's headers. Both must match.

---

*Brief written by Zico (Edwin's OpenClaw assistant) after a full evening of pair-shipping. Sections above are prioritized but not sequential — pick and mix as fits the design system Fable 5 proposes.*

---

## Appendix A — Exact design tokens (from `styles.css`)

### Palette (dark theme — primary)

```css
/* Backgrounds */
--bg-0:      #0a0a0f;   /* base page */
--bg-1:      #0f0f17;   /* card background */
--bg-2:      #14141d;   /* elevated card */
--surface:   rgba(255, 255, 255, 0.03);
--surface-2: rgba(255, 255, 255, 0.05);
--border:        rgba(255, 255, 255, 0.08);
--border-strong: rgba(255, 255, 255, 0.14);

/* Text */
--text:       #e9e9f0;
--text-muted: #9499a8;
--text-dim:   #6a6f7e;

/* Accents */
--accent:      #6366f1;   /* indigo — primary CTA, links */
--accent-2:    #0ea5e9;   /* sky */
--accent-3:    #a855f7;   /* purple */
--accent-glow: rgba(99, 102, 241, 0.35);

/* Signal */
--success: #10b981;
--warning: #f59e0b;
--danger:  #ef4444;

/* Gradients */
--grad:       linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
--grad-soft:  linear-gradient(135deg, rgba(99,102,241,.15), rgba(168,85,247,.10));
```

### Radii
```css
--r-sm: 8px;    /* pills, small chips */
--r-md: 14px;   /* buttons, inputs */
--r-lg: 20px;   /* cards */
--r-xl: 28px;   /* hero cards, terminal */
```

### Shadows
```css
--shadow-1:    0 4px 24px rgba(0,0,0,.25);
--shadow-2:    0 16px 60px rgba(0,0,0,.35);
--shadow-glow: 0 0 0 1px rgba(99,102,241,.25), 0 12px 40px rgba(99,102,241,.15);
```

### Type
```css
--font-sans: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
```

### Motion
```css
--ease: cubic-bezier(.2, .8, .2, 1);   /* signature ease-out */
```

### Layout
```css
--container: 1180px;   /* max content width */
```

Full light theme overrides live under `[data-theme="light"]`. Dark is canonical, light must stay respectable.

---

## Appendix B — Visual references

### Portfolios & marketing pages worth studying

| Reference | What to steal |
|---|---|
| [linear.app](https://linear.app) | Section transitions, subtle gradient washes, keyboard-first micro-interactions |
| [vercel.com](https://vercel.com) | Cursor-follow ambient orb, marquee bands, edge-network 3D scene, dark UI polish |
| [apple.com/ipad-pro](https://www.apple.com/ipad-pro/) | Scroll-driven product reveal, pinned scenes with rotating device, chapter transitions |
| [awwwards.com/sites-of-the-day](https://www.awwwards.com/websites/sites_of_the_day/) | Cinematic entrances, custom cursors, WebGL flourishes |
| [rauno.me](https://rauno.me) | Minimal typography, thoughtful micro-animations, keyboard nav |
| [olivierlarose.com](https://www.olivierlarose.com/) | Text scramble, project reveal, cursor interactions (Rome/Locomotive patterns) |
| [zajno.com](https://zajno.com) | Bold section transitions, character-level text splitting |
| [read.cv](https://read.cv) | Minimal portfolio format focused on career narrative |

### For the entrance sequence specifically

Watch closely:
- Vercel homepage entrance (grid floor + gradient orb + hero text stagger)
- Apple's iPhone Air / iPad Pro opening sequence
- Linear's homepage on cold load (badge slides + gradient painter)

### Data-viz aesthetic references

- **observablehq.com** — for the terminal/code aesthetic in the hero
- **datawrapper.de** — clean chart-in-card visuals for the cube's "Model" and "Visualize" faces
- **numbers.substack** — for the Analytics/BI feel

---

## Appendix C — Timing budget (frame-by-frame)

### Cold load — first paint to interactive

| Phase | Duration | What happens | Fallback |
|---|---|---|---|
| Server → HTML | 0-200ms | Netlify CDN edge serves HTML from cache | — |
| CSS + fonts | 200-500ms | Critical CSS inline (top 15KB), fonts preload | System fonts if custom don't load in 800ms |
| JS bootstrap | 500-700ms | GSAP + Lenis + custom scripts | Everything degrades to CSS-only reveal |
| Splash screen | 700-1500ms | ES logo animates in and out | `sessionStorage` flag prevents repeat |

**Target time-to-interactive:** ~1.5s on 4G mobile · ~700ms on desktop cable.

### Hero entrance choreography (after splash)

Expanded from section 5, with easings:

| Time | Element | Property | Duration | Ease |
|---|---|---|---|---|
| 0.00s | Splash | Fade in ES mark | 200ms | `power2.out` |
| 0.40s | Splash | Scale up + fade out | 300ms | `power3.inOut` |
| 0.70s | Particles | Drift in from edges (staggered 15) | 800ms | `expo.out` |
| 0.90s | Mesh gradients | Fade in each layer (3 layers, stagger 150ms) | 600ms | `power2.out` |
| 1.20s | Hero badge | Slide down from top | 300ms | `expo.out` |
| 1.40s | "Hello, I'm" | Fade + tiny y-shift | 250ms | `power2.out` |
| 1.50s | Name | Scramble → resolve char-by-char | 800ms | `power1.inOut` |
| 2.00s | Role subtitle | Typewriter (chars per 50ms) | 500ms | linear |
| 2.50s | Description | Fade + y-shift | 400ms | `power2.out` |
| 2.80s | CTA buttons | Scale + stagger (2 buttons, 80ms) | 300ms | `back.out(1.7)` |
| 3.00s | Stats | Count up (0 → target) | 700ms | `power2.out` |
| 3.20s | Terminal | Fade + scale from 0.97 | 350ms | `expo.out` |
| 3.30s | Terminal code | Clip-path reveal (writing effect) | 900ms | `power2.inOut` |
| 3.90s | Chip 1 (Power BI) | Scale from 0.5 + slight rotate | 400ms | `back.out(2)` |
| 4.00s | Chip 2 (Power Platform) | Same, offset | 400ms | `back.out(2)` |
| 4.10s | Scroll hint | Pulse animation loops | ∞ | `sine.inOut` |

**Total:** 4.10s splash-end to fully-settled hero. First scroll cancels remaining loops.

### Section entrance (repeatable pattern)

When any section enters viewport (ScrollTrigger `top bottom-=100px`):

| Element | Delay | Duration | Ease |
|---|---|---|---|
| Section num | 0ms | 400ms | `expo.out` |
| Section title | 80ms | 500ms | `expo.out` |
| Section line (scaleX) | 160ms | 700ms | `power2.inOut` |
| Content block(s) | 250ms | 600ms | `expo.out` |
| Details (staggered) | 400ms+ | 500ms each | `expo.out` |

**Total per section:** ~900ms. Stays in the "fast" perception window.

### Scroll-driven scenes (data cube et al.)

- `scrub: 0.6` for lag/smoothing — feels premium without disorienting
- Long scenes (>2 screens): `pin: true` + `anticipatePin: 1`
- Short scenes (<1 screen): no pin, use `top bottom → bottom top` range

### `prefers-reduced-motion` budget

- Skip all splash and hero choreography — content appears instantly, fades only (≤200ms)
- Data cube: static at `rotateY(-45deg)` — no rotation
- Section entrances: opacity 0 → 1 only (no y-shift, no scale)
- Ambient particles: hidden
- Custom cursor: disabled

---

## Appendix D — Missing assets Fable 5 should request from Edwin

To unlock priority 3 (Content depth) and priority 4 (Interactive skills):

- Professional headshot (any res over 800x800, ideal 1200x1500 for retina)
- Screenshots of Power BI dashboards (blur client data if needed) — for case studies
- Brand assets: logo variants, favicons if any exist
- Reference screenshots of portfolios he likes (labeled with what he likes about each)

If none available:
- Use generic finance/analytics dashboard mockups from Figma community
- Keep the "ES" monogram avatar
- Keep current org logos + monograms hybrid

---

*End of brief.*

# Edwin Santos — Personal Portfolio

Personal portfolio, one-page Linktree landing and multi-format CVs for **Edwin Santos Vidal** — Business Analyst · Automation Consultant · Instructor. Based in Lima, working with international teams across the US, Canada and Europe.

**Live:** [edwinsantosv.github.io/portfolio-v2.github.io](https://edwinsantosv.github.io/portfolio-v2.github.io/)

## Repository contents

| File | Purpose | Live URL |
| --- | --- | --- |
| `index.html` | Main portfolio (Hero, About, Skills, Projects, Experience, Awards, Contact). Bilingual ES/EN. | [/](https://edwinsantosv.github.io/portfolio-v2.github.io/) |
| `linktree.html` | Standalone Linktree-style landing: Calendly, Email, WhatsApp, Portfolio, CV, LinkedIn, GitHub, awards. Ideal for bio links / QR codes. | [/linktree.html](https://edwinsantosv.github.io/portfolio-v2.github.io/linktree.html) |
| `cv.html` | Web-based CV, print-friendly (Ctrl+P → Save as PDF). | [/cv.html](https://edwinsantosv.github.io/portfolio-v2.github.io/cv.html) |
| `Edwin_Santos_CV.tex` / `.pdf` | Full 2-page CV (modern, colored). Good for tech/startup applications. | [PDF](https://edwinsantosv.github.io/portfolio-v2.github.io/Edwin_Santos_CV.pdf) |
| `Edwin_Santos_CV_1page.tex` / `.pdf` | Compact 1-page CV (modern, colored). Good for consulting/EU roles. | [PDF](https://edwinsantosv.github.io/portfolio-v2.github.io/Edwin_Santos_CV_1page.pdf) |
| `Edwin_Santos_CV_Harvard.tex` / `.pdf` | 1-page CV in Harvard OCS style (Times, no color). Good for MBA/MBB consulting/banking. | [PDF](https://edwinsantosv.github.io/portfolio-v2.github.io/Edwin_Santos_CV_Harvard.pdf) |
| `Edwin_Santos_Portfolio.tex` / `.pdf` | 4-page portfolio brochure: cover, featured projects with visuals, current consulting work, past highlights, awards + contact CTA. | [PDF](https://edwinsantosv.github.io/portfolio-v2.github.io/Edwin_Santos_Portfolio.pdf) |
| `styles.css` · `script.js` | Portfolio styling and interactivity (i18n ES/EN, dark/light theme toggle, reveal on scroll, contact form, counters). |
| `analytics.js` | Google Analytics 4 loader — shared across every HTML page. Inert until a real `G-XXXXXXXXXX` Measurement ID is set. See [Analytics](#analytics) section for setup. |
| `project-dark.css` · `project-dark.js` | Shared styling for individual project case pages. |
| `head_competition.html` · `spaceapps.html` · `DAX-query-automation.html` · `form-processing-ocr.html` · `data-analytics-assesing-risk.html` · `headcomp-dashboard.html` · `perform_joins_powerautomate.html` · `scholarship_website.html` | Individual project case studies linked from the portfolio. |
| `assets/` · `forms/` | Static images / illustrations used across pages. |

## Positioning

Three concurrent roles + ongoing MSc, targeting **senior / lead** opportunities:

- **Business Analyst @ CQ Fluency** (New Jersey, USA · remote · since 2023) — Power BI + Power Platform.
- **Automation Consultant @ Wings4U** (Prague, Czech Republic · remote · since 2026) — low-code + custom MCPs powering Customer Advocacy Intelligence.
- **Instructor @ USMP** (Lima, Perú · since 2026) — Power BI bootcamp, 100+ students trained.
- **MSc Business Analytics @ Pontificia Universidad Católica de Chile** (since 2026) — program ranked #1 in Latin America.

Career track record includes two 1st-place team-lead awards (HEAD Competition 2024, NASA Space Apps Lima 2021 · Global Nominee), prior BI leadership at Valia (Delaware) and Ove Decors (Montreal), and dual academic background in Mechanical Engineering + Analytics for Business (PUCP, Mohawk College).

## Contact

- **Email:** edwinrafaelsantosvidal@gmail.com
- **LinkedIn:** [linkedin.com/in/edwinsantosvidal](https://www.linkedin.com/in/edwinsantosvidal/)
- **GitHub:** [github.com/edwinsantosv](https://github.com/edwinsantosv)
- **WhatsApp:** +51 915 077 667
- **Calendly:** [calendly.com/edwinsantosvidal/30min](https://calendly.com/edwinsantosvidal/30min) *(update once configured)*

## Local development

The portfolio is 100% static — no build step, no dependencies. Just open the HTML files directly:

```bash
# Open the main portfolio
start index.html   # Windows
open  index.html   # macOS
xdg-open index.html  # Linux
```

To preview with a local server (recommended for consistent behavior of `data-i18n` and relative fetches):

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Compiling the LaTeX CVs

Requires a TeX distribution (TeX Live, MiKTeX, or Overleaf). Standard packages only — no custom fonts to install.

```bash
pdflatex Edwin_Santos_CV.tex
pdflatex Edwin_Santos_CV_1page.tex
pdflatex Edwin_Santos_CV_Harvard.tex
pdflatex Edwin_Santos_Portfolio.tex   # 4-page brochure with project screenshots
```

Each `.tex` is self-contained and compiles in one pass. On Overleaf: upload the `.tex` file → set compiler to *pdfLaTeX* → *Recompile*.

## Deployment

The site is served via **GitHub Pages** from the `published` branch of [`edwinsantosv/portfolio-v2.github.io`](https://github.com/edwinsantosv/portfolio-v2.github.io). Any push to `published` triggers a rebuild (~1 minute).

Two additional mirrors exist for legacy reasons:

- [`edwinsantosv/portfolio-v1`](https://github.com/edwinsantosv/portfolio-v1) → serves `main` at [edwinsantosv.github.io/portfolio-v1/](https://edwinsantosv.github.io/portfolio-v1/)
- [`edwinsantosv/portfolio-main.github.io`](https://github.com/edwinsantosv/portfolio-main.github.io) → serves `main`

The primary live is **`portfolio-v2.github.io`**. The others are kept in sync only when the copy is worth backporting.

## Analytics

Google Analytics 4 is wired up via a shared loader at `analytics.js`, included from every HTML page. It stays inert until a real Measurement ID is configured, so no traffic is sent while the placeholder is in place.

**One-time setup:**

1. Go to [analytics.google.com](https://analytics.google.com) → **Admin** → **Create property** (name: *Edwin Santos Portfolio*, timezone: America/Lima, currency: USD).
2. Inside the property → **Data Streams** → **Add stream** → **Web** → URL: `https://edwinsantosv.github.io/portfolio-v2.github.io/` → stream name: *Portfolio v2*.
3. Copy the **Measurement ID** (format `G-XXXXXXXXXX`).
4. Open `analytics.js` and replace the placeholder on the first non-comment line:

   ```js
   var GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // ← paste your ID here
   ```

5. Commit and push to `published`. GitHub Pages rebuilds in ~1 minute.
6. Verify in GA4 → **Reports → Realtime** while browsing the live site from another device or incognito window.

**Behavior notes:**

- Localhost and `127.0.0.1` are excluded automatically, so local dev sessions don't inflate stats.
- `anonymize_ip` is enabled by default for GDPR-friendly tracking.
- No cookie banner is bundled — add one if you plan to promote the site heavily in the EU.

## Tech stack

- **Frontend:** Vanilla HTML, CSS, JavaScript. No framework, no build. Bilingual via `data-i18n` attributes + inline `i18n` dictionary in `script.js`.
- **Design:** Custom dark theme with gradient meshes (indigo `#6366F1` + pink `#EC4899` accents), Inter + JetBrains Mono typography.
- **CV:** LaTeX (`article` class), Charter (modern variants) or Times / `mathptmx` (Harvard variant).
- **Hosting:** GitHub Pages (static, HTTPS-enforced).

## License

Personal portfolio. All content © Edwin Santos Vidal. Code snippets and styles may be reused with attribution.

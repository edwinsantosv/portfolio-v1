/*
 * Google Analytics 4 loader — shared across portfolio, linktree, cv and project pages.
 *
 * Setup:
 *   1. Create a GA4 property at https://analytics.google.com → Admin → Create property.
 *   2. Add a "Web" data stream pointing at https://edwinsantosv.github.io/portfolio-v2.github.io/.
 *   3. Copy the Measurement ID (format: G-XXXXXXXXXX).
 *   4. Replace the GA_MEASUREMENT_ID value below with the real ID and push to `published`.
 *
 * While the placeholder is in place, the script is inert — no network calls, no console noise.
 * Localhost and 127.0.0.1 are also excluded from tracking so dev sessions don't inflate stats.
 */
(function () {
  var GA_MEASUREMENT_ID = "G-V2CNC24LTD"; // <-- replace with your GA4 Measurement ID

  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") return;

  var host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1" || host === "") return;

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    page_path: window.location.pathname + window.location.search,
  });
})();

// Calendly popup — loads the widget only on first click.
// Fail-open: links keep their real href, so without JS (or if Calendly's
// script fails to load) they still open the booking page in a new tab.
(function () {
  var BASE = 'https://assets.calendly.com/assets/external/widget.';
  var loading = null;

  function loadWidget() {
    if (window.Calendly) return Promise.resolve();
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      var css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = BASE + 'css';
      document.head.appendChild(css);

      var js = document.createElement('script');
      js.src = BASE + 'js';
      js.async = true;
      js.onload = resolve;
      js.onerror = reject;
      document.head.appendChild(js);
    }).catch(function (err) {
      loading = null;
      throw err;
    });
    return loading;
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[data-calendly]');
    if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    var url = link.href;
    // window.open after an async load gets popup-blocked, so the fallback
    // navigates this tab instead.
    loadWidget()
      .then(function () { window.Calendly.initPopupWidget({ url: url }); })
      .catch(function () { window.location.href = url; });
  });

  // Warm the widget when the user shows intent, so the popup feels instant.
  ['pointerover', 'focusin'].forEach(function (type) {
    document.addEventListener(type, function (e) {
      if (e.target.closest && e.target.closest('a[data-calendly]')) loadWidget().catch(function () {});
    }, { passive: true });
  });
})();

/**
 * Client entry. Identical to Start's default, except that the app bundle is
 * evaluated and hydrated only after the browser has painted the server HTML.
 *
 * The entry script loads as an async module, so without this it can run in
 * the middle of parsing and hold the first frame back behind hydration. The
 * page is fully rendered on the server, so painting it first costs nothing and
 * brings first paint (and the headline, which is LCP) forward on mobile.
 */
let started = false;

function hydrate() {
  if (started) return;
  started = true;
  void import("./client-hydrate");
}

function afterFirstPaint() {
  // rAF runs just before the next frame; the task queued from it runs after
  // that frame is painted. The timeout covers tabs opened in the background,
  // where rAF does not fire.
  requestAnimationFrame(() => setTimeout(hydrate, 0));
  setTimeout(hydrate, 400);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", afterFirstPaint, { once: true });
} else {
  afterFirstPaint();
}

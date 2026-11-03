/* Plays page videos only while they are on screen (and visible), so the browser never decodes more than a handful at once.
   Videos paused by this gate resume when they scroll back in; videos paused by page logic (sequences, hover previews) are left alone. */
(function () {
  if (window.__vgate) return; window.__vgate = true;
  const seen = new WeakMap();
  const auto = v => v.autoplay || v.hasAttribute('autoplay') || v.loop || v.hasAttribute('loop');
  const hiddenByOpacity = v => { for (let el = v; el && el !== document.body; el = el.parentElement) if (el.style && el.style.opacity === '0') return true; return false; };
  const shown = v => seen.get(v) === true && document.visibilityState === 'visible' && !(v.hasAttribute('data-sv-vid') && hiddenByOpacity(v));
  function apply(v) {
    if (!v.isConnected) return;
    if (!shown(v)) { if (!v.paused) { v._vgPaused = true; v.pause(); } return; }
    if (v.paused && (v._vgPaused || (auto(v) && !v._vgStarted))) {
      v._vgPaused = false; v._vgStarted = true; v.muted = true;
      const p = v.play(); if (p && p.catch) p.catch(() => {});
    }
  }
  const io = new IntersectionObserver(es => es.forEach(e => { seen.set(e.target, e.isIntersecting); apply(e.target); }), { rootMargin: '150px 0px' });
  const track = root => { if (root.tagName === 'VIDEO') { io.observe(root); return; } if (root.querySelectorAll) root.querySelectorAll('video').forEach(v => io.observe(v)); };
  const start = () => {
    track(document.body);
    new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(n => n.nodeType === 1 && track(n)))).observe(document.body, { childList: true, subtree: true });
    // hover previews toggle visibility by opacity, not position: re-check them a few times a second
    setInterval(() => document.querySelectorAll('video[data-sv-vid]').forEach(apply), 400);
    document.addEventListener('visibilitychange', () => document.querySelectorAll('video').forEach(apply));
  };
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start);
})();

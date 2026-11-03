/* Page logic. Content comes from data/projects.js; markup is the <script type="text/html" id="view"> block in the HTML. */
(function () {
class Component extends DCLogic {
  // ── EDIT HERE ─────────────────────────────────────────────
  // One entry per case study. Order = prev/next order.
  // Block types: full, pair, imageText, text, video, mockup. ratio like '16/9'. cap = optional caption.
  // Images: drop them straight onto each placeholder in the preview. Video: set src to an .mp4 path.
  projects() {
    return NULL_DATA.caseStudies();
  }
  // ──────────────────────────────────────────────────────────
  state = { narrow: false, top: 0, rightW: 0 };
  asideRef = React.createRef();
  mainRef = React.createRef();
  stackVidRef = React.createRef();
  watchVideos() {
    if (!this._vio && 'IntersectionObserver' in window) {
      this._vio = new IntersectionObserver(es => es.forEach(e => {
        const v = e.target; if (!v.getAttribute('src')) return;
        if (v.hasAttribute('data-seq-src') && v.style.opacity !== '1') return;
        if (e.isIntersecting) v.play && v.play().catch(() => {}); else v.pause && v.pause();
      }), { rootMargin: '200px 0px' });
    }
    if (this._vio) document.querySelectorAll('video').forEach(v => { if (!v._nullObs) { v._nullObs = true; this._vio.observe(v); } });
  }
  syncStackVideo() {
    document.querySelectorAll('video').forEach(v => { if (!v.muted || !v.hasAttribute('muted')) { v.muted = true; v.defaultMuted = true; v.volume = 0; v.setAttribute('muted', ''); } });
    this.watchVideos();
    document.querySelectorAll('[data-seq]').forEach(box => {
      const vids = [...box.querySelectorAll('video[data-seq-src]')];
      const key = vids.map(v => v.getAttribute('data-seq-src')).join('|');
      if (!vids.length || /\{\{/.test(key) || box._seqKey === key) return;
      box._seqKey = key; box._seqI = 0;
      vids.forEach((v, j) => {
        v.loop = false; v.muted = true; v.setAttribute('src', v.getAttribute('data-seq-src')); v.style.opacity = j === 0 ? '1' : '0';
        v.onended = () => {
          if (box._seqKey !== key) return;
          const nx = vids[(j + 1) % vids.length];
          nx.currentTime = 0;
          const show = () => { nx.style.opacity = '1'; vids.forEach(o => { if (o !== nx) o.style.opacity = '0'; }); nx.removeEventListener('playing', show); };
          nx.addEventListener('playing', show);
          box._seqI = (j + 1) % vids.length;
          nx.play && nx.play().catch(() => {});
        };
      });
      vids[0].play && vids[0].play().catch(() => {});
    });
    document.querySelectorAll('video[data-list]').forEach(el => {
      const raw = el.getAttribute('data-list') || '';
      if (!raw || /\{\{/.test(raw)) return;
      el.loop = false;
      if (el._seqRaw === raw) return;
      const list = raw.split('|'); el._seqRaw = raw; el._seqI = 0;
      el.setAttribute('src', list[0]); el.muted = true; el.play && el.play().catch(() => {});
      if (!el._seqOn) { el._seqOn = true; el.addEventListener('ended', () => { const l = el._seqRaw.split('|'); el._seqI = (el._seqI + 1) % l.length; el.setAttribute('src', l[el._seqI]); el.play && el.play().catch(() => {}); }); }
    });
    document.querySelectorAll('video[data-src]').forEach(el => {
      if (el.getAttribute('data-list')) return;
      const want = el.getAttribute('data-src');
      if (want && !/\{\{/.test(want) && el.getAttribute('src') !== want) { el.setAttribute('src', want); el.muted = true; el.play && el.play().catch(() => {}); }
    });
    const v = this.stackVidRef.current; if (!v) return;
    const want = this._stackSrc || '';
    if (want && v.getAttribute('src') !== want) { v.setAttribute('src', want); v.play && v.play().catch(() => {}); }
    if (!want && v.getAttribute('src')) v.removeAttribute('src');
  }
  componentDidUpdate() { clearTimeout(this._mgT); this._mgT = setTimeout(() => this.fixMobileGaps(), 60); this.syncSeq(); this.syncTrophy(); this.syncStackVideo(); this.syncCards(); if (this._watchMarks) requestAnimationFrame(this._watchMarks); }
  intro() {
    const m = this.mainRef.current; if (!m) return;
    if (this.isOverlay()) {
      m.style.opacity = '1';
      const post = () => { try { parent.postMessage({ nullCase: 'ready' }, '*'); } catch (e) {} };
      requestAnimationFrame(post);
      return;
    }
    if (!m.animate) { m.style.opacity = '1'; return; }
    let fx = null;
    try { sessionStorage.removeItem('nullCaseFx'); } catch (e) {}
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = 'cubic-bezier(0.65,0,0.35,1)';
    const aside = m.querySelector('aside'), art = m.querySelector('article');
    const kv = art && art.querySelector('[data-kv="1"]');
    const kvBlock = fx && kv ? [...art.children].find(c => c.contains(kv)) : null;
    const parts = [aside, ...(art ? [...art.children] : [])].filter(el => el && el !== kvBlock);
    const reveal = (d0) => { m.style.opacity = '1'; parts.forEach((el, i) => el.animate(
      [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }],
      { duration: reduce ? 200 : 600, delay: d0 + (reduce ? 0 : Math.min(i, 4) * 90), easing: ease, fill: 'backwards' })); };
    if (!fx || reduce) { reveal(0); return; }
    const tr = kv ? kv.getBoundingClientRect() : null;
    if (!tr) { reveal(0); return; }
    kv.style.opacity = '0';
    const clone = document.createElement('div');
    Object.assign(clone.style, { position: 'fixed', left: fx.x + 'px', top: fx.y + 'px', width: fx.w + 'px', height: fx.h + 'px', zIndex: 70, pointerEvents: 'none',
      background: fx.src ? '#1a1a19 center / cover no-repeat url("' + fx.src + '")' : '#1a1a19', transformOrigin: '0 0' });
    document.body.appendChild(clone);
    const sx = tr.width / fx.w, sy = tr.height / fx.h, dx = tr.left - fx.x, dy = tr.top - fx.y;
    const anim = clone.animate([{ transform: 'none' }, { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sx + ',' + sy + ')' }], { duration: 720, easing: ease, fill: 'forwards' });
    reveal(420);
    anim.onfinish = () => { kv.style.opacity = ''; const f = clone.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: 'forwards' }); f.onfinish = () => clone.remove(); };
  }
  isOverlay() {
    try { return window.parent !== window && new URLSearchParams(location.search).get('overlay') === '1'; } catch (e) { return false; }
  }
  nav(e, href, dir) {
    if (!this.isOverlay() || !href) return;
    if (e && (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1)) return;
    if (e) e.preventDefault();
    try { parent.postMessage({ nullCase: 'nav', href: href.replace('&overlay=1', ''), dir }, '*'); } catch (err) {}
  }
  close(e) {
    if (this.isOverlay()) { if (e) e.preventDefault(); try { parent.postMessage({ nullCase: 'close' }, '*'); } catch (err) {} return; }
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    const m = this.mainRef.current, kv = m && m.querySelector('[data-kv="1"]');
    if (!m || !m.animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    e.preventDefault();
    const r = kv ? kv.getBoundingClientRect() : { left: 0, top: 0, width: 0, height: 0 };
    let ref = ''; try { ref = decodeURIComponent(document.referrer || ''); } catch (err) {}
    const back = ref.indexOf('null_ Site v2') !== -1 && history.length > 1;
    try { sessionStorage.setItem('nullCaseReturn', JSON.stringify({ slug: this._slug, x: r.left, y: r.top, w: r.width, h: r.height, src: this._kvImg, t: Date.now() })); } catch (err) {}
    const fade = [m, document.querySelector('header')].filter(Boolean);
    fade.forEach(el => el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 240, easing: 'ease-out', fill: 'forwards' }));
    setTimeout(() => { if (back) history.back(); else location.href = 'index.html'; }, 260);
  }
  layoutCards(box) {
    // carousel across the full width of the content column. Positions are solved in projected (on-screen) space:
    // each side card's visible right/left edge is spaced evenly from the centre card out to the column edge.
    const cards = [...box.querySelectorAll('[data-card]')], n = cards.length; if (!n) return;
    const top = box._top || 0, W = box.clientWidth, narrow = innerWidth < 860, P = 2000, DZ = 120;
    const cw = W * (narrow ? 0.58 : 0.42), ch = cw * 720 / 400, H = Math.round(ch / 0.96);
    box.style.height = H + 'px';
    const cx = W / 2, y0 = (H - ch) / 2, aR = Math.floor(n / 2), aL = Math.ceil(n / 2) - 1;
    const k = a => P / (P + a * DZ), th = a => Math.min(a, 2) * 18, hw = a => cw / 2 * Math.cos(th(a) * Math.PI / 180) * k(a);
    const main = box.closest('main'); if (main) main.style.overflowX = 'clip'; document.documentElement.style.overflowX = 'clip';
    cards.forEach((el, i) => {
      let o = (i - top + n) % n; if (o > n / 2) o -= n;
      const a = Math.abs(o), sg = Math.sign(o), amax = sg > 0 ? aR : aL;
      let rel = 0;
      if (a) { const edge = cw / 2 + (a / amax) * (W / 2 - cw / 2); rel = (edge - hw(a)) / k(a); }
      el.style.width = cw.toFixed(1) + 'px'; el.style.height = ch.toFixed(1) + 'px';
      el.style.zIndex = String(n - a);
      el.style.transform = 'translate(' + (cx + sg * rel - cw / 2).toFixed(1) + 'px,' + y0.toFixed(1) + 'px) translateZ(' + (-a * DZ) + 'px) rotateY(' + (-sg * th(a)) + 'deg)';
      el.style.filter = '';
      const vd = el.querySelector('video'); if (vd) vd.style.filter = a === 0 ? 'none' : 'grayscale(1) brightness(' + Math.max(0.35, 0.8 - (a - 1) * 0.18).toFixed(2) + ') blur(' + (1 + a * 0.6).toFixed(1) + 'px)';
      el.setAttribute('data-off', String(o));
    });
  }
  flickCards(box, dir) {
    const n = box.querySelectorAll('[data-card]').length; if (n < 2) return;
    box._top = ((box._top || 0) + dir + n) % n; this.layoutCards(box);
  }
  syncCards() {
    document.querySelectorAll('[data-cards]').forEach(box => {
      if (/\{\{/.test(box.getAttribute('data-cards') || '')) return;
      this.layoutCards(box);
      if (box._bound) return; box._bound = true;
      let down = null;
      box.addEventListener('pointerdown', e => { down = { x: e.clientX, y: e.clientY, t: performance.now() }; box.style.cursor = 'grabbing'; });
      const up = e => { box.style.cursor = 'grab'; if (!down) return; const dx = e.clientX - down.x, dy = e.clientY - down.y; down = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) { this.flickCards(box, dx < 0 ? 1 : -1); return; }
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) { const card = e.target.closest && e.target.closest('[data-card]'), o = card ? parseInt(card.getAttribute('data-off'), 10) || 0 : 0; this.flickCards(box, o || 1); } };
      box.addEventListener('pointerup', up); box.addEventListener('pointercancel', () => { down = null; box.style.cursor = 'grab'; });
      if ('ResizeObserver' in window) { let w = 0; new ResizeObserver(() => { if (box.clientWidth !== w) { w = box.clientWidth; this.layoutCards(box); } }).observe(box); }
      addEventListener('resize', () => this.layoutCards(box));
    });
  }
  dflip(box) {
    if (!box || box._busy) return;
    const inner = box.querySelector('[data-dflip-in]'), dm = document.querySelector('#' + box.getAttribute('data-dflip') + ' [data-dmap]');
    const f = box.querySelector('[data-face="front"]'), bk = box.querySelector('[data-face="back"]'); if (!inner || !f || !bk) return;
    const toBack = !box._back, reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const swap = () => { f.style.opacity = toBack ? '0' : '1'; bk.style.opacity = toBack ? '1' : '0'; };
    if (reduce) { swap(); box._back = toBack; return; }
    box._busy = true; const D = 1100, t0 = performance.now(), ease = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; let swapped = false;
    const step = now => {
      const p = Math.min(1, (now - t0) / D), e = ease(p), ang = e * 180, k = Math.sin(Math.PI * p);
      if (!swapped && ang >= 90) { swap(); swapped = true; }
      const shown = ang < 90 ? ang : ang - 180;
      inner.style.transform = 'rotateY(' + (toBack ? shown : -shown).toFixed(2) + 'deg) scale(' + (1 - 0.06 * k).toFixed(3) + ')';
      if (dm) dm.setAttribute('scale', (k * 90).toFixed(1));
      if (p < 1) requestAnimationFrame(step); else { inner.style.transform = ''; if (dm) dm.setAttribute('scale', '0'); box._back = toBack; box._busy = false; }
    };
    requestAnimationFrame(step);
  }
  fitMarks() {
    document.querySelectorAll('[data-marktext]').forEach(row => {
      const p = row.querySelector('p'), m = row.querySelector('[data-mark]'); if (!p || !m) return;
      const [a, b] = row.getAttribute('data-marktext').split('/').map(Number), k = a / b, Rw = row.clientWidth;
      if (!Rw || !k) return;
      const cap = Rw * 0.4; let mw = Math.min(cap, 96);
      for (let n = 0; n < 6; n++) { m.style.width = mw + 'px'; const nw = Math.min(cap, p.offsetHeight * k); if (Math.abs(nw - mw) < 0.5) break; mw = nw; }
      m.style.width = Math.round(mw) + 'px'; m.style.height = Math.round(mw / k) + 'px';
    });
  }
  // Mobile: one gap between every piece of media, on every case study (blocks stack their own images with their own gaps otherwise).
  fixMobileGaps() {
    const G = '16px', narrow = innerWidth < 860, root = document.querySelector('article') || document.querySelector('main');
    document.querySelectorAll('article, main').forEach(el => { if (el.dataset.g0 == null) el.dataset.g0 = el.style.rowGap || ''; });
    const art = document.querySelector('article'); if (art) art.style.rowGap = narrow ? G : art.dataset.g0;
    if (!root) return;
    const media = 'img,video,iframe,canvas,image-slot,null-stage,x-import,[role="img"]';
    root.querySelectorAll('div').forEach(el => {
      if (el.closest('[data-cards],[data-trophy],header,dl,aside')) return;
      if (el.dataset.mg == null) el.dataset.mg = el.style.gap || '';
      if (!narrow) { if (el.dataset.mg !== '') el.style.gap = el.dataset.mg; return; }
      const cs = getComputedStyle(el); if (!/flex|grid/.test(cs.display) || parseFloat(cs.rowGap) < 8) return;
      const kids = [...el.children]; if (kids.filter(k => k.matches(media) || k.querySelector(media)).length < 2) return;
      el.style.rowGap = G; el.style.columnGap = G;
    });
  }
  componentDidMount() {
    this._mgR = () => this.fixMobileGaps(); addEventListener('resize', this._mgR); setTimeout(this._mgR, 120); setTimeout(this._mgR, 900);
    // Wiggle frames in case-study rows: 1-2-3-4-3-2 at ~8 fps (reduced motion: first frame only).
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) this._wigT = setInterval(() => {
      document.querySelectorAll('[data-wig]').forEach(el => {
        const v = el.getAttribute('data-wig'); if (!v) return;
        if (el._v !== v) {
          el._v = v; el._k = 0; el.querySelectorAll('[data-wl]').forEach(n => n.remove());
          if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
          el._L = v.split('|').map((u, j) => { const n = document.createElement('div'); n.setAttribute('data-wl', ''); Object.assign(n.style, { position: 'absolute', inset: '0', backgroundImage: 'url("' + u + '")', backgroundSize: 'cover', backgroundPosition: 'center', visibility: j ? 'hidden' : 'visible' }); el.appendChild(n); return n; });
        }
        const seq = [0, 1, 2, 3, 2, 1], prev = seq[el._k]; el._k = (el._k + 1) % seq.length; const nx = seq[el._k];
        if (prev !== nx) { el._L[nx].style.visibility = 'visible'; el._L[prev].style.visibility = 'hidden'; }
      });
    }, 125);
    setTimeout(() => { this.syncSeq(); this.syncTrophy(); }, 0);
    this._markRO = new ResizeObserver(() => { if (this._fitting) return; this._fitting = true; this.fitMarks(); requestAnimationFrame(() => { this.fitMarks(); this._fitting = false; }); });
    this._watchMarks = () => { document.querySelectorAll('[data-marktext]').forEach(r => { if (!r._obs) { r._obs = 1; this._markRO.observe(r); } }); this.fitMarks(); };
    this._onMarkResize = () => { this.fitMarks(); requestAnimationFrame(() => this.fitMarks()); }; addEventListener('resize', this._onMarkResize);
    setTimeout(this._watchMarks, 50); if (document.fonts) document.fonts.ready.then(() => { document.querySelectorAll('[data-marktext]').forEach(r => r._w = 0); this._watchMarks(); });
    try { if (!new URLSearchParams(location.search).get('p') && !this.isOverlay()) { location.replace('index.html'); return; } } catch (e) {}
    this.intro();
    this.syncStackVideo(); setTimeout(() => this.syncCards(), 0);
    this.onKey = ev => {
      if (!this.isOverlay()) return;
      if (ev.key === 'Escape') this.close(ev);
      else if (ev.key === 'ArrowRight') this.nav(ev, this._next, 1);
      else if (ev.key === 'ArrowLeft') this.nav(ev, this._prev, -1);
    };
    addEventListener('keydown', this.onKey);
    this.onR = () => {
      const n = innerWidth < 860, el = this.asideRef.current;
      const top = el && !n ? Math.min(0, innerHeight - el.scrollHeight) : 0;
      const arrow = document.querySelector('[aria-label="Previous project"]'), main = el && el.parentElement;
      let rightW = 0;
      if (arrow && main && !n) {
        const cs = getComputedStyle(main), gap = parseFloat(cs.columnGap) || 0, pr = parseFloat(cs.paddingRight) || 0;
        rightW = Math.max(0, Math.round(innerWidth - (arrow.getBoundingClientRect().left + 6) - pr - gap - (innerWidth - document.documentElement.clientWidth)));
      }
      if (n !== this.state.narrow || top !== this.state.top || rightW !== this.state.rightW) this.setState({ narrow: n, top, rightW });
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(this.onR);
    addEventListener('resize', this.onR); this.onR();
  }
  syncTrophy() {
    const m = this.mainRef.current, sec = m && m.querySelector('[data-trophy]'), b = this._curP && (this._curP.blocks || []).find(x => x.type === 'trophy');
    if (this._tro && this._tro.sec === sec) return;
    if (this._tro) { removeEventListener('scroll', this._tro.on); removeEventListener('resize', this._tro.on); cancelAnimationFrame(this._tro.raf); this._tro = null; }
    if (!sec || !b) { if (sec || b) setTimeout(() => this.syncTrophy(), 120); return; }
    const f0 = (b.from || 1) - 1, f1 = (b.to || b.n) - 1, cv = sec.querySelector('canvas'), ctx = cv.getContext('2d'), fr = new Array(b.n), t = this._tro = { sec, cur: f0, drawn: -1 };
    const draw = () => { let k = t.cur; while (k > f0 && !fr[k]) k--; if (!fr[k] || k === t.drawn) return; ctx.clearRect(0, 0, b.w, b.h); ctx.drawImage(fr[k], 0, 0, b.w, b.h); t.drawn = k; };
    // Plays on its own from the first frame (ping-pong, ~24 fps); reduced motion keeps the first frame.
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches; let dir = 1, last = 0;
    t.on = () => {};
    const step = now => { if (this._tro !== t) return; if (!still && now - last > 42) { last = now; let n = t.cur + dir; if (n > f1 || n < f0) { dir = -dir; n = t.cur + dir; } if (fr[n]) t.cur = n; draw(); } t.raf = requestAnimationFrame(step); };
    const load = k => new Promise(res => { const im = new Image(); im.decoding = 'async'; im.onload = () => { fr[k] = im; if (this._tro === t) { t.drawn = -1; draw(); } res(); }; im.onerror = res; im.src = b.dir + String(k + 1).padStart(4, '0') + '.webp'; });
    load(f0).then(async () => { t.raf = requestAnimationFrame(step); for (let k = f0 + 1; k <= f1 && this._tro === t; k += 6) await Promise.all([0, 1, 2, 3, 4, 5].filter(d => k + d <= f1).map(d => load(k + d))); });
  }
  syncSeq() {
    const s = this._curP && this._curP.scrollSeq, narrow = innerWidth < 860, key = s && !narrow ? s.dir : null;
    if (this._seq && this._seq.key === key) return;
    if (this._seq) { this._seq.el.remove(); removeEventListener('scroll', this._seq.on); cancelAnimationFrame(this._seq.raf); document.body.style.backgroundColor = this._seq.bodyBg; this._seq = null; }
    if (!key) return;
    const el = document.createElement('canvas'); el.width = s.w; el.height = s.h; el.setAttribute('aria-hidden', 'true');
    Object.assign(el.style, { position: 'fixed', right: '0', top: '50%', width: 'min(48vw, 920px)', height: 'auto', aspectRatio: s.w + '/' + s.h,
      transform: 'translateY(-50%)' + (s.flip ? ' scaleX(-1)' : ''), pointerEvents: 'none', zIndex: '-1', opacity: '0', transition: 'opacity 0.6s cubic-bezier(0.65,0,0.35,1)' });
    document.body.appendChild(el);
    const ctx = el.getContext('2d'), frames = new Array(s.n), q = { key, el, cur: s.from || 0, tgt: s.from || 0, raf: 0, drawn: -1, bodyBg: document.body.style.backgroundColor };
    document.documentElement.style.backgroundColor = document.documentElement.style.backgroundColor || '#0b0b0b'; document.body.style.backgroundColor = 'transparent';
    const draw = () => {
      let i = Math.round(q.cur), j = i; while (j >= 0 && !frames[j]) j--; if (j < 0) { j = i; while (j < s.n && !frames[j]) j++; }
      if (j >= 0 && j < s.n && frames[j] && j !== q.drawn) { ctx.clearRect(0, 0, s.w, s.h); ctx.drawImage(frames[j], 0, 0); q.drawn = j; }
    };
    const tick = () => { q.cur += (q.tgt - q.cur) * 0.18; if (Math.abs(q.tgt - q.cur) < 0.02) q.cur = q.tgt; draw(); q.raf = q.cur !== q.tgt ? requestAnimationFrame(tick) : 0; };
    // Hidden while the key visual is on screen; fades in and starts turning once it has scrolled past.
    q.on = () => {
      const kv = document.querySelector('[data-kv="1"]') || document.querySelector('[data-kvv="1"]') || document.querySelector('article > *');
      const kb = kv ? kv.getBoundingClientRect().bottom + scrollY : 0, cTop = innerHeight / 2 - el.offsetHeight / 2;
      const start = Math.max(0, kb - cTop - el.offsetHeight * 0.3), past = scrollY >= start;
      el.style.opacity = past ? '1' : '0';
      const max = document.documentElement.scrollHeight - innerHeight - start;
      const f0 = s.from || 0, f1 = s.to ?? s.n - 1;
      q.tgt = f0 + (max > 0 ? Math.min(1, Math.max(0, (scrollY - start) / max)) : 0) * (f1 - f0); if (!q.raf) q.raf = requestAnimationFrame(tick);
    };
    addEventListener('scroll', q.on, { passive: true });
    const load = k => new Promise(res => { const im = new Image(); im.decoding = 'async'; im.onload = () => { frames[k] = im; q.drawn = -1; draw(); res(); }; im.onerror = res; im.src = s.dir + String(k + 1).padStart(2, '0') + '.webp'; });
    const F0 = s.from || 0, F1 = s.to ?? s.n - 1;
    load(F0).then(async () => { q.on(); for (let k = F0 + 1; k <= F1; k += 4) { await Promise.all([k, k + 1, k + 2, k + 3].filter(v => v <= F1).map(load)); if (this._seq !== q) return; } });
    this._seq = q;
  }
  componentWillUnmount() { clearInterval(this._wigT); if (this._tro) { removeEventListener('scroll', this._tro.on); removeEventListener('resize', this._tro.on); cancelAnimationFrame(this._tro.raf); } if (this._seq) { this._seq.el.remove(); removeEventListener('scroll', this._seq.on); document.body.style.backgroundColor = this._seq.bodyBg; } if (this._vio) this._vio.disconnect(); removeEventListener('resize', this.onR); removeEventListener('keydown', this.onKey); }
  renderVals() {
    let list;
    let slug = '';
    try { slug = new URLSearchParams(location.search).get('p') || ''; } catch (e) {}
    const all = this.projects(), curP = all.find(q => q.slug === slug) || all[0];
    const group = q => typeof q.stage === 'number' ? 'av' : q.section;
    // Documentation: only projects with an on-site set page are in the prev/next loop (Instagram-linked ones are skipped).
    list = all.filter(q => group(q) === group(curP) && (q.section !== 'Documentation' || q.onSite));
    if (!list.length) list = [curP];
    const i = Math.max(0, list.findIndex(p => p.slug === slug));
    const p = list[i], n = list.length, prev = list[(i - 1 + n) % n], next = list[(i + 1) % n]; this._curP = p;
    const ov = this.isOverlay(), href = q => 'case-study.html?p=' + q.slug + (ov ? '&overlay=1' : '');
    this._stackSrc = (p.blocks.find(b => b.type === 'stackVideo') || {}).video || '';
    const blocks = p.blocks.map((b, k) => {
      const id = 'cs-' + p.slug + '-' + (k + 1), arr = Array.isArray(b.ph), phs = arr ? b.ph : [b.ph, b.ph];
      return {
        ...b, id, idA: id + 'a', idB: id + 'b', phA: phs[0], phB: phs[1], ph: phs[0],
        isMarkText: b.type === 'markText',
        blendMode: b.blend ? 'lighten' : 'normal', vBg: b.blend ? 'transparent' : '#141413', zoom: b.zoom || 1,
        isEmbed: b.type === 'embed', embedUrl: b.type === 'embed' ? (() => { if (b.stream) { const host = 'https://customer-9dru1dt3vck0fikg.cloudflarestream.com/' + b.stream; return host + '/iframe?poster=' + encodeURIComponent(host + '/thumbnails/thumbnail.jpg?time=' + (b.thumbTime || '3s') + '&height=600') + '&primaryColor=%23f2f2ef&letterboxColor=%230b0b0b'; } const m = (b.url || '').match(/(?:v=|youtu\.be\/|embed\/)([\w-]{6,})/); if (!m) return b.url; let o = ''; try { o = /^https?:/.test(location.origin) ? '&origin=' + encodeURIComponent(location.origin) : ''; } catch (e) {} return 'https://www.youtube.com/embed/' + m[1] + '?rel=0&playsinline=1' + o; })() : '',
        isDFlip: b.type === 'dflip', hasSide: Array.isArray(b.side) && b.side.length > 0, dfCols: Array.isArray(b.side) && b.side.length && !this.state.narrow ? 'minmax(0,1fr) minmax(0,1fr)' : 'minmax(0,1fr)', sideItems: (Array.isArray(b.side) ? b.side : []).map(si => ({ ratio: si.ratio, alt: si.alt || '', bg: 'url(' + si.img + ')' })), fid: 'dflip-' + p.slug + '-' + k, furl: 'url(#dflip-' + p.slug + '-' + k + ')', altFront: b.altFront || '', altBack: b.altBack || '',
        dflip: e => this.dflip(e.currentTarget),
        isFlip: b.type === 'flip', hint: b.hint || '', bgFront: b.front ? 'url(' + b.front + ')' : 'none', bgBack: b.back ? 'url(' + b.back + ')' : 'none',
        flipT: (this.state.flips || {})[id] ? 'rotateY(180deg)' : 'rotateY(0deg)',
        flip: e => { const t = e.currentTarget.querySelector('[data-tilt]'); if (t) t.style.setProperty('--shine', '0'); this._flipUntil = performance.now() + 900; this.setState(s => ({ flips: { ...(s.flips || {}), [id]: !(s.flips || {})[id] } })); },
        tilt: e => { if (e.pointerType !== 'mouse') return; const el = e.currentTarget, r = el.getBoundingClientRect(), dx = (e.clientX - r.left) / r.width - 0.5, dy = (e.clientY - r.top) / r.height - 0.5, t = el.querySelector('[data-tilt]'); if (t) { t.style.transform = 'rotateX(' + (-dy * 14).toFixed(2) + 'deg) rotateY(' + (dx * 16).toFixed(2) + 'deg) translateZ(40px) scale(1.04)'; t.style.setProperty('--mx', ((0.5 - dx) * 100).toFixed(1) + '%'); t.style.setProperty('--my', ((0.5 - dy) * 100).toFixed(1) + '%'); t.style.setProperty('--shine', performance.now() > (this._flipUntil || 0) ? '1' : '0'); } },
        untilt: e => { const t = e.currentTarget.querySelector('[data-tilt]'); if (t) { t.style.transform = ''; t.style.setProperty('--shine', '0'); } },
        isGrid: b.type === 'grid', gcols: this.state.narrow ? 'minmax(0,1fr)' : (b.cols || '1fr 1fr').split(' ').map(t => 'minmax(0,' + t + ')').join(' '), galign: b.align || 'start',
        gitems: (b.items || []).filter(gi => !(this.state.narrow && gi.empty)).map(gi => gi.empty ? { role: 'presentation', alt: '', ratio: 'auto', bgc: 'transparent', mb: 'normal', pos: 'center', bg: 'none', video: '' } : { role: 'img', alt: gi.alt || '', ratio: gi.ratio || '3/2', bgc: gi.blend ? 'transparent' : '#141413', mb: gi.blend ? 'lighten' : 'normal', pos: gi.pos || 'center', bg: gi.img ? 'url(' + gi.img + ')' : 'none', video: gi.video || '' }),
        tLine: b.cont ? 'transparent' : '#2a2a2a', tPad: b.cont ? '0' : 'clamp(24px,4vw,56px) 0', label: b.label || '',
        isSeqRow: b.type === 'seqRow', isTrio: b.type === 'trio', isBleedVideo: b.type === 'bleedVideo', ratioA: b.ratioA || '2/3', vratio: b.vratio || '16/9',
        isPosterTitle: b.type === 'posterTitle', bgPoster: b.poster ? 'url(' + b.poster + ')' : 'none', bgTitle: b.title ? 'url(' + b.title + ')' : 'none',
        ratio: b.ratio || '16/9', cap: b.cap || '', src: b.src || (b.list && b.list[0]) || '', noSrc: !(b.src || (b.list && b.list.length)), listStr: (b.list || []).join('|'), bgSize: b.fit || 'cover',
        mt: b.tight ? 'calc(clamp(16px,2vw,28px) - clamp(32px,4.6vw,96px))' : '0px',
        isMixRow: b.type === 'mixRow', mix: (b.items || []).map(it => { const [rw, rh] = (it.ratio || '4/5').split('/').map(Number), ar = rw / rh, src = it.img || (it.frames && it.frames[0]) || ''; return { ratio: it.ratio || '4/5', alt: it.alt || '', flex: ar.toFixed(4) + ' 1 ' + Math.round(ar * 150) + 'px', bg: src ? 'url("' + src + '")' : 'none', wig: it.frames ? it.frames.join('|') : '' }; }),
        tLogo: !!b.logo, tLogoBg: b.logo ? 'url(' + b.logo + ')' : 'none', tLogoAr: b.logoAr || '4/1', tLogoAlt: b.logoAlt || '',
        isVideoRow: b.type === 'videoRow', vids: (b.vids || []).map(v => ({ ratio: '4/5', alt: '', ...v })),
        isRule: b.type === 'rule',
        isCards: b.type === 'cards', cardsH: this.state.narrow ? '85vh' : '100vh', cards: (b.cards || []).map((src, j) => ({ src, i: String(j), alt: (b.alt || '') + ' — ' + (j + 1) + ' of ' + b.cards.length })),
        isSeq: !!(b.list && b.list.length) && b.type !== 'seqRow', seqBlend: b.pill || b.noBlend ? 'normal' : 'lighten', fMargin: b.center ? '0 auto' : '0', radius: b.pill ? '9999px' : '0', border: b.pill ? '1px solid #333333' : 'none', seq: (b.list || []).map((src, j) => ({ src, op: j === 0 ? 1 : 0 })), maxW: b.maxW || '100%',
        noImgA: !b.imgA, noImgB: !b.imgB, imgA: b.imgA || '', imgB: b.imgB || '',
        bgCol: b.bgCol || '#141413', bgColFull: b.blend ? 'transparent' : (b.bgCol || '#1a1a19'), imgBlend: b.blend ? 'lighten' : 'normal', bgPos: b.bgPos || 'center', imgW: b.imgW || '100%',
        isPixels: b.type === 'pixels', panels: (b.panels || []).map((pn, j) => ({ name: pn.name, n: String(j + 1).padStart(2, '0'),
          cells: pn.rows.join('').split('').map(ch => ({ c: ch === '#' ? '#f2f2ef' : ch === 'y' ? '#f4ff12' : 'transparent' })) })),
        isPalette: b.type === 'palette', cells: (b.cells || []).map((cl, j) => {
          const key = k + '-' + j, on = this.state.palHover === key, top = j % 2 === 0;
          return { ...cl, n: String(j + 1).padStart(2, '0'), bg: 'url(' + cl.img + ')', dir: top ? 'column' : 'column-reverse', jc: top ? 'flex-start' : 'flex-end',
            photoH: on ? '38%' : '65%',
            enter: () => this.setState({ palHover: key }), leave: () => this.setState({ palHover: null }),
            tap: () => this.setState(s => ({ palHover: s.palHover === key ? null : key })) };
        }),
        img: b.img || '', noImg: !b.img, hasStage3d: typeof b.stage3d === 'number', stage3d: b.stage3d, noImgNoStage: !b.img && typeof b.stage3d !== 'number', bgImg: b.img ? 'url(' + b.img + ')' : 'none', alt: b.alt || '', kv: k === 0 ? '1' : '0',
        isStackVideo: b.type === 'stackVideo', bgA: b.imgA ? 'url(' + b.imgA + ')' : 'none', bgB: b.imgB ? 'url(' + b.imgB + ')' : 'none',
        isFull: b.type === 'full', isPair: b.type === 'pair', isImageText: b.type === 'imageText', isMarkVideo: b.type === 'markVideo',
        ...(b.crop ? (() => { const [cx, cy, cw, ch, VW, VH] = b.crop; return { cropRatio: cw + '/' + ch, vW: (VW / cw * 100) + '%', vH: (VH / ch * 100) + '%', vL: (-cx / cw * 100) + '%', vT: (-cy / ch * 100) + '%' }; })() : {}),
        isText: b.type === 'text', isVideo: b.type === 'video' && !(b.list && b.list.length), isMockup: b.type === 'mockup', isCta: b.type === 'cta', isTrophy: b.type === 'trophy', text: b.text || '', href: b.href || '#', label: b.label || '',
      };
    });
    const isDoc = p.section === 'Documentation';
    const rows = isDoc ? [
      { label: 'Artist', values: [p.artist] },
      { label: 'Event', values: [p.event] },
      { label: 'Location', values: [p.location] },
      { label: 'Date', values: [p.year] },
      ] : [
      { label: 'Client', values: [p.client] },
      { label: 'Year', values: [p.year] },
      { label: 'Location', values: [p.location] },
      { label: 'Services', values: p.services },
    ];
    const narrow = this.state.narrow;
    this._slug = p.slug; this._kvImg = (p.blocks[0] && p.blocks[0].img) || '';
    this._prev = href(prev); this._next = href(next);
    const toEmbed = u => {
      if (!u) return '';
      let m = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/); if (m) { let o = ''; try { o = /^https?:/.test(location.origin) ? '&origin=' + encodeURIComponent(location.origin) : ''; } catch (e) {} return 'https://www.youtube.com/embed/' + m[1] + '?rel=0&playsinline=1&enablejsapi=0' + o; }
      m = u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]{10,})/); if (m) return 'https://drive.google.com/file/d/' + m[1] + '/preview';
      m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/); if (m) return 'https://player.vimeo.com/video/' + m[1] + '?dnt=1';
      // Cloudflare Stream: a bare video ID or any customer-…cloudflarestream.com/<id>/… link → branded iframe (white accent, black letterbox).
      m = u.match(/^(?:https:\/\/(customer-[\w]+)\.cloudflarestream\.com\/)?([a-f0-9]{32})(?:\/|$|\?)/i);
      if (m) { const host = 'https://' + (m[1] || 'customer-9dru1dt3vck0fikg') + '.cloudflarestream.com/' + m[2]; return host + '/iframe?poster=' + encodeURIComponent(host + '/thumbnails/thumbnail.jpg?time=' + (p.embedThumbTime || '3s') + '&height=600') + '&primaryColor=%23f2f2ef&letterboxColor=%230b0b0b'; }
      return u;
    };
    const embedUrl = toEmbed(p.embed || '');
    // Set switcher: the key embed + p.sets; picking a thumbnail moves it into the key slot.
    const allSets = (p.sets && p.sets.length) ? [{ title: p.keyTitle || 'Set 01', url: p.embed || '', thumb: p.keyThumb || '' }].concat(p.sets) : [];
    const act = this.state.setFor === p.slug ? Math.min(this.state.setIdx || 0, Math.max(0, allSets.length - 1)) : 0;
    const ytThumb = u => { const m = (u || '').match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/); return m ? 'url(https://i.ytimg.com/vi/' + m[1] + '/hqdefault.jpg)' : 'none'; };
    const keyUrl = allSets.length ? toEmbed(allSets[act].url || '') : embedUrl;
    const thumbs = allSets.map((s, k) => ({ k, title: s.title, label: 'Play ' + s.title, bg: s.thumb ? 'url(' + s.thumb + ')' : ytThumb(s.url), pick: () => { this.setState({ setIdx: k, setFor: p.slug }); try { scrollTo({ top: 0, behavior: 'smooth' }); } catch (e) {} } })).filter(s => s.k !== act);
    const sets = [];
      const bonus = (p.bonus || []).map((b, k) => ({ id: 'cs-' + p.slug + '-b' + (k + 1), ratio: b.ratio || '3/2', ph: b.ph || 'image' }));
    return {
      isDoc, notDoc: !isDoc, sets, hasSets: thumbs.length > 0, thumbs, keyUrl, keyNoUrl: !keyUrl, keyTitle: p.title + ' — ' + (allSets.length ? allSets[act].title : 'set recording'), keyPh: allSets.length ? allSets[act].title + ' — set recording embed' : 'Set recording — YouTube / Vimeo / Drive embed', bonus,
      docCols: this.state.narrow ? 'minmax(0,1fr)' : 'repeat(3,minmax(0,1fr))', docTitleCol: this.state.narrow ? 'auto' : '1 / span 2',
      hasStage: typeof p.stage === 'number',
      close: e => this.close(e),
      goPrev: e => this.nav(e, this._prev, -1), goNext: e => this.nav(e, this._next, 1),
      p: { ...p, hasFeatured: !!(p.featured && p.featured.length), featured: (p.featured || []).map(f => ({ ...f, href: f.href || '#', noLogo: !f.logo, bg: f.logo ? 'url(' + f.logo + ')' : 'none', w: f.w || (f.ar ? Math.round(22 * f.ar) + 'px' : '96px') })), link: p.link || { label: '', href: '' }, embedUrl, noEmbed: !embedUrl, logo: p.logo || '', noLogo: !p.logo && !p.logoVideo, logoVideo: p.logoVideo || '', lvW: p.lvCrop ? (p.lvCrop[4] / p.lvCrop[2] * 100) + '%' : '100%', lvLeft: p.lvCrop ? (-p.lvCrop[0] / p.lvCrop[2] * 100) + '%' : '0', lvTop: p.lvCrop ? (-p.lvCrop[1] / p.lvCrop[3] * 100) + '%' : '0', logoBg: p.logo ? 'url(' + p.logo + ')' : 'none', clientLogo: p.clientLogo || '', noClientLogo: !p.clientLogo, clientLogoBg: p.clientLogo ? 'url(' + p.clientLogo + ')' : 'none', clientLogoW: Math.round((p.clientLogoAr < 2 ? 56 : 16) * (p.clientLogoAr || 4)) + 'px', clientLogoH: (p.clientLogoAr < 2 ? 56 : 16) + 'px', whereLogo: p.whereLogo || '', whereLogoAlt: p.whereLogoAlt || '', whereLogoAr: p.whereLogoAr || '4/1', whereLogoW: p.whereLogoW || 'clamp(96px,7.5vw,140px)', whereLogoBg: p.whereLogo ? 'url(' + p.whereLogo + ')' : 'none', logoAr: p.logoAr || '281.31/41.13', logoMax: p.logoMax || (p.logoFull ? '100%' : 'clamp(230px,21vw,400px)') },
      rows, blocks, next: { ...next, title: (next.shortTitle || next.title).replace(/(^|[\s—-])([a-z])/g, (m, s, ch) => s + ch.toUpperCase()) },
      stackVidRef: this.stackVidRef, trioCols: this.state.narrow ? 'minmax(0,1fr)' : 'minmax(0,2fr) minmax(0,5.333fr) minmax(0,2fr)', posterCols: this.state.narrow ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(0,1fr)', textCols: this.state.narrow ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(0,1fr)', pixCols: this.state.narrow ? 'repeat(2,minmax(0,1fr))' : 'repeat(4,minmax(0,1fr))', palCols: this.state.narrow ? 'repeat(3,minmax(0,1fr))' : 'repeat(6,minmax(0,1fr))',
      cardsW: !this.state.narrow && this.state.rightW > 0 ? 'calc(100% + ' + this.state.rightW + 'px + clamp(28px,5vw,96px))' : '100%',
      stackCols: this.state.narrow ? 'minmax(0,1fr)' : 'minmax(0,1fr) minmax(0,1fr)',
      stackVidMin: this.state.narrow ? '120vw' : '0px',
      prevHref: href(prev), nextHref: href(next),
      counter: String(i + 1).padStart(2, '0') + ' / ' + String(n).padStart(2, '0'),
      asideRef: this.asideRef, mainRef: this.mainRef, asideTop: this.state.top + 'px',
      asidePos: narrow ? 'relative' : 'sticky', asideH: narrow ? 'auto' : '100vh', cols: narrow ? 'minmax(0,1fr)' : 'clamp(300px,22vw,440px) minmax(0,1fr) ' + this.state.rightW + 'px',
    };
  }
}
mountView('view', Component, {});
})();

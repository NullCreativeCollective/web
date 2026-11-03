/* Page logic. Content comes from data/projects.js; markup is the <script type="text/html" id="view"> block in the HTML. */
(function () {
class Component extends DCLogic {
  // The mobile preview frame (?mobile=1) behaves like a touch device: no hover effects, auto-playing wiggles.
  _mobFrame = (() => { try { return new URLSearchParams(location.search).get('mobile') === '1'; } catch (e) { return false; } })();
  fine() { return !this._mobFrame && matchMedia('(pointer: fine)').matches; }
  // gif: path to the looping thumbnail, e.g. './media/docs/artist-set.gif'. Each frame opens Case Study ?p=doc-0N.
  docFrames() {
    return NULL_DATA.documentation();
  }
  designItems() {
    return NULL_DATA.design();
  }
  makeSheet(href, start, shadow) {
    const ov = document.createElement('div'), fr = document.createElement('iframe');
    ov.setAttribute('data-case-ov', '');
    Object.assign(ov.style, { position: 'fixed', inset: '0', zIndex: 200, background: '#0b0b0b', transform: start || 'translateY(100%)', willChange: 'transform', boxShadow: shadow || '0 -24px 60px rgba(0,0,0,0.5)' });
    fr.src = href + '&overlay=1'; fr.title = 'Case study';
    Object.assign(fr.style, { position: 'absolute', inset: '0', width: '100%', height: '100%', border: '0', display: 'block', background: '#0b0b0b' });
    ov.appendChild(fr); document.documentElement.appendChild(ov);
    return { href, el: ov, frame: fr, ready: false, shown: false };
  }
  warmCase(href) {
    if (this._ov || (this._warm && this._warm.href === href)) return;
    if (!this.fine()) return;
    if (this._warm) this._warm.el.remove();
    this._warm = this.makeSheet(href);
    this._warm.frame.src = href + '&overlay=1&hold=1';
  }
  openCase(e, href) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    if (this._ov) return;
    const ease = 'cubic-bezier(0.65,0,0.35,1)', reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let o = this._warm && this._warm.href === href ? this._warm : null;
    if (this._warm && !o) this._warm.el.remove();
    this._warm = null;
    if (!o) o = this.makeSheet(href);
    this._ov = o;
    const ov = o.el, fr = o.frame;
    o.show = () => {
      if (this._ov !== o || o.shown) return; o.shown = true;
      try { fr.contentWindow.__nullHold = false; } catch (e) {}
      if (reduce || !ov.animate) { ov.style.transform = 'none'; this.lockRoot(true); fr.focus(); return; }
      this.pageFx(true, 800); this.sb(o, false);
      ov.animate([{ transform: 'translateY(100%)' }, { transform: 'none' }], { duration: 800, easing: ease, fill: 'forwards' }).onfinish = () => { ov.style.transform = 'none'; this.sb(o, true); this.lockRoot(true); fr.focus(); };
    };
    if (o.ready) o.show(); else setTimeout(o.show, 700);
  }
  sb(o, on) { try { o.frame.contentDocument.documentElement.style.scrollbarColor = on ? '' : 'transparent transparent'; } catch (e) {} }
  navCase(href, dir) {
    const cur = this._ov; if (!cur || !cur.shown || this._pending) return;
    const ease = 'cubic-bezier(0.65,0,0.35,1)', reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = dir > 0 ? 'translateX(100%)' : 'translateX(-100%)';
    const nx = this._pending = this.makeSheet(href, start, (dir > 0 ? '-24px' : '24px') + ' 0 60px rgba(0,0,0,0.5)');
    nx.el.style.zIndex = 201;
    nx.go = () => {
      if (nx.started || this._pending !== nx) return; nx.started = true;
      const finish = () => { this.sb(nx, true); cur.el.remove(); nx.el.style.transform = 'none'; nx.el.style.zIndex = 200; nx.shown = true; this._ov = nx; this._pending = null; nx.frame.focus(); };
      if (reduce || !nx.el.animate) return finish();
      cur.el.style.transformOrigin = '50% 50%'; this.sb(cur, false); this.sb(nx, false);
      cur.el.animate([{ transform: 'none', filter: 'blur(0px) brightness(1)' }, { transform: 'scale(0.94)', filter: 'blur(8px) brightness(0.4)' }], { duration: 800, easing: ease, fill: 'forwards' });
      nx.el.animate([{ transform: start }, { transform: 'none' }], { duration: 800, easing: ease, fill: 'forwards' }).onfinish = finish;
    };
    setTimeout(nx.go, 700);
  }
  lockRoot(on) {
    const de = document.documentElement;
    if (on) { if (this._rootOv == null) this._rootOv = de.style.overflow; de.style.overflow = 'hidden'; }
    else if (this._rootOv != null) { de.style.overflow = this._rootOv; this._rootOv = null; }
  }
  closeOverlay() {
    if (this._pending) return;
    this.lockRoot(false);
    const o = this._ov; if (!o) return; this._ov = null;
    const done = () => o.el.remove();
    if (!o.shown || matchMedia('(prefers-reduced-motion: reduce)').matches || !o.el.animate) return done();
    this.pageFx(false, 750); this.sb(o, false);
    o.el.animate([{ transform: 'none' }, { transform: 'translateY(100%)' }], { duration: 750, easing: 'cubic-bezier(0.65,0,0.35,1)', fill: 'forwards' }).onfinish = done;
  }
  pageFx(out, dur) {
    const b = document.body, y = scrollY;
    if (!b.animate || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (this._fx) { this._fx.cancel(); this._fxDone && this._fxDone(); }
    const fixed = [...b.querySelectorAll('*')].filter(el => el.offsetParent === null && getComputedStyle(el).position === 'fixed');
    const saved = fixed.map(el => {
      const cs = getComputedStyle(el), s = { el, top: el.style.top, bottom: el.style.bottom, height: el.style.height };
      el.style.height = cs.height; el.style.top = (parseFloat(cs.top) + y) + 'px'; el.style.bottom = 'auto';
      return s;
    });
    b.style.transformOrigin = '50% ' + Math.round(y + innerHeight / 2) + 'px';
    const A = { transform: 'none', filter: 'blur(0px) brightness(1)' }, B = { transform: 'scale(0.94)', filter: 'blur(8px) brightness(0.4)' };
    const an = this._fx = b.animate(out ? [A, B] : [B, A], { duration: dur, easing: 'cubic-bezier(0.65,0,0.35,1)', fill: 'forwards' });
    const done = this._fxDone = () => { this._fx = null; this._fxDone = null; b.style.transformOrigin = ''; saved.forEach(s => { s.el.style.top = s.top; s.el.style.bottom = s.bottom; s.el.style.height = s.height; }); };
    an.onfinish = () => { an.cancel(); done(); };
  }
  playReturn(persisted) {
    const root = document.documentElement;
    let fx = null, y = null;
    try { fx = JSON.parse(sessionStorage.getItem('nullCaseReturn') || 'null'); sessionStorage.removeItem('nullCaseReturn'); const v = sessionStorage.getItem('nullHomeScroll'); y = v == null ? null : +v; } catch (e) {}
    if (!fx || Date.now() - fx.t > 15000) { root.removeAttribute('data-ret'); return; }
    const panel = document.createElement('div');
    Object.assign(panel.style, { position: 'fixed', inset: '0', background: '#0b0b0b', zIndex: 2147483001, pointerEvents: 'none' });
    document.body.appendChild(panel); root.removeAttribute('data-ret');
    const target = () => { if (y != null) return y; const d = document.getElementById('design'); return d ? d.getBoundingClientRect().top + scrollY - 40 : 0; };
    const restore = () => scrollTo({ top: target(), behavior: 'instant' });
    restore();
    const go = () => {
      restore();
      if (matchMedia('(prefers-reduced-motion: reduce)').matches || !panel.animate) { panel.remove(); return; }
      panel.animate([{ transform: 'none' }, { transform: 'translateY(100%)' }], { duration: 600, easing: 'cubic-bezier(0.65,0,0.35,1)', fill: 'forwards' }).onfinish = () => panel.remove();
    };
    const settle = persisted ? Promise.resolve() : Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 900))]).then(() => new Promise(r => setTimeout(r, 160)));
    settle.then(() => { restore(); requestAnimationFrame(go); });
  }
  descRef = React.createRef();
  alignNums() {
    document.querySelectorAll('[data-stick]').forEach(el => {
      const num = el.querySelector('span'), p = el.parentElement.querySelector('p');
      if (!num || !p) return;
      num.style.marginTop = '0px'; num.style.position = 'relative'; num.style.top = '0px';
      const d = p.offsetTop - el.offsetTop, stacked = p.offsetTop >= el.offsetTop + el.offsetHeight - 2;
      const lh = parseFloat(getComputedStyle(p).lineHeight) || 24, fs = parseFloat(getComputedStyle(p).fontSize) || 17;
      num.style.top = (stacked ? 1 : d + (lh - fs) / 2 + fs * 0.03) + 'px';
    });
  }
  fitDesc() {
    this.alignNums();
    const p = this.descRef.current, h1 = this.heroLogoRef.current, svg = h1 && h1.querySelector('svg');
    if (!p || !svg) return;
    const target = svg.getBoundingClientRect().height / (parseFloat(getComputedStyle(h1).transform.split(',')[3]) || 1);
    if (innerWidth < 700 || !target) { p.style.fontSize = ''; return; }
    let lo = 10, hi = 64;
    for (let i = 0; i < 18; i++) { const m = (lo + hi) / 2; p.style.fontSize = m + 'px'; if (p.offsetHeight > target) hi = m; else lo = m; }
    p.style.fontSize = lo + 'px';
  }
  // Mobile preview frame: drop every CSS :hover rule so nothing reacts to the mouse, like a phone.
  stripHover() {
    for (const ss of document.styleSheets) {
      let rules; try { rules = ss.cssRules; } catch (e) { continue; }
      for (let i = rules.length - 1; i >= 0; i--) { const r = rules[i]; if (r.selectorText && r.selectorText.includes(':hover')) ss.deleteRule(i); }
    }
  }
  startDocWigs() {
    if (this._docWigT) return;
    const seq = [0, 1, 2, 3, 2, 1], still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tick = () => {
      document.querySelectorAll('[data-doc-wig]').forEach(el => {
        const fr = (el.getAttribute('data-doc-wig') || '').split('|').filter(Boolean); if (fr.length < 2) return;
        if (!el._pre) { el._pre = fr.map(src => { const im = new Image(); im.src = src; return im; }); el._k = 0; }
        if (still || !el._pre.every(im => im.complete)) return;
        el._k = (el._k + 1) % seq.length; el.style.backgroundImage = 'url("' + fr[seq[el._k] % fr.length] + '")';
      });
    };
    this._docWigT = setInterval(tick, 125); tick();
  }
  // <video data-src>: src is set here so the browser never fetches an unresolved template hole.
  hydrateVids() {
    document.querySelectorAll('video[data-src]').forEach(v => {
      const s = v.getAttribute('data-src'); if (!s || s.indexOf('{{') >= 0 || v.getAttribute('src') === s) return;
      v.setAttribute('src', s); v.muted = true; const p = v.play && v.play(); if (p && p.catch) p.catch(() => {});
    });
  }
  componentDidMount() {
    this.startDocWigs(); this.hydrateVids();
    this._footMQ = matchMedia('(max-width: 639px)');
    this.onFootR = () => { const n = this._footMQ.matches; if (n !== !!this.state.footNarrow) this.setState({ footNarrow: n }); };
    this._footMQ.addEventListener('change', this.onFootR); addEventListener('resize', this.onFootR); addEventListener('load', this.onFootR);
    this.onFootR(); requestAnimationFrame(this.onFootR);
    // Tap hint sits at the optical centre of the empty band between the nav and the logo block (a little above true middle).
    this.onTapPos = () => {
      const hero = this.heroRef.current, logo = this.heroLogoRef.current, hdr = document.querySelector('header'); if (!hero || !logo) return;
      const hr = hero.getBoundingClientRect(), block = logo.parentElement.parentElement.getBoundingClientRect();
      const top = Math.max(0, (hdr ? hdr.getBoundingClientRect().bottom : 0) - hr.top), bottom = block.top - hr.top;
      const y = Math.round(top + (bottom - top) * 0.45 + 2 * 16); // shifted down by two of its own heights (~16px)
      if (y > 0 && y !== this.state.tapTop) this.setState({ tapTop: y });
    };
    addEventListener('resize', this.onTapPos); addEventListener('load', this.onTapPos);
    requestAnimationFrame(this.onTapPos); setTimeout(this.onTapPos, 600);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(this.onTapPos);
    if (this._mobFrame) {
      this.stripHover();
      let t = 0; this._hoverMO = new MutationObserver(() => { clearTimeout(t); t = setTimeout(() => this.stripHover(), 50); });
      this._hoverMO.observe(document.head, { childList: true, subtree: true, characterData: true });
      this._hoverIv = setInterval(() => this.stripHover(), 1500);
    }
    this.onShow = e => { document.querySelectorAll('[data-case-fx]').forEach(el => el.remove()); this.playReturn(e && e.persisted); };
    addEventListener('pageshow', this.onShow);
    this.playReturn(false);
    this.onMsg = ev => {
      const d = ev.data; if (!d) return;
      const w = this._warm; if (w && ev.source === w.frame.contentWindow && d.nullCase === 'ready') { w.ready = true; return; }
      const p = this._pending; if (p && ev.source === p.frame.contentWindow) { if (d.nullCase === 'ready') { p.ready = true; p.go(); } return; }
      const o = this._ov; if (!o || ev.source !== o.frame.contentWindow) return;
      if (d.nullCase === 'ready') { o.ready = true; o.show && o.show(); }
      else if (d.nullCase === 'close') this.closeOverlay();
      else if (d.nullCase === 'nav' && d.href) this.navCase(d.href, d.dir > 0 ? 1 : -1);
    };
    addEventListener('message', this.onMsg);
    this.onEsc = ev => { if (ev.key === 'Escape' && this._ov) this.closeOverlay(); };
    addEventListener('keydown', this.onEsc);
    this.onDragIn = e => { if (e.dataTransfer && [...(e.dataTransfer.types || [])].includes('Files') && !this.state.dragging) this.setState({ dragging: true }); };
    this.onDragOut = e => { if (e.type === 'drop' || !e.relatedTarget) this.setState({ dragging: false }); };
    addEventListener('dragenter', this.onDragIn); addEventListener('dragleave', this.onDragOut); addEventListener('drop', this.onDragOut, true);
    this.onFit = () => this.fitDesc();
    window.addEventListener('resize', this.onFit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(this.onFit);
    requestAnimationFrame(this.onFit);
    this.onScroll = () => { if (this.raf) return; this.raf = requestAnimationFrame(() => { this.raf = 0; this.project(); this.motion(); }); };
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onScroll);
    this.project();
    setTimeout(() => this.motion(), 60);
    this.setupTrail();
    this.setupSvHover();
    this.startMarquee();
  }
  startMarquee() {
    const tr = this.marqRef.current; if (!tr || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let x = 0, last = performance.now();
    const step = now => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const set = tr.scrollWidth / 3;
      x -= 38 * dt; if (set && -x >= set) x += set;
      tr.style.transform = 'translate3d(' + x + 'px,0,0)';
      this.mq = requestAnimationFrame(step);
    };
    this.mq = requestAnimationFrame(step);
  }
  componentDidUpdate(prev) {
    this.hydrateVids();
    if (prev.wiggleSpeed !== this.props.wiggleSpeed) this.startTrailClock();
    this.project();
  }
  componentWillUnmount() {
    clearInterval(this._docWigT); this._docWigT = null;
    if (this._hoverMO) this._hoverMO.disconnect(); clearInterval(this._hoverIv);
    window.removeEventListener('resize', this.onFit);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onScroll);
    clearInterval(this.wt); clearInterval(this.gt); clearInterval(this.autoT);
    if (this.heroRef.current) { this.heroRef.current.removeEventListener('pointermove', this.onTrail); this.heroRef.current.removeEventListener('pointerdown', this.onTapDown); this.heroRef.current.removeEventListener('pointerup', this.onTapUp); }
    removeEventListener('resize', this.onFootR); removeEventListener('load', this.onFootR); removeEventListener('resize', this.onTapPos); removeEventListener('load', this.onTapPos); if (this._footMQ) this._footMQ.removeEventListener('change', this.onFootR);
    if (this.svCleanup) this.svCleanup();
    cancelAnimationFrame(this.mq);
  }
  docTop(el) { let y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; }
  docLeft(el) { let x = 0; while (el) { x += el.offsetLeft; el = el.offsetParent; } return x; }
  motion() {
    const y = window.scrollY, vh = innerHeight;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = !this.fine() || innerWidth < 700;
    // hero logo docks into header logo
    const h1 = this.heroLogoRef.current, hl = this.hdrLogoRef.current;
    if (h1 && hl) {
      if (reduce) { h1.style.transform = ''; h1.style.opacity = ''; hl.style.opacity = '1'; }
      else {
        const top0 = this.docTop(h1), left0 = this.docLeft(h1), w = h1.offsetWidth, h = h1.offsetHeight;
        const r = hl.getBoundingClientRect(), sT = r.width / w;
        const tTop = r.top + r.height / 2 - h * sT / 2, tLeft = r.left;
        const end = Math.max(120, (top0 - tTop) * 0.8);
        const p = Math.max(0, Math.min(1, y / end)), e = 1 - Math.pow(1 - p, 2);
        const vis = top0 + (tTop - top0) * e, sc = 1 + (sT - 1) * e;
        h1.style.transform = 'translate(' + ((tLeft - left0) * e) + 'px,' + (vis - (top0 - y)) + 'px) scale(' + sc + ')';
        h1.style.opacity = p >= 1 ? '0' : '1';
        hl.style.opacity = p >= 1 ? '1' : '0';
      }
    }
    // section titles pin and shrink to a label
    const pinTop = 64;
    document.querySelectorAll('[data-stick]').forEach(el => {
      const h2 = el.querySelector('h2');
      const num = el.querySelector('span');
      const reset = () => { el.style.transform = ''; el.style.pointerEvents = ''; el.style.mixBlendMode = ''; el.style.color = ''; if (h2) h2.style.transform = ''; if (num) num.style.transform = ''; };
      if (reduce || !h2) { reset(); return; }
      const sec = el.closest('section'), top = this.docTop(el), nat = top - y;
      const secBottom = this.docTop(sec) + sec.offsetHeight;
      const fs = parseFloat(getComputedStyle(h2).fontSize), sMin = 18 / fs;
      const d = pinTop - nat;
      if (d <= 0) { reset(); return; }
      const k = Math.min(1, d / 260), ek = 1 - Math.pow(1 - k, 3), sc = 1 - (1 - sMin) * ek;
      if (num) num.style.transform = 'translateY(' + (-(num.offsetTop - 3) * ek) + 'px)';
      el.style.mixBlendMode = 'difference';
      el.style.pointerEvents = 'none';
      el.style.color = '#ffffff';
      const pinnedH = h2.offsetHeight * sc;
      const ty = Math.max(0, Math.min(d, secBottom - 140 - top - pinnedH));
      h2.style.transformOrigin = '0 0';
      h2.style.transform = 'scale(' + sc + ')';
      el.style.transform = 'translateY(' + ty + 'px)';
    });
    // graphic design previews: staggered parallax
    const figs = document.querySelectorAll('[data-par]');
    if (figs.length) {
      const grid = figs[0].parentElement, gr = grid.getBoundingClientRect();
      const single = gr.width < 620;
      const amp = reduce || single ? 0 : coarse ? 0.5 : 1;
      const f = [0, 0.14, 0.05, 0.19];
      const c = gr.top + gr.height / 2 - vh / 2;
      figs.forEach(el => { const i = +el.getAttribute('data-par') || 0, t = Math.max(-60, Math.min(60, c * f[i % 4] * amp)); el.style.transform = amp ? 'translateY(' + t + 'px)' : ''; });
    }
  }
  project() {
    const on = this.props.keystone ?? true;
    const vh = window.innerHeight;
    document.querySelectorAll('[data-proj]').forEach(el => {
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.55)));
      if (!on) { el.style.transform = ''; el.style.opacity = ''; return; }
      const e = 1 - Math.pow(1 - p, 3);
      el.style.transformOrigin = '50% 100%';
      el.style.transform = `perspective(1400px) rotateX(${(1 - e) * 14}deg) scale(${0.92 + e * 0.08})`;
      el.style.opacity = String(0.25 + e * 0.75);
    });
  }
  // Hero cursor trail. Each entry is one of:
  //   { frames: ['./media/wiggles/01-1.webp', '...-2', '...-3', '...-4'] }  4 frames in shooting order, played 1-2-3-4-3-2
  //   { video: './media/wiggles/02.mp4' }  loop already baked in, muted, no audio track
  //   { still: './media/stills/03.webp' }  single photo, vertical or horizontal
  // Shape is read from the file itself; ratio is only used for placeholders.
  wiggles() {
    return [];
  }
  placeholderFrames(n, ratio, count) {
    const [rw, rh] = ratio.split('/').map(Number), W = 240, H = Math.round(W * rh / rw), out = [];
    const tone = 24 + (n * 7) % 18;
    for (let f = 0; f < count; f++) {
      const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
      x.fillStyle = 'rgb(' + tone + ',' + tone + ',' + (tone - 1) + ')'; x.fillRect(0, 0, W, H);
      const dx = count > 1 ? (f - 1.5) * 5 : 0;
      x.fillStyle = 'rgb(' + (tone + 26) + ',' + (tone + 26) + ',' + (tone + 24) + ')';
      x.beginPath(); x.ellipse(W * 0.5 + dx, H * 0.46, W * 0.17, H * 0.2, 0, 0, Math.PI * 2); x.fill();
      x.fillRect(W * 0.3 + dx * 0.4, H * 0.7, W * 0.4, H * 0.3);
      x.fillStyle = '#8e8e89'; x.font = '10px "IBM Plex Mono", monospace';
      x.fillText((count > 1 ? 'WIGGLE ' : 'STILL ') + String(n + 1).padStart(2, '0') + (count > 1 ? ' · ' + (f + 1) + '/4' : ''), 10, H - 12);
      out.push(c.toDataURL('image/jpeg', 0.8));
    }
    return out;
  }
  setupTrail() {
    const hero = this.heroRef.current, layer = this.trailRef.current; if (!hero || !layer) return;
    const makeSet = (w, i) => {
      const set = { ratio: w.ratio || '4/5', frames: null, video: null, ready: false, imgs: [] };
      if (w.video) {
        set.video = w.video;
        const v = document.createElement('video'); v.preload = 'auto'; v.muted = true; v.src = w.video;
        v.addEventListener('loadedmetadata', () => { if (v.videoWidth) set.ratio = v.videoWidth + '/' + v.videoHeight; });
        v.addEventListener('canplaythrough', () => { set.ready = true; }, { once: true });
      } else {
        const list = w.frames && w.frames.length === 4 ? w.frames : w.still ? [w.still] : this.placeholderFrames(i, set.ratio, 'still' in w ? 1 : 4);
        set.frames = list;
        // Download and decode every frame up front; the set only joins the trail once all of them are ready.
        Promise.all(list.map(u => { const im = new Image(); im.decoding = 'async'; im.src = u; set.imgs.push(im); return (im.decode ? im.decode() : new Promise((r, j) => { im.onload = r; im.onerror = j; })); }))
          .then(() => { const im = set.imgs[0]; if (!list[0].startsWith('data:') && im.naturalWidth) set.ratio = im.naturalWidth + '/' + im.naturalHeight; set.ready = true; })
          .catch(() => {});
      }
      return set;
    };
    // All wiggles are listed in media/wiggles/manifest.json. Each visit loads a random ~24, then adds one more per popup.
    this.sets = this.wiggles().map(makeSet); this.wQueue = [];
    this.wMore = () => { const w = this.wQueue.shift(); if (w) this.sets.push(makeSet(w, this.sets.length)); };
    fetch('./media/wiggles/manifest.json').then(r => r.json()).then(list => {
      const q = list.map(w => ({ frames: w.frames.map(f => './media/wiggles/' + f.split('/').map(encodeURIComponent).join('/')) }));
      for (let k = q.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [q[k], q[j]] = [q[j], q[k]]; }
      this.wQueue = q; for (let k = 0; k < 24; k++) this.wMore();
    }).catch(() => {});
    this.si = 0; this.last = null;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.spawn = (x, y, solo) => {
      const ready = this.sets.filter(q => q.ready); if (!ready.length) return;
      const set = ready[this.si++ % ready.length]; if (this.wMore) this.wMore();
      const el = document.createElement('div');
      const [rw, rh] = set.ratio.split('/').map(Number), land = rw >= rh;
      const w = 1.12 * (land ? Math.max(150, Math.min(300, innerWidth * 0.18)) : Math.max(120, Math.min(230, innerWidth * 0.14)));
      el._set = set; el._f = 0;
      Object.assign(el.style, { position: 'absolute', left: x + 'px', top: y + 'px', width: w + 'px', aspectRatio: set.ratio, overflow: 'hidden', backgroundColor: 'transparent',
        backgroundSize: 'cover', backgroundPosition: 'center',
        transform: 'translate(-50%,-50%) scale(0.86)', opacity: '0', willChange: 'transform,opacity',
        transition: 'opacity 0.25s ease, transform 0.6s cubic-bezier(0.22,1,0.36,1)' });
      if (set.video) {
        const v = document.createElement('video');
        Object.assign(v, { src: set.video, muted: true, loop: true, autoplay: !reduce, playsInline: true });
        v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
        Object.assign(v.style, { display: 'block', width: '100%', height: '100%', objectFit: 'cover' });
        el.appendChild(v); if (!reduce) v.play().catch(() => {});
      } else el.style.backgroundImage = 'url("' + set.frames[0] + '")';
      layer.appendChild(el);
      const cap = this._tapMode ? 50 : 9;
      while (layer.children.length > cap) layer.removeChild(layer.firstChild);
      if (this._tapMode) { const kids = [...layer.children]; kids.forEach((k, i) => { k._frozen = i < kids.length - 8; }); }
      requestAnimationFrame(() => { el.style.opacity = '1'; el.style.transform = 'translate(-50%,-50%) scale(1)'; });
      // The newest popup stays on screen; it only starts fading once the next one appears.
      el._t = performance.now();
      const prev = this.lastEl; this.lastEl = el;
      if (prev && prev.isConnected && !this._tapMode) {
        const fade = () => { prev.style.opacity = '0'; prev.style.transform = 'translate(-50%,-50%) scale(0.97)'; setTimeout(() => prev.remove(), 350); };
        if (solo) fade(); else setTimeout(fade, Math.max(0, 1100 - (el._t - prev._t)));
      }
    };
    this.onTrail = e => {
      if (e.pointerType === 'touch' || !this.fine()) return;
      const r = hero.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
      if (!this.last || Math.hypot(x - this.last.x, y - this.last.y) > 90) { this.last = { x, y }; this.spawn(x, y); }
    };
    hero.addEventListener('pointermove', this.onTrail);
    {
      // Touch: nothing plays on its own. Every tap drops a wiggle where the finger lands and keeps it (max 50; only the newest 8 animate).
      // Double tap clears the hero. Decided per tap (pointerType), so it also works when a desktop browser switches to touch emulation.
      const isTouch = e => e.pointerType === 'touch' || e.pointerType === 'pen' || !this.fine();
      this._tapMode = !this.fine();
      hero.style.touchAction = 'manipulation';
      let down = null, lastTap = null;
      this.onTapDown = e => { if (!isTouch(e)) { down = null; return; } down = { x: e.clientX, y: e.clientY, t: performance.now() }; };
      this.onTapUp = e => {
        if (!down || !isTouch(e) || e.target.closest('a,button')) { down = null; return; }
        if (!this._tapMode) { this._tapMode = true; const layer0 = this.trailRef.current; if (layer0) layer0.innerHTML = ''; this.lastEl = null; }
        const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y), dt = performance.now() - down.t; down = null;
        if (moved > 10 || dt > 500) return;
        const r = hero.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, now = performance.now();
        // only spawn above the bottom of the logo (measured with the hero fully scrolled up), never over the description
        const lg = this.heroLogoRef.current; if (lg) { const lb = lg.getBoundingClientRect().bottom - r.top; if (y > lb) return; }
        if (lastTap && now - lastTap.t < 320 && Math.hypot(x - lastTap.x, y - lastTap.y) < 40) {
          lastTap = null; const layer = this.trailRef.current;
          if (layer) [...layer.children].forEach(k => { k.style.opacity = '0'; setTimeout(() => k.remove(), 300); });
          this.lastEl = null; return;
        }
        lastTap = { x, y, t: now };
        if (!this.state.tapped) { this.setState({ tapped: true }); setTimeout(() => this.setState({ tapGone: true }), 450); }
        this.spawn(x, y);
      };
      hero.addEventListener('pointerdown', this.onTapDown);
      hero.addEventListener('pointerup', this.onTapUp);
    }
    if (!reduce) this.startTrailClock();
  }
  startTrailClock() {
    clearInterval(this.wt);
    const seq = [0, 1, 2, 3, 2, 1], layer = this.trailRef.current; if (!layer) return;
    this.wt = setInterval(() => {
      const hr = this.heroRef.current && this.heroRef.current.getBoundingClientRect();
      if (document.hidden || (hr && hr.bottom < 0)) return;
      for (const el of layer.children) {
        const fr = el._set && el._set.frames; if (!fr || fr.length !== 4 || el._frozen) continue;
        el._f = (el._f + 1) % seq.length; el.style.backgroundImage = 'url("' + fr[seq[el._f]] + '")';
      }
    }, this.props.wiggleSpeed ?? 140);
  }
  setupSvHover() {
    const list = this.svListRef.current; if (!list) return;
    const fine = () => this.fine();
    const over = e => { if (!fine()) return; const row = e.target.closest('[data-i]'); const i = row ? +row.getAttribute('data-i') : -1; if (i !== this.state.idx) this.setState({ idx: i }); };
    const move = e => { const el = this.prevRef.current; if (!el || !fine()) return; const w = el.offsetWidth, h = el.offsetHeight, flip = e.clientX + 24 + w > innerWidth - 12;
      const x = flip ? e.clientX - 24 - w : e.clientX + 24, y = Math.max(12, Math.min(innerHeight - h - 12, e.clientY - h / 2));
      el.style.transform = 'translate(' + x + 'px,' + y + 'px)'; };
    const leave = () => this.setState({ idx: -1 });
    list.addEventListener('pointerover', over); list.addEventListener('pointermove', move); list.addEventListener('pointerleave', leave);
    this.svCleanup = () => { list.removeEventListener('pointerover', over); list.removeEventListener('pointermove', move); list.removeEventListener('pointerleave', leave); };
  }
  indexItems() {
    return NULL_DATA.index();
  }
  state = { stage: 0, hover: -1, idx: -1 };
  prevRef = React.createRef();
  heroRef = React.createRef();
  marqRef = React.createRef();
  // Trusted clients marquee: logo = white logo on transparent PNG/SVG in media/clients/, ar = width / height
  clients() {
    return NULL_DATA.clients();
  }
  heroLogoRef = React.createRef();
  hdrLogoRef = React.createRef();
  trailRef = React.createRef();
  svListRef = React.createRef();
  // Production hover images: set img to a path, e.g. './media/rollouts.jpg'
  serviceItems() {
    return NULL_DATA.services();
  }
  renderVals() {
    const st = this.state.stage, hv = this.state.hover, v = {};
    [0, 1, 2, 3].forEach(i => {
      v['pick' + i] = () => this.setState({ stage: i });
      v['hov' + i] = () => this.setState({ hover: i });
      v['o' + i] = st === i || hv === i ? 1 : 0.45;
      v['b' + i] = st === i ? '#f2f2ef' : 'transparent';
      v['n' + i] = st === i || hv === i ? 1 : 0;
    });
    return {
      ...v,
      unhov: () => this.setState({ hover: -1 }),
      stage: st,
      avName: ['seera — balad beast', 'shaolin — soundstorm', 'seera — soundstorm', 'ENTER10 — UAE'][st],
      avHref: 'case-study.html?p=' + ['seera-balad-beast', 'shaolin-soundstorm', 'seera-soundstorm', 'enter10-uae'][st],
      avOpen: e => this.openCase(e, 'case-study.html?p=' + ['seera-balad-beast', 'shaolin-soundstorm', 'seera-soundstorm', 'enter10-uae'][this.state.stage]),
      ...Object.fromEntries([0, 1, 2, 3].flatMap(k => [
        ['avOpen' + k, e => { e.stopPropagation(); this.openCase(e, 'case-study.html?p=' + ['seera-balad-beast', 'shaolin-soundstorm', 'seera-soundstorm', 'enter10-uae'][k]); }],
        ['avWarm' + k, () => this.warmCase('case-study.html?p=' + ['seera-balad-beast', 'shaolin-soundstorm', 'seera-soundstorm', 'enter10-uae'][k])],
      ])),
      avWarm: () => this.warmCase('case-study.html?p=' + ['seera-balad-beast', 'shaolin-soundstorm', 'seera-soundstorm', 'enter10-uae'][this.state.stage]),
      prevRef: this.prevRef,
      heroRef: this.heroRef,
      marqRef: this.marqRef,
      clientsLoop: [0, 1, 2].flatMap(() => this.clients().map(c => {
        const ar = c.ar || 3, h = Math.max(18, Math.min(46, 38 * Math.pow(ar, -0.35))) * (c.scale || 1);
        return { name: c.name, logo: !!c.logo, noLogo: !c.logo, bg: c.logo ? 'url("' + c.logo + '")' : 'none', w: Math.round(h * ar) + 'px', h: Math.round(h) + 'px' };
      })),
      heroLogoRef: this.heroLogoRef,
      descRef: this.descRef,
      hdrLogoRef: this.hdrLogoRef,
      trailRef: this.trailRef,
      svListRef: this.svListRef,
      prevOp: this.state.idx >= 0 ? 1 : 0,
      tapHint: !this.fine() && !this.state.tapGone, tapHintOp: this.state.tapped ? 0 : 1, tapTop: (this.state.tapTop ?? 0) ? this.state.tapTop + 'px' : '42%',
      footAlign: this.state.footNarrow ? 'flex-start' : 'flex-end', footText: this.state.footNarrow ? 'left' : 'right',
      ...(() => {
        // Review tool only: opens this page in a 390 x 844 frame. Not part of the final export.
        let inFrame = false; try { inFrame = new URLSearchParams(location.search).get('mobile') === '1'; } catch (e) {}
        const on = !!this.props.mobilePreview;
        if (on && !this._pvR) { this._pvR = () => this.forceUpdate(); addEventListener('resize', this._pvR); }
        if (!on && this._pvR) { removeEventListener('resize', this._pvR); this._pvR = null; }
        const k = Math.min(1, (innerHeight - 90) / 844, (innerWidth - 48) / 390);
        return {
          pvW: Math.round(390 * k) + 'px', pvH: Math.round(844 * k) + 'px', pvScale: 'scale(' + k.toFixed(4) + ')',
          pvShowBtn: !inFrame, pvOn: on, pvLabel: on ? 'Close mobile preview' : 'Mobile preview',
          pvSrc: 'index.html?mobile=1',
          pvToggle: () => this.setState(s => ({ mobilePv: !s.mobilePv })),
          pvClose: e => { if (e.target === e.currentTarget) this.setState({ mobilePv: false }); },
        };
      })(),
      ...(() => { const it = this.serviceItems()[this.state.idx] || this._lastSv || {}; if (this.state.idx >= 0) this._lastSv = it; const r = it.ratio || '4/5', [a, b] = r.split('/').map(Number); return { prevRatio: r, prevW: it.prevW || (a / b > 1 ? 'clamp(280px,28vw,440px)' : 'clamp(200px,20vw,300px)') }; })(),
      index: this.indexItems(),
      svPrev: this.serviceItems().map((it, i) => ({
        label: it.name,
        op: this.state.idx === i ? 1 : 0,
        i, img: !!it.img && !it.vid, isVid: !!it.vid, vid: it.vid || '',
        noImg: !it.img && !it.vid,
        bgImg: it.img ? 'url(' + it.img + ')' : 'none',
      })),
      frames: this.docFrames().map((f, k) => { const [rw, rh] = f.ratio.split('/').map(Number); const ext = !!f.link, href = f.link || 'case-study.html?p=doc-0' + (k + 1); return { ...f, target: ext ? '_blank' : '_self', ext, hoverTint: ext ? 'rgba(11,11,11,0.35)' : 'rgba(11,11,11,0)', label: f.cap + (ext ? ' — on Instagram' : ' — set recording'), w: 'calc(clamp(260px,30vw,440px) * ' + rw + ' / ' + rh + ')', href, gif: f.gif || '', vid: f.vid || '', isImg: !!f.img, imgBg: f.img ? 'url("' + f.img + '")' : 'none', alt: f.alt || f.cap, isWig: !!f.wig, wigList: f.wig ? f.wig.join('|') : '', wigBg: f.wig ? 'url("' + f.wig[0] + '")' : 'none', linked: !f.noLink, noMedia: !f.gif && !f.vid && !f.img && !f.wig, bgImg: f.gif ? 'url(' + f.gif + ')' : 'none', open: ext ? () => {} : e => this.openCase(e, href), watch: !ext && !!(f.vid || f.gif), watchOp: 1, watchY: '0', enter: () => { if (!ext) this.warmCase(href); this.setState({ docHover: k }); }, leave: () => { if (this.state.docHover === k) this.setState({ docHover: -1 }); } }; }),
      caseLinkPE: this.state.dragging ? 'none' : 'auto',
      design: this.designItems().map(d => ({ ...d, capTitle: d.cap.split(' — ')[0], capMeta: d.cap.split(' — ').slice(1).join(' — '), img: d.img || '', noImg: !d.img, bgImg: d.img ? 'url(' + d.img + ')' : 'none', alt: d.alt || d.cap, open: e => this.openCase(e, d.href), warm: () => this.warmCase(d.href) })),
      services: this.serviceItems(),
    };
  }
}
mountView('view', Component, {"mobilePreview":false,"keystone":true,"wiggleSpeed":140});
})();

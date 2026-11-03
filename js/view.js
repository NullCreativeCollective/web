/* null_ view renderer.
   Turns the page template (the <script type="text/html" id="view"> block in each HTML file)
   into React elements. Template syntax:
     {{ path }}                     dotted lookup (text or attribute)
     <sc-for list="{{ xs }}" as="x">  repeat children; $index in scope
     <sc-if value="{{ flag }}">       render children when truthy
     style-hover="..."               :hover styles (also style-active / style-focus)
     <x-import component-from-global-scope="null-stage">  custom element mount
     <image-slot src="..." alt="..."> plain image box
   The page logic is a React class component ("class Component extends DCLogic").  */
(function () {
  'use strict';
  var R = window.React, RD = window.ReactDOM;
  window.DCLogic = class extends R.Component {};

  var MAP = { 'class': 'className', 'for': 'htmlFor', tabindex: 'tabIndex', readonly: 'readOnly', maxlength: 'maxLength', colspan: 'colSpan', rowspan: 'rowSpan',
    autoplay: 'autoPlay', playsinline: 'playsInline', crossorigin: 'crossOrigin', srcset: 'srcSet', frameborder: 'frameBorder', allowfullscreen: 'allowFullScreen',
    referrerpolicy: 'referrerPolicy', autocomplete: 'autoComplete', autofocus: 'autoFocus', spellcheck: 'spellCheck', contenteditable: 'contentEditable',
    datetime: 'dateTime', enctype: 'encType', inputmode: 'inputMode', novalidate: 'noValidate', usemap: 'useMap', charset: 'charSet',
    viewbox: 'viewBox', preserveaspectratio: 'preserveAspectRatio', 'xlink:href': 'xlinkHref', 'xml:space': 'xmlSpace', defaultvalue: 'defaultValue', defaultchecked: 'defaultChecked' };
  ('Click DoubleClick MouseEnter MouseLeave MouseMove MouseOver MouseOut MouseDown MouseUp PointerDown PointerMove PointerUp PointerEnter PointerLeave PointerCancel ' +
   'TouchStart TouchMove TouchEnd TouchCancel Focus Blur KeyDown KeyUp KeyPress Change Input Submit Scroll Wheel Load Error Ended Play Pause Playing TimeUpdate ' +
   'LoadedData LoadedMetadata CanPlay CanPlayThrough AnimationEnd AnimationStart TransitionEnd ContextMenu DragStart DragOver DragEnter DragLeave Drop Seeked Waiting')
    .split(' ').forEach(function (e) { MAP['on' + e.toLowerCase()] = 'on' + e; });

  var HOLE = /\{\{([^}]*)\}\}/g, WHOLE = /^\s*\{\{([^}]*)\}\}\s*$/, NUM = /^-?\d+(\.\d+)?$/;
  function look(sc, expr) {
    expr = expr.trim();
    if (!expr || expr === 'undefined') return undefined;
    if (expr === 'true') return true; if (expr === 'false') return false; if (expr === 'null') return null;
    if (NUM.test(expr)) return +expr;
    var q = expr.match(/^(['"])(.*)\1$/); if (q) return q[2];
    var ps = expr.split('.'), v = sc[ps[0]];
    for (var i = 1; i < ps.length; i++) { if (v == null) return undefined; v = v[ps[i]]; }
    return v;
  }
  function compileAttr(raw) {
    var w = raw.match(WHOLE);
    if (w) return { k: 'raw', e: w[1] };
    if (raw.indexOf('{{') < 0) return { k: 'lit', v: raw };
    var parts = [], last = 0; raw.replace(HOLE, function (m, e, i) { parts.push(raw.slice(last, i), { e: e }); last = i + m.length; }); parts.push(raw.slice(last));
    return { k: 'str', p: parts };
  }
  function attrVal(a, sc) {
    if (a.k === 'lit') return a.v;
    if (a.k === 'raw') return look(sc, a.e);
    return a.p.map(function (p) { if (typeof p === 'string') return p; var v = look(sc, p.e); return v == null ? '' : String(v); }).join('');
  }

  function splitDecl(s) {
    var out = [], d = 0, q = null, st = 0;
    for (var i = 0; i < s.length; i++) { var c = s[i];
      if (q) { if (c === q) q = null; continue; }
      if (c === '"' || c === "'") q = c; else if (c === '(') d++; else if (c === ')') d--; else if (c === ';' && !d) { out.push(s.slice(st, i)); st = i + 1; } }
    out.push(s.slice(st));
    return out.map(function (p) { var k = p.indexOf(':'); return k < 0 ? null : [p.slice(0, k).trim(), p.slice(k + 1).trim()]; }).filter(function (x) { return x && x[0] && x[1] !== ''; });
  }
  function parseStyle(s) {
    if (s && typeof s === 'object') return s;
    var o = {}; splitDecl(String(s || '')).forEach(function (d) {
      var n = d[0];
      if (n.indexOf('--') !== 0) { n = n.toLowerCase(); if (n.indexOf('-ms-') === 0) n = n.slice(1); n = n.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }); }
      o[n] = d[1];
    });
    return o;
  }
  var pseudo = {}, pseudoN = 0, sheet = null;
  function pseudoClass(kind, css) {
    var key = kind + '|' + css; if (pseudo[key]) return pseudo[key];
    if (!sheet) { sheet = document.createElement('style'); sheet.id = 'view-pseudo'; document.head.appendChild(sheet); }
    var cls = 'v' + (pseudoN++).toString(36), sel = '.' + cls + (kind === 'before' || kind === 'after' ? '::' : ':') + kind;
    sheet.appendChild(document.createTextNode(sel + '{' + splitDecl(css).map(function (d) { return d[0] + ':' + d[1].replace(/\s*!important\s*$/, '') + ' !important'; }).join(';') + '}\n'));
    return (pseudo[key] = cls);
  }

  function compile(node) {
    if (node.nodeType === 3) {
      var t = node.nodeValue;
      if (t.indexOf('{{') < 0) return t;
      var parts = [], last = 0; t.replace(HOLE, function (m, e, i) { parts.push(t.slice(last, i), { e: e }); last = i + m.length; }); parts.push(t.slice(last));
      return { text: parts };
    }
    if (node.nodeType !== 1) return null;
    var tag = node.localName, svg = node.namespaceURI === 'http://www.w3.org/2000/svg', attrs = [];
    for (var i = 0; i < node.attributes.length; i++) { var a = node.attributes[i]; if (a.name.indexOf('hint-') === 0) continue; attrs.push({ n: a.name, c: compileAttr(a.value) }); }
    var kids = []; node.childNodes.forEach(function (c) { var k = compile(c); if (k !== null && k !== '') kids.push(k); });
    return { tag: tag, svg: svg, attrs: attrs, kids: kids };
  }
  function attr(n, name) { for (var i = 0; i < n.attrs.length; i++) if (n.attrs[i].n === name) return n.attrs[i].c; return null; }

  var muteCache = new WeakMap();
  function muted(orig) {
    var fix = function (el) { if (el) { el.muted = true; el.defaultMuted = true; el.setAttribute('muted', ''); } };
    if (!orig) return fix;
    if (muteCache.has(orig)) return muteCache.get(orig);
    var f = function (el) { fix(el); if (typeof orig === 'function') orig(el); else orig.current = el; };
    muteCache.set(orig, f); return f;
  }

  function renderKids(kids, sc) { var out = []; for (var i = 0; i < kids.length; i++) { var r = render(kids[i], sc, i); if (r !== null && r !== undefined) out.push(r); } return out; }
  function render(n, sc, key) {
    if (typeof n === 'string') return n;
    if (n.text) return R.createElement(R.Fragment, { key: key }, n.text.map(function (p, i) {
      if (typeof p === 'string') return p; var v = look(sc, p.e);
      if (v == null || v === false || v === true) return null;
      if (typeof v === 'object') return R.isValidElement(v) ? R.cloneElement(v, { key: 'h' + i }) : (Array.isArray(v) ? R.createElement(R.Fragment, { key: 'h' + i }, v) : String(v));
      return String(v);
    }));
    var tag = n.tag;
    if (tag === 'sc-for') {
      var lst = attr(n, 'list'), as = attr(n, 'as'), list = lst ? attrVal(lst, sc) : null, name = as ? attrVal(as, sc) : 'item';
      if (!Array.isArray(list)) return null;
      return R.createElement(R.Fragment, { key: key }, list.map(function (it, i) { var s = Object.create(sc); s[name] = it; s.$index = i; return R.createElement.apply(null, [R.Fragment, { key: i }].concat(renderKids(n.kids, s))); }));
    }
    if (tag === 'sc-if') {
      var vv = attr(n, 'value'), v = vv ? attrVal(vv, sc) : false;
      if (Array.isArray(v) ? !v.length : !v) return null;
      return R.createElement.apply(null, [R.Fragment, { key: key }].concat(renderKids(n.kids, sc)));
    }
    var props = { key: key }, cls = [], el = tag;
    if (tag === 'x-import') { var g = attr(n, 'component-from-global-scope'); el = g ? attrVal(g, sc) : 'div'; if (el.indexOf('-') < 0) el = window[el] || 'div'; }
    for (var i = 0; i < n.attrs.length; i++) {
      var a = n.attrs[i], nm = a.n;
      if (tag === 'x-import' && (nm === 'component-from-global-scope' || nm === 'component' || nm === 'from')) continue;
      var val = attrVal(a.c, sc);
      if (nm === 'style') { props.style = parseStyle(val); continue; }
      if (nm.indexOf('style-') === 0) { if (val) cls.push(pseudoClass(nm.slice(6), String(val))); continue; }
      if (nm === 'class') { if (val) cls.push(val); continue; }
      if (val === undefined) continue;
      if (nm === 'ref') { props.ref = val; continue; }
      if (MAP[nm]) nm = MAP[nm];
      else if (n.svg && nm.indexOf('data-') !== 0 && nm.indexOf('aria-') !== 0 && nm.indexOf('-') > 0) nm = nm.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); });
      props[nm] = val;
    }
    if (cls.length) props.className = cls.join(' ');
    if (tag === 'image-slot') {
      var st = Object.assign({ display: 'block', width: '100%', height: '100%', backgroundColor: '#1a1a19', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }, props.style || {});
      if (props.src) st.backgroundImage = 'url("' + props.src + '")';
      return R.createElement('div', { key: key, role: props.src ? 'img' : undefined, 'aria-label': props.alt || undefined, className: props.className, style: st });
    }
    if (tag === 'video' && props.muted) props.ref = muted(props.ref);
    if (typeof el === 'string' && el.indexOf('-') > 0) { for (var k in props) { if (k !== 'style' && k !== 'key' && k !== 'ref' && k !== 'children' && props[k] != null && typeof props[k] !== 'function' && typeof props[k] !== 'object') props[k] = String(props[k]); } }
    return R.createElement.apply(null, [el, props].concat(renderKids(n.kids, sc)));
  }

  window.mountView = function (templateId, Logic, defaults) {
    var src = document.getElementById(templateId).textContent;
    var doc = new DOMParser().parseFromString('<!doctype html><html><head></head><body>' + src + '</body></html>', 'text/html');
    var tree = []; doc.body.childNodes.forEach(function (c) { var k = compile(c); if (k !== null && k !== '') tree.push(k); });
    class Page extends Logic {
      render() { var vals = this.renderVals ? this.renderVals() : {}; var sc = Object.assign({}, this.props, vals); return R.createElement.apply(null, [R.Fragment, null].concat(renderKids(tree, sc))); }
    }
    RD.createRoot(document.getElementById('root')).render(R.createElement(Page, defaults || {}));
  };
})();

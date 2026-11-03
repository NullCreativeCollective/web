/* Case study SEO: per-project title, description, canonical, share tags and VideoObject data for embedded sets. */
(function () {
  var slug = ''; try { slug = new URLSearchParams(location.search).get('p') || ''; } catch (e) {}
  var all = (window.NULL_DATA && NULL_DATA.caseStudies()) || [], p = all.filter(function (q) { return q.slug === slug; })[0];
  if (!p) return;
  var SITE = 'https://nullcc.com', url = SITE + '/case-study.html?p=' + encodeURIComponent(p.slug);
  var title = String(p.title || 'Case study').replace(/(^|\s)\S/g, function (m) { return m.toUpperCase(); }) + ' — null_';
  var text = p.about || p.description || ''; if (!text && p.blocks) p.blocks.some(function (b) { if (b.type === 'text' && b.body && !/^Placeholder/.test(b.body)) { text = b.body; return true; } });
  var desc = String(text).replace(/\s+/g, ' ').trim(); if (desc.length > 158) desc = desc.slice(0, 155).replace(/\s\S*$/, '') + '…';
  function meta(attr, key, val) { if (!val) return; var m = document.head.querySelector('meta[' + attr + '="' + key + '"]'); if (!m) { m = document.createElement('meta'); m.setAttribute(attr, key); document.head.appendChild(m); } m.setAttribute('content', val); }
  document.title = title;
  meta('name', 'description', desc); meta('property', 'og:title', title); meta('property', 'og:description', desc); meta('property', 'og:url', url);
  meta('name', 'twitter:title', title); meta('name', 'twitter:description', desc);
  var c = document.querySelector('link[rel="canonical"]'); if (c) c.href = url;
  var STREAM = 'https://customer-9dru1dt3vck0fikg.cloudflarestream.com/';
  var vids = [];
  function add(name, d, m, thumb, embed, stream) {
    if (!m || !m.duration) return;
    if (stream) { embed = embed || STREAM + stream + '/iframe'; thumb = thumb || STREAM + stream + '/thumbnails/thumbnail.jpg'; }
    vids.push({ '@type': 'VideoObject', name: name || p.title, description: m.desc || d || desc, uploadDate: m.date, duration: m.duration, thumbnailUrl: thumb, embedUrl: embed, creator: { '@type': 'Organization', name: 'null_' } });
  }
  (function walk(o) {
    if (!o || typeof o !== 'object') return;
    if (Array.isArray(o)) { o.forEach(walk); return; }
    if (o.keyMeta) add(o.keyTitle ? o.keyTitle + ' — ' + (o.event || p.title) : p.title, '', o.keyMeta, o.keyThumb, typeof o.embed === 'string' ? o.embed : '', o.keyStream);
    if (o.meta && o.meta.duration) add(o.title || o.alt, '', o.meta, o.thumb, o.url || (typeof o.embed === 'string' ? o.embed : ''), o.stream);
    for (var k in o) if (k !== 'keyMeta' && k !== 'meta' && o[k] && typeof o[k] === 'object') walk(o[k]);
  })(p);
  var ld = { '@context': 'https://schema.org', '@graph': [{ '@type': 'CreativeWork', name: title, url: url, description: desc, creator: { '@type': 'Organization', name: 'null_', url: SITE + '/' }, dateCreated: p.year || undefined }].concat(vids) };
  var s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(ld); document.head.appendChild(s);
})();

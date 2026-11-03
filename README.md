# null_ — nullcc.com

Static website. No build step, no server code. Open it, edit it, push it.

## Run locally
- **VS Code:** install the **Live Server** extension → right-click `index.html` → **Open with Live Server**.
- **Or terminal:** `npx serve` in this folder, then open the address it prints.

Opening `index.html` by double-click (file://) won't work fully: browsers block the 3D models, the wiggle list and the case study overlay from local files. Always use Live Server or `npx serve`.

## Structure
```
index.html          homepage (markup lives in the <script type="text/html" id="view"> block)
case-study.html     every case study page: case-study.html?p=<slug>
css/site.css        global styles, loading screen, reduced-motion rules
js/site.js          homepage logic (hero wiggles, index hovers, overlay transition…)
js/case-study.js    case study logic (galleries, sequences, set switcher…)
js/null-stage.js    3D stages (three.js): models, screen mapping, cameras, lights
js/seo.js           per-case-study title, description and video data for Google
js/view.js          small renderer that turns the page markup into the live page
js/vendor/          React and three.js (saved locally, no CDN needed)
data/projects.js    ALL content: index, services, design grid, documentation, clients, case studies
media/              images, videos, logos, wiggle frames
models/             3D stage models (.glb)
sitemap.xml, robots.txt, _headers (Cloudflare caching), 404.html
```

## Editing content
Everything text- and media-related is in **`data/projects.js`**:
- `index` — homepage section list and hover images
- `services` — Album Rollouts A–D and their hover previews
- `design` — Brand Identity & Design grid (thumbnail, caption, link to its case study)
- `documentation` — Event Coverage frames (wiggle/still, caption, Instagram link or case study)
- `clients` — "Trusted by" logos
- `caseStudies` — every case study page: details panel, text blocks, images, videos, embeds

Layout and styling are inline in the markup blocks of `index.html` and `case-study.html`.

## Add a design project
1. Put its media in `media/<project>/`.
2. In `caseStudies`, copy an existing design entry, give it a new `slug`, and edit the details and `blocks`.
3. In `design`, add a grid item with `href: 'case-study.html?p=<slug>'`, a thumbnail `img` and a caption.
4. Add `https://nullcc.com/case-study.html?p=<slug>` to `sitemap.xml`.

## Add a documentation set (Cloudflare Stream)
1. Upload the video to Stream, copy its Video ID.
2. In `caseStudies`, copy the Famalay (`doc-01`) entry; set `onSite: true` so it joins the prev/next loop.
3. Paste the ID into `embed`/`sets`, and fill `keyMeta` (`date`, `duration` like `PT1H28M1S`, `desc`) — that becomes Google video data.
4. Add its frame to `documentation`.

## Hero wiggles
Frames live in `media/wiggles/b*/`. `media/wiggles/manifest.json` lists every wiggle and its 4 frames (played 1-2-3-4-3-2). Add a batch folder, then add its entries to the manifest.

## Fonts
Brand font is Adobe Fonts project **fsq6hvs**. Add every domain the site runs on (nullcc.com, www.nullcc.com, your `*.pages.dev`) in fonts.adobe.com → Web Projects, or the font won't load there.

## Deploy
See `DEPLOY.md`.

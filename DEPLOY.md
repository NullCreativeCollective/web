# null_ — Launch guide

Moving nullcc.com from GitHub Pages to Cloudflare Pages, adding Cloudflare Stream for the set recordings, and keeping Google Workspace email working.

**Current setup:** domain registered at **Squarespace** (bought through Google Workspace), DNS managed in Squarespace and pointing at **GitHub Pages**, email on **Google Workspace**.

## Phase 0 — Before anything (10 min)

- **Back up your DNS.** Squarespace → **Domains** → nullcc.com → **DNS** (DNS Settings). Screenshot or copy every record, including the "Google Workspace" preset section. The email records:

- **MX**: Google mail servers (`smtp.google.com`, or the `aspmx.l.google.com` set)

- **TXT @**: SPF `v=spf1 include:_spf.google.com ~all`, plus any `google-site-verification=…`

- **TXT google._domainkey**: DKIM

- **TXT _dmarc**: DMARC, if present

- For reference: the GitHub Pages records are A records `185.199.108–111.153` and a `www` CNAME to `yourname.github.io`

- **DNSSEC.** In Squarespace → Domains → nullcc.com → DNS → **DNSSEC**: if it's on, turn it off now. You'll turn it back on in Cloudflare later.

## Phase 1 — Cloudflare Stream (before the final export)

- Create an account at **dash.cloudflare.com** (free), using the company email.

- Left menu → **Stream** → subscribe and add a card. Billed monthly: about 520 minutes stored is the $5 minimum, plus $1 per 1,000 minutes watched.

- Stream → **Upload** → drag in the set recordings and broadcast videos. Encoding takes a few minutes each.

- Open each video and copy its **Video ID**. Keep a list: video name → ID.

- Stream → **Settings** → **Allowed origins**: add `nullcc.com`, `www.nullcc.com`, `*.pages.dev`.

- Send the list to Claude → the IDs go into the embed slots → final zip is exported.

## Phase 2 — Test the zip locally (15 min)

- Unzip into a new folder and open it in VS Code.

- Install the **Live Server** extension → right-click `index.html` → **Open with Live Server** (or run `npx serve`).

- Click through everything: case study transitions, wiggles, 3D stages, videos, mobile view (browser dev tools → phone toggle).

## Phase 3 — Replace the GitHub repo content (10 min)

- Open the current repo locally, or clone it: `git clone https://github.com/you/repo`

- Delete everything in it **except the hidden `.git` folder**, then copy in the contents of the zip.

- If there's a file called `CNAME` (GitHub's custom-domain file), leave it until Phase 7.

- Commit and push:

```
git add -A
git commit -m "New null_ site"
git push
```

GitHub Pages will briefly serve the new site on nullcc.com. That's fine.

## Phase 4 — Connect the repo to Cloudflare Pages (10 min)

- Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → authorise GitHub → pick the repo.

- Build settings: production branch `main`, framework preset **None**, build command _empty_, build output directory `/`.

- **Save and Deploy.** After about a minute you get `your-project.pages.dev`. Test everything there.

- **Adobe Fonts:** fonts.adobe.com → Web Projects → **fsq6hvs** → domains → add `nullcc.com`, `www.nullcc.com`, `your-project.pages.dev`. Without this the brand font won't load.

## Phase 5 — Move the domain's DNS to Cloudflare (20 min + waiting)

- Cloudflare → **Add a domain** → `nullcc.com` → **Free** plan.

- Cloudflare scans and copies existing records. Compare them line by line with your Phase 0 backup:

- MX, SPF, DKIM, DMARC and verification TXT must all be there, unchanged, as **DNS only** (grey cloud). **Add any that are missing by hand**: Squarespace's Google Workspace preset records don't always get picked up by the scan.

- **Delete** the GitHub Pages records: the four `185.199.x.x` A records, any AAAA records, and the `www` → github.io CNAME. Phase 6 adds the right ones.

- Keep anything you don't recognise.

- Note the two Cloudflare nameservers (like `xxx.ns.cloudflare.com`).

- **Switch nameservers at Squarespace:** Domains → nullcc.com → DNS → **Domain Nameservers** → **Use custom nameservers** → paste the two Cloudflare ones → save.
  
From this moment Squarespace's own DNS records stop being used, which is why everything must already be copied into Cloudflare.

- Wait: usually 15–60 minutes, at most 24 hours. Cloudflare emails you when the domain is **Active**. Website and email keep working during the switch, since both sides have the same email records.

## Phase 6 — Point nullcc.com at the Pages site (5 min)

- Workers & Pages → your project → **Custom domains** → **Set up a domain** → `nullcc.com`, then again for `www.nullcc.com`. DNS records and the HTTPS certificate are created automatically.

- Redirect `www` → `nullcc.com`: your domain → **Rules** → **Redirect Rules** → template "Redirect from WWW to root".

- Domain → **SSL/TLS** → mode **Full**; under **Edge Certificates** switch on **Always Use HTTPS**.

- DNSSEC, if you turned it off: domain → **DNS** → **Settings** → enable DNSSEC. Cloudflare gives you a DS record; add it in Squarespace → Domains → nullcc.com → DNS → DNSSEC.

## Phase 7 — Turn off GitHub Pages (2 min)

- GitHub repo → **Settings** → **Pages** → remove the custom domain → Source **None** (or "Unpublish site").

- Delete the `CNAME` file from the repo, commit, push. The repo stays as the source; Cloudflare reads it on every push.

## Phase 8 — Check email and Google (10 min)

- Send a message from an outside address to info@nullcc.com, and reply from it.

- **mxtoolbox.com** → MX Lookup and SPF Lookup for nullcc.com should show Google.

- Google Workspace: nothing to change, as long as the records are the same. Squarespace keeps the domain registration and the Workspace billing; only DNS moves.

- **Search Console:** search.google.com/search-console → add property **nullcc.com** (Domain) → add the TXT record it gives you in Cloudflare DNS → submit `https://nullcc.com/sitemap.xml`.

## Day-to-day after launch

- **Update the site:** edit in VS Code → commit → push. Live on nullcc.com in about a minute.

- **Previews:** push to any other branch for its own preview link; the live site doesn't change.

- **Roll back:** Workers & Pages → project → **Deployments** → older deployment → **Rollback**.

- **Analytics (optional, free):** Cloudflare → **Web Analytics**. No cookie banner needed.

- **New videos:** upload to Stream → copy the ID → add it to the project data file → push.

## If something goes wrong

- **Email stops:** in Cloudflare DNS, compare MX, SPF and DKIM with your backup and fix any difference. Recovers within minutes.

- **Full rollback:** in Squarespace, switch the nameservers back to **Squarespace nameservers**. The old records come back into use; turn GitHub Pages back on for the old site.

## Ongoing costs

- Cloudflare Pages: free.

- Cloudflare Stream: about $5–6 a month at this size.

- Unchanged: Squarespace domain renewal and Google Workspace.

## Analytics (free, no cookie banner)
- Cloudflare → Workers & Pages → your project → **Metrics** → enable **Web Analytics**.
- Add the site to Google Search Console (Phase 8) and submit `https://nullcc.com/sitemap.xml`.

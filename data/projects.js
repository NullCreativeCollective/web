/* null_ — site content.
   Everything the pages list lives here: homepage index, services, design work, documentation, clients and every case study.
   Each entry is a function that returns plain data; edit the objects inside, keep the commas.
   Media paths are relative to the site root (./media/...). Case study links: case-study.html?p=<slug>. */
window.NULL_DATA = {

  // Brand Identity & Design grid (homepage)
  design: function () {
    return [
        { href: 'case-study.html?p=qiddiya-elite-esports-bootcamp', id: 'gd-1', ratio: '1/1', ph: 'Qiddiya Elite Esports Bootcamp — key visual', cap: 'Qiddiya Elite Esports Bootcamp — Identity, Motion graphics, LED mapping, 2024', img: './media/design/qiddiya-elite-esports-bootcamp.jpg', alt: 'Qiddiya Elite Esports Bootcamp — LED ribbon screens and branded entrance arches' },
        { href: 'case-study.html?p=crowdlist-2026', id: 'gd-2', ratio: '2/3', ph: 'Crowdlist — key visual', cap: 'Crowdlist — Brand strategy, Identity, 2026', img: './media/design/crowdlist-posters.jpg', alt: 'Crowdlist posters wheatpasted on a painted brick wall' },
        { href: 'case-study.html?p=afc-easian-cup', id: 'gd-3', ratio: '4/5', ph: 'AFC eAsian Cup — key visual', cap: 'AFC eAsian Cup — Broadcast, Venue, Print, 2024', img: './media/design/afc-easian-cup.jpg', alt: 'AFC eAsian Cup — esports stage with turf pitch, LED-edged risers and branded player desks' },
        { href: 'case-study.html?p=jazz-dock', id: 'gd-4', ratio: '1/1', ph: 'Jazz Dock — key visual', cap: 'Jazz Dock — Branding, Illustration, 2023', img: './media/design/jazz-dock.jpg?v=2', alt: 'Jazz Dock — green vinyl with the illustrated label on a Technics turntable' },
        { href: 'case-study.html?p=elko', id: 'gd-5', ph: 'ELKO — key visual', cap: 'ELKO — Web design, Identity, 2026', img: './media/design/elko.jpg', alt: 'ELKO — Elko 91 website on a laptop in an industrial pipework render' },
        { href: 'case-study.html?p=seera-album-rollout', id: 'gd-6', ph: 'seera — key visual', cap: 'seera — Album rollout, Merchandise, 2025', img: './media/design/seera-album-rollout.jpg', alt: 'seera — album cover in a record crate among other LPs' },
      ];
  },

  // Homepage index (section list + hover images)
  index: function () {
    return [
        { n: '01', label: 'Mapping & Live Visuals', href: '#visuals' },
        { n: '02', label: 'Brand Identity & Design', href: '#design' },
        { n: '03', label: 'Event Coverage & Live Recording', href: '#documentation' },
        { n: '04', label: 'Album Rollouts & Artist Campaigns', href: '#production' },
      ];
  },

  // Album Rollouts A–D subsections (hover previews)
  services: function () {
    return [
      { n: 'A', name: 'Album Rollouts', desc: 'Creative direction, cover art, sleeve and label artwork, and campaign assets for singles, EPs and albums.', img: './media/production/album-rollouts.jpg', ratio: '1920/1280' },
      { n: 'B', name: 'Physical Releases & Merchandise', desc: 'Vinyl, apparel, prints and physical goods, designed and produced for tours and releases.', img: '', vid: './media/production/merch.mp4', ratio: '792/720', prevW: 'clamp(203px,18.2vw,278px)' },
      { n: 'C', name: 'Music Videos', desc: 'Concept, direction and edit, developed with the artist to fit the release.', img: './media/production/music-videos.jpg', ratio: '3/2' },
      { n: 'D', name: 'Music Production Support', desc: 'Writing, arrangement and recording sessions, set up with our network of producers, in studio or remote.', img: './media/production/audio-production.jpg?v=2', ratio: '16/9' },
    ];
  },

  // "Trusted by" logos
  clients: function () {
    return [
      { name: 'YaLLa Esports', logo: './media/clients/yalla-esports.png', ar: 1 },
      { name: 'XP Music Futures', logo: './media/clients/xp.png', ar: 1.04, scale: 1.2 },
      { name: 'Onyx', logo: './media/clients/client-x.png', ar: 1.25 },
      { name: 'Lucerna Music Bar', logo: './media/clients/lucerna.png', ar: 2.9, scale: 1.12 },
      { name: '8flamez', logo: './media/clients/8flamez.png', ar: 0.81 },
      { name: 'Asian Football Confederation', logo: './media/clients/afc.png', ar: 2.78 },
      { name: 'Mana', logo: './media/clients/client-emblem.png', ar: 5.28 },
      { name: 'EarthSonic', logo: './media/clients/earthsonic.png', ar: 6.25 },
      { name: 'EVO', logo: './media/clients/evo.png', ar: 1.05 },
      { name: 'Nasr eSports', logo: './media/clients/nasr-esports.png', ar: 0.79 },
      { name: 'Qiddiya', logo: './media/clients/qiddiya.png', ar: 1.07, scale: 1.12 },
      { name: 'SWIM', logo: './media/clients/swim.png', ar: 2.88 },
      { name: 'MDLBEAST', logo: './media/clients/client-wing.png', ar: 0.95 },
      { name: 'Riot Games', logo: './media/clients/riot-games.png', ar: 3.49 },
      { name: 'Brij Entertainment', logo: './media/clients/client-calligraphy.png', ar: 1.3 },
      { name: 'Fuchs2', logo: './media/clients/client-f2.png', ar: 0.73 },
      { name: 'Burgerizzr', logo: './media/clients/burgerizzr.png', ar: 1, scale: 1.25 },
      { name: 'Altenburg 1964', logo: './media/clients/atg.png', ar: 2.85 },
      { name: 'seera', logo: './media/clients/seera.png', ar: 1.67 },
      { name: 'Crowdlist', logo: './media/clients/crowdlist.png', ar: 9.61 },
      { name: 'GCON', logo: './media/clients/gcon.png', ar: 3.75 },
      { name: '2.Patro', logo: './media/clients/2patro.png', ar: 0.75 },
      { name: 'Duck Down Music', logo: './media/clients/duck-down.png', ar: 1.01, scale: 1.3 },
      { name: 'Molotow', logo: './media/clients/molotow.png', ar: 1 },
      { name: 'Dope D.O.D.', logo: './media/clients/dope-dod.png', ar: 3.97 },
      { name: 'Žižkovsiska', logo: './media/clients/zizkovsiska.png', ar: 0.3 },
      { name: 'Snak the Ripper', logo: './media/clients/snak.png', ar: 1.79, scale: 1.25 },
        { name: 'Twisted Minds', logo: './media/clients/twis.png', ar: 1.47 },
    ];
  },

  // Event Coverage frames (homepage)
  documentation: function () {
    return [
        { id: 'doc-1', ratio: '1598/720', w: 'clamp(280px,42vw,640px)', ph: 'crowd — film', cap: 'Famalay, Prague', n: '01', vid: './media/documentation/famalay.webm' },
        { id: 'doc-2', ratio: '4/5', w: 'clamp(200px,24vw,360px)', ph: 'backstage portrait', cap: 'A$AP Rocky, Riyadh', n: '02', gif: './media/documentation/asap-rocky.jpg', link: 'https://www.instagram.com/theactualstash/p/DDuNDsYM7Hl/' },
        { id: 'doc-3', ratio: '1280/934', w: 'clamp(280px,42vw,640px)', ph: 'aftermovie still', cap: 'DJ Blacky, Jeddah', n: '03', vid: './media/documentation/blacky.webm' },
        { id: 'doc-4', ratio: '4/5', w: 'clamp(200px,24vw,360px)', ph: 'DJ booth — flash', cap: 'Onyx, Prague', n: '04', vid: './media/documentation/onyx.mp4', link: 'https://www.instagram.com/p/C7-VU6xIJMu/' },
        { id: 'doc-5', ratio: '827/1241', w: 'clamp(180px,20vw,300px)', ph: 'Marwan Moussa', cap: 'Marwan Moussa, Riyadh', n: '05', img: './media/documentation/marwan-moussa.jpg', alt: 'Marwan Moussa mid-kick on stage in teal haze, hands up in the crowd', link: 'https://www.instagram.com/p/DJG6xbrM_dw/' },
        { id: 'doc-6', ratio: '4/5', w: 'clamp(200px,24vw,360px)', ph: 'BAS — wiggle', cap: 'BAS, Riyadh', n: '06', wig: ['./media/documentation/bas-wig-01.webp', './media/documentation/bas-wig-02.webp', './media/documentation/bas-wig-03.webp', './media/documentation/bas-wig-04.webp'], alt: 'BAS performing in a paisley jacket, arm raised, red light behind', noLink: true },
      ];
  },

  // Case studies (design, AV and documentation pages). slug = case-study.html?p=<slug>
  caseStudies: function () {
    const ph = (slug, title, year) => ({
      slug, title, year, section: 'Graphic design', client: 'Client', location: 'City, Country',
      services: ['Identity', 'Print'], credits: ['Art direction — Name', 'Design — Name'], link: { label: '', href: '' },
      about: 'Placeholder. Two or three sentences introducing the project, the client and what made it interesting.',
      blocks: [
        { type: 'full', ratio: '16/9', ph: 'key visual' },
        { type: 'text', label: 'Brief', body: 'Placeholder. One or two sentences on what the client needed.' },
        { type: 'pair', ratio: '4/5', ph: ['application', 'detail'] },
        { type: 'text', label: 'Approach', body: 'Placeholder. How the idea was developed and why.' },
        { type: 'full', ratio: '16/9', ph: 'system overview' },
        { type: 'text', label: 'Outcome', body: 'Placeholder. What was delivered and where it ran.' },
      ],
    });
    return [
      (() => { const q = { ...ph('qiddiya-elite-esports-bootcamp', 'Qiddiya – Elite Esports Bootcamp | Esports World Cup 2024', '2024'), logoVideo: './media/qiddiya/logo-anim.mp4', lvCrop: [300, 280, 1310, 544, 1920, 1080], logoAr: '1310/544', logoMax: 'clamp(200px,17vw,320px)', shortTitle: 'Qiddiya Esports', client: 'Qiddiya', location: 'Riyadh, Saudi Arabia', whereLogo: './media/clients/ewc-white.svg', whereLogoAr: '5', whereLogoAlt: 'Esports World Cup', whereLogoW: 'clamp(96px,7.5vw,140px)',
        services: ['Art direction', 'LED content and canvas planning', 'Motion graphics', 'UI/UX', 'Social'],
        about: 'Qiddiya City is building a permanent Esports Bootcamp in its Gaming & Esports District, a place where players train like pros. For Esports World Cup 2024 in Riyadh, Qiddiya brought that idea forward as the Elite Esports Bootcamp: a live activation where fans could take on pro-level skill challenges, climb the leaderboards and meet some of the region\'s biggest creators.' };
        const T = { Brief: 'Qiddiya wanted the Elite Esports Bootcamp to feel like a first look at its future esports district, and the booth\'s screens had to carry that. That meant one visual system across around 150m² of LED, from a 107m ultra-wide exterior wrap to an interactive floor and live leaderboard, extended into game UI, pavilion assets and social.',
          Approach: 'We took the art direction from the district\'s visual language: neon, HUD-style overlays, system-boot text and a bold type grid. We turned that into a flexible system around the line "Start Your Path to Pro." The hardest canvas was the outside of the booth, an ultra-wide ribbon over 14,000px across. We built test maps for every surface to plan the content, which also became the reference for the final technical mapping. We designed motion that reads as one continuous loop around the booth and still works from any single side. Inside, the same system drove the three-screen wall, a curved screen, an interactive LED floor, a live leaderboard and the angled corner pillars. It also ran through the bilingual interfaces for the three challenges (Precision, APM and Reaction Speed) and the reward dispenser. The system was built as a template, so each creator appearance across the eight weeks got its own set of LED, print and social assets without breaking the look.',
          Outcome: 'We delivered content for roughly 150m² of LED across every surface of the booth, plus pavilion pillars, game and dispenser UI, and a social campaign covering the challenges, leaderboards, giveaways and every creator meet-up. Over the summer the Elite Esports Bootcamp welcomed more than 26,000 visitors and hosted a rotating roster of creators, from international names like Nobru, JakenBake and Omareloff to Team Falcons creators Abu Omar, xSMA333, Banderita, DRB7H, FZX, 3adel, Raed, Aziz, LLE, Oden and Opiilz.' };
        const AP = T.Approach.split(/(?<=Pro\.")\s|(?<=single side\.)\s|(?<=reward dispenser\.)\s/);
        q.blocks = [
          { type: 'full', ratio: '16/9', ph: 'key visual', stage3d: 4 },
          { type: 'text', label: 'Brief', body: T.Brief },
          { type: 'full', ratio: '21/9', img: './media/qiddiya/gallery/hall-wide.webp', bgPos: 'center 45%', alt: 'The Elite Esports Bootcamp in the Esports World Cup hall, its LED ribbon announcing the day\'s creator' },
          { type: 'text', label: 'Approach', body: AP[0] },
          { type: 'grid', cols: '7fr 5fr', align: 'end', items: [{ img: './media/qiddiya/gallery/logo-crowd.webp', ratio: '16/9', alt: 'Visitors gathered under the lit Qiddiya sign inside the booth' }, { img: './media/qiddiya/gallery/exterior-nobru.webp', ratio: '4/5', alt: 'The booth exterior during the Nobru appearance: ribbon, pillar screens and HUD type', pos: '58% center' }] },
          { type: 'text', cont: true, body: AP[1] },
          { type: 'grid', cols: '1fr', items: [{ img: './media/qiddiya/gallery/ribbon-night.webp', ratio: '21/9', alt: 'Long exposure of the booth at night, the exterior ribbon running around its top', pos: 'center 35%' }] },
          { type: 'grid', cols: '5fr 7fr', align: 'start', items: [{ img: './media/qiddiya/gallery/pillar-lle-3adel.webp', ratio: '4/5', alt: 'Angled corner pillar screen and ribbon set for the LLE & 3adel meet-up', pos: '50% center' }, { img: './media/qiddiya/gallery/meet-raed.webp', ratio: '3/2', alt: 'The ribbon wrapping the entrance for Meet Raed, the communal leaderboard inside' }] },
          { type: 'text', cont: true, body: AP[2] },
          { type: 'grid', cols: '1fr 1fr 1fr', items: [{ img: './media/qiddiya/gallery/vr-precision.webp', ratio: '4/5', alt: 'A creator in VR taking the Precision challenge', pos: '55% center' }, { img: './media/qiddiya/gallery/reaction-cheer.webp', ratio: '4/5', alt: 'Visitors celebrating at the Reaction Speed pads', pos: '30% center' }, { img: './media/qiddiya/gallery/vr-player.webp', ratio: '4/5', alt: 'A visitor laughing after his run, VR headset in hand', pos: '42% center' }] },
          { type: 'text', cont: true, body: AP[3] },
          { type: 'grid', cols: '7fr 5fr', align: 'start', items: [{ img: './media/qiddiya/gallery/creator-visit.webp', ratio: '16/9', alt: 'A creator at the booth on August 13th, the ribbon dated for his appearance' }, { img: './media/qiddiya/gallery/creator-selfie.webp', ratio: '4/5', alt: 'A creator taking a selfie with a fan in front of his face on the screens', pos: '55% center' }] },
          { type: 'text', label: 'Outcome', body: T.Outcome },
          { type: 'grid', cols: '8fr 4fr', align: 'end', items: [{ img: './media/qiddiya/gallery/creator-queue.webp', ratio: '3/2', alt: 'A creator greeting the queue beside his pillar screen' }, { img: './media/qiddiya/gallery/cosplay.webp', ratio: '3/4', alt: 'Cosplayers posing with fans on a Friday meet-up', pos: '42% center' }] },
        ]; return q; })(),
      {
        slug: 'crowdlist-2026', title: 'Crowdlist', logo: './media/clients/crowdlist-wordmark.png', logoAr: '6122/600', logoFull: true, year: '2026', section: 'Graphic design',
        client: 'Crowdlist', location: 'Riyadh, Saudi Arabia', services: ['Brand strategy', 'Identity', 'Print', 'Social media', 'Motion'],
        credits: ['Art direction — Name', 'Design — Name', 'Motion — Name'],
        about: 'A bilingual identity for Crowdlist, a ticket resale platform in Saudi Arabia, built around one idea: everyone counts.',
        blocks: [
          { type: 'video', blend: true, ratio: '16/9', src: './media/crowdlist/sizzle.webm', alt: 'Crowdlist sizzle: pattern system in motion' },
          { type: 'text', label: 'Brief', body: "Ticket resale already exists in the region, but much of it is informal: scattered across chats, with no way to tell who is legitimate. Crowdlist's position is that resale isn't the problem. A market with no visible accountability is." },
          { type: 'seqRow', ratio: '4/5', zoom: 1.15, list: ['./media/crowdlist/social-feed-scroll.webm', './media/crowdlist/social-story-sequence.webm', './media/crowdlist/social-carousel-swipe.webm'], alt: 'Crowdlist social — feed scroll, story sequence and carousel swipe', side: './media/crowdlist/poster-culture.webm', sideAlt: 'Crowdlist poster loop — Culture' },
          { type: 'bleedVideo', vsrc: './media/crowdlist/dynamic-bars.mp4', valt: 'Crowdlist wordmark with dynamic bars', crop: [448, 450, 1240, 180, 1920, 1080] },
          { type: 'markText', ratio: '1200/900', img: './media/crowdlist/monogram-trim.png', alt: 'Crowdlist monogram in Signal yellow', body: "The monogram uses the bars from the I in the wordmark, set thick to thin, with a half-circle notch on each edge like a ticket stub. It replaces the wordmark where the full name doesn't fit." },
          { type: 'palette', body: 'Six category colors, one for each kind of night out: sport, music, stage, festival, nightlife and culture.', cells: [
            { label: 'Sport', name: 'Turf', color: '#267c3c', ink: '#ffffff', img: './media/crowdlist/palette-1b.jpg', alt: 'Sport — Al Nassr players celebrating a goal in front of a yellow crowd' },
            { label: 'Music', name: 'Magenta', color: '#f611d2', ink: '#0b0b0b', img: './media/crowdlist/palette-2b.jpg', alt: 'Music — singer on stage in front of a sea of phone lights' },
            { label: 'Stage', name: 'Blue', color: '#4666f3', ink: '#0b0b0b', img: './media/crowdlist/palette-3b.jpg', alt: 'Stage — UFC lighting rig and screen above the octagon' },
            { label: 'Festival', name: 'Volt', color: '#58ff88', ink: '#0b0b0b', img: './media/crowdlist/palette-4b.jpg', alt: 'Festival — Soundstorm main stage lit green' },
            { label: 'Nightlife', name: 'Amethyst', color: '#9232b5', ink: '#ffffff', img: './media/crowdlist/palette-5b.jpg', alt: 'Nightlife — dining under The Globe with the Riyadh skyline at night' },
            { label: 'Culture', name: 'Red', color: '#f22d4b', ink: '#0b0b0b', img: './media/crowdlist/palette-6b.jpg', alt: 'Culture — Red Sea International Film Festival venue at night' },
          ] },
          { type: 'text', label: 'Approach', body: 'One person, one pixel. The identity is built from parts you can count: a single unit sets every margin, column and type size, and every seat, date and price is set plainly in mono. The crowd is drawn as pixels, and the wordmark carries it in its bars.' },
          { type: 'pixels', panels: [
            { name: 'Gather', rows: ['....................','......#...#.........','.............#....#.','............##......','#.#...#.....#..#....','##.##.##...###.###.#','.###.#.##.#.##.#.###','##.####.###.###.####','#.###.##.##.#.###.#.','###.####.###y##.####','####################','####################'] },
            { name: 'Queue', rows: ['....................','##.###############..','....................','####.#y#####.#####..','....................','##############......','....................','.###########........','....................','##########..........','....................','########............'] },
            { name: 'Surge', rows: ['....................','.........#..........','.........##.........','.......#.###........','.......##.#.#.......','......###y####......','....############....','.....##.#.###.##....','......#..##.#.......','......#..#..........','......#.............','....................'] },
            { name: 'Sold', rows: ['....................','.#........#.........','.##...#.#..#####y###','##...##..#########.#','####################','####################','####################','####################','####################','####################','####################','####################'] },
          ] },
          { type: 'video', ratio: '16/9', list: ['./media/crowdlist/restructure-06.webm', './media/crowdlist/restructure-07.webm'], alt: 'Crowdlist layout system — restructure sequence', ph: 'motion loop' },
          { type: 'mockup', ratio: '4/2.75', bgPos: 'center top', ph: 'mockup — billboard', img: './media/crowdlist/mockup-billboard.jpg', alt: 'Crowdlist corner billboard: Soundstorm sold out? There is still room in the storm.' },
          { type: 'mockup', ratio: '3/2', ph: 'mockup — tee', img: './media/crowdlist/mockup-tee.jpg', alt: 'Crowdlist monogram printed on the back of a charcoal tee' },
          { type: 'full', ratio: '2400/1800', img: './media/crowdlist/mockup-tennis.jpg', alt: 'Crowdlist court wrap: the wordmark and green pixel crowd printed along a tennis court sideline' },
          { type: 'full', ratio: '2400/1800', img: './media/crowdlist/pillar-banners.jpg', alt: 'Crowdlist pillar banners in a sunlit atrium: magenta portrait and yellow pixel crowd' },
          { type: 'text', label: 'Outcome', body: 'Delivered as a full bilingual system, from wordmark and textures to six category colors, typography, posters, social, motion, merch, event cards, newsletter along with a comprehensive brand guidelines book.' },
        ],
      },
      { ...ph('afc-easian-cup', 'AFC eAsian Cup', '2024'), client: 'AFC', location: 'Doha, Qatar', services: ['Broadcast','Venue','Print'],
        blocks: [{ type: 'trophy', dir: './media/afc/trophy/', n: 175, from: 12, to: 150, w: 520, h: 694, text: 'Case study coming' }] },
      { ...ph('jazz-dock', 'Jazz Dock', '2023'), logo: './media/clients/jazz-dock-mark-white.svg', logoAr: '264/364', logoMax: 'clamp(84px,7vw,128px)', client: 'Jazz Dock', location: 'Prague, Czech Republic', services: ['Rebrand','Logo design','Visual identity','Illustration','Brand applications'],
        about: 'Jazz Dock is a jazz club on the banks of the Vltava in Prague, a riverside bar and stage hosting live jazz every night. The venue had plenty of character, from the river views to the metal musician sculptures that stand outside, but its old identity didn\'t show it. We rebranded the club to bring that character into everything it puts out.',
        blocks: [
          { type: 'full', ratio: '16/9', img: './media/jazz-dock/loop.gif', fit: 'contain', bgCol: '#ea12d1', alt: 'Animated illustration of a trumpet player on magenta' },
          { type: 'text', label: 'Brief', body: 'The old Jazz Dock identity was a heavy, generic wordmark that could have belonged to any bar. The club wanted a brand with the same personality as the place itself: playful, musical and rooted in the riverside setting, and flexible enough to carry its programme, its bar and its merchandise.' },
          { type: 'full', ratio: '2450/1639', img: './media/jazz-dock/mockup-1.jpg', alt: 'Jazz Dock Friday Jam poster in a bus shelter at night' },
          { type: 'full', ratio: '3257/2142', img: './media/jazz-dock/mockup-2.jpg', alt: 'Jazz Dock Vibe by Vltava poster on a lit street column at night' },
          { type: 'full', blend: true, ratio: '16/9', img: './media/jazz-dock/logo-before-after.gif', alt: 'Before and after: the old Jazz Dock wordmark wiped across to the new jd logo' },
          { type: 'video', blend: true, ratio: '1920/640', src: './media/jazz-dock/tile-loop.webm', alt: 'Jazz Dock illustration tiles looping' },
          { type: 'grid', cols: '1fr 1fr', align: 'end', items: [{ img: './media/jazz-dock/detail.jpg', ratio: '1792/2400', alt: 'Stacked Jazz Dock gift boxes in magenta and teal with the jd mark' }, { img: './media/jazz-dock/p1.jpg', ratio: '1240/1754', alt: 'Jazz Dock Friday Jam poster: an illustrated bassist in black on magenta' }] },
          { type: 'grid', cols: '1fr 1fr', align: 'end', items: [{ img: './media/jazz-dock/p2.jpg', ratio: '2480/3508', alt: 'Jazz Dock Vibe by Vltava poster: dancers in black on green' }, { img: './media/jazz-dock/coasters.jpg', ratio: '1434/1921', alt: 'Jazz Dock coasters on a bar table: happy hour is every hour with a loved one' }] },
          { type: 'text', label: 'Approach', body: 'We started from what was already there. The wire sculptures of musicians outside the club inspired the logo, a single continuous line that draws the J and D the way the sculptures draw their players, finished with a hand-drawn feel that nods to notes on a jazz score. Around it, we built a set of bold illustrations: musicians and dancers in heavy black shapes with fine line detail, bent and stretched into the rhythm of the music and set against bright, flat colour. Together, the logo and illustrations carry the identity across posters, coasters, merchandise and street campaigns like "Vibe by Vltava", giving the club a voice that\'s loose, warm and confident, like a good jazz set.' },
          { type: 'full', ratio: '1464/1074', img: './media/jazz-dock/system-overview.jpg', alt: 'Jazz Dock on the Vltava at night with the neon jd sign', cap: 'System overview' },
          { type: 'text', label: 'Outcome', body: 'A new identity that finally matches the venue, with a logo drawn from the club\'s own sculptures and an illustration system that gives Jazz Dock a recognisable, characterful presence from the riverside to the street.' },
        ] },
      (() => { const q = { ...ph('elko', 'ELKO', '2026'), scrollSeq: { dir: './media/elko/heater/', n: 60, from: 1, to: 58, w: 760, h: 492, flip: false }, client: 'Elko 91', location: 'Sofia, Bulgaria', services: ['Web design','Identity'],
        about: 'Elko 91 is a Sofia-based manufacturer of custom electric heaters that has been in business since 1991. It makes tubular, ceramic and cartridge heaters for industrial machinery, professional kitchens and household appliances.',
        link: { label: 'elko91.eu', href: 'https://elko91.eu' }, logo: './media/clients/elko-logo-white.svg', logoAr: '345.179/292.864', logoMax: 'clamp(84px,7vw,128px)' };
        const T = { Brief: 'Create the company\'s online presence from scratch: a visual identity and a website that presents a large range of technical products clearly to both industrial and commercial clients.',
          Approach: 'Built the identity around a curvy "E" logo that echoes a bent tubular heater, and carried it through as stacked rounded pills and animated gradient buttons. All 3D graphics and product animations were created in-house, and the client\'s technical copy was structured into a clear hierarchy of video heroes, application grids and spec rows.',
          Outcome: 'A fully custom, multi-page website that gives a 30-year-old manufacturer a modern, distinctive digital presence. Original 3D visuals and a consistent design language run through every page, and the site is built for SEO from the ground up, so Elko 91 is easy to find for anyone looking for heaters in Bulgaria.' };
        q.blocks = q.blocks.map(bl => bl.type === 'text' && T[bl.label] ? { ...bl, body: T[bl.label] } : bl.type === 'full' && bl.ph === 'key visual' ? { type: 'video', blend: true, ratio: '16/9', src: './media/elko/key-visual.mp4?v=2', alt: 'Elko 91 website: product animations and video heroes' } : bl.type === 'full' && bl.ph === 'system overview' ? { type: 'video', pill: true, ratio: '1280/300', list: ['./media/elko/tubular.mp4', './media/elko/ceramic.mp4', './media/elko/cartridge.mp4'], alt: 'Elko 91 product animations: tubular, ceramic and cartridge heaters' } : bl.type === 'pair' ? { type: 'cta', label: 'Learn more', href: 'https://elko91.eu', body: 'The site\'s call-to-action: a slow animated gradient that resembles the shine and temperature of a tubular heater, the client\'s #1 selling product.' } : bl); return q; })(),
      { ...ph('seera-album-rollout', 'seera', '2025'), logo: './media/clients/seera-logo-white.svg', logoAr: '755.12/447.04', logoMax: 'clamp(140px,12vw,220px)', shortTitle: 'SEERA Rollout', client: 'Seera', location: 'Saudi Arabia / Europe', services: ['Creative direction', 'Album cover art and illustration', 'Custom typography', 'Vinyl design', 'Music video direction and production', 'Generative visualiser (GLSL)', 'Tour poster', 'Social media'],
        about: 'Sarab, Arabic for "mirage", is the EP from Seera, Saudi Arabia\'s first all-female psychedelic rock band. We led the creative across the release, from the cover art and vinyl to three music videos and the poster for the band\'s European tour, building one visual world around the record\'s mysterious, surreal sound.',
        link: { label: 'Behance', href: 'https://www.behance.net/gallery/236873097/SEERA-SHAMS-MUSIC-VIDEO' },
        featured: [{ name: 'Clash Music', logo: './media/clients/clash.png', href: 'https://www.clashmusic.com/news/saudi-arabian-psych-group-seera-to-make-london-debut/' }],
        blocks: [
          { type: 'embed', url: 'https://www.youtube.com/watch?v=vce5mF6EQck', alt: 'Seera — Shams music video' },
          { type: 'text', label: 'Brief', body: 'Sarab needed a visual identity as layered as the music: rooted in the Saudi landscape, unmistakably psychedelic, and flexible enough to carry a full rollout. Each piece had to stand on its own, whether a cover, a video or a poster, while still feeling like part of the same mirage.' },
          { type: 'text', label: 'The cover & vinyl', body: 'The cover is built from the Saudi dunes. A mirage is mysterious and surreal, and that was exactly the feeling we wanted. Each song on the EP leaves its mark on the landscape: an hourglass for Zaman, a blazing sun for Shams, birds for Akhir Sarkha and traces in the sand for Athar. The dunes reflect and bloom, mixing with light and the shadows of the sand into one surreal scene. The title is a custom mix of handwriting and typography, wrapping itself between the dunes until it becomes part of the landscape. We carried the same world onto the physical release, designing the vinyl record itself.' },
          { type: 'flip', front: './media/seera/front-cover.jpg', back: './media/seera/back-cover.jpg', alt: 'Seera Sarab album cover, click to turn it over', hint: 'Tap to turn over' },
          { type: 'text', label: 'Chapter 01 — Shams', body: 'A mixed-media collage video where performance footage merges with fragmented textures, Arabic geometric patterns and cosmic light, a visual journey between light and dark. Live footage of the band is cut through with collage, surreal motion and intricate tilework, matching the psychedelic rock energy of the track.' },
          { type: 'video', ratio: '1280/720', src: './media/seera/shams-f1.mp4', alt: 'Shams music video: collage of band footage, textures and tilework' },
          { type: 'videoRow', tight: true, vids: [{ ratio: '800/450', src: './media/seera/shams-s1.mp4', alt: 'Shams music video clip' }, { ratio: '800/450', src: './media/seera/shams-s2.mp4', alt: 'Shams music video clip' }] },
          { type: 'text', label: 'Chapter 02 — Akhir Sarkha (with Earthsonic)', logo: './media/clients/earthsonic-white.png', logoAr: '1500/312', logoAlt: 'EarthSonic', body: 'For the release of Akhir Sarkha with Earthsonic, we developed a visualiser that extends the song\'s story into a surreal world of animals, shadows and organic abstraction. Written in GLSL, the visuals grow as living, reactive forms, starting in sleek monochrome before collapsing into distortion. The code was written and then intentionally corrupted, a symbol of humanity\'s deliberate interference with nature and the fragile ecosystems it disrupts. Within the digital decay, new patterns emerge as life reasserts itself through chaos. Like the track\'s Arabic poetic story of destruction, resilience and renewal, the visualiser becomes a coded ecosystem that destroys and recreates itself in real time.' },
          { type: 'embed', url: 'https://www.youtube.com/watch?v=cEqyuYMpbis', alt: 'Seera × Earthsonic — Akhir Sarkha visualiser' },
          { type: 'pair', tight: true, ratio: '1267/713', imgA: './media/seera/exploration-1.jpg', altA: 'Akhir Sarkha visualiser exploration: mirrored GLSL forms in monochrome', imgB: './media/seera/exploration-2.jpg', altB: 'Akhir Sarkha visualiser exploration: corrupted quadrants split by light lines' },
          { type: 'text', label: 'Chapter 03 — Zaman', body: 'The closing track of Sarab and the EP\'s final chapter, moving from tension to release. Zaman is a conversation across generations about patience and time, and the film keeps it inside a single room. It relies on space, light and texture rather than narrative: a saturated blue palette, the long night of the song, slowly gives way to warm daylight; the room\'s clutter grows to a surreal scale, just as the lyrics say; and handheld camera work keeps the frame restless and intimate.' },
          { type: 'embed', url: 'https://www.youtube.com/watch?v=0ZxExfQ8CRs', alt: 'Seera — Zaman music video' },
          { type: 'mixRow', tight: true, items: [
            { ratio: '576/720', frames: ['./media/seera/zaman-a-01.webp', './media/seera/zaman-a-02.webp', './media/seera/zaman-a-03.webp', './media/seera/zaman-a-04.webp'], alt: 'Zaman behind the scenes, wiggle frame: band members on a bed with a bass' },
            { ratio: '1664/2496', img: './media/seera/dscf0262.jpg', alt: 'Seera bassist with a sunburst bass, shot in blue and magenta light' },
            { ratio: '576/720', frames: ['./media/seera/zaman-b-01.webp', './media/seera/zaman-b-02.webp', './media/seera/zaman-b-03.webp', './media/seera/zaman-b-04.webp'], alt: 'Zaman behind the scenes, wiggle frame: guitarist among piled clothes' },
            { ratio: '1664/2496', img: './media/seera/dscf0144.jpg', alt: 'Seera drummer in a beaded face veil, lit blue and magenta' },
          ] },
          { type: 'text', label: 'EU tour poster', body: 'After touring Saudi Arabia from Jeddah to Riyadh and Khobar, Seera took Sarab to Europe, with stops in Hamburg, Berlin, Biel and London. The poster captures the band\'s rock \'n\' roll essence, shaking things up while staying rooted in their Middle Eastern identity, with custom typography that carries the tour\'s energy.' },
          { type: 'full', ratio: '2120/1086', img: './media/seera/eu-tour-poster-wall.jpg', alt: 'Seera Europe tour poster pasted on a concrete wall among other gig posters' },
          { type: 'full', ratio: '4000/3000', img: './media/seera/eu-tour-billboard.jpg', alt: 'Seera Europe tour poster on a street hoarding: the four band members in magenta halftone with tour dates' },
          { type: 'text', label: 'Outcome', body: 'A complete EP rollout built around one idea, the mirage, carried from the cover and vinyl through three music videos, including a generative visualiser, to the poster for the band\'s European tour.' },
        ] },
      {
        slug: 'doc-01', onSite: true, title: 'Famalay', year: '2025', section: 'Documentation',
        artist: 'Famalay', event: 'Afro Arab', location: 'FUCHS2, Prague', recording: 'Audio direct from the mixer',
        // more sets from the same night: paste a YouTube / Vimeo / Drive link into each url
        // key set = embed below (Set 01); these four sit as thumbnails under it and swap into the key slot on click.
        // thumb: optional image path; YouTube links get their thumbnail automatically.
        keyTitle: 'RARA', keyMeta: { date: '2025-05-17', duration: 'PT1H28M1S', desc: "RARA's DJ set at Famalay's Afro Arab Dance, FUCHS2 Prague, with live audio-reactive visuals." }, keyThumb: 'https://customer-9dru1dt3vck0fikg.cloudflarestream.com/bc6744f5588b4c6e8aced6267fad6163/thumbnails/thumbnail.jpg?time=3s&height=600',
        sets: [
          { title: 'REBA', url: 'e66e33ef74edccdb3b96e19ef582e11e', thumb: 'https://customer-9dru1dt3vck0fikg.cloudflarestream.com/e66e33ef74edccdb3b96e19ef582e11e/thumbnails/thumbnail.jpg?time=3s&height=600', meta: { date: '2025-05-17', duration: 'PT54M38S', desc: "REBA's DJ set at Famalay's Afro Arab Dance, FUCHS2 Prague, with live audio-reactive visuals." } },
          { title: 'HIBA', url: 'c31728ecafaaa084be050b6d8cb1234b', thumb: 'https://customer-9dru1dt3vck0fikg.cloudflarestream.com/c31728ecafaaa084be050b6d8cb1234b/thumbnails/thumbnail.jpg?time=3s&height=600', meta: { date: '2025-05-17', duration: 'PT56M8S', desc: "HIBA's DJ set at Famalay's Afro Arab Dance, FUCHS2 Prague, with live audio-reactive visuals." } },
          { title: 'BLEN', url: '8caeac732e76c5c2744f12cac1206369', thumb: 'https://customer-9dru1dt3vck0fikg.cloudflarestream.com/8caeac732e76c5c2744f12cac1206369/thumbnails/thumbnail.jpg?time=3s&height=600', meta: { date: '2025-05-17', duration: 'PT56M19S', desc: "BLEN's DJ set at Famalay's Afro Arab Dance, FUCHS2 Prague, with live audio-reactive visuals." } },
          { title: 'SHADOBENI', url: '55aab16082e4a19d4dd87331e7b94e1a', thumb: 'https://customer-9dru1dt3vck0fikg.cloudflarestream.com/55aab16082e4a19d4dd87331e7b94e1a/thumbnails/thumbnail.jpg?time=3s&height=600', meta: { date: '2025-05-17', duration: 'PT1H33M13S', desc: "SHADOBENI's DJ set at Famalay's Afro Arab Dance, FUCHS2 Prague, with live audio-reactive visuals." } },
        ],
        credits: ['Camera — Name', 'Edit — Name', 'Audio — Name'],
        // embed: YouTube, Vimeo or Google Drive share link (Drive file must be shared "Anyone with the link")
        embed: 'https://customer-9dru1dt3vck0fikg.cloudflarestream.com/bc6744f5588b4c6e8aced6267fad6163/iframe',
        about: '413 minutes of DJ sets recorded at Famalay’s Afro Arab Dance at FUCHS2, Prague, presented with panoramic framing and a 16mm-inspired film treatment. Direct mixer audio accompanies footage of the performances and our live, audio-reactive visuals built in TouchDesigner.',
        blocks: [],
        bonus: [],
      },
      {
        slug: 'doc-02', title: 'A$AP Rocky', year: '2025', section: 'Documentation',
        artist: 'A$AP Rocky', event: 'Event name', location: 'Riyadh, Saudi Arabia', recording: 'Audio direct from the mixer',
        credits: ['Camera — Name', 'Edit — Name', 'Audio — Name'],
        // embed: YouTube, Vimeo or Google Drive share link (Drive file must be shared "Anyone with the link")
        embed: '',
        about: 'Placeholder. One or two sentences about the set and the night.',
        blocks: [],
        bonus: [{ ratio: '3/2', ph: 'crowd — film' }, { ratio: '3/2', ph: 'booth' }, { ratio: '3/2', ph: 'portrait' }, { ratio: '3/2', ph: 'room wide' }, { ratio: '3/2', ph: 'detail' }, { ratio: '3/2', ph: 'after' }],
      },
      {
        slug: 'doc-03', onSite: true, title: 'DJ Blacky', year: '2026', section: 'Documentation',
        artist: 'DJ Blacky', event: 'Balad Beast 2026', location: 'Jeddah, Saudi Arabia', recording: 'Audio direct from the mixer',
        credits: ['Camera — Name', 'Edit — Name', 'Audio — Name'],
        // embed: YouTube, Vimeo or Google Drive share link (Drive file must be shared "Anyone with the link")
        embed: 'd865b19f6a109569f0a81b37e50c3940', embedThumbTime: '9s', embedMeta: { date: '2026-01-30', duration: 'PT1H5M35S', desc: "DJ Blacky's set at Balad Beast 2026, Al-Balad, Jeddah, with live audio-reactive visuals." },
        about: 'Blacky at Al Balad... Nuff Said Right?',
        blocks: [],
        bonus: [],
      },
      {
        slug: 'doc-04', title: 'Onyx', year: '2025', section: 'Documentation',
        artist: 'Onyx', event: 'Event name', location: 'Prague', recording: 'Audio direct from the mixer',
        credits: ['Camera — Name', 'Edit — Name', 'Audio — Name'],
        // embed: YouTube, Vimeo or Google Drive share link (Drive file must be shared "Anyone with the link")
        embed: '',
        about: 'Placeholder. One or two sentences about the set and the night.',
        blocks: [],
        bonus: [{ ratio: '3/2', ph: 'crowd — film' }, { ratio: '3/2', ph: 'booth' }, { ratio: '3/2', ph: 'portrait' }, { ratio: '3/2', ph: 'room wide' }, { ratio: '3/2', ph: 'detail' }, { ratio: '3/2', ph: 'after' }],
      },
      {
        slug: 'doc-05', title: 'Set recording — Artist 05', year: '2025', section: 'Documentation',
        artist: 'Artist name', event: 'Event name', location: 'Venue, City', recording: 'Audio direct from the mixer',
        credits: ['Camera — Name', 'Edit — Name', 'Audio — Name'],
        // embed: YouTube, Vimeo or Google Drive share link (Drive file must be shared "Anyone with the link")
        embed: '',
        about: 'Placeholder. One or two sentences about the set and the night.',
        blocks: [],
        bonus: [{ ratio: '3/2', ph: 'crowd — film' }, { ratio: '3/2', ph: 'booth' }, { ratio: '3/2', ph: 'portrait' }, { ratio: '3/2', ph: 'room wide' }, { ratio: '3/2', ph: 'detail' }, { ratio: '3/2', ph: 'after' }],
      },
      {
        slug: 'doc-06', title: 'Set recording — Artist 06', year: '2025', section: 'Documentation',
        artist: 'Artist name', event: 'Event name', location: 'Venue, City', recording: 'Audio direct from the mixer',
        credits: ['Camera — Name', 'Edit — Name', 'Audio — Name'],
        // embed: YouTube, Vimeo or Google Drive share link (Drive file must be shared "Anyone with the link")
        embed: '',
        about: 'Placeholder. One or two sentences about the set and the night.',
        blocks: [],
        bonus: [{ ratio: '3/2', ph: 'crowd — film' }, { ratio: '3/2', ph: 'booth' }, { ratio: '3/2', ph: 'portrait' }, { ratio: '3/2', ph: 'room wide' }, { ratio: '3/2', ph: 'detail' }, { ratio: '3/2', ph: 'after' }],
      },
      {
        slug: 'seera-balad-beast', title: 'seera — balad beast', logo: './media/clients/seera-logo-white.svg', logoAr: '755.12/447.04', logoMax: 'clamp(140px,12vw,220px)', year: '2025', section: 'Projection mapping & VJ', stage: 0,
        // Featured on: set logo to an image path (white, transparent) and href to the article link.
        featured: [{ name: 'Rolling Stone UK', logo: './media/clients/rolling-stone-uk-white.png', ar: 5.176, href: 'https://www.rollingstone.co.uk/culture/balad-beast-2025-47489/' }, { name: 'Destination KSA', logo: './media/clients/destination-ksa-white.png', ar: 5.102, href: 'https://destinationksa.com/en/seera-music-interview/' }],
        client: 'Seera', location: 'Al-Balad, Jeddah, Saudi Arabia', whereLogo: './media/clients/balad-beast-white.png', whereLogoAr: '0.759', whereLogoAlt: 'Balad Beast', whereLogoW: 'clamp(76px,6vw,116px)', services: ['Live VJ', 'TouchDesigner system (audio-reactive, MIDI-controlled)', 'Real-time IMAG effects', 'Content creation'],
        credits: ['Visual direction — Name', 'Live VJ — Name', '3D / mapping — Name'], link: { label: '', href: '' },
        about: 'Al-Balad, Jeddah\'s historic old town and a UNESCO World Heritage Site, comes alive by night as Balad Beast, MDLBEAST\'s festival set among centuries-old coral-stone houses. At its heart is BAB, the main stage, in a square framed by those same walls. For Seera, Saudi Arabia\'s first all-female psychedelic rock band, we ran live visuals across the full square. We were one of the few guest VJs to project onto the heritage buildings themselves, since our content was built to match the architecture. Most other acts were limited to the stage screen.',
        blocks: [
          { type: 'text', label: 'Brief', body: 'BAB Square is an open-air stage inside a living monument. An arched LED wall sits at the centre of the stage, framed by three historic buildings lit by large-scale projection, with the tallest covered by a double stack of projectors. Most guest artists were limited to the stage LED, while the house team handled the buildings. Our job was to make Seera\'s set feel like it belonged to the place: to let a psychedelic rock show spill out of the arch and climb the walls of a centuries-old square, without ever losing the character of the buildings it was playing on.' },
          { type: 'video', ratio: '16/9', src: './media/seera-balad-beast/live-visuals.mp4', alt: 'seera at Balad Beast — live visuals on the arch screen' },
          { type: 'full', ratio: '2100/1181', img: './media/seera-balad-beast/1023.jpg', alt: 'seera on the Bab stage: the arch screen shows the seera calligraphy inside a magenta mandala, beams cutting through haze' },
          { type: 'text', label: 'Approach: Mapping', body: 'We worked within the festival\'s existing projection mapping, treating the arched LED and all three buildings as one canvas. The stage and two of the buildings were dedicated to visuals, and the third became a giant IMAG surface. Content was shaped around the architecture rather than laid over it, following the lines of the windows, wooden rawshan balconies and rooflines so the visuals felt carved into the stone. All content was cleared through MDLBEAST\'s screen content review ahead of the show.' },
          { type: 'full', ratio: '2100/1181', img: './media/seera-balad-beast/1019.jpg', alt: 'Close-up of the singer at the keys, the seera calligraphy above her on the screen in blue light' },
          { type: 'pair', ratio: '2202/3303', imgA: './media/seera-balad-beast/31.jpg', altA: 'The singer at the keyboard in orange light, a green and yellow zig-zag mandala projected on the building behind', imgB: './media/seera-balad-beast/40.jpg', altB: 'The singer and guitarist in blue light, a green and lilac pattern projected across the balconies of the building behind', ph: ['portrait', 'portrait'] },
          { type: 'text', label: 'Approach: Live', body: 'The show was audio-reactive and built from scratch in TouchDesigner, with the stage audio driving the motion and MIDI control letting us shape it by hand, played B2B. One building carried the IMAG, run through grungy real-time effects so it sat in the same world as the visuals around it. The stage and the other two buildings carried the rest of the set, with kaleidoscopic patterns and radial tunnels built out from the architecture of each building.' },
          { type: 'full', ratio: '2100/1181', img: './media/seera-balad-beast/1012.jpg', alt: 'The band in red light, the seera calligraphy on the arch screen and the scenic fans lit beside it' },
          { type: 'full', ratio: '2100/1181', img: './media/seera-balad-beast/1011.jpg', alt: 'Wide shot from the crowd: the Bab stage and the old Balad buildings around it projected in blue and magenta' },
          { type: 'text', label: 'Outcome', body: 'A historic visual takeover of BAB Square, where Seera\'s sound bounced between old walls lit up in sync with the band. Projecting onto these landmarks made it one of our most meaningful shows: the energy of a live psychedelic performance meeting the deep history of the space, on the festival\'s main stage.' },
          { type: 'videoRow', vids: [{ ratio: '800/424', src: './media/seera-balad-beast/loop-1.webm', alt: 'Live visuals loop from the Seera set at Balad Beast' }, { ratio: '800/450', src: './media/seera-balad-beast/loop-2.webm', alt: 'Live visuals loop from the Seera set at Balad Beast' }] },
        ],
      },
      {
        slug: 'shaolin-soundstorm', title: 'shaolin — soundstorm', year: '2024', section: 'Projection mapping & VJ', stage: 1,
        logo: './media/clients/shaolin-logo-red.png', logoAr: '1200/280', logoMax: 'clamp(200px,17vw,320px)',
        whereLogo: './media/clients/soundstorm-24.png', whereLogoAr: '4.033', whereLogoAlt: 'Soundstorm 2024',
        client: 'Shaolin', location: 'Riyadh, Saudi Arabia', services: ['Art direction', 'Live VJ', 'Audio-reactive and MIDI-controlled visuals (TouchDesigner)', '3D character modelling', 'Pixel art and content creation', 'IMAG planning', 'LED mapping and show file setup', 'Merchandise'],
        link: { label: '', href: '' },
        about: 'Soundstorm 2024 ran on a retro, game-inspired art direction, and Shaolin\'s set leaned into it more than any other. For our long-time collaborator, we turned his dance tent into an immersive game world, put him inside the games themselves, and backed it with a live audio-reactive show.',
        blocks: [
          { type: 'video', blend: true, ratio: '1008/720', src: './media/shaolin/centre.mp4', alt: 'Shaolin Soundstorm: centre view down the LED runway during the set' },
          { type: 'text', label: 'Brief', body: 'The tent is a long LED runway flown overhead the length of the room into an upstage wall, with angled pods hanging on either side. The aim was to make the crowd feel like they were inside a game, moving down the hallways of Doom, through Ninja Gaiden, into the portal world of Mortal Kombat, while the room itself carried that dark, late-90s club energy straight out of the opening of Blade.' },
          { type: 'cards', cards: ['./media/shaolin/unfolded-intro.mp4','./media/shaolin/unfolded-unleashed.mp4','./media/shaolin/unfolded-dragon-patterns.mp4','./media/shaolin/unfolded-ps2td.mp4','./media/shaolin/unfolded-temple.mp4','./media/shaolin/unfolded-the-shaolina.mp4'], alt: 'Shaolin Soundstorm show content, unfolded across the tent screens', hint: 'Drag or tap a card to browse' },
          { type: 'full', ratio: '1633/1095', img: './media/shaolin/photo-000032-2.jpg', alt: 'Shaolin backstage on black and white film, arms raised' },
          { type: 'text', label: 'Approach: Content', body: 'We pulled the look from the late-90s and early-2000s games and screens that shaped Shaolin\'s world: GTA and Metal Gear title screens, Streets of Rage and Street Fighter, HUD overlays, system readouts and warning signage. We modelled him in 3D in the style of San Andreas and the old Wu-Tang games, then dropped him into pixel-art levels full of Easter eggs. The overhead runway was treated as a corridor, with content scrolling down its length toward the wall so the room felt like it was moving.' },
          { type: 'grid', cols: '0.5625fr 0.8fr', align: 'end', items: [{ img: './media/shaolin/3d-turnaround.gif', ratio: '540/960', blend: true, alt: 'Shaolin modelled in 3D in the style of San Andreas, turning on the spot' }, { video: './media/shaolin/reel-4.mp4', ratio: '1080/1350', alt: 'Shaolin wiggle, shot on film' }] },
          { type: 'full', ratio: '1958/1305', img: './media/shaolin/photo-171-254.jpg', alt: 'The Dancebeast tent in red: the overhead LED runway lit like a corridor above the crowd' },
          { type: 'text', label: 'Approach: Live', body: 'On show day it ran as a live audio-reactive set in TouchDesigner, MIDI-controlled by hand, with IMAG planned around game-style filters so the camera feed belonged in the same world.\n\nWe also built a LiDAR and Kinect-based add-on as an alternative IMAG, turning Shaolin into a live depth-tracked figure instead of a straight camera feed. It didn\'t make the final show, but it carried over to AFT_R, the Esports World Cup after-party series, where the look shifted toward Wu-Tang and Deus Ex.' },
          { type: 'video', ratio: '16/9', src: './media/shaolin/aftr-imag.webm', alt: 'LiDAR and Kinect depth-tracked IMAG of Shaolin at AFT_R, the Esports World Cup after-party' },
          { type: 'full', ratio: '1800/1200', img: './media/shaolin/photo-10.jpg', alt: 'Shaolin on the mic at the booth, red LED and brush strokes behind him' },
          { type: 'full', ratio: '1587/1064', img: './media/shaolin/photo-000037-2.jpg', alt: 'Close-up of hands on the turntable and mixer, black and white film' },
          { type: 'full', ratio: '1735/1157', img: './media/shaolin/photo-13.jpg', alt: 'Shaolin on the mic against a red LED wall, fists raised in the crowd' },
          { type: 'text', label: 'Outcome', body: 'A fully immersive, game-inspired show across the whole tent, true to the festival\'s retro theme and to Shaolin\'s world. As a surprise for him, we also produced a limited run of 25 screen-printed shirts using the artwork.' },
          { type: 'dflip', front: './media/shaolin/shirt-front.png', back: './media/shaolin/shirt-back.png', altFront: 'Shaolin Soundstorm shirt, front: red SHAOLIN chest print and In Turntables I Trust 12.12.24 hem print', altBack: 'Shaolin Soundstorm shirt, back: red screen-printed illustration of Shaolin multiplied around a turntable', alt: 'Shaolin Soundstorm shirt, click to turn it over', hint: 'Tap to turn over', side: [{ img: './media/shaolin/photo-000031-2.jpg', ratio: '1633/1095', alt: 'Shaolin and crew walking backstage past road cases, shot on film' }, { img: './media/shaolin/photo-11.jpg', ratio: '1775/1183', alt: 'Shaolin at the decks under a giant SHAOLIN brush-script on the LED wall, crowd in silhouette' }] },
        ],
      },
      {
        slug: 'seera-soundstorm', title: 'seera — soundstorm', logo: './media/clients/seera-logo-white.svg', logoAr: '755.12/447.04', logoMax: 'clamp(140px,12vw,220px)', year: '2024', section: 'Projection mapping & VJ', stage: 2,
        client: 'seera', location: 'Riyadh, Saudi Arabia', whereLogo: './media/clients/soundstorm-24.png', whereLogoAr: '605/150', whereLogoAlt: 'Soundstorm 24', services: ['Live VJ', 'Audio-reactive and MIDI-controlled visuals (TouchDesigner)', 'LED mapping and show file setup', 'IMAG integration', 'Content creation'],
        link: { label: '', href: '' },
        about: 'Soundstorm is MDLBEAST\'s annual festival in Riyadh and the biggest music festival in the Middle East. For Seera\'s performance on the DWN BEAST stage, we ran live audio-reactive visuals on one of the largest LED setups we\'ve worked with.',
        blocks: [
          { type: 'text', label: 'Brief', body: 'The DWN BEAST stage is a large-format LED design, with stepped LED wings stage left and right, angled downstage screens and a full upstage wall. The visuals had to cover the whole rig, live, and follow a set that changes in real time. That meant visuals driven by the music and performed live, not timecoded playback.' },
          // video, then 5 photos (one wide + two pairs), repeated; paste each Cloudflare link into src
          { type: 'embed', stream: '52283e99d9b87b79dd791642ef1b0a3f', thumbTime: '0s', alt: 'Seera live at Soundstorm 2024 — Khaleek Baeed', meta: { title: 'Seera — Khaleek Baeed, Soundstorm 2024', date: '2024-12-07', duration: 'PT25S', desc: "Seera's “Khaleek Baeed” on the DWN BEAST stage at Soundstorm 2024, Riyadh, with live audio-reactive visuals." } },
          { type: 'full', ratio: '16/9', img: './media/seera-soundstorm/photos/01.webp', alt: 'seera live at Soundstorm 2025, Riyadh' },
          { type: 'grid', cols: '1fr 1fr', items: [{ img: './media/seera-soundstorm/photos/02.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/03.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/04.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/05.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }] },
          { type: 'embed', stream: '780092002d1ed4a3b8aec86632c59c4f', thumbTime: '180s', alt: 'Seera live at Soundstorm 2024 — Scene 2', meta: { title: 'Seera — Scene 2, Soundstorm 2024', date: '2024-12-07', duration: 'PT3M37S', desc: "Seera's scene 2 on the DWN BEAST stage at Soundstorm 2024, Riyadh, with live audio-reactive visuals." } },
          { type: 'full', ratio: '16/9', img: './media/seera-soundstorm/photos/06.webp', alt: 'seera live at Soundstorm 2025, Riyadh' },
          { type: 'grid', cols: '1fr 1fr', items: [{ img: './media/seera-soundstorm/photos/07.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/08.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/09.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/10.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }] },
          { type: 'full', ratio: '1899/654', img: './media/seera-soundstorm/wide-stage.jpg', alt: 'Seera on the DWN BEAST stage at Soundstorm: IMAG close-ups in the LED wings, audio-reactive visuals across the full rig' },
          { type: 'text', label: 'Approach', body: 'We built audio-reactive systems in TouchDesigner, with kicks, bass and highs driving movement, colour and intensity, and mapped everything to MIDI so we could perform the visuals live and land the big moments by hand. The stage was set up for Resolume inputs, so we built our own show files and custom mapping to run the rig as one canvas or split across screens. The IMAG was mapped into the top of the wings and blended into the visuals, so the crowd got the close-up without breaking the look of the stage.' },
          { type: 'embed', stream: '70268a7913122bf0357f940154185b97', thumbTime: '63s', alt: 'Seera live at Soundstorm 2024 — Scene 3', meta: { title: 'Seera — Scene 3, Soundstorm 2024', date: '2024-12-07', duration: 'PT1M39S', desc: "Seera's scene 3 on the DWN BEAST stage at Soundstorm 2024, Riyadh, with live audio-reactive visuals." } },
          { type: 'full', ratio: '16/9', img: './media/seera-soundstorm/photos/11.webp', alt: 'seera live at Soundstorm 2025, Riyadh' },
          { type: 'grid', cols: '1fr 1fr', items: [{ img: './media/seera-soundstorm/photos/12.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/13.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/14.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/15.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }] },
          { type: 'embed', stream: '2a1621a21cd4a64c8352b6a25f437491', thumbTime: '40s', alt: 'Seera live at Soundstorm 2024 — Scene 4', meta: { title: 'Seera — Scene 4, Soundstorm 2024', date: '2024-12-07', duration: 'PT1M30S', desc: "Seera's scene 4 on the DWN BEAST stage at Soundstorm 2024, Riyadh, with live audio-reactive visuals." } },
          { type: 'full', ratio: '16/9', img: './media/seera-soundstorm/photos/16.webp', alt: 'seera live at Soundstorm 2025, Riyadh' },
          { type: 'grid', cols: '1fr 1fr', items: [{ img: './media/seera-soundstorm/photos/17.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/18.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/19.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }, { img: './media/seera-soundstorm/photos/20.webp', ratio: '16/9', alt: 'seera live at Soundstorm 2025, Riyadh' }] },
          
          { type: 'text', label: 'Outcome', body: 'A fully live performance across the entire DWN BEAST stage, audio-reactive and MIDI-controlled, with IMAG blended into the visuals, all mapped and run in real time from TouchDesigner. The visuals moved with every part of the set and kept pace with the energy of the festival, so they felt as alive as the music.' },
        ],
      },
      {
        slug: 'enter10-uae', title: 'ENTER10 — UAE', logo: './media/clients/enter10-logo-white.svg', year: '2026', section: 'Projection mapping & visuals', stage: 3,
        client: 'ENTER10', location: 'Abu Dhabi, UAE', services: ['Technical scope and system design', 'Projection mapping', 'Media server setup (Resolume)', 'Pre-rendered content', 'Operator handover and training'],
        link: { label: '', href: '' },
        about: 'ENTER10 is a bowling and entertainment venue in Madinati Mall, Abu Dhabi, bringing together ten-pin bowling, arcade games and food in one space. They wanted live projection built into the venue as a permanent part of the experience, running pre-rendered content that could shift with the time of day, the crowd and the occasion.',
        blocks: [
          { type: 'text', label: 'Brief', body: 'The projection had to feel like part of the venue, not a screen added on top. It needed to run every day, from quiet afternoons to busy nights and events, and be simple enough for the in-house team to operate without a technician on call.' },
          { type: 'full', ratio: '4/3', img: './media/enter10/hero.jpg', alt: 'ENTER10 Abu Dhabi — projection test on the pin and ball cutouts during install' },
          { type: 'stackVideo', imgA: './media/enter10/night-1.jpg', altA: 'ENTER10 Abu Dhabi — lanes and neon back wall from the arcade', imgB: './media/enter10/night-2.jpg', altB: 'ENTER10 Abu Dhabi — lounge seating facing the projection-mapped back wall', video: './media/enter10/night-reel.mp4', altV: 'ENTER10 Abu Dhabi — night reel' },
          { type: 'text', label: 'Approach', body: 'We scoped the venue first, working out the projection surfaces, throw distances and sightlines, and how the system would sit around the lanes and guest flow. We then mapped the projection to the space and built a pre-rendered content library to fit the mapped surfaces. The media server runs on a modular Resolume setup, with content organised into clear decks so staff can move between ambient loops, peak-hour content and event moments without touching the mapping. New content drops into the same structure, so the library can grow over time, and we finished with a handover and training for the venue team.' },
          { type: 'video', ratio: '1280/720', src: './media/enter10/all-visuals.mp4', alt: 'ENTER10 Abu Dhabi — all visuals on the projection-mapped back wall', ph: 'wide shot — stage and crowd' },
          { type: 'embed', url: 'https://www.youtube.com/watch?v=r4xojq7sbGg', title: 'ENTER10 Abu Dhabi — projection mapping' },
          { type: 'text', label: 'Outcome', body: 'A permanent projection system built into ENTER10\'s space, run day to day by the in-house team. The modular setup lets the content keep evolving with the venue\'s programming, well beyond opening.' },
        ],
      },
    ];
  },
};

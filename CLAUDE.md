# Baked with love from Sara — project notes for Claude Code

Showcase website for Sára Ivana, a home baker in Dorset. Static Astro site, hosted free on Cloudflare Pages.

## Commands
- `npm run dev` — local server at http://localhost:4321
- `npm run build` — must pass before any commit; output in `dist/`
- `npm run images:prep -- ./incoming` — resize/clean phone photos into `src/assets/cakes/`

## Where things live
- `src/data/site.json` — tagline, intro, email, Instagram/WhatsApp links, lead time (Sara edits these in Pages CMS → Site details).
- `src/site.config.ts` — fixed details (name, Facebook/Messenger) plus the values from site.json. Edit here, not in components.
- `.pages.yml` — Pages CMS settings: which fields Sara can edit. Keep in sync with `src/content.config.ts`.
- `src/lib/images.ts` — resolves a cake's photo by FILE NAME from `src/assets/cakes/`, whatever path prefix is stored.
- `src/content/cakes/*.md` — one file per cake. Frontmatter schema is in `src/content.config.ts`.
- `src/assets/cakes/` — source photos. Reference from markdown as `/cakes/<file>.jpg` (the Pages CMS format).
- `src/styles/global.css` — all design tokens (`@theme`) and the few hand-written component classes.
- `src/components/` — Hero (Embla crossfade), Lookbook (grid), About, Courses, Enquire, Header, Footer.
- `src/pages/index.astro` — assembles the home page. `src/pages/cakes/[id].astro` — one page per cake.

## Adding a cake (the common job)
Sara normally does this herself in Pages CMS (app.pagescms.org). To do it by hand:
1. Put the photo in `src/assets/cakes/` (run `images:prep` if it came from a phone).
2. Create `src/content/cakes/<slug>.md` with `title`, `occasion`, `cover: /cakes/<file>.jpg`, `summary`, optional `flavours`, `serves`, `fromPrice`.
3. Set `featured: true` on 3–5 cakes total for the hero. Use `tile: wide` or `tile: tall` so the grid fills (4 columns on desktop; keep the cell count a multiple of 4).
4. `npm run build`, check it, commit. Cloudflare deploys on push.

## Design rules (do not drift from these)
- Soft, gentle, clean, minimal. Photography does the work; the interface stays quiet.
- Palette only from the tokens in `global.css`: milk, cream, blush, berry (single accent), taupe, cocoa. No new colours, no gradients as decoration, no grey drop shadows.
- Type: Cormorant Garamond (headlines, weight 300–400) and Mulish (body, 300–400). No other faces.
- No all-caps labels, no eyebrow labels above headings, no numbered "01/02/03" markers, no arrows appended to buttons, no middle-dot meta strings.
- One button style (`.btn`, berry pill) and one quiet variant (`.btn-quiet`). Links are thin underlines.
- Motion: the hero crossfade and the page-load rise are the only non-user-triggered motion. No hover-scale on cards, no per-section fade-ins. Always respect `prefers-reduced-motion`.
- Copy: sentence case, plain verbs, written for a customer ordering a cake. British English.
- Must work at 360px wide with 16px gutters, no horizontal scroll. Keep keyboard focus visible.
- Keep the site static (`output: 'static'`). No server code, no database, no React. Vanilla `<script>` only.

## Hosting constraints
- Cloudflare Pages free plan. Build command `npm run build`, output `dist`. Node 22.
- Do not add Vercel-specific features; the Hobby plan forbids commercial use and this is a business site.

## Email (Cloudflare Email Routing)
- hello@bakedwithlovefromsara.co.uk → routing rule → Worker `sara-hello-autoreply` (code mirrored in `email-worker/hello-autoreply.js`).
- The Worker forwards to saraivana76@gmail.com and sends one auto-reply saying Sára will reply from her Gmail; it never replies to no-reply/list/auto-generated mail.
- Forwarding only works once saraivana76@gmail.com is Verified under Email Routing → Destination addresses.
- The Worker is edited in the Cloudflare dashboard, not deployed from this repo. Keep the file here in sync if the dashboard code changes.
- Catch-all rule is Drop: any other address @bakedwithlovefromsara.co.uk is discarded.

## Content editing (Pages CMS)
- Sara edits cakes and site details at app.pagescms.org as an email-invited collaborator on martynpc/bakedwithlovefromsara.
- Every save is a commit to `main`; Cloudflare Pages rebuilds automatically. A failed build leaves the previous version live.
- The content schema is deliberately lenient (blank optional fields default safely). Don't tighten it without updating `.pages.yml`.

## Languages (English / Slovak)
- English at `/`, Slovak at `/sk` (every page exists in both; `src/pages/sk/` mirrors `src/pages/`).
- Page markup lives once in `src/views/` (HomePage, CakePage) and takes a `lang` prop; route files are thin wrappers.
- All interface text is in `src/i18n.ts` (`ui.en` / `ui.sk`). Never hard-code English text in components; add a key to both languages.
- Cakes: `title_sk`, `summary_sk`, `description_sk`, `flavours_sk` (optional, fall back to English). Site details: `tagline_sk`, `intro_sk`, `leadTime_sk` in `src/data/site.json`.
- The round EN / SK switch (`src/components/LangSwitch.astro`) links to the same page in the other language. `hreflang` alternates are set in `Base.astro`.
- Slovak copy was written by Claude; Sara should review it and correct it in Pages CMS.

## SEO and AI discoverability
- Sitemap: `@astrojs/sitemap` writes `/sitemap-index.xml` with EN/SK hreflang pairs; referenced from `public/robots.txt`.
- `robots.txt` allows all crawlers, including AI assistants. Cloudflare's "Block AI bots" must stay OFF for the zone.
- Structured data: `src/lib/schema.ts` — Bakery + FAQPage on home pages, Product (or Course) + BreadcrumbList on cake pages. Only use facts already on the site.
- `/llms.txt` is generated from content on every build (`src/pages/llms.txt.ts`).
- FAQ text lives in `src/data/faq.json` (EN + SK), editable in Pages CMS → Questions (FAQ).

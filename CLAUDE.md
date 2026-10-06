# Baked with love from Sara — project notes for Claude Code

Showcase website for Sára Ivana, a home baker in Dorset. Static Astro site, hosted free on Cloudflare Pages.

## Commands
- `npm run dev` — local server at http://localhost:4321
- `npm run build` — must pass before any commit; output in `dist/`
- `npm run images:prep -- ./incoming` — resize/clean phone photos into `src/assets/cakes/`

## Where things live
- `src/site.config.ts` — name, tagline, intro, email, Facebook/Messenger/Instagram/WhatsApp links, lead time. Edit here, not in components.
- `src/content/cakes/*.md` — one file per cake. Frontmatter schema is in `src/content.config.ts`.
- `src/assets/cakes/` — source photos. Reference from markdown as `../../assets/cakes/<file>.jpg`.
- `src/styles/global.css` — all design tokens (`@theme`) and the few hand-written component classes.
- `src/components/` — Hero (Embla crossfade), Lookbook (grid), About, Courses, Enquire, Header, Footer.
- `src/pages/index.astro` — assembles the home page. `src/pages/cakes/[id].astro` — one page per cake.

## Adding a cake (the common job)
1. Put the photo in `src/assets/cakes/` (run `images:prep` if it came from a phone).
2. Create `src/content/cakes/<slug>.md` with `title`, `occasion`, `cover`, `summary`, optional `flavours`, `serves`, `fromPrice`.
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

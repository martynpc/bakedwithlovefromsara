# Baked with love from Sara

Showcase website for Sára Ivana's cakes and baking courses, Dorset.
Astro 5 + Tailwind 4, fully static, free hosting on Cloudflare Pages.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # writes dist/
```

Node 22 or newer.

## Replace the placeholder photos

The eight `src/assets/cakes/placeholder-*.jpg` files are soft gradients so the layout can be reviewed. Replace them:

```bash
# put Sara's JPEGs in a folder (export HEIC → JPEG on the phone first)
npm run images:prep -- ~/Downloads/sara-photos
```

Then point each `src/content/cakes/*.md` `cover:` at the new file name and delete the placeholders.

## Deploy (free, ~15 minutes, one-off)

1. Push this folder to a GitHub repository (private is fine).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → choose the repo.
   - Framework preset: Astro. Build command `npm run build`. Output directory `dist`.
   - Environment variable `NODE_VERSION` = `22`.
3. First deploy gives `<project>.pages.dev`. Every later `git push` to `main` redeploys automatically.
4. Custom domain: Pages project → Custom domains → add the domain. If the domain's DNS is on Cloudflare, the records are created for you.

Optional enquiry form: create a free key at web3forms.com using Sara's email, then add `PUBLIC_WEB3FORMS_KEY` in Pages → Settings → Environment variables and redeploy. Without it the section shows Messenger and email only.

## Running costs

| Item | Cost |
|---|---|
| Cloudflare Pages hosting (commercial use allowed, unlimited static bandwidth) | £0 |
| Domain (.co.uk via a UK registrar, or .com at cost via Cloudflare Registrar) | ~£6–12 / year |
| Enquiry form (Web3Forms free tier, 250/month) | £0 |
| Images (optimised at build time by Astro/sharp, served by Cloudflare) | £0 |

## Working on it with Claude Code

`CLAUDE.md` holds the design rules and conventions; Claude Code reads it automatically. Suggested next prompts, in order:

1. "Replace the placeholder photos with the JPEGs in ./incoming using the images:prep script, then update each cake's cover and summary to match the real cake. Keep 4 featured."
2. "Add a 'Kind words' section between About and Courses with these three quotes from Sara's Facebook reviews: [paste]. Match the existing type and spacing; no cards, no stars."
3. "Add a /courses page with the next three dates and a short description of what people learn. Link it from the Courses section and the header."
4. "Add a Slovak language toggle: /sk mirrors the home page with the copy in site.config.sk.ts. Keep one codebase, no i18n library."
5. "Run Lighthouse against the production build and fix anything below 95 on Performance, Accessibility, Best Practices and SEO."
6. "Generate an OG image for the home page from the first featured cake at 1200×630 and wire it into Base.astro."

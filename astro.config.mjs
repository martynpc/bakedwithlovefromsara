// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Static output: every page is pre-rendered HTML, so the site can be hosted
// for free on Cloudflare Pages (commercial use allowed) with no server.
export default defineConfig({
  site: 'https://bakedwithlovefromsara.co.uk', // change once the domain is bought
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  vite: { plugins: [tailwindcss()] },
  image: {
    // Astro resizes + converts to AVIF/WebP at build time via sharp.
    responsiveStyles: true,
  },
});

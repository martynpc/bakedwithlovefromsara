// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Static output: every page is pre-rendered HTML, hosted free on Cloudflare Pages.
export default defineConfig({
  site: 'https://bakedwithlovefromsara.co.uk',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    // Writes /sitemap-index.xml + /sitemap-0.xml with EN/SK alternates for every page.
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en-GB', sk: 'sk' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
  image: {
    // Astro resizes + converts to AVIF/WebP at build time via sharp.
    responsiveStyles: true,
  },
});

// Usage: npm run images:prep -- ./incoming
// Takes phone photos (any size, HEIC not supported — export as JPEG first),
// strips EXIF, auto-rotates, caps the long edge at 2400px and writes
// quality-85 JPEGs into src/assets/cakes/ with web-safe filenames.
// Astro then produces AVIF/WebP + srcset at build time.
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const src = process.argv[2];
if (!src) { console.error('pass a folder of photos'); process.exit(1); }
const dest = new URL('../src/assets/cakes/', import.meta.url).pathname;
mkdirSync(dest, { recursive: true });

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

for (const f of readdirSync(src)) {
  if (!/\.(jpe?g|png|webp)$/i.test(f)) continue;
  const name = slug(basename(f, extname(f))) + '.jpg';
  await sharp(join(src, f))
    .rotate()
    .resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(join(dest, name));
  console.log('→', name);
}

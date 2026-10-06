// Generates soft placeholder "photos" so the layout can be reviewed before
// Sara's real photos are added. Delete src/assets/cakes/placeholder-*.jpg
// once real images are in place.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const out = fileURLToPath(new URL('../src/assets/cakes/', import.meta.url));
mkdirSync(out, { recursive: true });

const palettes = [
  ['#F7E6E1', '#E9C9C2', '#8F3448'], // strawberry cream
  ['#F6EFE6', '#E6D6C3', '#6B5F58'], // vanilla sponge
  ['#EEE9F2', '#CFC3DC', '#4B3F6B'], // blueberry
  ['#F3EAE4', '#D9BFB1', '#7A4B3A'], // caramel
  ['#EFF1EA', '#D2DAC6', '#4F6A45'], // pistachio
  ['#FBF4EF', '#F0D8CF', '#B86A7A'], // raspberry
  ['#F5EFE8', '#E2D3C2', '#5C4A3F'], // chocolate cream
  ['#F6F0EE', '#E3CFD2', '#8F3448'], // berry pavlova
];

const sizes = [
  [1600, 1200], [1200, 1500], [1600, 1200], [1200, 1200],
  [1600, 1200], [1200, 1500], [1600, 1200], [1200, 1200],
];

for (let i = 0; i < palettes.length; i++) {
  const [a, b, c] = palettes[i];
  const [w, h] = sizes[i];
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <radialGradient id="g" cx="40%" cy="35%" r="80%">
        <stop offset="0" stop-color="${a}"/>
        <stop offset="1" stop-color="${b}"/>
      </radialGradient>
      <radialGradient id="h" cx="65%" cy="70%" r="35%">
        <stop offset="0" stop-color="${c}" stop-opacity="0.28"/>
        <stop offset="1" stop-color="${c}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#h)"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.62}" rx="${w * 0.26}" ry="${h * 0.16}"
      fill="#ffffff" fill-opacity="0.55"/>
    <ellipse cx="${w * 0.5}" cy="${h * 0.52}" rx="${w * 0.22}" ry="${h * 0.12}"
      fill="#ffffff" fill-opacity="0.7"/>
  </svg>`;
  await sharp(Buffer.from(svg))
    .blur(1.2)
    .jpeg({ quality: 82 })
    .toFile(join(out, `placeholder-${i + 1}.jpg`));
}
console.log('placeholders written');

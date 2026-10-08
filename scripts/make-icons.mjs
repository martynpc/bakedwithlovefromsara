// Builds the PNG/ICO icons in public/ from public/favicon.svg.
// Run: node scripts/make-icons.mjs  (only needed if the favicon design changes)
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const svg = readFileSync('public/favicon.svg');
const png = (size, pad = 0) =>
  sharp(svg, { density: 512 })
    .resize(size - pad * 2, size - pad * 2)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: '#fdfbf9' })
    .flatten({ background: '#fdfbf9' })
    .png()
    .toBuffer();

writeFileSync('public/apple-touch-icon.png', await png(180, 14));
writeFileSync('public/icon-192.png', await png(192));
writeFileSync('public/icon-512.png', await png(512));
writeFileSync('public/icon-maskable-512.png', await png(512, 56));

// favicon.ico holding 16, 32 and 48 px PNGs.
const sizes = [16, 32, 48];
const imgs = await Promise.all(sizes.map((s) => png(s)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const o = 6 + 16 * i;
  header.writeUInt8(s, o); header.writeUInt8(s, o + 1); header.writeUInt8(0, o + 2); header.writeUInt8(0, o + 3);
  header.writeUInt16LE(1, o + 4); header.writeUInt16LE(32, o + 6);
  header.writeUInt32LE(imgs[i].length, o + 8); header.writeUInt32LE(offset, o + 12);
  offset += imgs[i].length;
});
writeFileSync('public/favicon.ico', Buffer.concat([header, ...imgs]));
console.log('icons written');

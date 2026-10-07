import type { ImageMetadata } from 'astro';

// Every photo in src/assets/cakes/, keyed by lower-case file name.
// Cake files can store the photo as "/cakes/x.jpg", "src/assets/cakes/x.jpg"
// or "../../assets/cakes/x.jpg" — only the file name matters. This keeps the
// build working whatever path format the editor (Pages CMS) writes.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/cakes/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

const byName = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  byName.set(path.split('/').pop()!.toLowerCase(), mod.default);
}

export function cakeImage(ref: string): ImageMetadata {
  const name = decodeURIComponent(ref.split(/[\\/]/).pop() ?? '').toLowerCase();
  const img = byName.get(name);
  if (!img) {
    throw new Error(
      `Photo "${ref}" was not found in src/assets/cakes/. Upload it through the editor or check the file name.`,
    );
  }
  return img;
}

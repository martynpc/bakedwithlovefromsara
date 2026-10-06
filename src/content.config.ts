import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each cake is one Markdown file in src/content/cakes/.
// Adding a cake = add a photo to src/assets/cakes/ + a .md file here.
const cakes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cakes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      occasion: z.enum(['Birthday', 'Wedding', 'Christening', 'Celebration', 'Everyday', 'Course']),
      cover: image(),
      gallery: z.array(image()).default([]),
      // Shown in the hero crossfade when true (use 3–5 of the best photos).
      featured: z.boolean().default(false),
      // Lookbook tile size: 'wide' spans two columns, 'tall' spans two rows.
      tile: z.enum(['standard', 'wide', 'tall']).default('standard'),
      // Lower numbers appear first.
      order: z.number().default(100),
      // One line shown under the photo and used as the page description.
      summary: z.string().max(160),
      // Optional: flavours, serves, from-price. Shown on the cake page only.
      flavours: z.array(z.string()).default([]),
      serves: z.string().optional(),
      fromPrice: z.string().optional(),
    }),
});

export const collections = { cakes };

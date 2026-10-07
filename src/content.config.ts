import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each cake is one Markdown file in src/content/cakes/, edited by Sara in
// Pages CMS (see .pages.yml) or by hand. Photos live in src/assets/cakes/ and
// are referenced by file name (resolved in src/lib/images.ts).
// The schema is deliberately forgiving so an edit in the CMS can't break the build.
const cakes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cakes' }),
  schema: z.object({
    title: z.string(),
    occasion: z
      .enum(['Birthday', 'Wedding', 'Christening', 'Celebration', 'Everyday', 'Course'])
      .catch('Celebration'),
    cover: z.string(),
    gallery: z.array(z.string()).nullish().transform((v) => v ?? []),
    // Shown in the hero crossfade when true (use 3–5 of the best photos).
    featured: z.boolean().nullish().transform((v) => v ?? false),
    // Lookbook tile size: 'wide' spans two columns, 'tall' spans two rows.
    tile: z.enum(['standard', 'wide', 'tall']).nullish().catch('standard').transform((v) => v ?? 'standard'),
    // Lower numbers appear first.
    order: z.coerce.number().nullish().catch(100).transform((v) => v ?? 100),
    // One line shown under the photo and used as the page description.
    summary: z.string().nullish().transform((v) => v ?? ''),
    // Optional: flavours, serves, from-price. Shown on the cake page only.
    flavours: z.array(z.string()).nullish().transform((v) => v ?? []),
    serves: z.string().nullish().transform((v) => v || undefined),
    fromPrice: z.string().nullish().transform((v) => v || undefined),
    // Slovak versions (optional; the Slovak site falls back to English when empty).
    title_sk: z.string().nullish().transform((v) => v || undefined),
    summary_sk: z.string().nullish().transform((v) => v || undefined),
    description_sk: z.string().nullish().transform((v) => v || undefined),
    flavours_sk: z.array(z.string()).nullish().transform((v) => v ?? []),
  }),
});

export const collections = { cakes };

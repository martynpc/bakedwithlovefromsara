// schema.org structured data (JSON-LD) for Google, Bing and AI assistants.
// Only facts already on the site are used — nothing here should be invented.
import type { CollectionEntry } from 'astro:content';
import faq from '../data/faq.json';
import { site, siteText } from '../site.config';
import { cakeText, href, htmlLang, ui, type Lang } from '../i18n';

const BASE = 'https://bakedwithlovefromsara.co.uk';
export const BAKERY_ID = `${BASE}/#bakery`;
const abs = (lang: Lang, path: string) => new URL(href(lang, path), BASE).toString();

export function bakerySchema(lang: Lang, cakes: CollectionEntry<'cakes'>[], _site: URL) {
  const text = siteText(lang);
  const products = cakes.filter((c) => c.data.occasion !== 'Course');
  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    '@id': BAKERY_ID,
    name: site.name,
    description: text.intro,
    slogan: text.tagline,
    url: abs(lang, '/'),
    email: site.email,
    inLanguage: htmlLang[lang],
    knowsLanguage: ['en', 'sk'],
    founder: { '@type': 'Person', name: site.baker },
    address: { '@type': 'PostalAddress', addressRegion: 'Dorset', addressCountry: 'GB' },
    areaServed: { '@type': 'AdministrativeArea', name: 'Dorset, United Kingdom' },
    sameAs: [site.facebook, site.instagram].filter(Boolean),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: ui[lang].recentCakes,
      itemListElement: products.map((c) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: cakeText(c, lang).title,
          description: cakeText(c, lang).summary,
          url: abs(lang, `/cakes/${c.id}`),
        },
      })),
    },
  };
}

export function faqSchema(lang: Lang) {
  const items = faq.items
    .map((i) => (lang === 'sk' ? { q: i.q_sk || i.q, a: i.a_sk || i.a } : { q: i.q, a: i.a }))
    .filter((i) => i.q && i.a);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: htmlLang[lang],
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  };
}

export function cakeSchemas(cake: CollectionEntry<'cakes'>, lang: Lang, imageUrl: string) {
  const ct = cakeText(cake, lang);
  const url = abs(lang, `/cakes/${cake.id}`);
  const isCourse = cake.data.occasion === 'Course';
  const main = isCourse
    ? {
        '@context': 'https://schema.org',
        '@type': 'Course',
        name: ct.title,
        description: ct.summary,
        url,
        image: imageUrl,
        inLanguage: htmlLang[lang],
        provider: { '@type': 'Organization', '@id': BAKERY_ID, name: site.name, sameAs: site.facebook },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: ct.title,
        description: ct.summary,
        url,
        image: imageUrl,
        category: ui[lang].occasion[cake.data.occasion],
        brand: { '@type': 'Brand', name: site.name },
        manufacturer: { '@id': BAKERY_ID },
      };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: site.name, item: abs(lang, '/') },
      { '@type': 'ListItem', position: 2, name: ui[lang].navCakes, item: abs(lang, '/') + '#cakes' },
      { '@type': 'ListItem', position: 3, name: ct.title, item: url },
    ],
  };
  return [main, breadcrumb];
}

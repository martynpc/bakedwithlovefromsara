// /llms.txt — a plain-text summary of the business for AI assistants
// (https://llmstxt.org). Rebuilt from the site's own content on every deploy.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import faq from '../data/faq.json';
import { site, siteText } from '../site.config';

const BASE = 'https://bakedwithlovefromsara.co.uk';

export const GET: APIRoute = async () => {
  const en = siteText('en');
  const sk = siteText('sk');
  const cakes = (await getCollection('cakes')).sort((a, b) => a.data.order - b.data.order);
  const cakeLines = cakes
    .filter((c) => c.data.occasion !== 'Course')
    .map((c) => `- [${c.data.title}](${BASE}/cakes/${c.id}): ${c.data.summary}${c.data.title_sk ? ` (Slovak: ${c.data.title_sk})` : ''}`);
  const courses = cakes.filter((c) => c.data.occasion === 'Course');

  const body = [
    `# ${site.name}`,
    '',
    `> ${en.intro}`,
    '',
    `${site.name} is a home baker in Dorset, UK, run by ${site.baker}. Every cake is made to order. ` +
      `The website is available in English and Slovak (${BASE}/sk).`,
    '',
    '## How to order',
    '',
    `- Order form: ${BASE}/#enquire (writes a message and opens Facebook Messenger)`,
    `- Facebook Messenger: ${site.messenger}`,
    `- Email: ${site.email}`,
    `- Facebook page: ${site.facebook}`,
    site.instagram ? `- Instagram: ${site.instagram}` : '',
    `- Notice needed: ${en.leadTime}`,
    en.capacity ? `- Capacity: ${en.capacity}` : '',
    '',
    '## Cakes',
    '',
    ...cakeLines,
    '',
    '## Baking courses',
    '',
    ...courses.map((c) => `- [${c.data.title}](${BASE}/cakes/${c.id}): ${c.data.summary}`),
    '',
    '## Frequently asked questions',
    '',
    ...faq.items.flatMap((i) => [`### ${i.q}`, '', i.a, '']),
    '## Slovak version / Slovenská verzia',
    '',
    `- [${sk.tagline}](${BASE}/sk): ${sk.intro}`,
    '',
  ]
    .filter((l, i, a) => !(l === '' && a[i - 1] === ''))
    .join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};

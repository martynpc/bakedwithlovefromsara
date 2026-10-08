// Everything "about Sara" rather than about layout.
// The editable parts (tagline, intro, email, links, lead time — in English and
// Slovak) live in src/data/site.json so Sara can change them in Pages CMS.
import editable from './data/site.json';
import type { Lang } from './i18n';

export const site = {
  name: 'Baked with love from Sara',
  baker: 'Sára Ivana',
  location: 'Dorset, UK',
  facebook: 'https://www.facebook.com/saralovebakecakes',
  messenger: 'https://m.me/saralovebakecakes',
  tagline: editable.tagline,
  intro: editable.intro,
  email: editable.email,
  instagram: editable.instagram,
  // e.g. 'https://wa.me/447XXXXXXXXX'; empty hides the WhatsApp button.
  whatsapp: editable.whatsapp,
  leadTime: editable.leadTime,
  capacity: editable.capacity,
};

/** Editable site text in the requested language (Slovak falls back to English). */
export function siteText(lang: Lang) {
  if (lang === 'sk') {
    return {
      tagline: editable.tagline_sk || editable.tagline,
      intro: editable.intro_sk || editable.intro,
      leadTime: editable.leadTime_sk || editable.leadTime,
      capacity: editable.capacity_sk || editable.capacity,
    };
  }
  return { tagline: editable.tagline, intro: editable.intro, leadTime: editable.leadTime, capacity: editable.capacity };
}

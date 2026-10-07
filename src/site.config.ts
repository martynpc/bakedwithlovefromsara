// Everything "about Sara" rather than about layout.
// The editable parts (tagline, intro, email, links, lead time) live in
// src/data/site.json so Sara can change them in Pages CMS ("Site details").
import editable from './data/site.json';

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
};

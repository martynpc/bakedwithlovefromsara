// English / Slovak interface text and URL helpers.
// English lives at /, Slovak at /sk. Every page exists in both languages.
import type { CollectionEntry } from 'astro:content';

export type Lang = 'en' | 'sk';
export const LANGS: Lang[] = ['en', 'sk'];

export const htmlLang: Record<Lang, string> = { en: 'en-GB', sk: 'sk' };
export const ogLocale: Record<Lang, string> = { en: 'en_GB', sk: 'sk_SK' };

/** Language of a URL path. */
export function langFromPath(pathname: string): Lang {
  return /^\/sk(\/|\.html$|$)/.test(pathname) ? 'sk' : 'en';
}

/** Path without the language prefix, e.g. "/sk/cakes/x" -> "/cakes/x", "/sk" -> "/". */
export function barePath(pathname: string): string {
  const p = pathname.replace(/\.html$/, '').replace(/^\/sk(?=\/|$)/, '');
  return p === '' || p === '/index' ? '/' : p.replace(/\/index$/, '');
}

/** Turn an English path ("/", "/#cakes", "/cakes/x") into the path for `lang`. */
export function href(lang: Lang, path: string): string {
  if (lang === 'en') return path;
  if (path === '/') return '/sk';
  if (path.startsWith('/#')) return '/sk' + path.slice(1);
  return '/sk' + path;
}

/** The same page in another language. */
export function switchHref(pathname: string, to: Lang): string {
  return href(to, barePath(pathname));
}

type Occasion = CollectionEntry<'cakes'>['data']['occasion'];

export const ui = {
  en: {
    skip: 'Skip to content',
    navLabel: 'Main',
    navCakes: 'Cakes',
    navCourses: 'Courses',
    navContact: 'Enquire',
    langLabel: 'Language',
    langNames: { en: 'English', sk: 'Slovenčina' },
    heroLabel: 'Sara’s cakes',
    heroSeeCakes: 'See the cakes',
    heroAskDate: 'Ask about a date',
    heroDots: 'Choose photo',
    slideOf: (i: number, n: number, title: string) => `${i} of ${n}: ${title}`,
    recentCakes: 'Recent cakes',
    recentIntro: 'Every cake is made to order. These are a few from the last year; tap one for a closer look.',
    aboutTitle: 'How Sára bakes',
    about1: 'Light sponges, cream and fresh fruit. No artificial additives or substitutes, and nothing you couldn’t buy in an ordinary shop.',
    about2: (baker: string) => `${baker} bakes in Dorset, one cake at a time, for birthdays, celebrations and ordinary Sundays.`,
    coursesTitle: 'Baking for people who think they can’t',
    coursesText: 'Sára teaches beginners to bake light, simple cakes from everyday ingredients, step by step and without stress.',
    coursesAsk: 'Ask about the next course',
    coursesNote: 'Dates are announced on Facebook first.',
    enquireTitle: 'Tell Sára about your occasion',
    enquireText: 'The date, how many people, and anything you already have in mind. Sára will reply with ideas and a price.',
    messageFacebook: 'Message on Facebook',
    messageWhatsApp: 'Message on WhatsApp',
    orEmail: (email: string) => `or email ${email}`,
    emailSubject: 'Cake enquiry',
    formName: 'Your name',
    formContact: 'Email or phone',
    formDate: 'Date of the occasion',
    formOccasion: 'What is it for',
    formOccasions: ['Birthday', 'Christening', 'Wedding', 'Another celebration', 'A baking course'],
    formMessage: 'Tell Sara what you have in mind',
    formPlaceholder: 'How many people, flavours you like, anything to avoid',
    formSend: 'Send enquiry',
    formNote: 'Goes straight to Sara’s inbox.',
    formSubject: 'New cake enquiry from the website',
    flavours: 'Flavours',
    serves: 'Serves',
    priceFrom: 'From',
    askLikeThis: 'Ask about one like this',
    backToCakes: 'Back to the cakes',
    inKitchen: (baker: string) => `${baker} in her kitchen`,
    occasion: {
      Birthday: 'Birthday',
      Wedding: 'Wedding',
      Christening: 'Christening',
      Celebration: 'Celebration',
      Everyday: 'Everyday',
      Course: 'Course',
    } as Record<Occasion, string>,
  },
  sk: {
    skip: 'Preskočiť na obsah',
    navLabel: 'Hlavné menu',
    navCakes: 'Torty',
    navCourses: 'Kurzy',
    navContact: 'Kontakt',
    langLabel: 'Jazyk',
    langNames: { en: 'English', sk: 'Slovenčina' },
    heroLabel: 'Torty od Sáry',
    heroSeeCakes: 'Pozrieť torty',
    heroAskDate: 'Spýtať sa na termín',
    heroDots: 'Vybrať fotku',
    slideOf: (i: number, n: number, title: string) => `${i} z ${n}: ${title}`,
    recentCakes: 'Najnovšie torty',
    recentIntro: 'Každá torta sa pečie na objednávku. Tu je niekoľko z posledného roka; kliknite na ktorúkoľvek a pozrite si ju zblízka.',
    aboutTitle: 'Ako Sára pečie',
    about1: 'Ľahké piškóty, smotana a čerstvé ovocie. Žiadne umelé prísady ani náhrady a nič, čo by ste nekúpili v bežnom obchode.',
    about2: (baker: string) => `${baker} pečie v Dorsete, jednu tortu po druhej, na narodeniny, oslavy aj obyčajné nedele.`,
    coursesTitle: 'Pečenie pre tých, ktorí si myslia, že to nezvládnu',
    coursesText: 'Sára učí začiatočníkov piecť ľahké, jednoduché torty z bežne dostupných surovín, krok za krokom a bez stresu.',
    coursesAsk: 'Spýtať sa na najbližší kurz',
    coursesNote: 'Termíny oznamujeme najskôr na Facebooku.',
    enquireTitle: 'Povedzte Sáre o svojej oslave',
    enquireText: 'Dátum, počet hostí a čokoľvek, čo už máte na mysli. Sára vám odpovie s nápadmi a cenou.',
    messageFacebook: 'Napísať na Facebooku',
    messageWhatsApp: 'Napísať na WhatsApp',
    orEmail: (email: string) => `alebo napíšte na ${email}`,
    emailSubject: 'Objednávka torty',
    formName: 'Vaše meno',
    formContact: 'E-mail alebo telefón',
    formDate: 'Dátum oslavy',
    formOccasion: 'Na akú príležitosť',
    formOccasions: ['Narodeniny', 'Krstiny', 'Svadba', 'Iná oslava', 'Kurz pečenia'],
    formMessage: 'Napíšte Sáre, čo máte na mysli',
    formPlaceholder: 'Počet hostí, obľúbené chute, čomu sa vyhnúť',
    formSend: 'Odoslať',
    formNote: 'Správa príde priamo Sáre.',
    formSubject: 'Nová objednávka torty z webu',
    flavours: 'Chute',
    serves: 'Počet porcií',
    priceFrom: 'Cena od',
    askLikeThis: 'Spýtať sa na podobnú',
    backToCakes: 'Späť na torty',
    inKitchen: (baker: string) => `${baker} vo svojej kuchyni`,
    occasion: {
      Birthday: 'Narodeniny',
      Wedding: 'Svadba',
      Christening: 'Krstiny',
      Celebration: 'Oslava',
      Everyday: 'Na každý deň',
      Course: 'Kurz',
    } as Record<Occasion, string>,
  },
} as const;

export type UI = (typeof ui)[Lang];

/** A cake's text in the requested language, falling back to English where no translation exists. */
export function cakeText(cake: CollectionEntry<'cakes'>, lang: Lang) {
  const d = cake.data;
  if (lang === 'sk') {
    return {
      title: d.title_sk || d.title,
      summary: d.summary_sk || d.summary,
      description: d.description_sk || '',
      flavours: d.flavours_sk.length ? d.flavours_sk : d.flavours,
      serves: d.serves,
      fromPrice: d.fromPrice,
    };
  }
  return {
    title: d.title,
    summary: d.summary,
    description: '',
    flavours: d.flavours,
    serves: d.serves,
    fromPrice: d.fromPrice,
  };
}

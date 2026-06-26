import type { ClientConfig } from './clients';

/**
 * A bundled copy of the default client. Used as an instant fallback so the site
 * renders immediately and still works if public/clients.json fails to load.
 * Keep this roughly in sync with the "default" entry in public/clients.json.
 */
export const DEFAULT_CLIENT: ClientConfig = {
  name: { en: 'Nour Al-Hassan', ar: 'نور الحسن' },
  logo: '/logo.svg',
  whatsapp: '96176097305',
  instagram: 'https://instagram.com/',
  tiktok: 'https://tiktok.com/',
  aboutImage: '/about.webp',
  heroImage: '/hero.webp',
};

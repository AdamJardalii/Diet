/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CLIENT CONFIG
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  The list of doctors/clients lives in a PLAIN DATA FILE, not in this code:
 *
 *        public/clients.json
 *
 *  The site fetches that file at runtime, reads the `?id=<clientId>` query
 *  parameter from the URL, and shows that client's name, logo, photos, WhatsApp
 *  number, and social links. Because it's loaded at runtime, you can add new
 *  doctors WITHOUT rebuilding or re-optimizing the app — just edit the JSON and
 *  (optionally) drop in images. See public/clients/README.md for the full flow.
 *
 *  If `?id=` is missing or unknown, it falls back to DEFAULT_CLIENT_ID.
 *
 *  This file only holds the TypeScript type, the loader, and a hard-coded copy
 *  of the default client used as an instant fallback (so the site still renders
 *  even before clients.json loads, or if it fails to load).
 */
import { DEFAULT_CLIENT } from './defaultClient';

/** A piece of text available in both languages. */
export interface Localized {
  en: string;
  ar: string;
}

/**
 * Optional per-client text overrides for the About section. Anything omitted
 * falls back to the shared site content. Use this to make a real client's page
 * accurate (their own bio, credentials, and numbers).
 */
export interface ClientProfile {
  /** About paragraph. */
  bio?: Localized;
  /** The small pill badges under the name (any number). */
  badges?: Localized[];
  /** The stat cards (number + label). Provide as many as you like. */
  stats?: Array<{ num: Localized; label: Localized }>;
}

export interface ClientConfig {
  /** Display name, shown in navbar, about section, and footer. */
  name: { en: string; ar: string };
  /**
   * Optional logo image (path or full URL). When set, it's shown in the navbar
   * and used as the browser tab favicon. When omitted, the navbar falls back to
   * the styled text `name` and the favicon stays the default.
   */
  logo?: string;
  /** WhatsApp number in international format, digits only (no +, no spaces). */
  whatsapp: string;
  /** Social links — leave as empty string "" (or omit) to hide that icon. */
  instagram: string;
  tiktok: string;
  facebook?: string;
  /** Image paths (path under /public, or a full URL). */
  aboutImage: string;
  heroImage: string;
  /** Optional per-client About text (bio, badges, stats). */
  profile?: ClientProfile;
}

/** Used when ?id= is missing or doesn't match any client in clients.json. */
export const DEFAULT_CLIENT_ID = 'default';

/** The `?id=` value from the current URL, or null when absent. */
export function requestedClientId(): string | null {
  if (typeof window === 'undefined') return null;
  return new URLSearchParams(window.location.search).get('id');
}

let cache: Record<string, ClientConfig> | null = null;

/** Fetches and caches the client map from public/clients.json. */
export async function loadClients(): Promise<Record<string, ClientConfig>> {
  if (cache) return cache;
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}clients.json`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`clients.json ${res.status}`);
    cache = (await res.json()) as Record<string, ClientConfig>;
  } catch (err) {
    // Network/parse failure — fall back to the bundled default so the site works.
    console.warn('Could not load clients.json, using default client.', err);
    cache = { [DEFAULT_CLIENT_ID]: DEFAULT_CLIENT };
  }
  return cache;
}

/** Resolves the active client from a loaded map + the requested id. */
export function pickClient(
  all: Record<string, ClientConfig>,
  id: string | null,
): ClientConfig {
  if (id && all[id]) return all[id];
  return all[DEFAULT_CLIENT_ID] ?? DEFAULT_CLIENT;
}

export { DEFAULT_CLIENT };

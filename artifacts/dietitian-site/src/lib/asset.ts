/**
 * Resolves a public asset path against the app's base URL.
 *
 * Locally the base is "/", but on GitHub Pages the site is served from a
 * subpath (e.g. "/Diet/"), so a stored path like "/about.webp" must become
 * "/Diet/about.webp". Full external URLs (http/https) are returned untouched.
 */
export function asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

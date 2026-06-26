/**
 * Image optimizer — converts PNG/JPG images in public/ to resized WebP.
 *
 * Usage:   pnpm run optimize-images
 *
 * It walks public/ (including per-client folders under public/clients/<id>/),
 * and for every .png/.jpg/.jpeg it writes a .webp next to it, resized to a
 * sensible max width based on how the image is actually used on the page.
 * Originals are left in place (you can delete them once you've confirmed the
 * site looks right — the code references the .webp files).
 *
 * When you add new client photos, just drop them in and re-run this script.
 */
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');

// Max width per image, chosen to match the largest size it's ever displayed at
// (with a 2x allowance for retina). Smaller targets = smaller files.
const RULES = [
  { match: /(^|\/)client\d+\./i, maxWidth: 96, label: 'avatar' }, // shown at 48px
  { match: /(^|\/)logo\./i, maxWidth: 320, label: 'navbar logo' }, // shown ~40px tall
  { match: /(^|\/)hero\./i, maxWidth: 1600, label: 'hero (full-width bg)' },
  { match: /(^|\/)about\./i, maxWidth: 800, label: 'about portrait' },
  { match: /(^|\/)transform\d+\./i, maxWidth: 800, label: 'transformation' },
  { match: /(^|\/)opengraph\./i, maxWidth: 1200, label: 'social preview' },
];
const DEFAULT_MAX_WIDTH = 1200;

function ruleFor(relPath) {
  return RULES.find((r) => r.match.test(relPath.replace(/\\/g, '/')));
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else if (/\.(png|jpe?g)$/i.test(entry.name)) {
      yield full;
    }
  }
}

let totalIn = 0;
let totalOut = 0;
let count = 0;

for await (const file of walk(PUBLIC_DIR)) {
  const rel = path.relative(PUBLIC_DIR, file);
  const rule = ruleFor(rel);
  const maxWidth = rule?.maxWidth ?? DEFAULT_MAX_WIDTH;
  const out = file.replace(/\.(png|jpe?g)$/i, '.webp');

  const inSize = (await stat(file)).size;
  const meta = await sharp(file).metadata();
  const resize = meta.width && meta.width > maxWidth ? { width: maxWidth } : null;

  await sharp(file)
    .resize(resize ?? {})
    .webp({ quality: 80, effort: 6 })
    .toFile(out);

  const outSize = (await stat(out)).size;
  totalIn += inSize;
  totalOut += outSize;
  count++;

  const pct = Math.round((1 - outSize / inSize) * 100);
  const dims = resize ? `${meta.width}→${maxWidth}w` : `${meta.width}w`;
  console.log(
    `  ${rel.padEnd(28)} ${(inSize / 1024).toFixed(0).padStart(5)}KB → ` +
      `${(outSize / 1024).toFixed(0).padStart(4)}KB  (-${pct}%)  [${rule?.label ?? 'default'}, ${dims}]`,
  );
}

console.log(
  `\n✓ ${count} images: ${(totalIn / 1024 / 1024).toFixed(2)}MB → ` +
    `${(totalOut / 1024 / 1024).toFixed(2)}MB ` +
    `(-${Math.round((1 - totalOut / totalIn) * 100)}%)`,
);

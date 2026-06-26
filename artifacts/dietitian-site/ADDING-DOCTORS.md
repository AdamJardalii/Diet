# Adding a new doctor (no app rebuild needed)

Every doctor is one entry in a plain data file:

```
artifacts/dietitian-site/public/clients.json
```

The website fetches this file **at runtime**, so adding a doctor does **not**
require changing any code, rebuilding, or re-optimizing the app. You only edit
JSON and (optionally) add images.

## Steps

1. **Pick a hard-to-guess id.** Keep a random suffix so people can't guess other
   clients' links — e.g. `lara-7m2k9x`.

2. **Add an entry to `public/clients.json`:**

   ```json
   "lara-7m2k9x": {
     "name": { "en": "Lara Saad", "ar": "لارا سعد" },
     "logo": "/clients/lara-7m2k9x/logo.svg",
     "whatsapp": "9613222333",
     "instagram": "https://instagram.com/lara.nutrition",
     "tiktok": "https://tiktok.com/@lara.nutrition",
     "aboutImage": "/clients/lara-7m2k9x/about.webp",
     "heroImage": "/clients/lara-7m2k9x/hero.webp"
   }
   ```

   Field notes:
   - `logo` is optional — omit it and the navbar shows the name as text.
   - `instagram` / `tiktok` — set to `""` to hide that icon.
   - `whatsapp` — international format, digits only (no `+`, no spaces).
   - Image fields can be a path under `public/` (e.g. `/clients/<id>/about.webp`)
     **or** a full external URL (e.g. an image hosted elsewhere).
   - To reuse the shared photos instead of uploading new ones, just point them
     at `/about.webp` and `/hero.webp`.

3. **Add the images** (if not using shared ones or external URLs):
   drop them in `public/clients/<id>/`. Optionally run `pnpm run optimize-images`
   to shrink them to `.webp`.

4. **Share the link:** `https://<your-site>/?id=lara-7m2k9x`

## How it goes live

- **Locally:** save `clients.json` and the dev server hot-reloads.
- **On GitHub Pages:** commit the change (you can even edit `clients.json`
  directly on github.com) and push. The deploy workflow republishes the static
  files automatically — you never run a build yourself.

If `?id=` is missing or doesn't match any entry, the site shows the `default`
client.

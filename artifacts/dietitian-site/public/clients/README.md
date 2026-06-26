# Per-client images

Each client can have its own images in a folder named after the client's `id`
(the `?id=` value in the URL):

```
public/clients/<id>/about.png   ← doctor portrait (3:4 ratio looks best)
public/clients/<id>/hero.png    ← wide hero background image
public/clients/<id>/logo.png    ← optional navbar logo (also the browser tab icon)
```

Any PNG/JPG/SVG/WebP works. For best loading speed, run `pnpm run optimize-images`
to produce resized `.webp` versions — but this is optional; the site works with
the originals too.

The logo is optional. If a client has no `logo`, the navbar shows the styled
name text instead.

> The list of clients themselves lives in **`public/clients.json`** (one level
> up). See that file / `ADDING-DOCTORS.md` for how to add a doctor.

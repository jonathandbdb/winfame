# Winfame Surgical — website

Static site built with Astro + Tailwind CSS.

```sh
npm install
cp .env.example .env   # add your Web3Forms key
npm run dev            # http://localhost:4321
npm run build          # output in dist/
```

## Adding a product

Create `src/content/products/<slug>.md`:

```md
---
title: Clear Cornea Blade
category: ophthalmic-blades # file name in src/content/categories
illustration: clear-cornea
summary: One-line description for cards and SEO.
variants:
  - { model: "190CC", spec: "1.00 mm · 60°" }
specs:
  Angle: "60°"
tags: [cataract, phaco]
---

Long description in Markdown.
```

## Adding product photos

1. Create a folder with the product's name next to its `.md` file and put the photos in it:

   ```
   src/content/products/
     clear-cornea-blade.md
     clear-cornea-blade/
       1.jpg
       2.jpg
   ```

2. List the photos in the product's frontmatter. The first one is the main photo, used on cards and at the top of the product page, and the rest show as thumbnails:

   ```yaml
   images: [./clear-cornea-blade/1.jpg, ./clear-cornea-blade/2.jpg]
   ```

- Formats: JPG, PNG or WebP. Astro automatically generates optimized versions (WebP, responsive sizes), so large originals are fine.
- For a uniform catalog, use square or 4:3 photos with a white or neutral background. Photos are shown in full, never cropped.
- Products without `images` keep showing their technical drawing.
- If a path is wrong, `npm run build` fails and names the missing file.

## Quote form

1. Get a free access key at https://web3forms.com, using lulutao@winfameusa.com.
2. Set `PUBLIC_WEB3FORMS_KEY` in `.env` and in your hosting provider's environment variables.

Without a key, the form opens the visitor's email client instead.

## Deploy (Cloudflare Pages)

1. Push the repo to GitHub.
2. In Cloudflare Pages, choose Create project, connect the repo, and use these settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variable: `PUBLIC_WEB3FORMS_KEY`
3. Add the custom domain `www.winfamesurgical.com` and redirect the apex domain to it.

Netlify or Vercel work the same way, with the same build command and output folder.

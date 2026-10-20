# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing + B2B catalog site for **Winfame Surgical** (ophthalmic blades, LRI knives, surgical instruments, scalpels, diagnostic equipment), plus a secondary page for the in-house product **IOL Simulator** (https://www.iolsimulator.com). Site copy is **English only**. There is no online checkout: visitors build a quote list and send it by form or WhatsApp.

## Commands

- `npm run dev`: dev server at http://localhost:4321
- `npm run build`: `astro check` (types and content schemas) followed by the static build to `dist/`
- `npm run check`: type and content-schema check only
- `npm run preview`: serve `dist/`
- `npm run format`: Prettier (with `prettier-plugin-astro`)

There is no test suite. Verify changes with `npm run build`, then check pages in `npm run preview`.

## Architecture

- **Astro 5, static output**, Tailwind CSS 4 through `@tailwindcss/vite`. `package.json` pins `overrides.vite` to Astro's Vite major. Without it, the Tailwind plugin pulls a newer Vite and `astro check` fails on a plugin type mismatch.
- **The catalog is content collections** (`src/content.config.ts`):
  - `categories`: `src/content/categories/*.yaml`. The file name is the category id and URL slug, and `order` sets the display order.
  - `products`: `src/content/products/*.md`. The file name is the slug. Frontmatter sets `category` (a reference to a category id), `variants[] {model, spec}` (rendered as the model table, and each row can be added to the quote list), `specs` (key/value tiles), `tags` (searchable), `placeholder: true` (shows a "catalog in preparation" notice), `link` (an external or custom page that replaces the generated detail page, used by `iol-simulator`), and `images` (optional photos stored in `src/content/products/<slug>/` and referenced as `./<slug>/1.jpg`; `images[0]` is used on cards and the detail page, and products without photos show their `illustration` line drawing).
  - Adding a product means adding one `.md` file. Routes, menus, counts and search pick it up automatically.
- **Routes**: `src/pages/products/[category]/index.astro` and `[category]/[slug].astro` are built with `getStaticPaths` from `src/data/catalog.ts`, which provides `getCategories`, `getProducts` (sorted by category order and then product order), `productUrl` and `searchText`.
- **Business data** (email, WhatsApp, URLs) lives only in `src/data/site.ts`. Use `whatsappLink(text)` for wa.me links.
- **Quote list**: `src/scripts/quote.ts` stores the list in localStorage and broadcasts a `quote:change` event. `AddToQuote.astro` uses event delegation, the header badge listens for changes, and `/quote` renders and edits the list.
- **Forms**: `ContactForm.astro` posts to Web3Forms using `PUBLIC_WEB3FORMS_KEY` (see `.env.example`). If the key is unset, it falls back to opening a `mailto:` link.
- **Illustrations**: `Illustration.astro` holds inline SVG line drawings keyed by the `illustrations` enum in `content.config.ts`. To add a new drawing, add it to both places.

## Design system

The concept is a "precision spec sheet". Tokens are defined in `src/styles/global.css` `@theme`: `navy`, `brand` (#1452cc, the Winfame blue), `steel`, `line`, `mist`, and `teal`. Teal is the accent for IOL Simulator only. Fonts: Manrope (`font-display`, headings), Inter (body), JetBrains Mono (`font-mono`, model numbers, specs and eyebrow labels). Shared classes: `container-x`, `eyebrow`, `btn btn-primary|btn-outline|btn-ghost-light`, `tech-grid`, `prose-wf`. The scroll reveal (`data-reveal`) applies only when JS runs (the `.js` class is set in `BaseLayout`). Do not copy the visual style of iolsimulator.com.

## Content notes

- Blade models and specs (WFZT/WFXM series) come from the manufacturer's product line chart. Keep them exact.
- The LRI model codes (`LRI-300`, etc.) are provisional. Surgical instruments, scalpels and ultrasound entries are `placeholder: true` until real data arrives.
- Avoid unverified claims (certifications, materials, outcomes) in copy. The About page has a TODO for the company's real story, certifications and address.

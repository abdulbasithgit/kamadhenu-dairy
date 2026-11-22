# Sri Chettinadu Kamadhenu Dairy Farm – website

Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into /out (served from "/")
npm run build:pages  # static export with the GitHub Pages base path /kamadhenu-dairy
npm run serve      # serve /out locally (after npm run build)
npm run lint       # ESLint
npm run format     # Prettier
```

## Where to edit content

- `src/data/site.ts` – phone, WhatsApp, email, address, socials, delivery pincodes.
  **Every `TODO` must be replaced with real details before launch.**
- `src/data/navigation.ts` – menu links
- Brand colours and fonts – `src/app/globals.css` (`@theme` block)

## Images to supply

Until a photo is supplied, a cream "… – replace" placeholder box is shown.
To add a photo: put it in `public/images/` and set its `src`/`image` in the data file listed.

| Image                                                                                                                         | Where it's used                    | Set it in                             |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------- |
| `logo.png` (supplied)                                                                                                         | Header, footer                     | `public/images/logo.png`              |
| `packaging.jpg` (supplied)                                                                                                    | Hero slide 1, A2 Milk product card | `public/images/packaging.jpg`         |
| Cows grazing at the farm (portrait 4:5)                                                                                       | Hero slide 2                       | `src/data/home.ts` → `heroSlides`     |
| Morning doorstep delivery (portrait 4:5)                                                                                      | Hero slide 3                       | `src/data/home.ts` → `heroSlides`     |
| Family / farm founders (portrait 4:5)                                                                                         | Home "Our story"                   | `src/data/home.ts` → `brandIntro`     |
| Curd pot (4:3)                                                                                                                | Product card                       | `src/data/products.ts`                |
| Ghee jar (4:3)                                                                                                                | Product card                       | `src/data/products.ts`                |
| White butter (4:3)                                                                                                            | Product card                       | `src/data/products.ts`                |
| Paneer (4:3)                                                                                                                  | Product card                       | `src/data/products.ts`                |
| Buttermilk glass (4:3)                                                                                                        | Product card                       | `src/data/products.ts`                |
| 8 farm gallery photos: cows grazing, calf with mother, cow shed, fodder field, milking time, bottling, farm team, ghee making | Home gallery                       | `src/data/home.ts` → `gallery`        |
| Certificate / licence logos                                                                                                   | Home certifications strip          | `src/data/home.ts` → `certifications` |

## Placeholder content to replace before launch

- `src/data/site.ts` – all `TODO` contact details; `deliveryAreasConfirmed` (set `true` once real)
- `src/data/home.ts` – `stats` (set `placeholder: false` once real), `certifications`, free-sample terms
- `src/data/testimonials.ts` – real reviews only, with permission (`placeholder: false`)
- `src/data/products.ts` – pack sizes and prices

Sample stats, reviews, certificates and delivery areas show a dashed "Sample / placeholder"
label on the site until you mark them real.

## Preview deployment (GitHub Pages)

Every push to `main` builds the site and deploys it with
`.github/workflows/deploy.yml` to:

**https://abdulbasithgit.github.io/kamadhenu-dairy/**

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

How it works:

- `next.config.ts` uses `output: "export"` (plain static files in `/out`).
- On Pages the site lives under `/kamadhenu-dairy`, set via the `NEXT_PUBLIC_BASE_PATH`
  env variable (only in the workflow and `npm run build:pages`; empty for `npm run dev`).
- `next/link` adds the base path automatically. **`next/image` does not** – always write
  `src={withBasePath("/images/…")}` (from `src/lib/basePath.ts`).
- Dynamic routes (e.g. `products/[slug]`) must export `generateStaticParams()`.

### Preview mode (switch off at launch)

`previewMode` in `src/data/site.ts` controls, in one place:

- `<meta name="robots" content="noindex, nofollow">` on every page
- `robots.txt` → `Disallow: /`
- the dismissible "Preview version – for review only" banner

Set it to `false` for the real launch.

(Full deploy steps for the real launch are added in Phase 6.)

# Sri Chettinadu Kamadhenu Dairy Farm – website

Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
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

(Full deploy steps for Vercel are added in Phase 6.)

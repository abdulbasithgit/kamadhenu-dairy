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

| File | Where it's used |
| --- | --- |
| `public/images/logo.png` | Header, footer. A transparent-background PNG (at least 512×512) would look best. |
| `public/images/packaging.jpg` | Home hero |

_More rows are added as each phase adds placeholders._

(Full deploy steps for Vercel are added in Phase 6.)

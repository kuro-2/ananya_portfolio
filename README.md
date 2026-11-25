# Ananya Singha — Design Portfolio 2026 (website)

Interactive web version of the 48-page PDF portfolio. React + Vite + TypeScript, Motion for animation, Lenis for smooth scrolling.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Production build

```bash
npm run build      # type-checks, then outputs to dist/
npm run preview    # serve the production build locally
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project** and import the repository. The framework is detected as **Vite**.
3. Keep the defaults (build: `npm run build`, output: `dist`) and deploy. `vercel.json` already sets the SPA fallback and long-term caching for `/assets`.

Or, from this folder: `npx vercel` (preview) then `npx vercel --prod`.

## How it is built

- Every PDF page is a `Page` "stage". On desktop, children are placed with the PDF's own point coordinates (1152 × 576) and type is sized in container-query units, so each page scales like the original. Below 1024px, text pages reflow into a stacked layout inside the same frame; artwork-only pages keep their composition.
- `scripts/build_assets.py` extracts the original artwork from the PDF into `public/assets/**` as WebP, re-draws the decorative vector backgrounds (wavy checkerboards, press floors), and writes `src/data/assets.json` with image sizes. Re-run it with `npm run assets -- "path/to/portfolio.pdf"` (needs Python with `pymupdf` and `pillow`).
- Page content lives in `src/sections/*`; shared pieces are in `src/components/*`.

## Resume

`resume/resume.html` is the source for `public/Ananya-Singha-Resume.pdf`. After editing it, run `npm run resume` (uses a local Edge/Chrome to print the PDF). It's linked from the nav bar, the menu, the contact page and the footer.

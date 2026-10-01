# Physiotherapie Neugraben – Hans Marius Pieper

Website for mobile physiotherapy (home visits) in Hamburg-Neugraben and Fischbek.
Next.js App Router, Tailwind CSS 4, statically rendered.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint, warnings fail
npm run typecheck
npm test           # Jest + React Testing Library
npm run build
```

## Where things live

- `lib/site.ts` – the only place for name, address, e-mail, phone (`phone`, `phoneHref`, `phoneNote`) and the canonical `url`.
  Switching the domain to `https://www.physiotherapieneugraben.com` is a one-line change there.
- `lib/copy.ts` – the owner's own sentences (verbatim) and the service list.
- `components/LogoMark.tsx` + `app/icon.svg` – hand-built logo mark and favicon (same geometry).
- `scripts/brand-assets.js` – regenerates `public/og.png` from a running build.
- `scripts/screenshots.js` – desktop/mobile screenshots of a running build.

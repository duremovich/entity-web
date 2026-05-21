# entity-web

Marketing site + user docs for [entity](https://github.com/duremovich/Entity) — a C++ media server for projection mapping.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build) + [Tailwind v4](https://tailwindcss.com).

## Local dev

```bash
npm install
npm run dev        # serves at http://localhost:4321
npm run build      # outputs to dist/
npm run preview    # serves the built site
npm run check      # astro check (TS, frontmatter, links)
```

## Hosting

Deployed on **Cloudflare** (Workers static assets) at
[entitymedia.art](https://entitymedia.art). Every push to `main` triggers a
build (`npm run build`) and deploy (`npx wrangler deploy`) through the
Cloudflare Git integration; deploy config lives in `wrangler.jsonc`.

## Project layout

```
src/
├── pages/                  Astro pages — marketing routes
│   ├── index.astro             /
│   ├── download.astro          /download/
│   └── community.astro         /community/
├── content/docs/docs/      Starlight docs — served under /docs/*
│   ├── getting-started/
│   ├── concepts/
│   ├── media/
│   ├── projection/
│   ├── control/
│   ├── reference/
│   └── troubleshooting/
├── components/             shared Astro components
├── assets/                 logos referenced from Starlight config
└── styles/
    └── global.css          design tokens + Starlight overrides
public/
├── brand/                  copied from the engine repo's images/
└── site.webmanifest
```

## Brand assets

Copied from the engine repo (`C:\Entity\Entity\images\`). Re-sync if the
brand evolves:

```bash
cp -r ../Entity/images/svg public/brand/
cp -r ../Entity/images/png public/brand/
```

## License

MIT for site source code. Brand assets (under `public/brand/`) are
licensed as in the engine repo.

## Internal planning

`docs-internal/` holds design notes that aren't user-facing (not served
by Starlight). See [`PLAN-auth-and-licensing.md`](./docs-internal/PLAN-auth-and-licensing.md)
for how user accounts + Pro licensing will slot in.

## Roadmap

- [ ] Polish landing screenshot / hero visual
- [ ] First-pass screenshots throughout `/docs/`
- [ ] Showcase page (when shows ship using entity)
- [ ] Search index sanity check after first major doc pass
- [ ] Blog / changelog (when releases exist)
- [ ] Flip `output: 'static'` → `'hybrid'` when first Pro plugin is days from shipping
- [ ] Wire auth (Clerk lean) + commerce (Paddle lean) + license keys (Keygen lean)

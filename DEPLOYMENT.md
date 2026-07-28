# Deployment

The site is deployment-independent: **no domain is hardcoded anywhere**. Every
absolute URL — canonical tags, `og:url`, Twitter metadata, JSON-LD, sitemaps,
image sitemap, `robots.txt`, `llms.txt`, `knowledge-graph.json` — is derived
from one source of truth: `src/lib/site-url.ts`.

## 1. Set the domain

Set a single environment variable on your host:

```
VITE_SITE_URL=https://your-domain.com
```

Resolution order (first match wins):

1. `VITE_SITE_URL`
2. `SITE_URL`
3. `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL` (automatic on Vercel)
4. `URL` (Netlify) / `CF_PAGES_URL` (Cloudflare Pages)
5. development fallback

Per-request files (`robots.txt`, both sitemaps, `llms.txt`,
`knowledge-graph.json`) additionally derive their URLs from the **request
host**, so they are correct on every domain even before the variable is set.

Internal navigation uses relative router links (`/services`, `/areas/dha-lahore`),
so it never depends on the domain.

## 2. Photographs (media)

Photographs live at root-relative paths (`/__l5e/assets-v1/...`). Two modes,
both domain-independent — pick one:

**A. Self-hosted (recommended for production, zero external dependency).**
Set on your host:

```
SELF_HOST_MEDIA=1
VITE_SELF_HOST_MEDIA=1
```

`npm run build` then runs `scripts/mirror-media.mjs` automatically, which
downloads all 223 renditions into `public/__l5e/assets-v1/...` before the
build. Every image is served from your own domain. Run it manually any time
with `npm run media:mirror` (`--force` to re-download).

**B. CDN-backed (default, no configuration).** Images resolve against an
absolute media origin, so they load identically on any domain. Point it
elsewhere with `VITE_ASSET_ORIGIN=https://cdn.your-domain.com`.

In both modes `SmartImg` retries with the other strategy if a file ever fails
to load, so a page can never show a broken image.

## 3. Build

```
npm run build          # production build
npm run verify         # SEO + AEO + deployment readiness (dev server must be running)
```

`npm run deploy:check` scans the whole source tree for hardcoded deployment
domains and crawls every sitemap URL to verify routes, canonicals, `og:url`,
JSON-LD domains, generated files and that every homepage image actually loads
on the serving host. It writes
`reports/deploy/deploy-report.{json,html}` and exits non-zero on any error.

## 4. Host configuration

This is a TanStack Start (SSR) application; deep links and refreshes are
handled by the server output — no SPA fallback rules are required.

### Vercel
Framework preset: **Vite**. Build `npm run build`. Vercel detects the Nitro
output automatically. Add `VITE_SITE_URL` under Project → Settings →
Environment Variables (Production).

### Netlify
```toml
[build]
  command = "npm run build"
  publish = ".output/public"
[build.environment]
  VITE_SITE_URL = "https://your-domain.com"
```

### Cloudflare Pages
Build command `npm run build`, output directory `.output/public`, and set
`VITE_SITE_URL` in the Pages environment variables.

### Firebase Hosting / other static hosts
Serve `.output/public` and route unmatched requests to the server handler in
`.output/server`. For a purely static host, add a catch-all rewrite to
`/index.html` so deep links resolve:

```json
{ "hosting": { "public": ".output/public",
  "rewrites": [{ "source": "**", "destination": "/index.html" }] } }
```

## 4. After moving domains

Nothing to search and replace. Update `VITE_SITE_URL`, redeploy, then in
Google Search Console add the new property and submit `/sitemap.xml` — the
canonicals, structured data and sitemaps already point at the new domain.

## Images on non-Lovable hosts

Every photograph is served from Lovable's asset CDN at
`/__l5e/assets-v1/...`. That path only resolves on a Lovable-served host, so
all media paths are resolved against an absolute CDN origin
(`src/lib/asset-url.ts`). No configuration is needed; set
`VITE_ASSET_ORIGIN` only if the media is moved to a different CDN.

## Vercel checklist

- `VITE_SITE_URL=https://your-domain.com` — canonicals, og:url, JSON-LD and
  sitemaps follow it. Without it they fall back to the Lovable origin.
- `LOVABLE_API_KEY` + `GOOGLE_MAPS_API_KEY` — required for the live Google
  reviews feed. Missing values degrade gracefully to the last-known rating.

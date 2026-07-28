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

## 2. Build

```
npm run build          # production build
npm run verify         # SEO + AEO + deployment readiness (dev server must be running)
```

`npm run deploy:check` scans the whole source tree for hardcoded deployment
domains and crawls every sitemap URL to verify routes, canonicals, `og:url`,
JSON-LD domains, generated files and local assets. It writes
`reports/deploy/deploy-report.{json,html}` and exits non-zero on any error.

## 3. Host configuration

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

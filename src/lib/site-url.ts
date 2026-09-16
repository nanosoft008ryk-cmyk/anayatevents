/**
 * Single source of truth for the site's absolute origin.
 *
 * Nothing in the project may hardcode a domain: every absolute URL —
 * canonicals, og:url, JSON-LD, sitemaps, robots.txt, llms.txt — is built from
 * the value resolved here.
 *
 * Resolution order:
 *   1. `VITE_SITE_URL`   — set this on the production host (Vercel, Netlify,
 *                          Cloudflare Pages, Firebase, your own server).
 *   2. `SITE_URL`        — server-side equivalent for platforms that expose
 *                          build env without the VITE_ prefix.
 *   3. `VERCEL_PROJECT_PRODUCTION_URL` / `VERCEL_URL` — automatic on Vercel.
 *   4. Development fallback below — only ever used before a domain is set.
 *
 * The value is resolved once at build time so server-rendered HTML and the
 * hydrated client always agree (reading `window.location` here would cause a
 * hydration mismatch).
 */

/** Used only when no environment variable is configured. */
const DEV_FALLBACK = "https://www.anayatevent.com";

function readEnv(key: string): string | undefined {
  // import.meta.env is inlined by Vite; process.env exists on the server.
  const viteEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const fromVite = viteEnv?.[key];
  if (fromVite) return fromVite;
  if (typeof process !== "undefined" && process.env?.[key]) return process.env[key];
  return undefined;
}

/** Adds a scheme when a platform supplies a bare host, and drops any trailing slash. */
function normalise(value: string): string {
  const withScheme = /^https?:\/\//.test(value) ? value : `https://${value}`;
  return withScheme.replace(/\/+$/, "");
}

function resolve(): string {
  const configured =
    readEnv("VITE_SITE_URL") ??
    readEnv("SITE_URL") ??
    readEnv("VITE_VERCEL_PROJECT_PRODUCTION_URL") ??
    readEnv("VERCEL_PROJECT_PRODUCTION_URL") ??
    readEnv("VERCEL_URL") ??
    readEnv("URL") ?? // Netlify
    readEnv("CF_PAGES_URL"); // Cloudflare Pages
  return normalise(configured ?? DEV_FALLBACK);
}

/** Absolute origin, no trailing slash. */
export const SITE_URL = resolve();

/** True while the project is still falling back to the development origin. */
export const SITE_URL_IS_FALLBACK = SITE_URL === normalise(DEV_FALLBACK);

/** Absolute URL for an internal path. External URLs pass through untouched. */
export function absoluteUrl(path: string, origin: string = SITE_URL): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${clean === "/" ? "" : clean}`;
}

/**
 * Origin of the incoming request, for responses generated per request
 * (sitemaps, robots.txt, llms.txt). This keeps those files correct on every
 * host — preview, production domain or a platform URL — even before
 * `VITE_SITE_URL` is configured. Falls back to {@link SITE_URL}.
 */
export function requestOrigin(request?: Request): string {
  if (!request) return SITE_URL;
  try {
    const headers = request.headers;
    const forwardedHost = headers.get("x-forwarded-host");
    const host = forwardedHost ?? headers.get("host");
    if (!host) return SITE_URL;
    const proto =
      headers.get("x-forwarded-proto") ??
      (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
    return normalise(`${proto}://${host}`);
  } catch {
    return SITE_URL;
  }
}

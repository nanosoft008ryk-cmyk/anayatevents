/**
 * Domain-independent media resolution.
 *
 * Every photograph in this project is referenced by the root-relative CDN path
 * `/__l5e/assets-v1/<id>/<file>`. There are two ways to serve those on any
 * domain, and both are supported here:
 *
 *  1. **Self-hosted (fully independent, recommended for production).**
 *     Run `npm run media:mirror` — or build with `SELF_HOST_MEDIA=1` — to copy
 *     every asset into `public/__l5e/assets-v1/...`. Paths then stay
 *     root-relative and resolve from whatever domain serves the site, with no
 *     external dependency whatsoever.
 *
 *  2. **CDN-backed (default, zero configuration).** Paths are resolved against
 *     an absolute media origin so they work identically on Vercel, Netlify,
 *     Cloudflare, a custom server or a brand-new domain. Override the origin
 *     with `VITE_ASSET_ORIGIN` if the media ever moves.
 *
 * Nothing else in the codebase should ever hardcode a media host.
 */

const DEFAULT_ASSET_ORIGIN = "https://anayatevents.lovable.app";

function readEnv(key: string): string | undefined {
  const viteEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const fromVite = viteEnv?.[key];
  if (fromVite) return fromVite;
  if (typeof process !== "undefined" && process.env?.[key]) return process.env[key];
  return undefined;
}

function truthy(value: string | undefined): boolean {
  return !!value && !["0", "false", "no"].includes(value.toLowerCase());
}

function normalise(value: string): string {
  const withScheme = /^https?:\/\//.test(value) ? value : `https://${value}`;
  return withScheme.replace(/\/+$/, "");
}

/** True when the media has been mirrored into `public/` and is served locally. */
export const SELF_HOSTED_MEDIA = truthy(readEnv("VITE_SELF_HOST_MEDIA") ?? readEnv("SELF_HOST_MEDIA"));

/** Absolute origin serving `/__l5e/assets-v1/...`, no trailing slash. */
export const ASSET_ORIGIN = normalise(readEnv("VITE_ASSET_ORIGIN") ?? DEFAULT_ASSET_ORIGIN);

/** True for a path that points at the media catalogue. */
export function isMediaPath(path: string): boolean {
  return path.startsWith("/__l5e/");
}

/**
 * URL for a media path. Root-relative when the media is self-hosted, absolute
 * against {@link ASSET_ORIGIN} otherwise. Already-absolute URLs, data URIs and
 * ordinary `/public` files pass through untouched.
 */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  if (!isMediaPath(path)) return path;
  if (SELF_HOSTED_MEDIA) return path;
  return `${ASSET_ORIGIN}${path}`;
}

/**
 * Last-resort URL for a media file, used by the runtime `onError` fallback:
 * whichever of the two strategies was *not* used for the initial request.
 */
export function assetFallbackUrl(url: string): string | undefined {
  if (!url) return undefined;
  if (SELF_HOSTED_MEDIA) return isMediaPath(url) ? `${ASSET_ORIGIN}${url}` : undefined;
  const prefix = `${ASSET_ORIGIN}/__l5e/`;
  return url.startsWith(prefix) ? url.slice(ASSET_ORIGIN.length) : undefined;
}

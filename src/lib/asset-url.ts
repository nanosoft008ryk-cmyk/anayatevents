/**
 * Absolute origin for CDN-hosted media.
 *
 * Every photograph in this project lives on Lovable's asset CDN and is
 * referenced by a root-relative path (`/__l5e/assets-v1/...`). That path only
 * resolves on a Lovable-served host: deployed anywhere else (Vercel, Netlify,
 * a custom server) the same path 404s and every image breaks.
 *
 * Resolving each media path against a fixed CDN origin makes the images work
 * identically on any host. Override with `VITE_ASSET_ORIGIN` if the media is
 * ever moved to a different CDN.
 */

const DEFAULT_ASSET_ORIGIN = "https://anayatevents.lovable.app";

function readEnv(key: string): string | undefined {
  const viteEnv = (import.meta as unknown as { env?: Record<string, string | undefined> }).env;
  const fromVite = viteEnv?.[key];
  if (fromVite) return fromVite;
  if (typeof process !== "undefined" && process.env?.[key]) return process.env[key];
  return undefined;
}

function normalise(value: string): string {
  const withScheme = /^https?:\/\//.test(value) ? value : `https://${value}`;
  return withScheme.replace(/\/+$/, "");
}

/** Absolute origin serving `/__l5e/assets-v1/...`, no trailing slash. */
export const ASSET_ORIGIN = normalise(readEnv("VITE_ASSET_ORIGIN") ?? DEFAULT_ASSET_ORIGIN);

/**
 * Absolute URL for a CDN media path. Already-absolute URLs and non-CDN paths
 * (local `/public` files, data URIs) pass through untouched.
 */
export function assetUrl(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  if (!path.startsWith("/__l5e/")) return path;
  return `${ASSET_ORIGIN}${path}`;
}

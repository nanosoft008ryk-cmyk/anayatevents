#!/usr/bin/env node
/**
 * Mirror every CDN-hosted photograph into `public/` so the deployment is
 * completely self-contained.
 *
 * Each `src/assets/**\/*.asset.json` pointer describes a file that lives on
 * Lovable's asset CDN at `/__l5e/assets-v1/<asset_id>/<filename>`. This script
 * downloads each one to `public/__l5e/assets-v1/<asset_id>/<filename>`, i.e.
 * the exact same path. Once mirrored, every image resolves from the site's own
 * origin — whatever domain that happens to be — with no CDN dependency at all.
 *
 * Usage:
 *   node scripts/mirror-media.mjs            # download (skips existing files)
 *   node scripts/mirror-media.mjs --force    # re-download everything
 *   node scripts/mirror-media.mjs --if-enabled
 *        no-op unless SELF_HOST_MEDIA / VITE_SELF_HOST_MEDIA is truthy
 */
import { createWriteStream, readFileSync } from "node:fs";
import { mkdir, readdir, readFile, rename, rm, stat } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

// fileURLToPath, not URL.pathname: on Windows the latter yields "/C:/..."
// which path.resolve turns into "C:\C:\..." and the mirror never runs.
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Load `.env` into process.env.
 *
 * Vite reads .env for `import.meta.env`, but this script is plain Node and
 * would otherwise never see SELF_HOST_MEDIA. That mismatch is dangerous: the
 * app would resolve media to root-relative paths while this script skipped the
 * download, shipping a build where every image 404s. Read it here so both
 * halves agree. Real platform environment variables still win — we never
 * overwrite a value the host has already set.
 */
function loadDotEnv() {
  const file = path.join(ROOT, ".env");
  try {
    const text = readFileSync(file, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const m = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
      if (!m) continue;
      const key = m[1];
      if (process.env[key] !== undefined) continue;
      process.env[key] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* no .env here — platform environment variables are the source of truth */
  }
}
loadDotEnv();
const ASSETS_DIR = path.join(ROOT, "src", "assets");
const PUBLIC_DIR = path.join(ROOT, "public");
const CDN_ORIGIN = (
  process.env.VITE_ASSET_ORIGIN ||
  process.env.ASSET_ORIGIN ||
  "https://anayatevents.lovable.app"
).replace(/\/+$/, "");

const args = new Set(process.argv.slice(2));
const force = args.has("--force");
const truthy = (v) => !!v && !["0", "false", "no", ""].includes(String(v).toLowerCase());

if (args.has("--if-enabled") && !truthy(process.env.SELF_HOST_MEDIA ?? process.env.VITE_SELF_HOST_MEDIA)) {
  console.log("[mirror-media] self-hosting disabled (set SELF_HOST_MEDIA=1 to enable) — skipping.");
  process.exit(0);
}

async function collectPointerFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collectPointerFiles(p)));
    else if (entry.name.endsWith(".asset.json")) out.push(p);
  }
  return out;
}

/**
 * Every media URL the site can actually request, from both sources of truth.
 *
 * The .asset.json pointers are not the whole catalogue. The responsive srcsets
 * are built from src/content/variants.json, which references renditions that
 * have no pointer file at all — the 384px widths and, critically, every AVIF.
 * Mirroring only the pointers therefore shipped a site where Chrome picked an
 * <source type="image/avif"> that 404ed. A <picture> falls back on an
 * unsupported type, never on a failed request, so the image simply broke.
 *
 * Pointer entries carry a declared byte size and are preferred, because that
 * size is what lets isMirrored() detect a damaged file.
 */
async function collectTargets() {
  const byUrl = new Map();

  const add = (url, name, size) => {
    if (!url || byUrl.has(url)) return;
    byUrl.set(url, { url, name: name ?? url.split("/").pop(), size });
  };

  for (const file of await collectPointerFiles(ASSETS_DIR)) {
    const meta = JSON.parse(await readFile(file, "utf8"));
    add(meta.url, meta.original_filename, meta.size);
  }

  try {
    const manifest = JSON.parse(
      await readFile(path.join(ROOT, "src", "content", "variants.json"), "utf8"),
    );
    for (const entry of Object.values(manifest)) {
      add(entry?.orig);
      for (const map of [entry?.v, entry?.a]) {
        if (map) for (const url of Object.values(map)) add(url);
      }
    }
  } catch {
    /* no manifest — the pointers alone remain the catalogue */
  }

  return [...byUrl.values()];
}

/**
 * A mirrored file counts as present only when its size matches the size the
 * pointer declares.
 *
 * Testing for size > 0 alone was not enough: a download interrupted mid-stream
 * (or a stump left by an earlier, non-atomic version of this script) would sit
 * in public/ forever, because every later build skipped it as "already there"
 * and shipped a truncated image. Comparing against the declared size makes the
 * mirror self-healing — a damaged file is simply fetched again.
 */
async function isMirrored(dest, expectedSize) {
  try {
    const s = await stat(dest);
    if (s.size === 0) return false;
    return typeof expectedSize === "number" ? s.size === expectedSize : true;
  } catch {
    return false;
  }
}

const MAX_ATTEMPTS = 4;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch one asset, with retries, into a temporary file that is renamed into
 * place only once the stream has completed.
 *
 * Two failures this guards against, both seen in real deployments:
 *
 *  - A single transient "fetch failed" among 229 requests used to abort the
 *    whole build. Network blips are expected at this volume; they are not a
 *    reason to fail a deployment, so each asset gets several attempts with a
 *    widening delay.
 *  - A connection dropped mid-stream left a partial file at `dest`. Because
 *    exists() only checks for size > 0, the next build would treat that stump
 *    as "already present" and quietly ship a truncated image. Writing to
 *    `.part` and renaming makes the final file appear only when it is whole.
 */
async function download(url, dest) {
  await mkdir(path.dirname(dest), { recursive: true });
  const tmp = `${dest}.part`;
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
      if (!res.ok || !res.body) throw new Error(`${res.status} ${res.statusText}`);
      await pipeline(Readable.fromWeb(res.body), createWriteStream(tmp));
      await rename(tmp, dest);
      return attempt;
    } catch (error) {
      lastError = error;
      await rm(tmp, { force: true });
      if (attempt < MAX_ATTEMPTS) await sleep(400 * 2 ** (attempt - 1));
    }
  }

  throw new Error(`${lastError?.message ?? "failed"} after ${MAX_ATTEMPTS} attempts — ${url}`);
}

const targets = await collectTargets();
let downloaded = 0;
let skipped = 0;
const failures = [];

const queue = [...targets];
let retried = 0;
let repaired = 0;
// Six, not eight: the previous setting ran hot enough that the CDN
// intermittently dropped one request out of 229 and failed the deployment.
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const target = queue.pop();
    const dest = path.join(PUBLIC_DIR, target.url.replace(/^\//, ""));
    if (!force && (await isMirrored(dest, target.size))) {
      skipped += 1;
      continue;
    }
    // Present but the wrong size: a damaged file being replaced, not a new one.
    if (await isMirrored(dest, undefined)) repaired += 1;
    try {
      const attempts = await download(`${CDN_ORIGIN}${target.url}`, dest);
      if (attempts > 1) retried += 1;
      downloaded += 1;
    } catch (error) {
      failures.push(`${target.name}: ${error.message}`);
    }
  }
});
await Promise.all(workers);

console.log(
  `[mirror-media] ${targets.length} assets — ${downloaded} downloaded, ${skipped} already present, ${failures.length} failed.`,
);
if (retried) {
  console.log(`[mirror-media] ${retried} asset(s) needed a retry but succeeded.`);
}
if (repaired) {
  console.log(`[mirror-media] ${repaired} damaged file(s) re-downloaded.`);
}
if (failures.length) {
  failures.forEach((f) => console.error(`  ✗ ${f}`));
  process.exit(1);
}
console.log("[mirror-media] media now served from the site's own origin (/__l5e/assets-v1/...).");

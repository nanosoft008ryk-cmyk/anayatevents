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
import { createWriteStream } from "node:fs";
import { mkdir, readdir, readFile, stat } from "node:fs/promises";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import process from "node:process";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
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

async function collectPointers(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await collectPointers(p)));
    else if (entry.name.endsWith(".asset.json")) out.push(p);
  }
  return out;
}

async function exists(p) {
  try {
    const s = await stat(p);
    return s.size > 0;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok || !res.body) throw new Error(`${res.status} ${res.statusText} — ${url}`);
  await mkdir(path.dirname(dest), { recursive: true });
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
}

const pointers = await collectPointers(ASSETS_DIR);
let downloaded = 0;
let skipped = 0;
const failures = [];

const queue = [...pointers];
const workers = Array.from({ length: 8 }, async () => {
  while (queue.length) {
    const pointer = queue.pop();
    const meta = JSON.parse(await readFile(pointer, "utf8"));
    if (!meta.url) continue;
    const dest = path.join(PUBLIC_DIR, meta.url.replace(/^\//, ""));
    if (!force && (await exists(dest))) {
      skipped += 1;
      continue;
    }
    try {
      await download(`${CDN_ORIGIN}${meta.url}`, dest);
      downloaded += 1;
    } catch (error) {
      failures.push(`${meta.original_filename ?? meta.url}: ${error.message}`);
    }
  }
});
await Promise.all(workers);

console.log(
  `[mirror-media] ${pointers.length} assets — ${downloaded} downloaded, ${skipped} already present, ${failures.length} failed.`,
);
if (failures.length) {
  failures.forEach((f) => console.error(`  ✗ ${f}`));
  process.exit(1);
}
console.log("[mirror-media] media now served from the site's own origin (/__l5e/assets-v1/...).");

#!/usr/bin/env node
/**
 * Deployment readiness check.
 *
 * Fails the build when anything would break — or silently point at the wrong
 * domain — after the site moves to a production host.
 *
 * Usage: node scripts/deploy-check.mjs [--base=https://example.com]
 *        (crawls the dev server; start it first)
 */
import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join, extname } from "node:path";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v = "true"] = a.replace(/^--/, "").split("=");
    return [k, v];
  }),
);
const CRAWL_BASE = args.base ?? "http://localhost:8080";

/* --------------------------- 1. source scanning --------------------------- */

const SOURCE_DIRS = ["src", "scripts", "public"];
const ALLOWED_DOMAIN_FILES = new Set([
  // The single place a fallback domain may appear.
  "src/lib/site-url.ts",
  // Default media origin, overridable with VITE_ASSET_ORIGIN and bypassed
  // entirely when the media is mirrored into the build (SELF_HOST_MEDIA=1).
  "src/lib/asset-url.ts",
  "scripts/deploy-check.mjs",
  "scripts/mirror-media.mjs",
]);
const DOMAIN_RE = /https?:\/\/[a-z0-9-]+(?:--[a-z0-9-]+)?\.lovable\.app/gi;

function walk(dir, out = []) {
  let items;
  try {
    items = readdirSync(dir);
  } catch {
    return out;
  }
  for (const item of items) {
    const p = join(dir, item);
    if (statSync(p).isDirectory()) walk(p, out);
    else if ([".ts", ".tsx", ".js", ".mjs", ".json", ".txt", ".xml", ".html", ".css"].includes(extname(p)))
      out.push(p);
  }
  return out;
}

const findings = [];
const add = (severity, check, where, message) =>
  findings.push({ severity, check, where, message });

for (const file of SOURCE_DIRS.flatMap((d) => walk(d))) {
  if (ALLOWED_DOMAIN_FILES.has(file)) continue;
  const text = readFileSync(file, "utf8");
  const hits = text.match(DOMAIN_RE);
  if (hits)
    add(
      "error",
      "hardcoded-domain",
      file,
      `Hardcoded deployment domain: ${[...new Set(hits)].join(", ")}. Use SITE_URL / absoluteUrl from src/lib/site-url.ts.`,
    );
  // Absolute internal links in markup bypass the router and pin the domain.
  for (const m of text.matchAll(/href="https?:\/\/[^"]*"/g)) {
    if (/lovable\.app/.test(m[0]))
      add("error", "absolute-internal-link", file, `Absolute internal link: ${m[0]}`);
  }
}

/* ---------------------------- 2. live crawling ---------------------------- */

async function crawl() {
  const res = await fetch(`${CRAWL_BASE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap.xml responded ${res.status}`);
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/^https?:\/\/[^/]+/, ""),
  );

  // Generated files follow the request host; canonical/og/schema follow the
  // configured VITE_SITE_URL (the development fallback when it is unset).
  const servedOrigin = new URL(CRAWL_BASE).origin;
  const fallback = readFileSync("src/lib/site-url.ts", "utf8").match(
    /DEV_FALLBACK\s*=\s*"([^"]+)"/,
  )?.[1];
  const expectedOrigin = new URL(
    args.expect ?? process.env.VITE_SITE_URL ?? fallback ?? CRAWL_BASE,
  ).origin;
  for (const path of paths) {
    const url = `${CRAWL_BASE}${path}`;
    const page = await fetch(url);
    if (!page.ok) {
      add("error", "broken-route", path, `Returned ${page.status}`);
      continue;
    }
    const html = await page.text();

    const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1];
    if (!canonical) add("error", "missing-canonical", path, "No canonical link");
    else if (!canonical.startsWith(expectedOrigin))
      add(
        "error",
        "canonical-domain",
        path,
        `Canonical points at ${new URL(canonical).origin}, not the serving origin`,
      );

    const ogUrl = html.match(/<meta[^>]+property="og:url"[^>]+content="([^"]+)"/)?.[1];
    if (ogUrl && !ogUrl.startsWith(expectedOrigin))
      add("error", "og-domain", path, `og:url points at ${new URL(ogUrl).origin}`);

    for (const [, json] of html.matchAll(
      /<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g,
    )) {
      let data;
      try {
        data = JSON.parse(json);
      } catch {
        add("error", "invalid-jsonld", path, "JSON-LD block is not valid JSON");
        continue;
      }
      const urls = JSON.stringify(data).match(/https?:\/\/[^"]+/g) ?? [];
      for (const u of urls) {
        const origin = new URL(u).origin;
        if (/lovable\.app/.test(origin) && origin !== expectedOrigin)
          add("error", "schema-domain", path, `JSON-LD references ${origin}`);
      }
    }

    // Local assets must resolve on the serving host.
    const assets = new Set(
      [...html.matchAll(/(?:src|href)="(\/[^"]+\.(?:png|jpe?g|webp|avif|svg|ico|css|js|woff2?))"/g)].map(
        (m) => m[1],
      ),
    );
    for (const asset of assets) {
      const head = await fetch(`${CRAWL_BASE}${asset}`, { method: "HEAD" });
      if (!head.ok) add("error", "missing-asset", path, `${asset} → ${head.status}`);
    }
  }

  // Generated files must speak the serving origin.
  for (const file of ["/robots.txt", "/llms.txt", "/sitemap.xml", "/image-sitemap.xml"]) {
    const r = await fetch(`${CRAWL_BASE}${file}`);
    if (!r.ok) {
      add("error", "generated-file", file, `Returned ${r.status}`);
      continue;
    }
    const body = await r.text();
    const wrong = [...new Set((body.match(/https?:\/\/[^\s"<)]+/g) ?? []).map((u) => new URL(u).origin))]
      .filter((o) => o !== servedOrigin && /lovable\.app|localhost/.test(o));
    if (wrong.length) add("error", "generated-file-domain", file, `References ${wrong.join(", ")}`);
  }

  // Every image referenced by the homepage must actually load on this host.
  const home = await (await fetch(`${CRAWL_BASE}/`)).text();
  const media = [
    ...new Set(
      [...home.matchAll(/(?:src|srcset)="([^"]+)"/g)]
        .flatMap((m) => m[1].split(",").map((c) => c.trim().split(/\s+/)[0]))
        .filter((u) => u.includes("/__l5e/")),
    ),
  ].slice(0, 12);
  if (!media.length) add("warn", "media", "/", "No catalogue media found on the homepage.");
  for (const url of media) {
    const target = url.startsWith("http") ? url : `${CRAWL_BASE}${url}`;
    try {
      const r = await fetch(target, { method: "HEAD" });
      if (!r.ok) add("error", "media-unreachable", target, `Returned ${r.status} — images will break on this domain.`);
    } catch (err) {
      add("error", "media-unreachable", target, err.message);
    }
  }

  return paths.length;
}

let pageCount = 0;
try {
  pageCount = await crawl();
} catch (err) {
  add("error", "crawl", CRAWL_BASE, `Could not crawl: ${err.message}`);
}

/* ------------------------------- 3. report -------------------------------- */

mkdirSync("reports/deploy", { recursive: true });
const errors = findings.filter((f) => f.severity === "error");
const report = { base: CRAWL_BASE, pages: pageCount, errors: errors.length, findings };
writeFileSync("reports/deploy/deploy-report.json", JSON.stringify(report, null, 2));
writeFileSync(
  "reports/deploy/deploy-report.html",
  `<!doctype html><meta charset="utf-8"><title>Deployment report</title>
<style>body{font:14px/1.6 system-ui;margin:3rem auto;max-width:60rem;color:#111}
td,th{border-bottom:1px solid #ddd;padding:.5rem;text-align:left;vertical-align:top}
.error{color:#b00}</style>
<h1>Deployment readiness</h1>
<p>${pageCount} pages crawled at ${CRAWL_BASE} — <strong>${errors.length}</strong> errors.</p>
<table><tr><th>Severity</th><th>Check</th><th>Where</th><th>Detail</th></tr>
${findings
  .map(
    (f) =>
      `<tr class="${f.severity}"><td>${f.severity}</td><td>${f.check}</td><td>${f.where}</td><td>${f.message}</td></tr>`,
  )
  .join("\n")}
</table>`,
);

console.log(`\nDeployment check — ${pageCount} pages, ${errors.length} errors`);
for (const f of errors.slice(0, 25)) console.log(`  ✗ ${f.where} [${f.check}] ${f.message}`);
console.log("\nReport written to reports/deploy/deploy-report.json and .html");
if (errors.length) process.exit(1);

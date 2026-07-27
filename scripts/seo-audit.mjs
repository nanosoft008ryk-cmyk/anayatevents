#!/usr/bin/env node
/**
 * Build-time SEO audit.
 *
 * Crawls every URL the generated sitemap advertises and validates the things
 * that silently break search performance: metadata presence and uniqueness,
 * self-referencing canonicals, social cards, heading structure, image alt
 * text, JSON-LD validity, internal link health, orphan pages and near
 * duplicate content.
 *
 *   npm run seo:audit                  # audits http://localhost:8080
 *   npm run seo:audit -- https://host  # audits a deployed origin
 *
 * Exits 1 when a critical issue is found, so it can gate a release.
 */

const ORIGIN = (process.argv[2] || process.env.SEO_AUDIT_ORIGIN || "http://localhost:8080").replace(
  /\/$/,
  "",
);

const errors = [];
const warnings = [];
const fail = (url, msg) => errors.push(`${url} — ${msg}`);
const warn = (url, msg) => warnings.push(`${url} — ${msg}`);

const text = (html, re) => (html.match(re) || [])[1];
const all = (html, re) => [...html.matchAll(re)];

async function get(url) {
  const res = await fetch(url, { headers: { "user-agent": "anayat-seo-audit" } });
  return { status: res.status, body: await res.text() };
}

const sitemap = await get(`${ORIGIN}/sitemap.xml`);
if (sitemap.status !== 200) {
  console.error(`sitemap.xml returned ${sitemap.status} — is the server running at ${ORIGIN}?`);
  process.exit(1);
}

const paths = all(sitemap.body, /<loc>([^<]+)<\/loc>/g).map((m) =>
  m[1].replace(/^https?:\/\/[^/]+/, ""),
);

const robots = await get(`${ORIGIN}/robots.txt`);
if (robots.status !== 200) fail("/robots.txt", "missing");
else if (!robots.body.includes("Sitemap:")) fail("/robots.txt", "no Sitemap directive");

const titles = new Map();
const descriptions = new Map();
const shingleSets = new Map();
const linkedTo = new Set(["/"]);
const pages = [];

const shingles = (body) => {
  const words = body
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  const set = new Set();
  for (let i = 0; i + 5 <= words.length; i++) set.add(words.slice(i, i + 5).join(" "));
  return set;
};

for (const path of paths) {
  const url = `${ORIGIN}${path}`;
  const { status, body } = await get(url);
  if (status !== 200) {
    fail(path, `HTTP ${status}`);
    continue;
  }
  pages.push(path);

  const title = text(body, /<title[^>]*>([^<]*)<\/title>/i);
  const description = text(body, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  const canonical = text(body, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
  const ogTitle = text(body, /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i);
  const ogDesc = text(body, /<meta[^>]+property="og:description"[^>]+content="([^"]*)"/i);
  const ogImage = text(body, /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i);
  const twCard = text(body, /<meta[^>]+name="twitter:card"[^>]+content="([^"]*)"/i);

  if (!title) fail(path, "missing <title>");
  else {
    if (title.length > 65) warn(path, `title is ${title.length} chars`);
    if (titles.has(title)) fail(path, `duplicate title, also on ${titles.get(title)}`);
    else titles.set(title, path);
  }

  if (!description) fail(path, "missing meta description");
  else {
    if (description.length > 165) warn(path, `description is ${description.length} chars`);
    if (descriptions.has(description))
      fail(path, `duplicate description, also on ${descriptions.get(description)}`);
    else descriptions.set(description, path);
  }

  const canonicalCount = all(body, /<link[^>]+rel="canonical"/g).length;
  if (canonicalCount === 0) fail(path, "missing canonical");
  if (canonicalCount > 1) fail(path, `${canonicalCount} canonical tags`);
  if (canonical && new URL(canonical).pathname.replace(/\/$/, "") !== (path === "/" ? "" : path))
    fail(path, `canonical points elsewhere (${canonical})`);

  if (!ogTitle || !ogDesc) fail(path, "incomplete Open Graph tags");
  if (!ogImage) warn(path, "no og:image");
  if (!twCard) fail(path, "missing twitter:card");

  const h1s = all(body, /<h1[\s>]/g).length;
  if (h1s === 0) fail(path, "no <h1>");
  if (h1s > 1) fail(path, `${h1s} <h1> elements`);

  const missingAlt = all(body, /<img\b(?![^>]*\balt=)[^>]*>/g).length;
  if (missingAlt > 0) fail(path, `${missingAlt} <img> without alt`);

  for (const [, json] of all(
    body,
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    try {
      const data = JSON.parse(json);
      const nodes = Array.isArray(data) ? data : [data];
      for (const node of nodes) {
        if (!node["@context"]) fail(path, "JSON-LD node without @context");
        if (!node["@type"]) fail(path, "JSON-LD node without @type");
      }
    } catch {
      fail(path, "invalid JSON-LD");
    }
  }

  for (const [, href] of all(body, /<a[^>]+href="(\/[^"#?]*)"/g)) {
    linkedTo.add(href.replace(/\/$/, "") || "/");
  }

  shingleSets.set(path, shingles(body));
}

for (const path of pages) {
  if (path !== "/" && !linkedTo.has(path)) fail(path, "orphan page — nothing links to it");
}

for (const [, href] of [...linkedTo].map((h) => [null, h])) {
  if (!pages.includes(href) && !/^\/(sitemap|robots)/.test(href))
    warn(href, "internal link target is not in the sitemap");
}

const list = [...shingleSets.entries()];
for (let i = 0; i < list.length; i++) {
  for (let j = i + 1; j < list.length; j++) {
    const [aPath, a] = list[i];
    const [bPath, b] = list[j];
    if (a.size < 40 || b.size < 40) continue;
    let shared = 0;
    for (const s of a) if (b.has(s)) shared++;
    const similarity = shared / Math.min(a.size, b.size);
    if (similarity > 0.7) fail(aPath, `${Math.round(similarity * 100)}% similar to ${bPath}`);
    else if (similarity > 0.5)
      warn(aPath, `${Math.round(similarity * 100)}% similar to ${bPath}`);
  }
}

console.log(`\nSEO audit — ${pages.length} pages crawled at ${ORIGIN}\n`);
if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  · ${w}`);
  console.log("");
}
if (errors.length) {
  console.log(`Errors (${errors.length}):`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  console.log("\nAudit failed.\n");
  process.exit(1);
}
console.log("All checks passed.\n");

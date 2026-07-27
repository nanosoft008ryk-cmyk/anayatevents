#!/usr/bin/env node
/**
 * Build-time SEO audit + report artifact.
 *
 * Crawls every URL the generated sitemap advertises and validates the things
 * that silently break search performance: metadata presence and uniqueness,
 * self-referencing canonicals, social cards, heading structure, image alt
 * text, JSON-LD validity and per-page-type schema coverage, review-markup
 * factuality, sitemap and image-sitemap integrity, internal link health,
 * orphan pages and near-duplicate content.
 *
 *   npm run seo:audit                      # audits http://localhost:8080
 *   npm run seo:audit -- https://host      # audits a deployed origin
 *   npm run seo:ci                         # CI mode: strict thresholds
 *
 * Flags / env:
 *   --max-warnings=N   (SEO_MAX_WARNINGS)  fail when warnings exceed N
 *   --max-errors=N     (SEO_MAX_ERRORS)    fail when errors exceed N (default 0)
 *   --report-dir=PATH  (SEO_REPORT_DIR)    default reports/seo
 *   --no-report                            skip writing artifacts
 *
 * Writes reports/seo/seo-report.json and reports/seo/seo-report.html so the
 * exact pass/fail detail can be reviewed locally or archived by CI.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

/* ------------------------------- options -------------------------------- */

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
};

const ORIGIN = (
  args.find((a) => /^https?:\/\//.test(a)) ||
  process.env.SEO_AUDIT_ORIGIN ||
  "http://localhost:8080"
).replace(/\/$/, "");

const MAX_ERRORS = Number(flag("max-errors", process.env.SEO_MAX_ERRORS ?? 0));
const MAX_WARNINGS = Number(flag("max-warnings", process.env.SEO_MAX_WARNINGS ?? Infinity));
const REPORT_DIR = flag("report-dir", process.env.SEO_REPORT_DIR ?? "reports/seo");
const WRITE_REPORT = !args.includes("--no-report");

/* ------------------------------- findings ------------------------------- */

/** Every finding is structured, so the JSON artifact is machine-readable. */
const findings = [];
const fail = (url, check, message) =>
  findings.push({ severity: "error", page: url, check, message });
const warn = (url, check, message) =>
  findings.push({ severity: "warning", page: url, check, message });

const errors = () => findings.filter((f) => f.severity === "error");
const warnings = () => findings.filter((f) => f.severity === "warning");

/* -------------------------------- helpers ------------------------------- */

const decode = (v) =>
  v === undefined
    ? v
    : v
        .replace(/&amp;/g, "&")
        .replace(/&#x27;|&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");

// Lengths are measured on decoded text — "&amp;" is one character in a SERP.
const text = (html, re) => decode((html.match(re) || [])[1]);
const all = (html, re) => [...html.matchAll(re)];
const esc = (v) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function get(url) {
  const res = await fetch(url, { headers: { "user-agent": "anayat-seo-audit" } });
  return { status: res.status, body: await res.text() };
}

async function head(url) {
  try {
    const res = await fetch(url, { method: "HEAD", headers: { "user-agent": "anayat-seo-audit" } });
    return res.status;
  } catch {
    return 0;
  }
}

/* ------------------------------ sitemap.xml ----------------------------- */

const sitemap = await get(`${ORIGIN}/sitemap.xml`);
if (sitemap.status !== 200) {
  console.error(`sitemap.xml returned ${sitemap.status} — is the server running at ${ORIGIN}?`);
  process.exit(1);
}

const locs = all(sitemap.body, /<loc>([^<]+)<\/loc>/g).map((m) => m[1]);
const paths = locs.map((l) => l.replace(/^https?:\/\/[^/]+/, ""));

// Duplicates in the sitemap waste crawl budget and split signals.
const seenLoc = new Set();
for (const loc of locs) {
  if (seenLoc.has(loc)) fail("/sitemap.xml", "sitemap-duplicate", `duplicate <loc> ${loc}`);
  seenLoc.add(loc);
}
for (const loc of locs) {
  if (!loc.startsWith(ORIGIN) && !/^https:\/\//.test(loc))
    fail("/sitemap.xml", "sitemap-url", `<loc> is not absolute: ${loc}`);
}

/* --------------------------- image-sitemap.xml -------------------------- */

const imageSitemap = await get(`${ORIGIN}/image-sitemap.xml`);
if (imageSitemap.status !== 200) {
  fail("/image-sitemap.xml", "image-sitemap", `returned HTTP ${imageSitemap.status}`);
} else {
  const blocks = all(imageSitemap.body, /<url>([\s\S]*?)<\/url>/g).map((m) => m[1]);
  if (blocks.length === 0)
    fail("/image-sitemap.xml", "image-sitemap", "no <url> entries — nothing declared");
  const imagePaths = new Set();
  for (const block of blocks) {
    const loc = (block.match(/<loc>([^<]+)<\/loc>/) || [])[1] ?? "";
    const page = loc.replace(/^https?:\/\/[^/]+/, "");
    imagePaths.add(page);
    if (!paths.includes(page))
      fail("/image-sitemap.xml", "image-sitemap", `${page} is not a page in sitemap.xml`);
    const imgs = all(block, /<image:loc>([^<]+)<\/image:loc>/g).map((m) => decode(m[1]));
    const seenImg = new Set();
    for (const img of imgs) {
      if (seenImg.has(img))
        fail("/image-sitemap.xml", "image-sitemap", `${page} declares ${img} twice`);
      seenImg.add(img);
    }
    const titles = all(block, /<image:title>([^<]*)<\/image:title>/g).length;
    if (titles !== imgs.length)
      warn("/image-sitemap.xml", "image-sitemap", `${page} has images without <image:title>`);
  }
  // Spot-check that declared images actually resolve.
  const sample = all(imageSitemap.body, /<image:loc>([^<]+)<\/image:loc>/g)
    .map((m) => decode(m[1]))
    .slice(0, 12);
  for (const img of sample) {
    const status = await head(img);
    if (status >= 400 || status === 0)
      fail("/image-sitemap.xml", "image-broken", `${img} returned ${status || "no response"}`);
  }
}

/* ------------------------------- robots.txt ----------------------------- */

const robots = await get(`${ORIGIN}/robots.txt`);
if (robots.status !== 200) fail("/robots.txt", "robots", "missing");
else {
  if (!robots.body.includes(`Sitemap: ${ORIGIN}/sitemap.xml`) && !robots.body.includes("sitemap.xml"))
    fail("/robots.txt", "robots", "no Sitemap directive for sitemap.xml");
  if (!robots.body.includes("image-sitemap.xml"))
    warn("/robots.txt", "robots", "image sitemap is not advertised");
  if (/^\s*Disallow:\s*\/\s*$/m.test(robots.body))
    fail("/robots.txt", "robots", "site-wide Disallow: / blocks all crawling");
}

/* -------------------------------- crawl --------------------------------- */

const titles = new Map();
const descriptions = new Map();
const shingleSets = new Map();
const linkedTo = new Set(["/"]);
const pages = [];
const schemaTypesByPage = new Map();

// Similarity is measured on <main> only — shared header, footer and
// related-links chrome would otherwise make every page look like every other.
const mainOf = (body) => (body.match(/<main[\s\S]*?<\/main>/i) || [body])[0];

const shingles = (body) => {
  const words = mainOf(body)
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

/** What each page family must declare, structurally. */
function requiredSchema(path) {
  if (path === "/") return ["WebSite", "LocalBusiness"];
  if (/^\/services\/[^/]+$/.test(path)) return ["Service", "BreadcrumbList"];
  if (/^\/areas\/[^/]+$/.test(path)) return ["ProfessionalService", "BreadcrumbList"];
  if (/^\/journal\/[^/]+$/.test(path) && !path.startsWith("/journal/category"))
    return ["Article", "BreadcrumbList"];
  if (/^\/portfolio\/[^/]+$/.test(path)) return ["BreadcrumbList"];
  if (path === "/contact") return ["BreadcrumbList"];
  return [];
}

function collectTypes(node, into) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const n of node) collectTypes(n, into);
    return;
  }
  const t = node["@type"];
  if (typeof t === "string") into.add(t);
  if (Array.isArray(t)) for (const v of t) into.add(v);
  for (const value of Object.values(node)) collectTypes(value, into);
}

/** Review markup must be factual: real author, real body, real rating. */
function auditReviews(path, node) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const n of node) auditReviews(path, n);
    return;
  }
  if (node["@type"] === "Review") {
    const rating = node.reviewRating?.ratingValue;
    if (!node.author?.name) fail(path, "review-schema", "Review without a named author");
    if (!node.reviewBody) fail(path, "review-schema", "Review without reviewBody");
    if (rating === undefined) fail(path, "review-schema", "Review without a rating");
    else if (Number(rating) < 1 || Number(rating) > 5)
      fail(path, "review-schema", `Review rating out of range (${rating})`);
  }
  if (node["@type"] === "AggregateRating") {
    if (!node.ratingCount && !node.reviewCount)
      fail(path, "review-schema", "AggregateRating without a review count");
  }
  for (const value of Object.values(node)) auditReviews(path, value);
}

for (const p of paths) {
  const url = `${ORIGIN}${p}`;
  const { status, body } = await get(url);
  if (status !== 200) {
    fail(p, "http", `HTTP ${status}`);
    continue;
  }
  pages.push(p);

  const title = text(body, /<title[^>]*>([^<]*)<\/title>/i);
  const description = text(body, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i);
  const canonical = text(body, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i);
  const ogTitle = text(body, /<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i);
  const ogDesc = text(body, /<meta[^>]+property="og:description"[^>]+content="([^"]*)"/i);
  const ogImage = text(body, /<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i);
  const twCard = text(body, /<meta[^>]+name="twitter:card"[^>]+content="([^"]*)"/i);

  if (!title) fail(p, "title", "missing <title>");
  else {
    if (title.length > 65) warn(p, "title", `title is ${title.length} chars`);
    if (titles.has(title)) fail(p, "title", `duplicate title, also on ${titles.get(title)}`);
    else titles.set(title, p);
  }

  if (!description) fail(p, "description", "missing meta description");
  else {
    if (description.length > 165) warn(p, "description", `description is ${description.length} chars`);
    if (descriptions.has(description))
      fail(p, "description", `duplicate description, also on ${descriptions.get(description)}`);
    else descriptions.set(description, p);
  }

  const canonicalCount = all(body, /<link[^>]+rel="canonical"/g).length;
  if (canonicalCount === 0) fail(p, "canonical", "missing canonical");
  if (canonicalCount > 1) fail(p, "canonical", `${canonicalCount} canonical tags`);
  if (canonical && new URL(canonical).pathname.replace(/\/$/, "") !== (p === "/" ? "" : p))
    fail(p, "canonical", `canonical points elsewhere (${canonical})`);

  if (!ogTitle || !ogDesc) fail(p, "open-graph", "incomplete Open Graph tags");
  if (!ogImage) warn(p, "open-graph", "no og:image");
  if (!twCard) fail(p, "twitter", "missing twitter:card");

  const h1s = all(body, /<h1[\s>]/g).length;
  if (h1s === 0) fail(p, "headings", "no <h1>");
  if (h1s > 1) fail(p, "headings", `${h1s} <h1> elements`);

  const missingAlt = all(body, /<img\b(?![^>]*\balt=)[^>]*>/g).length;
  if (missingAlt > 0) fail(p, "alt-text", `${missingAlt} <img> without alt`);

  const types = new Set();
  for (const [, json] of all(
    body,
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )) {
    try {
      const data = JSON.parse(json);
      const nodes = Array.isArray(data) ? data : [data];
      for (const node of nodes) {
        if (!node["@context"]) fail(p, "json-ld", "JSON-LD node without @context");
        if (!node["@type"]) fail(p, "json-ld", "JSON-LD node without @type");
      }
      collectTypes(data, types);
      auditReviews(p, data);
    } catch {
      fail(p, "json-ld", "invalid JSON-LD");
    }
  }
  schemaTypesByPage.set(p, types);

  for (const required of requiredSchema(p)) {
    if (!types.has(required)) fail(p, "schema-coverage", `missing ${required} structured data`);
  }

  for (const [, href] of all(body, /<a[^>]+href="(\/[^"#?]*)"/g)) {
    linkedTo.add(href.replace(/\/$/, "") || "/");
  }

  shingleSets.set(p, shingles(body));
}

/* ------------------------- graph and link health ------------------------ */

for (const p of pages) {
  if (p !== "/" && !linkedTo.has(p)) fail(p, "orphan", "orphan page — nothing links to it");
}

for (const href of linkedTo) {
  if (pages.includes(href) || /^\/(sitemap|image-sitemap|robots)/.test(href)) continue;
  const status = await head(`${ORIGIN}${href}`);
  if (status >= 400 || status === 0)
    fail(href, "broken-link", `internal link target returned ${status || "no response"}`);
  else warn(href, "link-coverage", "internal link target is not in the sitemap");
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
    if (similarity > 0.7)
      fail(aPath, "duplicate-content", `${Math.round(similarity * 100)}% similar to ${bPath}`);
    else if (similarity > 0.5)
      warn(aPath, "duplicate-content", `${Math.round(similarity * 100)}% similar to ${bPath}`);
  }
}

/* -------------------------------- report -------------------------------- */

const summary = {
  origin: ORIGIN,
  generatedAt: new Date().toISOString(),
  pagesCrawled: pages.length,
  errors: errors().length,
  warnings: warnings().length,
  thresholds: { maxErrors: MAX_ERRORS, maxWarnings: MAX_WARNINGS },
};

const byCheck = {};
for (const f of findings) {
  byCheck[f.check] ??= { errors: 0, warnings: 0 };
  byCheck[f.check][f.severity === "error" ? "errors" : "warnings"] += 1;
}

const passed =
  summary.errors <= MAX_ERRORS && summary.warnings <= MAX_WARNINGS;

if (WRITE_REPORT) {
  const dir = path.resolve(process.cwd(), REPORT_DIR);
  await mkdir(dir, { recursive: true });

  await writeFile(
    path.join(dir, "seo-report.json"),
    JSON.stringify({ summary, passed, byCheck, pages, findings }, null, 2),
  );

  const rows = findings
    .map(
      (f) => `<tr class="${f.severity}">
      <td>${f.severity === "error" ? "✗" : "!"}</td>
      <td><a href="${esc(ORIGIN + f.page)}">${esc(f.page)}</a></td>
      <td>${esc(f.check)}</td>
      <td>${esc(f.message)}</td>
    </tr>`,
    )
    .join("\n");

  const checkRows = Object.entries(byCheck)
    .sort((a, b) => b[1].errors - a[1].errors || b[1].warnings - a[1].warnings)
    .map(
      ([check, c]) =>
        `<tr><td>${esc(check)}</td><td>${c.errors}</td><td>${c.warnings}</td></tr>`,
    )
    .join("\n");

  const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>SEO audit — Anayat Events</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; padding:48px; background:#0b0b0b; color:#efe9df;
         font:15px/1.6 ui-sans-serif,system-ui,-apple-system,sans-serif; }
  h1 { font-weight:300; letter-spacing:.02em; font-size:34px; margin:0 0 6px; }
  .sub { color:#9a9287; font-size:13px; letter-spacing:.16em; text-transform:uppercase; }
  .verdict { display:inline-block; margin:28px 0; padding:10px 20px; border-radius:25px;
             font-size:13px; letter-spacing:.18em; text-transform:uppercase; }
  .pass { background:#12331d; color:#7fd39b; } .failv { background:#3a1414; color:#ef8f8f; }
  .cards { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:36px; }
  .card { border:1px solid #26241f; border-radius:16px; padding:18px 24px; min-width:150px; }
  .card b { display:block; font-size:30px; font-weight:300; color:#d4af6a; }
  table { width:100%; border-collapse:collapse; margin-bottom:40px; font-size:13.5px; }
  th,td { text-align:left; padding:10px 12px; border-bottom:1px solid #1e1c18; vertical-align:top; }
  th { color:#9a9287; font-size:11px; letter-spacing:.18em; text-transform:uppercase; }
  tr.error td:first-child { color:#ef8f8f; } tr.warning td:first-child { color:#e2c07a; }
  a { color:#d4af6a; }
</style></head><body>
<p class="sub">Anayat Events &amp; Catering</p>
<h1>SEO audit report</h1>
<p class="sub">${esc(summary.origin)} · ${esc(summary.generatedAt)}</p>
<div class="verdict ${passed ? "pass" : "failv"}">${passed ? "Passed thresholds" : "Failed thresholds"}</div>
<div class="cards">
  <div class="card"><b>${summary.pagesCrawled}</b>pages crawled</div>
  <div class="card"><b>${summary.errors}</b>errors (max ${MAX_ERRORS})</div>
  <div class="card"><b>${summary.warnings}</b>warnings (max ${MAX_WARNINGS === Infinity ? "∞" : MAX_WARNINGS})</div>
</div>
<h2>By check</h2>
<table><thead><tr><th>Check</th><th>Errors</th><th>Warnings</th></tr></thead>
<tbody>${checkRows || '<tr><td colspan="3">Nothing flagged.</td></tr>'}</tbody></table>
<h2>Findings</h2>
<table><thead><tr><th></th><th>Page</th><th>Check</th><th>Detail</th></tr></thead>
<tbody>${rows || '<tr><td colspan="4">Every check passed.</td></tr>'}</tbody></table>
</body></html>`;

  await writeFile(path.join(dir, "seo-report.html"), html);
  console.log(`\nReport written to ${REPORT_DIR}/seo-report.json and ${REPORT_DIR}/seo-report.html`);
}

console.log(`\nSEO audit — ${pages.length} pages crawled at ${ORIGIN}\n`);
if (warnings().length) {
  console.log(`Warnings (${warnings().length}):`);
  for (const w of warnings()) console.log(`  · ${w.page} — [${w.check}] ${w.message}`);
  console.log("");
}
if (errors().length) {
  console.log(`Errors (${errors().length}):`);
  for (const e of errors()) console.log(`  ✗ ${e.page} — [${e.check}] ${e.message}`);
  console.log("");
}
if (!passed) {
  console.log(
    `Audit failed thresholds — ${summary.errors} error(s) (max ${MAX_ERRORS}), ${summary.warnings} warning(s) (max ${MAX_WARNINGS}).\n`,
  );
  process.exit(1);
}
console.log("All checks passed within thresholds.\n");

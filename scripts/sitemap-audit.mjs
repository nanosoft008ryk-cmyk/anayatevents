#!/usr/bin/env node
/**
 * Human-readable sitemap audit.
 *
 * Crawls every generated sitemap file (index, per-section, image, flat) and
 * reports, per file:
 *   - URL count
 *   - coverage vs the flat sitemap (missing / extra URLs, overlap)
 *   - domain/origin correctness (every <loc> must use the serving origin)
 *
 * Usage: node scripts/sitemap-audit.mjs [--base=http://localhost:8080]
 *        (crawls a running server; start `npm run dev` first)
 */
import { mkdirSync, writeFileSync } from "node:fs";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v = "true"] = a.replace(/^--/, "").split("=");
    return [k, v];
  }),
);
const BASE = (args.base ?? "http://localhost:8080").replace(/\/$/, "");
const ORIGIN = new URL(BASE).origin;

const findings = [];
const add = (severity, check, where, message) =>
  findings.push({ severity, check, where, message });

const locs = (xml, tag = "url") =>
  [...xml.matchAll(new RegExp(`<${tag}>[\\s\\S]*?<\\/${tag}>`, "g"))]
    .map((m) => m[0].match(/<loc>([^<]+)<\/loc>/)?.[1])
    .filter(Boolean);

async function fetchXml(path) {
  const res = await fetch(`${BASE}${path}`);
  const body = await res.text();
  return { ok: res.ok, status: res.status, type: res.headers.get("content-type") ?? "", body };
}

function checkOrigins(path, urls) {
  const wrong = urls.filter((u) => {
    try {
      return new URL(u).origin !== ORIGIN;
    } catch {
      return true;
    }
  });
  if (wrong.length)
    add(
      "error",
      "origin",
      path,
      `${wrong.length} URL(s) do not use the serving origin ${ORIGIN}: ${[
        ...new Set(wrong.map((u) => {
          try {
            return new URL(u).origin;
          } catch {
            return u;
          }
        })),
      ]
        .slice(0, 4)
        .join(", ")}`,
    );
  return wrong.length;
}

const pathOf = (u) => {
  try {
    return new URL(u).pathname;
  } catch {
    return u;
  }
};

/* ------------------------------ flat sitemap ------------------------------ */

const files = [];
let flatPaths = new Set();

const flat = await fetchXml("/sitemap.xml");
if (!flat.ok) {
  add("error", "fetch", "/sitemap.xml", `Responded ${flat.status}`);
} else {
  const urls = locs(flat.body);
  flatPaths = new Set(urls.map(pathOf));
  const badOrigin = checkOrigins("/sitemap.xml", urls);
  if (urls.length !== flatPaths.size)
    add("warning", "duplicates", "/sitemap.xml", `${urls.length - flatPaths.size} duplicate URL(s)`);
  files.push({
    path: "/sitemap.xml",
    kind: "flat",
    urls: urls.length,
    unique: flatPaths.size,
    missing: [],
    extra: [],
    badOrigin,
  });
}

/* ----------------------------- sitemap index ------------------------------ */

const index = await fetchXml("/sitemap-index.xml");
let children = [];
if (!index.ok) {
  add("error", "fetch", "/sitemap-index.xml", `Responded ${index.status}`);
} else {
  const childUrls = locs(index.body, "sitemap");
  children = childUrls.map(pathOf);
  const badOrigin = checkOrigins("/sitemap-index.xml", childUrls);
  files.push({
    path: "/sitemap-index.xml",
    kind: "index",
    urls: childUrls.length,
    unique: new Set(children).size,
    missing: [],
    extra: [],
    badOrigin,
  });
  if (!children.length) add("error", "empty", "/sitemap-index.xml", "Index lists no sitemaps");
}

/* --------------------------- child sitemap files -------------------------- */

const covered = new Set();

for (const child of children) {
  const res = await fetchXml(child);
  if (!res.ok) {
    add("error", "fetch", child, `Listed in the index but responded ${res.status}`);
    continue;
  }
  if (!/xml/i.test(res.type))
    add("warning", "content-type", child, `Served as "${res.type}", expected application/xml`);

  const urls = locs(res.body);
  const paths = urls.map(pathOf);
  const badOrigin = checkOrigins(child, urls);
  const isImage = child.includes("image-sitemap");
  const extra = [...new Set(paths)].filter((p) => !flatPaths.has(p));

  if (!isImage) paths.forEach((p) => covered.add(p));
  if (extra.length)
    add(
      "error",
      "coverage",
      child,
      `${extra.length} URL(s) absent from the flat sitemap: ${extra.slice(0, 5).join(", ")}`,
    );
  if (!urls.length) add("warning", "empty", child, "Sitemap contains no URLs");

  files.push({
    path: child,
    kind: isImage ? "image" : "section",
    urls: urls.length,
    unique: new Set(paths).size,
    missing: [],
    extra,
    badOrigin,
  });
}

/* ------------------------ index vs flat coverage -------------------------- */

const missingFromIndex = [...flatPaths].filter((p) => !covered.has(p));
if (missingFromIndex.length)
  add(
    "error",
    "coverage",
    "/sitemap-index.xml",
    `${missingFromIndex.length} flat-sitemap URL(s) not covered by any section: ${missingFromIndex
      .slice(0, 5)
      .join(", ")}`,
  );

const idx = files.find((f) => f.kind === "index");
if (idx) idx.missing = missingFromIndex;

const coveragePct = flatPaths.size
  ? Math.round((covered.size / flatPaths.size) * 1000) / 10
  : 0;

/* -------------------------------- report ---------------------------------- */

const errors = findings.filter((f) => f.severity === "error");
const warnings = findings.filter((f) => f.severity === "warning");

mkdirSync("reports/sitemap", { recursive: true });
const report = {
  base: BASE,
  origin: ORIGIN,
  flatUrls: flatPaths.size,
  coveredBySections: covered.size,
  coveragePct,
  errors: errors.length,
  warnings: warnings.length,
  files,
  findings,
};
writeFileSync("reports/sitemap/sitemap-report.json", JSON.stringify(report, null, 2));

const rows = files
  .map(
    (f) =>
      `<tr><td><code>${f.path}</code></td><td>${f.kind}</td><td>${f.urls}</td><td>${f.unique}</td><td>${
        f.extra.length || f.missing.length
          ? `<span class="error">${f.extra.length} extra / ${f.missing.length} missing</span>`
          : "<span class=ok>full</span>"
      }</td><td>${f.badOrigin ? `<span class="error">${f.badOrigin} off-origin</span>` : "<span class=ok>ok</span>"}</td></tr>`,
  )
  .join("\n");

writeFileSync(
  "reports/sitemap/sitemap-report.html",
  `<!doctype html><meta charset="utf-8"><title>Sitemap audit</title>
<style>body{font:14px/1.6 system-ui;margin:3rem auto;max-width:64rem;color:#111}
td,th{border-bottom:1px solid #ddd;padding:.5rem;text-align:left;vertical-align:top}
code{font:13px ui-monospace,monospace}.error{color:#b00}.warning{color:#a60}.ok{color:#070}
table{border-collapse:collapse;width:100%;margin-bottom:2rem}</style>
<h1>Sitemap audit</h1>
<p>Crawled <strong>${BASE}</strong> — ${flatPaths.size} URLs in the flat sitemap,
${covered.size} covered by section sitemaps (<strong>${coveragePct}%</strong>).
<strong class="${errors.length ? "error" : "ok"}">${errors.length}</strong> errors,
<strong>${warnings.length}</strong> warnings.</p>
<h2>Files</h2>
<table><tr><th>File</th><th>Kind</th><th>URLs</th><th>Unique</th><th>Coverage</th><th>Origin</th></tr>
${rows}</table>
<h2>Findings</h2>
${
  findings.length
    ? `<table><tr><th>Severity</th><th>Check</th><th>Where</th><th>Detail</th></tr>
${findings
  .map(
    (f) =>
      `<tr><td class="${f.severity}">${f.severity}</td><td>${f.check}</td><td><code>${f.where}</code></td><td>${f.message}</td></tr>`,
  )
  .join("\n")}</table>`
    : "<p class=ok>No issues found.</p>"
}`,
);

const pad = (s, n) => String(s).padEnd(n);
console.log(`\nSitemap audit — ${BASE}`);
console.log(
  `${pad("File", 32)}${pad("Kind", 10)}${pad("URLs", 7)}${pad("Coverage", 12)}Origin`,
);
for (const f of files)
  console.log(
    `${pad(f.path, 32)}${pad(f.kind, 10)}${pad(f.urls, 7)}${pad(
      f.extra.length || f.missing.length ? `${f.extra.length}+ / ${f.missing.length}-` : "full",
      12,
    )}${f.badOrigin ? `${f.badOrigin} off-origin` : "ok"}`,
  );
console.log(
  `\nFlat sitemap: ${flatPaths.size} URLs · sections cover ${covered.size} (${coveragePct}%)`,
);
for (const f of findings) console.log(`  ${f.severity === "error" ? "✗" : "!"} ${f.where} [${f.check}] ${f.message}`);
console.log("\nReport written to reports/sitemap/sitemap-report.json and .html");

if (errors.length && args.ci) process.exit(1);

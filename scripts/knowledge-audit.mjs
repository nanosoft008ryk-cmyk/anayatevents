#!/usr/bin/env node
/**
 * Build-time knowledge + content-quality audit (AEO layer).
 *
 * The SEO audit (scripts/seo-audit.mjs) checks that pages are technically
 * indexable. This one checks that the site is *understandable*: that every
 * entity is connected, that every page answers who / what / where / why / how,
 * that definitions come before promotion, that terminology is consistent, and
 * that nothing reads like filler.
 *
 *   npm run aeo:audit                      # audits http://localhost:8080
 *   npm run aeo:audit -- https://host
 *   npm run aeo:ci                         # fails on structural errors
 *
 * Flags / env:
 *   --max-errors=N   (AEO_MAX_ERRORS)      default Infinity for aeo:audit
 *   --max-warnings=N (AEO_MAX_WARNINGS)
 *   --report-dir=PATH (AEO_REPORT_DIR)     default reports/aeo
 *   --no-report
 *
 * Nothing is ever rewritten. The audit only reports.
 */

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : fallback;
};

const ORIGIN = (
  args.find((a) => /^https?:\/\//.test(a)) ||
  process.env.AEO_AUDIT_ORIGIN ||
  "http://localhost:8080"
).replace(/\/$/, "");

const MAX_ERRORS = Number(flag("max-errors", process.env.AEO_MAX_ERRORS ?? Infinity));
const MAX_WARNINGS = Number(flag("max-warnings", process.env.AEO_MAX_WARNINGS ?? Infinity));
const REPORT_DIR = flag("report-dir", process.env.AEO_REPORT_DIR ?? "reports/aeo");
const WRITE_REPORT = !args.includes("--no-report");

const findings = [];
const add = (severity, page, check, message) =>
  findings.push({ severity, page, check, message });
const fail = (page, check, message) => add("error", page, check, message);
const warn = (page, check, message) => add("warning", page, check, message);
const note = (page, check, message) => add("note", page, check, message);

const esc = (v) =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function get(url) {
  const res = await fetch(url, { headers: { "user-agent": "anayat-aeo-audit" } });
  return { status: res.status, body: await res.text() };
}

/* ---------------------- 1. knowledge graph validation -------------------- */

const kg = await get(`${ORIGIN}/knowledge-graph.json`);
if (kg.status !== 200) {
  console.error(
    `knowledge-graph.json returned ${kg.status} — is the server running at ${ORIGIN}?`,
  );
  process.exit(1);
}

const graph = JSON.parse(kg.body);
for (const issue of graph.validation ?? [])
  add(issue.severity, "/knowledge-graph.json", issue.check, `${issue.entity}: ${issue.message}`);

const entities = graph.entities ?? [];
const byId = new Map(entities.map((e) => [e.id, e]));

// Every entity with a page must be reachable from somewhere else in the graph.
const referenced = new Set();
for (const e of entities)
  for (const id of [e.parent, ...e.children, ...e.siblings, ...e.supporting, ...e.related])
    if (id) referenced.add(id);

for (const e of entities) {
  if (e.id === graph.business?.id) continue;
  if (!referenced.has(e.id))
    fail("/knowledge-graph.json", "unreferenced-entity", `${e.name} (${e.id}) is never referenced`);
  for (const id of [...e.children, ...e.siblings, ...e.supporting, ...e.related])
    if (!byId.has(id))
      fail("/knowledge-graph.json", "dangling-relation", `${e.id} points at unknown ${id}`);
}

// Topical authority: the connective tissue this site depends on.
const kindsOf = (ids) => new Set(ids.map((id) => byId.get(id)?.kind).filter(Boolean));
for (const e of entities) {
  const linked = kindsOf([...e.children, ...e.siblings, ...e.supporting, ...e.related]);
  if (e.kind === "service" && !linked.has("area"))
    note(e.path ?? "/", "authority", `${e.name} does not reach any service area`);
  if (e.kind === "area" && !linked.has("collection") && !linked.has("project"))
    note(e.path ?? "/", "authority", `${e.name} does not reach portfolio work`);
  if (e.kind === "collection" && !linked.has("service"))
    note(e.path ?? "/", "authority", `${e.name} does not reach a service`);
  if (e.kind === "article" && !linked.has("service") && !linked.has("collection"))
    note(e.path ?? "/", "authority", `${e.name} does not support a service or collection`);
}

/* ----------------------------- 2. page crawl ----------------------------- */

const sitemap = await get(`${ORIGIN}/sitemap.xml`);
const paths = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].replace(/^https?:\/\/[^/]+/, ""),
);

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const MARKETING = [
  "world-class",
  "best in class",
  "one-stop shop",
  "unparalleled",
  "cutting-edge",
  "state of the art",
  "leading provider",
  "we pride ourselves",
  "second to none",
  "take your event to the next level",
  "in today's fast-paced world",
  "elevate your",
  "unlock the",
  "delve into",
];

// Terminology that must be spelled one way across the whole site.
const CANONICAL_TERMS = [
  { canonical: "walima", variants: ["waleema", "valima"] },
  { canonical: "mehndi", variants: ["mehendi", "mehandi"] },
  { canonical: "barat", variants: ["baraat"] },
  { canonical: "nikah", variants: ["nikkah"] },
  { canonical: "decor", variants: ["décor"] },
];

const INTENTS = [
  { name: "informational", re: /\b(what is|how|why|guide|understand|means)\b/i },
  { name: "commercial", re: /\b(service|package|planning|catering|design|team)\b/i },
  { name: "transactional", re: /\b(enquir|contact|book|proposal|whatsapp|call)\b/i },
  { name: "local", re: /\b(lahore|dha|bahria|gulberg|johar town|area|near)\b/i },
  { name: "comparative", re: /\b(rather than|instead of|compared|difference|versus|unlike)\b/i },
  { name: "educational", re: /\b(process|timeline|step|how we|what happens|expect)\b/i },
];

const paragraphIndex = new Map();
const pages = [];

for (const p of paths) {
  const { status, body } = await get(`${ORIGIN}${p}`);
  if (status !== 200) continue;
  const main = (body.match(/<main[\s\S]*?<\/main>/i) || [body])[0];
  const content = strip(main);
  const lower = content.toLowerCase();
  pages.push({ path: p, words: content.split(" ").length });

  /* Thin content. */
  if (content.split(" ").length < 300)
    warn(p, "thin-content", `only ${content.split(" ").length} words in <main>`);

  /* Heading hierarchy — AI systems chunk by heading. */
  const headings = [...main.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({
    level: Number(m[1]),
    text: strip(m[2]),
  }));
  if (headings.length < 3) warn(p, "semantic-chunks", "fewer than three headings in <main>");
  let previous = 0;
  for (const h of headings) {
    if (previous && h.level > previous + 1)
      warn(p, "heading-hierarchy", `h${previous} jumps to h${h.level} at "${h.text.slice(0, 48)}"`);
    if (h.text.trim().length === 0) warn(p, "heading-hierarchy", "empty heading");
    previous = h.level;
  }
  const seenHeading = new Set();
  for (const h of headings) {
    const id = h.text.toLowerCase().trim();
    if (id && seenHeading.has(id)) note(p, "duplicate-heading", `"${h.text.slice(0, 60)}"`);
    seenHeading.add(id);
  }

  /* Summarisability: who / what / where / why / how. */
  const opening = content.slice(0, 900).toLowerCase();
  const answers = {
    who: /(anayat|we|the house|our team)/.test(opening),
    what: /(planning|catering|decor|design|event|wedding|production)/.test(opening),
    where: /(lahore|dha|bahria|gulberg|punjab|pakistan)/.test(opening),
    why: /(because|so that|which means|the reason|why)/.test(opening),
    how: /(in-house|process|we build|we run|team|from one)/.test(opening),
  };
  const missing = Object.entries(answers)
    .filter(([, ok]) => !ok)
    .map(([k]) => k);
  if (missing.length > 2)
    warn(p, "summarisability", `opening does not answer: ${missing.join(", ")}`);

  /* Definition-first on service and area pages. */
  if (/^\/(services|areas)\/[^/]+$/.test(p)) {
    const definitional = /\b(is|are|means|refers to|covers)\b/.test(content.slice(0, 600));
    if (!definitional)
      warn(p, "definition-first", "no plain definition in the first ~600 characters");
  }

  /* Search-intent coverage on money pages. */
  if (/^\/(services|areas|portfolio)\/[^/]+$/.test(p)) {
    const uncovered = INTENTS.filter((i) => !i.re.test(content)).map((i) => i.name);
    if (uncovered.length)
      note(p, "intent-coverage", `no passage reads as: ${uncovered.join(", ")}`);
  }

  /* Marketing filler and generic AI wording. */
  for (const phrase of MARKETING)
    if (lower.includes(phrase)) warn(p, "marketing-filler", `contains "${phrase}"`);

  /* Terminology consistency. */
  for (const term of CANONICAL_TERMS)
    for (const variant of term.variants)
      if (new RegExp(`\\b${variant}\\b`, "i").test(content))
        warn(p, "terminology", `uses "${variant}" — the site standard is "${term.canonical}"`);

  /* Images: alt text and captions where a figure is expected. */
  const imgs = [...main.matchAll(/<img\b[^>]*>/g)];
  for (const [tag] of imgs) {
    if (!/\balt=/.test(tag)) fail(p, "alt-text", "an <img> in <main> has no alt attribute");
    else {
      const alt = (tag.match(/alt="([^"]*)"/) || [])[1] ?? "";
      if (alt.trim() && alt.trim().split(/\s+/).length < 3)
        note(p, "alt-quality", `terse alt text: "${alt}"`);
    }
  }
  const figures = [...main.matchAll(/<figure[\s\S]*?<\/figure>/g)];
  for (const [fig] of figures)
    if (!/<figcaption/.test(fig)) warn(p, "caption", "<figure> without a <figcaption>");

  /* Repeated paragraphs across the site. */
  for (const [, raw] of main.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) {
    const para = strip(raw);
    if (para.split(" ").length < 18) continue;
    const id = para.toLowerCase().replace(/[^a-z0-9 ]/g, "");
    const owner = paragraphIndex.get(id);
    if (owner && owner !== p)
      warn(p, "repeated-paragraph", `paragraph also appears on ${owner}`);
    else paragraphIndex.set(id, p);
  }

  /* Structured data sanity — malformed JSON-LD is rejected outright. */
  const blocks = [...body.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
  )];
  const graphTypes = [];
  for (const [, json] of blocks) {
    try {
      const data = JSON.parse(json);
      for (const node of Array.isArray(data) ? data : [data]) graphTypes.push(node["@type"]);
    } catch {
      fail(p, "json-ld", "malformed JSON-LD block");
    }
  }
  const dupTypes = graphTypes.filter((t, i) => typeof t === "string" && graphTypes.indexOf(t) !== i);
  for (const t of [...new Set(dupTypes)])
    warn(p, "schema-duplicate", `${t} declared more than once on the page`);
  if (blocks.length === 0) warn(p, "schema-missing", "no structured data on the page");

  /* Every crawled page should exist as an entity in the graph. */
  const known = entities.some((e) => e.path === p);
  if (!known && !/^\/(privacy|terms|cookies|vault|about\/)/.test(p))
    note(p, "graph-gap", "page has no entity in the knowledge graph");
}

/* -------------------------------- report --------------------------------- */

const count = (severity) => findings.filter((f) => f.severity === severity).length;
const summary = {
  origin: ORIGIN,
  generatedAt: new Date().toISOString(),
  pagesCrawled: pages.length,
  entities: entities.length,
  entityCounts: graph.counts ?? {},
  errors: count("error"),
  warnings: count("warning"),
  notes: count("note"),
  thresholds: { maxErrors: MAX_ERRORS, maxWarnings: MAX_WARNINGS },
};

const byCheck = {};
for (const f of findings) {
  byCheck[f.check] ??= { error: 0, warning: 0, note: 0 };
  byCheck[f.check][f.severity] += 1;
}

const passed = summary.errors <= MAX_ERRORS && summary.warnings <= MAX_WARNINGS;

if (WRITE_REPORT) {
  const dir = path.resolve(process.cwd(), REPORT_DIR);
  await mkdir(dir, { recursive: true });
  await writeFile(
    path.join(dir, "aeo-report.json"),
    JSON.stringify({ summary, passed, byCheck, findings }, null, 2),
  );

  const rows = findings
    .map(
      (f) => `<tr class="${f.severity}"><td>${
        f.severity === "error" ? "✗" : f.severity === "warning" ? "!" : "·"
      }</td><td><a href="${esc(ORIGIN + f.page)}">${esc(f.page)}</a></td><td>${esc(
        f.check,
      )}</td><td>${esc(f.message)}</td></tr>`,
    )
    .join("\n");

  const checkRows = Object.entries(byCheck)
    .sort((a, b) => b[1].error - a[1].error || b[1].warning - a[1].warning)
    .map(
      ([check, c]) =>
        `<tr><td>${esc(check)}</td><td>${c.error}</td><td>${c.warning}</td><td>${c.note}</td></tr>`,
    )
    .join("\n");

  const kindRows = Object.entries(summary.entityCounts)
    .map(([kind, n]) => `<tr><td>${esc(kind)}</td><td>${n}</td></tr>`)
    .join("\n");

  await writeFile(
    path.join(dir, "aeo-report.html"),
    `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>Knowledge &amp; AEO audit — Anayat Events</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; padding:48px; background:#0b0b0b; color:#efe9df;
         font:15px/1.6 ui-sans-serif,system-ui,-apple-system,sans-serif; }
  h1 { font-weight:300; font-size:34px; margin:0 0 6px; }
  h2 { font-weight:300; font-size:22px; margin:32px 0 10px; }
  .sub { color:#9a9287; font-size:13px; letter-spacing:.16em; text-transform:uppercase; }
  .verdict { display:inline-block; margin:28px 0; padding:10px 20px; border-radius:25px;
             font-size:13px; letter-spacing:.18em; text-transform:uppercase; }
  .pass { background:#12331d; color:#7fd39b; } .failv { background:#3a1414; color:#ef8f8f; }
  .cards { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:20px; }
  .card { border:1px solid #26241f; border-radius:16px; padding:18px 24px; min-width:150px; }
  .card b { display:block; font-size:30px; font-weight:300; color:#d4af6a; }
  table { width:100%; border-collapse:collapse; margin-bottom:30px; font-size:13.5px; }
  th,td { text-align:left; padding:10px 12px; border-bottom:1px solid #1e1c18; vertical-align:top; }
  th { color:#9a9287; font-size:11px; letter-spacing:.18em; text-transform:uppercase; }
  tr.error td:first-child { color:#ef8f8f; } tr.warning td:first-child { color:#e2c07a; }
  tr.note td:first-child { color:#8fb6ef; }
  a { color:#d4af6a; }
</style></head><body>
<p class="sub">Anayat Events &amp; Catering</p>
<h1>Knowledge &amp; answer-engine audit</h1>
<p class="sub">${esc(summary.origin)} · ${esc(summary.generatedAt)}</p>
<div class="verdict ${passed ? "pass" : "failv"}">${passed ? "Passed thresholds" : "Failed thresholds"}</div>
<div class="cards">
  <div class="card"><b>${summary.pagesCrawled}</b>pages read</div>
  <div class="card"><b>${summary.entities}</b>entities</div>
  <div class="card"><b>${summary.errors}</b>errors</div>
  <div class="card"><b>${summary.warnings}</b>warnings</div>
  <div class="card"><b>${summary.notes}</b>improvement notes</div>
</div>
<h2>Entities by kind</h2>
<table><thead><tr><th>Kind</th><th>Count</th></tr></thead><tbody>${kindRows}</tbody></table>
<h2>By check</h2>
<table><thead><tr><th>Check</th><th>Errors</th><th>Warnings</th><th>Notes</th></tr></thead>
<tbody>${checkRows || '<tr><td colspan="4">Nothing flagged.</td></tr>'}</tbody></table>
<h2>Findings</h2>
<table><thead><tr><th></th><th>Page</th><th>Check</th><th>Detail</th></tr></thead>
<tbody>${rows || '<tr><td colspan="4">Every check passed.</td></tr>'}</tbody></table>
</body></html>`,
  );
  console.log(`\nReport written to ${REPORT_DIR}/aeo-report.json and ${REPORT_DIR}/aeo-report.html`);
}

console.log(
  `\nAEO audit — ${summary.pagesCrawled} pages, ${summary.entities} entities, ` +
    `${summary.errors} errors, ${summary.warnings} warnings, ${summary.notes} notes`,
);
for (const f of findings.filter((x) => x.severity === "error").slice(0, 25))
  console.log(`  ✗ ${f.page} [${f.check}] ${f.message}`);

process.exit(passed ? 0 : 1);

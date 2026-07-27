/* ---------------------------------------------------------------------------
 * Automatic entity graph.
 *
 * Every content record in /src/content becomes a node. Edges are *derived*,
 * never hand-listed per page:
 *
 *   - explicit relations already present in the content model (a service's
 *     `related`, an area's `services`/`projects`/`articles`, a collection's
 *     `relatedServices`) are read as strong edges,
 *   - everything else is inferred from shared vocabulary — family, category,
 *     event type, area name, service name — so a new record joins the graph
 *     the moment it is added, with no page edits anywhere.
 *
 * Route components ask the graph a single question ("what relates to me?")
 * and render the answer. That is what keeps the site free of orphan pages
 * and keeps internal linking editorial rather than templated.
 * ------------------------------------------------------------------------- */

import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { portfolioCategories, portfolioProjects } from "@/content/portfolio";
import { articles } from "@/content/journal";
import { faqTopics } from "@/content/faqs";

export type NodeKind = "service" | "area" | "collection" | "project" | "article" | "faq";

export interface GraphNode {
  kind: NodeKind;
  slug: string;
  path: string;
  name: string;
  blurb: string;
  /** Explicit relations declared in content, as `kind:slug` keys. */
  links: string[];
  /** Derived vocabulary used for inferred edges. */
  tokens: string[];
}

export interface RelatedItem {
  name: string;
  path: string;
  blurb: string;
  kind: NodeKind;
}

export interface RelatedGroup {
  label: string;
  kind: NodeKind;
  items: RelatedItem[];
}

const STOP = new Set([
  "and",
  "the",
  "for",
  "with",
  "our",
  "your",
  "a",
  "an",
  "of",
  "in",
  "to",
  "at",
  "on",
  "by",
  "we",
  "events",
  "event",
  "lahore",
  "anayat",
]);

function tokenize(...parts: (string | undefined)[]): string[] {
  const out = new Set<string>();
  for (const part of parts) {
    if (!part) continue;
    for (const raw of part.toLowerCase().split(/[^a-z0-9]+/)) {
      const word = raw.replace(/s$/, "");
      if (word.length < 3 || STOP.has(raw) || STOP.has(word)) continue;
      out.add(word);
    }
  }
  return [...out];
}

const key = (kind: NodeKind, slug: string) => `${kind}:${slug}`;

/** Every node in the site's knowledge graph, built once per module load. */
export const nodes: GraphNode[] = [
  ...services.map<GraphNode>((s) => ({
    kind: "service",
    slug: s.slug,
    path: `/services/${s.slug}`,
    name: s.name,
    blurb: s.lede,
    links: s.related.map((r) => key("service", r)),
    tokens: tokenize(s.name, s.family, s.eyebrow, s.slug),
  })),
  ...locations.map<GraphNode>((l) => ({
    kind: "area",
    slug: l.slug,
    path: `/areas/${l.slug}`,
    name: l.name,
    blurb: l.lede,
    links: [
      ...l.services.map((s) => key("service", s)),
      ...l.categories.map((c) => key("collection", c)),
      ...l.projects.map((p) => key("project", p)),
      ...l.articles.map((a) => key("article", a)),
      ...l.nearby.map((n) => key("area", n)),
    ],
    tokens: tokenize(l.name, l.shortName, ...l.services, ...l.categories),
  })),
  ...portfolioCategories.map<GraphNode>((c) => ({
    kind: "collection",
    slug: c.slug,
    path: `/portfolio/${c.slug}`,
    name: c.name,
    blurb: c.lede,
    links: [
      ...c.relatedServices.map((s) => key("service", s)),
      ...c.relatedLocations.map((l) => key("area", l)),
      ...c.projects.map((p) => key("project", p)),
    ],
    tokens: tokenize(c.name, c.kicker, c.slug),
  })),
  ...portfolioProjects.map<GraphNode>((p) => ({
    kind: "project",
    slug: p.slug,
    path: `/portfolio/project/${p.slug}`,
    name: p.title,
    blurb: p.subtitle,
    links: [key("collection", p.category)],
    tokens: tokenize(p.title, p.eventType, p.area, p.category, p.season),
  })),
  ...articles.map<GraphNode>((a) => ({
    kind: "article",
    slug: a.slug,
    path: `/journal/${a.slug}`,
    name: a.title,
    blurb: a.excerpt,
    links: a.related.map((r) => key("article", r)),
    tokens: tokenize(a.title, a.category, a.excerpt.slice(0, 160)),
  })),
  ...faqTopics.map<GraphNode>((t) => ({
    kind: "faq",
    slug: t.slug,
    path: `/faq/${t.slug}`,
    name: t.name,
    blurb: t.lede,
    links: [],
    tokens: tokenize(t.name, t.lede, t.slug),
  })),
];

const byKey = new Map(nodes.map((n) => [key(n.kind, n.slug), n]));

export function getNode(kind: NodeKind, slug: string): GraphNode | undefined {
  return byKey.get(key(kind, slug));
}

/** Explicit edges are bidirectional — being linked to counts as being related. */
const inbound = new Map<string, Set<string>>();
for (const node of nodes) {
  for (const target of node.links) {
    if (!inbound.has(target)) inbound.set(target, new Set());
    inbound.get(target)!.add(key(node.kind, node.slug));
  }
}

function score(from: GraphNode, to: GraphNode): number {
  const toKey = key(to.kind, to.slug);
  const fromKey = key(from.kind, from.slug);
  let value = 0;
  if (from.links.includes(toKey)) value += 6;
  if (inbound.get(fromKey)?.has(toKey)) value += 4;
  const shared = to.tokens.filter((t) => from.tokens.includes(t)).length;
  value += shared * 2;
  // A little cross-kind encouragement so a service does not only ever surface
  // other services.
  if (value > 0 && to.kind !== from.kind) value += 1;
  return value;
}

const LABELS: Record<NodeKind, string> = {
  service: "Related services",
  area: "Areas we serve nearby",
  collection: "From the portfolio",
  project: "Case studies",
  article: "From the journal",
  faq: "Questions people ask",
};

export interface RelatedOptions {
  /** Which kinds to include, in the order the page should present them. */
  kinds?: NodeKind[];
  /** Maximum items inside each group. */
  perKind?: number;
}

/**
 * The related constellation for one page. Ordered by derived relevance, with
 * a deterministic alphabetical tiebreak so output is stable between builds.
 */
export function relatedFor(
  kind: NodeKind,
  slug: string,
  options: RelatedOptions = {},
): RelatedGroup[] {
  const from = getNode(kind, slug);
  if (!from) return [];

  const kinds = options.kinds ?? (["service", "collection", "article", "area", "faq"] as NodeKind[]);
  const perKind = options.perKind ?? 3;

  return kinds
    .map((wanted) => {
      const items = nodes
        .filter((n) => n.kind === wanted && !(n.kind === from.kind && n.slug === from.slug))
        .map((n) => ({ node: n, value: score(from, n) }))
        .filter((entry) => entry.value > 0)
        .sort((a, b) => b.value - a.value || a.node.name.localeCompare(b.node.name))
        .slice(0, perKind)
        .map<RelatedItem>((entry) => ({
          name: entry.node.name,
          path: entry.node.path,
          blurb: entry.node.blurb,
          kind: entry.node.kind,
        }));

      return { label: LABELS[wanted], kind: wanted, items };
    })
    .filter((group) => group.items.length > 0);
}

/**
 * Nearby service areas. Declared neighbours first, then the closest matches
 * the graph can infer, so a newly added area is never left without company.
 */
export function nearbyAreas(slug: string, limit = 5): RelatedItem[] {
  const group = relatedFor("area", slug, { kinds: ["area"], perKind: limit })[0];
  return group?.items ?? [];
}

/* ------------------------------ FAQ engine ------------------------------- */

/**
 * Global question ledger. The first page to claim a question keeps it; every
 * later page silently drops the duplicate. This guarantees no two pages emit
 * the same FAQPage entry — the single most common cause of Google ignoring
 * FAQ structured data across a large site.
 */
const claimed = new Map<string, string>();

const normalizeQuestion = (q: string) => q.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function uniqueFaqs<T extends { q: string; a: string }>(pageKey: string, items: T[]): T[] {
  return items.filter((item) => {
    const id = normalizeQuestion(item.q);
    const owner = claimed.get(id);
    if (owner && owner !== pageKey) return false;
    claimed.set(id, pageKey);
    return true;
  });
}

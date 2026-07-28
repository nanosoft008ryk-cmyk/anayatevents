/* ---------------------------------------------------------------------------
 * The knowledge graph.
 *
 * `entity-graph.ts` decides what a page should link to. This module answers a
 * different question: what *is* each thing on this site, and how does it stand
 * in relation to everything else?
 *
 * Every content record becomes an entity with a permanent identity (see
 * entity-ids.ts) and five derived relationship sets:
 *
 *   parent      — the hub or collection this entity belongs beneath
 *   children    — entities that sit beneath it
 *   siblings    — entities sharing its parent
 *   supporting  — journal writing, FAQs and reviews that evidence it
 *   related     — everything else the derived graph associates with it
 *
 * Nothing here is hand-mapped. Relationships come from the same metadata the
 * pages already render, so adding a service, an area, a project or an article
 * joins the graph on the next build with no edits anywhere.
 * ------------------------------------------------------------------------- */

import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { portfolioCategories, portfolioProjects } from "@/content/portfolio";
import { articles, journalCategories } from "@/content/journal";
import { faqTopics } from "@/content/faqs";
import { teamPage } from "@/content/about";
import { site } from "@/content/site";
import { entityId, BUSINESS_ID, type EntityKind } from "@/lib/entity-ids";
import { relatedForPath, type NodeKind } from "@/lib/entity-graph";

export interface Entity {
  /** Permanent internal identity. Never rendered to a visitor. */
  id: string;
  kind: EntityKind;
  slug: string;
  name: string;
  /** Canonical path, or null for entities without a page of their own. */
  path: string | null;
  summary: string;
  parent: string | null;
  children: string[];
  siblings: string[];
  supporting: string[];
  related: string[];
}

/* ------------------------------- hub nodes ------------------------------- */

const HUBS: { slug: string; name: string; path: string; summary: string }[] = [
  {
    slug: "services",
    name: "Services",
    path: "/services",
    summary: "Every discipline the house runs in-house, from planning to catering.",
  },
  {
    slug: "areas",
    name: "Service areas",
    path: "/areas",
    summary: "Districts of Lahore and beyond reached from one base in Green Acres.",
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    path: "/portfolio",
    summary: "Completed work, grouped by the kind of evening it was.",
  },
  {
    slug: "journal",
    name: "Journal",
    path: "/journal",
    summary: "Working knowledge on planning, design, catering and venues.",
  },
  {
    slug: "faq",
    name: "FAQ",
    path: "/faq",
    summary: "Direct answers to what clients ask before commissioning.",
  },
  {
    slug: "about",
    name: "About",
    path: "/about",
    summary: "The house, its people, its process and its promises.",
  },
  {
    slug: "reviews",
    name: "Reviews",
    path: "/reviews",
    summary: "Verified Google Business Profile reviews, read live.",
  },
  {
    slug: "contact",
    name: "Contact",
    path: "/contact",
    summary: "How to reach the planners and begin an enquiry.",
  },
];

const hubId = (slug: string) => entityId("page", slug);

/* ------------------------------ construction ----------------------------- */

const KIND_MAP: Partial<Record<NodeKind, EntityKind>> = {
  service: "service",
  area: "area",
  collection: "collection",
  project: "project",
  article: "article",
  faq: "faq",
};

/** Derived associations, translated from the linking graph into identities. */
function relatedIds(path: string): string[] {
  return relatedForPath(path, { perKind: 4 })
    .flatMap((group) => group.items)
    .map((item) => {
      const kind = KIND_MAP[item.kind];
      const slug = item.path.split("/").pop()!;
      return kind ? entityId(kind, slug) : null;
    })
    .filter((v): v is string => Boolean(v));
}

const supportingArticles = (tokens: string[]): string[] =>
  articles
    .filter((a) => {
      const haystack = `${a.title} ${a.excerpt} ${a.category}`.toLowerCase();
      return tokens.some((t) => t.length > 3 && haystack.includes(t));
    })
    .slice(0, 6)
    .map((a) => entityId("article", a.slug));

const supportingFaqs = (tokens: string[]): string[] =>
  faqTopics
    .filter((t) => {
      const haystack = `${t.name} ${t.lede}`.toLowerCase();
      return tokens.some((token) => token.length > 3 && haystack.includes(token));
    })
    .map((t) => entityId("faq", t.slug));

/** Distinct event types, promoted from portfolio metadata to real entities. */
const eventTypes = [...new Set(portfolioProjects.map((p) => p.eventType))].sort();

function buildEntities(): Entity[] {
  const list: Entity[] = [];

  /* Business — the root every other entity reports to. */
  list.push({
    id: BUSINESS_ID,
    kind: "business",
    slug: "anayat-events-and-catering",
    name: site.legalName,
    path: "/",
    summary: site.description,
    parent: null,
    children: HUBS.map((h) => hubId(h.slug)),
    siblings: [],
    supporting: [],
    related: [],
  });

  /* Hubs. */
  for (const hub of HUBS) {
    const children =
      hub.slug === "services"
        ? services.map((s) => entityId("service", s.slug))
        : hub.slug === "areas"
          ? locations.map((l) => entityId("area", l.slug))
          : hub.slug === "portfolio"
            ? portfolioCategories.map((c) => entityId("collection", c.slug))
            : hub.slug === "journal"
              ? journalCategories.map((c) => entityId("journal-category", c.slug))
              : hub.slug === "faq"
                ? faqTopics.map((t) => entityId("faq", t.slug))
                : hub.slug === "about"
                  ? teamPage.members.map((m) => entityId("person", slugify(m.name)))
                  : [];

    list.push({
      id: hubId(hub.slug),
      kind: "page",
      slug: hub.slug,
      name: hub.name,
      path: hub.path,
      summary: hub.summary,
      parent: BUSINESS_ID,
      children,
      siblings: HUBS.filter((h) => h.slug !== hub.slug).map((h) => hubId(h.slug)),
      supporting: [],
      related: relatedIds(hub.path),
    });
  }

  /* Services. */
  for (const s of services) {
    const tokens = s.name.toLowerCase().split(/\s+/);
    list.push({
      id: entityId("service", s.slug),
      kind: "service",
      slug: s.slug,
      name: s.name,
      path: `/services/${s.slug}`,
      summary: s.lede,
      parent: hubId("services"),
      children: [],
      siblings: services
        .filter((o) => o.slug !== s.slug && o.family === s.family)
        .map((o) => entityId("service", o.slug)),
      supporting: [...supportingArticles(tokens), ...supportingFaqs(tokens)],
      related: relatedIds(`/services/${s.slug}`),
    });
  }

  /* Areas. */
  for (const l of locations) {
    const tokens = [l.name.toLowerCase(), l.shortName.toLowerCase()];
    list.push({
      id: entityId("area", l.slug),
      kind: "area",
      slug: l.slug,
      name: l.name,
      path: `/areas/${l.slug}`,
      summary: l.lede,
      parent: hubId("areas"),
      children: [],
      siblings: l.nearby.map((n) => entityId("area", n)),
      supporting: [...supportingArticles(tokens), ...supportingFaqs(tokens)],
      related: [
        ...l.services.map((s) => entityId("service", s)),
        ...l.categories.map((c) => entityId("collection", c)),
        ...relatedIds(`/areas/${l.slug}`),
      ],
    });
  }

  /* Portfolio collections and their projects. */
  for (const c of portfolioCategories) {
    list.push({
      id: entityId("collection", c.slug),
      kind: "collection",
      slug: c.slug,
      name: c.name,
      path: `/portfolio/${c.slug}`,
      summary: c.lede,
      parent: hubId("portfolio"),
      children: c.projects.map((p) => entityId("project", p)),
      siblings: portfolioCategories
        .filter((o) => o.slug !== c.slug)
        .map((o) => entityId("collection", o.slug)),
      supporting: supportingArticles(c.name.toLowerCase().split(/\s+/)),
      related: [
        ...c.relatedServices.map((s) => entityId("service", s)),
        ...c.relatedLocations.map((l) => entityId("area", l)),
      ],
    });
  }

  for (const p of portfolioProjects) {
    list.push({
      id: entityId("project", p.slug),
      kind: "project",
      slug: p.slug,
      name: p.title,
      path: `/portfolio/project/${p.slug}`,
      summary: p.subtitle,
      parent: entityId("collection", p.category),
      children: [],
      siblings: portfolioProjects
        .filter((o) => o.slug !== p.slug && o.category === p.category)
        .map((o) => entityId("project", o.slug)),
      supporting: [entityId("event-type", slugify(p.eventType))],
      related: relatedIds(`/portfolio/project/${p.slug}`),
    });
  }

  /* Journal categories and articles. */
  for (const c of journalCategories) {
    const members = articles.filter((a) => a.category === c.category);
    list.push({
      id: entityId("journal-category", c.slug),
      kind: "journal-category",
      slug: c.slug,
      name: c.name,
      path: `/journal/category/${c.slug}`,
      summary: c.lede,
      parent: hubId("journal"),
      children: members.map((a) => entityId("article", a.slug)),
      siblings: journalCategories
        .filter((o) => o.slug !== c.slug)
        .map((o) => entityId("journal-category", o.slug)),
      supporting: [],
      related: c.relatedServices.map((s) => entityId("service", s)),
    });
  }

  const categoryBySlug = new Map(journalCategories.map((c) => [c.category, c.slug]));

  for (const a of articles) {
    list.push({
      id: entityId("article", a.slug),
      kind: "article",
      slug: a.slug,
      name: a.title,
      path: `/journal/${a.slug}`,
      summary: a.excerpt,
      parent: entityId("journal-category", categoryBySlug.get(a.category) ?? "planning"),
      children: [],
      siblings: a.related.map((r) => entityId("article", r)),
      supporting: [],
      related: relatedIds(`/journal/${a.slug}`),
    });
  }

  /* FAQ collections. */
  for (const t of faqTopics) {
    list.push({
      id: entityId("faq", t.slug),
      kind: "faq",
      slug: t.slug,
      name: t.name,
      path: `/faq/${t.slug}`,
      summary: t.lede,
      parent: hubId("faq"),
      children: [],
      siblings: faqTopics.filter((o) => o.slug !== t.slug).map((o) => entityId("faq", o.slug)),
      supporting: [],
      related: relatedIds(`/faq/${t.slug}`),
    });
  }

  /* Event types — no page of their own, but real entities the graph uses. */
  for (const type of eventTypes) {
    const members = portfolioProjects.filter((p) => p.eventType === type);
    list.push({
      id: entityId("event-type", slugify(type)),
      kind: "event-type",
      slug: slugify(type),
      name: type,
      path: null,
      summary: `${type} evenings planned, designed and catered by the house.`,
      parent: BUSINESS_ID,
      children: members.map((p) => entityId("project", p.slug)),
      siblings: eventTypes
        .filter((o) => o !== type)
        .map((o) => entityId("event-type", slugify(o))),
      supporting: supportingArticles(type.toLowerCase().split(/\s+/)),
      related: relatedIds(`/portfolio/project/${members[0]?.slug ?? ""}`),
    });
  }

  /* People. */
  for (const m of teamPage.members) {
    list.push({
      id: entityId("person", slugify(m.name)),
      kind: "person",
      slug: slugify(m.name),
      name: m.name,
      path: "/about/team",
      summary: `${m.role} — with the house since ${m.since}.`,
      parent: hubId("about"),
      children: [],
      siblings: teamPage.members
        .filter((o) => o.name !== m.name)
        .map((o) => entityId("person", slugify(o.name))),
      supporting: [],
      related: [BUSINESS_ID],
    });
  }

  /* Policies. */
  for (const policy of [
    { slug: "privacy", name: "Privacy policy" },
    { slug: "terms", name: "Terms of service" },
    { slug: "cookies", name: "Cookie policy" },
  ]) {
    list.push({
      id: entityId("policy", policy.slug),
      kind: "policy",
      slug: policy.slug,
      name: policy.name,
      path: `/${policy.slug}`,
      summary: `${policy.name} for Anayat Events & Catering.`,
      parent: BUSINESS_ID,
      children: [],
      siblings: [],
      supporting: [],
      related: [BUSINESS_ID],
    });
  }

  return list;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function unique(list: string[], self: string): string[] {
  return [...new Set(list)].filter((id) => id !== self);
}

/** Every entity, deduplicated by identity and stable between builds. */
export const entities: Entity[] = dedupe(buildEntities());

function dedupe(list: Entity[]): Entity[] {
  const seen = new Map<string, Entity>();
  for (const e of list) {
    if (seen.has(e.id)) continue;
    // Self-references and dead ends are pruned once, here, so no consumer has
    // to defend against them.
    seen.set(e.id, {
      ...e,
      children: unique(e.children, e.id),
      siblings: unique(e.siblings, e.id),
      supporting: unique(e.supporting, e.id),
      related: unique(e.related, e.id),
    });
  }
  const ids = new Set(seen.keys());
  return [...seen.values()].map((e) => ({
    ...e,
    parent: e.parent && ids.has(e.parent) ? e.parent : null,
    children: e.children.filter((id) => ids.has(id)),
    siblings: e.siblings.filter((id) => ids.has(id)),
    supporting: e.supporting.filter((id) => ids.has(id)),
    related: e.related.filter((id) => ids.has(id)),
  }));
}

const byId = new Map(entities.map((e) => [e.id, e]));
const byPath = new Map(entities.filter((e) => e.path).map((e) => [e.path!, e]));

export const getEntity = (id: string) => byId.get(id);
export const entityForPath = (path: string) => byPath.get(path);
export const entityFor = (kind: EntityKind, slug: string) => byId.get(entityId(kind, slug));

/* ------------------------------ validation ------------------------------- */

export interface GraphIssue {
  severity: "error" | "warning";
  check: string;
  entity: string;
  message: string;
}

/**
 * Build-time knowledge validation: no orphan entities, no dangling parents,
 * no duplicate identities, no cycles, no isolated islands.
 */
export function validateKnowledgeGraph(): GraphIssue[] {
  const issues: GraphIssue[] = [];
  const counts = new Map<string, number>();
  const slugPairs = new Map<string, string>();

  for (const e of entities) {
    counts.set(e.id, (counts.get(e.id) ?? 0) + 1);

    const degree =
      e.children.length + e.siblings.length + e.supporting.length + e.related.length;
    if (degree === 0 && e.parent === null)
      issues.push({
        severity: "error",
        check: "orphan-entity",
        entity: e.id,
        message: `${e.name} has no relationships at all`,
      });
    else if (degree === 0)
      issues.push({
        severity: "warning",
        check: "thin-entity",
        entity: e.id,
        message: `${e.name} has a parent but no children, siblings or related entities`,
      });

    if (e.kind !== "business" && !e.parent)
      issues.push({
        severity: "error",
        check: "missing-parent",
        entity: e.id,
        message: `${e.name} has no parent entity`,
      });

    if (e.path) {
      const clash = slugPairs.get(e.path);
      if (clash)
        issues.push({
          severity: "warning",
          check: "shared-path",
          entity: e.id,
          message: `${e.path} is claimed by both ${clash} and ${e.id}`,
        });
      else slugPairs.set(e.path, e.id);
    }
  }

  for (const [id, count] of counts)
    if (count > 1)
      issues.push({
        severity: "error",
        check: "duplicate-entity",
        entity: id,
        message: `identity emitted ${count} times`,
      });

  // Ancestry must terminate at the business node.
  for (const e of entities) {
    const seen = new Set<string>([e.id]);
    let cursor = e.parent;
    while (cursor) {
      if (seen.has(cursor)) {
        issues.push({
          severity: "error",
          check: "cyclic-parent",
          entity: e.id,
          message: `parent chain loops through ${cursor}`,
        });
        break;
      }
      seen.add(cursor);
      cursor = byId.get(cursor)?.parent ?? null;
    }
    if (!seen.has(BUSINESS_ID) && e.id !== BUSINESS_ID)
      issues.push({
        severity: "warning",
        check: "detached-entity",
        entity: e.id,
        message: `${e.name} does not resolve up to the business entity`,
      });
  }

  return issues;
}

/* --------------------------- machine-readable ---------------------------- */

/** The whole graph, shaped for /knowledge-graph.json. */
export function knowledgeGraphDocument(baseUrl: string) {
  return {
    generator: "anayat-knowledge-graph",
    business: {
      id: BUSINESS_ID,
      name: site.legalName,
      description: site.description,
      url: `${baseUrl}/`,
      sameAs: [site.mapsUrl, site.instagram],
      address: site.address.full,
      areaServed: site.serviceArea,
      telephone: site.phoneE164,
    },
    counts: entities.reduce<Record<string, number>>((acc, e) => {
      acc[e.kind] = (acc[e.kind] ?? 0) + 1;
      return acc;
    }, {}),
    entities: entities.map((e) => ({
      ...e,
      url: e.path ? `${baseUrl}${e.path}` : null,
    })),
    validation: validateKnowledgeGraph(),
  };
}

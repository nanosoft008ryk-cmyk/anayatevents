/**
 * Graph-driven structured data.
 *
 * Every leaf page already emits its own primary node (Service, Article,
 * CollectionPage…). This helper adds the *relationships* around that node —
 * parent, siblings, supporting and related entities — read straight from the
 * knowledge graph so nothing is hand-mapped and nothing can drift.
 *
 * It never repeats a type another builder emits: the output is a single
 * `WebPage` relationship node keyed on `#relations`, referencing other pages
 * by URL only.
 */
import { entityForPath, getEntity, type Entity } from "@/lib/knowledge-graph";
import { BASE_URL } from "@/lib/seo";

const abs = (path: string) => `${BASE_URL}${path === "/" ? "" : path}`;

function pathsFor(ids: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of ids) {
    const node = getEntity(id);
    if (!node?.path || seen.has(node.path)) continue;
    seen.add(node.path);
    out.push(abs(node.path));
  }
  return out;
}

/**
 * Relationship node for a page, or `null` when the path has no entity — the
 * caller simply emits nothing rather than an empty, meaningless block.
 */
export function entityRelationsSchema(path: string) {
  const node: Entity | undefined = entityForPath(path);
  if (!node) return null;

  const parent = node.parent ? getEntity(node.parent) : undefined;
  const significant = pathsFor([...node.children, ...node.supporting]);
  const related = pathsFor([...node.related, ...node.siblings]).filter(
    (url) => !significant.includes(url),
  );

  if (significant.length === 0 && related.length === 0 && !parent?.path) return null;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": abs(`${path}#relations`),
    url: abs(path),
    name: node.name,
    description: node.summary,
    mainEntityOfPage: { "@id": abs(`${path}#webpage`) },
    isPartOf: parent?.path ? { "@id": abs(`${parent.path}#webpage`) } : { "@id": abs("/#website") },
    about: { "@id": abs("/#business") },
    ...(significant.length ? { significantLink: significant } : {}),
    ...(related.length ? { relatedLink: related } : {}),
  };
}

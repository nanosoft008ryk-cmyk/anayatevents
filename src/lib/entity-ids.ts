/* ---------------------------------------------------------------------------
 * Stable entity identities.
 *
 * Every major entity on this site (service, area, portfolio collection,
 * project, journal article, journal category, FAQ collection, event type,
 * team member, policy, plus the business itself) carries a permanent internal
 * identity of the form:
 *
 *     urn:anayat:<kind>:<stable-key>
 *
 * The stable key defaults to today's slug. When a slug or a title changes in
 * future, add the OLD key to ALIASES below pointing at the new slug — the URN
 * then stays constant for the life of the project, which is what lets
 * structured data, related-content generation and the knowledge graph keep
 * referring to the same thing across renames.
 *
 * These identities are never rendered to a visitor. They exist only inside
 * JSON-LD `@id` values, the machine-readable knowledge graph and the
 * build-time validation report.
 * ------------------------------------------------------------------------- */

export type EntityKind =
  | "business"
  | "service"
  | "area"
  | "collection"
  | "project"
  | "article"
  | "journal-category"
  | "faq"
  | "event-type"
  | "person"
  | "policy"
  | "page";

export const URN_PREFIX = "urn:anayat";

/**
 * Historic key → current slug. Empty today because nothing has been renamed
 * yet; every rename must add one line here rather than mutating an identity.
 *
 *   "service:wedding-decor": "wedding-design",
 */
export const ALIASES: Record<string, string> = {};

const reverse = new Map(
  Object.entries(ALIASES).map(([oldKey, currentSlug]) => {
    const [kind, key] = oldKey.split(":");
    return [`${kind}:${currentSlug}`, key];
  }),
);

/** The permanent identity for one entity. */
export function entityId(kind: EntityKind, slug: string): string {
  const stable = reverse.get(`${kind}:${slug}`) ?? slug;
  return `${URN_PREFIX}:${kind}:${stable}`;
}

/** The business itself — the root node every other entity hangs from. */
export const BUSINESS_ID = entityId("business", "anayat-events-and-catering");

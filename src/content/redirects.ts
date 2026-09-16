/* ---------------------------------------------------------------------------
 * Keyword-URL redirects.
 *
 * Several exact-match keyword URLs (/wedding-planner-lahore,
 * /event-planner-dha-lahore …) are circulated in listings, ads and printed
 * collateral. Each one already has a real, fully-written page on this site —
 * under /services or /areas — so publishing a second page at the flat URL
 * would put two of our own pages in front of the same query and split the
 * signal between them.
 *
 * Instead every flat URL answers with a permanent redirect to the canonical
 * page. The keyword URL keeps working for anyone who types it, and all of the
 * link equity lands on one page per topic.
 *
 * RULE: a target must be a real page that exists in /src/content. Adding an
 * entry here does NOT create a page, and these paths are deliberately kept out
 * of the sitemap and the crawl surface by src/lib/route-registry.ts — a
 * redirect is never itself an indexable page.
 * ------------------------------------------------------------------------- */

export interface Redirect {
  /** The flat keyword URL, exactly as it is advertised. */
  from: string;
  /** The canonical page that actually answers the query. */
  to: string;
}

export const redirects: Redirect[] = [
  /* ---- Service keywords ------------------------------------------------ */
  { from: "/event-planner-lahore", to: "/areas/lahore" },
  { from: "/event-management-company-lahore", to: "/areas/lahore" },
  { from: "/best-event-planner-in-lahore", to: "/areas/lahore" },
  { from: "/best-event-management-company-in-lahore", to: "/areas/lahore" },
  { from: "/wedding-planner-lahore", to: "/services/wedding-planning" },
  { from: "/wedding-planner-near-me", to: "/services/wedding-planning" },
  { from: "/event-planner-near-me", to: "/areas/lahore" },
  { from: "/wedding-decor-lahore", to: "/services/stage-decoration" },
  { from: "/top-wedding-decorators-lahore", to: "/services/stage-decoration" },
  { from: "/catering-services-lahore", to: "/services/luxury-catering" },
  { from: "/mehndi-decoration-lahore", to: "/services/mehndi-planning" },
  { from: "/barat-decoration-lahore", to: "/services/barat-planning" },
  { from: "/walima-decoration-lahore", to: "/services/walima-planning" },
  { from: "/birthday-party-decoration-lahore", to: "/services/birthday-events" },
  { from: "/birthday-event-planner-lahore", to: "/services/birthday-events" },
  { from: "/corporate-event-management-lahore", to: "/services/corporate-events" },
  { from: "/farmhouse-event-planner-lahore", to: "/services/farmhouse-events" },
  { from: "/luxury-wedding-decoration-lahore", to: "/services/luxury-weddings" },
  { from: "/luxury-event-planner-lahore", to: "/services/luxury-weddings" },
  { from: "/premium-event-management-services-lahore", to: "/services/luxury-weddings" },

  /* ---- Area keywords --------------------------------------------------- */
  { from: "/event-planner-dha-lahore", to: "/areas/dha-lahore" },
  { from: "/event-planner-johar-town-lahore", to: "/areas/johar-town" },
  { from: "/event-planner-gulberg-lahore", to: "/areas/gulberg" },
  { from: "/event-planner-model-town-lahore", to: "/areas/model-town" },
  { from: "/event-planner-bahria-town-lahore", to: "/areas/bahria-town-lahore" },
  { from: "/event-planner-valencia-lahore", to: "/areas/valencia-town" },
  { from: "/event-planner-wapda-town-lahore", to: "/areas/wapda-town" },
  { from: "/event-planner-askari-lahore", to: "/areas/cantt-askari" },
  { from: "/event-planner-raiwind-road-lahore", to: "/areas/raiwind-road" },
  { from: "/event-planner-ferozepur-road-lahore", to: "/areas/ferozepur-road" },
  { from: "/event-planner-canal-road-lahore", to: "/areas/canal-road" },
  { from: "/event-planner-bedian-road-lahore", to: "/areas/bedian-road" },
];

/** Every flat keyword URL, for the route-registry crawl-surface exclusion. */
export const redirectPaths = new Set(redirects.map((r) => r.from));

export function redirectTarget(path: string): string | undefined {
  return redirects.find((r) => r.from === path)?.to;
}

import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { redirectTarget } from "@/content/redirects";

/* ---------------------------------------------------------------------------
 * Catch-all.
 *
 * Runs only when no real route matched. Two jobs, in order:
 *
 *  1. Exact-match keyword URLs (see src/content/redirects.ts) answer with a
 *     permanent 301 to the canonical page that already covers the topic, so
 *     the advertised URL keeps working and the link equity consolidates on one
 *     page instead of splitting across two.
 *  2. Anything else falls through to the sitewide 404 in __root.tsx —
 *     unchanged behaviour, same component, same status code.
 *
 * beforeLoad runs on the server during SSR, so the redirect is a real HTTP 301
 * for crawlers rather than a client-side history replacement.
 * ------------------------------------------------------------------------- */

export const Route = createFileRoute("/$")({
  beforeLoad: ({ params }) => {
    const splat = (params as { _splat?: string })._splat ?? "";
    // Normalise: leading slash, no trailing slash, lowercase.
    const path = ("/" + splat).replace(/\/+$/, "").toLowerCase() || "/";

    const target = redirectTarget(path);
    if (target) throw redirect({ to: target, statusCode: 301 });

    throw notFound();
  },
  component: () => null,
});

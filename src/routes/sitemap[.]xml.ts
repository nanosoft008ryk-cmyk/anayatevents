import { createFileRoute } from "@tanstack/react-router";

import { requestOrigin } from "@/lib/site-url";
import { allPages } from "@/lib/route-registry";
import { buildUrlset, XML_HEADERS } from "@/lib/sitemap";

/**
 * Flat sitemap of every page, kept alongside the split /sitemap-index.xml for
 * crawlers and tools that expect a single file. Both are generated from the
 * same registry, so they can never drift apart.
 *
 * <lastmod> is emitted only where a real, page-specific publication date
 * exists (journal articles). No build-time or synthetic dates.
 */
export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(buildUrlset(allPages(), requestOrigin(request)), { headers: XML_HEADERS }),
    },
  },
});

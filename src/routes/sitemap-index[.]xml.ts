import { createFileRoute } from "@tanstack/react-router";

import { requestOrigin } from "@/lib/site-url";
import { buildSitemapIndex, XML_HEADERS } from "@/lib/sitemap";

/**
 * /sitemap-index.xml — the split entry point. Lists one sitemap per content
 * section (services, areas, portfolio, journal, faq, core) plus the image
 * sitemap, so the crawl surface keeps scaling as content grows.
 *
 * Every URL is derived from the incoming request host: domain-independent.
 */
export const Route = createFileRoute("/sitemap-index.xml")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(buildSitemapIndex(requestOrigin(request)), { headers: XML_HEADERS }),
    },
  },
});

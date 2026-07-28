import { createFileRoute } from "@tanstack/react-router";

import { requestOrigin } from "@/lib/site-url";
import { buildUrlset, isSitemapSection, sitemapSections, XML_HEADERS } from "@/lib/sitemap";

/**
 * /sitemaps/<section>.xml — one sitemap per content section, listed by
 * /sitemap-index.xml. Sections come from the route registry, so a new service,
 * area, project or article appears here with no manual registration. URLs are
 * built from the incoming request host and stay domain-independent.
 */
export const Route = createFileRoute("/sitemaps/$section")({
  server: {
    handlers: {
      GET: ({ request, params }) => {
        const id = params.section.replace(/\.xml$/, "");
        if (!isSitemapSection(id)) return new Response("Not found", { status: 404 });
        const section = sitemapSections().find((s) => s.id === id);
        if (!section) return new Response("Not found", { status: 404 });
        return new Response(buildUrlset(section.entries, requestOrigin(request)), {
          headers: XML_HEADERS,
        });
      },
    },
  },
});

import { createFileRoute, notFound } from "@tanstack/react-router";

import { requestOrigin } from "@/lib/site-url";
import {
  buildUrlset,
  isSitemapSection,
  sitemapSections,
  XML_HEADERS,
} from "@/lib/sitemap";

/**
 * /sitemap-<section>.xml — one sitemap per content section, listed by
 * /sitemap-index.xml. Sections come from the route registry, so a new service,
 * area, project or article appears here with no manual registration.
 */
export const Route = createFileRoute("/sitemap-$section.xml")({
  server: {
    handlers: {
      GET: ({ request, params }) => {
        const id = params.section;
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

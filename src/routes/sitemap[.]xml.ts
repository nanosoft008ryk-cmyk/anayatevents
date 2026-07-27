import { createFileRoute } from "@tanstack/react-router";

import { BASE_URL } from "@/lib/seo";
import { allPages } from "@/lib/route-registry";

/**
 * Fully automatic sitemap. Pages are discovered from src/routes and expanded
 * from the content modules (see route-registry). Adding a page or a content
 * record regenerates this file on the next build — it is never edited by hand.
 *
 * <lastmod> is emitted only where a real, page-specific publication date
 * exists (journal articles). No build-time or synthetic dates.
 */
function esc(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildXml(): string {
  const urls = allPages()
    .map((e) => {
      const abs = /^https?:\/\//.test(e.image ?? "") ? e.image : e.image ? `${BASE_URL}${e.image}` : "";
      return [
        `  <url>`,
        `    <loc>${BASE_URL}${e.path}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        `    <priority>${e.priority}</priority>`,
        abs
          ? `    <image:image>\n      <image:loc>${esc(abs)}</image:loc>\n${
              e.imageTitle ? `      <image:title>${esc(e.imageTitle)}</image:title>\n` : ""
            }    </image:image>`
          : null,
        `  </url>`,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(buildXml(), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});

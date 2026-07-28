import { createFileRoute } from "@tanstack/react-router";

import { requestOrigin } from "@/lib/site-url";
import { allPageImages } from "@/lib/route-registry";

/**
 * Dedicated image sitemap, generated from the page registry. Every photograph
 * is declared against the page it actually appears on, with its real alt text
 * as the title and its caption as the caption — no invented metadata, no
 * duplicate <image:loc> inside a <url>.
 */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absolute(url: string, origin: string): string {
  return /^https?:\/\//.test(url) ? url : `${origin}${url}`;
}

function buildXml(origin: string): string {
  const blocks = allPageImages().map((page) => {
    const images = page.images
      .map((img) =>
        [
          `    <image:image>`,
          `      <image:loc>${esc(absolute(img.url, origin))}</image:loc>`,
          `      <image:title>${esc(img.title)}</image:title>`,
          img.caption ? `      <image:caption>${esc(img.caption)}</image:caption>` : null,
          `    </image:image>`,
        ]
          .filter(Boolean)
          .join("\n"),
      )
      .join("\n");

    return [`  <url>`, `    <loc>${origin}${page.path}</loc>`, images, `  </url>`].join("\n");
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${blocks.join("\n")}
</urlset>
`;
}

export const Route = createFileRoute("/image-sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(buildXml(requestOrigin(request)), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});

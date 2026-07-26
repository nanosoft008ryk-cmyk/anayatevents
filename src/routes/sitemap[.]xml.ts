import { createFileRoute } from "@tanstack/react-router";

import { BASE_URL } from "@/lib/seo";
import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { portfolioCategories } from "@/content/portfolio";
import { articles } from "@/content/journal";
import { faqTopics } from "@/content/faqs";

/**
 * Generated from the same content modules that build the routes, so the
 * sitemap can never drift from the site. No fabricated lastmod dates:
 * only journal articles carry a real publication date.
 */
function entries(): { path: string; priority: string; lastmod?: string }[] {
  return [
    { path: "/", priority: "1.0" },
    { path: "/about", priority: "0.8" },
    { path: "/about/process", priority: "0.7" },
    { path: "/reviews", priority: "0.7" },
    { path: "/services", priority: "0.9" },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: "0.8" })),
    { path: "/areas", priority: "0.9" },
    ...locations.map((l) => ({ path: `/areas/${l.slug}`, priority: "0.8" })),
    { path: "/portfolio", priority: "0.8" },
    ...portfolioCategories.map((c) => ({ path: `/portfolio/${c.slug}`, priority: "0.7" })),
    { path: "/vault", priority: "0.6" },
    { path: "/journal", priority: "0.8" },
    ...articles.map((a) => ({
      path: `/journal/${a.slug}`,
      priority: "0.7",
      lastmod: a.date,
    })),
    { path: "/faq", priority: "0.7" },
    ...faqTopics.map((t) => ({ path: `/faq/${t.slug}`, priority: "0.6" })),
    { path: "/contact", priority: "0.9" },
  ];
}

function buildXml(): string {
  const urls = entries()
    .map(
      (e) =>
        `  <url>\n    <loc>${BASE_URL}${e.path === "/" ? "/" : e.path}</loc>\n` +
        (e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : "") +
        `    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
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

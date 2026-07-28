/* ---------------------------------------------------------------------------
 * Sitemap generation.
 *
 * One builder shared by the flat sitemap, the per-section sitemaps and the
 * sitemap index. Every absolute URL is derived from the origin passed in by
 * the caller (the incoming request host), so nothing is tied to a domain.
 * ------------------------------------------------------------------------- */

import { allPages, type PageEntry } from "@/lib/route-registry";

export type SitemapSectionId =
  | "core"
  | "services"
  | "areas"
  | "portfolio"
  | "journal"
  | "faq";

export interface SitemapSection {
  id: SitemapSectionId;
  /** Public path of this section's sitemap, e.g. /sitemaps/services.xml */
  path: string;
  entries: (PageEntry & { priority: string })[];
}

/** Sitemaps split once a section is worth its own file. */
export const SECTION_ORDER: SitemapSectionId[] = [
  "core",
  "services",
  "areas",
  "portfolio",
  "journal",
  "faq",
];

/** Which sitemap a page belongs to, derived from its own URL. */
export function sectionOf(path: string): SitemapSectionId {
  if (path.startsWith("/services")) return "services";
  if (path.startsWith("/areas")) return "areas";
  if (path.startsWith("/portfolio")) return "portfolio";
  if (path.startsWith("/journal")) return "journal";
  if (path.startsWith("/faq")) return "faq";
  return "core";
}

export function sitemapPathFor(id: SitemapSectionId): string {
  return `/sitemaps/${id}.xml`;
}

/** All non-empty sections, in a stable, hierarchy-first order. */
export function sitemapSections(): SitemapSection[] {
  const pages = allPages();
  return SECTION_ORDER.map((id) => ({
    id,
    path: sitemapPathFor(id),
    entries: pages.filter((p) => sectionOf(p.path) === id),
  })).filter((s) => s.entries.length > 0);
}

export function isSitemapSection(value: string): value is SitemapSectionId {
  return (SECTION_ORDER as string[]).includes(value);
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absolute(url: string, origin: string): string {
  return /^https?:\/\//.test(url) ? url : `${origin}${url}`;
}

/** A <urlset> document for the given entries. */
export function buildUrlset(
  entries: (PageEntry & { priority: string })[],
  origin: string,
): string {
  const urls = entries
    .map((e) => {
      const img = e.image ? absolute(e.image, origin) : "";
      return [
        `  <url>`,
        `    <loc>${escapeXml(`${origin}${e.path}`)}</loc>`,
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
        `    <priority>${e.priority}</priority>`,
        img
          ? `    <image:image>\n      <image:loc>${escapeXml(img)}</image:loc>\n${
              e.imageTitle ? `      <image:title>${escapeXml(e.imageTitle)}</image:title>\n` : ""
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

/**
 * A <sitemapindex> pointing at each section sitemap plus the image sitemap.
 *
 * <lastmod> is emitted per section only where the section's own content
 * carries real publication dates (the journal). No build timestamps.
 */
export function buildSitemapIndex(origin: string): string {
  const sections = sitemapSections();
  const children: { path: string; lastmod?: string }[] = [
    ...sections.map((s) => {
      const dates = s.entries.map((e) => e.lastmod).filter(Boolean) as string[];
      return {
        path: s.path,
        lastmod: dates.length ? dates.sort().at(-1) : undefined,
      };
    }),
    { path: "/image-sitemap.xml" },
  ];

  const body = children
    .map((c) =>
      [
        `  <sitemap>`,
        `    <loc>${escapeXml(`${origin}${c.path}`)}</loc>`,
        c.lastmod ? `    <lastmod>${c.lastmod}</lastmod>` : null,
        `  </sitemap>`,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>
`;
}

export const XML_HEADERS = {
  "Content-Type": "application/xml; charset=utf-8",
  "Cache-Control": "public, max-age=3600",
} as const;

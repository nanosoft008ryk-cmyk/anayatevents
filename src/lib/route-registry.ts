/* ---------------------------------------------------------------------------
 * Automatic page discovery.
 *
 * Every page on this site is a file in src/routes. This module reads that
 * directory at build time (Vite's import.meta.glob, keys only — no modules are
 * evaluated), converts each filename into its public URL, and expands dynamic
 * `$slug` routes from the static content modules that feed them.
 *
 * Consequence: adding, renaming or deleting a page file — or adding a service,
 * area, article, portfolio project or FAQ topic to /src/content — updates the
 * sitemap, the priority model and the crawl surface automatically. Nothing is
 * registered by hand anywhere.
 * ------------------------------------------------------------------------- */

import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { portfolioCategories, portfolioProjects } from "@/content/portfolio";
import { articles, journalCategories } from "@/content/journal";
import { faqTopics } from "@/content/faqs";
import { photo, photos } from "@/content/images";

export interface PageEntry {
  /** Absolute, slash-prefixed, lowercase, hyphen-separated path. */
  path: string;
  /** Only ever a real, page-specific date. Never a build timestamp. */
  lastmod?: string;
  /** Representative image for sitemap <image:image>. */
  image?: string;
  imageTitle?: string;
}

/** Files that are endpoints or shells, never indexable pages. */
const NON_PAGE = /(^__|\[\.\]|README)/;

/**
 * The root splat (`$.tsx`) is the redirect/404 handler, not a page. It must
 * never reach the sitemap: the keyword URLs it serves are 301s to canonical
 * pages, and a redirect is not an indexable destination.
 */
const SPLAT = /(^|\/)\$$/;

/** Filename → URL pattern. `about.story.tsx` → `/about/story`. */
function fileToPattern(file: string): string {
  const rel = file.replace(/^\/src\/routes\//, "").replace(/\.tsx?$/, "");
  if (NON_PAGE.test(rel)) return "";
  if (SPLAT.test(rel)) return "";
  const segments = rel.split(/[./]/).filter(Boolean);
  const cleaned = segments.filter((s, i) => !(s === "index" && i === segments.length - 1));
  return "/" + cleaned.join("/");
}

/** Slug hygiene: lowercase, hyphenated, no doubles, no trailing slash. */
export function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9/]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** One expander per dynamic pattern. Sourced from the same content the routes render. */
const expanders: Record<string, () => PageEntry[]> = {
  "/services/$slug": () =>
    services.map((s) => ({
      path: `/services/${normalizeSlug(s.slug)}`,
      image: safePhoto(s.hero),
      imageTitle: s.name,
    })),
  "/areas/$slug": () =>
    locations.map((l) => ({
      path: `/areas/${normalizeSlug(l.slug)}`,
      image: safePhoto(l.hero),
      imageTitle: l.name,
    })),
  "/portfolio/$slug": () =>
    portfolioCategories.map((c) => ({
      path: `/portfolio/${normalizeSlug(c.slug)}`,
      image: safePhoto(c.hero),
      imageTitle: c.name,
    })),
  "/portfolio/project/$slug": () =>
    portfolioProjects.map((p) => ({
      path: `/portfolio/project/${normalizeSlug(p.slug)}`,
      image: safePhoto((p as { hero?: string }).hero),
      imageTitle: p.title,
    })),
  "/journal/$slug": () =>
    articles.map((a) => ({
      path: `/journal/${normalizeSlug(a.slug)}`,
      lastmod: a.date,
      image: safePhoto(a.hero),
      imageTitle: a.title,
    })),
  "/journal/category/$slug": () =>
    journalCategories.map((c) => ({ path: `/journal/category/${normalizeSlug(c.slug)}` })),
  "/faq/$slug": () => faqTopics.map((t) => ({ path: `/faq/${normalizeSlug(t.slug)}` })),
};

function safePhoto(id?: string): string | undefined {
  if (!id) return undefined;
  try {
    return photo(id).url;
  } catch {
    return undefined;
  }
}

/** Depth- and intent-aware priority, so the model never needs hand-tuning. */
function priorityFor(path: string): string {
  if (path === "/") return "1.0";
  if (path === "/contact" || path === "/services" || path === "/areas") return "0.9";
  if (/^\/(privacy|terms|cookies)$/.test(path)) return "0.3";
  const depth = path.split("/").filter(Boolean).length;
  return depth === 1 ? "0.8" : depth === 2 ? "0.7" : "0.6";
}

const discovered = Object.keys(
  import.meta.glob("/src/routes/**/*.tsx", { eager: false }),
)
  .map(fileToPattern)
  .filter(Boolean);

/**
 * Every indexable page on the site, deduplicated and ordered by hierarchy.
 */
export function allPages(): (PageEntry & { priority: string })[] {
  const out: PageEntry[] = [];

  for (const pattern of discovered) {
    if (pattern.includes("$")) {
      const expand = expanders[pattern];
      if (expand) out.push(...expand());
      continue;
    }
    out.push({ path: pattern === "" ? "/" : pattern });
  }

  const seen = new Set<string>();
  return out
    .filter((e) => {
      if (seen.has(e.path)) return false;
      seen.add(e.path);
      return true;
    })
    .sort((a, b) => a.path.localeCompare(b.path))
    .sort((a, b) => a.path.split("/").length - b.path.split("/").length)
    .map((e) => ({ ...e, priority: priorityFor(e.path) }));
}

/* --------------------------------------------------------------------------
 * Image inventory, per page.
 *
 * The image sitemap is generated from the same content the pages render, so a
 * photograph that appears on a page is declared for that page and nowhere it
 * does not appear. The vault carries the complete archive.
 * ------------------------------------------------------------------------ */

export interface PageImage {
  url: string;
  title: string;
  caption?: string;
}

export interface PageImages {
  path: string;
  images: PageImage[];
}

function resolve(ids: (string | undefined)[]): PageImage[] {
  const out: PageImage[] = [];
  const seen = new Set<string>();
  for (const id of ids) {
    if (!id) continue;
    try {
      const p = photo(id);
      if (seen.has(p.url)) continue;
      seen.add(p.url);
      out.push({ url: p.url, title: p.alt, caption: p.caption });
    } catch {
      /* an id that no longer exists simply drops out */
    }
  }
  return out;
}

export function allPageImages(): PageImages[] {
  const entries: PageImages[] = [
    { path: "/vault", images: resolve(photos.map((p) => p.id)) },
    ...services.map((s) => ({
      path: `/services/${normalizeSlug(s.slug)}`,
      images: resolve([s.hero, ...((s as { gallery?: string[] }).gallery ?? [])]),
    })),
    ...locations.map((l) => ({
      path: `/areas/${normalizeSlug(l.slug)}`,
      images: resolve([l.hero, ...l.inspiration.gallery]),
    })),
    ...portfolioCategories.map((c) => ({
      path: `/portfolio/${normalizeSlug(c.slug)}`,
      images: resolve([c.hero, ...c.heroFrames]),
    })),
    ...portfolioProjects.map((p) => ({
      path: `/portfolio/project/${normalizeSlug(p.slug)}`,
      images: resolve([
        (p as { hero?: string }).hero,
        ...((p as { heroFrames?: string[] }).heroFrames ?? []),
        ...((p as { gallery?: string[] }).gallery ?? []),
      ]),
    })),
    ...articles.map((a) => ({
      path: `/journal/${normalizeSlug(a.slug)}`,
      images: resolve([a.hero]),
    })),
  ];

  const known = new Set(allPages().map((p) => p.path));
  return entries.filter((e) => known.has(e.path) && e.images.length > 0);
}

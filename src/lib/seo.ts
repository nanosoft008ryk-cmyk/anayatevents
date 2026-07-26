import { site } from "@/content/site";

/* ---------------------------------------------------------------------------
 * Metadata rules for this project (enforced by the helpers below):
 *  - __root.tsx owns ONLY sitewide defaults: charset, viewport, og:site_name,
 *    og:locale, twitter:card, theme-color and the Organization/LocalBusiness
 *    JSON-LD. It never sets title, description, canonical or og:image.
 *  - Every leaf route calls pageMeta() exactly once, which emits a unique
 *    title / description / og:title / og:description / og:url plus a
 *    self-referencing canonical. Because TanStack merges meta by name and
 *    property, nothing is ever duplicated.
 *  - og:image lives on leaf routes only, and only when an absolute https URL
 *    exists. With no project domain yet we omit it; hosting injects the
 *    social preview at serve time.
 * ------------------------------------------------------------------------- */

export interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  noindex?: boolean;
  /** Absolute https URL only. Relative CDN paths are ignored on purpose. */
  image?: string;
}

export interface HeadMetaEntry {
  title?: string;
  name?: string;
  property?: string;
  content?: string;
}

export function pageMeta(input: PageMetaInput): {
  meta: HeadMetaEntry[];
  links: { rel: string; href: string }[];
} {
  const { title, description, path, type = "website", noindex, image } = input;

  const meta: HeadMetaEntry[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: path },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (image && image.startsWith("https://")) {
    meta.push({ property: "og:image", content: image });
    meta.push({ name: "twitter:image", content: image });
  }

  if (noindex) meta.push({ name: "robots", content: "noindex, nofollow" });

  return { meta, links: [{ rel: "canonical", href: path }] };
}

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

/* ------------------------------- Schema.org ------------------------------ */

/**
 * Validator note: Google's Rich Results Test resolves relative URLs against the
 * page it is testing, so relative values are valid — but ONLY once the site has
 * a real host. Until a domain is attached, BASE_URL stays empty and every URL
 * we emit is root-relative. Set BASE_URL to "https://yourdomain.com" (no
 * trailing slash) at launch and every schema URL becomes absolute at once.
 */
export const BASE_URL = "";

export function abs(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${BASE_URL}${path}`;
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

const openingHoursSpecification = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "14:00",
    closes: "22:00",
  },
];

/** Sitewide entity. Emitted once, from __root.tsx only. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": abs("/#business"),
    name: site.legalName,
    alternateName: site.name,
    slogan: site.tagline,
    description: site.description,
    // Google flags LocalBusiness without image/logo/geo as missing recommended
    // fields, so all three are always present.
    image: abs(logo),
    logo: abs(logo),
    address: postalAddress,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: site.mapsUrl,
    telephone: site.phoneE164,
    url: abs("/"),
    sameAs: [site.instagram, site.mapsUrl],
    openingHoursSpecification,
    priceRange: "$$$",
    currenciesAccepted: "PKR",
    foundingDate: site.founded,
    areaServed: { "@type": "City", name: "Lahore" },
    knowsLanguage: ["en", "ur"],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/**
 * Built from the exact same Crumb[] the visible <Breadcrumbs> renders, so the
 * markup and the structured data can never drift apart.
 */
export function breadcrumbSchema(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}


export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${input.path}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.category,
    url: input.path,
    provider: { "@id": "/#business" },
    areaServed: { "@type": "City", name: "Lahore" },
    audience: { "@type": "Audience", audienceType: "Private and corporate clients" },
  };
}

export function areaServedSchema(input: {
  name: string;
  description: string;
  path: string;
  areaName: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${input.path}#area-service`,
    name: input.name,
    description: input.description,
    serviceType: "Event management and catering",
    url: input.path,
    provider: { "@id": "/#business" },
    areaServed: {
      "@type": "Place",
      name: input.areaName,
      address: {
        "@type": "PostalAddress",
        addressLocality: input.areaName,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
    },
  };
}

export function faqSchema(items: { q: string; a: string }[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${path}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  section: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${input.path}#article`,
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    articleSection: input.section,
    inLanguage: "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": input.path },
    author: { "@type": "Organization", name: site.name },
    publisher: { "@id": "/#business" },
  };
}

export function imageGallerySchema(input: {
  name: string;
  description: string;
  path: string;
  images: { url: string; alt: string; caption: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": `${input.path}#gallery`,
    name: input.name,
    description: input.description,
    url: input.path,
    about: { "@id": "/#business" },
    associatedMedia: input.images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: img.url,
      name: img.caption,
      description: img.alt,
      creditText: site.name,
    })),
  };
}

export function itemListSchema(input: {
  name: string;
  path: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${input.path}#list`,
    name: input.name,
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.path,
    })),
  };
}

export function reviewCollectionSchema(
  path: string,
  reviews: { quote: string; name: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${path}#reviews`,
    itemListElement: reviews.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        reviewBody: r.quote,
        author: { "@type": "Person", name: r.name },
        itemReviewed: { "@id": "/#business" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      },
    })),
  };
}

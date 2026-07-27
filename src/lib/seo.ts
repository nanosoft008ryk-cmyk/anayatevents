import { site } from "@/content/site";
import { logo } from "@/content/images";


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
  /** Relative CDN paths are fine — abs() promotes them to absolute URLs. */
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
  const url = abs(path);

  const meta: HeadMetaEntry[] = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];

  if (image) {
    meta.push({ property: "og:image", content: abs(image) });
    meta.push({ name: "twitter:image", content: abs(image) });
  }

  if (noindex) meta.push({ name: "robots", content: "noindex, nofollow" });

  return { meta, links: [{ rel: "canonical", href: url }] };

}

export function jsonLd(data: unknown) {
  return { type: "application/ld+json", children: JSON.stringify(data) };
}

/* ------------------------------- Schema.org ------------------------------ */

/**
 * Absolute origin for every canonical, og:url and schema URL. This is the
 * project's stable Lovable host; when a custom domain is attached, change this
 * one line and every URL on the site follows.
 */
export const BASE_URL = "https://anayatevents.lovable.app";


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

/** Sitewide WebSite entity, emitted once from __root.tsx alongside the business. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    name: site.name,
    alternateName: site.legalName,
    description: site.description,
    url: abs("/"),
    inLanguage: "en",
    publisher: { "@id": abs("/#business") },
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
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`${input.path}#service`),
    name: input.name,
    description: input.description,
    serviceType: input.category,
    url: abs(input.path),
    ...(input.image ? { image: abs(input.image) } : {}),
    provider: { "@id": abs("/#business") },
    areaServed: { "@type": "City", name: "Lahore" },
    audience: { "@type": "Audience", audienceType: "Private and corporate clients" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "PKR",
      url: abs("/contact"),
    },
  };
}

export function areaServedSchema(input: {
  name: string;
  description: string;
  path: string;
  areaName: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`${input.path}#area-service`),
    name: input.name,
    description: input.description,
    serviceType: "Event management and catering",
    url: abs(input.path),
    ...(input.image ? { image: abs(input.image) } : {}),
    provider: { "@id": abs("/#business") },
    areaServed: {
      "@type": "Place",
      name: input.areaName,
      address: {
        "@type": "PostalAddress",
        addressLocality: `${input.areaName}, ${site.address.locality}`,
        addressRegion: site.address.region,
        addressCountry: site.address.country,
      },
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "PKR",
      url: abs("/contact"),
    },
  };
}

export function faqSchema(items: { q: string; a: string }[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": abs(`${path}#faq`),
    url: abs(path),
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
  image?: string;
  wordCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": abs(`${input.path}#article`),
    // Google truncates headlines beyond 110 characters.
    headline: input.title.slice(0, 110),
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    articleSection: input.section,
    inLanguage: "en",
    ...(input.image ? { image: [abs(input.image)] } : {}),
    ...(input.wordCount ? { wordCount: input.wordCount } : {}),
    url: abs(input.path),
    isAccessibleForFree: true,
    mainEntityOfPage: { "@type": "WebPage", "@id": abs(input.path) },
    author: {
      "@type": "Organization",
      name: site.name,
      url: abs("/"),
    },
    publisher: {
      "@type": "Organization",
      name: site.legalName,
      logo: { "@type": "ImageObject", url: abs(logo) },
    },
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
    "@id": abs(`${input.path}#gallery`),
    name: input.name,
    description: input.description,
    url: abs(input.path),
    about: { "@id": abs("/#business") },
    associatedMedia: input.images.map((img) => ({
      "@type": "ImageObject",
      contentUrl: abs(img.url),
      url: abs(img.url),
      name: img.caption,
      caption: img.caption,
      description: img.alt,
      creditText: site.name,
      copyrightNotice: site.legalName,
      creator: { "@type": "Organization", name: site.legalName },
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
    "@id": abs(`${input.path}#list`),
    name: input.name,
    numberOfItems: input.items.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: input.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: abs(item.path),
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
    "@id": abs(`${path}#reviews`),
    numberOfItems: reviews.length,
    itemListElement: reviews.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Review",
        reviewBody: r.quote,
        author: { "@type": "Person", name: r.name },
        itemReviewed: {
          "@type": "LocalBusiness",
          "@id": abs("/#business"),
          name: site.legalName,
          image: abs(logo),
          address: postalAddress,
          telephone: site.phoneE164,
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
          worstRating: "1",
        },
      },
    })),

  };
}

/* ------------------------- Page-type schema helpers ---------------------- */

/**
 * Generic WebPage node. Every leaf route emits exactly one of the WebPage
 * family (WebPage / AboutPage / ContactPage / CollectionPage), tied back to
 * the sitewide WebSite and LocalBusiness entities so nothing is duplicated.
 */
export function webPageSchema(input: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  image?: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    "@id": abs(`${input.path}#webpage`),
    name: input.name,
    description: input.description,
    url: abs(input.path),
    inLanguage: "en",
    isPartOf: { "@id": abs("/#website") },
    about: { "@id": abs("/#business") },
    ...(input.image ? { primaryImageOfPage: { "@type": "ImageObject", url: abs(input.image) } } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
  };
}

/** Primary navigation, emitted once from the root. */
export function siteNavigationSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    "@id": abs("/#navigation"),
    name: items.map((i) => i.name),
    url: items.map((i) => abs(i.path)),
  };
}

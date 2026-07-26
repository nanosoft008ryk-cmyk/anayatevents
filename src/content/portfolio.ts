export interface PortfolioCategory {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  lede: string;
  body: string[];
  photos: string[];
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "wedding-stages",
    name: "Wedding Stages",
    metaTitle: "Wedding Stage Portfolio — Lahore | Anayat Events",
    metaDescription:
      "A portfolio of wedding stages built by Anayat Events in Lahore — floral walls, crystal installations, fabricated arches and photographic lighting.",
    hero: "ae-13",
    lede: "The wall that appears in every photograph taken all night.",
    body: [
      "Each of these stages was drawn to its room's elevation, fabricated in our workshop and lit before it ever reached the venue. None of them is a stock set.",
    ],
    photos: ["ae-13", "ae-05", "ae-01", "ae-08", "ae-22", "ae-07", "ae-02", "ae-20"],
  },
  {
    slug: "floral-installations",
    name: "Floral Installations",
    metaTitle: "Floral Installation Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Fresh floral installation work by Anayat Events in Lahore — hanging gardens, arch work, aisle design and table florals cut and conditioned for each function.",
    hero: "ae-14",
    lede: "Cut that morning, conditioned in cold storage, installed hours before the first guest.",
    body: [
      "Every stem here is fresh. Nothing was rotated between functions, and nothing at eye level is artificial.",
    ],
    photos: ["ae-14", "ae-01", "ae-15", "ae-12", "ae-24", "ae-03", "ae-20"],
  },
  {
    slug: "mehndi-celebrations",
    name: "Mehndi Celebrations",
    metaTitle: "Mehndi Decor Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Mehndi decor and celebration photography from Anayat Events Lahore — jharoka sets, marigold installations, floor seating and dance-floor production.",
    hero: "ae-16",
    lede: "Colour at full volume, and a floor built to survive four hundred people.",
    body: [
      "Mehndi work is the least restrained thing we do, and the most technically demanding to keep coherent.",
    ],
    photos: ["ae-16", "ae-17", "ae-08", "ae-21", "ae-09", "ae-06"],
  },
  {
    slug: "outdoor-farmhouse",
    name: "Outdoor & Farmhouse",
    metaTitle: "Farmhouse & Outdoor Event Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Farmhouse and outdoor event portfolio from Anayat Events Lahore — lawn builds, canopy lighting, garden weddings and full temporary infrastructure.",
    hero: "ae-25",
    lede: "Land, trees and everything else arriving on a truck.",
    body: [
      "Farmhouse work is production before it is decoration. What you see here sits on power, kitchens and drainage we built ourselves.",
    ],
    photos: ["ae-25", "ae-10", "ae-11", "ae-26", "ae-24", "ae-19", "ae-18"],
  },
  {
    slug: "dining-catering",
    name: "Dining & Catering",
    metaTitle: "Catering & Dining Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Catering and dining portfolio from Anayat Events Lahore — table architecture, live counters, plated service and buffet design for large guest counts.",
    hero: "ae-04",
    lede: "Table architecture, live fire and service that reaches every seat together.",
    body: [
      "The kitchen is in-house. Every table setting, counter and service line here was run by our own brigade.",
    ],
    photos: ["ae-04", "ae-23", "ae-18", "ae-02", "ae-09", "ae-07"],
  },
  {
    slug: "lounges-seating",
    name: "Lounges & Seating",
    metaTitle: "Event Lounge & Seating Portfolio — Lahore | Anayat Events",
    metaDescription:
      "Lounge and seating design portfolio from Anayat Events Lahore — guest lounges, floor seating, family sections and intimate conversation settings.",
    hero: "ae-19",
    lede: "Where guests actually spend the evening once the photographs are done.",
    body: [
      "Lounge design is the most underrated part of an event. It decides whether people stay until midnight or leave after dinner.",
    ],
    photos: ["ae-19", "ae-06", "ae-12", "ae-03", "ae-21", "ae-15", "ae-17"],
  },
];

const catMap = new Map(portfolioCategories.map((c) => [c.slug, c]));

export function getPortfolioCategory(slug: string) {
  return catMap.get(slug);
}

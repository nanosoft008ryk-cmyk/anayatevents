import { services } from "./services";
import { locations } from "./locations";
import { portfolioCategories } from "./portfolio";
import { faqTopics } from "./faqs";

export interface NavChild {
  label: string;
  to: string;
  params?: Record<string, string>;
}

export interface NavGroup {
  label: string;
  to: string;
  columns?: { heading: string; items: NavChild[] }[];
}

const serviceColumns = ["Weddings", "Celebrations", "Catering", "Design & Production"].map(
  (family) => ({
    heading: family,
    items: services
      .filter((s) => s.family === family)
      .map((s) => ({
        label: s.navLabel,
        to: "/services/$slug",
        params: { slug: s.slug },
      })),
  }),
);

export const navigation: NavGroup[] = [
  {
    label: "Services",
    to: "/services",
    columns: serviceColumns,
  },
  {
    label: "Portfolio",
    to: "/portfolio",
    columns: [
      {
        heading: "Collections",
        items: portfolioCategories.map((c) => ({
          label: c.name,
          to: "/portfolio/$slug",
          params: { slug: c.slug },
        })),
      },
      {
        heading: "Archive",
        items: [{ label: "The Vault — full gallery", to: "/vault" }],
      },
    ],
  },
  {
    label: "Areas",
    to: "/areas",
    columns: [
      {
        heading: "City",
        items: locations.slice(0, 4).map((l) => ({
          label: l.shortName,
          to: "/areas/$slug",
          params: { slug: l.slug },
        })),
      },
      {
        heading: "Districts",
        items: locations.slice(4, 8).map((l) => ({
          label: l.shortName,
          to: "/areas/$slug",
          params: { slug: l.slug },
        })),
      },
      {
        heading: "Farmhouse belt",
        items: locations.slice(8).map((l) => ({
          label: l.shortName,
          to: "/areas/$slug",
          params: { slug: l.slug },
        })),
      },
    ],
  },
  {
    label: "Journal",
    to: "/journal",
  },
  {
    label: "About",
    to: "/about",
    columns: [
      {
        heading: "The house",
        items: [
          { label: "Our story", to: "/about" },
          { label: "How we work", to: "/about/process" },
          { label: "Reviews", to: "/reviews" },
        ],
      },
      {
        heading: "Answers",
        items: [
          { label: "FAQ centre", to: "/faq" },
          ...faqTopics.slice(0, 2).map((t) => ({
            label: t.name,
            to: "/faq/$slug",
            params: { slug: t.slug },
          })),
        ],
      },
    ],
  },
];

export const footerColumns = [
  {
    heading: "Services",
    items: services.slice(0, 9).map((s) => ({
      label: s.navLabel,
      to: "/services/$slug",
      params: { slug: s.slug },
    })),
  },
  {
    heading: "Areas we serve",
    items: locations.map((l) => ({
      label: l.shortName,
      to: "/areas/$slug",
      params: { slug: l.slug },
    })),
  },
  {
    heading: "Portfolio",
    items: [
      ...portfolioCategories.map((c) => ({
        label: c.name,
        to: "/portfolio/$slug",
        params: { slug: c.slug },
      })),
      { label: "The Vault", to: "/vault" },
    ],
  },
  {
    heading: "House",
    items: [
      { label: "Our story", to: "/about" },
      { label: "How we work", to: "/about/process" },
      { label: "Journal", to: "/journal" },
      { label: "Reviews", to: "/reviews" },
      { label: "FAQ centre", to: "/faq" },
      { label: "Enquire", to: "/contact" },
    ],
  },
];

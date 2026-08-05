import pdfAsset from "@/assets/menu/anayat-events-menu.pdf.asset.json";
import page1 from "@/assets/menu/menu-page-1.webp.asset.json";
import page2 from "@/assets/menu/menu-page-2.webp.asset.json";
import page3 from "@/assets/menu/menu-page-3.webp.asset.json";
import page4 from "@/assets/menu/menu-page-4.webp.asset.json";
import page5 from "@/assets/menu/menu-page-5.webp.asset.json";
import { assetUrl } from "@/lib/asset-url";

/**
 * The catering menu, transcribed verbatim from the house menu card
 * (ANAYAT EVENTS MENU, 2026). Prices are per guest in PKR, minimum 250 guests.
 * The original card is offered as a download alongside the readable version.
 */

export interface MenuCourse {
  heading: string;
  items: string[];
}

export interface MenuTier {
  slug: string;
  name: string;
  family: "Economy" | "Standard" | "Executive";
  price: number;
  priceLabel: string;
  minimumGuests: number;
  note: string;
  courses: MenuCourse[];
  /** Scan of the original menu card page. */
  card: string;
  cardAlt: string;
}

export const menuPdf = assetUrl(pdfAsset.url);
export const menuPdfFilename = "Anayat-Events-Catering-Menu.pdf";

const beverages = { heading: "Beverages", items: ["Mineral water", "Cold drinks"] };
const saladBar = {
  heading: "Salad bar",
  items: ["Fresh green salad", "Mint / zeera raita"],
};
const tandoor = { heading: "Tandoor", items: ["Variety of naan"] };
const dessert = {
  heading: "Dessert",
  items: ["Kulfa, trifle, firni", "Gajar halwa"],
};

export const menuTiers: MenuTier[] = [
  {
    slug: "economy-2600",
    name: "Economy",
    family: "Economy",
    price: 2600,
    priceLabel: "Rs 2,600",
    minimumGuests: 250,
    note: "The essential table — a complete buffet with the full farmhouse setup behind it.",
    courses: [
      { heading: "Starters", items: ["Hot & sour soup / fresh juices"] },
      { heading: "Main course", items: ["Chicken qorma or karahi", "Chicken biryani"] },
      tandoor,
      saladBar,
      dessert,
      beverages,
    ],
    card: assetUrl(page1.url),
    cardAlt: "Anayat Events economy menu card at Rs 2,600 per guest",
  },
  {
    slug: "economy-3300",
    name: "Economy with Bar BQ",
    family: "Economy",
    price: 3300,
    priceLabel: "Rs 3,300",
    minimumGuests: 250,
    note: "The economy table with a live bar-bq counter and a fish cracker starter.",
    courses: [
      { heading: "Starters", items: ["Fish cracker", "Hot & sour soup / fresh juices"] },
      { heading: "Main course", items: ["Chicken qorma or karahi", "Chicken biryani"] },
      { heading: "Bar BQ", items: ["Chicken kabab", "Chicken tikka boti"] },
      tandoor,
      saladBar,
      dessert,
      beverages,
    ],
    card: assetUrl(page2.url),
    cardAlt: "Anayat Events economy menu card with bar bq at Rs 3,300 per guest",
  },
  {
    slug: "standard-4200",
    name: "Standard",
    family: "Standard",
    price: 4200,
    priceLabel: "Rs 4,200",
    minimumGuests: 250,
    note: "Mutton enters the main course — the most requested table for a barat or walima.",
    courses: [
      { heading: "Starters", items: ["Hot & sour soup / fresh juices", "Fish cracker"] },
      { heading: "Main course", items: ["Mutton qorma", "Chicken biryani or pulao"] },
      tandoor,
      saladBar,
      dessert,
      beverages,
    ],
    card: assetUrl(page3.url),
    cardAlt: "Anayat Events standard menu card at Rs 4,200 per guest",
  },
  {
    slug: "standard-4800",
    name: "Standard with Bar BQ",
    family: "Standard",
    price: 4800,
    priceLabel: "Rs 4,800",
    minimumGuests: 250,
    note: "The standard table extended with a bar-bq counter working through the evening.",
    courses: [
      { heading: "Starters", items: ["Hot & sour soup / fresh juices", "Fish cracker"] },
      { heading: "Main course", items: ["Mutton qorma", "Chicken biryani or pulao"] },
      { heading: "Bar BQ", items: ["Chicken kabab", "Chicken tikka boti"] },
      tandoor,
      saladBar,
      dessert,
      beverages,
    ],
    card: assetUrl(page4.url),
    cardAlt: "Anayat Events standard menu card with bar bq at Rs 4,800 per guest",
  },
  {
    slug: "executive-6000",
    name: "Executive",
    family: "Executive",
    price: 6000,
    priceLabel: "Rs 6,000",
    minimumGuests: 250,
    note: "The full house table: five counters, a Thai-Chinese corner and a sweet bar.",
    courses: [
      {
        heading: "Starters",
        items: ["19-B soup, fresh juice", "Chicken tempura, finger fish"],
      },
      {
        heading: "Main course",
        items: ["Mutton qorma, steam roast", "Mutton afghani pulao", "Chicken boneless handi"],
      },
      {
        heading: "Thai Chinese corner",
        items: ["Thai chicken cashewnuts", "Chowmein, egg fried rice"],
      },
      { heading: "Bar BQ", items: ["Chicken reshmi kabab", "Malai boti"] },
      tandoor,
      { heading: "Salad bar", items: ["Fresh green salad"] },
      { heading: "Dessert", items: ["Sweet bar or halwa"] },
      { heading: "Beverages", items: ["Mineral water, cold drinks, tea"] },
    ],
    card: assetUrl(page5.url),
    cardAlt: "Anayat Events executive menu card at Rs 6,000 per guest",
  },
];

/** Identical across every tier — the setup that arrives with the food. */
export const setupIncludes = [
  "Premium crockery & cutlery",
  "Buffet station",
  "Premium waiters",
  "40% sofa sitting",
  "60% chair sitting with round tables",
  "Lighting",
  "Generator (with fuel for 4 hours)",
  "Farm house (The Palms 7)",
  "Valet parking",
];

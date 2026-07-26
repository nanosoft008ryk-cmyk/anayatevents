import a01 from "@/assets/ae-01.jpg.asset.json";
import a02 from "@/assets/ae-02.jpg.asset.json";
import a03 from "@/assets/ae-03.jpg.asset.json";
import a04 from "@/assets/ae-04.jpg.asset.json";
import a05 from "@/assets/ae-05.jpg.asset.json";
import a06 from "@/assets/ae-06.jpg.asset.json";
import a07 from "@/assets/ae-07.jpg.asset.json";
import a08 from "@/assets/ae-08.jpg.asset.json";
import a09 from "@/assets/ae-09.jpg.asset.json";
import a10 from "@/assets/ae-10.jpg.asset.json";
import a11 from "@/assets/ae-11.jpg.asset.json";
import a12 from "@/assets/ae-12.jpg.asset.json";
import a13 from "@/assets/ae-13.jpg.asset.json";
import a14 from "@/assets/ae-14.jpg.asset.json";
import a15 from "@/assets/ae-15.jpg.asset.json";
import a16 from "@/assets/ae-16.jpg.asset.json";
import a17 from "@/assets/ae-17.jpg.asset.json";
import a18 from "@/assets/ae-18.jpg.asset.json";
import a19 from "@/assets/ae-19.jpg.asset.json";
import a20 from "@/assets/ae-20.jpg.asset.json";
import a21 from "@/assets/ae-21.jpg.asset.json";
import a22 from "@/assets/ae-22.jpg.asset.json";
import a23 from "@/assets/ae-23.jpg.asset.json";
import a24 from "@/assets/ae-24.jpg.asset.json";
import a25 from "@/assets/ae-25.jpg.asset.json";
import a26 from "@/assets/ae-26.jpg.asset.json";
import logoAsset from "@/assets/ae-logo.jpg.asset.json";

export const logo = logoAsset.url;

export type PhotoTag =
  | "stage"
  | "decor"
  | "floral"
  | "outdoor"
  | "dining"
  | "lounge"
  | "venue"
  | "mehndi"
  | "celebration"
  | "aisle";

export interface Photo {
  id: string;
  url: string;
  alt: string;
  caption: string;
  tags: PhotoTag[];
  orientation: "portrait" | "landscape";
}

export const photos: Photo[] = [
  {
    id: "ae-01",
    url: a01.url,
    alt: "Floral wedding stage with hanging blossoms and candlelit console tables at a Lahore farmhouse",
    caption: "The Blossom Wall — farmhouse barat stage",
    tags: ["stage", "floral", "decor"],
    orientation: "portrait",
  },
  {
    id: "ae-02",
    url: a02.url,
    alt: "Crystal strand ceiling above a white settee stage inside a covered marquee",
    caption: "Crystal Rain — covered marquee stage",
    tags: ["stage", "decor"],
    orientation: "portrait",
  },
  {
    id: "ae-03",
    url: a03.url,
    alt: "Illuminated latticed nikah pavilion framed by white florals on an evening lawn",
    caption: "The Lattice Pavilion — nikah ceremony",
    tags: ["outdoor", "decor", "venue"],
    orientation: "portrait",
  },
  {
    id: "ae-04",
    url: a04.url,
    alt: "Long banquet tables dressed in white on a garden lawn beneath lantern posts",
    caption: "Garden Banquet — open-air dining",
    tags: ["dining", "outdoor"],
    orientation: "landscape",
  },
  {
    id: "ae-05",
    url: a05.url,
    alt: "Crystal beaded backdrop over a white couch stage with gold framing",
    caption: "Beaded Gold — reception stage study",
    tags: ["stage", "decor"],
    orientation: "portrait",
  },
  {
    id: "ae-06",
    url: a06.url,
    alt: "Cane and white upholstered lounge seating with black cushions under crystal drops",
    caption: "The Cane Lounge — guest seating detail",
    tags: ["lounge", "decor"],
    orientation: "portrait",
  },
  {
    id: "ae-07",
    url: a07.url,
    alt: "Draped white ceiling and layered chandeliers above a walima stage",
    caption: "White Cathedral — walima ceiling",
    tags: ["stage", "decor"],
    orientation: "portrait",
  },
  {
    id: "ae-08",
    url: a08.url,
    alt: "Hanging crystal columns and cascading greenery framing an ivory sofa stage",
    caption: "Suspended Garden — mehndi stage",
    tags: ["stage", "floral", "mehndi"],
    orientation: "portrait",
  },
  {
    id: "ae-09",
    url: a09.url,
    alt: "Outdoor evening lounge with white sofas, chandeliers and floral centrepieces",
    caption: "Night Lounge — open-air reception",
    tags: ["lounge", "outdoor"],
    orientation: "portrait",
  },
  {
    id: "ae-10",
    url: a10.url,
    alt: "Chandeliers suspended from mature trees above a garden ceremony set",
    caption: "Chandeliers in the Trees — garden ceremony",
    tags: ["outdoor", "venue", "decor"],
    orientation: "landscape",
  },
  {
    id: "ae-11",
    url: a11.url,
    alt: "Woodland ceremony set with white seating and vertical crystal installations",
    caption: "The Woodland Set — daylight ceremony",
    tags: ["outdoor", "stage"],
    orientation: "portrait",
  },
  {
    id: "ae-12",
    url: a12.url,
    alt: "Dusk stage beneath a lit tree with candle columns and pastel florals",
    caption: "Under the Tree — dusk ceremony",
    tags: ["outdoor", "stage", "floral"],
    orientation: "portrait",
  },
  {
    id: "ae-13",
    url: a13.url,
    alt: "Wide white floral stage with layered hanging greenery and soft uplighting",
    caption: "The Long White — full-width stage",
    tags: ["stage", "floral"],
    orientation: "landscape",
  },
  {
    id: "ae-14",
    url: a14.url,
    alt: "Close study of a white floral urn arrangement beneath crystal drops",
    caption: "Urn Study — floral detail",
    tags: ["floral", "decor"],
    orientation: "portrait",
  },
  {
    id: "ae-15",
    url: a15.url,
    alt: "Ivory sofa framed by hanging white blooms and trailing greenery",
    caption: "Bloom Curtain — nikah seating",
    tags: ["stage", "floral"],
    orientation: "portrait",
  },
  {
    id: "ae-16",
    url: a16.url,
    alt: "Colourful mehndi stage with jharoka arches, marigolds and floor seating",
    caption: "Jharoka Nights — mehndi set",
    tags: ["mehndi", "decor", "celebration"],
    orientation: "portrait",
  },
  {
    id: "ae-17",
    url: a17.url,
    alt: "Blush draped canopy over a wide walkway lined with florals and lounge seating",
    caption: "Blush Canopy — arrival walkway",
    tags: ["aisle", "decor", "celebration"],
    orientation: "portrait",
  },
  {
    id: "ae-18",
    url: a18.url,
    alt: "Guests gathered on a lawn beneath a lit canopy at blue hour",
    caption: "Blue Hour — the celebration in motion",
    tags: ["celebration", "outdoor"],
    orientation: "portrait",
  },
  {
    id: "ae-19",
    url: a19.url,
    alt: "White cane lounge chairs set among slender lit trees",
    caption: "Silver Grove — lounge among the trees",
    tags: ["lounge", "outdoor"],
    orientation: "portrait",
  },
  {
    id: "ae-20",
    url: a20.url,
    alt: "Sage and blush stage with draped fabric, florals and carved chairs",
    caption: "Sage & Blush — daytime nikah stage",
    tags: ["stage", "floral", "decor"],
    orientation: "portrait",
  },
  {
    id: "ae-21",
    url: a21.url,
    alt: "Green floral entrance arch opening onto a lawn celebration",
    caption: "The Green Arch — guest entrance",
    tags: ["decor", "outdoor", "venue"],
    orientation: "landscape",
  },
  {
    id: "ae-22",
    url: a22.url,
    alt: "Pillared aisle with crystal drapes and white floral runners leading to a stage",
    caption: "The Colonnade — processional aisle",
    tags: ["aisle", "stage", "decor"],
    orientation: "landscape",
  },
  {
    id: "ae-23",
    url: a23.url,
    alt: "Ivory lounge sofas with marble tables and floral arrangements under a marquee",
    caption: "Ivory Salon — lounge composition",
    tags: ["lounge", "decor"],
    orientation: "landscape",
  },
  {
    id: "ae-24",
    url: a24.url,
    alt: "Wide floral stage with white runner aisle and warm evening uplighting",
    caption: "Golden Hour Stage — reception centrepiece",
    tags: ["stage", "floral", "aisle"],
    orientation: "landscape",
  },
  {
    id: "ae-25",
    url: a25.url,
    alt: "Grand illuminated venue gate flanked by palms at blue hour",
    caption: "The Gate — farmhouse arrival",
    tags: ["venue", "outdoor"],
    orientation: "portrait",
  },
  {
    id: "ae-26",
    url: a26.url,
    alt: "Columned garden walkway lit with lanterns and lined with florals",
    caption: "Lantern Walk — venue approach",
    tags: ["venue", "outdoor", "decor"],
    orientation: "portrait",
  },
];

const byId = new Map(photos.map((p) => [p.id, p]));

export function photo(id: string): Photo {
  const found = byId.get(id);
  if (!found) throw new Error(`Unknown photo: ${id}`);
  return found;
}

export function photosByIds(ids: string[]): Photo[] {
  return ids.map(photo);
}

export function photosByTag(tag: PhotoTag): Photo[] {
  return photos.filter((p) => p.tags.includes(tag));
}

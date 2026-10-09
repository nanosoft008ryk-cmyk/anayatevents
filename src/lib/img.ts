import variantsJson from "@/content/variants.json";
import { assetUrl } from "@/lib/asset-url";


type Variant = {
  orig: string;
  w: number;
  h: number;
  /** WebP renditions keyed by pixel width. */
  v: Record<string, string>;
  /** AVIF renditions keyed by pixel width (optional). */
  a?: Record<string, string>;
};

const variants = variantsJson as unknown as Record<string, Variant>;

/** Viewports that receive a portrait art-directed crop instead of the master. */
export const MOBILE_MEDIA = "(max-width: 640px)";

/**
 * Portrait crops (committed under public/hero) for full-bleed opening frames.
 * A phone only ever shows the centre third of a landscape master behind the
 * hero, so this crop is both sharper and a fraction of the bytes.
 */
const mobileCrops: Record<string, { avif: string; webp: string }> = {
  "ae-22": { avif: "/hero/ae-22-mobile.avif", webp: "/hero/ae-22-mobile.webp" },
};

export function mobileCrop(id: string) {
  return mobileCrops[id];
}

export type ImgAttrs = {
  src: string;
  srcSet?: string;
  /** AVIF candidate set for a <source type="image/avif"> element. */
  avifSrcSet?: string;
  sizes?: string;
  width?: number;
  height?: number;
};

function setOf(map: Record<string, string> | undefined) {
  if (!map) return { srcSet: undefined, largest: undefined as string | undefined };
  const widths = Object.keys(map)
    .map(Number)
    .sort((a, b) => a - b);
  if (!widths.length) return { srcSet: undefined, largest: undefined };
  return {
    srcSet: widths.map((w) => `${assetUrl(map[String(w)])} ${w}w`).join(", "),
    largest: assetUrl(map[String(widths[widths.length - 1])]),
  };
}

/**
 * Responsive image attributes for a catalogue photo. Every master is rendered
 * to high-definition renditions (384 / 640 / 1024 / 1536 / 2048 / 2560) in
 * both AVIF (smallest payload, modern browsers) and WebP (universal
 * fallback); falls back to the master when a rendition is missing.
 */
export function imgAttrs(id: string, fallbackUrl: string, sizes = "100vw"): ImgAttrs {
  const entry = variants[id];
  const fallback = assetUrl(fallbackUrl);
  if (!entry) return { src: fallback };

  const webp = setOf(entry.v);
  const avif = setOf(entry.a);
  if (!webp.srcSet) return { src: fallback };

  return {
    src: webp.largest ?? fallback,

    srcSet: webp.srcSet,
    avifSrcSet: avif.srcSet,
    sizes,
    width: entry.w,
    height: entry.h,
  };
}

/**
 * Preload links for an above-the-fold image: AVIF first, WebP fallback. With
 * `artDirected`, phones preload the portrait crop and larger screens the set.
 */
export function preloadLinks(
  id: string,
  fallbackUrl: string,
  sizes = "100vw",
  artDirected = false,
) : Record<string, string>[] {
  const a = imgAttrs(id, fallbackUrl, sizes);
  const links: Record<string, string>[] = [];
  const crop = artDirected ? mobileCrop(id) : undefined;
  if (crop) {
    links.push({
      rel: "preload",
      as: "image",
      type: "image/avif",
      href: crop.avif,
      media: MOBILE_MEDIA,
      fetchPriority: "high",
    });
    const wide = preloadLinks(id, fallbackUrl, sizes);
    return [...links, ...wide.map((l) => ({ ...l, media: "(min-width: 641px)" }))];
  }
  if (a.avifSrcSet) {
    links.push({
      rel: "preload",
      as: "image",
      type: "image/avif",
      href: a.src,
      imageSrcSet: a.avifSrcSet,
      imageSizes: sizes,
      fetchPriority: "high",
    });
  } else if (a.srcSet) {
    links.push({
      rel: "preload",
      as: "image",
      type: "image/webp",
      href: a.src,
      imageSrcSet: a.srcSet,
      imageSizes: sizes,
      fetchPriority: "high",
    });
  }
  return links;
}

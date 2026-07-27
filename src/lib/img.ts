import variantsJson from "@/content/variants.json";

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
    srcSet: widths.map((w) => `${map[String(w)]} ${w}w`).join(", "),
    largest: map[String(widths[widths.length - 1])],
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
  if (!entry) return { src: fallbackUrl };

  const webp = setOf(entry.v);
  const avif = setOf(entry.a);
  if (!webp.srcSet) return { src: fallbackUrl };

  return {
    src: webp.largest ?? fallbackUrl,
    srcSet: webp.srcSet,
    avifSrcSet: avif.srcSet,
    sizes,
    width: entry.w,
    height: entry.h,
  };
}

/** Preload links for an above-the-fold image: AVIF first, WebP fallback. */
export function preloadLinks(id: string, fallbackUrl: string, sizes = "100vw") {
  const a = imgAttrs(id, fallbackUrl, sizes);
  const links: Record<string, string>[] = [];
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

import variantsJson from "@/content/variants.json";

type Variant = { orig: string; w: number; h: number; v: Record<string, string> };

const variants = variantsJson as unknown as Record<string, Variant>;

/**
 * Responsive image attributes for a catalogue photo. The masters are 2560px
 * JPEGs; these point the browser at pre-built WebP renditions (640 / 1280 /
 * 2048) and fall back to the master where a rendition is missing.
 */
export function imgAttrs(
  id: string,
  fallbackUrl: string,
  sizes = "100vw",
): { src: string; srcSet?: string; sizes?: string; width?: number; height?: number } {
  const entry = variants[id];
  if (!entry) return { src: fallbackUrl };

  const widths = Object.keys(entry.v)
    .map(Number)
    .sort((a, b) => a - b);
  if (!widths.length) return { src: fallbackUrl };

  const srcSet = widths.map((w) => `${entry.v[String(w)]} ${w}w`).join(", ");
  const preferred = entry.v[String(widths[widths.length - 1])];

  return {
    src: preferred,
    srcSet,
    sizes,
    width: entry.w,
    height: entry.h,
  };
}

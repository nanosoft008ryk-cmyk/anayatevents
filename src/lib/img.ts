import variantsJson from "@/content/variants.json";

type Variant = { orig: string; w: number; h: number; v: Record<string, string> };

const variants = variantsJson as unknown as Record<string, Variant>;

/**
 * Responsive image attributes for a catalogue photo. Every master is rendered
 * to high-definition WebP renditions (640 / 1024 / 1536 / 2048 / 2560, q88-90,
 * Lanczos + unsharp on upscales) so retina and full-bleed placements always
 * pull a crisp source; falls back to the master when a rendition is missing.
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

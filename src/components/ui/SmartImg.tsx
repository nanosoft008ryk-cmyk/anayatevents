import type { CSSProperties, Ref } from "react";

import { assetFallbackUrl } from "@/lib/asset-url";
import { imgAttrs, mobileCrop, MOBILE_MEDIA } from "@/lib/img";

/**
 * Format-negotiated photograph. Serves AVIF where supported and WebP
 * everywhere else, from the same responsive candidate set, so mobile pulls
 * the smallest correctly-sized rendition instead of a full-bleed master.
 *
 * If a rendition ever fails to load on a given host (a self-hosted mirror that
 * was not built, a CDN hiccup), the `onError` handler retries the other media
 * strategy so the page never shows a broken image on any domain.
 */
export function SmartImg({
  id,
  fallbackUrl,
  alt,
  sizes = "100vw",
  className,
  style,
  priority = false,
  artDirected = false,
  imgRef,
  ...rest
}: {
  id: string;
  fallbackUrl: string;
  alt: string;
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  /** Serve the portrait crop to phones when one exists (full-bleed heroes). */
  artDirected?: boolean;
  imgRef?: Ref<HTMLImageElement>;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes" | "style" | "className" | "alt" | "ref">) {
  const a = imgAttrs(id, fallbackUrl, sizes);
  const crop = artDirected ? mobileCrop(id) : undefined;
  // A caller asking for high fetch priority means the image is above the
  // fold, so it must never be lazy as well: a lazy LCP image waits for layout.
  const eager = priority || rest.fetchPriority === "high";

  return (
    <picture className="contents">
      {crop && <source media={MOBILE_MEDIA} type="image/avif" srcSet={crop.avif} />}
      {crop && <source media={MOBILE_MEDIA} type="image/webp" srcSet={crop.webp} />}
      {a.avifSrcSet && <source type="image/avif" srcSet={a.avifSrcSet} sizes={sizes} />}
      {a.srcSet && <source type="image/webp" srcSet={a.srcSet} sizes={sizes} />}
      <img
        ref={imgRef}
        src={a.src}
        width={a.width}
        height={a.height}
        alt={alt}
        decoding="async"
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className={className}
        style={style}
        onError={(event) => {
          const img = event.currentTarget;
          if (img.dataset.mediaRetried) return;
          const retry = assetFallbackUrl(img.currentSrc || img.src);
          if (!retry) return;
          img.dataset.mediaRetried = "1";
          // Drop the negotiated <source> sets so the retry URL is honoured.
          img.parentElement?.querySelectorAll("source").forEach((s) => s.remove());
          img.removeAttribute("srcset");
          img.src = retry;
        }}
        {...rest}
      />
    </picture>
  );
}

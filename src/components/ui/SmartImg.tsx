import type { CSSProperties, Ref } from "react";

import { assetFallbackUrl } from "@/lib/asset-url";
import { imgAttrs } from "@/lib/img";

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
  imgRef?: Ref<HTMLImageElement>;
} & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "sizes" | "style" | "className" | "alt" | "ref">) {
  const a = imgAttrs(id, fallbackUrl, sizes);

  return (
    <picture className="contents">
      {a.avifSrcSet && <source type="image/avif" srcSet={a.avifSrcSet} sizes={sizes} />}
      {a.srcSet && <source type="image/webp" srcSet={a.srcSet} sizes={sizes} />}
      <img
        ref={imgRef}
        src={a.src}
        width={a.width}
        height={a.height}
        alt={alt}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
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

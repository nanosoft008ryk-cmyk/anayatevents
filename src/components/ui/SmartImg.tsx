import type { CSSProperties, Ref } from "react";

import { imgAttrs } from "@/lib/img";

/**
 * Format-negotiated photograph. Serves AVIF where supported and WebP
 * everywhere else, from the same responsive candidate set, so mobile pulls
 * the smallest correctly-sized rendition instead of a full-bleed master.
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
        {...rest}
      />
    </picture>
  );
}

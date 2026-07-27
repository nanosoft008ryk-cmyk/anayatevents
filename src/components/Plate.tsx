import { useEffect, useRef, type CSSProperties } from "react";

import type { Photo } from "@/content/images";
import { imgAttrs } from "@/lib/img";
import { cn } from "@/lib/utils";

/**
 * Editorial image plate. Images are never boxed: they arrive under a rising
 * mask, drift at their own scroll speed and dissolve into the page at the
 * edges when asked. Captions sit in the margin like a magazine credit.
 */
export function Plate({
  image,
  ratio = "4/5",
  speed = 0,
  fade,
  caption,
  className,
  imgClassName,
  priority,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  style,
}: {
  image: Photo;
  ratio?: string;
  /** Parallax factor: positive drifts slower than the page. */
  speed?: number;
  fade?: "top" | "bottom" | "both" | "sides";
  caption?: boolean;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** Responsive sizes hint; defaults to a half-width editorial plate. */
  sizes?: string;
  style?: CSSProperties;
}) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!speed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrap.current;
        const img = inner.current;
        if (!el || !img) return;
        const r = el.getBoundingClientRect();
        const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        img.style.transform = `translate3d(0, ${(progress * speed * 100).toFixed(2)}px, 0) scale(1.14)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  const maskClass =
    fade === "top"
      ? "[mask-image:linear-gradient(to_bottom,transparent,black_22%)]"
      : fade === "bottom"
        ? "[mask-image:linear-gradient(to_bottom,black_72%,transparent)]"
        : fade === "both"
          ? "[mask-image:linear-gradient(to_bottom,transparent,black_18%,black_78%,transparent)]"
          : fade === "sides"
            ? "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            : "";

  return (
    <figure className={cn("group/plate relative", className)} style={style}>
      <div
        ref={wrap}
        className={cn("relative overflow-hidden", maskClass)}
        style={{ aspectRatio: ratio }}
      >
        <img
          ref={inner}
          {...imgAttrs(image.id, image.url, sizes)}
          alt={image.alt}
          decoding="async"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className={cn(
            "h-full w-full object-cover transition-[transform,filter] duration-[1600ms] [transition-timing-function:var(--ease-lux)]",
            speed ? "" : "group-hover/plate:scale-[1.06]",
            "brightness-[0.92] saturate-[0.96] group-hover/plate:brightness-100",
            imgClassName,
          )}
          style={speed ? { transform: "scale(1.14)" } : undefined}
        />
        <span className="pointer-events-none absolute inset-0 opacity-70 vignette" />
      </div>
      {caption && (
        <figcaption className="mt-4 font-sans text-[10px] leading-relaxed tracking-[0.26em] uppercase text-muted-foreground transition-colors duration-500 group-hover/plate:text-gold-deep">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

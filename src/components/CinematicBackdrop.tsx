import { useEffect, useRef, useState } from "react";

import type { Photo } from "@/content/images";
import { imgAttrs } from "@/lib/img";

/**
 * Cinematic hero backdrop: slow ken-burns frames that cross-dissolve on a long
 * cadence, a layered legibility stack (grade + veil + vignette + grain) and a
 * gentle parallax drift on the plate. No slider chrome, no dots, no arrows.
 */
export function CinematicBackdrop({
  frames,
  interval = 7000,
}: {
  frames: Photo[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const plate = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (frames.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % frames.length), interval);
    return () => window.clearInterval(id);
  }, [frames.length, interval]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = plate.current;
        if (!el) return;
        el.style.transform = `translate3d(0, ${Math.min(window.scrollY * 0.22, 260)}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={plate} className="absolute inset-0 -z-10 will-change-transform">
      {frames.map((f, i) => (
        <div
          key={f.id}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-[2600ms] [transition-timing-function:var(--ease-lux)]"
          style={{ opacity: i === index ? 1 : 0 }}
        >
          <img
            {...imgAttrs(f.id, f.url, "100vw")}
            alt={i === 0 ? f.alt : ""}
            decoding="async"
            fetchPriority={i === 0 ? "high" : "low"}
            loading={i === 0 ? "eager" : "lazy"}
            className="h-full w-full object-cover kenburns"
            style={{ animationDelay: `${i * -4}s` }}
          />
        </div>
      ))}

      {/* Legibility stack — grade, directional veil, vignette, grain. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, color-mix(in oklab, var(--background) 82%, transparent) 0%, color-mix(in oklab, var(--background) 42%, transparent) 52%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, color-mix(in oklab, var(--background) 55%, transparent) 32%, transparent 72%)",
        }}
      />
      <div className="absolute inset-0 opacity-70 vignette" />
      <div className="absolute inset-0 grain" />
    </div>
  );
}

/** Thin progress ticks — the only nod to the frame count, kept nearly invisible. */
export function FrameTicks({ count, active }: { count: number; active: number }) {
  return (
    <div className="flex items-center gap-2" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="h-px transition-all duration-[1200ms] [transition-timing-function:var(--ease-lux)]"
          style={{
            width: i === active ? 34 : 14,
            background: i === active ? "var(--gold)" : "var(--border-strong)",
          }}
        />
      ))}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

import type { Photo } from "@/content/images";
import { SmartImg } from "@/components/ui/SmartImg";

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
  // Furthest frame fetched so far. Only the opening frame comes with the
  // document; each later frame is fetched one step ahead of its turn, and the
  // first of them only after the page has fully loaded, so mobile never spends
  // its opening seconds on photographs nobody can see yet.
  const [reach, setReach] = useState(0);
  const [armed, setArmed] = useState(false);
  const plate = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let timer = 0;
    const arm = () => {
      timer = window.setTimeout(() => setArmed(true), 3000);
    };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => {
      window.removeEventListener("load", arm);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (armed) setReach((r) => Math.max(r, Math.min(index + 1, frames.length - 1)));
  }, [armed, index, frames.length]);

  useEffect(() => {
    if (frames.length < 2) return;
    if (!armed) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % frames.length), interval);
    return () => window.clearInterval(id);
  }, [frames.length, interval, armed]);

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
          {i <= reach && (
            <SmartImg
              id={f.id}
              fallbackUrl={f.url}
              sizes="100vw"
              alt={i === 0 ? f.alt : ""}
              priority={i === 0}
              artDirected={i === 0}
              fetchPriority={i === 0 ? "high" : "low"}
              className="h-full w-full object-cover kenburns"
              style={{ animationDelay: `${i * -4}s` }}
            />
          )}
        </div>
      ))}

      {/* Smart legibility stack — directional veil + feathered haze beneath the
          typography only, so the far side of the frame stays vivid. */}
      <div className="absolute inset-0 read-veil" />
      <div className="absolute inset-0 text-haze" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background:
            "linear-gradient(to top, var(--background) 0%, color-mix(in oklab, var(--background) 45%, transparent) 45%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 opacity-45 vignette" />
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

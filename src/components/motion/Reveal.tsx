import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealVariant = "rise" | "mask" | "fade" | "letter";

const variantClass: Record<RevealVariant, string> = {
  rise: "translate-y-8 opacity-0",
  mask: "[clip-path:inset(0_0_100%_0)] opacity-0",
  fade: "opacity-0",
  letter: "translate-y-6 opacity-0 blur-[6px]",
};

/**
 * Scroll-triggered reveal. Motion is the house language here — every block of
 * type, image and rule arrives rather than appears. Honours reduced motion by
 * simply rendering the resting state.
 */
export function Reveal({
  children,
  as,
  variant = "rise",
  delay = 0,
  duration = 1100,
  className,
  once = true,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
          } else if (!once) {
            setShown(false);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  // The clip/transform lives on an INNER element. Observing a self-clipped node
  // makes its intersection rect empty, so the observer would never fire.
  const Inner = (Tag === "span" ? "span" : "div") as ElementType;

  return (
    <Tag ref={ref as never} className={className}>
      <Inner
        className={cn(
          "will-change-[transform,opacity,clip-path]",
          Tag === "span" ? "inline-block" : "block h-full",
          shown
            ? "translate-y-0 opacity-100 blur-0 [clip-path:inset(0_0_0_0)]"
            : variantClass[variant],
        )}
        style={{
          transitionProperty: "transform, opacity, clip-path, filter",
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: "var(--ease-lux)",
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </Inner>
    </Tag>
  );
}


/** Splits a line into words and staggers them in — used for oversized headlines. */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
  step = 70,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline", className)}>
      {words.map((w, i) => (
        <Reveal
          key={`${w}-${i}`}
          as="span"
          variant="letter"
          delay={delay + i * step}
          duration={900}
          className={cn("inline-block", wordClassName)}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </Reveal>
      ))}
    </span>
  );
}

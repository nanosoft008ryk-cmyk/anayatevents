import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type RevealVariant = "rise" | "mask" | "fade" | "letter";

/**
 * Inside an opening (above-the-fold) section, reveals run as pure CSS
 * keyframes from the server-rendered HTML instead of waiting for hydration and
 * an IntersectionObserver. The motion is identical, but the headline paints
 * with the first frame, which is what LCP and FCP measure on mobile.
 */
const ImmediateReveal = createContext(false);

export function RevealOnLoad({ children }: { children: ReactNode }) {
  return <ImmediateReveal.Provider value>{children}</ImmediateReveal.Provider>;
}

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
  innerClassName,
  once = true,
  immediate = false,
  flat = false,
}: {
  children: ReactNode;
  as?: ElementType;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  /** Layout classes for the animated inner element (use for flex/grid rows). */
  innerClassName?: string;
  once?: boolean;
  /** Animate on page load with CSS alone (above-the-fold content). */
  immediate?: boolean;
  /**
   * Render a single element instead of a wrapper + animated inner, so a
   * reveal can itself be the <li> of a list or the dt/dd group of a <dl>.
   * Not for the "mask" variant, whose clip would hide it from the observer.
   */
  flat?: boolean;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const onLoad = useContext(ImmediateReveal) || immediate;

  useEffect(() => {
    if (onLoad) return;
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
  }, [once, onLoad]);

  // The clip/transform lives on an INNER element. Observing a self-clipped node
  // makes its intersection rect empty, so the observer would never fire.
  const Inner = (Tag === "span" ? "span" : "div") as ElementType;

  const loadStyle = {
    "--reveal-duration": `${duration}ms`,
    "--reveal-delay": `${delay}ms`,
  } as CSSProperties;
  const motionStyle: CSSProperties = {
    transitionProperty: "transform, opacity, clip-path, filter",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: "var(--ease-lux)",
    transitionDelay: `${delay}ms`,
  };
  const stateClass = shown
    ? "translate-y-0 opacity-100 blur-0 [clip-path:inset(0_0_0_0)]"
    : variantClass[variant];

  if (flat) {
    return onLoad ? (
      <Tag
        className={cn("reveal-load", `reveal-load-${variant}`, className, innerClassName)}
        style={loadStyle}
      >
        {children}
      </Tag>
    ) : (
      <Tag
        ref={ref as never}
        className={cn("will-change-[transform,opacity]", className, innerClassName, stateClass)}
        style={motionStyle}
      >
        {children}
      </Tag>
    );
  }

  if (onLoad) {
    return (
      <Tag className={className}>
        <Inner
          className={cn(
            "reveal-load",
            `reveal-load-${variant}`,
            Tag === "span" ? "inline-block" : "block h-full",
            innerClassName,
          )}
          style={loadStyle}
        >
          {children}
        </Inner>
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={className}>
      <Inner
        className={cn(
          "will-change-[transform,opacity,clip-path]",
          Tag === "span" ? "inline-block" : "block h-full",
          innerClassName,
          stateClass,
        )}
        style={motionStyle}
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
  immediate,
}: {
  text: string;
  immediate?: boolean;
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
          immediate={immediate}
          className={cn("inline-block", wordClassName)}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </Reveal>
      ))}
    </span>
  );
}

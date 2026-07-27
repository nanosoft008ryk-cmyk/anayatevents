import { useCallback, useRef, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

/**
 * The house button. No borders-as-boxes: a hairline that draws itself, a foil
 * sweep on hover, a magnetic pull toward the cursor and a travelling arrow.
 */
export type LuxTone = "foil" | "ghost" | "quiet" | "rule";

const toneClass: Record<LuxTone, string> = {
  foil: "text-primary-foreground",
  ghost: "text-ivory",
  quiet: "text-gold",
  rule: "text-gold",
};

function useMagnetic(strength = 12) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const y = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * (strength * 0.5)}px, 0)`;
    },
    [strength],
  );

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  }, []);

  return { ref, onMove, onLeave };
}

function Inner({ children, tone, arrow }: { children: ReactNode; tone: LuxTone; arrow: boolean }) {
  if (tone === "rule") {
    return (
      <span className="relative flex items-center gap-4">
        <span>{children}</span>
        <span
          aria-hidden
          className="h-px w-10 bg-gold transition-[width] duration-[900ms] [transition-timing-function:var(--ease-lux)] group-hover/lux:w-20"
        />
      </span>
    );
  }
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 transition-opacity duration-700",
          tone === "foil" ? "opacity-100" : "opacity-0",
        )}
        style={{ background: "var(--gradient-foil)", backgroundSize: "220% 100%" }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 bg-gold transition-transform duration-[900ms] [transition-timing-function:var(--ease-lux)] group-hover/lux:scale-x-100"
        style={{ opacity: tone === "foil" ? 0 : 0.14 }}
      />
      <span className="relative flex items-center gap-3">
        <span>{children}</span>
        {arrow && (
          <span
            aria-hidden
            className="inline-block transition-transform duration-[700ms] [transition-timing-function:var(--ease-lux)] group-hover/lux:translate-x-1.5"
          >
            &#8594;
          </span>
        )}
      </span>
    </>
  );
}

const base =
  "group/lux relative isolate inline-flex items-center justify-center overflow-hidden rounded-[18px] px-9 py-[1.15rem] font-sans text-[11px] font-normal tracking-[0.3em] uppercase transition-[transform,color,box-shadow] duration-500 [transition-timing-function:var(--ease-lux)] will-change-transform";

const ring: Record<LuxTone, string> = {
  foil: "shadow-[0_18px_50px_-28px_var(--gold)] hover:shadow-[0_26px_70px_-26px_var(--gold)]",
  ghost:
    "before:absolute before:inset-0 before:-z-10 before:rounded-[18px] before:border before:border-border-strong before:transition-colors before:duration-500 hover:before:border-gold hover:text-gold",
  quiet: "hover:text-gold-light",
  rule: "hover:text-gold-light",
};

export function LuxLink({
  to,
  params,
  children,
  tone = "ghost",
  arrow = true,
  className,
}: {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
  tone?: LuxTone;
  arrow?: boolean;
  className?: string;
}) {
  const m = useMagnetic();
  return (
    <Link
      ref={m.ref as never}
      to={to as never}
      params={params as never}
      onMouseMove={m.onMove}
      onMouseLeave={m.onLeave}
      className={cn(base, toneClass[tone], ring[tone], className)}
    >
      <Inner tone={tone} arrow={arrow}>
        {children}
      </Inner>
    </Link>
  );
}

export function LuxAnchor({
  href,
  children,
  tone = "ghost",
  arrow = true,
  external = true,
  className,
}: {
  href: string;
  children: ReactNode;
  tone?: LuxTone;
  arrow?: boolean;
  external?: boolean;
  className?: string;
}) {
  const m = useMagnetic();
  return (
    <a
      ref={m.ref as never}
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      onMouseMove={m.onMove}
      onMouseLeave={m.onLeave}
      className={cn(base, toneClass[tone], ring[tone], className)}
    >
      <Inner tone={tone} arrow={arrow}>
        {children}
      </Inner>
    </a>
  );
}

/** Inline text link with a drawing gold rule — used for section "more" links. */
export function LuxTextLink({
  to,
  children,
  className,
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to as never}
      className={cn(
        "group/txt relative inline-flex items-center gap-3 font-sans text-[11px] tracking-[0.3em] uppercase text-gold transition-colors hover:text-gold-light",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-[800ms] [transition-timing-function:var(--ease-lux)] group-hover/txt:origin-left group-hover/txt:scale-x-100" />
      </span>
      <span className="transition-transform duration-[700ms] [transition-timing-function:var(--ease-lux)] group-hover/txt:translate-x-1.5">
        &#8594;
      </span>
    </Link>
  );
}

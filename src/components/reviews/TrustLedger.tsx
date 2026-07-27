import { useEffect, useRef, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { GoogleMark, Stars } from "./review-parts";

/**
 * Counts up to a live value once, when the number scrolls into view. Reduced
 * motion gets the final figure immediately.
 */
function useCountUp(target: number, duration = 1400) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // Quiet deceleration — the number settles rather than snaps.
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(target * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return { ref, value };
}

function Figure({
  value,
  decimals = 0,
  suffix,
  label,
  detail,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
  detail: string;
}) {
  const { ref, value: shown } = useCountUp(value);
  return (
    <div className="min-w-0">
      <p className="font-display text-[3.4rem] leading-[0.95] font-light text-ivory md:text-[5rem]">
        <span ref={ref}>{shown.toFixed(decimals)}</span>
        {suffix ? <span className="text-gold">{suffix}</span> : null}
      </p>
      <p className="mt-5 font-sans text-[10px] tracking-[0.34em] uppercase text-gold-deep">
        {label}
      </p>
      <p className="mt-3 max-w-[26ch] font-sans text-[13px] leading-[1.9] font-light text-muted-foreground">
        {detail}
      </p>
    </div>
  );
}

/**
 * The live trust ledger: rating, volume and provenance, read straight from the
 * Google Business Profile payload the page already loaded.
 */
export function TrustLedger({
  rating,
  ratingCount,
  shownCount,
  stale,
  mapsUri,
}: {
  rating: string;
  ratingCount: number;
  shownCount: number;
  stale: boolean;
  mapsUri: string;
}) {
  return (
    <section aria-labelledby="trust-ledger" className="border-t border-border">
      <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 md:py-32">
        <Reveal>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 sm:flex sm:flex-wrap sm:justify-between">
            <h2
              id="trust-ledger"
              className="min-w-0 font-sans text-[10px] tracking-[0.42em] uppercase text-gold"
            >
              The standing record
            </h2>
            <p className="flex shrink-0 items-center gap-3 font-sans text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${stale ? "bg-border-strong" : "bg-gold pulse"}`}
              />
              {stale ? "Last known figures" : "Live from Google"}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-16 md:grid-cols-3 md:gap-12">
          <Reveal>
            <div>
              <p className="font-display text-[3.4rem] leading-[0.95] font-light text-ivory md:text-[5rem]">
                {rating}
              </p>
              <div className="mt-6">
                <Stars rating={Number(rating)} size="lg" />
              </div>
              <p className="mt-5 font-sans text-[10px] tracking-[0.34em] uppercase text-gold-deep">
                Overall rating
              </p>
              <p className="mt-3 max-w-[26ch] font-sans text-[13px] leading-[1.9] font-light text-muted-foreground">
                Averaged by Google across every rating the profile has ever received.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Figure
              value={ratingCount}
              label="Ratings on Google"
              detail="Every one left by a client, on a profile we cannot edit."
            />
          </Reveal>

          <Reveal delay={220}>
            <Figure
              value={shownCount}
              label="Reviews published here"
              detail="Google exposes its most relevant written reviews through the API; the rest live on the profile."
            />
          </Reveal>
        </div>

        <Reveal delay={300}>
          <a
            href={mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-16 inline-flex items-center gap-4 border border-border-strong px-7 py-4 transition-colors duration-700 hover:border-gold"
          >
            <GoogleMark className="h-4 w-4 text-gold" />
            <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-ivory transition-colors group-hover:text-gold">
              Verified Google Business Profile
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";

import { locations } from "@/content/locations";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Coverage map. Deliberately not a default Google Maps embed: the tiles are
 * graded to the house palette behind a veil, and the served areas are read as
 * a typographic constellation over it rather than as pins.
 */

/** Rough relative placement of each area, purely for the visual constellation. */
const marks: Record<string, { x: number; y: number }> = {
  lahore: { x: 44, y: 42 },
  gulberg: { x: 40, y: 38 },
  "model-town": { x: 36, y: 52 },
  "johar-town": { x: 26, y: 50 },
  "wapda-town": { x: 24, y: 60 },
  "cantt-askari": { x: 54, y: 40 },
  "dha-lahore": { x: 62, y: 50 },
  "bahria-town-lahore": { x: 22, y: 74 },
  "raiwind-road": { x: 32, y: 82 },
  "bedian-road": { x: 76, y: 66 },
  "green-acres": { x: 70, y: 74 },
};

export function CoverageMap() {
  const [active, setActive] = useState<string>("green-acres");
  const activeArea = useMemo(
    () => locations.find((l) => l.slug === active) ?? locations[0],
    [active],
  );

  return (
    <section aria-labelledby="coverage-heading" className="relative isolate border-t border-border">
      <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
        <Reveal>
          <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
            Coverage
          </p>
        </Reveal>
        <Reveal delay={120} variant="mask">
          <h2
            id="coverage-heading"
            className="mt-8 max-w-[20ch] font-display text-[2.4rem] leading-[1.03] font-light text-ivory lg:text-[3.8rem]"
          >
            One base. The whole city within reach.
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-8 max-w-2xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
            Every crew, truck and floral delivery leaves from {site.address.street},{" "}
            {site.address.locality}. The constellation below marks the areas we regularly
            travel to — not additional premises.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
          {/* The graded plate */}
          <div className="relative aspect-[5/4] w-full overflow-hidden border border-border">
            <iframe
              src={site.mapEmbed}
              title="Anayat Events & Catering coverage across Lahore"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full [filter:grayscale(1)_invert(0.92)_sepia(0.42)_saturate(0.5)_contrast(0.92)_brightness(0.62)]"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 90% at 50% 40%, transparent 20%, color-mix(in oklab, var(--background) 78%, transparent) 78%, var(--background) 100%)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 grain" />

            {/* Typographic constellation */}
            <div className="absolute inset-0">
              {locations.map((l) => {
                const m = marks[l.slug];
                if (!m) return null;
                const on = l.slug === active;
                return (
                  <button
                    key={l.slug}
                    type="button"
                    onMouseEnter={() => setActive(l.slug)}
                    onFocus={() => setActive(l.slug)}
                    onClick={() => setActive(l.slug)}
                    aria-pressed={on}
                    className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[9px] tracking-[0.24em] uppercase transition-colors duration-500"
                    style={{ left: `${m.x}%`, top: `${m.y}%` }}
                  >
                    <span
                      className={
                        on
                          ? "inline-flex items-center gap-2 text-gold"
                          : "inline-flex items-center gap-2 text-muted-foreground hover:text-ivory"
                      }
                    >
                      <span
                        className={
                          on
                            ? "h-[7px] w-[7px] rounded-full bg-gold shadow-[0_0_0_5px_color-mix(in_oklab,var(--gold)_22%,transparent)]"
                            : "h-[5px] w-[5px] rounded-full bg-border-strong"
                        }
                      />
                      {l.shortName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Read-out */}
          <div className="flex flex-col justify-center">
            <p className="font-sans text-[10px] tracking-[0.38em] uppercase text-gold-deep">
              {activeArea.heroKicker}
            </p>
            <h3 className="mt-6 font-display text-[2.2rem] leading-[1.08] font-light text-ivory lg:text-[3rem]">
              {activeArea.shortName}
            </h3>
            <p className="mt-6 max-w-md font-sans text-[15px] leading-[2] font-light text-muted-foreground">
              {activeArea.lede}
            </p>
            <p className="mt-6 max-w-md font-sans text-[13px] leading-[2] font-light text-muted-foreground/80">
              {activeArea.travelNote}
            </p>
            <Link
              to="/areas/$slug"
              params={{ slug: activeArea.slug }}
              className="group mt-10 inline-flex items-center gap-3 self-start font-sans text-[11px] tracking-[0.3em] uppercase text-gold transition-colors hover:text-gold-light"
            >
              <span className="relative">
                Open {activeArea.shortName}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-[800ms] [transition-timing-function:var(--ease-lux)] group-hover:origin-left group-hover:scale-x-100" />
              </span>
              <span className="transition-transform duration-[700ms] group-hover:translate-x-1.5">
                &#8594;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { locations } from "@/content/locations";
import { photo } from "@/content/images";
import { imgAttrs } from "@/lib/img";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Interactive area explorer. A single large photographic plate on the left
 * cross-dissolves as the reader moves through an editorial list on the right —
 * no cards, no boxes, no grid of tiles.
 */
export function AreaExplorer() {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="explorer-heading" className="relative isolate">
      <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
        <Reveal>
          <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
            The explorer
          </p>
        </Reveal>
        <Reveal delay={120} variant="mask">
          <h2
            id="explorer-heading"
            className="mt-8 max-w-[18ch] font-display text-[2.4rem] leading-[1.03] font-light text-ivory lg:text-[3.8rem]"
          >
            Choose a part of the city.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          {/* Plate */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                {locations.map((l, i) => {
                  const img = photo(l.hero);
                  return (
                    <img
                      key={l.slug}
                      {...imgAttrs(l.hero, img.url, "(min-width: 1024px) 44vw, 100vw")}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      aria-hidden={i !== active}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] [transition-timing-function:var(--ease-lux)]"
                      style={{ opacity: i === active ? 1 : 0 }}
                    />
                  );
                })}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/20" />
                <div className="pointer-events-none absolute inset-0 grain" />
              </div>
              <p className="mt-5 max-w-sm font-sans text-[11px] leading-[1.9] tracking-[0.14em] uppercase text-muted-foreground">
                {locations[active].shortName} — {locations[active].heroKicker}
              </p>
            </div>
          </div>

          {/* List */}
          <ul className="divide-y divide-border border-y border-border">
            {locations.map((l, i) => (
              <li key={l.slug}>
                <Link
                  to="/areas/$slug"
                  params={{ slug: l.slug }}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex items-start gap-6 py-8 transition-colors md:py-10"
                >
                  <span className="mt-2 font-sans text-[10px] tracking-[0.3em] text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-[1.9rem] leading-[1.1] font-light text-ivory transition-colors duration-700 group-hover:text-gold md:text-[2.6rem]">
                      {l.shortName}
                    </span>
                    <span className="mt-3 block max-w-xl font-sans text-[14px] leading-[1.9] font-light text-muted-foreground">
                      {l.lede}
                    </span>
                  </span>
                  <span className="mt-3 shrink-0 text-gold transition-transform duration-[800ms] [transition-timing-function:var(--ease-lux)] group-hover:translate-x-2">
                    &#8594;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

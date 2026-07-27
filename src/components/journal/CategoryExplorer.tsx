import { useState } from "react";
import { Link } from "@tanstack/react-router";

import { journalCategories, articlesInCategory } from "@/content/journal";
import { photo } from "@/content/images";
import { SmartImg } from "@/components/ui/SmartImg";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Category explorer. A typographic index on the left; the plate on the right
 * cross-dissolves to the hovered department. No cards, no tiles.
 */
export function CategoryExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center">
      <ul className="order-2 lg:order-1">
        {journalCategories.map((c, i) => {
          const count = articlesInCategory(c.category).length;
          return (
            <li key={c.slug} className="border-t border-border last:border-b">
              <Link
                to="/journal/category/$slug"
                params={{ slug: c.slug }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group/cat flex items-baseline justify-between gap-8 py-7 md:py-9"
              >
                <span className="flex items-baseline gap-6">
                  <span className="font-sans text-[10px] tracking-[0.34em] uppercase text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-3xl leading-none font-light transition-all duration-[900ms] [transition-timing-function:var(--ease-lux)] md:text-5xl ${
                      active === i
                        ? "translate-x-2 text-gold italic"
                        : "text-ivory group-hover/cat:text-gold-light"
                    }`}
                  >
                    {c.name}
                  </span>
                </span>
                <span className="shrink-0 font-sans text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                  {count} {count === 1 ? "story" : "stories"}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <Reveal variant="mask" className="order-1 lg:order-2">
        <div className="relative aspect-[4/5] overflow-hidden">
          {journalCategories.map((c, i) => {
            const p = photo(c.heroFrames[0]);
            return (
              <SmartImg
                key={c.slug}
                id={p.id} fallbackUrl={p.url} sizes="(min-width: 1024px) 40vw
                alt={i === 0 ? p.alt : ""}
                aria-hidden={i !== active}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] [transition-timing-function:var(--ease-lux)]"
                style={{ opacity: i === active ? 1 : 0 }}
              />
            );
          })}
          <span className="pointer-events-none absolute inset-0 vignette opacity-70" />
          <span className="pointer-events-none absolute inset-0 grain" />
          <p className="absolute bottom-6 left-6 max-w-[22ch] font-display text-lg leading-snug font-light italic text-ivory/90">
            {journalCategories[active].kicker}
          </p>
        </div>
      </Reveal>
    </div>
  );
}

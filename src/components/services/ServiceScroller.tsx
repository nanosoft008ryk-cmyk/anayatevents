import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";

import type { Service } from "@/content/services";
import { photo } from "@/content/images";
import { imgAttrs } from "@/lib/img";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Immersive service explorer. Each discipline holds most of a viewport; the
 * cinematic plate on the left cross-dissolves as the reader travels down the
 *column of names. No cards, no grid, no repeated block.
 */
export function ServiceScroller({ items }: { items: Service[] }) {
  const [active, setActive] = useState(0);
  const nodes = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );
    for (const el of nodes.current) if (el) io.observe(el);
    return () => io.disconnect();
  }, [items.length]);

  return (
    <div className="relative">
      <div className="mx-auto grid max-w-[92rem] gap-0 px-6 md:px-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        {/* Sticky cinematic plate — desktop only */}
        <div className="hidden lg:block">
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative aspect-[3/4] w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_88%,transparent)]">
              {items.map((s, i) => {
                const img = photo(s.hero);
                return (
                  <img
                    key={`${s.slug}-plate`}
                    {...imgAttrs(img.id, img.url, "45vw")}
                    alt={img.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] [transition-timing-function:var(--ease-lux)] ${
                      i === active ? "scale-100 opacity-100" : "scale-[1.08] opacity-0"
                    }`}
                  />
                );
              })}
              <span className="pointer-events-none absolute inset-0 vignette" />
              <span className="pointer-events-none absolute inset-0 grain" />
              <span className="pointer-events-none absolute bottom-8 left-8 font-display text-[5rem] leading-none font-light text-ivory/12">
                {String(active + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {/* Thecolumn of experiences */}
        <div>
          {items.map((s, i) => {
            const img = photo(s.hero);
            const offset = i % 3;
            return (
              <section
                key={s.slug}
                data-index={i}
                ref={(el) => {
                  nodes.current[i] = el;
                }}
                className="flex min-h-[78vh] flex-col justify-center py-16 lg:min-h-[86vh] lg:py-0"
                aria-labelledby={`svc-${s.slug}`}
              >
                <Reveal variant="fade" duration={900}>
                  <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
                    {String(i + 1).padStart(2, "0")} · {s.family}
                  </p>
                </Reveal>

                {/* Mobile plate — edge-to-edge, never boxed */}
                <div className="relative -mx-6 mt-6 lg:hidden">
                  <img
                    {...imgAttrs(img.id, img.url, "100vw")}
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[5/4] w-full object-cover [mask-image:linear-gradient(to_bottom,black_72%,transparent)]"
                  />
                </div>

                <Reveal variant="mask" duration={1200}>
                  <h3
                    id={`svc-${s.slug}`}
                    className="mt-5 font-display text-[2.6rem] leading-[0.98] font-light text-ivory sm:text-6xl lg:text-[4.2rem]"
                    style={{ marginLeft: `${offset * 1.6}rem` }}
                  >
                    {s.name}
                  </h3>
                </Reveal>

                <Reveal variant="rise" delay={90}>
                  <p
                    className="mt-6 max-w-xl font-sans text-[15px] leading-[1.95] font-light text-ivory/70"
                    style={{ marginLeft: `${offset * 1.6}rem` }}
                  >
                    {s.lede}
                  </p>
                </Reveal>

                <Reveal variant="fade" delay={160}>
                  <div style={{ marginLeft: `${offset * 1.6}rem` }}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group/exp mt-8 inline-flex items-center gap-4 font-sans text-[10px] tracking-[0.36em] uppercase text-gold transition-colors duration-500 hover:text-gold-light"
                    >
                      <span className="h-px w-10 bg-gold transition-all duration-[800ms] [transition-timing-function:var(--ease-lux)] group-hover/exp:w-20" />
                      Enter {s.navLabel}
                    </Link>
                  </div>
                </Reveal>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}

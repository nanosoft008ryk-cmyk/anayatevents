import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { photo } from "@/content/images";
import { journeyPage } from "@/content/about";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CtaBand } from "@/components/CtaBand";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

const PATH = "/about/journey";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Our Journey", path: PATH },
];

export const Route = createFileRoute("/about/journey")({
  head: () => ({
    ...pageMeta({
      title: "Our Journey — Nine Years Of Lahore Evenings, Year By Year",
      description:
        "From a borrowed lawn in 2016 to a workshop, kitchen and floral bench under one roof: the milestones that shaped how Anayat Events builds a celebration.",
      path: PATH,
      image: photo("ae-10").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "Our journey",
          path: PATH,
          items: journeyPage.milestones.map((m) => ({ name: `${m.year} — ${m.title}`, path: PATH })),
        }),
      ),
    ],
  }),
  component: JourneyPage,
});

function JourneyPage() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const i = refs.current.indexOf(e.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="bg-background">
      {/* ── Hero: a running year ticker, minimal image ──────────────────── */}
      <section className="relative isolate mx-auto max-w-[92rem] px-6 pt-36 pb-16 md:px-12 md:pt-48">
        <HeroBackdrop id="ae-05" priority />
        <Breadcrumbs trail={trail} className="mb-12" />
        <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
          {journeyPage.hero.eyebrow}
        </p>
        <h1 className="mt-9 max-w-[19ch] font-display text-[2.7rem] leading-[1] font-light text-ivory sm:text-5xl lg:text-[5.6rem]">
          <RevealWords text={journeyPage.hero.title} />
        </h1>
        <Reveal delay={520}>
          <div className="mt-5 flex flex-wrap items-baseline gap-x-8 gap-y-3 border-t border-border pt-8">
            {journeyPage.milestones.map((m) => (
              <span
                key={m.year}
                className="font-display text-lg font-light text-muted-foreground/60 lg:text-xl"
              >
                {m.year}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Cinematic timeline: sticky year, drifting milestone plates ──── */}
      <section className="relative">
        <div className="mx-auto grid max-w-[92rem] gap-0 px-6 md:px-12 lg:grid-cols-[0.36fr_1fr] lg:gap-20">
          {/* Sticky year column */}
          <div className="hidden lg:block">
            <div className="sticky top-0 flex h-screen flex-col justify-center">
              <p
                key={journeyPage.milestones[active].year}
                className="font-display text-[7rem] leading-none font-light text-foil"
              >
                {journeyPage.milestones[active].year}
              </p>
              <p className="mt-6 font-sans text-[10px] tracking-[0.4em] uppercase text-gold-deep">
                {journeyPage.milestones[active].marker}
              </p>
              <div className="mt-10 flex flex-col gap-2">
                {journeyPage.milestones.map((m, i) => (
                  <span
                    key={m.year}
                    className="h-px transition-all duration-[900ms] [transition-timing-function:var(--ease-lux)]"
                    style={{
                      width: i === active ? 88 : 26,
                      background: i === active ? "var(--gold)" : "var(--border-strong)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Milestones */}
          <ol>
            {journeyPage.milestones.map((m, i) => (
              <li
                key={m.year}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="flex min-h-[78svh] flex-col justify-center py-16"
              >
                <div className={i % 2 ? "lg:pl-24" : ""}>
                  <p className="font-display text-4xl font-light text-gold lg:hidden">{m.year}</p>
                  <Reveal>
                    <p className="mt-4 font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep lg:mt-0">
                      {m.marker}
                    </p>
                  </Reveal>
                  <Reveal delay={80} variant="mask">
                    <h2 className="mt-6 max-w-[16ch] font-display text-[2rem] leading-[1.08] font-light text-ivory lg:text-[3.1rem]">
                      {m.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={160}>
                    <p className="mt-7 max-w-lg font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
                      {m.body}
                    </p>
                  </Reveal>
                  <Reveal delay={220} variant="mask" className="mt-12">
                    <Plate
                      image={photo(m.photo)}
                      ratio={i % 3 === 0 ? "16/10" : i % 3 === 1 ? "4/3" : "5/4"}
                      speed={i % 2 ? -9 : 9}
                      fade={i % 4 === 3 ? "sides" : undefined}
                      caption
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className={i % 3 === 2 ? "lg:max-w-[78%]" : ""}
                    />
                  </Reveal>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] px-6 py-24 md:px-12">
        <div className="flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-10">
          <LuxTextLink to="/services">What the house does today</LuxTextLink>
          <LuxTextLink to="/about/team">The people behind it</LuxTextLink>
          <LuxTextLink to="/reviews">What families wrote</LuxTextLink>
        </div>
      </section>

      <CtaBand
        eyebrow="The next entry"
        title="The next year is written with someone's evening."
        body="It could be yours. Send the date and we will tell you honestly whether we can do it properly."
      />
      <RelatedConstellation path="/about/journey" heading="Continue" />
    </main>
  );
}

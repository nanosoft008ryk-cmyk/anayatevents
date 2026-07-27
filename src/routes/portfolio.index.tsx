import { createFileRoute, Link } from "@tanstack/react-router";

import {
  portfolioCategories,
  portfolioProjects,
  getPortfolioProject,
  signatureProjectSlug,
} from "@/content/portfolio";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

const PATH = "/portfolio";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: PATH },
];

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    ...pageMeta({
      title: "Event Portfolio — Lahore Weddings & Celebrations | Anayat Events",
      description:
        "Photographic portfolio from Anayat Events Lahore — wedding stages, floral installations, mehndi celebrations, farmhouse builds, dining, lounges and nikah ceremonies.",
      path: PATH,
      image: photo("ae-13").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "Portfolio collections",
          path: PATH,
          items: portfolioCategories.map((c) => ({
            name: c.name,
            path: `/portfolio/${c.slug}`,
          })),
        }),
      ),
    ],
  }),
  component: PortfolioIndex,
});

function PortfolioIndex() {
  const signature = getPortfolioProject(signatureProjectSlug)!;
  const heroFrames = ["ae-13", "ae-10", "ae-16", "ae-23"].map(photo);
  const caseStudies = portfolioProjects.filter((p) => p.slug !== signature.slug).slice(0, 4);

  return (
    <main className="bg-background">
      {/* I — Cinematic opening */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden">
        <CinematicBackdrop frames={heroFrames} interval={7600} />
        <div className="mx-auto w-full max-w-7xl px-6 pb-40 md:px-10 md:pb-48">
          <Reveal variant="fade" duration={1400}>
            <div className="flex items-center gap-5">
              <span aria-hidden className="h-px w-16 bg-gold" />
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                The Portfolio
              </p>
            </div>
          </Reveal>

          <h1 className="mt-10 max-w-5xl font-display text-[13vw] leading-[0.88] font-light text-ivory md:text-[7.5vw]">
            <RevealWords text="Rooms we built," delay={120} />
            <span className="block italic text-foil">
              <RevealWords text="photographed as they stood." delay={340} />
            </span>
          </h1>

          <Reveal variant="rise" delay={700} className="mt-5">
            <p className="max-w-xl font-sans text-[15px] leading-[1.9] font-light text-muted-foreground">
              Eight collections and seven case studies, drawn entirely from our own archive. No
              stock photography, no borrowed sets — every frame is a room this crew built in Lahore
              and struck the next morning.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pt-10 md:px-10">
        <Breadcrumbs trail={trail} />
      </div>

      {/* II — Signature project */}
      <section className="relative overflow-hidden pt-24 md:pt-36">
        <p
          aria-hidden
          className="pointer-events-none absolute -top-6 left-0 font-display text-[22vw] leading-none font-light text-ivory/[0.03] select-none"
        >
          Signature
        </p>
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-7">
            <Reveal variant="mask" duration={1500}>
              <Plate
                image={photo(signature.hero)}
                ratio="16/11"
                speed={0.18}
                fade="sides"
                sizes="(min-width: 768px) 58vw, 100vw"
              />
            </Reveal>
          </div>
          <div className="flex flex-col justify-center md:col-span-5">
            <Reveal variant="rise">
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
                Signature project
              </p>
            </Reveal>
            <Reveal variant="rise" delay={120}>
              <h2 className="mt-7 font-display text-4xl leading-[1.04] font-light text-ivory md:text-6xl">
                {signature.title}
              </h2>
            </Reveal>
            <Reveal variant="rise" delay={220}>
              <p className="mt-6 font-display text-xl leading-relaxed font-light italic text-muted-foreground">
                {signature.lede}
              </p>
            </Reveal>
            <Reveal variant="fade" delay={320}>
              <dl className="mt-10 grid grid-cols-2 gap-y-7">
                {signature.highlights.map((h) => (
                  <div key={h.label}>
                    <dt className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                      {h.label}
                    </dt>
                    <dd className="mt-2 font-display text-3xl font-light text-gold">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal variant="fade" delay={420}>
              <Link
                to="/portfolio/project/$slug"
                params={{ slug: signature.slug }}
                className="group mt-12 inline-flex items-center gap-4 font-sans text-[11px] tracking-[0.28em] uppercase text-gold"
              >
                Read the case study
                <span
                  aria-hidden
                  className="h-px w-10 bg-gold transition-[width] duration-[900ms] [transition-timing-function:var(--ease-lux)] group-hover:w-20"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* III — Collections, editorial alternating */}
      <section className="pt-32 md:pt-48">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal variant="rise">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
              Eight collections
            </p>
          </Reveal>
          <Reveal variant="rise" delay={100}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.06] font-light text-ivory md:text-6xl">
              A body of work, sorted by <span className="italic">the thing it does.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-20 space-y-28 md:space-y-40">
          {portfolioCategories.map((c, i) => {
            const flip = i % 2 === 1;
            const second = photo(c.heroFrames[1] ?? c.hero);
            return (
              <article key={c.slug} className="mx-auto max-w-7xl px-6 md:px-10">
                <div
                  className={`grid items-center gap-10 md:grid-cols-12 ${flip ? "md:[direction:rtl]" : ""}`}
                >
                  <div className={`md:col-span-7 ${flip ? "md:[direction:ltr]" : ""}`}>
                    <Link
                      to="/portfolio/$slug"
                      params={{ slug: c.slug }}
                      className="group block"
                      aria-label={c.name}
                    >
                      <Reveal variant="mask" duration={1400}>
                        <Plate
                          image={photo(c.hero)}
                          ratio={i % 3 === 0 ? "16/10" : "5/4"}
                          speed={0.14}
                          sizes="(min-width: 768px) 56vw, 100vw"
                        />
                      </Reveal>
                    </Link>
                  </div>

                  <div
                    className={`md:col-span-5 ${flip ? "md:[direction:ltr] md:pr-10" : "md:pl-10"}`}
                  >
                    <Reveal variant="rise">
                      <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-deep">
                        {String(i + 1).padStart(2, "0")} — {c.kicker}
                      </p>
                    </Reveal>
                    <Reveal variant="rise" delay={90}>
                      <h3 className="mt-6 font-display text-3xl leading-[1.06] font-light text-ivory md:text-5xl">
                        <Link
                          to="/portfolio/$slug"
                          params={{ slug: c.slug }}
                          className="transition-colors hover:text-gold"
                        >
                          {c.name}
                        </Link>
                      </h3>
                    </Reveal>
                    <Reveal variant="rise" delay={170}>
                      <p className="mt-5 max-w-md font-display text-lg leading-relaxed font-light italic text-muted-foreground">
                        {c.lede}
                      </p>
                    </Reveal>
                    <Reveal variant="fade" delay={260}>
                      <div className="mt-8 flex items-center gap-6">
                        <Link
                          to="/portfolio/$slug"
                          params={{ slug: c.slug }}
                          className="group inline-flex items-center gap-4 font-sans text-[11px] tracking-[0.26em] uppercase text-gold"
                        >
                          Enter collection
                          <span
                            aria-hidden
                            className="h-px w-9 bg-gold transition-[width] duration-[900ms] [transition-timing-function:var(--ease-lux)] group-hover:w-16"
                          />
                        </Link>
                        <span className="font-sans text-[10px] tracking-[0.26em] uppercase text-muted-foreground">
                          {c.photos.length} frames
                        </span>
                      </div>
                    </Reveal>

                    <Reveal variant="fade" delay={340} className="mt-10 hidden md:block">
                      <Plate
                        image={second}
                        ratio="4/3"
                        className="max-w-[15rem]"
                        sizes="240px"
                      />
                    </Reveal>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* IV — Case studies index */}
      <section className="mt-36 md:mt-52">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal variant="rise">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
              Case studies
            </p>
          </Reveal>
          <Reveal variant="rise" delay={100}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.06] font-light text-ivory md:text-6xl">
              Single evenings, <span className="italic">told properly.</span>
            </h2>
          </Reveal>

          <ul className="mt-16 divide-y divide-border border-y border-border">
            {caseStudies.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/portfolio/project/$slug"
                  params={{ slug: p.slug }}
                  className="group grid items-center gap-6 py-10 md:grid-cols-12"
                >
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep md:col-span-2">
                    {p.eventType}
                  </span>
                  <span className="font-display text-3xl font-light text-ivory transition-colors group-hover:text-gold md:col-span-5 md:text-4xl">
                    {p.title}
                  </span>
                  <span className="font-sans text-sm leading-relaxed font-light text-muted-foreground md:col-span-4">
                    {p.subtitle}
                  </span>
                  <span
                    aria-hidden
                    className="justify-self-start text-gold transition-transform duration-700 group-hover:translate-x-2 md:col-span-1 md:justify-self-end"
                  >
                    &#8594;
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            to="/vault"
            className="btn-shape mt-16 inline-flex items-center border border-gold px-8 py-4 font-sans text-[11px] tracking-[0.24em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Enter the Vault — full archive
          </Link>
        </div>
      </section>

      <div className="mt-32 md:mt-44">
        <CtaBand />
      </div>
    </main>
  );
}

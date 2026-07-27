import { createFileRoute, Link } from "@tanstack/react-router";

import { site } from "@/content/site";
import { photo, photosByIds } from "@/content/images";
import { aboutChapters, aboutIntro, pillars } from "@/content/about";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CtaBand } from "@/components/CtaBand";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxLink, LuxTextLink } from "@/components/ui/LuxButton";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

const PATH = "/about";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
];

export const Route = createFileRoute("/about/")({
  head: () => ({
    ...pageMeta({
      title: "About Anayat Events — We Don't Plan Events, We Build Memories",
      description:
        "The soul of a Lahore event house: why we exist, what we believe and how design, fabrication, florals and the kitchen live under one roof. Ten chapters of the brand.",
      path: PATH,
      image: photo("ae-02").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "The Anayat Events brand chapters",
          path: PATH,
          items: aboutChapters.map((c) => ({ name: c.title, path: c.to })),
        }),
      ),
    ],
  }),
  component: AboutHub,
});

function AboutHub() {
  const frames = photosByIds(["ae-02", "ae-24", "ae-10", "ae-17"]);

  return (
    <main className="bg-background">
      {/* ── Hero: cinematic, typography as architecture ─────────────────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <CinematicBackdrop frames={frames} interval={7600} />

        <div className="mx-auto w-full max-w-[92rem] px-6 pt-40 pb-20 md:px-12 md:pb-28">
          <Breadcrumbs trail={trail} className="mb-10" />
          <div className="flex items-start gap-6 md:gap-10">
            <span aria-hidden className="mt-4 hidden h-28 w-px bg-gradient-to-b from-gold to-transparent md:block" />
            <div>
              <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
                Est. {site.founded} · Lahore · {aboutIntro.eyebrow}
              </p>
              <h1 className="mt-9 max-w-[18ch] font-display text-[2.9rem] leading-[0.98] font-light text-ivory sm:text-6xl lg:text-[6.4rem]">
                <RevealWords text={aboutIntro.heading[0]} />
                <span className="mt-3 block italic text-foil">
                  <RevealWords text={aboutIntro.heading[1]} delay={280} />
                </span>
              </h1>
              <Reveal delay={620}>
                <p className="mt-5 max-w-xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
                  {aboutIntro.lede}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Brand introduction: an editorial column, no boxes ───────────── */}
      <section className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
        <div className="grid gap-16 lg:grid-cols-[0.42fr_1fr] lg:gap-28">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
              Why we exist
            </p>
            <p className="mt-8 font-display text-2xl leading-[1.35] font-light italic text-ivory">
              People remember feelings. Never decorations.
            </p>
          </Reveal>

          <div>
            {aboutIntro.body.map((p, i) => (
              <Reveal key={i} delay={i * 110}>
                <p
                  className={
                    i === 0
                      ? "font-display text-2xl leading-[1.6] font-light text-ivory md:text-[2rem] md:leading-[1.55]"
                      : "mt-9 font-sans text-[15px] leading-[2.1] font-light text-muted-foreground"
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={420}>
              <p className="mt-14 font-display text-3xl font-light italic text-gold">
                {aboutIntro.signature}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Pillars: six full-width compositions, alternating rhythm ────── */}
      <section aria-label="What we believe">
        {pillars.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <div key={p.index} className="relative">
              <div
                className={`mx-auto grid max-w-[92rem] items-center gap-10 px-6 py-16 md:px-12 lg:gap-24 lg:py-24 ${
                  flip ? "lg:grid-cols-[1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1fr]"
                }`}
              >
                <div className={flip ? "lg:order-2" : ""}>
                  <Reveal variant="mask">
                    <Plate
                      image={photo(p.photo)}
                      ratio={i % 3 === 0 ? "4/5" : i % 3 === 1 ? "5/4" : "1/1"}
                      speed={i % 2 ? -8 : 8}
                      caption
                      sizes="(min-width: 1024px) 45vw, 100vw"
                    />
                  </Reveal>
                </div>

                <div className={flip ? "lg:order-1 lg:pr-10" : "lg:pl-10"}>
                  <Reveal>
                    <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
                      {p.index} — {p.note}
                    </p>
                  </Reveal>
                  <Reveal delay={90} variant="mask">
                    <p className="mt-6 font-display text-[3.4rem] leading-[0.9] font-light text-ivory/12 sm:text-[5rem] lg:text-[7rem]">
                      {p.word}
                    </p>
                  </Reveal>
                  <Reveal delay={160}>
                    <h2 className="-mt-6 font-display text-3xl leading-[1.1] font-light text-ivory lg:text-[2.9rem]">
                      {p.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={230}>
                    <p className="mt-7 max-w-lg font-sans text-[15px] leading-[2] font-light text-muted-foreground">
                      {p.body}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── Explore the brand: chapters as an index, not cards ──────────── */}
      <section className="relative isolate overflow-hidden py-28 lg:py-40">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Explore the house
            </p>
          </Reveal>
          <Reveal delay={100} variant="mask">
            <h2 className="mt-8 max-w-[20ch] font-display text-[2.4rem] leading-[1.03] font-light text-ivory lg:text-[4.2rem]">
              Ten chapters. Read them in any order.
            </h2>
          </Reveal>

          <ol className="mt-16 border-t border-border">
            {aboutChapters.map((c, i) => (
              <li key={c.slug} className="group/ch border-b border-border">
                <Link
                  to={c.to}
                  className="grid items-baseline gap-y-3 py-8 md:grid-cols-[5rem_1fr_1.1fr_3rem] md:gap-x-8 md:py-10"
                >
                  <span className="font-display text-lg font-light text-gold-deep">{c.index}</span>
                  <span className="font-display text-2xl leading-tight font-light text-ivory transition-colors duration-500 group-hover/ch:text-gold md:text-[2rem]">
                    {c.title}
                  </span>
                  <span className="max-w-md font-sans text-[13px] leading-[1.95] font-light text-muted-foreground">
                    {c.line}
                  </span>
                  <span
                    aria-hidden
                    className="justify-self-start font-sans text-gold opacity-0 transition-all duration-[700ms] [transition-timing-function:var(--ease-lux)] group-hover/ch:translate-x-2 group-hover/ch:opacity-100 md:justify-self-end"
                  >
                    &#8594;
                  </span>
                  <span className="sr-only">{c.kicker}</span>
                </Link>
                {i === 3 && (
                  <div className="pointer-events-none hidden" aria-hidden />
                )}
              </li>
            ))}
          </ol>

          <div className="mt-14 flex flex-wrap gap-4">
            <LuxLink to="/about/story" tone="foil">
              Begin with our story
            </LuxLink>
            <LuxTextLink to="/portfolio">See the work</LuxTextLink>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Let's begin"
        title="Let's create something extraordinary."
        body="Tell us the date and the feeling you want left behind. One planner replies personally, usually well within a day."
      />
      <RelatedConstellation path="/about" heading="Continue" />
    </main>
  );
}

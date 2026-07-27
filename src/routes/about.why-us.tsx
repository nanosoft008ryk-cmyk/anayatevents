import { createFileRoute } from "@tanstack/react-router";

import { photo } from "@/content/images";
import { whyPage } from "@/content/about";
import { site, stats } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

const PATH = "/about/why-us";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Why Choose Us", path: PATH },
];

export const Route = createFileRoute("/about/why-us")({
  head: () => ({
    ...pageMeta({
      title: "Why Choose Us — How An Anayat Evening Actually Feels",
      description:
        "One planner throughout, nothing sub-contracted, a build that finishes early and a crew still there at one in the morning. What tends to be different, without the superlatives.",
      path: PATH,
      image: photo("ae-18").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "What tends to be different",
          path: PATH,
          items: whyPage.differences.map((d) => ({ name: d.title, path: PATH })),
        }),
      ),
    ],
  }),
  component: WhyPage,
});

function WhyPage() {
  const voices = testimonials.slice(0, 3);

  return (
    <main className="bg-background">
      {/* ── Hero: split — a single quiet plate beside a wide type column ── */}
      <section className="mx-auto max-w-[92rem] px-6 pt-36 pb-20 md:px-12 md:pt-48">
        <Breadcrumbs trail={trail} className="mb-12" />
        <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-24">
          <div>
            <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
              {whyPage.hero.eyebrow}
            </p>
            <h1 className="mt-9 max-w-[17ch] font-display text-[2.7rem] leading-[0.99] font-light text-ivory sm:text-5xl lg:text-[5.4rem]">
              <RevealWords text={whyPage.hero.title} />
            </h1>
            <Reveal delay={520}>
              <p className="mt-5 max-w-xl font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
                {whyPage.hero.lede}
              </p>
            </Reveal>
          </div>

          <Reveal variant="mask" delay={200}>
            <Plate image={photo("ae-18")} ratio="4/5" speed={10} fade="bottom" sizes="30vw" />
          </Reveal>
        </div>
      </section>

      {/* ── Differences: two-column ledger — what we do / what you feel ─── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <ol>
            {whyPage.differences.map((d) => (
              <li key={d.index} className="group/d border-b border-border">
                <div className="grid gap-6 py-14 lg:grid-cols-[5rem_1.05fr_0.95fr] lg:gap-16 lg:py-20">
                  <p className="font-display text-2xl font-light text-gold-deep">{d.index}</p>

                  <div>
                    <Reveal variant="mask">
                      <h2 className="max-w-[18ch] font-display text-[1.9rem] leading-[1.1] font-light text-ivory transition-colors duration-700 group-hover/d:text-gold lg:text-[2.7rem]">
                        {d.title}
                      </h2>
                    </Reveal>
                  </div>

                  <div>
                    <Reveal delay={90}>
                      <p className="max-w-lg font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
                        {d.body}
                      </p>
                    </Reveal>
                    <Reveal delay={170}>
                      <p className="mt-7 flex items-baseline gap-4 font-display text-lg leading-[1.5] font-light italic text-gold">
                        <span aria-hidden className="h-px w-8 shrink-0 translate-y-[-0.4rem] bg-gold" />
                        {d.felt}
                      </p>
                    </Reveal>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Voices: three quotes over a dissolving plate ────────────────── */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Plate
            image={photo("ae-09")}
            ratio="21/9"
            fade="both"
            className="h-full [&>div]:h-full"
            imgClassName="brightness-[0.35]"
            sizes="100vw"
          />
        </div>
        <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              In their words · {liveRating.rating} from {liveRating.count} Google reviews
            </p>
          </Reveal>
          <div className="mt-16 grid gap-14 lg:grid-cols-3 lg:gap-16">
            {voices.map((t, i) => (
              <Reveal key={t.id} delay={i * 130}>
                <blockquote className="border-t border-gold/40 pt-8">
                  <p className="font-display text-xl leading-[1.55] font-light italic text-ivory">
                    “{t.quote}”
                  </p>
                  <footer className="mt-7 font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                    {t.name} · {t.event} · {t.area}
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quiet numbers ───────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[92rem] gap-10 px-6 py-20 md:grid-cols-4 md:px-12">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <p className="font-display text-4xl font-light text-foil lg:text-5xl">{s.value}</p>
              <p className="mt-4 font-sans text-[10px] tracking-[0.3em] uppercase text-ivory">
                {s.label}
              </p>
              <p className="mt-2 font-sans text-xs font-light text-muted-foreground">{s.sub}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] px-6 py-20 md:px-12">
        <div className="flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-10">
          <LuxTextLink to="/reviews">Read all reviews</LuxTextLink>
          <LuxTextLink to="/about/promise">What we promise in writing</LuxTextLink>
          <LuxTextLink to="/portfolio">The work</LuxTextLink>
        </div>
      </section>

      <CtaBand
        eyebrow="Decide slowly"
        title="Ask us the difficult question first."
        body="Budget, date, family logistics — whatever you are unsure of. An honest answer costs you nothing."
      />
    </main>
  );
}

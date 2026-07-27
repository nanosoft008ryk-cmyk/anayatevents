import { createFileRoute, Link } from "@tanstack/react-router";

import { services, getService } from "@/content/services";
import { photo } from "@/content/images";
import { testimonials } from "@/content/testimonials";
import { locations } from "@/content/locations";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CtaBand } from "@/components/CtaBand";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxLink } from "@/components/ui/LuxButton";
import { ServiceScroller } from "@/components/services/ServiceScroller";
import { JourneyRail } from "@/components/services/JourneyRail";
import { ThemeAtelier } from "@/components/services/ThemeAtelier";
import { imgAttrs } from "@/lib/img";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  itemListSchema,
  type Crumb,
} from "@/lib/seo";

const PATH = "/services";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: PATH },
];

const heroFrames = ["ae-22", "ae-24", "ae-13", "ae-26"].map(photo);

const journey = [
  { label: "Dream", body: "A first conversation with no spreadsheet in sight. We listen for the evening you keep describing to your family." },
  { label: "Concept", body: "A written direction — palette, materials, light, the emotional arc of each function." },
  { label: "Planning", body: "Budget architecture, dates, venue strategy and the supplier map, all signed before anything is ordered." },
  { label: "Design", body: "Elevation sketches, floral schedules and lighting plots issued as documents you can hold." },
  { label: "Preparation", body: "Fabrication in our own workshop, kitchen trials, rehearsals with the crew who will actually stand there." },
  { label: "Execution", body: "A minute-by-minute run of show, held by a named lead planner who never leaves the floor." },
  { label: "Celebration", body: "The part you are allowed to forget about entirely. Nothing reaches you but the evening itself." },
  { label: "Memory", body: "Strike, settlements, the archive of images — and a house that remembers your family the next time." },
];

const atelierThemes = [
  {
    key: "royal",
    name: "Royal",
    note: "Gilded frames, deep velvet seating, chandeliers hung low enough to warm the faces beneath them. Mughal geometry cut in fresh flowers.",
    image: "ae-13",
    palette: ["oklch(0.30 0.06 30)", "oklch(0.752 0.108 85.5)", "oklch(0.20 0.02 60)"],
  },
  {
    key: "minimal",
    name: "Minimal",
    note: "One material, repeated with discipline. Long ivory tables, unbroken candlelight, a stage that is architecture rather than decoration.",
    image: "ae-11",
    palette: ["oklch(0.94 0.01 88)", "oklch(0.75 0.02 80)", "oklch(0.28 0.01 70)"],
  },
  {
    key: "garden",
    name: "Garden",
    note: "Open lawn, lantern walks, seasonal stems cut that morning. Light that falls the way it does at the end of a long afternoon.",
    image: "ae-26",
    palette: ["oklch(0.45 0.08 145)", "oklch(0.88 0.06 95)", "oklch(0.60 0.05 120)"],
  },
  {
    key: "arabic",
    name: "Arabic",
    note: "Low majlis seating, brass, incense and pierced-metal light throwing pattern across every wall of the marquee.",
    image: "ae-19",
    palette: ["oklch(0.26 0.03 45)", "oklch(0.70 0.10 70)", "oklch(0.85 0.05 85)"],
  },
  {
    key: "modern",
    name: "Modern",
    note: "Clean structure, engineered lighting, a restrained palette broken once — deliberately — by a single saturated note.",
    image: "ae-05",
    palette: ["oklch(0.18 0.01 60)", "oklch(0.75 0.11 85)", "oklch(0.55 0.03 200)"],
  },
];

const culinary = [
  { name: "Live BBQ theatre", note: "Coal, smoke and the sound of it — carved in front of your guests, never trayed out of a back room." },
  { name: "Continental table", note: "A quiet counterpoint to the desi menu, plated with the same seriousness." },
  { name: "Dessert atelier", note: "Mithai, patisserie and a late-night table that opens exactly when the dancing tires." },
  { name: "Service brigade", note: "One steward for every eight covers, briefed on the family, not just the menu." },
];

export const Route = createFileRoute("/services/")({
  head: () => ({
    ...pageMeta({
      title: "Signature Event Experiences in Lahore | Anayat Events & Catering",
      description:
        "Seventeen event disciplines held by one house in Lahore — weddings, mehndi and walima production, corporate evenings, catering and stage design.",
      path: PATH,
      image: photo("ae-22").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "Event services in Lahore",
          path: PATH,
          items: services.map((s) => ({ name: s.name, path: `/services/${s.slug}` })),
        }),
      ),
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  const flagship = getService("luxury-weddings") ?? services[0];
  const flagshipHero = photo(flagship.hero);
  const stories = testimonials.slice(0, 3);

  return (
    <main className="bg-background">
      {/* ─── I. Cinematic overture ─────────────────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <CinematicBackdrop frames={heroFrames} interval={7600} />
        <div className="mx-auto w-full max-w-[92rem] px-6 pt-36 pb-28 md:px-12 md:pb-36 lg:pb-44">
          <Breadcrumbs trail={trail} className="mb-10" />
          <Reveal variant="fade" duration={900}>
            <p className="eyebrow">Signature experiences</p>
          </Reveal>
          <h1 className="mt-7 max-w-5xl font-display text-[3rem] leading-[0.94] font-light text-ivory sm:text-7xl lg:text-[7.5rem]">
            <RevealWords text="Every celebration begins" />
            <span className="mt-2 block italic sm:ml-[8%]">
              <RevealWords text="with an extraordinary vision." delay={220} wordClassName="foil-text" />
            </span>
          </h1>
          <div className="mt-5 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <Reveal variant="rise" delay={200}>
              <p className="max-w-xl font-sans text-[15px] leading-[2] font-light text-ivory/75">
                Seventeen disciplines, one house, one accountable line. Planning, design,
                fabrication, florals, lighting and the kitchen never leave our own team — which is
                why the evening feels like a single held breath rather than a collection of vendors.
              </p>
            </Reveal>
            <Reveal variant="fade" delay={320} className="lg:justify-self-end">
              <LuxLink to="/contact" tone="foil">
                Begin a consultation
              </LuxLink>
            </Reveal>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="mx-auto mb-8 h-16 w-px bg-gradient-to-b from-transparent via-gold/70 to-transparent"
        />
      </section>

      {/* ─── II. Philosophy — typography alone ─────────────────────── */}
      <section className="chapter light-left relative overflow-hidden py-32 lg:py-48">
        <p
          aria-hidden="true"
          className="ghost-word absolute -top-6 -left-6 text-[22vw] opacity-70 select-none"
        >
          Craft
        </p>
        <div className="relative mx-auto max-w-[92rem] px-6 md:px-12">
          <div className="grid gap-16 lg:grid-cols-[0.42fr_0.58fr]">
            <Reveal variant="fade">
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
                Our signature experiences
              </p>
              <span className="mt-6 block hairline" />
            </Reveal>
            <div>
              <Reveal variant="mask" duration={1300}>
                <p className="font-display text-[2.1rem] leading-[1.18] font-light text-ivory sm:text-5xl lg:text-[3.6rem]">
                  We are not in the business of events. We are in the business of the way a family
                  remembers one night for thirty years.
                </p>
              </Reveal>
              <div className="mt-14 grid gap-12 sm:grid-cols-2">
                {[
                  ["Hospitality", "A guest is not a headcount. Someone is watching the door, the elders, the children, the plates."],
                  ["Craftsmanship", "Frames welded, florals conditioned and menus trialled in-house, by people whose names you learn."],
                  ["Emotion", "Design decisions are argued in feelings first — arrival, hush, roar — and drawn afterwards."],
                  ["Detail", "The napkin fold, the cable run, the temperature at the far table. All of it, every time."],
                ].map(([t, b], i) => (
                  <Reveal key={t} variant="rise" delay={i * 80}>
                    <h2 className="font-display text-2xl font-light text-gold">{t}</h2>
                    <p className="mt-3 font-sans text-sm leading-[1.95] font-light text-ivory/65">
                      {b}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── III. Immersive explorer ───────────────────────────────── */}
      <section aria-labelledby="explorer" className="relative pb-24">
        <div className="mx-auto max-w-[92rem] px-6 pb-8 md:px-12">
          <Reveal variant="fade">
            <h2
              id="explorer"
              className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep"
            >
              The rooms of the house
            </h2>
          </Reveal>
        </div>
        <ServiceScroller items={services} />
      </section>

      {/* ─── IV. Flagship: layered composition ─────────────────────── */}
      <section className="chapter light-right relative overflow-hidden py-24 lg:py-36">
        <div className="relative mx-auto max-w-[92rem] px-6 md:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="relative lg:col-span-7">
              <img
                {...imgAttrs(flagshipHero.id, flagshipHero.url, "(min-width: 1024px) 58vw, 100vw")}
                alt={flagshipHero.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover [mask-image:linear-gradient(to_right,black_72%,transparent)]"
              />
              <Plate
                image={photo("ae-01")}
                ratio="3/4"
                speed={0.18}
                className="absolute -right-4 -bottom-16 w-40 sm:w-56 lg:-right-20 lg:w-72"
                sizes="(min-width: 1024px) 20vw, 40vw"
              />
            </div>
            <div className="lg:col-span-5 lg:pl-6">
              <Reveal variant="fade">
                <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
                  Flagship experience
                </p>
              </Reveal>
              <Reveal variant="mask" duration={1200}>
                <h2 className="mt-6 font-display text-5xl leading-[0.98] font-light text-ivory lg:text-[4.4rem]">
                  {flagship.name}
                </h2>
              </Reveal>
              <Reveal variant="rise" delay={80}>
                <p className="mt-7 font-sans text-[15px] leading-[2] font-light text-ivory/70">
                  {flagship.lede}
                </p>
              </Reveal>
              <ul className="mt-10 space-y-5">
                {flagship.inclusions.slice(0, 3).map((inc, i) => (
                  <Reveal as="li" key={inc.title} variant="rise" delay={i * 70}>
                    <span className="block hairline" />
                    <p className="mt-4 font-display text-2xl font-light text-ivory">{inc.title}</p>
                    <p className="mt-2 font-sans text-sm leading-[1.9] font-light text-ivory/60">
                      {inc.body}
                    </p>
                  </Reveal>
                ))}
              </ul>
              <Reveal variant="fade" delay={140}>
                <div className="mt-10">
                  <LuxLink to="/services/$slug" params={{ slug: flagship.slug }} tone="foil">
                    Enter the flagship
                  </LuxLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ─── V. The journey ────────────────────────────────────────── */}
      <section className="relative py-28 lg:py-40">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <Reveal variant="fade">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              The journey
            </p>
          </Reveal>
          <Reveal variant="mask" duration={1200}>
            <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.04] font-light text-ivory md:text-6xl">
              From the first sentence you say out loud, to the last photograph you keep.
            </h2>
          </Reveal>
          <div className="mt-20">
            <JourneyRail stages={journey} />
          </div>
        </div>
      </section>

      {/* ─── VI. Ordinary vs extraordinary ─────────────────────────── */}
      <section className="relative overflow-hidden py-24 lg:py-36">
        <div className="mx-auto grid max-w-[92rem] gap-px bg-border px-6 md:px-12 lg:grid-cols-2 lg:gap-0">
          <div className="bg-background px-2 py-14 lg:px-14">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-muted-foreground">
              An ordinary evening
            </p>
            <ul className="mt-10 space-y-7">
              {[
                "Six numbers to call when something slips.",
                "A stage that photographs well and reads flat in the room.",
                "Food that arrives warm at the top table and late at the far one.",
                "A plan that lives in a chat thread.",
              ].map((t) => (
                <Reveal as="li" key={t} variant="fade">
                  <p className="font-display text-2xl leading-snug font-light text-ivory/35 line-through decoration-border-strong">
                    {t}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="relative bg-background px-2 py-14 lg:px-14">
            <span
              aria-hidden="true"
              className="absolute inset-y-8 -left-px hidden w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent lg:block"
            />
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              The Anayat difference
            </p>
            <ul className="mt-10 space-y-7">
              {[
                "One named planner who stands at your gate on the night.",
                "Elevation drawings and a lighting plot before a single frame is welded.",
                "Our own kitchen brigade, timed to the run of show minute by minute.",
                "A document, signed, that both families can read.",
              ].map((t, i) => (
                <Reveal as="li" key={t} variant="rise" delay={i * 60}>
                  <p className="font-display text-2xl leading-snug font-light text-ivory">{t}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ─── VII. Culinary ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden py-28 lg:py-40">
        <img
          {...imgAttrs("ae-04", photo("ae-04").url, "100vw")}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25 kenburns"
        />
        <span aria-hidden="true" className="absolute inset-0 -z-10 veil" />
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <div className="grid gap-14 lg:grid-cols-[0.55fr_0.45fr] lg:items-end">
            <div>
              <Reveal variant="fade">
                <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                  The culinary experience
                </p>
              </Reveal>
              <Reveal variant="mask" duration={1300}>
                <h2 className="mt-6 font-display text-[2.6rem] leading-[1.02] font-light text-ivory md:text-[4.6rem]">
                  A kitchen that treats a wedding
                  <span className="block italic text-gold">like a service, not a delivery.</span>
                </h2>
              </Reveal>
            </div>
            <Reveal variant="rise" delay={120}>
              <p className="font-sans text-[15px] leading-[2] font-light text-ivory/75">
                Our chefs trial your menu before it is confirmed, cook on site rather than reheat,
                and hold temperature at the far table as seriously as at the stage. Portioning,
                garnish and service tempo are written into the same run-of-show as the lighting.
              </p>
            </Reveal>
          </div>

          <dl className="mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {culinary.map((c, i) => (
              <Reveal key={c.name} variant="rise" delay={i * 70}>
                <span className="block hairline" />
                <dt className="mt-5 font-display text-2xl font-light text-ivory">{c.name}</dt>
                <dd className="mt-3 font-sans text-sm leading-[1.9] font-light text-ivory/65">
                  {c.note}
                </dd>
              </Reveal>
            ))}
          </dl>

          <Reveal variant="fade" delay={100}>
            <div className="mt-14">
              <LuxLink to="/services/$slug" params={{ slug: "luxury-catering" }} tone="ghost">
                Explore luxury catering
              </LuxLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── VIII. Decor atelier ───────────────────────────────────── */}
      <section className="relative py-24 lg:py-36">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <Reveal variant="fade">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              The decor atelier
            </p>
          </Reveal>
          <Reveal variant="mask" duration={1200}>
            <h2 className="mt-6 mb-16 max-w-3xl font-display text-4xl leading-[1.04] font-light text-ivory md:text-6xl">
              Choose a language. The room will speak it all evening.
            </h2>
          </Reveal>
          <ThemeAtelier themes={atelierThemes} />
        </div>
      </section>

      {/* ─── IX. Memory vault ──────────────────────────────────────── */}
      <section className="relative py-24 lg:py-36">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <Reveal variant="fade">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              The memory vault
            </p>
          </Reveal>
          <div className="mt-14 space-y-24 lg:space-y-36">
            {stories.map((t, i) => {
              const img = photo(["ae-10", "ae-16", "ae-23"][i] ?? "ae-10");
              const flip = i % 2 === 1;
              return (
                <article
                  key={t.id}
                  className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                    flip ? "" : ""
                  }`}
                >
                  <div className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
                    <Plate
                      image={img}
                      ratio={flip ? "5/4" : "4/5"}
                      speed={0.14}
                      caption
                      sizes="(min-width: 1024px) 48vw, 100vw"
                    />
                  </div>
                  <div className={`lg:col-span-6 ${flip ? "lg:order-1 lg:pr-10" : "lg:pl-10"}`}>
                    <Reveal variant="mask" duration={1200}>
                      <blockquote className="font-display text-[1.8rem] leading-[1.28] font-light text-ivory italic md:text-[2.6rem]">
                        “{t.quote}”
                      </blockquote>
                    </Reveal>
                    <Reveal variant="fade" delay={80}>
                      <p className="mt-8 font-sans text-[10px] tracking-[0.34em] uppercase text-gold">
                        {t.name} · {t.event} · {t.area}
                      </p>
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
          <Reveal variant="fade">
            <div className="mt-16">
              <LuxLink to="/reviews" tone="ghost">
                Read every story
              </LuxLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── X. Where we work ──────────────────────────────────────── */}
      <section className="py-16">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
            Served across Lahore
          </p>
          <ul className="mt-8 flex flex-wrap gap-4">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  to="/areas/$slug"
                  params={{ slug: l.slug }}
                  className="btn-shape inline-flex items-center border border-border-strong px-6 py-3 font-sans text-[10px] tracking-[0.26em] uppercase text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                >
                  {l.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        eyebrow="Let us begin"
        title="Let's create something unforgettable."
        body="Tell us the date and the number of guests. One planner reads every enquiry and replies within 12 working hours — never a template."
      />
      <RelatedConstellation path="/services" heading="Continue" />
    </main>
  );
}

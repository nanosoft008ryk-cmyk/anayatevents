import { createFileRoute, Link } from "@tanstack/react-router";

import { site, consultationSteps, stats } from "@/content/site";
import { photo, photosByIds } from "@/content/images";
import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { portfolioCategories } from "@/content/portfolio";
import { testimonials } from "@/content/testimonials";
import { articlesByDate } from "@/content/journal";
import { CtaBand } from "@/components/CtaBand";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxLink, LuxTextLink } from "@/components/ui/LuxButton";
import { pageMeta, jsonLd, itemListSchema } from "@/lib/seo";
import { imgAttrs } from "@/lib/img";

const HERO = "ae-22";
const HERO_FRAMES = ["ae-22", "ae-13", "ae-16", "ae-26"];
const HOME_PHOTOS = ["ae-13", "ae-14", "ae-10", "ae-16", "ae-26", "ae-03"];

export const Route = createFileRoute("/")({
  head: () => {
    const meta = pageMeta({
      title: "Anayat Events & Catering — Luxury Event Management in Lahore",
      description:
        "Lahore's luxury event management and catering house. Weddings, mehndi, walima, corporate and private celebrations — designed, built and served by one accountable team.",
      path: "/",
      image: photo(HERO).url,
    });
    const hero = imgAttrs(HERO, photo(HERO).url, "100vw");
    return {
    ...meta,
    links: [
      ...(meta.links ?? []),
      // Discover the first cinematic frame in the initial document.
      {
        rel: "preload",
        as: "image",
        href: hero.src,
        imageSrcSet: hero.srcSet,
        imageSizes: "100vw",
        fetchPriority: "high",
      },
    ],
    scripts: [
      jsonLd(
        itemListSchema({
          name: "Signature services",
          path: "/",
          items: services.slice(0, 8).map((s) => ({
            name: s.name,
            path: `/services/${s.slug}`,
          })),
        }),
      ),
    ],
    };
  },
  component: Home,
});

function Home() {
  const frames = photosByIds(HERO_FRAMES);
  const gallery = photosByIds(HOME_PHOTOS);
  const featured = services.slice(0, 6);
  const journal = articlesByDate.slice(0, 3);

  return (
    <main className="overflow-x-clip bg-background">
      {/* ── I. Overture ─────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden">
        <CinematicBackdrop frames={frames} />

        {/* Vertical eyebrow rail */}
        <div className="pointer-events-none absolute top-1/2 left-6 hidden -translate-y-1/2 items-center gap-4 lg:flex">
          <span className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold [writing-mode:vertical-rl] rotate-180">
            Lahore · Since {site.founded}
          </span>
          <span className="h-16 w-px bg-gradient-to-b from-gold to-transparent" />
        </div>

        <div className="relative mx-auto grid w-full max-w-[92rem] grid-cols-12 items-end gap-x-6 px-6 pt-36 pb-28 md:px-12 lg:pl-24 lg:pb-24">
          {/* Headline column */}
          <div className="col-span-12 flex flex-col lg:col-span-7 lg:pr-12">
            <p className="mb-8 flex items-center gap-4 font-sans text-[10px] tracking-[0.4em] uppercase text-gold lg:hidden">
              <span className="h-px w-8 bg-gold" />
              Lahore · Since {site.founded}
            </p>
            <h1 className="font-display text-[3.4rem] leading-[0.9] font-light tracking-tight text-ivory sm:text-[5rem] lg:text-[6rem] xl:text-[7.4rem]">
              <RevealWords text="An evening" delay={120} />
              <span className="mt-1 block pl-10 md:pl-24">
                <span className="italic text-gold-light">
                  <RevealWords text="built" delay={340} />
                </span>{" "}
                <RevealWords text="before" delay={460} />
              </span>
              <span className="mt-1 block">
                <RevealWords text="you arrive at it." delay={620} step={60} />
              </span>
            </h1>

            <div className="mt-5 max-w-md">
              <Reveal delay={780}>
                <p className="font-sans text-[14px] leading-[2] font-light tracking-wide text-foreground/70">
                  {site.description}
                </p>
              </Reveal>
              <Reveal delay={900} className="mt-10 flex flex-wrap items-center gap-x-20 gap-y-6">
                <LuxLink to="/contact" tone="rule" className="px-0 py-0">
                  Begin an enquiry
                </LuxLink>
                <LuxLink to="/portfolio" tone="quiet" arrow={false} className="px-0 py-0 text-ivory">
                  View the work
                </LuxLink>
              </Reveal>
            </div>
          </div>



          {/* Floating framed plate */}
          <div className="hidden self-center lg:col-span-4 lg:block">
            <Reveal variant="mask" delay={520}>
              <div className="aspect-[3/4] w-full border-[0.5px] border-gold/30 p-4">
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    {...imgAttrs("ae-05", photo("ae-05").url, "(min-width: 1024px) 33vw, 100vw")}
                    alt={photo("ae-05").alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover contrast-125 transition-transform duration-[1400ms] [transition-timing-function:var(--ease-lux)] hover:scale-105"
                  />
                  <span className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.45)]" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4">
          <span className="h-12 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-ivory/70">
            Explore
          </span>
        </div>
      </section>


      {/* ── II. The count — type as architecture, no boxes ──────────── */}
      <section className="chapter light-left relative mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
        <div className="grid gap-x-16 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 110} className="relative">
              <p className="font-display text-[4.5rem] leading-[0.8] font-light text-foil lg:text-[5.5rem]">
                {s.value}
              </p>
              <p className="mt-6 font-sans text-[10px] tracking-[0.34em] uppercase text-ivory">
                {s.label}
              </p>
              <p className="mt-2 max-w-[22ch] font-sans text-[13px] leading-relaxed font-light text-muted-foreground">
                {s.sub}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── III. Manifesto — type-led, hairline creed, twin small plates ── */}
      <section className="chapter relative overflow-hidden pt-24 pb-24 lg:pt-36 lg:pb-40">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <div className="grid gap-y-16 lg:grid-cols-12 lg:gap-x-16">
            {/* Statement */}
            <Reveal className="lg:col-span-7">
              <p className="flex items-center gap-5 font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                <span className="h-px w-10 bg-gold/60" />
                The house
              </p>
              <h2 className="mt-10 font-display text-[2.6rem] leading-[0.98] font-light text-ivory lg:text-[4.2rem]">
                We do not sell decor.
                <span className="mt-2 block pl-8 italic text-gold-light lg:pl-20">
                  We take responsibility
                </span>
                <span className="block">for an evening.</span>
              </h2>
            </Reveal>

            {/* Offset narrow plate */}
            <Reveal variant="mask" delay={180} className="lg:col-span-4 lg:col-start-9 lg:mt-6">
              <div className="relative ml-auto w-full max-w-[19rem]">
                <Plate image={photo("ae-05")} ratio="3/4" speed={0.5} />
                <span className="pointer-events-none absolute -inset-3 border-[0.5px] border-gold/20" />
              </div>
            </Reveal>
          </div>

          {/* Creed — three tenets on hairlines, breaking the grid */}
          <div className="mt-20 grid gap-y-14 lg:mt-28 lg:grid-cols-12 lg:gap-x-16">
            <Reveal delay={120} className="lg:col-span-3 lg:col-start-1 lg:pt-24">
              <div className="relative w-full max-w-[15rem]">
                <Plate image={photo("ae-17")} ratio="4/5" speed={0.9} fade="bottom" />
              </div>
            </Reveal>

            <div className="lg:col-span-8 lg:col-start-5">
              {[
                {
                  n: "I",
                  head: "One house, no strangers",
                  body: "Design, fabrication, florals, lighting and the kitchen all sit under one roof. Nothing is handed to a subcontractor and then hoped for.",
                },
                {
                  n: "II",
                  head: "The same face, first to last",
                  body: "The person who reads your first message stands at your gate on the night, and is still standing there when the last car leaves.",
                },
                {
                  n: "III",
                  head: "Held to the hour",
                  body: "It is why four hundred guests sit down within minutes of each other, and why the marigold is still fresh at one in the morning.",
                },
              ].map((t, i) => (
                <Reveal key={t.n} delay={i * 110}>
                  <article className="group/creed relative grid grid-cols-[auto_1fr] items-start gap-x-8 py-10 lg:gap-x-14">
                    <span className="font-display text-[1.5rem] leading-none font-light text-gold-deep transition-colors duration-700 group-hover/creed:text-gold">
                      {t.n}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-[1.5rem] leading-tight font-light text-ivory lg:text-[2rem]">
                        {t.head}
                      </h3>
                      <p className="mt-4 max-w-xl font-sans text-[14px] leading-[2] font-light text-muted-foreground">
                        {t.body}
                      </p>
                    </div>
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-border" />
                    <span className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-[900ms] [transition-timing-function:var(--ease-lux)] group-hover/creed:scale-x-100" />
                  </article>
                </Reveal>
              ))}

              <Reveal delay={260}>
                <LuxTextLink to="/about" className="mt-10">
                  Our story
                </LuxTextLink>
              </Reveal>
            </div>
          </div>
        </div>


        <Reveal
          variant="fade"
          duration={1600}
          className="pointer-events-none absolute -bottom-6 left-0 hidden w-full overflow-hidden lg:block"
        >
          <p className="ghost-word px-12 text-[9rem] whitespace-nowrap xl:text-[12rem]">
            You Think. We Do.
          </p>
        </Reveal>
      </section>

      {/* ── IV. Disciplines — staggered editorial index, no card grid ── */}
      <section className="chapter light-right relative mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.3fr]">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">What we do</p>
            <h2 className="mt-8 font-display text-[2.6rem] leading-[1.02] font-light text-ivory lg:text-[4rem]">
              Seventeen disciplines,
              <span className="block italic text-gold-light">one crew.</span>
            </h2>
            <LuxTextLink to="/services" className="mt-10">
              All services
            </LuxTextLink>
          </Reveal>

          <ol className="lg:pt-6">
            {featured.map((s, i) => (
              <li key={s.slug} className="group/row relative">
                <Reveal delay={i * 60}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="relative grid grid-cols-[auto_1fr] items-baseline gap-x-8 py-9 lg:gap-x-14"
                    style={{ marginLeft: `${(i % 3) * 1.75}rem` }}
                  >
                    <span className="font-sans text-[10px] tracking-[0.3em] text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[1.9rem] leading-tight font-light text-ivory transition-[color,transform] duration-[900ms] [transition-timing-function:var(--ease-lux)] group-hover/row:translate-x-2 group-hover/row:text-gold lg:text-[2.6rem]">
                        {s.name}
                      </span>
                      <span className="mt-3 block max-w-xl font-sans text-[14px] leading-[1.95] font-light text-muted-foreground opacity-70 transition-opacity duration-700 group-hover/row:opacity-100">
                        {s.lede}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-border" />
                    <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-[900ms] [transition-timing-function:var(--ease-lux)] group-hover/row:scale-x-100" />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── V. Immersive frame — full bleed, blending both ends ─────── */}
      <section className="relative">
        <Plate
          image={photo("ae-19")}
          ratio="16/9"
          speed={1.4}
          fade="both"
          className="min-h-[70svh] [&>div]:min-h-[70svh]"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[92rem] px-6 md:px-12">
            <Reveal variant="mask" duration={1400}>
              <p className="max-w-3xl font-display text-[2rem] leading-[1.25] font-light text-ivory italic drop-shadow-[0_10px_40px_rgba(0,0,0,0.8)] lg:text-[3.2rem]">
                “Light first. Then flowers. Then the food that people will still
                talk about in March.”
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VI. Selected work — floating, uneven, magazine framing ──── */}
      <section className="chapter relative mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Selected work
            </p>
            <h2 className="mt-8 max-w-[14ch] font-display text-[2.6rem] leading-[1.02] font-light text-ivory lg:text-[4rem]">
              Six rooms from a longer archive.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <LuxTextLink to="/vault">Enter the Vault</LuxTextLink>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-10 gap-y-16 lg:grid-cols-12">
          <Reveal variant="mask" className="lg:col-span-5 lg:mt-24">
            <Plate image={gallery[0]} ratio="3/4" caption speed={0.6} />
          </Reveal>
          <Reveal variant="mask" delay={120} className="lg:col-span-7">
            <Plate image={gallery[1]} ratio="4/3" caption speed={0.35} />
          </Reveal>
          <Reveal variant="mask" delay={60} className="lg:col-span-4 lg:col-start-2">
            <Plate image={gallery[2]} ratio="1/1" caption speed={0.5} />
          </Reveal>
          <Reveal variant="mask" delay={140} className="lg:col-span-5 lg:mt-28">
            <Plate image={gallery[3]} ratio="4/5" caption speed={0.7} />
          </Reveal>
          <Reveal variant="mask" delay={100} className="lg:col-span-7">
            <Plate image={gallery[4]} ratio="16/10" caption speed={0.4} />
          </Reveal>
          <Reveal variant="mask" delay={180} className="lg:col-span-4 lg:col-start-8 lg:-mt-40">
            <Plate image={gallery[5]} ratio="3/4" caption speed={0.8} />
          </Reveal>
        </div>

        <Reveal className="mt-24 flex flex-wrap gap-x-10 gap-y-5">
          {portfolioCategories.map((c) => (
            <Link
              key={c.slug}
              to="/portfolio/$slug"
              params={{ slug: c.slug }}
              className="group/cat relative font-display text-2xl font-light text-muted-foreground transition-colors duration-500 hover:text-gold lg:text-3xl"
            >
              {c.name}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-[800ms] [transition-timing-function:var(--ease-lux)] group-hover/cat:origin-left group-hover/cat:scale-x-100" />
            </Link>
          ))}
        </Reveal>
      </section>

      {/* ── VII. Process — horizontal timeline over a dark plate ────── */}
      <section className="relative isolate overflow-hidden py-28 lg:py-40">
        <div className="absolute inset-0 -z-10">
          <img
            {...imgAttrs("ae-08", photo("ae-08").url, "100vw")}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-[0.22] drift-slow"
          />
          <div className="absolute inset-0 veil" />
          <div className="absolute inset-0 vignette" />
        </div>

        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              The process
            </p>
            <h2 className="mt-8 max-w-[18ch] font-display text-[2.4rem] leading-[1.04] font-light text-ivory lg:text-[3.6rem]">
              Five unhurried movements, from first message to last guest.
            </h2>
          </Reveal>

          <div className="mt-20 grid gap-y-14 md:grid-cols-3 md:gap-x-12 lg:grid-cols-5">
            {consultationSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 110} className="group/step relative">
                <div className="mb-6 flex items-center gap-4">
                  <span className="font-display text-[2.6rem] leading-none font-light text-gold-deep transition-colors duration-700 group-hover/step:text-gold">
                    {s.step}
                  </span>
                  <span className="hairline flex-1 opacity-60" />
                </div>
                <h3 className="font-display text-xl font-light text-ivory">{s.title}</h3>
                <p className="mt-4 font-sans text-[13px] leading-[1.95] font-light text-muted-foreground">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIII. Voices — oversized pull quotes, no card walls ─────── */}
      <section className="chapter light-left relative mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
        <Reveal>
          <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
            {site.rating.value} from {site.rating.count} Google reviews
          </p>
        </Reveal>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {testimonials.slice(0, 3).map((t, i) => (
            <Reveal
              key={t.id}
              delay={60}
              className={
                i === 1
                  ? "lg:ml-auto lg:max-w-3xl lg:text-right"
                  : i === 2
                    ? "lg:mx-auto lg:max-w-2xl"
                    : "lg:max-w-3xl"
              }
            >
              <blockquote className="font-display text-[1.7rem] leading-[1.3] font-light text-ivory italic lg:text-[2.6rem]">
                “{t.quote}”
              </blockquote>
              <p className="mt-7 font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                {t.name} · {t.event} · {t.area}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <LuxTextLink to="/reviews">Read all reviews</LuxTextLink>
        </Reveal>
      </section>

      {/* ── IX. Territory — split screen ────────────────────────────── */}
      <section className="relative grid items-stretch lg:grid-cols-[1fr_1fr]">
        <div className="relative order-2 min-h-[50svh] lg:order-1">
          <Plate
            image={photo("ae-24")}
            ratio="3/4"
            speed={0.9}
            fade="sides"
            className="h-full [&>div]:h-full"
          />
        </div>
        <div className="order-1 flex items-center px-6 py-24 md:px-12 lg:order-2 lg:py-40 lg:pr-[max(3rem,calc((100vw-92rem)/2+3rem))]">
          <div>
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                Where we work
              </p>
              <h2 className="mt-8 max-w-[16ch] font-display text-[2.4rem] leading-[1.04] font-light text-ivory lg:text-[3.4rem]">
                Every postcode in Lahore, produced by the same team.
              </h2>
            </Reveal>
            <Reveal delay={140} className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
              {locations.map((l) => (
                <Link
                  key={l.slug}
                  to="/areas/$slug"
                  params={{ slug: l.slug }}
                  className="group/area relative font-sans text-[11px] tracking-[0.26em] uppercase text-muted-foreground transition-colors duration-500 hover:text-gold"
                >
                  {l.shortName}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-700 group-hover/area:origin-left group-hover/area:scale-x-100" />
                </Link>
              ))}
            </Reveal>
            <Reveal delay={220} className="mt-14">
              <LuxLink to="/areas" tone="ghost">
                All service areas
              </LuxLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── X. Journal — one lead story, two whispers ───────────────── */}
      <section className="chapter relative mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              The journal
            </p>
            <h2 className="mt-8 font-display text-[2.6rem] leading-[1.02] font-light text-ivory lg:text-[4rem]">
              Written by the people
              <span className="block italic text-gold-light">who build it.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <LuxTextLink to="/journal">All writing</LuxTextLink>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-x-16 gap-y-14 lg:grid-cols-[1.35fr_1fr]">
          {journal[0] && (
            <Reveal variant="mask">
              <Link to="/journal/$slug" params={{ slug: journal[0].slug }} className="group/lead block">
                <Plate image={photo("ae-11")} ratio="16/10" />
                <p className="mt-8 font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                  {journal[0].category} · {journal[0].readingTime}
                </p>
                <h3 className="mt-5 max-w-2xl font-display text-[2rem] leading-[1.12] font-light text-ivory transition-colors duration-700 group-hover/lead:text-gold lg:text-[2.6rem]">
                  {journal[0].title}
                </h3>
                <p className="mt-5 max-w-xl font-sans text-[14px] leading-[1.95] font-light text-muted-foreground">
                  {journal[0].excerpt}
                </p>
              </Link>
            </Reveal>
          )}

          <div className="flex flex-col justify-center gap-14 lg:pt-10">
            {journal.slice(1).map((a, i) => (
              <Reveal key={a.slug} delay={i * 120}>
                <Link to="/journal/$slug" params={{ slug: a.slug }} className="group/story block">
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                    {a.category} · {a.readingTime}
                  </p>
                  <h3 className="mt-4 font-display text-[1.6rem] leading-tight font-light text-ivory transition-[color,transform] duration-700 group-hover/story:translate-x-1.5 group-hover/story:text-gold lg:text-[2rem]">
                    {a.title}
                  </h3>
                  <p className="mt-4 font-sans text-[13px] leading-[1.95] font-light text-muted-foreground">
                    {a.excerpt}
                  </p>
                  <span className="mt-6 block h-px w-full origin-left scale-x-100 bg-border transition-colors duration-700 group-hover/story:bg-gold" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

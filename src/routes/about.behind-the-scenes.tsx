import { createFileRoute } from "@tanstack/react-router";

import { photo, photosByIds } from "@/content/images";
import { behindPage } from "@/content/about";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CtaBand } from "@/components/CtaBand";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { SmartImg } from "@/components/ui/SmartImg";
import { pageMeta, jsonLd, breadcrumbSchema, imageGallerySchema, type Crumb } from "@/lib/seo";

const PATH = "/about/behind-the-scenes";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Behind The Scenes", path: PATH },
];

export const Route = createFileRoute("/about/behind-the-scenes")({
  head: () => ({
    ...pageMeta({
      title: "Behind The Scenes — The Fourteen Hours Before Your Guests Arrive",
      description:
        "Load-out at 05:40, chalk lines on grass, the cold room, the lighting grade, the empty room at 18:30. A documentary call sheet of how an Anayat evening is built.",
      path: PATH,
      image: photo(behindPage.hero.photo).url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        imageGallerySchema({
          name: "Behind the scenes of an Anayat Events build",
          description:
            "Unretouched frames from Anayat Events builds across Lahore: fabrication, floral installation, lighting focus and dressing before guests arrive.",
          path: PATH,
          images: photosByIds(behindPage.contactSheet),
        }),
      ),
    ],
  }),
  component: BehindPage,
});

function BehindPage() {
  const hero = photo(behindPage.hero.photo);
  const sheet = photosByIds(behindPage.contactSheet);

  return (
    <main className="bg-background">
      {/* ── Hero: full-bleed documentary still with a film-slate caption ── */}
      <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SmartImg
            id={hero.id} fallbackUrl={hero.url} sizes="100vw"
            alt={hero.alt}
            fetchPriority="high"
            className="h-full w-full object-cover brightness-[0.55] saturate-[0.75] drift-slow"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--background) 4%, color-mix(in oklab, var(--background) 40%, transparent) 45%, transparent 80%)",
            }}
          />
          <div className="absolute inset-0 vignette opacity-80" />
          <div className="absolute inset-0 grain" />
        </div>

        <div className="mx-auto w-full max-w-[92rem] px-6 pt-40 pb-20 md:px-12 md:pb-28">
          <Breadcrumbs trail={trail} className="mb-10" />
          <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
            {behindPage.hero.eyebrow}
          </p>
          <h1 className="mt-8 max-w-[17ch] font-display text-[2.6rem] leading-[0.99] font-light text-ivory sm:text-5xl lg:text-[5.4rem]">
            <RevealWords text={behindPage.hero.title} />
          </h1>
          <Reveal delay={560}>
            <p className="mt-5 max-w-xl border-l border-gold/50 pl-6 font-sans text-[13px] leading-[2] font-light tracking-[0.02em] text-muted-foreground">
              {behindPage.lede}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── The call sheet: timestamped, left rail of hours ─────────────── */}
      <section className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
        <ol className="relative border-l border-border pl-6 md:pl-14">
          {behindPage.callsheet.map((c, i) => (
            <li key={c.time} className="relative pb-20 last:pb-0">
              <span
                aria-hidden
                className="absolute top-2 -left-[1.62rem] h-px w-6 bg-gold md:-left-[3.6rem] md:w-12"
              />
              <div className="grid gap-8 lg:grid-cols-[9rem_1fr_0.85fr] lg:gap-14">
                <Reveal>
                  <p className="font-display text-2xl font-light text-gold lg:text-3xl">{c.time}</p>
                </Reveal>

                <div>
                  <Reveal delay={70} variant="mask">
                    <h2 className="font-display text-2xl leading-[1.1] font-light text-ivory lg:text-[2.4rem]">
                      {c.title}
                    </h2>
                  </Reveal>
                  <Reveal delay={140}>
                    <p className="mt-6 max-w-lg font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
                      {c.body}
                    </p>
                  </Reveal>
                </div>

                <Reveal delay={120} variant="mask">
                  <Plate
                    image={photo(c.photo)}
                    ratio={i % 4 === 0 ? "16/10" : i % 4 === 2 ? "1/1" : "4/3"}
                    speed={i % 2 ? -6 : 6}
                    imgClassName="saturate-[0.85]"
                    sizes="(min-width: 1024px) 30vw, 100vw"
                  />
                </Reveal>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Contact sheet: a photographer's proof strip ─────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 py-20 md:px-12 lg:py-28">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              Contact sheet · unretouched frames
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-px bg-border sm:grid-cols-4">
            {sheet.map((p, i) => (
              <figure key={p.id} className="group/f relative overflow-hidden bg-background">
                <img
                  {...imgAttrs(p.id, p.url, "(min-width: 640px) 25vw, 50vw")}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover brightness-[0.72] saturate-[0.7] transition-[transform,filter] duration-[1400ms] [transition-timing-function:var(--ease-lux)] group-hover/f:scale-[1.05] group-hover/f:brightness-100 group-hover/f:saturate-100"
                />
                <figcaption className="absolute bottom-3 left-3 font-sans text-[9px] tracking-[0.3em] uppercase text-ivory/70">
                  {String(i + 1).padStart(2, "0")}
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 max-w-xl font-sans text-[13px] leading-[2] font-light text-muted-foreground">
            Frames from our own builds across Lahore. Nothing here is licensed, staged or
            borrowed — it is the same crew, the same yard, the same evenings.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] px-6 pb-24 md:px-12">
        <div className="flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-10">
          <LuxTextLink to="/about/craftsmanship">The crafts in detail</LuxTextLink>
          <LuxTextLink to="/vault">The full archive</LuxTextLink>
          <LuxTextLink to="/about/process">The process, end to end</LuxTextLink>
        </div>
      </section>

      <CtaBand
        eyebrow="Come and look"
        title="The workshop is open on most afternoons."
        body="See a set standing before it travels. It is the fastest way to understand what we mean by in-house."
      />
      <RelatedConstellation path="/about/behind-the-scenes" heading="Continue" />
    </main>
  );
}

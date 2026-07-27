import { createFileRoute } from "@tanstack/react-router";

import { photo } from "@/content/images";
import { storyPage } from "@/content/about";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CtaBand } from "@/components/CtaBand";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { imgAttrs } from "@/lib/img";
import { pageMeta, jsonLd, breadcrumbSchema, type Crumb } from "@/lib/seo";

const PATH = "/about/story";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Brand Story", path: PATH },
];

export const Route = createFileRoute("/about/story")({
  head: () => ({
    ...pageMeta({
      title: "Brand Story — It Began With A Wedding We Weren't Paid For",
      description:
        "The origin of Anayat Events & Catering: a borrowed lawn in Lahore, lights wired into a mulberry tree, and the decision to bring every craft in-house.",
      path: PATH,
      image: photo(storyPage.hero.photo).url,
    }),
    scripts: [jsonLd(breadcrumbSchema(trail))],
  }),
  component: StoryPage,
});

function StoryPage() {
  const hero = photo(storyPage.hero.photo);

  return (
    <main className="bg-background">
      {/* ── Hero: split editorial — full-height plate against a type column ─ */}
      <section className="grid min-h-[92svh] lg:grid-cols-[1fr_1.05fr]">
        <div className="relative order-2 min-h-[46svh] overflow-hidden lg:order-1 lg:min-h-full">
          <img
            {...imgAttrs(hero.id, hero.url, "(min-width: 1024px) 50vw, 100vw")}
            alt={hero.alt}
            className="h-full w-full object-cover brightness-[0.8] kenburns"
            fetchPriority="high"
          />
          <span className="pointer-events-none absolute inset-0 vignette opacity-80" />
          <span className="pointer-events-none absolute inset-0 grain" />
        </div>

        <div className="order-1 flex flex-col justify-end px-6 pt-36 pb-16 md:px-14 lg:order-2 lg:pb-28">
          <Breadcrumbs trail={trail} className="mb-10" />
          <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
            {storyPage.hero.eyebrow}
          </p>
          <h1 className="mt-8 max-w-[15ch] font-display text-[2.6rem] leading-[1] font-light text-ivory sm:text-5xl lg:text-[4.6rem]">
            <RevealWords text={storyPage.hero.title} />
          </h1>
          <Reveal delay={520}>
            <span aria-hidden className="mt-5 block h-px w-24 bg-gold" />
          </Reveal>
        </div>
      </section>

      {/* ── Movements: numbered chapters, alternating margin plates ─────── */}
      {storyPage.movements.map((m, i) => {
        const wide = i === 2 || i === 5;
        return (
          <section key={m.index} className="mx-auto max-w-[92rem] px-6 py-20 md:px-12 lg:py-28">
            <div
              className={`grid gap-12 lg:gap-24 ${
                wide ? "lg:grid-cols-1" : i % 2 ? "lg:grid-cols-[1fr_0.72fr]" : "lg:grid-cols-[0.72fr_1fr]"
              }`}
            >
              <div className={!wide && i % 2 === 0 ? "lg:order-2" : ""}>
                <Reveal>
                  <p className="font-sans text-[10px] tracking-[0.44em] uppercase text-gold-deep">
                    {m.index} · {m.label}
                  </p>
                </Reveal>
                <Reveal delay={80} variant="mask">
                  <h2 className="mt-7 max-w-[18ch] font-display text-[2rem] leading-[1.08] font-light text-ivory lg:text-[3.2rem]">
                    {m.title}
                  </h2>
                </Reveal>
                <div className={wide ? "mt-10 columns-1 gap-16 lg:columns-2" : "mt-10"}>
                  {m.body.map((p, k) => (
                    <Reveal key={k} delay={140 + k * 90}>
                      <p
                        className={`font-sans text-[15px] leading-[2.1] font-light text-muted-foreground ${
                          k ? "mt-7" : ""
                        } ${
                          i === 0 && k === 0
                            ? "first-letter:float-left first-letter:mt-2 first-letter:mr-4 first-letter:font-display first-letter:text-[4.4rem] first-letter:leading-[0.8] first-letter:font-light first-letter:text-gold"
                            : ""
                        }`}
                      >
                        {p}
                      </p>
                    </Reveal>
                  ))}
                </div>
              </div>

              {!wide && (
                <Reveal variant="mask" className={i % 2 === 0 ? "lg:order-1" : ""}>
                  <Plate
                    image={photo(m.photo)}
                    ratio={i % 2 ? "3/4" : "4/5"}
                    speed={i % 2 ? 10 : -10}
                    caption
                    sizes="(min-width: 1024px) 38vw, 100vw"
                  />
                </Reveal>
              )}
            </div>

            {wide && (
              <Reveal variant="mask" className="mt-16">
                <Plate
                  image={photo(m.photo)}
                  ratio="21/9"
                  speed={6}
                  fade="sides"
                  caption
                  sizes="100vw"
                />
              </Reveal>
            )}
          </section>
        );
      })}

      <section className="mx-auto max-w-[92rem] px-6 pb-24 md:px-12">
        <div className="flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-10">
          <LuxTextLink to="/about/philosophy">Read our philosophy</LuxTextLink>
          <LuxTextLink to="/about/journey">The journey year by year</LuxTextLink>
          <LuxTextLink to="/portfolio">The work itself</LuxTextLink>
        </div>
      </section>

      <CtaBand
        eyebrow="Your chapter"
        title="Every story here started with one message."
        body="Send the date and a sentence about the evening you imagine. We will write back personally."
      />
      <RelatedConstellation path="/about/story" heading="Continue" />
    </main>
  );
}

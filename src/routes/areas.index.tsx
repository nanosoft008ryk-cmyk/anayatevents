import { createFileRoute } from "@tanstack/react-router";

import { locations, featuredAreaSlugs, getLocation } from "@/content/locations";
import { photo } from "@/content/images";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { CtaBand } from "@/components/CtaBand";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { AreaExplorer } from "@/components/areas/AreaExplorer";
import { CoverageMap } from "@/components/areas/CoverageMap";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  itemListSchema,
  type Crumb,
} from "@/lib/seo";

const PATH = "/areas";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Areas", path: PATH },
];

export const Route = createFileRoute("/areas/")({
  head: () => ({
    ...pageMeta({
      title: "Areas We Serve Across Lahore | Anayat Events & Catering",
      description:
        "We serve clients throughout Lahore — DHA, Bahria Town, Gulberg, Model Town, Johar Town, Cantt, Wapda Town, Raiwind and Bedian Road.",
      path: PATH,
      image: photo("ae-22").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "Areas served across Lahore",
          path: PATH,
          items: locations.map((l) => ({
            name: l.shortName,
            path: `/areas/${l.slug}`,
          })),
        }),
      ),
    ],
  }),
  component: AreasIndex,
});

function AreasIndex() {
  const frames = ["ae-22", "ae-10", "ae-19", "ae-05"].map(photo);
  const featured = featuredAreaSlugs
    .map(getLocation)
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <main className="bg-background">
      {/* I. Hero */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <CinematicBackdrop frames={frames} />
        <div className="relative mx-auto w-full max-w-[92rem] px-6 pt-40 pb-44 md:px-12">
          <Breadcrumbs trail={trail} className="mb-10" />
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              {site.serviceArea}
            </p>
          </Reveal>
          <h1 className="mt-9 max-w-[16ch] font-display text-[2.9rem] leading-[0.98] font-light text-ivory md:text-[5rem] lg:text-[6.2rem]">
            <RevealWords text="Creating extraordinary" />
            <span className="block italic text-gold-light">
              <RevealWords text="celebrations across Lahore." delay={240} />
            </span>
          </h1>
          <Reveal delay={620}>
            <p className="mt-5 max-w-2xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
              One production house, one standard, and a team that travels to wherever
              your story is being told.
            </p>
          </Reveal>
        </div>
      </section>

      {/* II. Introduction */}
      <section className="relative isolate">
        <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                Where we work
              </p>
            </Reveal>
            <div>
              <Reveal variant="mask">
                <p className="font-display text-[1.6rem] leading-[1.5] font-light text-ivory lg:text-[2.1rem]">
                  Our headquarters sit at {site.address.street} in{" "}
                  {site.address.locality} — a single base holding the workshop, the
                  floral cold store and the kitchen.
                </p>
              </Reveal>
              <Reveal delay={180}>
                <p className="mt-9 max-w-3xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
                  From that one address we proudly serve families, businesses and hosts
                  across many parts of Lahore and the surrounding service areas. There
                  is no second office and no branch network — there is one team that
                  travels, arriving with the same planners, the same crew and the same
                  standard whether the evening is being held in a DHA garden, a Gulberg
                  ballroom or on open ground off Raiwind Road. The pages that follow set
                  out what we have learned about producing in each of them.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* III. Explorer */}
      <AreaExplorer />

      {/* IV. Featured areas */}
      <section aria-labelledby="featured-heading" className="relative isolate border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Most requested
            </p>
          </Reveal>
          <Reveal delay={120} variant="mask">
            <h2
              id="featured-heading"
              className="mt-8 max-w-[18ch] font-display text-[2.4rem] leading-[1.03] font-light text-ivory lg:text-[3.8rem]"
            >
              Four areas we are asked about most.
            </h2>
          </Reveal>

          <div className="mt-20 space-y-28 lg:space-y-40">
            {featured.map((area, i) => {
              const mirrored = i % 2 === 1;
              return (
                <article
                  key={area.slug}
                  className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24"
                >
                  <Plate
                    image={photo(area.hero)}
                    ratio={i % 2 === 0 ? "4/5" : "5/6"}
                    speed={i % 2 === 0 ? 0.18 : -0.14}
                    fade={mirrored ? "sides" : undefined}
                    className={mirrored ? "lg:order-2" : ""}
                    sizes="(min-width: 1024px) 46vw, 100vw"
                  />
                  <div className={mirrored ? "lg:order-1" : ""}>
                    <Reveal>
                      <p className="font-sans text-[10px] tracking-[0.38em] uppercase text-gold-deep">
                        {String(i + 1).padStart(2, "0")} — {area.heroKicker}
                      </p>
                    </Reveal>
                    <Reveal delay={120} variant="mask">
                      <h3 className="mt-6 font-display text-[2.2rem] leading-[1.05] font-light text-ivory lg:text-[3.2rem]">
                        {area.shortName}
                      </h3>
                    </Reveal>
                    <Reveal delay={200}>
                      <p className="mt-7 max-w-xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
                        {area.intro.body[0]}
                      </p>
                    </Reveal>
                    <Reveal delay={280}>
                      <LuxTextLink to={`/areas/${area.slug}`} className="mt-10">
                        Explore {area.shortName}
                      </LuxTextLink>
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* V. Coverage map */}
      <CoverageMap />

      {/* VI. Close */}
      <CtaBand
        eyebrow="Wherever you are"
        title="Tell us where the evening is, and we will come to it."
        body="Send the area, the date and the rough guest count. One planner reads every enquiry and replies within 12 working hours."
      />
      <RelatedConstellation path="/areas" heading="Continue" />
    </main>
  );
}

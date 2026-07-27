import { createFileRoute } from "@tanstack/react-router";

import { photo, photosByIds } from "@/content/images";
import { craftPage } from "@/content/about";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CtaBand } from "@/components/CtaBand";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { pageMeta, jsonLd, breadcrumbSchema, imageGallerySchema, type Crumb } from "@/lib/seo";

const PATH = "/about/craftsmanship";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Craftsmanship", path: PATH },
];

export const Route = createFileRoute("/about/craftsmanship")({
  head: () => ({
    ...pageMeta({
      title: "Craftsmanship — Seven Crafts Kept Under One Roof In Lahore",
      description:
        "Timber, stem, light, salt, cloth, sound and welcome. The seven disciplines Anayat Events keeps in-house, and the standards each one is held to.",
      path: PATH,
      image: photo("ae-15").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        imageGallerySchema({
          name: "Craftsmanship at Anayat Events",
          description:
            "Fabrication, floral conditioning, lighting grade, kitchen service and table dressing photographed on Anayat Events builds in Lahore.",
          path: PATH,
          images: photosByIds(craftPage.crafts.map((c) => c.photo)),
        }),
      ),
    ],
  }),
  component: CraftPage,
});

function CraftPage() {
  const plates = photosByIds(craftPage.hero.plates);

  return (
    <main className="bg-background">
      {/* ── Hero: architectural — three vertical plates of different height ─ */}
      <section className="relative isolate mx-auto max-w-[92rem] px-6 pt-36 pb-16 md:px-12 md:pt-44">
        <HeroBackdrop id="ae-21" priority />
        <Breadcrumbs trail={trail} className="mb-12" />
        <div className="grid items-end gap-8 md:grid-cols-3 md:gap-10">
          {plates.map((p, i) => (
            <Reveal
              key={p.id}
              variant="mask"
              delay={i * 140}
              className={i === 1 ? "md:-mb-16" : i === 2 ? "md:mb-10" : ""}
            >
              <Plate
                image={p}
                ratio={i === 1 ? "9/16" : i === 0 ? "3/4" : "2/3"}
                speed={i === 1 ? 14 : -8}
                sizes="(min-width: 768px) 30vw, 100vw"
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-20 md:mt-28">
          <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
            {craftPage.hero.eyebrow}
          </p>
          <h1 className="mt-8 font-display text-[3.2rem] leading-[0.92] font-light text-ivory sm:text-[5rem] lg:text-[8.5rem]">
            <RevealWords text={craftPage.hero.title} />
          </h1>
        </div>
      </section>

      {/* ── Crafts: macro sections with a running craft word in the margin ─ */}
      <section aria-label="The crafts">
        {craftPage.crafts.map((c, i) => (
          <article key={c.index} className="border-t border-border">
            <div className="mx-auto grid max-w-[92rem] gap-10 px-6 py-16 md:px-12 lg:grid-cols-[12rem_1fr_1fr] lg:gap-16 lg:py-24">
              <div className="lg:sticky lg:top-32 lg:h-fit">
                <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold-deep">
                  {c.index}
                </p>
                <p className="mt-4 font-display text-3xl leading-none font-light text-foil lg:text-[2.6rem]">
                  {c.craft}
                </p>
                <p className="mt-6 font-sans text-[10px] leading-[2] tracking-[0.24em] uppercase text-muted-foreground/70">
                  {c.detail.split(" · ").map((d) => (
                    <span key={d} className="block">
                      {d}
                    </span>
                  ))}
                </p>
              </div>

              <div>
                <Reveal variant="mask">
                  <h2 className="font-display text-[2rem] leading-[1.08] font-light text-ivory lg:text-[3rem]">
                    {c.title}
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-8 max-w-md font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
                    {c.body}
                  </p>
                </Reveal>
              </div>

              <Reveal variant="mask" delay={80}>
                <Plate
                  image={photo(c.photo)}
                  ratio={i % 3 === 0 ? "4/5" : i % 3 === 1 ? "1/1" : "5/4"}
                  speed={i % 2 ? -7 : 7}
                  caption
                  imgClassName="saturate-[1.02]"
                  sizes="(min-width: 1024px) 32vw, 100vw"
                />
              </Reveal>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-[92rem] px-6 py-24 md:px-12">
        <div className="flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-10">
          <LuxTextLink to="/portfolio">See the crafts assembled</LuxTextLink>
          <LuxTextLink to="/about/behind-the-scenes">The build, hour by hour</LuxTextLink>
          <LuxTextLink to="/vault">The archive</LuxTextLink>
        </div>
      </section>

      <CtaBand
        eyebrow="Commission"
        title="Every craft here is available to one evening at a time."
        body="Tell us what you are imagining. We will tell you which of these seven your evening will lean on."
      />
      <RelatedConstellation path="/about/craftsmanship" heading="Continue" />
    </main>
  );
}

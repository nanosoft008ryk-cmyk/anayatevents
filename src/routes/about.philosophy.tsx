import { createFileRoute } from "@tanstack/react-router";

import { photo } from "@/content/images";
import { philosophyPage } from "@/content/about";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CtaBand } from "@/components/CtaBand";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

const PATH = "/about/philosophy";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Our Philosophy", path: PATH },
];

export const Route = createFileRoute("/about/philosophy")({
  head: () => ({
    ...pageMeta({
      title: "Our Philosophy — Six Beliefs Behind Every Anayat Evening",
      description:
        "Detail over decoration, hospitality over design, emotion over the camera. The working manifesto of a Lahore event house, written down so it can be held to.",
      path: PATH,
      image: photo("ae-14").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "Our philosophy",
          path: PATH,
          items: philosophyPage.tenets.map((t) => ({ name: t.title, path: PATH })),
        }),
      ),
    ],
  }),
  component: PhilosophyPage,
});

function PhilosophyPage() {
  return (
    <main className="bg-background">
      {/* ── Hero: typography-first. No photograph. Rules and air. ───────── */}
      <section className="relative isolate mx-auto max-w-[92rem] px-6 pt-36 pb-24 md:px-12 md:pt-48 lg:pb-36">
        <HeroBackdrop id="ae-17" priority />
        <Breadcrumbs trail={trail} className="mb-12" />
        <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
          {philosophyPage.hero.eyebrow}
        </p>
        <h1 className="mt-10 max-w-[16ch] font-display text-[3rem] leading-[0.95] font-light text-ivory sm:text-[4.5rem] lg:text-[7.5rem]">
          <RevealWords text={philosophyPage.hero.title} />
        </h1>
        <Reveal delay={500}>
          <p className="mt-5 max-w-lg font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
            {philosophyPage.hero.lede}
          </p>
        </Reveal>

        <Reveal delay={620}>
          <ul className="mt-20 grid gap-x-10 gap-y-4 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-3">
            {philosophyPage.tenets.map((t) => (
              <li
                key={t.index}
                className="font-sans text-[11px] tracking-[0.22em] uppercase text-muted-foreground"
              >
                <span className="mr-3 text-gold-deep">{t.index}</span>
                {t.title}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── Tenets: sticky roman numeral, oversized statement, quiet body ─ */}
      {philosophyPage.tenets.map((t, i) => (
        <section
          key={t.index}
          className={`border-t border-border ${i % 2 ? "bg-surface/20" : ""}`}
        >
          <div className="mx-auto grid max-w-[92rem] gap-12 px-6 py-20 md:px-12 lg:grid-cols-[7rem_1.15fr_0.85fr] lg:gap-20 lg:py-32">
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <p className="font-display text-4xl font-light text-gold-deep lg:text-6xl">
                {t.index}
              </p>
            </div>

            <div>
              <Reveal variant="mask">
                <h2 className="max-w-[16ch] font-display text-[2.1rem] leading-[1.06] font-light text-ivory lg:text-[3.4rem]">
                  {t.title}
                </h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="mt-10 max-w-[22ch] font-display text-xl leading-[1.5] font-light italic text-gold lg:text-2xl">
                  “{t.statement}”
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-10 max-w-xl font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
                  {t.body}
                </p>
              </Reveal>
            </div>

            <Reveal variant="mask" delay={100}>
              <Plate
                image={photo(t.photo)}
                ratio={i % 3 === 0 ? "3/4" : i % 3 === 1 ? "1/1" : "4/5"}
                speed={i % 2 ? -6 : 6}
                fade={i % 3 === 1 ? "bottom" : undefined}
                sizes="(min-width: 1024px) 28vw, 100vw"
              />
            </Reveal>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-[92rem] px-6 py-24 md:px-12">
        <div className="flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-10">
          <LuxTextLink to="/about/process">How the philosophy becomes a process</LuxTextLink>
          <LuxTextLink to="/about/craftsmanship">The crafts behind it</LuxTextLink>
          <LuxTextLink to="/journal">Longer reading</LuxTextLink>
        </div>
      </section>

      <CtaBand
        eyebrow="In practice"
        title="Beliefs are easy. Ask us to apply them to your date."
        body="Send the date, the guest count and the feeling. You will get a considered reply, not a brochure."
      />
      <RelatedConstellation path="/about/philosophy" heading="Continue" />
    </main>
  );
}

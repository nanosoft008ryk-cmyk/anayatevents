import { createFileRoute } from "@tanstack/react-router";

import { photo } from "@/content/images";
import { processPage } from "@/content/about";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

const PATH = "/about/process";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Our Process", path: PATH },
];

export const Route = createFileRoute("/about/process")({
  head: () => ({
    ...pageMeta({
      title: "Our Process — Dream, Discovery, Concept, Celebration, Memory",
      description:
        "Eight movements from your first sentence to the photographs you keep: how Anayat Events designs, plans, builds and serves a Lahore celebration.",
      path: PATH,
      image: photo("ae-06").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "The Anayat Events process",
          path: PATH,
          items: processPage.movements.map((m) => ({ name: m.name, path: PATH })),
        }),
      ),
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  return (
    <main className="bg-background">
      {/* ── Hero: one word per movement, set as a masthead ──────────────── */}
      <section className="mx-auto max-w-[92rem] px-6 pt-36 pb-20 md:px-12 md:pt-48 lg:pb-28">
        <Breadcrumbs trail={trail} className="mb-12" />
        <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
          {processPage.hero.eyebrow}
        </p>
        <h1 className="mt-9 max-w-[16ch] font-display text-[2.8rem] leading-[0.97] font-light text-ivory sm:text-5xl lg:text-[6rem]">
          <RevealWords text={processPage.hero.title} />
        </h1>
        <Reveal delay={520}>
          <p className="mt-12 max-w-xl font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
            {processPage.hero.lede} Replies {site.responseTime.toLowerCase()}.
          </p>
        </Reveal>

        <Reveal delay={640}>
          <p className="mt-20 flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-border pt-10 font-display text-xl font-light text-muted-foreground/55 lg:text-3xl">
            {processPage.movements.map((m, i) => (
              <span key={m.name} className="flex items-baseline gap-5">
                <span className={i === 0 ? "text-gold" : ""}>{m.name}</span>
                {i < processPage.movements.length - 1 && (
                  <span aria-hidden className="text-gold-deep/60 text-sm">
                    ↓
                  </span>
                )}
              </span>
            ))}
          </p>
        </Reveal>
      </section>

      {/* ── Movements: full-bleed plate per stage, type floating over it ── */}
      {processPage.movements.map((m, i) => (
        <section key={m.index} className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-[92rem] px-6 py-10 md:px-12 lg:py-16">
            <div
              className={`relative grid gap-8 lg:grid-cols-12 lg:items-center ${
                i % 2 ? "" : ""
              }`}
            >
              <Reveal
                variant="mask"
                className={`lg:col-span-8 ${i % 2 ? "lg:col-start-5" : "lg:col-start-1"}`}
              >
                <Plate
                  image={photo(m.photo)}
                  ratio="16/9"
                  speed={i % 2 ? -10 : 10}
                  fade={i % 3 === 0 ? "sides" : undefined}
                  imgClassName="brightness-[0.78]"
                  sizes="(min-width: 1024px) 66vw, 100vw"
                />
              </Reveal>

              <div
                className={`relative z-10 lg:col-span-6 lg:row-start-1 ${
                  i % 2 ? "lg:col-start-1 lg:-mr-10" : "lg:col-start-7 lg:-ml-10"
                }`}
              >
                <div className="glass rounded-[25px] px-7 py-10 md:px-12 md:py-14">
                  <p className="font-sans text-[10px] tracking-[0.44em] uppercase text-gold-deep">
                    {m.index} · {m.caption}
                  </p>
                  <Reveal delay={80} variant="mask">
                    <h2 className="mt-6 font-display text-[2.6rem] leading-[0.98] font-light text-ivory lg:text-[4rem]">
                      {m.name}
                    </h2>
                  </Reveal>
                  <Reveal delay={160}>
                    <p className="mt-7 max-w-md font-sans text-[15px] leading-[2.05] font-light text-muted-foreground">
                      {m.body}
                    </p>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-[92rem] px-6 py-24 md:px-12">
        <div className="flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-10">
          <LuxTextLink to="/about/craftsmanship">What happens in the workshop</LuxTextLink>
          <LuxTextLink to="/about/promise">What we promise along the way</LuxTextLink>
          <LuxTextLink to="/services">Services in full</LuxTextLink>
        </div>
      </section>

      <CtaBand
        eyebrow="Movement one"
        title="It starts with a dream, out loud."
        body="Tell us the date, the guest count and the feeling you want left behind. One planner replies personally."
      />
    </main>
  );
}

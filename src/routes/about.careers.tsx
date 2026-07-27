import { createFileRoute } from "@tanstack/react-router";

import { photo, photosByIds } from "@/content/images";
import { careersPage } from "@/content/about";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CtaBand } from "@/components/CtaBand";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxAnchor, LuxTextLink } from "@/components/ui/LuxButton";
import { SmartImg } from "@/components/ui/SmartImg";
import { pageMeta, jsonLd, breadcrumbSchema, type Crumb } from "@/lib/seo";

const PATH = "/about/careers";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Careers", path: PATH },
];

export const Route = createFileRoute("/about/careers")({
  head: () => ({
    ...pageMeta({
      title: "Careers — Join A Lahore House That Builds Its Own Work",
      description:
        "Designers, carpenters, floral hands, chefs, gaffers and hosts. We hire rarely and slowly, for temperament first — and we teach craft across disciplines.",
      path: PATH,
      image: photo("ae-21").url,
    }),
    scripts: [jsonLd(breadcrumbSchema(trail))],
  }),
  component: CareersPage,
});

function CareersPage() {
  const mosaic = photosByIds(["ae-21", "ae-13", "ae-26"]);

  return (
    <main className="bg-background">
      {/* ── Hero: mosaic band above a low, wide headline ────────────────── */}
      <section className="pt-32 md:pt-36">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <Breadcrumbs trail={trail} className="mb-10" />
        </div>

        <div className="grid grid-cols-3 gap-px bg-border">
          {mosaic.map((p, i) => (
            <div key={p.id} className="overflow-hidden bg-background">
              <SmartImg
                id={p.id} fallbackUrl={p.url} sizes="33vw"
                alt={p.alt}
                fetchPriority={i === 0 ? "high" : "auto"}
                className="h-[26svh] w-full object-cover brightness-[0.66] saturate-[0.8] md:h-[42svh] kenburns"
                style={{ animationDelay: `${i * -5}s` }}
              />
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-[92rem] px-6 pt-16 md:px-12 md:pt-24">
          <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
            {careersPage.hero.eyebrow}
          </p>
          <h1 className="mt-8 max-w-[20ch] font-display text-[2.5rem] leading-[1] font-light text-ivory sm:text-5xl lg:text-[5.2rem]">
            <RevealWords text={careersPage.hero.title} />
          </h1>
          <Reveal delay={520}>
            <p className="mt-5 max-w-xl font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
              {careersPage.hero.lede}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Culture: four statements in a wide, uneven grid ─────────────── */}
      <section className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
        <div className="grid gap-x-16 gap-y-14 md:grid-cols-2">
          {careersPage.culture.map((c, i) => (
            <Reveal key={c.title} delay={i * 90} className={i % 2 ? "md:mt-20" : ""}>
              <div className="border-t border-border pt-8">
                <h2 className="max-w-[18ch] font-display text-[1.8rem] leading-[1.15] font-light text-ivory lg:text-[2.4rem]">
                  {c.title}
                </h2>
                <p className="mt-6 max-w-md font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Crafts we hire for ─────────────────────────────────────────── */}
      <section className="border-y border-border bg-surface/20">
        <div className="mx-auto grid max-w-[92rem] gap-14 px-6 py-20 md:px-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:py-28">
          <div>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              Crafts we hire for
            </p>
            <Reveal variant="mask">
              <p className="mt-8 max-w-[15ch] font-display text-[2rem] leading-[1.1] font-light text-ivory lg:text-[2.8rem]">
                Written to, not applied to.
              </p>
            </Reveal>
            <Reveal delay={140} className="mt-10">
              <Plate image={photo("ae-06")} ratio="5/4" speed={8} sizes="(min-width:1024px) 32vw, 100vw" />
            </Reveal>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {careersPage.roles.map((r) => (
              <li key={r.name} className="flex flex-wrap items-baseline justify-between gap-4 py-6">
                <p className="font-display text-xl font-light text-ivory lg:text-2xl">{r.name}</p>
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  {r.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How to join ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          {careersPage.applySteps.map((s, i) => (
            <Reveal key={s.index} delay={i * 110}>
              <p className="font-display text-5xl font-light text-foil">{s.index}</p>
              <h3 className="mt-7 font-display text-2xl font-light text-ivory">{s.title}</h3>
              <p className="mt-5 max-w-sm font-sans text-[15px] leading-[2.05] font-light text-muted-foreground">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-4">
          <LuxAnchor href={site.whatsappHref} tone="foil">
            Write to the studio
          </LuxAnchor>
          <LuxTextLink to="/about/team">Meet the house first</LuxTextLink>
        </div>
      </section>

      <CtaBand
        eyebrow="Not looking for work?"
        title="Then perhaps you are planning something."
        body="The same crew, the same standard, applied to your evening. Send the date whenever you are ready."
      />
      <RelatedConstellation path="/about/careers" heading="Continue" />
    </main>
  );
}

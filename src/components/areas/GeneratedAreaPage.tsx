import { Link } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { AnswerBlock } from "@/components/aeo/AnswerBlock";
import { FactTable } from "@/components/aeo/FactTable";
import { AreaServiceGrid } from "@/components/areas/CoverageLinks";
import { RevealOnLoad, RevealWords } from "@/components/motion/Reveal";
import { LuxAnchor } from "@/components/ui/LuxButton";
import { kmFromBase, nearbyAreas, type LahoreArea } from "@/content/lahore-areas";
import { site } from "@/content/site";
import { areaContent, generatedAreaHero, generatedAreaTrail } from "@/lib/area-pages";

export function GeneratedAreaPage({ area }: { area: LahoreArea }) {
  const c = areaContent(area);
  const nearby = nearbyAreas(area, 8);
  const whatsapp = `${site.whatsappHref}?text=${encodeURIComponent(
    `Assalam o Alaikum, I'd like to ask about an event in ${area.name}.`,
  )}`;

  return (
    <main className="bg-background">
      <RevealOnLoad>
        <section className="relative isolate mx-auto max-w-[92rem] px-6 pt-36 pb-20 md:px-12 md:pt-44 lg:pb-28">
          <HeroBackdrop id={generatedAreaHero(area)} priority />
          <Breadcrumbs trail={generatedAreaTrail(area)} className="mb-12" />
          <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">{c.kicker}</p>
          <h1 className="mt-8 max-w-5xl font-display text-[2.6rem] leading-[1] font-light text-ivory sm:text-6xl lg:text-[5.2rem]">
            <RevealWords text={c.h1} />
          </h1>
          <p className="mt-8 max-w-2xl font-sans text-[16px] leading-[1.9] font-light text-foreground/85">
            {c.lede}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <LuxAnchor href={whatsapp} tone="foil">
              WhatsApp about {area.name}
            </LuxAnchor>
            <LuxAnchor href={site.phoneHref} tone="ghost" external={false}>
              Call {site.phoneDisplay}
            </LuxAnchor>
          </div>
        </section>
      </RevealOnLoad>

      <FactTable caption={`Events in ${area.name} at a glance`} rows={c.facts} />

      <section
        aria-labelledby="about-area"
        className="relative border-t border-border py-24 lg:py-32"
      >
        <div className="mx-auto grid max-w-[92rem] gap-12 px-6 md:px-12 lg:grid-cols-[0.8fr_1.2fr]">
          <h2
            id="about-area"
            className="font-display text-[2rem] leading-[1.1] font-light text-ivory sm:text-5xl"
          >
            Planning events in {area.name}
          </h2>
          <div className="space-y-6">
            {c.paragraphs.map((p) => (
              <p
                key={p.slice(0, 40)}
                className="font-sans text-[15px] leading-[2] font-light text-muted-foreground"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <AreaServiceGrid areaSlug={area.slug} areaName={area.name} />

      <AnswerBlock
        id="answers"
        heading={`Events in ${area.name}: straight answers`}
        items={c.answers}
        className="border-t border-border"
      />

      <section aria-labelledby="nearby" className="relative border-t border-border py-24 lg:py-32">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <h2
            id="nearby"
            className="font-display text-[1.8rem] leading-[1.15] font-light text-ivory sm:text-4xl"
          >
            Areas near {area.name}
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {nearby.map((n) => (
              <li
                key={n.slug}
                className="flex items-baseline justify-between gap-4 border-b border-border pb-3"
              >
                <Link
                  to="/areas/$slug"
                  params={{ slug: n.slug }}
                  className="font-sans text-[14px] font-light text-muted-foreground transition-colors hover:text-gold"
                >
                  {n.name}
                </Link>
                <span className="font-sans text-[11px] text-muted-foreground/70">
                  ~{kmFromBase(n)} km
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10 font-sans text-[14px] font-light text-muted-foreground">
            <Link to="/areas" className="text-gold hover:text-gold-light">
              Every area we serve in Lahore
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        eyebrow={`Planning in ${area.name}`}
        title={`Tell us about your ${area.name} celebration.`}
        body={`Share the date, the venue if you have one, and a rough guest count. A planner will reply ${site.responseTime.toLowerCase()}.`}
      />
    </main>
  );
}

import { Link } from "@tanstack/react-router";

import { Reveal } from "@/components/motion/Reveal";
import {
  ZONE_LABEL,
  ZONE_ORDER,
  areasInZone,
  getLahoreArea,
  kmFromBase,
  lahoreAreas,
  nearbyFirstSlugs,
  type LahoreArea,
} from "@/content/lahore-areas";
import type { Service } from "@/content/services";
import { areaServices, comboSlug } from "@/lib/area-pages";

/* The coverage web. Every service × area page is reachable in two clicks
 * from any area page and any service page, and every area page from the
 * /areas index, so nothing in the directory is an orphan. */

const linkClass =
  "font-sans text-[14px] leading-relaxed font-light text-muted-foreground transition-colors duration-500 hover:text-gold";

function SectionHead({
  id,
  eyebrow,
  title,
  body,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <>
      <Reveal variant="fade">
        <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal variant="rise" delay={80}>
        <h2
          id={id}
          className="mt-6 max-w-4xl font-display text-[2rem] leading-[1.1] font-light text-ivory sm:text-5xl"
        >
          {title}
        </h2>
      </Reveal>
      {body ? (
        <p className="mt-6 max-w-2xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
          {body}
        </p>
      ) : null}
    </>
  );
}

/** Every service, in one area. Used on editorial and generated area pages. */
export function AreaServiceGrid({ areaSlug, areaName }: { areaSlug: string; areaName: string }) {
  const area = getLahoreArea(areaSlug);
  if (!area) return null;
  const id = `services-in-${area.slug}`;
  return (
    <section aria-labelledby={id} className="relative border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <SectionHead
          id={id}
          eyebrow="Every service, here"
          title={`Our services in ${areaName}`}
          body={`Each one has its own page for ${areaName}, with distances, venues and straight answers.`}
        />
        <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
          {areaServices.map((s) => (
            <li key={s.slug} className="border-b border-border pb-4">
              <Link to="/$slug" params={{ slug: comboSlug(s, area) }} className={linkClass}>
                {s.name} in {areaName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** One service, across every area, grouped by part of the city. */
export function ServiceAreaDirectory({ service }: { service: Service }) {
  if (!areaServices.some((s) => s.slug === service.slug)) return null;
  const id = `${service.slug}-areas`;
  const first = nearbyFirstSlugs.map(getLahoreArea).filter((a): a is LahoreArea => Boolean(a));
  return (
    <section aria-labelledby={id} className="relative border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <SectionHead
          id={id}
          eyebrow="Across Lahore"
          title={`${service.name} in your area`}
          body={`We plan ${service.name.toLowerCase()} in ${lahoreAreas.length} Lahore neighbourhoods. Start with the ones closest to our Green Acres base.`}
        />
        <div className="mt-12">
          <p className="font-sans text-[10px] tracking-[0.36em] uppercase text-gold">
            Closest to our base
          </p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {first.map((a) => (
              <li key={a.slug}>
                <Link
                  to="/$slug"
                  params={{ slug: comboSlug(service, a) }}
                  className="inline-block border border-gold/40 px-4 py-2.5 font-sans text-[12px] tracking-[0.14em] uppercase text-ivory transition-colors duration-500 hover:border-gold hover:text-gold"
                >
                  {service.name} in {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {ZONE_ORDER.map((zone) => (
            <div key={zone}>
              <h3 className="font-sans text-[10px] tracking-[0.36em] uppercase text-gold-deep">
                {ZONE_LABEL[zone]}
              </h3>
              <ul className="mt-4 space-y-2">
                {areasInZone(zone).map((a) => (
                  <li key={a.slug}>
                    <Link
                      to="/$slug"
                      params={{ slug: comboSlug(service, a) }}
                      className={linkClass}
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Every area page, grouped by part of the city, for the /areas index. */
export function AreaDirectory() {
  return (
    <section aria-labelledby="all-areas" className="relative border-t border-border py-24 lg:py-32">
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <SectionHead
          id="all-areas"
          eyebrow="The full directory"
          title={`All ${lahoreAreas.length} areas we serve in Lahore`}
          body="Distances are by road from our base at The Palms 7 Farmhouse, Green Acres Extension."
        />
        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {ZONE_ORDER.map((zone) => (
            <div key={zone}>
              <h3 className="font-sans text-[10px] tracking-[0.36em] uppercase text-gold-deep">
                {ZONE_LABEL[zone]}
              </h3>
              <ul className="mt-4 space-y-2">
                {areasInZone(zone).map((a) => (
                  <li key={a.slug} className="flex items-baseline justify-between gap-4">
                    <Link to="/areas/$slug" params={{ slug: a.slug }} className={linkClass}>
                      {a.name}
                    </Link>
                    <span className="font-sans text-[11px] text-muted-foreground/70">
                      ~{kmFromBase(a)} km
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { locations, getLocation, type LocationArea } from "@/content/locations";
import { getService } from "@/content/services";
import { getPortfolioCategory, getPortfolioProject } from "@/content/portfolio";
import { getArticle } from "@/content/journal";
import { photo } from "@/content/images";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { CtaBand } from "@/components/CtaBand";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { AreaMap } from "@/components/AreaMap";
import { LuxTextLink } from "@/components/ui/LuxButton";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  areaServedSchema,
  faqScripts,
  imageGallerySchema,
  type Crumb,
} from "@/lib/seo";
import { uniqueFaqs } from "@/lib/entity-graph";

/** One trail feeds both the visible breadcrumbs and the BreadcrumbList JSON-LD. */
function trailFor(slug: string): Crumb[] {
  const area = getLocation(slug);
  return [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: area?.shortName ?? "Area", path: `/areas/${slug}` },
  ];
}

export const Route = createFileRoute("/areas/$slug")({
  loader: ({ params }) => {
    const area = getLocation(params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ params, loaderData }) => {
    const path = `/areas/${params.slug}`;
    if (!loaderData) {
      return {
        meta: [{ title: "Area unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { area } = loaderData;
    const trail = trailFor(params.slug);
    const heroPhoto = photo(area.hero);
    return {
      ...pageMeta({
        title: area.metaTitle,
        description: area.metaDescription,
        path,
        image: heroPhoto.url,
      }),
      scripts: [
        jsonLd(breadcrumbSchema(trail)),
        jsonLd(
          areaServedSchema({
            name: area.name,
            description: area.metaDescription,
            path,
            areaName: area.shortName,
            image: heroPhoto.url,
          }),
        ),
        jsonLd(
          imageGallerySchema({
            name: `${area.shortName} — event photography`,
            description: area.inspiration.body,
            path,
            images: area.inspiration.gallery.map((id) => {
              const p = photo(id);
              return { url: p.url, alt: p.alt, caption: p.caption };
            }),
          }),
        ),
        ...faqScripts(uniqueFaqs(path, area.faqs), path),
      ],
    };
  },
  component: AreaPage,
});

/* Per-area layout rhythm — no two area pages read in the same order. */
const rhythmClass: Record<
  LocationArea["rhythm"],
  { introGrid: string; ghost: string; galleryCols: string }
> = {
  editorial: {
    introGrid: "lg:grid-cols-[0.7fr_1.3fr]",
    ghost: "left-[-3vw] text-[20vw]",
    galleryCols: "sm:columns-2 lg:columns-3",
  },
  mirrored: {
    introGrid: "lg:grid-cols-[1.3fr_0.7fr]",
    ghost: "right-[-3vw] text-[18vw]",
    galleryCols: "sm:columns-2",
  },
  column: {
    introGrid: "lg:grid-cols-[1fr_1fr]",
    ghost: "left-1/2 -translate-x-1/2 text-[16vw]",
    galleryCols: "sm:columns-2 lg:columns-3",
  },
  stacked: {
    introGrid: "lg:grid-cols-1",
    ghost: "left-[-2vw] text-[22vw]",
    galleryCols: "sm:columns-2 lg:columns-4",
  },
};

function AreaPage() {
  const { area } = Route.useLoaderData() as { area: LocationArea };
  const params = Route.useParams();
  const trail = trailFor(area.slug);
  const rhythm = rhythmClass[area.rhythm];
  const heroPhoto = photo(area.hero);
  const frames = [
    ...new Set([area.hero, ...area.inspiration.gallery]),
  ]
    .slice(0, 4)
    .map(photo);
  const gallery = area.inspiration.gallery.map(photo);

  const services = area.services
    .map(getService)
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const categories = area.categories
    .map(getPortfolioCategory)
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const projects = area.projects
    .map(getPortfolioProject)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const reads = area.articles
    .map(getArticle)
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const nearby = area.nearby
    .map(getLocation)
    .filter((l): l is LocationArea => Boolean(l));

  return (
    <main className="bg-background">
      {/* I. Hero */}
      <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <CinematicBackdrop frames={frames} />
        <div className="relative mx-auto w-full max-w-[92rem] px-6 pt-40 pb-44 md:px-12">
          <Breadcrumbs trail={trail} className="mb-10" />
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              {site.address.locality} · {area.heroKicker}
            </p>
          </Reveal>
          <h1 className="mt-9 max-w-[18ch] font-display text-[2.6rem] leading-[1] font-light text-ivory md:text-[4.4rem] lg:text-[5.4rem]">
            <RevealWords text={area.heroHeadline} />
          </h1>
          <Reveal delay={520}>
            <p className="mt-5 max-w-2xl font-display text-[1.25rem] leading-[1.7] font-light italic text-muted-foreground md:text-[1.6rem]">
              {area.lede}
            </p>
          </Reveal>
        </div>
      </section>

      {/* II. Local introduction */}
      <section className="relative isolate overflow-hidden pt-16 lg:pt-24">
        <div className="pointer-events-none relative h-[14vw] select-none overflow-hidden lg:h-[16vw]">
          <span
            aria-hidden
            className={`absolute top-0 whitespace-nowrap font-display leading-[0.82] font-light text-ivory/[0.045] ${rhythm.ghost}`}
          >
            {area.shortName}
          </span>
        </div>
        <div className="relative mx-auto max-w-[92rem] px-6 pt-10 pb-28 md:px-12 lg:pt-16 lg:pb-40">

          <div className={`grid gap-12 ${rhythm.introGrid} lg:gap-24`}>
            <div>
              <Reveal>
                <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                  The area
                </p>
              </Reveal>
              <Reveal delay={120} variant="mask">
                <h2 className="mt-8 max-w-[16ch] font-display text-[2.1rem] leading-[1.05] font-light text-ivory lg:text-[3.2rem]">
                  {area.intro.heading}
                </h2>
              </Reveal>
            </div>
            <div className="space-y-7">
              {area.intro.body.map((para, i) => (
                <Reveal key={para.slice(0, 32)} delay={140 + i * 90}>
                  <p className="max-w-3xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* III. Experience */}
      <section className="relative isolate border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
          <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-24">
            <Plate
              image={photo(area.inspiration.gallery[1] ?? area.hero)}
              ratio="5/6"
              speed={0.16}
              className={area.rhythm === "mirrored" ? "lg:order-2" : ""}
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <div className={area.rhythm === "mirrored" ? "lg:order-1" : ""}>
              <Reveal>
                <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                  Our experience here
                </p>
              </Reveal>
              <Reveal delay={120} variant="mask">
                <h2 className="mt-8 max-w-[18ch] font-display text-[2rem] leading-[1.08] font-light text-ivory lg:text-[2.9rem]">
                  {area.experience.heading}
                </h2>
              </Reveal>
              {area.experience.body.map((para, i) => (
                <Reveal key={para.slice(0, 32)} delay={200 + i * 90}>
                  <p className="mt-7 max-w-xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
                    {para}
                  </p>
                </Reveal>
              ))}
              <dl className="mt-12 divide-y divide-border border-y border-border">
                {area.experience.notes.map((note, i) => (
                  <Reveal key={note.title} delay={120 + i * 90}>
                    <div className="flex gap-6 py-7">
                      <dt className="w-40 shrink-0 font-sans text-[11px] leading-[1.8] tracking-[0.18em] uppercase text-gold-deep">
                        {note.title}
                      </dt>
                      <dd className="font-sans text-[14px] leading-[1.95] font-light text-muted-foreground">
                        {note.body}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* IV. Services in this area */}
      <section aria-labelledby="area-services" className="relative isolate border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              What we take on
            </p>
          </Reveal>
          <Reveal delay={120} variant="mask">
            <h2
              id="area-services"
              className="mt-8 max-w-[20ch] font-display text-[2.2rem] leading-[1.05] font-light text-ivory lg:text-[3.4rem]"
            >
              Services we provide for clients in {area.shortName}.
            </h2>
          </Reveal>
          <ul className="mt-16 divide-y divide-border border-y border-border">
            {services.map((s, i) => (
              <li key={s.slug}>
                <Reveal delay={i * 70}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group flex flex-wrap items-baseline gap-x-8 gap-y-3 py-7"
                  >
                    <span className="font-sans text-[10px] tracking-[0.3em] text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.7rem] leading-[1.1] font-light text-ivory transition-colors duration-700 group-hover:text-gold lg:text-[2.3rem]">
                      {s.name}
                    </span>
                    <span className="ml-auto max-w-lg font-sans text-[13px] leading-[1.9] font-light text-muted-foreground">
                      {s.lede}
                    </span>
                    <span className="text-gold transition-transform duration-[800ms] group-hover:translate-x-2">
                      &#8594;
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* V. Venue types */}
      <section className="relative isolate border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <Reveal>
                <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                  Venue types
                </p>
              </Reveal>
              <Reveal delay={120} variant="mask">
                <h2 className="mt-8 max-w-[14ch] font-display text-[2rem] leading-[1.08] font-light text-ivory lg:text-[2.9rem]">
                  The settings clients here tend to choose
                </h2>
              </Reveal>
              <Reveal delay={220}>
                <p className="mt-7 max-w-md font-sans text-[14px] leading-[2] font-light text-muted-foreground">
                  We work in whichever setting suits the family. These are the formats we
                  are asked for most often in {area.shortName}, and how our planning
                  adapts to each.
                </p>
              </Reveal>
            </div>
            <ol className="divide-y divide-border border-y border-border">
              {area.venueTypes.map((v, i) => (
                <Reveal key={v.type} delay={i * 90}>
                  <li className="flex flex-wrap items-baseline gap-x-10 gap-y-3 py-8">
                    <span className="font-display text-[1.5rem] font-light text-gold-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[1.6rem] leading-[1.15] font-light text-ivory lg:text-[2rem]">
                      {v.type}
                    </span>
                    <span className="ml-auto max-w-lg font-sans text-[14px] leading-[1.95] font-light text-muted-foreground">
                      {v.note}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* VI. Inspiration */}
      <section className="relative isolate border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
            <div>
              <Reveal>
                <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                  Inspiration
                </p>
              </Reveal>
              <Reveal delay={120} variant="mask">
                <h2 className="mt-8 max-w-[16ch] font-display text-[2.2rem] leading-[1.05] font-light text-ivory lg:text-[3.2rem]">
                  {area.inspiration.heading}
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 max-w-2xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
                  {area.inspiration.body}
                </p>
              </Reveal>
            </div>
            <Reveal delay={260} className="self-end">
              <ul className="grid grid-cols-2 gap-x-8 gap-y-7">
                {area.inspiration.palette.map((c) => (
                  <li key={c.name} className="flex items-center gap-4">
                    <span
                      aria-hidden
                      className="h-11 w-11 rounded-full border border-border-strong"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>
                      <span className="block font-sans text-[11px] tracking-[0.2em] uppercase text-ivory">
                        {c.name}
                      </span>
                      <span className="block font-sans text-[11px] tracking-[0.14em] text-muted-foreground">
                        {c.hex}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className={`mt-20 columns-1 gap-6 ${rhythm.galleryCols} [&>*]:mb-6`}>
            {gallery.map((img, i) => (
              <figure key={`${img.id}-${i}`} className="break-inside-avoid">
                <Plate
                  image={img}
                  ratio={i % 3 === 1 ? "4/5" : i % 3 === 2 ? "1/1" : "3/4"}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw"
                />
                <figcaption className="mt-3 font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* VII. Why clients here choose us */}
      <section className="relative isolate border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Trust
            </p>
          </Reveal>
          <Reveal delay={120} variant="mask">
            <h2 className="mt-8 max-w-[20ch] font-display text-[2.2rem] leading-[1.05] font-light text-ivory lg:text-[3.4rem]">
              {area.why.heading}
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-20">
            {area.why.body.map((para, i) => (
              <Reveal key={para.slice(0, 32)} delay={160 + i * 100}>
                <p className="font-display text-[1.25rem] leading-[1.75] font-light text-muted-foreground lg:text-[1.45rem]">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIII. Related work */}
      {(projects.length > 0 || categories.length > 0) && (
        <section className="relative isolate border-t border-border">
          <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                Related work
              </p>
            </Reveal>
            <Reveal delay={120} variant="mask">
              <h2 className="mt-8 max-w-[22ch] font-display text-[2rem] leading-[1.08] font-light text-ivory lg:text-[3rem]">
                Work in the register clients in {area.shortName} usually ask for.
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-20">
              {projects.map((p, i) => (
                <Reveal key={p.slug} delay={i * 110}>
                  <Link
                    to="/portfolio/project/$slug"
                    params={{ slug: p.slug }}
                    className="group block"
                  >
                    <Plate
                      image={photo(p.hero)}
                      ratio="16/10"
                      sizes="(min-width: 1024px) 46vw, 100vw"
                    />
                    <p className="mt-6 font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                      {p.eventType}
                    </p>
                    <h3 className="mt-3 font-display text-[1.8rem] leading-[1.1] font-light text-ivory transition-colors duration-700 group-hover:text-gold lg:text-[2.2rem]">
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-lg font-sans text-[14px] leading-[1.95] font-light text-muted-foreground">
                      {p.lede}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>

            <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <LuxTextLink to={`/portfolio/${c.slug}`}>{c.name}</LuxTextLink>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-2xl font-sans text-[12px] leading-[1.9] font-light text-muted-foreground/70">
              Projects are shown to illustrate the style and standard of our work. Unless
              stated on the project page itself, they were not necessarily produced in
              this area.
            </p>
          </div>
        </section>
      )}

      {/* IX. Reading */}
      {reads.length > 0 && (
        <section className="relative isolate border-t border-border">
          <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                Useful reading
              </p>
            </Reveal>
            <ul className="mt-12 divide-y divide-border border-y border-border">
              {reads.map((a, i) => (
                <li key={a.slug}>
                  <Reveal delay={i * 80}>
                    <Link
                      to="/journal/$slug"
                      params={{ slug: a.slug }}
                      className="group flex flex-wrap items-baseline gap-x-8 gap-y-2 py-6"
                    >
                      <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                        {a.category}
                      </span>
                      <span className="max-w-3xl font-display text-[1.3rem] leading-[1.35] font-light text-ivory transition-colors duration-700 group-hover:text-gold lg:text-[1.6rem]">
                        {a.title}
                      </span>
                      <span className="ml-auto font-sans text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                        {a.readingTime}
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* X. Where we travel from */}
      <AreaMap areaName={area.shortName} travelNote={area.travelNote} />

      {/* XI. FAQs */}
      <section className="relative isolate border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <Reveal>
                <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                  Questions
                </p>
              </Reveal>
              <Reveal delay={120} variant="mask">
                <h2 className="mt-8 font-display text-[2rem] leading-[1.08] font-light text-ivory lg:text-[2.9rem]">
                  {area.shortName}, answered.
                </h2>
              </Reveal>
            </div>
            <dl className="divide-y divide-border border-y border-border">
              {area.faqs.map((faq, i) => (
                <Reveal key={faq.q} delay={i * 80}>
                  <div className="py-8">
                    <dt className="font-display text-[1.25rem] leading-[1.4] font-light text-ivory lg:text-[1.5rem]">
                      {faq.q}
                    </dt>
                    <dd className="mt-4 max-w-3xl font-sans text-[14px] leading-[2] font-light text-muted-foreground">
                      {faq.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* XII. Nearby */}
      {nearby.length > 0 && (
        <section className="relative isolate border-t border-border">
          <div className="mx-auto max-w-[92rem] px-6 py-20 md:px-12 lg:py-28">
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                Nearby service areas
              </p>
            </Reveal>
            <ul className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link
                    to="/areas/$slug"
                    params={{ slug: n.slug }}
                    className="group inline-flex items-baseline gap-4 font-display text-[1.5rem] font-light text-ivory transition-colors duration-700 hover:text-gold lg:text-[2rem]"
                  >
                    {n.shortName}
                    <span className="text-[0.7em] text-gold transition-transform duration-[800ms] group-hover:translate-x-1.5">
                      &#8594;
                    </span>
                  </Link>
                </li>
              ))}
              <li>
                <LuxTextLink to="/areas" className="self-center">
                  All areas
                </LuxTextLink>
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* XIII. Close */}
      <RelatedConstellation kind="area" slug={params.slug} options={{ kinds: ["service", "area", "collection", "article", "faq"] }} />

      <CtaBand
        eyebrow={`Planning in ${area.shortName}`}
        title={`Tell us about your ${area.shortName} celebration.`}
        body={`Share the date, the venue if you have one, and a rough guest count. A planner will reply within ${site.responseTime.toLowerCase()} — never a template.`}
      />

      {/* Hidden hero credit keeps alt-text coverage honest for the LCP frame. */}
      <span className="sr-only">{heroPhoto.alt}</span>
      <span className="sr-only">
        {locations.length} service areas across {site.address.locality}.
      </span>
    </main>
  );
}

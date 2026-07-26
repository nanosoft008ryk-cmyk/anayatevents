import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { locations } from "@/content/locations";
import { photo } from "@/content/images";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AreaMap } from "@/components/AreaMap";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  areaServedSchema,
  faqSchema,
  type Crumb,
} from "@/lib/seo";

function findArea(slug: string) {
  return locations.find((l) => l.slug === slug);
}

/** One trail feeds both the visible breadcrumbs and the BreadcrumbList JSON-LD. */
function trailFor(slug: string): Crumb[] {
  const area = findArea(slug);
  return [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: area?.shortName ?? "Area", path: `/areas/${slug}` },
  ];
}

export const Route = createFileRoute("/areas/$slug")({
  loader: ({ params }) => {
    const area = findArea(params.slug);
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
    return {
      ...pageMeta({
        title: area.metaTitle,
        description: area.metaDescription,
        path,
      }),
      scripts: [
        jsonLd(breadcrumbSchema(trail)),
        jsonLd(
          areaServedSchema({
            name: area.name,
            description: area.metaDescription,
            path,
            areaName: area.shortName,
            image: photo(area.hero).url,
          }),
        ),
        jsonLd(faqSchema(area.faqs, path)),
      ],
    };
  },
  component: AreaPage,
});

function AreaPage() {
  const { area } = Route.useLoaderData();
  const trail = trailFor(area.slug);
  const hero = photo(area.hero);
  const gallery = area.gallery.map(photo);
  const nearby = area.nearby
    .map((slug) => locations.find((l) => l.slug === slug))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="relative min-h-[78vh] w-full overflow-hidden">
        <img
          src={hero.url}
          alt={hero.alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 pt-32 pb-16 md:px-10 md:pb-24">
          <Breadcrumbs trail={trail} className="mb-8" />
          <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">
            {site.address.locality} · Service area
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
            {area.name}
          </h1>
          <p className="mt-7 max-w-2xl font-display text-xl leading-relaxed font-light italic text-muted-foreground md:text-2xl">
            {area.lede}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="font-display text-3xl leading-tight font-light text-ivory md:text-4xl">
            Producing in {area.shortName}
          </h2>
          <div className="space-y-6">
            {area.body.map((para) => (
              <p
                key={para.slice(0, 40)}
                className="font-sans text-[15px] leading-[1.85] font-light text-muted-foreground"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
            Where we build
          </p>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {area.venues.map((venue) => (
              <div key={venue.name} className="bg-background p-8 md:p-10">
                <h3 className="font-display text-2xl font-light text-ivory">{venue.name}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed font-light text-muted-foreground">
                  {venue.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics */}
      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
            Local logistics
          </p>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {area.logistics.map((item, i) => (
              <div key={item.title}>
                <span className="font-display text-3xl font-light text-gold-deep">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl font-light text-ivory">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed font-light text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location + directions */}
      <AreaMap
        areaName={area.shortName}
        travelNote={`Our production base sits at ${site.address.street}, ${site.address.locality} — the staging point for every ${area.shortName} build. Crews, kitchens and floral load-outs all leave from here, so the drive below is the one our trucks make on your event day. Visit by appointment during opening hours, or call and we will come to you.`}
      />

      {/* Gallery */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
            Recent work
          </p>
          <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {gallery.map((img) => (
              <figure key={img.id} className="break-inside-avoid">
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full border border-border object-cover"
                />
                <figcaption className="mt-3 font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <h2 className="font-display text-3xl leading-tight font-light text-ivory md:text-4xl">
              {area.shortName}, answered
            </h2>
            <dl className="divide-y divide-border border-y border-border">
              {area.faqs.map((faq) => (
                <div key={faq.q} className="py-8">
                  <dt className="font-display text-xl font-light text-ivory">{faq.q}</dt>
                  <dd className="mt-3 font-sans text-sm leading-[1.85] font-light text-muted-foreground">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Nearby */}
      {nearby.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
              Nearby areas
            </p>
            <ul className="mt-10 flex flex-wrap gap-3">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link
                    to="/areas/$slug"
                    params={{ slug: n.slug }}
                    className="inline-flex border border-border-strong px-6 py-3 font-sans text-[11px] tracking-[0.22em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
                  >
                    {n.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}

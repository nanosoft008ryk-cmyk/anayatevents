import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { services, getService, type Service } from "@/content/services";
import { getTestimonial } from "@/content/testimonials";
import { photo } from "@/content/images";
import { locations } from "@/content/locations";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
  type Crumb,
} from "@/lib/seo";

function trailFor(slug: string): Crumb[] {
  const service = getService(slug);
  return [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service?.name ?? "Service", path: `/services/${slug}` },
  ];
}

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ params, loaderData }) => {
    const path = `/services/${params.slug}`;
    if (!loaderData) {
      return { meta: [{ title: "Service unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { service } = loaderData;
    const trail = trailFor(params.slug);
    return {
      ...pageMeta({
        title: service.metaTitle,
        description: service.metaDescription,
        path,
        image: photo(service.hero).url,
      }),
      scripts: [
        jsonLd(breadcrumbSchema(trail)),
        jsonLd(
          serviceSchema({
            name: service.name,
            description: service.metaDescription,
            path,
            category: service.family,
            image: photo(service.hero).url,
          }),
        ),
        jsonLd(faqSchema(service.faqs, path)),
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: Service };
  const trail = trailFor(service.slug);
  const hero = photo(service.hero);
  const gallery = service.gallery.map(photo);
  const quote = getTestimonial(service.testimonial);
  const related = service.related
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));

  return (
    <main className="bg-background">
      <section className="relative min-h-[78vh] w-full overflow-hidden">
        <img src={hero.url} alt={hero.alt} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-6 pt-32 pb-16 md:px-10 md:pb-24">
          <Breadcrumbs trail={trail} className="mb-8" />
          <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">
            {service.eyebrow}
          </p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
            {service.title}
          </h1>
          <p className="mt-7 max-w-2xl font-display text-xl leading-relaxed font-light italic text-muted-foreground md:text-2xl">
            {service.lede}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 className="font-display text-3xl leading-tight font-light text-ivory md:text-4xl">
            The work itself
          </h2>
          <div className="space-y-6">
            {service.body.map((para) => (
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

      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
            What is included
          </p>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            {service.inclusions.map((item) => (
              <div key={item.title} className="bg-background p-8 md:p-10">
                <h3 className="font-display text-2xl font-light text-ivory">{item.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed font-light text-muted-foreground">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">Recent work</p>
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

      {quote && (
        <section className="border-t border-border bg-surface/30">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center md:px-10 lg:py-28">
            <blockquote className="font-display text-3xl leading-snug font-light italic text-ivory md:text-4xl">
              “{quote.quote}”
            </blockquote>
            <p className="mt-8 font-sans text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
              {quote.name} · {quote.event} · {quote.area}
            </p>
          </div>
        </section>
      )}

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <h2 className="font-display text-3xl leading-tight font-light text-ivory md:text-4xl">
              {service.name}, answered
            </h2>
            <dl className="divide-y divide-border border-y border-border">
              {service.faqs.map((faq) => (
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

      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
            {service.name} across Lahore
          </p>
          <ul className="mt-8 flex flex-wrap gap-4">
            {locations.slice(0, 8).map((l) => (
              <li key={l.slug}>
                <Link
                  to="/areas/$slug"
                  params={{ slug: l.slug }}
                  className="btn-shape btn-shape inline-flex items-center border border-border-strong px-6 py-3 font-sans text-[11px] tracking-[0.2em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
                >
                  {l.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
              Often taken together
            </p>
            <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/services/$slug"
                  params={{ slug: r.slug }}
                  className="group bg-background p-8"
                >
                  <h3 className="font-display text-xl font-light text-ivory transition-colors group-hover:text-gold">
                    {r.name}
                  </h3>
                  <p className="mt-3 font-sans text-[13px] leading-relaxed font-light text-muted-foreground">
                    {r.lede}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </main>
  );
}

import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { AnswerBlock } from "@/components/aeo/AnswerBlock";
import { Reveal, RevealOnLoad, RevealWords } from "@/components/motion/Reveal";
import { LuxAnchor } from "@/components/ui/LuxButton";
import { photo } from "@/content/images";
import { redirectTarget } from "@/content/redirects";
import { site } from "@/content/site";
import {
  areaDisplay,
  areaPagePath,
  comboContent,
  nearbyCombos,
  resolveCombo,
  siblingCombos,
  type Combo,
} from "@/lib/area-pages";
import {
  abs,
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  pageMeta,
  webPageSchema,
  type Crumb,
} from "@/lib/seo";

/* ---------------------------------------------------------------------------
 * /<service>-<area>-lahore — one service in one Lahore neighbourhood.
 *
 * A dynamic segment outranks the root splat, so this route also inherits the
 * splat's single-segment duty: an advertised keyword URL still answers with a
 * 301 to its canonical page, and anything else is the sitewide 404.
 * ------------------------------------------------------------------------- */

function trailFor(c: Combo): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Areas", path: "/areas" },
    { name: c.area.name, path: areaPagePath(c.area) },
    { name: c.service.name, path: comboContent(c).path },
  ];
}

export const Route = createFileRoute("/$slug")({
  beforeLoad: ({ params }) => {
    if (resolveCombo(params.slug)) return;
    const target = redirectTarget(("/" + params.slug).replace(/\/+$/, "").toLowerCase());
    if (target) throw redirect({ to: target, statusCode: 301 });
    throw notFound();
  },
  loader: ({ params }) => {
    const combo = resolveCombo(params.slug);
    if (!combo) throw notFound();
    return { slug: params.slug.toLowerCase() };
  },
  head: ({ loaderData }) => {
    const combo = loaderData ? resolveCombo(loaderData.slug) : undefined;
    if (!combo)
      return { meta: [{ title: "Page not found" }, { name: "robots", content: "noindex" }] };
    const c = comboContent(combo);
    const image = photo(combo.service.hero).url;
    const { area, service } = combo;
    return {
      ...pageMeta({ title: c.metaTitle, description: c.metaDescription, path: c.path, image }),
      scripts: [
        jsonLd(breadcrumbSchema(trailFor(combo))),
        jsonLd(webPageSchema({ name: c.h1, description: c.metaDescription, path: c.path, image })),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": abs(`${c.path}#service`),
          name: c.h1,
          description: c.metaDescription,
          serviceType: service.name,
          url: abs(c.path),
          image: abs(image),
          provider: { "@id": abs("/#business") },
          isRelatedTo: { "@id": abs(`/services/${service.slug}#service`) },
          areaServed: {
            "@type": "Place",
            name: areaDisplay(area),
            url: abs(areaPagePath(area)),
            geo: { "@type": "GeoCoordinates", latitude: area.lat, longitude: area.lng },
            containedInPlace: { "@type": "City", name: "Lahore" },
          },
          offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "PKR",
            url: abs("/contact"),
          },
        }),
        jsonLd(faqSchema(c.answers, c.path)),
      ],
    };
  },
  component: ComboPage,
});

function ComboPage() {
  const { slug } = Route.useLoaderData();
  const combo = resolveCombo(slug)!;
  const { service, area } = combo;
  const c = comboContent(combo);
  const nearby = nearbyCombos(combo);
  const siblings = siblingCombos(combo);
  const whatsapp = `${site.whatsappHref}?text=${encodeURIComponent(
    `Assalam o Alaikum, I'd like to ask about ${service.name} in ${area.name}.`,
  )}`;
  const catering = service.slug.includes("catering");

  return (
    <main className="bg-background">
      <RevealOnLoad>
        <section className="relative isolate mx-auto max-w-[92rem] px-6 pt-36 pb-20 md:px-12 md:pt-44 lg:pb-28">
          <HeroBackdrop id={service.hero} priority />
          <Breadcrumbs trail={trailFor(combo)} className="mb-12" />
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

      <section aria-labelledby="plan" className="relative border-t border-border py-24 lg:py-32">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-6 md:px-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal variant="rise">
            <h2
              id="plan"
              className="font-display text-[2rem] leading-[1.1] font-light text-ivory sm:text-5xl"
            >
              {c.planHeading}
            </h2>
          </Reveal>
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

      <section
        aria-labelledby="included"
        className="relative border-t border-border py-24 lg:py-32"
      >
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <h2
            id="included"
            className="font-display text-[2rem] leading-[1.1] font-light text-ivory sm:text-5xl"
          >
            What is included
          </h2>
          <ul className="mt-10 flex flex-wrap gap-3">
            {service.inclusions.slice(1).map((inc) => (
              <li
                key={inc.title}
                className="border border-gold/30 px-4 py-2.5 font-sans text-[11px] tracking-[0.24em] uppercase text-gold"
              >
                {inc.title}
              </li>
            ))}
          </ul>
          <p className="mt-12 font-sans text-[14px] font-light text-muted-foreground">
            The full brief is on our{" "}
            <Link
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="text-gold hover:text-gold-light"
            >
              {service.name} page
            </Link>
            {catering ? (
              <>
                {", and per-head packages are on the "}
                <Link to="/menu" className="text-gold hover:text-gold-light">
                  catering menu
                </Link>
              </>
            ) : null}
            .
          </p>
        </div>
      </section>

      <AnswerBlock
        id="answers"
        heading={`${service.name} in ${area.name}: straight answers`}
        items={c.answers}
        className="border-t border-border"
      />

      <section aria-labelledby="more" className="relative border-t border-border py-24 lg:py-32">
        <div className="mx-auto grid max-w-[92rem] gap-16 px-6 md:px-12 lg:grid-cols-2">
          <div>
            <h2
              id="more"
              className="font-display text-[1.8rem] leading-[1.15] font-light text-ivory sm:text-4xl"
            >
              {service.name} near {area.name}
            </h2>
            <ul className="mt-8 space-y-3">
              {nearby.map((n) => (
                <li
                  key={n.path}
                  className="flex items-baseline justify-between gap-4 border-b border-border pb-3"
                >
                  <Link
                    to="/$slug"
                    params={{ slug: n.path.slice(1) }}
                    className="font-sans text-[14px] font-light text-muted-foreground transition-colors hover:text-gold"
                  >
                    {service.name} in {n.area.name}
                  </Link>
                  <span className="font-sans text-[11px] text-muted-foreground/70">~{n.km} km</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[1.8rem] leading-[1.15] font-light text-ivory sm:text-4xl">
              More for {area.name}
            </h2>
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {siblings.map((s) => (
                <li key={s.path} className="border-b border-border pb-3">
                  <Link
                    to="/$slug"
                    params={{ slug: s.path.slice(1) }}
                    className="font-sans text-[14px] font-light text-muted-foreground transition-colors hover:text-gold"
                  >
                    {s.service.name} in {area.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 font-sans text-[14px] font-light text-muted-foreground">
              Everything we do in the area:{" "}
              <Link
                to="/areas/$slug"
                params={{ slug: area.slug }}
                className="text-gold hover:text-gold-light"
              >
                events in {area.name}
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow={`Planning in ${area.name}`}
        title={c.ctaTitle}
        body={`Send the date of your ${c.eventName} in ${area.name}, the venue if you have one, and a rough guest count.`}
      />
    </main>
  );
}

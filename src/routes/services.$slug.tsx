import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { services, getService, type Service } from "@/content/services";
import { getTestimonial } from "@/content/testimonials";
import { photo } from "@/content/images";
import { locations } from "@/content/locations";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxLink } from "@/components/ui/LuxButton";
import { JourneyRail } from "@/components/services/JourneyRail";
import { LuxAccordion } from "@/components/services/LuxAccordion";
import { imgAttrs } from "@/lib/img";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  serviceSchema,
  faqSchema,
  imageGallerySchema,
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

/** Deterministic per-page atmosphere so no two service pages share a mood. */
function atmosphere(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) % 9973;
  return {
    mirrored: h % 2 === 0,
    heroAlign: h % 3, // 0 bottom-left, 1 centre, 2 bottom-right
    ratio: ["4/5", "5/4", "3/4", "1/1"][h % 4],
    openingWord: ["Presence", "Arrival", "Hush", "Roar", "Light", "Warmth"][h % 6],
  };
}

const stages = [
  { label: "Inquiry", body: "One conversation, no forms. We listen for the evening you keep describing." },
  { label: "Concept", body: "A written direction: palette, materials, light, the emotional arc of the night." },
  { label: "Design", body: "Elevations, floral schedules and a lighting plot — issued, not improvised." },
  { label: "Execution", body: "A rehearsed run of show, held by the planner who read your first message." },
  { label: "Celebration", body: "The part you are allowed to forget about entirely." },
];

const craft = [
  "Florals", "Textures", "Lighting", "Furniture", "Cuisine",
  "Table styling", "Invitations", "Sound", "Fragrance", "Timing",
];

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
        jsonLd(
          imageGallerySchema({
            name: `${service.name} — recent work`,
            description: `Photographs from recent ${service.name.toLowerCase()} produced by Anayat Events & Catering in Lahore.`,
            path,
            images: service.gallery.map((id) => {
              const p = photo(id);
              return { url: p.url, alt: p.alt, caption: p.caption };
            }),
          }),
        ),
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: Service };
  const params = Route.useParams();
  const trail = trailFor(service.slug);
  const hero = photo(service.hero);
  const gallery = service.gallery.map(photo);
  const quote = getTestimonial(service.testimonial);
  const mood = atmosphere(service.slug);
  const related = service.related
    .map((slug) => services.find((s) => s.slug === slug))
    .filter((s): s is Service => Boolean(s));

  const alignClass =
    mood.heroAlign === 1
      ? "justify-center text-center items-center"
      : mood.heroAlign === 2
        ? "justify-end lg:items-end lg:text-right"
        : "justify-end";

  return (
    <main className="bg-background">
      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[100svh] overflow-hidden">
        <img
          {...imgAttrs(hero.id, hero.url, "100vw")}
          alt={hero.alt}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover kenburns"
        />
        <span aria-hidden="true" className="absolute inset-0 -z-10 veil" />
        <span aria-hidden="true" className="absolute inset-0 -z-10 vignette" />
        <span aria-hidden="true" className="absolute inset-0 -z-10 grain" />

        <div
          className={`mx-auto flex w-full max-w-[92rem] flex-col px-6 pt-36 pb-24 md:px-12 ${alignClass}`}
        >
          <Breadcrumbs trail={trail} className="mb-10" />
          <Reveal variant="fade">
            <p className="eyebrow">{service.eyebrow}</p>
          </Reveal>
          <h1 className="mt-7 max-w-5xl font-display text-[3rem] leading-[0.94] font-light text-ivory sm:text-7xl lg:text-[6.5rem]">
            <RevealWords text={service.title} />
          </h1>
          <Reveal variant="rise" delay={200}>
            <p className="mt-5 max-w-2xl font-display text-xl leading-[1.5] font-light text-ivory/80 italic md:text-3xl">
              {service.lede}
            </p>
          </Reveal>
          <Reveal variant="fade" delay={320}>
            <div className="mt-12">
              <LuxLink to="/contact" tone="foil">
                Request a consultation
              </LuxLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Introduction: emotion first ───────────────────────────── */}
      <section className="chapter light-left relative overflow-hidden py-28 lg:py-44">
        <p
          aria-hidden="true"
          className="ghost-word absolute -top-10 right-0 text-[20vw] opacity-60 select-none"
        >
          {mood.openingWord}
        </p>
        <div className="relative mx-auto max-w-[92rem] px-6 md:px-12">
          <Reveal variant="mask" duration={1400}>
            <p className="max-w-4xl font-display text-[2rem] leading-[1.2] font-light text-ivory sm:text-5xl lg:text-[3.5rem]">
              {service.body[0]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── The experience: editorial spread ──────────────────────── */}
      <section className="relative overflow-hidden pb-24 lg:pb-40">
        <div className="mx-auto grid max-w-[92rem] items-center gap-12 px-6 md:px-12 lg:grid-cols-12 lg:gap-20">
          <div className={`lg:col-span-6 ${mood.mirrored ? "lg:order-2" : ""}`}>
            <Plate
              image={gallery[1] ?? hero}
              ratio={mood.ratio}
              speed={0.16}
              fade={mood.mirrored ? "top" : "bottom"}
              caption
              sizes="(min-width: 1024px) 48vw, 100vw"
            />
          </div>
          <div className={`lg:col-span-6 ${mood.mirrored ? "lg:order-1" : ""}`}>
            <Reveal variant="fade">
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
                The experience
              </p>
            </Reveal>
            <div className="mt-8 space-y-7">
              {service.body.slice(1).map((para, i) => (
                <Reveal key={para.slice(0, 32)} variant="rise" delay={i * 70}>
                  <p className="max-w-xl font-sans text-[15px] leading-[2.05] font-light text-ivory/70">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Signature highlights — storytelling blocks ────────────── */}
      <section className="chapter light-right relative overflow-hidden py-24 lg:py-36">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <Reveal variant="fade">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              Signature highlights
            </p>
          </Reveal>
          <div className="mt-14 space-y-16 lg:space-y-24">
            {service.inclusions.map((inc, i) => (
              <Reveal key={inc.title} variant="rise" delay={i * 60}>
                <div
                  className="grid gap-6 lg:grid-cols-12 lg:items-baseline"
                  style={{ paddingLeft: `${(i % 3) * 2}rem` }}
                >
                  <p className="font-display text-3xl leading-none font-light text-gold/40 lg:col-span-2">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="font-display text-[2rem] leading-tight font-light text-ivory lg:col-span-4 lg:text-5xl">
                    {inc.title}
                  </h2>
                  <p className="max-w-xl font-sans text-[15px] leading-[2] font-light text-ivory/65 lg:col-span-6">
                    {inc.body}
                  </p>
                </div>
                <span className="mt-10 block hairline" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Showcase — asymmetric magazine crops ──────────────────── */}
      <section className="relative py-8 lg:py-16">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <Reveal variant="fade">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              Showcase
            </p>
          </Reveal>
        </div>
        <div className="mx-auto mt-12 grid max-w-[92rem] grid-cols-12 gap-4 px-6 md:gap-8 md:px-12">
          {gallery.map((img, i) => {
            const span = [12, 7, 5, 6, 6, 8, 4][i % 7];
            const ratio = [16 / 9, 3 / 4, 4 / 5, 1, 4 / 3, 16 / 10, 3 / 4][i % 7];
            return (
              <div
                key={img.id}
                className="col-span-12"
                style={{ gridColumn: `span ${span} / span ${span}` }}
              >
                <Plate
                  image={img}
                  ratio={String(ratio)}
                  speed={i % 2 === 0 ? 0.12 : 0}
                  caption
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Quote ─────────────────────────────────────────────────── */}
      {quote && (
        <section className="relative isolate overflow-hidden py-28 lg:py-40">
          <img
            {...imgAttrs(gallery[0]?.id ?? hero.id, gallery[0]?.url ?? hero.url, "100vw")}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20 drift-slow"
          />
          <span aria-hidden="true" className="absolute inset-0 -z-10 veil" />
          <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
            <Reveal variant="mask" duration={1300}>
              <blockquote className="font-display text-[1.9rem] leading-[1.28] font-light text-ivory italic md:text-[3rem]">
                “{quote.quote}”
              </blockquote>
            </Reveal>
            <Reveal variant="fade" delay={100}>
              <p className="mt-9 font-sans text-[10px] tracking-[0.34em] uppercase text-gold">
                {quote.name} · {quote.event} · {quote.area}
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ─── Planning journey ──────────────────────────────────────── */}
      <section className="relative py-24 lg:py-36">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <Reveal variant="fade">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              How {service.name.toLowerCase()} is planned
            </p>
          </Reveal>
          <div className="mt-16">
            <JourneyRail stages={stages} />
          </div>
        </div>
      </section>

      {/* ─── Luxury details — a running band of craft ──────────────── */}
      <section className="relative overflow-hidden py-16">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <span className="block hairline" />
          <ul className="mt-8 flex flex-wrap items-baseline gap-x-10 gap-y-4">
            {craft.map((c, i) => (
              <Reveal as="li" key={c} variant="fade" delay={i * 40}>
                <span className="font-display text-2xl font-light text-ivory/45 transition-colors duration-500 hover:text-gold md:text-4xl">
                  {c}
                </span>
              </Reveal>
            ))}
          </ul>
          <span className="mt-8 block hairline" />
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────────────── */}
      <section className="relative py-24 lg:py-36">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-6 md:px-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">
          <div>
            <Reveal variant="mask" duration={1200}>
              <h2 className="font-display text-4xl leading-[1.04] font-light text-ivory md:text-5xl">
                {service.name},
                <span className="block italic text-gold">answered.</span>
              </h2>
            </Reveal>
          </div>
          <LuxAccordion items={service.faqs} />
        </div>
      </section>

      {/* ─── Locations ─────────────────────────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
            {service.name} across Lahore
          </p>
          <ul className="mt-8 flex flex-wrap gap-4">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  to="/areas/$slug"
                  params={{ slug: l.slug }}
                  className="btn-shape inline-flex items-center border border-border-strong px-6 py-3 font-sans text-[10px] tracking-[0.26em] uppercase text-ivory/80 transition-colors hover:border-gold hover:text-gold"
                >
                  {l.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Related — editorial recommendations ───────────────────── */}
      {related.length > 0 && (
        <section className="relative py-20 lg:py-32">
          <div className="mx-auto max-w-[92rem] px-6 md:px-12">
            <Reveal variant="fade">
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
                Often taken together
              </p>
            </Reveal>
            <ul className="mt-10">
              {related.map((r, i) => (
                <Reveal as="li" key={r.slug} variant="rise" delay={i * 60}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: r.slug }}
                    className="group/rel grid items-center gap-4 border-t border-border py-10 lg:grid-cols-12"
                  >
                    <span className="font-sans text-[10px] tracking-[0.34em] uppercase text-gold-deep lg:col-span-2">
                      {r.family}
                    </span>
                    <span className="font-display text-3xl leading-tight font-light text-ivory transition-colors duration-500 group-hover/rel:text-gold lg:col-span-4 lg:text-5xl">
                      {r.name}
                    </span>
                    <span className="font-sans text-sm leading-[1.9] font-light text-ivory/60 lg:col-span-5">
                      {r.lede}
                    </span>
                    <span className="font-sans text-gold opacity-0 transition-all duration-500 group-hover/rel:translate-x-2 group-hover/rel:opacity-100 lg:col-span-1 lg:text-right">
                      &#8594;
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <RelatedConstellation kind="service" slug={params.slug} options={{ kinds: ["collection", "article", "area", "faq"] }} />

      <CtaBand
        eyebrow="Let us begin"
        title="Let's create something unforgettable."
        body={`Tell us the date and the guest count for your ${service.name.toLowerCase()}. One planner reads every enquiry and replies within 12 working hours.`}
      />
    </main>
  );
}

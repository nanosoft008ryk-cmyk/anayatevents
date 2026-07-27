import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import {
  portfolioCategories,
  getPortfolioCategory,
  projectsForCategory,
  type PortfolioCategory,
} from "@/content/portfolio";
import { photo } from "@/content/images";
import { getService } from "@/content/services";
import { getLocation } from "@/content/locations";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  imageGallerySchema,
  faqScripts,
  type Crumb,
} from "@/lib/seo";
import { uniqueFaqs } from "@/lib/entity-graph";

function trailFor(slug: string): Crumb[] {
  const category = getPortfolioCategory(slug);
  return [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: category?.name ?? "Collection", path: `/portfolio/${slug}` },
  ];
}

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const category = getPortfolioCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    const path = `/portfolio/${params.slug}`;
    if (!loaderData) {
      return { meta: [{ title: "Collection unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const trail = trailFor(params.slug);
    return {
      ...pageMeta({
        title: category.metaTitle,
        description: category.metaDescription,
        path,
        image: photo(category.hero).url,
      }),
      scripts: [
        jsonLd(breadcrumbSchema(trail)),
        jsonLd(
          imageGallerySchema({
            name: category.name,
            description: category.metaDescription,
            path,
            images: category.photos.map((id) => {
              const p = photo(id);
              return { url: p.url, alt: p.alt, caption: p.caption };
            }),
          }),
        ),
        ...faqScripts(uniqueFaqs(path, category.faqs), path),
      ],
    };
  },
  component: PortfolioCategoryPage,
});

/** Each collection gets its own composition rhythm so no two read alike. */
const rhythms: Record<PortfolioCategory["personality"], string[]> = {
  editorial: ["16/10", "4/5", "3/4", "16/11", "4/5", "5/4", "3/4", "16/10"],
  mirrored: ["4/5", "16/10", "5/4", "3/4", "16/11", "4/5", "4/3", "3/4"],
  column: ["3/4", "4/5", "16/11", "4/5", "3/4", "5/4", "16/10", "4/5"],
  stacked: ["16/11", "3/4", "4/5", "16/10", "4/5", "5/4", "3/4", "4/3"],
};

const spans: Record<PortfolioCategory["personality"], string[]> = {
  editorial: ["md:col-span-8", "md:col-span-4 md:mt-40", "md:col-span-5", "md:col-span-7 md:mt-24", "md:col-span-4", "md:col-span-8 md:mt-32", "md:col-span-6", "md:col-span-6 md:mt-16"],
  mirrored: ["md:col-span-5", "md:col-span-7 md:mt-32", "md:col-span-7", "md:col-span-5 md:mt-28", "md:col-span-6", "md:col-span-6 md:mt-20", "md:col-span-8", "md:col-span-4 md:mt-36"],
  column: ["md:col-span-4", "md:col-span-4 md:mt-36", "md:col-span-4 md:mt-16", "md:col-span-6", "md:col-span-6 md:mt-28", "md:col-span-5", "md:col-span-7 md:mt-20", "md:col-span-6"],
  stacked: ["md:col-span-12", "md:col-span-5", "md:col-span-7 md:mt-24", "md:col-span-7", "md:col-span-5 md:mt-32", "md:col-span-6", "md:col-span-6 md:mt-20", "md:col-span-8"],
};

function PortfolioCategoryPage() {
  const { category } = Route.useLoaderData() as { category: PortfolioCategory };
  const params = Route.useParams();
  const trail = trailFor(category.slug);
  const frames = category.photos.map(photo);
  const projects = projectsForCategory(category.slug);
  const others = portfolioCategories.filter((c) => c.slug !== category.slug);
  const ratio = rhythms[category.personality];
  const span = spans[category.personality];
  const mirrored = category.personality === "mirrored";

  return (
    <main className="bg-background">
      {/* I — Cinematic title */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden">
        <CinematicBackdrop frames={category.heroFrames.map(photo)} interval={7200} />
        <div
          className={`mx-auto w-full max-w-7xl px-6 pb-36 md:px-10 md:pb-44 ${mirrored ? "md:text-right" : ""}`}
        >
          <Reveal variant="fade" duration={1300}>
            <div
              className={`flex items-center gap-5 ${mirrored ? "md:justify-end" : ""}`}
            >
              <span aria-hidden className="h-px w-14 bg-gold" />
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                {category.kicker} — Collection
              </p>
            </div>
          </Reveal>
          <h1
            className={`mt-9 max-w-4xl font-display text-[12vw] leading-[0.9] font-light text-ivory md:text-[6.5vw] ${mirrored ? "md:ml-auto" : ""}`}
          >
            <RevealWords text={category.name} delay={120} />
          </h1>
          <Reveal variant="rise" delay={520}>
            <p
              className={`mt-5 max-w-xl font-display text-xl leading-relaxed font-light italic text-muted-foreground md:text-2xl ${mirrored ? "md:ml-auto" : ""}`}
            >
              {category.lede}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pt-10 md:px-10">
        <Breadcrumbs trail={trail} />
      </div>

      {/* II — Statement */}
      <section className="relative overflow-hidden pt-24 md:pt-36">
        <p
          aria-hidden
          className="pointer-events-none absolute -top-10 right-0 font-display text-[20vw] leading-none font-light text-ivory/[0.03] select-none"
        >
          {category.kicker}
        </p>
        <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <Reveal variant="rise">
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
                The collection
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            {category.body.map((para, i) => (
              <Reveal key={para.slice(0, 30)} variant="rise" delay={i * 110}>
                <p className="mb-7 font-display text-2xl leading-[1.5] font-light text-ivory/90 md:text-[2rem]">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* III — Editorial gallery */}
      <section className="pt-24 md:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12">
            {frames.map((img, i) => (
              <div key={img.id} className={span[i % span.length]}>
                <Reveal variant="mask" duration={1500} delay={(i % 2) * 90}>
                  <Plate
                    image={img}
                    ratio={ratio[i % ratio.length]}
                    speed={i % 3 === 0 ? 0.16 : 0}
                    fade={i % 5 === 0 ? "sides" : undefined}
                    caption
                    priority={i === 0}
                    sizes="(min-width: 768px) 55vw, 100vw"
                  />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IV — Philosophy */}
      <section className="pt-32 md:pt-48">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal variant="rise">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
              Design philosophy
            </p>
          </Reveal>
          <div className="mt-14 grid gap-14 md:grid-cols-3">
            {category.philosophy.map((p, i) => (
              <Reveal key={p.title} variant="rise" delay={i * 120}>
                <div className="border-t border-border-strong pt-7">
                  <h2 className="font-display text-2xl leading-snug font-light text-ivory md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-5 font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* V — Case studies from this collection */}
      {projects.length > 0 && (
        <section className="pt-32 md:pt-48">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <Reveal variant="rise">
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
                From this collection
              </p>
            </Reveal>
            <div className="mt-14 grid gap-14 md:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal key={p.slug} variant="rise" delay={i * 120}>
                  <Link
                    to="/portfolio/project/$slug"
                    params={{ slug: p.slug }}
                    className="group block"
                  >
                    <Plate image={photo(p.hero)} ratio="4/3" sizes="(min-width: 768px) 46vw, 100vw" />
                    <p className="mt-6 font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                      {p.eventType} — {p.area}
                    </p>
                    <h3 className="mt-3 font-display text-3xl font-light text-ivory transition-colors group-hover:text-gold md:text-4xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 max-w-md font-sans text-sm leading-relaxed font-light text-muted-foreground">
                      {p.subtitle}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* VI — Behind the build + timeline */}
      <section className="pt-32 md:pt-48">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <Reveal variant="rise">
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
                Behind the work
              </p>
            </Reveal>
            <div className="mt-12 space-y-10">
              {category.behind.map((b, i) => (
                <Reveal key={b.title} variant="rise" delay={i * 110}>
                  <h3 className="font-display text-xl font-light text-ivory">{b.title}</h3>
                  <p className="mt-3 font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
                    {b.body}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="md:col-span-7">
            <Reveal variant="rise">
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
                How it is delivered
              </p>
            </Reveal>
            <ol className="relative mt-12 space-y-12 border-l border-border-strong pl-8">
              {category.timeline.map((t, i) => (
                <Reveal key={t.step} as="li" variant="rise" delay={i * 110}>
                  <span
                    aria-hidden
                    className="absolute -left-[5px] mt-2 block h-2 w-2 rounded-full bg-gold"
                  />
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                    {t.step}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-light text-ivory">{t.title}</h3>
                  <p className="mt-3 font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
                    {t.body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* VII — FAQs */}
      <section className="pt-32 md:pt-48">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-4">
            <Reveal variant="rise">
              <h2 className="font-display text-3xl leading-[1.1] font-light text-ivory md:text-5xl">
                Questions about <span className="italic">{category.name.toLowerCase()}</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <dl className="divide-y divide-border border-y border-border">
              {category.faqs.map((f, i) => (
                <Reveal key={f.q} variant="fade" delay={i * 90}>
                  <div className="py-8">
                    <dt className="font-display text-xl font-light text-ivory md:text-2xl">
                      {f.q}
                    </dt>
                    <dd className="mt-4 max-w-2xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
                      {f.a}
                    </dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* VIII — Related + other collections */}
      <section className="pt-32 md:pt-44">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-3 md:px-10">
          <div>
            <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold">
              Related services
            </p>
            <ul className="mt-6 space-y-3">
              {category.relatedServices.map((s) => {
                const svc = getService(s);
                if (!svc) return null;
                return (
                  <li key={s}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: s }}
                      className="font-display text-xl font-light text-ivory transition-colors hover:text-gold"
                    >
                      {svc.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold">
              Where we build it
            </p>
            <ul className="mt-6 space-y-3">
              {category.relatedLocations.map((l) => {
                const loc = getLocation(l);
                if (!loc) return null;
                return (
                  <li key={l}>
                    <Link
                      to="/areas/$slug"
                      params={{ slug: l }}
                      className="font-display text-xl font-light text-ivory transition-colors hover:text-gold"
                    >
                      {loc.shortName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold">
              Other collections
            </p>
            <ul className="mt-6 space-y-3">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/portfolio/$slug"
                    params={{ slug: c.slug }}
                    className="font-display text-xl font-light text-ivory transition-colors hover:text-gold"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="mt-32 md:mt-44">
      <RelatedConstellation kind="collection" slug={params.slug} options={{ kinds: ["service", "project", "area", "article"] }} />

      <CtaBand />
      </div>
    </main>
  );
}

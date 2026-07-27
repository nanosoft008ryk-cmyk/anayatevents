import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import {
  getPortfolioProject,
  getPortfolioCategory,
  portfolioProjects,
  type PortfolioProject,
} from "@/content/portfolio";
import { photo } from "@/content/images";
import { getService } from "@/content/services";
import { getLocation } from "@/content/locations";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  imageGallerySchema,
  type Crumb,
} from "@/lib/seo";

function trailFor(slug: string): Crumb[] {
  const project = getPortfolioProject(slug);
  const category = project ? getPortfolioCategory(project.category) : undefined;
  return [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    ...(category ? [{ name: category.name, path: `/portfolio/${category.slug}` }] : []),
    { name: project?.title ?? "Project", path: `/portfolio/project/${slug}` },
  ];
}

export const Route = createFileRoute("/portfolio/project/$slug")({
  loader: ({ params }) => {
    const project = getPortfolioProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    const path = `/portfolio/project/${params.slug}`;
    if (!loaderData) {
      return { meta: [{ title: "Project unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { project } = loaderData;
    return {
      ...pageMeta({
        title: project.metaTitle,
        description: project.metaDescription,
        path,
        image: photo(project.hero).url,
      }),
      scripts: [
        jsonLd(breadcrumbSchema(trailFor(params.slug))),
        jsonLd(
          imageGallerySchema({
            name: `${project.title} — ${project.eventType}, ${project.area}`,
            description: project.metaDescription,
            path,
            images: project.gallery.map((id) => {
              const p = photo(id);
              return { url: p.url, alt: p.alt, caption: p.caption };
            }),
          }),
        ),
      ],
    };
  },
  component: ProjectCaseStudy,
});

function ProjectCaseStudy() {
  const { project } = Route.useLoaderData() as { project: PortfolioProject };
  const trail = trailFor(project.slug);
  const category = getPortfolioCategory(project.category);
  const gallery = project.gallery.map(photo);
  const others = portfolioProjects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <main className="bg-background">
      {/* I — Title card */}
      <section className="relative flex min-h-[96svh] items-end overflow-hidden">
        <CinematicBackdrop frames={project.heroFrames.map(photo)} interval={8000} />
        <div className="mx-auto w-full max-w-7xl px-6 pb-36 md:px-10 md:pb-44">
          <Reveal variant="fade" duration={1300}>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <span aria-hidden className="h-px w-14 bg-gold" />
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                Case study — {project.eventType}
              </p>
            </div>
          </Reveal>
          <h1 className="mt-9 max-w-4xl font-display text-[13vw] leading-[0.88] font-light text-ivory md:text-[7vw]">
            <RevealWords text={project.title} delay={120} />
          </h1>
          <Reveal variant="rise" delay={480}>
            <p className="mt-8 max-w-2xl font-display text-xl leading-relaxed font-light italic text-muted-foreground md:text-2xl">
              {project.lede}
            </p>
          </Reveal>
          <Reveal variant="fade" delay={640}>
            <ul className="mt-12 flex flex-wrap gap-x-12 gap-y-4 font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <li>{project.venue}</li>
              <li>{project.area}</li>
              <li>{project.season}</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pt-10 md:px-10">
        <Breadcrumbs trail={trail} />
      </div>

      {/* II — Highlights */}
      <section className="pt-20 md:pt-28">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <dl className="grid grid-cols-2 gap-y-12 border-y border-border py-14 md:grid-cols-4">
            {project.highlights.map((h, i) => (
              <Reveal key={h.label} variant="rise" delay={i * 90}>
                <dt className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  {h.label}
                </dt>
                <dd className="mt-3 font-display text-4xl leading-none font-light text-gold md:text-5xl">
                  {h.value}
                </dd>
                <p className="mt-3 font-sans text-[11px] leading-relaxed font-light text-muted-foreground">
                  {h.note}
                </p>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* III — The story */}
      <section className="pt-28 md:pt-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="space-y-24">
            {project.story.map((s, i) => (
              <div key={s.heading} className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-4">
                  <Reveal variant="rise">
                    <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
                      {String(i + 1).padStart(2, "0")} — {s.heading}
                    </p>
                  </Reveal>
                </div>
                <div className="md:col-span-8">
                  <Reveal variant="rise" delay={100}>
                    <p className="font-display text-2xl leading-[1.5] font-light text-ivory/90 md:text-[2rem]">
                      {s.body}
                    </p>
                  </Reveal>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IV — Full-bleed frame */}
      <section className="pt-28 md:pt-40">
        <Reveal variant="mask" duration={1600}>
          <Plate
            image={gallery[1] ?? gallery[0]}
            ratio="21/9"
            speed={0.2}
            fade="sides"
            sizes="100vw"
          />
        </Reveal>
      </section>

      {/* V — The concept board */}
      <section className="pt-28 md:pt-40">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-12 md:px-10">
          <div className="md:col-span-5">
            <Reveal variant="rise">
              <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
                The concept
              </p>
            </Reveal>
            <Reveal variant="rise" delay={100}>
              <h2 className="mt-7 font-display text-3xl leading-[1.15] font-light text-ivory md:text-5xl">
                {project.concept.theme}
              </h2>
            </Reveal>
            <Reveal variant="fade" delay={200}>
              <p className="mt-8 font-display text-lg leading-relaxed font-light italic text-muted-foreground">
                {project.concept.philosophy}
              </p>
            </Reveal>

            <Reveal variant="fade" delay={280}>
              <div className="mt-12">
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                  Palette
                </p>
                <div className="mt-5 flex flex-wrap gap-6">
                  {project.concept.palette.map((c) => (
                    <div key={c.name} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="h-9 w-9 rounded-full border border-border-strong"
                        style={{ background: c.hex }}
                      />
                      <span className="font-sans text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
                        {c.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <div className="grid gap-10 sm:grid-cols-2">
              <Reveal variant="mask" duration={1400}>
                <Plate image={gallery[2] ?? gallery[0]} ratio="3/4" sizes="(min-width: 768px) 30vw, 100vw" />
              </Reveal>
              <Reveal variant="mask" duration={1400} delay={120} className="sm:mt-20">
                <Plate image={gallery[3] ?? gallery[1]} ratio="3/4" sizes="(min-width: 768px) 30vw, 100vw" />
              </Reveal>
            </div>

            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              <Reveal variant="rise">
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                  Materials
                </p>
                <ul className="mt-4 space-y-2 font-sans text-[15px] leading-[1.8] font-light text-muted-foreground">
                  {project.concept.materials.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal variant="rise" delay={110}>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                  Florals
                </p>
                <p className="mt-4 font-sans text-[15px] leading-[1.8] font-light text-muted-foreground">
                  {project.concept.floral}
                </p>
                <p className="mt-8 font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                  Lighting
                </p>
                <p className="mt-4 font-sans text-[15px] leading-[1.8] font-light text-muted-foreground">
                  {project.concept.lighting}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* VI — Magazine gallery */}
      <section className="pt-32 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-12">
            {gallery.map((img, i) => {
              const layout = [
                "md:col-span-7",
                "md:col-span-5 md:mt-32",
                "md:col-span-5",
                "md:col-span-7 md:mt-24",
                "md:col-span-8",
                "md:col-span-4 md:mt-28",
              ];
              const ratios = ["16/11", "3/4", "4/5", "16/10", "5/4", "3/4"];
              return (
                <div key={img.id} className={layout[i % layout.length]}>
                  <Reveal variant="mask" duration={1500}>
                    <Plate
                      image={img}
                      ratio={ratios[i % ratios.length]}
                      speed={i % 2 === 0 ? 0.14 : 0}
                      caption
                      sizes="(min-width: 768px) 55vw, 100vw"
                    />
                  </Reveal>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VII — Behind the scenes */}
      <section className="pt-32 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal variant="rise">
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold">
              Behind the scenes
            </p>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {project.behind.map((b, i) => (
              <Reveal key={b.title} variant="rise" delay={i * 110}>
                <div className="border-t border-border-strong pt-7">
                  <h3 className="font-display text-2xl font-light text-ivory">{b.title}</h3>
                  <p className="mt-4 font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIII — Client voice */}
      <section className="pt-32 md:pt-44">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-10">
          <Reveal variant="rise">
            <blockquote className="font-display text-3xl leading-[1.35] font-light italic text-ivory md:text-5xl">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
          </Reveal>
          <Reveal variant="fade" delay={160}>
            <p className="mt-10 font-sans text-[10px] tracking-[0.32em] uppercase text-gold">
              {project.testimonial.name} — {project.testimonial.event}
            </p>
          </Reveal>
        </div>
      </section>

      {/* IX — Related */}
      <section className="pt-32 md:pt-44">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 md:grid-cols-3 md:px-10">
          <div>
            <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold">
              Services used
            </p>
            <ul className="mt-6 space-y-3">
              {project.relatedServices.map((s) => {
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
            <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold">Area</p>
            <ul className="mt-6 space-y-3">
              {project.relatedLocations.map((l) => {
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
              More case studies
            </p>
            <ul className="mt-6 space-y-3">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/portfolio/project/$slug"
                    params={{ slug: p.slug }}
                    className="font-display text-xl font-light text-ivory transition-colors hover:text-gold"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
            {category && (
              <Link
                to="/portfolio/$slug"
                params={{ slug: category.slug }}
                className="group mt-8 inline-flex items-center gap-4 font-sans text-[11px] tracking-[0.26em] uppercase text-gold"
              >
                Back to {category.name}
                <span
                  aria-hidden
                  className="h-px w-9 bg-gold transition-[width] duration-[900ms] [transition-timing-function:var(--ease-lux)] group-hover:w-16"
                />
              </Link>
            )}
          </div>
        </div>
      </section>

      <div className="mt-32 md:mt-44">
        <CtaBand />
      </div>
    </main>
  );
}

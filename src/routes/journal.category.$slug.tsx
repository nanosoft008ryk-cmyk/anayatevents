import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import {
  getJournalCategory,
  articlesInCategory,
  articleExtras,
  journalCategories,
  type JournalCategory,
  type Article,
} from "@/content/journal";
import { getService } from "@/content/services";
import { photo, photosByIds } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { CtaBand } from "@/components/CtaBand";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

function trailFor(c: JournalCategory): Crumb[] {
  return [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/journal" },
    { name: c.name, path: `/journal/category/${c.slug}` },
  ];
}

export const Route = createFileRoute("/journal/category/$slug")({
  loader: ({ params }) => {
    const category = getJournalCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Department unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const path = `/journal/category/${params.slug}`;
    const list = articlesInCategory(category.category);
    return {
      ...pageMeta({
        title: category.metaTitle,
        description: category.metaDescription,
        path,
        image: photo(category.heroFrames[0]).url,
      }),
      scripts: [
        jsonLd(breadcrumbSchema(trailFor(category))),
        jsonLd(
          itemListSchema({
            name: category.name,
            path,
            items: list.map((a) => ({ name: a.title, path: `/journal/${a.slug}` })),
          }),
        ),
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData() as { category: JournalCategory };
  const trail = trailFor(category);
  const list = articlesInCategory(category.category);
  const [lead, ...rest] = list as [Article, ...Article[]];
  const others = journalCategories.filter((c) => c.slug !== category.slug);
  const services = category.relatedServices
    .map(getService)
    .filter((s): s is NonNullable<ReturnType<typeof getService>> => Boolean(s));

  return (
    <main className="bg-background">
      <section className="relative isolate flex min-h-[78svh] flex-col justify-end overflow-hidden">
        <CinematicBackdrop frames={photosByIds(category.heroFrames)} interval={8000} />
        <div className="mx-auto w-full max-w-[92rem] px-6 pt-40 pb-20 md:px-12 lg:pb-28">
          <Breadcrumbs trail={trail} className="mb-10" />
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
              {category.kicker}
            </p>
          </Reveal>
          <h1 className="mt-8 max-w-[16ch] font-display text-[2.8rem] leading-[0.98] font-light text-ivory md:text-[5.2rem]">
            <RevealWords text={category.headline} />
            <span className="block italic text-foil">
              <RevealWords text={category.headlineItalic} delay={200} />
            </span>
          </h1>
          <Reveal delay={460}>
            <p className="mt-5 max-w-xl font-sans text-[15px] leading-[2] font-light text-ivory/70">
              {category.lede}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="chapter light-left">
        <div className="mx-auto grid max-w-[92rem] gap-14 px-6 py-24 md:px-12 lg:grid-cols-[0.8fr_1.4fr] lg:py-32">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              {category.name}
            </p>
            <span aria-hidden className="mt-8 block h-px w-24 rule-foil" />
          </Reveal>
          <div>
            {category.intro.map((p, i) => (
              <Reveal key={p.slice(0, 24)} delay={i * 110}>
                <p
                  className={
                    i === 0
                      ? "font-display text-[1.55rem] leading-[1.5] font-light text-ivory md:text-[2.2rem]"
                      : "mt-8 max-w-2xl font-sans text-[15px] leading-[2] font-light text-muted-foreground"
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lead && (
        <section>
          <div className="mx-auto max-w-[92rem] px-6 pb-8 md:px-12">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              The feature
            </p>
          </div>
          <Link to="/journal/$slug" params={{ slug: lead.slug }} className="group block">
            <div className="relative isolate">
              <Plate
                image={photo(lead.hero)}
                ratio="21/9"
                speed={0.35}
                fade="both"
                sizes="100vw"
                className="min-h-[52svh]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-[92rem] px-6 pb-12 md:px-12 md:pb-16">
                <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                  {lead.readingTime} read
                </p>
                <h2 className="mt-5 max-w-[20ch] font-display text-[2.1rem] leading-[1.04] font-light text-ivory transition-colors duration-700 group-hover:text-gold md:text-[3.8rem]">
                  {lead.title}
                </h2>
                <p className="mt-5 max-w-2xl font-sans text-[15px] leading-[1.95] font-light text-ivory/70">
                  {articleExtras(lead.slug).deck}
                </p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {rest.length > 0 && (
        <section className="chapter">
          <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              More from this department
            </p>
            <div className="mt-14 grid gap-16 lg:grid-cols-2">
              {rest.map((a, i) => (
                <Reveal key={a.slug} delay={i * 90}>
                  <Link
                    to="/journal/$slug"
                    params={{ slug: a.slug }}
                    className="group block"
                    style={{ marginTop: i % 2 === 1 ? "3rem" : undefined }}
                  >
                    <Plate image={photo(a.hero)} ratio={i % 2 === 1 ? "4/5" : "5/4"} />
                    <p className="mt-7 font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                      {a.readingTime} ·{" "}
                      <time dateTime={a.date}>
                        {new Date(a.date).toLocaleDateString("en-GB", {
                          month: "long",
                          year: "numeric",
                        })}
                      </time>
                    </p>
                    <h3 className="mt-4 max-w-[24ch] font-display text-2xl leading-[1.14] font-light text-ivory transition-colors duration-700 group-hover:text-gold md:text-[2.1rem]">
                      {a.title}
                    </h3>
                    <p className="mt-4 max-w-xl font-sans text-sm leading-[1.95] font-light text-muted-foreground">
                      {a.excerpt}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="chapter light-right">
        <div className="mx-auto grid max-w-[92rem] gap-16 px-6 py-24 md:px-12 lg:grid-cols-2 lg:py-32">
          <div>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Where this leads
            </p>
            <ul className="mt-10">
              {services.map((s) => (
                <li key={s.slug} className="border-t border-border last:border-b">
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group flex items-baseline justify-between gap-6 py-6"
                  >
                    <span className="font-display text-xl leading-snug font-light text-ivory transition-colors duration-700 group-hover:text-gold md:text-2xl">
                      {s.name}
                    </span>
                    <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                      Service
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Other departments
            </p>
            <ul className="mt-10">
              {others.map((c) => (
                <li key={c.slug} className="border-t border-border last:border-b">
                  <Link
                    to="/journal/category/$slug"
                    params={{ slug: c.slug }}
                    className="group block py-6"
                  >
                    <span className="font-display text-xl leading-snug font-light text-ivory transition-colors duration-700 group-hover:text-gold md:text-2xl">
                      {c.name}
                    </span>
                    <span className="mt-2 block max-w-md font-sans text-sm leading-[1.9] font-light text-muted-foreground">
                      {c.lede}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <LuxTextLink to="/journal" className="mt-10">
              Back to the Journal
            </LuxTextLink>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="From reading to building"
        title="Turn this thinking into an evening of your own."
        body="Tell us the date and the feeling you want to leave behind. A planner replies personally, with the same candour you have just read."
      />
      <RelatedConstellation path={`/journal/category/${params.slug}`} heading="Continue reading" />
    </main>
  );
}

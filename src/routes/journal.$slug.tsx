import { useEffect, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import {
  getArticle,
  articleExtras,
  categorySlugFor,
  categoryNameFor,
  type Article,
} from "@/content/journal";
import { site } from "@/content/site";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { CtaBand } from "@/components/CtaBand";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { imgAttrs } from "@/lib/img";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  articleSchema,
  type Crumb,
} from "@/lib/seo";

function trailFor(slug: string): Crumb[] {
  const article = getArticle(slug);
  const category = article?.category;
  return [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/journal" },
    ...(category
      ? [
          {
            name: categoryNameFor(category),
            path: `/journal/category/${categorySlugFor(category)}`,
          },
        ]
      : []),
    { name: article?.title ?? "Article", path: `/journal/${slug}` },
  ];
}

function wordCount(article: Article) {
  return article.body.reduce(
    (total, section) =>
      total + section.paragraphs.reduce((n, p) => n + p.split(/\s+/).length, 0),
    0,
  );
}

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params, loaderData }) => {
    const path = `/journal/${params.slug}`;
    if (!loaderData) {
      return { meta: [{ title: "Article unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { article } = loaderData;
    const trail = trailFor(params.slug);
    return {
      ...pageMeta({
        title: article.metaTitle,
        description: article.metaDescription,
        path,
        type: "article",
        image: photo(article.hero).url,
      }),
      scripts: [
        jsonLd(breadcrumbSchema(trail)),
        jsonLd(
          articleSchema({
            title: article.title,
            description: article.metaDescription,
            path,
            datePublished: article.date,
            section: article.category,
            image: photo(article.hero).url,
            wordCount: wordCount(article),
          }),
        ),
      ],
    };
  },
  component: ArticlePage,
});

/** Hairline gold progress rule pinned under the header while reading. */
function ReadingRule() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setPct(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-0 z-40 h-px bg-transparent">
      <div
        className="h-full origin-left bg-gold/80"
        style={{ transform: `scaleX(${pct})` }}
      />
    </div>
  );
}

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };
  const params = Route.useParams();
  const trail = trailFor(article.slug);
  const hero = photo(article.hero);
  const extras = articleExtras(article.slug);
  const related = article.related.map(getArticle).filter((a): a is Article => Boolean(a));
  const categorySlug = categorySlugFor(article.category);
  const quoteAt = Math.max(1, Math.floor(article.body.length / 2));
  const shareText = encodeURIComponent(`${article.title} — The Anayat Journal`);

  return (
    <main className="bg-background">
      <ReadingRule />

      {/* ── Cover ────────────────────────────────────────────────────────── */}
      <article>
        <header className="relative isolate flex min-h-[86svh] flex-col justify-end overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <img
              {...imgAttrs(hero.id, hero.url, "100vw")}
              alt={hero.alt}
              className="h-full w-full object-cover kenburns"
              decoding="async"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, color-mix(in oklab, var(--background) 72%, transparent) 0%, color-mix(in oklab, var(--background) 35%, transparent) 45%, var(--background) 100%)",
              }}
            />
            <div className="absolute inset-0 vignette" />
            <div className="absolute inset-0 grain" />
          </div>

          <div className="mx-auto w-full max-w-[92rem] px-6 pt-40 pb-16 md:px-12 md:pb-24">
            <Breadcrumbs trail={trail} className="mb-10" />
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.44em] uppercase text-gold">
                {categoryNameFor(article.category)} · {article.readingTime} ·{" "}
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </p>
            </Reveal>
            <h1 className="mt-8 max-w-[18ch] font-display text-[2.6rem] leading-[0.99] font-light text-ivory md:text-[5rem]">
              <RevealWords text={article.title} />
            </h1>
            {extras.deck && (
              <Reveal delay={420}>
                <p className="mt-5 max-w-2xl font-display text-xl leading-[1.6] font-light italic text-ivory/75 md:text-[1.6rem]">
                  {extras.deck}
                </p>
              </Reveal>
            )}
          </div>
        </header>

        {/* ── Body ───────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-[92rem] px-6 pt-20 pb-10 md:px-12 md:pt-28">
          <div className="grid gap-16 lg:grid-cols-[16rem_minmax(0,44rem)_1fr]">
            {/* Margin rail — the magazine credit column. */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <p className="font-sans text-[10px] tracking-[0.34em] uppercase text-gold-deep">
                Written by
              </p>
              <p className="mt-3 font-display text-lg font-light text-ivory">
                {site.legalName}
              </p>
              <p className="mt-1 font-sans text-xs leading-relaxed font-light text-muted-foreground">
                Lahore · {article.readingTime} read
              </p>
              <span aria-hidden className="mt-8 block h-px w-16 rule-foil" />
              <p className="mt-8 font-sans text-[10px] tracking-[0.34em] uppercase text-gold-deep">
                Share
              </p>
              <div className="mt-3 flex flex-wrap gap-4">
                <a
                  href={`${site.whatsappHref}?text=${shareText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-[10px] tracking-[0.24em] uppercase text-ivory transition-colors hover:text-gold"
                >
                  WhatsApp
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-[10px] tracking-[0.24em] uppercase text-ivory transition-colors hover:text-gold"
                >
                  Instagram
                </a>
              </div>
            </aside>

            <div>
              {article.body.map((section, i) => {
                const plateId = extras.gallery[i === quoteAt ? 0 : 1];
                return (
                  <section key={section.heading ?? `section-${i}`} className="mb-14">
                    {section.heading && (
                      <Reveal>
                        <h2 className="mb-7 font-display text-[1.9rem] leading-[1.14] font-light text-ivory md:text-[2.5rem]">
                          {section.heading}
                        </h2>
                      </Reveal>
                    )}
                    <div className="space-y-7">
                      {section.paragraphs.map((p, j) => (
                        <p
                          key={p.slice(0, 40)}
                          className={`font-sans text-[1.02rem] leading-[2] font-light text-ivory/70 ${
                            i === 0 && j === 0
                              ? "first-letter:float-left first-letter:mt-2 first-letter:mr-3 first-letter:font-display first-letter:text-[4.2rem] first-letter:leading-[0.78] first-letter:font-light first-letter:text-gold"
                              : ""
                          }`}
                        >
                          {p}
                        </p>
                      ))}
                    </div>

                    {i === quoteAt && extras.pullQuote && (
                      <Reveal variant="mask" className="my-16 block">
                        <blockquote className="border-t border-b border-border py-10">
                          <p className="font-display text-[1.75rem] leading-[1.35] font-light italic text-gold md:text-[2.4rem]">
                            &ldquo;{extras.pullQuote}&rdquo;
                          </p>
                        </blockquote>
                      </Reveal>
                    )}

                    {plateId && (i === quoteAt || i === article.body.length - 2) && (
                      <figure className="my-16">
                        <Plate
                          image={photo(plateId)}
                          ratio="3/2"
                          caption
                          sizes="(min-width: 1024px) 44rem, 100vw"
                        />
                      </figure>
                    )}
                  </section>
                );
              })}

              <div className="mt-16 border-t border-border pt-10">
                <LuxTextLink to="/journal/category/$slug" params={{ slug: categorySlug }}>
                  More from {categoryNameFor(article.category)}
                </LuxTextLink>
              </div>
            </div>

            <div aria-hidden className="hidden lg:block" />
          </div>
        </div>
      </article>

      {/* ── Continue reading ─────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="chapter light-right">
          <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Continue reading
            </p>
            <div className="mt-14 grid gap-14 lg:grid-cols-3">
              {related.map((a, i) => (
                <Reveal key={a.slug} delay={i * 90}>
                  <Link
                    to="/journal/$slug"
                    params={{ slug: a.slug }}
                    className="group block"
                    style={{ marginTop: i === 1 ? "2.5rem" : undefined }}
                  >
                    <Plate image={photo(a.hero)} ratio="4/5" />
                    <p className="mt-6 font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                      {a.category} · {a.readingTime}
                    </p>
                    <h3 className="mt-4 font-display text-xl leading-[1.16] font-light text-ivory transition-colors duration-700 group-hover:text-gold md:text-2xl">
                      {a.title}
                    </h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        eyebrow="From reading to building"
        title="If this is the evening you want, tell us the date."
        body="Everything written here was learnt on a real night in Lahore. A planner replies personally — never a template."
      />
    <RelatedConstellation kind="article" slug={params.slug} options={{ kinds: ["service", "collection", "area", "faq"] }} />
    </main>
  );
}

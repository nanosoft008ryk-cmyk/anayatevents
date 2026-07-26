import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { getArticle, type Article } from "@/content/journal";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  articleSchema,
  type Crumb,
} from "@/lib/seo";

function trailFor(slug: string): Crumb[] {
  const article = getArticle(slug);
  return [
    { name: "Home", path: "/" },
    { name: "Journal", path: "/journal" },
    { name: article?.category ?? "Article", path: `/journal/${slug}` },
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

function ArticlePage() {
  const { article } = Route.useLoaderData() as { article: Article };
  const trail = trailFor(article.slug);
  const hero = photo(article.hero);
  const related = article.related
    .map(getArticle)
    .filter((a): a is Article => Boolean(a));

  return (
    <main className="bg-background">
      <article>
        <header className="mx-auto max-w-3xl px-6 pt-32 pb-12 md:pt-40">
          <Breadcrumbs trail={trail} className="mb-8" />
          <p className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold">
            {article.category} · {article.readingTime} ·{" "}
            <time dateTime={article.date}>
              {new Date(article.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
          <h1 className="mt-6 font-display text-4xl leading-[1.06] font-light text-ivory md:text-6xl">
            {article.title}
          </h1>
          <p className="mt-7 font-display text-xl leading-relaxed font-light italic text-muted-foreground md:text-2xl">
            {article.excerpt}
          </p>
        </header>

        <figure className="mx-auto max-w-6xl px-6">
          <img
            src={hero.url}
            alt={hero.alt}
            className="w-full border border-border object-cover"
          />
          <figcaption className="mt-3 font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            {hero.caption}
          </figcaption>
        </figure>

        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          {article.body.map((section, i) => (
            <section key={section.heading ?? `section-${i}`} className="mb-12">
              {section.heading && (
                <h2 className="mb-6 font-display text-3xl leading-tight font-light text-ivory">
                  {section.heading}
                </h2>
              )}
              <div className="space-y-6">
                {section.paragraphs.map((p) => (
                  <p
                    key={p.slice(0, 40)}
                    className="font-sans text-base leading-[1.9] font-light text-muted-foreground"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
              Continue reading
            </p>
            <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
              {related.map((a) => (
                <Link
                  key={a.slug}
                  to="/journal/$slug"
                  params={{ slug: a.slug }}
                  className="group bg-background p-8"
                >
                  <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                    {a.category}
                  </p>
                  <h3 className="mt-4 font-display text-xl leading-snug font-light text-ivory transition-colors group-hover:text-gold">
                    {a.title}
                  </h3>
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

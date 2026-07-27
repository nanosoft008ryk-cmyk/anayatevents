import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { faqTopics, getFaqTopic, type FaqTopic } from "@/content/faqs";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { pageMeta, jsonLd, breadcrumbSchema, faqSchema, type Crumb } from "@/lib/seo";
import { uniqueFaqs } from "@/lib/entity-graph";

function trailFor(slug: string): Crumb[] {
  const topic = getFaqTopic(slug);
  return [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
    { name: topic?.name ?? "Topic", path: `/faq/${slug}` },
  ];
}

export const Route = createFileRoute("/faq/$slug")({
  loader: ({ params }) => {
    const topic = getFaqTopic(params.slug);
    if (!topic) throw notFound();
    return { topic };
  },
  head: ({ params, loaderData }) => {
    const path = `/faq/${params.slug}`;
    if (!loaderData) {
      return { meta: [{ title: "Topic unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { topic } = loaderData;
    const trail = trailFor(params.slug);
    return {
      ...pageMeta({
        title: topic.metaTitle,
        description: topic.metaDescription,
        path,
      }),
      scripts: [jsonLd(breadcrumbSchema(trail)), jsonLd(faqSchema(uniqueFaqs(path, topic.items), path))],
    };
  },
  component: FaqTopicPage,
});

function FaqTopicPage() {
  const { topic } = Route.useLoaderData() as { topic: FaqTopic };
  const params = Route.useParams();
  const trail = trailFor(topic.slug);
  const others = faqTopics.filter((t) => t.slug !== topic.slug);

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">FAQ</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-6xl">
          {topic.name}
        </h1>
        <p className="mt-5 max-w-2xl font-display text-xl leading-relaxed font-light italic text-muted-foreground md:text-2xl">
          {topic.lede}
        </p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <dl className="divide-y divide-border border-y border-border">
            {topic.items.map((faq) => (
              <div key={faq.q} className="py-8">
                <dt className="font-display text-2xl font-light text-ivory">{faq.q}</dt>
                <dd className="mt-4 font-sans text-[15px] leading-[1.9] font-light text-muted-foreground">
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
            Other topics
          </p>
          <ul className="mt-8 flex flex-wrap gap-4">
            {others.map((t) => (
              <li key={t.slug}>
                <Link
                  to="/faq/$slug"
                  params={{ slug: t.slug }}
                  className="btn-shape btn-shape inline-flex items-center border border-border-strong px-6 py-3 font-sans text-[11px] tracking-[0.2em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
                >
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RelatedConstellation kind="faq" slug={params.slug} options={{ kinds: ["service", "area", "collection", "article"] }} />
      <CtaBand />
    </main>
  );
}

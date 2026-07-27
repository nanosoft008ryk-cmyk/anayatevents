import { createFileRoute, Link } from "@tanstack/react-router";

import { faqTopics, topFaqs } from "@/content/faqs";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
  type Crumb,
} from "@/lib/seo";

const PATH = "/faq";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "FAQ", path: PATH },
];

export const Route = createFileRoute("/faq/")({
  head: () => ({
    ...pageMeta({
      title: "Event Planning FAQ Centre | Anayat Events & Catering Lahore",
      description:
        "Straight answers on planning, pricing, catering and venue logistics for weddings and events in Lahore — lead times, deposits, menus, guest counts and outdoor builds.",
      path: PATH,
      image: photo("ae-10").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(faqSchema(topFaqs, PATH)),
      jsonLd(
        itemListSchema({
          name: "FAQ topics",
          path: PATH,
          items: faqTopics.map((t) => ({ name: t.name, path: `/faq/${t.slug}` })),
        }),
      ),
    ],
  }),
  component: FaqIndex,
});

function FaqIndex() {
  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">FAQ centre</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          The questions
          <span className="block italic">most companies avoid.</span>
        </h1>
        <p className="mt-5 max-w-2xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
          Four clusters covering how we plan, what things cost, how the kitchen works and what a
          venue actually demands.
        </p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
            {faqTopics.map((t) => (
              <Link
                key={t.slug}
                to="/faq/$slug"
                params={{ slug: t.slug }}
                className="group bg-background p-8 transition-colors hover:bg-surface/40 md:p-10"
              >
                <h2 className="font-display text-2xl font-light text-ivory transition-colors group-hover:text-gold md:text-3xl">
                  {t.name}
                </h2>
                <p className="mt-3 font-sans text-sm leading-relaxed font-light text-muted-foreground">
                  {t.lede}
                </p>
                <p className="mt-5 font-sans text-[11px] tracking-[0.2em] uppercase text-gold-deep">
                  {t.items.length} answers
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <h2 className="font-display text-3xl leading-tight font-light text-ivory md:text-4xl">
              Asked most often
            </h2>
            <dl className="divide-y divide-border border-y border-border">
              {topFaqs.map((faq) => (
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

      <CtaBand />
    </main>
  );
}

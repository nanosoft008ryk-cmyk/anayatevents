import { createFileRoute } from "@tanstack/react-router";

import { testimonials } from "@/content/testimonials";
import { site } from "@/content/site";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  reviewCollectionSchema,
  type Crumb,
} from "@/lib/seo";

const PATH = "/reviews";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Reviews", path: PATH },
];

export const Route = createFileRoute("/reviews")({
  head: () => ({
    ...pageMeta({
      title: "Client Reviews — 5.0 from 62 Google Ratings | Anayat Events Lahore",
      description:
        "What Lahore families and companies say about Anayat Events & Catering — weddings, mehndi nights, walimas, corporate evenings and destination builds, in their words.",
      path: PATH,
      image: photo("ae-21").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        reviewCollectionSchema(
          PATH,
          testimonials.map((t) => ({ quote: t.quote, name: t.name })),
        ),
      ),
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">
          {site.rating.value} · {site.rating.count} Google reviews
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          In their words,
          <span className="block italic">not ours.</span>
        </h1>
        <p className="mt-5 max-w-2xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
          Families and companies across Lahore, on the evenings we built for them.
        </p>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-8 btn-shape inline-flex items-center border border-gold px-8 py-4 font-sans text-[11px] tracking-[0.24em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
        >
          Read them on Google
        </a>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
            {testimonials.map((t) => (
              <figure
                key={t.id}
                className="break-inside-avoid border border-border bg-surface/30 p-8"
              >
                <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                  ★★★★★
                </p>
                <blockquote className="mt-5 font-display text-lg leading-relaxed font-light text-ivory">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                  {t.name} · {t.event} · {t.area}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

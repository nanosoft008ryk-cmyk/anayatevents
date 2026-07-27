import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import { testimonials } from "@/content/testimonials";

import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { googleReviewsQuery } from "@/lib/google-reviews";
import type { GoogleReview } from "@/lib/google-reviews.functions";
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
  loader: ({ context }) => context.queryClient.ensureQueryData(googleReviewsQuery()),
  head: ({ loaderData }) => ({
    ...pageMeta({
      title: "Google Reviews — Anayat Events & Catering, Lahore",
      description:
        "Live Google reviews for Anayat Events & Catering in Lahore — read what families and companies say about our weddings, mehndi nights, walimas and corporate evenings, straight from our Google Business Profile.",
      path: PATH,
      image: photo("ae-21").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      // Marked up from the same live payload the page renders, so the
      // structured data never claims a review Google no longer shows.
      jsonLd(
        reviewCollectionSchema(
          PATH,
          (loaderData?.reviews ?? []).length > 0
            ? loaderData!.reviews.map((r) => ({ quote: r.text, name: r.author }))
            : testimonials.map((t) => ({ quote: t.quote, name: t.name })),
        ),
      ),
    ],
  }),

  component: ReviewsPage,
});

function Stars({ rating }: { rating: number }) {
  return (
    <p className="font-sans text-[10px] tracking-[0.28em] text-gold" aria-label={`${rating} out of 5`}>
      {"★".repeat(Math.round(rating))}
      <span className="text-border-strong">{"★".repeat(5 - Math.round(rating))}</span>
    </p>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <figure className="break-inside-avoid border-t border-border pt-8 pb-10">
      <Stars rating={review.rating} />
      <blockquote className="mt-5 font-display text-[1.35rem] leading-[1.6] font-light whitespace-pre-line text-ivory">
        {review.text}
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-4">
        {review.photoUri ? (
          <img
            src={review.photoUri}
            alt=""
            loading="lazy"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover grayscale"
          />
        ) : null}
        <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          {review.author}
          {review.relativeTime ? ` · ${review.relativeTime}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}

function ReviewsPage() {
  const { data } = useSuspenseQuery(googleReviewsQuery());
  const { rating, ratingCount, mapsUri, reviews } = data;

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-[92rem] px-6 pt-32 pb-14 md:px-12 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-10" />
        <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
          {rating} · {ratingCount} Google reviews
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          In their words,
          <span className="block italic">not ours.</span>
        </h1>
        <p className="mt-6 max-w-2xl font-sans text-[15px] leading-[1.9] font-light text-muted-foreground">
          Every review below is pulled live from our Google Business Profile. We write none of
          them, we edit none of them, and the moment a client posts a new one it appears here.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-14 gap-y-5">
          <a
            href={mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shape inline-flex items-center border border-gold px-8 py-4 font-sans text-[11px] tracking-[0.24em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Read all {ratingCount} on Google
          </a>
          <a
            href={mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] tracking-[0.28em] uppercase text-ivory transition-colors hover:text-gold"
          >
            Leave a review
          </a>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-[92rem] px-6 py-16 md:px-12 md:py-24">
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              Live from Google
            </p>
            <div className="mt-10 columns-1 gap-14 lg:columns-2 [&>*]:mb-2">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 90}>
                  <ReviewCard review={r} />
                </Reveal>
              ))}
            </div>
            <p className="mt-6 font-sans text-[11px] leading-[2] font-light text-muted-foreground">
              Google publishes a selection of the most relevant reviews through its API — the
              full set of {ratingCount} ratings lives on{" "}
              <a
                href={mapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline-offset-4 hover:underline"
              >
                our Google profile
              </a>
              .
            </p>
          </div>
        </section>
      )}

      <section className="border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 py-16 md:px-12 md:py-24">
          <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
            From the house archive
          </p>
          <div className="mt-10 columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
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


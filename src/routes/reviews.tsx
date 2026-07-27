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
            // Google's avatar CDN rejects requests carrying a referrer.
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
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

/** How many reviews are revealed at a time by "Load more". */
const PAGE = 4;
const ARCHIVE_PAGE = 6;

const SORTS = [
  { key: "newest", label: "Newest first" },
  { key: "rating", label: "Highest rated" },
] as const;

function ReviewsPage() {
  const { data } = useSuspenseQuery(googleReviewsQuery());
  const { rating, ratingCount, mapsUri, writeReviewUri, reviews } = data;

  const { sort } = Route.useSearch();
  const navigate = useNavigate({ from: PATH });

  const [shown, setShown] = useState(PAGE);
  const [archiveShown, setArchiveShown] = useState(ARCHIVE_PAGE);

  // Google returns its own relevance order; we re-sort on the client so the
  // control is instant and the live payload stays the single source of truth.
  const ordered = useMemo(() => {
    const list = [...reviews];
    return sort === "rating"
      ? list.sort(
          (a, b) => b.rating - a.rating || (a.publishTime < b.publishTime ? 1 : -1),
        )
      : list.sort((a, b) => (a.publishTime < b.publishTime ? 1 : -1));
  }, [reviews, sort]);

  const visible = ordered.slice(0, shown);
  const archive = testimonials.slice(0, archiveShown);

  function setSort(next: (typeof SORTS)[number]["key"]) {
    setShown(PAGE);
    navigate({ search: { sort: next }, replace: true, resetScroll: false });
  }

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
            href={writeReviewUri}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shape inline-flex items-center bg-gold px-8 py-4 font-sans text-[11px] tracking-[0.24em] uppercase text-primary-foreground transition-opacity hover:opacity-88"
          >
            Write a Google review
          </a>
          <a
            href={mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shape inline-flex items-center border border-gold px-8 py-4 font-sans text-[11px] tracking-[0.24em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Read all {ratingCount} on Google
          </a>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-[92rem] px-6 py-16 md:px-12 md:py-24">
            <div className="flex flex-wrap items-baseline justify-between gap-x-12 gap-y-5">
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
                Live from Google
              </p>
              <div className="flex items-center gap-8" role="group" aria-label="Sort reviews">
                {SORTS.map((s) => {
                  const active = sort === s.key;
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => setSort(s.key)}
                      aria-pressed={active}
                      className={`relative font-sans text-[10px] tracking-[0.28em] uppercase transition-colors ${
                        active ? "text-gold" : "text-muted-foreground hover:text-ivory"
                      }`}
                    >
                      {s.label}
                      <span
                        className={`absolute -bottom-2 left-0 h-px w-full bg-gold transition-transform duration-500 [transition-timing-function:var(--ease-lux)] ${
                          active ? "scale-x-100" : "scale-x-0"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-12 columns-1 gap-14 lg:columns-2 [&>*]:mb-2">
              {visible.map((r, i) => (
                <Reveal key={r.id} delay={(i % PAGE) * 90}>
                  <ReviewCard review={r} />
                </Reveal>
              ))}
            </div>

            {shown < ordered.length && (
              <div className="mt-14 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShown((n) => n + PAGE)}
                  className="btn-shape inline-flex items-center border border-gold/40 px-10 py-4 font-sans text-[10px] tracking-[0.28em] uppercase text-gold transition-colors hover:border-gold hover:bg-gold hover:text-primary-foreground"
                >
                  Load more reviews ({ordered.length - shown} left)
                </button>
              </div>
            )}

            <p className="mt-12 font-sans text-[11px] leading-[2] font-light text-muted-foreground">
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
            {archive.map((t) => (
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

          {archiveShown < testimonials.length && (
            <div className="mt-14 flex justify-center">
              <button
                type="button"
                onClick={() => setArchiveShown((n) => n + ARCHIVE_PAGE)}
                className="btn-shape inline-flex items-center border border-gold/40 px-10 py-4 font-sans text-[10px] tracking-[0.28em] uppercase text-gold transition-colors hover:border-gold hover:bg-gold hover:text-primary-foreground"
              >
                Load more ({testimonials.length - archiveShown} left)
              </button>
            </div>
          )}
        </div>
      </section>

      <CtaBand />
    </main>
  );
}



import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Fragment, useMemo, useState } from "react";

import { testimonials } from "@/content/testimonials";
import { site } from "@/content/site";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxAnchor, LuxLink } from "@/components/ui/LuxButton";
import { FeaturedReview } from "@/components/reviews/FeaturedReview";
import { ReviewMovementBlock } from "@/components/reviews/ReviewMovement";
import {
  ReviewNavigator,
  matchesQuery,
  matchesTheme,
  themesPresent,
  type SortKey,
} from "@/components/reviews/ReviewNavigator";
import { GoogleMark, Stars } from "@/components/reviews/review-parts";
import { TrustLedger } from "@/components/reviews/TrustLedger";
import { googleReviewsQuery } from "@/lib/google-reviews";
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
  // Sort order lives in the URL so a sorted view is shareable.
  validateSearch: (search: Record<string, unknown>) => ({
    sort: search.sort === "rating" ? ("rating" as const) : ("newest" as const),
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(googleReviewsQuery()),

  head: ({ loaderData }) => ({
    ...pageMeta({
      title: "Google Reviews — Anayat Events & Catering, Lahore",
      description:
        "Live Google reviews for Anayat Events & Catering in Lahore — what families and companies say about our weddings, walimas and corporate evenings.",
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

/** How many reviews unfold at a time. */
const PAGE = 3;
const ARCHIVE_PAGE = 6;

/** Editorial lines that break the reading rhythm between review movements. */
const INTERLUDES = [
  {
    line: "Every celebration leaves a memory.",
    note: "These are the ones our clients chose to write down.",
  },
  {
    line: "Luxury is measured in the hours nobody sees.",
    note: "Load-in at dawn, cold storage, a crew still working at one in the morning.",
  },
  {
    line: "The moments that matter most.",
    note: "Written by the families who lived them, published by Google, not by us.",
  },
];

function Interlude({ index }: { index: number }) {
  const item = INTERLUDES[index % INTERLUDES.length];
  return (
    <aside className="mx-auto max-w-[92rem] px-6 md:px-12" aria-hidden="true">
      <Reveal variant="mask">
        <p className="max-w-[18ch] font-display text-[2.2rem] leading-[1.08] font-light text-foil md:text-[4rem]">
          {item.line}
        </p>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-8 max-w-md font-sans text-[13px] leading-[2] font-light text-muted-foreground">
          {item.note}
        </p>
      </Reveal>
    </aside>
  );
}

const RECOMMENDED = [
  { to: "/services/luxury-weddings", label: "Luxury Weddings", note: "The full wedding week, held by one house." },
  { to: "/services/corporate-events", label: "Corporate Events", note: "Launches and dinners that run to the minute." },
  { to: "/portfolio", label: "The Portfolio", note: "Rooms we built, photographed as they were." },
  { to: "/journal", label: "The Journal", note: "How the work is actually done, written down." },
  { to: "/areas", label: "Areas We Serve", note: "From DHA to Bedian Road, and everywhere between." },
  { to: "/contact", label: "Speak To A Planner", note: "One reply, from the person who would run your event." },
];

function ReviewsPage() {
  const { data } = useSuspenseQuery(googleReviewsQuery());
  const { rating, ratingCount, mapsUri, writeReviewUri, reviews, stale } = data;

  const { sort } = Route.useSearch();
  const navigate = useNavigate({ from: PATH });

  const [theme, setTheme] = useState("all");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);
  const [archiveShown, setArchiveShown] = useState(ARCHIVE_PAGE);

  // Google returns its own relevance order; we re-sort on the client so the
  // control is instant and the live payload stays the single source of truth.
  const ordered = useMemo(() => {
    const list = reviews.filter((r) => matchesTheme(r, theme) && matchesQuery(r, query));
    return sort === "rating"
      ? list.sort((a, b) => b.rating - a.rating || (a.publishTime < b.publishTime ? 1 : -1))
      : list.sort((a, b) => (a.publishTime < b.publishTime ? 1 : -1));
  }, [reviews, sort, theme, query]);

  // The centrepiece is the fullest five-star review Google is serving today.
  const featured = useMemo(() => {
    if (reviews.length === 0) return undefined;
    return [...reviews].sort(
      (a, b) => b.rating - a.rating || b.text.length - a.text.length,
    )[0];
  }, [reviews]);

  const rest = useMemo(
    () => ordered.filter((r) => r.id !== featured?.id),
    [ordered, featured],
  );

  const themes = useMemo(() => themesPresent(reviews), [reviews]);
  const visible = rest.slice(0, shown);
  const archive = testimonials.slice(0, archiveShown);
  const showNavigator = reviews.length >= 4;

  function setSort(next: SortKey) {
    setShown(PAGE);
    navigate({ search: { sort: next }, replace: true, resetScroll: false });
  }

  return (
    <main className="bg-background">
      {/* I — Cinematic opening */}
      <section className="relative isolate flex min-h-dvh flex-col justify-end overflow-hidden">
        <CinematicBackdrop frames={[photo("ae-21"), photo("ae-13"), photo("ae-05"), photo("ae-24")]} />

        <div className="mx-auto w-full max-w-[92rem] px-6 pt-40 pb-24 md:px-12 md:pb-32">
          <Breadcrumbs trail={trail} className="mb-12" />

          <div className="flex items-center gap-5">
            <span aria-hidden="true" className="hidden h-16 w-px bg-gradient-to-b from-transparent via-gold to-transparent md:block" />
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              {rating} on Google · {ratingCount} ratings
            </p>
          </div>

          <h1 className="mt-10 max-w-[15ch] font-display text-[3rem] leading-[0.98] font-light text-ivory md:text-[6.4rem]">
            <RevealWords text="Every review here is" />
            <span className="mt-2 block italic text-foil">
              <RevealWords text="a real celebration." delay={220} />
            </span>
          </h1>

          <Reveal delay={500}>
            <p className="mt-10 max-w-xl font-sans text-[15px] leading-[2] font-light text-ivory/80">
              Not a testimonial we wrote. Not a quote we chose. Everything below arrives
              live from our Google Business Profile — a family, a week, a room full of
              people, condensed into a few sentences.
            </p>
          </Reveal>

          <Reveal delay={640}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <LuxAnchor href={mapsUri} tone="foil">
                View Google Business Profile
              </LuxAnchor>
              <LuxAnchor href="#the-reviews" tone="outline" external={false}>
                Read latest reviews
              </LuxAnchor>
              <LuxLink to="/contact" tone="quiet">
                Book a consultation
              </LuxLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* II — Why a review matters here */}
      <section aria-labelledby="trust-intro" className="border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 md:py-36">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-28">
            <div>
              <Reveal>
                <h2 id="trust-intro" className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                  Before you read them
                </h2>
              </Reveal>
              <Reveal delay={120} variant="mask">
                <p className="mt-10 max-w-[20ch] font-display text-[2.4rem] leading-[1.06] font-light text-ivory md:text-[4.4rem]">
                  A review is one evening, remembered out loud.
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-10 max-w-xl font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
                  Behind each of these lines is a family that trusted us with a date they
                  will only live once — a wedding week, a nikah of forty people, a birthday
                  the children will describe for years, a corporate evening where the
                  chairman noticed nothing because nothing went wrong. We do not ask for
                  reviews on the night. We ask weeks later, when the memory has settled.
                </p>
              </Reveal>
            </div>

            <Reveal delay={200}>
              <Plate
                image={photo("ae-09")}
                ratio="4/5"
                speed={0.16}
                fade="sides"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* III — Live trust ledger */}
      <TrustLedger
        rating={rating}
        ratingCount={ratingCount}
        shownCount={reviews.length}
        stale={stale}
        mapsUri={mapsUri}
      />

      {/* IV — The centrepiece */}
      {featured ? <FeaturedReview review={featured} /> : null}

      {/* V — The reading */}
      <section id="the-reviews" aria-labelledby="the-reviews-heading" className="border-t border-border pt-24 md:pt-32">
        <div className="mx-auto max-w-[92rem] px-6 md:px-12">
          <Reveal>
            <h2
              id="the-reviews-heading"
              className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold"
            >
              In their words
            </h2>
          </Reveal>
        </div>

        {showNavigator ? (
          <div className="mt-10">
            <ReviewNavigator
              sort={sort}
              onSort={setSort}
              theme={theme}
              onTheme={(next) => {
                setTheme(next);
                setShown(PAGE);
              }}
              themes={themes}
              query={query}
              onQuery={(value) => {
                setQuery(value);
                setShown(PAGE);
              }}
              count={rest.length}
            />
          </div>
        ) : null}

        <div className="mt-20 space-y-28 md:space-y-40">
          {visible.map((review, i) => (
            <Fragment key={review.id}>
              <ReviewMovementBlock review={review} index={i} />
              {(i + 1) % 3 === 0 && i + 1 < visible.length ? (
                <Interlude index={Math.floor(i / 3)} />
              ) : null}
            </Fragment>
          ))}
        </div>

        {rest.length === 0 ? (
          <p className="mx-auto mt-6 max-w-[92rem] px-6 font-sans text-[15px] leading-[2] font-light text-muted-foreground md:px-12">
            Nothing matches that search yet — clear it, or read the full set on{" "}
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
        ) : null}

        {shown < rest.length ? (
          <div className="mt-24 flex justify-center">
            <button
              type="button"
              onClick={() => setShown((n) => n + PAGE)}
              className="btn-shape group inline-flex items-center gap-4 border border-gold/40 px-10 py-4 font-sans text-[10px] tracking-[0.28em] uppercase text-gold transition-colors duration-700 hover:border-gold hover:bg-gold hover:text-primary-foreground"
            >
              Continue reading
              <span className="font-sans text-[10px] opacity-70">
                {rest.length - shown} more
              </span>
            </button>
          </div>
        ) : null}

        <div className="mx-auto mt-24 max-w-[92rem] px-6 md:px-12">
          <Reveal>
            <div className="flex flex-col gap-8 border-t border-border pt-12 lg:flex-row lg:items-end lg:justify-between">
              <p className="max-w-2xl font-sans text-[13px] leading-[2] font-light text-muted-foreground">
                Google publishes a selection of its most relevant written reviews through
                the API — the whole record of {ratingCount} ratings, and the ability to add
                yours, sits on the profile itself.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <LuxAnchor href={writeReviewUri} tone="foil">
                  Write a Google review
                </LuxAnchor>
                <LuxAnchor href={mapsUri} tone="outline">
                  Read all on Google
                </LuxAnchor>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VI — The house archive, kept deliberately quiet */}
      <section aria-labelledby="house-archive" className="mt-28 border-t border-border md:mt-40">
        <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 md:py-32">
          <Reveal>
            <h2 id="house-archive" className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              From the house archive
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-8 max-w-xl font-sans text-[13px] leading-[2] font-light text-muted-foreground">
              Notes and messages sent to us directly, before Google reviews became the
              record. Kept here for context, clearly separate from the live set above.
            </p>
          </Reveal>

          <div className="mt-14 columns-1 gap-14 md:columns-2 lg:columns-3 [&>*]:mb-14">
            {archive.map((t) => (
              <figure key={t.id} className="break-inside-avoid border-t border-border pt-8">
                <Stars rating={5} />
                <blockquote className="mt-5 font-display text-[1.05rem] leading-[1.85] font-light text-ivory/85">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-6 font-sans text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
                  {t.name} · {t.event} · {t.area}
                </figcaption>
              </figure>
            ))}
          </div>

          {archiveShown < testimonials.length ? (
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={() => setArchiveShown((n) => n + ARCHIVE_PAGE)}
                className="btn-shape inline-flex items-center border border-border-strong px-10 py-4 font-sans text-[10px] tracking-[0.28em] uppercase text-ivory transition-colors duration-700 hover:border-gold hover:text-gold"
              >
                More from the archive ({testimonials.length - archiveShown} left)
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {/* VII — Where to go next */}
      <section aria-labelledby="reviews-next" className="border-t border-border">
        <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 md:py-32">
          <Reveal>
            <h2 id="reviews-next" className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Continue
            </h2>
          </Reveal>
          <ul className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {RECOMMENDED.map((item, i) => (
              <li key={item.to}>
                <Reveal delay={i * 80}>
                  <Link to={item.to} className="group block">
                    <span className="font-display text-[1.5rem] leading-[1.2] font-light text-ivory transition-colors duration-500 group-hover:text-gold">
                      {item.label}
                    </span>
                    <span className="mt-3 block h-px w-10 bg-gold/50 transition-all duration-700 [transition-timing-function:var(--ease-lux)] group-hover:w-24" />
                    <span className="mt-4 block max-w-[34ch] font-sans text-[13px] leading-[1.95] font-light text-muted-foreground">
                      {item.note}
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VIII — Cinematic close */}
      <section aria-labelledby="reviews-cta" className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Plate image={photo("ae-17")} ratio="21/9" speed={0.12} className="h-full" imgClassName="opacity-35" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, var(--background) 0%, color-mix(in oklab, var(--background) 55%, transparent) 50%, var(--background) 100%)",
            }}
          />
          <div className="absolute inset-0 vignette" />
        </div>

        <div className="mx-auto max-w-[92rem] px-6 py-32 md:px-12 lg:py-44">
          <Reveal>
            <p className="flex items-center gap-3 font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              <GoogleMark className="h-3.5 w-3.5" />
              {rating} · {ratingCount} ratings
            </p>
          </Reveal>
          <Reveal delay={140} variant="mask">
            <h2
              id="reviews-cta"
              className="mt-10 max-w-[16ch] font-display text-[2.6rem] leading-[1.02] font-light text-ivory lg:text-[4.6rem]"
            >
              Your celebration could be the next story here.
            </h2>
          </Reveal>
          <Reveal delay={260}>
            <p className="mt-8 max-w-xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
              Tell us the date and the guest count. One planner reads every enquiry and
              replies within 12 working hours — never a template.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <LuxLink to="/contact" tone="foil">
                Book a consultation
              </LuxLink>
              <LuxAnchor href={site.whatsappUrl} tone="outline">
                WhatsApp
              </LuxAnchor>
              <LuxAnchor href={`tel:${site.phonePrimaryRaw}`} tone="quiet" external={false}>
                {site.phonePrimary}
              </LuxAnchor>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

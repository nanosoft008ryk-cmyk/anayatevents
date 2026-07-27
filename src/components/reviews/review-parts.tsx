import { useState } from "react";

import { cn } from "@/lib/utils";
import type { GoogleReview } from "@/lib/google-reviews.functions";

/** Gold star row. Purely decorative — the rating is announced in the label. */
export function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const filled = Math.round(rating);
  return (
    <p
      className={cn(
        "font-sans text-gold",
        size === "sm" ? "text-[10px] tracking-[0.34em]" : "text-[15px] tracking-[0.4em]",
      )}
      aria-label={`Rated ${rating} out of 5`}
    >
      <span aria-hidden="true">
        {"\u2605".repeat(filled)}
        <span className="text-border-strong">{"\u2605".repeat(5 - filled)}</span>
      </span>
    </p>
  );
}

/** The Google "G", drawn rather than imported, so it inherits our palette. */
export function GoogleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("h-3.5 w-3.5", className)}
    >
      <path
        fill="currentColor"
        d="M21.6 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.23c1.89-1.74 2.99-4.3 2.99-7.35Z"
        opacity="0.95"
      />
      <path
        fill="currentColor"
        d="M12 22c2.7 0 4.97-.9 6.62-2.42l-3.23-2.5c-.9.6-2.05.96-3.39.96-2.6 0-4.81-1.76-5.6-4.13H3.06v2.6A10 10 0 0 0 12 22Z"
        opacity="0.7"
      />
      <path
        fill="currentColor"
        d="M6.4 13.91a6 6 0 0 1 0-3.82V7.5H3.06a10 10 0 0 0 0 9l3.34-2.59Z"
        opacity="0.5"
      />
      <path
        fill="currentColor"
        d="M12 5.96c1.47 0 2.79.51 3.83 1.5l2.86-2.86C16.96 2.98 14.69 2 12 2A10 10 0 0 0 3.06 7.5l3.34 2.6C7.19 7.72 9.4 5.96 12 5.96Z"
        opacity="0.85"
      />
    </svg>
  );
}

/** Reviewer avatar straight from Google, degraded gracefully when blocked. */
export function Avatar({ review, size = 44 }: { review: GoogleReview; size?: number }) {
  const [failed, setFailed] = useState(false);
  const initial = review.author.trim().charAt(0).toUpperCase() || "G";

  if (!review.photoUri || failed) {
    return (
      <span
        aria-hidden="true"
        style={{ width: size, height: size }}
        className="grid shrink-0 place-items-center rounded-full border border-gold/30 font-display text-sm text-gold"
      >
        {initial}
      </span>
    );
  }

  return (
    <img
      src={review.photoUri}
      alt=""
      loading="lazy"
      decoding="async"
      // Google's avatar CDN rejects requests that carry a referrer.
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full object-cover grayscale transition-[filter] duration-700 group-hover:grayscale-0"
    />
  );
}

/** Verified-on-Google line: mark, reviewer, date. */
export function Attribution({
  review,
  align = "start",
  size = 44,
}: {
  review: GoogleReview;
  align?: "start" | "center";
  size?: number;
}) {
  return (
    <figcaption
      className={cn(
        "flex items-center gap-4",
        align === "center" ? "justify-center text-center" : "",
      )}
    >
      <Avatar review={review} size={size} />
      <span className="min-w-0">
        <span className="block truncate font-display text-[1.05rem] font-light text-ivory">
          {review.author}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 text-gold-deep">
            <GoogleMark />
            Verified Google review
          </span>
          {review.relativeTime ? <span>{review.relativeTime}</span> : null}
        </span>
      </span>
    </figcaption>
  );
}

/** Longest sensible run of a review before we offer to unfold the rest. */
const CLAMP = 340;

/**
 * Review text that never ends mid-thought: long reviews fade into an
 * "unfold" control and open with a soft height/opacity transition.
 */
export function ReviewBody({
  text,
  className,
  clamp = CLAMP,
}: {
  text: string;
  className?: string;
  clamp?: number;
}) {
  const [open, setOpen] = useState(false);
  const long = text.length > clamp;

  // Cut on a sentence or word boundary, never mid-word.
  const cut = long
    ? (() => {
        const slice = text.slice(0, clamp);
        const stop = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("? "));
        return stop > clamp * 0.55 ? slice.slice(0, stop + 1) : `${slice.slice(0, slice.lastIndexOf(" "))}…`;
      })()
    : text;

  return (
    <div>
      <blockquote
        className={cn(
          "relative whitespace-pre-line font-display font-light text-ivory/92",
          className,
        )}
      >
        <span
          className={cn(
            "block transition-opacity duration-700 [transition-timing-function:var(--ease-lux)]",
            long && !open ? "opacity-92" : "opacity-100",
          )}
        >
          {open || !long ? text : cut}
        </span>
      </blockquote>

      {long ? (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group/unfold mt-6 inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.3em] uppercase text-gold transition-colors hover:text-gold-light"
        >
          <span className="relative">
            {open ? "Fold away" : "Read the whole review"}
            <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-700 [transition-timing-function:var(--ease-lux)] group-hover/unfold:origin-left group-hover/unfold:scale-x-100" />
          </span>
          <span
            aria-hidden="true"
            className={cn(
              "transition-transform duration-700 [transition-timing-function:var(--ease-lux)]",
              open ? "-rotate-90" : "rotate-90",
            )}
          >
            &#8594;
          </span>
        </button>
      ) : null}
    </div>
  );
}

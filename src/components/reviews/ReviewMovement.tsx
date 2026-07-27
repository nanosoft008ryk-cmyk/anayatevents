import { photo, type Photo } from "@/content/images";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/motion/Reveal";
import { imgAttrs } from "@/lib/img";
import { cn } from "@/lib/utils";
import type { GoogleReview } from "@/lib/google-reviews.functions";

import { Attribution, ReviewBody, Stars } from "./review-parts";

/**
 * Photography that carries the reviews. Reused in rotation so the page never
 * runs out of imagery however many reviews Google returns.
 */
const PLATES = ["ae-13", "ae-09", "ae-05", "ae-24", "ae-17", "ae-11", "ae-02"] as const;

const plateFor = (i: number): Photo => photo(PLATES[i % PLATES.length]);

/**
 * Seven compositions, cycled — a review is never presented the same way twice
 * in a row, so scrolling reads like a magazine rather than a feed.
 */
export type Movement =
  | "quote-left"
  | "plate-left"
  | "centred"
  | "full-quote"
  | "floating"
  | "glass"
  | "minimal";

const CYCLE: Movement[] = [
  "quote-left",
  "plate-left",
  "centred",
  "full-quote",
  "floating",
  "glass",
  "minimal",
];

export const movementFor = (i: number): Movement => CYCLE[i % CYCLE.length];

/** Oversized opening quotation mark, set as a piece of ornament. */
function QuoteMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "block font-display text-[7rem] leading-[0.5] font-light text-gold/22 select-none md:text-[10rem]",
        className,
      )}
    >
      &ldquo;
    </span>
  );
}

/** Shared hover behaviour: soft lift, typography drift, image response. */
const shell =
  "group relative transition-[transform,opacity] duration-[900ms] [transition-timing-function:var(--ease-lux)] hover:-translate-y-1";

export function ReviewMovementBlock({
  review,
  index,
}: {
  review: GoogleReview;
  index: number;
}) {
  const movement = movementFor(index);
  const image = plateFor(index);

  const body =
    "text-[1.15rem] leading-[1.85] md:text-[1.35rem] md:leading-[1.8]";

  if (movement === "quote-left" || movement === "plate-left") {
    const plateFirst = movement === "plate-left";
    return (
      <figure
        className={cn(
          shell,
          "mx-auto grid max-w-[92rem] items-center gap-12 px-6 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24",
        )}
      >
        <div className={cn(plateFirst ? "lg:order-2" : "")}>
          <Reveal variant="mask">
            <QuoteMark />
            <Stars rating={review.rating} />
            <ReviewBody text={review.text} className={cn("mt-6", body)} />
            <div className="mt-10">
              <Attribution review={review} />
            </div>
          </Reveal>
        </div>
        <Reveal
          delay={140}
          className={cn(plateFirst ? "lg:order-1" : "")}
        >
          <Plate
            image={image}
            ratio={plateFirst ? "4/5" : "5/6"}
            speed={plateFirst ? 0.16 : -0.14}
            fade="sides"
            sizes="(min-width: 1024px) 45vw, 100vw"
            imgClassName="transition-transform duration-[1600ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-[1.03]"
          />
        </Reveal>
      </figure>
    );
  }

  if (movement === "centred") {
    return (
      <figure className={cn(shell, "mx-auto max-w-3xl px-6 text-center md:px-12")}>
        <Reveal>
          <QuoteMark className="mx-auto" />
          <div className="mt-4 flex justify-center">
            <Stars rating={review.rating} />
          </div>
          <ReviewBody
            text={review.text}
            className={cn("mt-8 text-balance", body)}
          />
          <div className="mt-10 flex justify-center">
            <Attribution review={review} align="center" />
          </div>
        </Reveal>
      </figure>
    );
  }

  if (movement === "full-quote") {
    return (
      <figure className={cn(shell, "mx-auto max-w-[92rem] px-6 md:px-12")}>
        <Reveal variant="mask">
          <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
            <span className="hidden h-full w-px bg-gradient-to-b from-gold/50 to-transparent lg:block" />
            <div>
              <ReviewBody
                text={review.text}
                className="text-[1.6rem] leading-[1.35] font-light text-ivory md:text-[2.6rem] md:leading-[1.25]"
                clamp={420}
              />
              <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
                <Attribution review={review} size={52} />
                <Stars rating={review.rating} />
              </div>
            </div>
          </div>
        </Reveal>
      </figure>
    );
  }

  if (movement === "floating") {
    return (
      <figure className={cn(shell, "mx-auto max-w-[92rem] px-6 md:px-12")}>
        <div className="relative">
          <Reveal>
            <Plate
              image={image}
              ratio="16/9"
              speed={0.2}
              fade="both"
              sizes="100vw"
              imgClassName="transition-transform duration-[1600ms] [transition-timing-function:var(--ease-lux)] group-hover:scale-[1.02]"
            />
          </Reveal>
          <Reveal
            delay={180}
            className="relative z-10 -mt-16 ml-0 max-w-2xl md:-mt-28 md:ml-16 lg:ml-28"
          >
            <div className="bg-background/85 p-8 backdrop-blur-xl md:p-12">
              <Stars rating={review.rating} />
              <ReviewBody text={review.text} className={cn("mt-6", body)} />
              <div className="mt-9">
                <Attribution review={review} />
              </div>
            </div>
          </Reveal>
        </div>
      </figure>
    );
  }

  if (movement === "glass") {
    return (
      <figure className={cn(shell, "relative isolate overflow-hidden")}>
        <img
          {...imgAttrs(image.id, image.url, "100vw")}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-30 drift-slow"
        />
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, color-mix(in oklab, var(--background) 55%, transparent) 50%, var(--background) 100%)",
          }}
        />
        <div className="absolute inset-0 -z-10 vignette" />
        <div className="mx-auto max-w-4xl px-6 py-24 md:px-12 md:py-32">
          <Reveal>
            <div className="glass p-8 md:p-14">
              <div className="flex items-center justify-between gap-6">
                <Stars rating={review.rating} />
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                  Live from Google
                </span>
              </div>
              <ReviewBody text={review.text} className={cn("mt-8", body)} />
              <div className="mt-10">
                <Attribution review={review} />
              </div>
            </div>
          </Reveal>
        </div>
      </figure>
    );
  }

  // minimal
  return (
    <figure className={cn(shell, "mx-auto max-w-[92rem] px-6 md:px-12")}>
      <Reveal>
        <div className="grid gap-8 border-t border-border pt-12 md:grid-cols-[0.4fr_1fr] md:gap-20">
          <div>
            <Stars rating={review.rating} />
            <div className="mt-8">
              <Attribution review={review} size={40} />
            </div>
          </div>
          <ReviewBody
            text={review.text}
            className="text-[1.1rem] leading-[1.95] md:text-[1.25rem]"
          />
        </div>
      </Reveal>
    </figure>
  );
}

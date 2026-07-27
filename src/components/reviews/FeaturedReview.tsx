import { photo } from "@/content/images";
import { Plate } from "@/components/Plate";
import { Reveal } from "@/components/motion/Reveal";
import type { GoogleReview } from "@/lib/google-reviews.functions";

import { Attribution, ReviewBody, Stars } from "./review-parts";

/**
 * The emotional centrepiece: the strongest written review Google is currently
 * serving, set as a magazine opener. Chosen from live data — never pinned.
 */
export function FeaturedReview({ review }: { review: GoogleReview }) {
  return (
    <section aria-labelledby="featured-review" className="relative isolate border-t border-border">
      <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 md:py-36">
        <Reveal>
          <h2
            id="featured-review"
            className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold"
          >
            The one we keep re-reading
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-24">
          <figure className="group">
            <Reveal variant="mask">
              <span
                aria-hidden="true"
                className="block font-display text-[9rem] leading-[0.4] font-light text-gold/25 md:text-[14rem]"
              >
                &ldquo;
              </span>
            </Reveal>
            <Reveal delay={120} variant="mask">
              <ReviewBody
                text={review.text}
                clamp={460}
                className="mt-8 text-[1.8rem] leading-[1.3] font-light text-ivory md:text-[3.1rem] md:leading-[1.2]"
              />
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-12 flex flex-wrap items-center gap-x-12 gap-y-6">
                <Attribution review={review} size={56} />
                <Stars rating={review.rating} size="lg" />
              </div>
            </Reveal>
          </figure>

          <Reveal delay={200}>
            <Plate
              image={photo("ae-21")}
              ratio="3/4"
              speed={0.18}
              fade="sides"
              sizes="(min-width: 1024px) 34vw, 100vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

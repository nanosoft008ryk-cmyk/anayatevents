import { reviewQr } from "@/content/review-qr";
import { Reveal } from "@/components/motion/Reveal";

/**
 * A real, working QR code for the house's Google review sheet.
 *
 * The matrix is generated at build time from the canonical
 * `search.google.com/local/writereview` deep link (high error correction), so
 * it scans from a phone camera and is never a decorative placeholder.
 */
export function ReviewQr({
  eyebrow = "Scan to review",
  heading = "Leave a word on Google.",
  body = "Point a camera at the mark. Google's own review sheet opens on the house's verified profile — no app, no account hunting.",
  className = "",
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex flex-col items-start gap-10 sm:flex-row sm:items-center sm:gap-14 ${className}`}
    >
      <Reveal>
        <a
          href={reviewQr.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open the Google review sheet for Anayat Events & Catering"
          className="group relative block shrink-0"
        >
          {/* Gold corner rules — a plate, not a box. */}
          <span className="pointer-events-none absolute -top-3 -left-3 size-7 border-t-[0.5px] border-l-[0.5px] border-gold/60 transition-all duration-700 group-hover:-top-4 group-hover:-left-4" />
          <span className="pointer-events-none absolute -right-3 -bottom-3 size-7 border-r-[0.5px] border-b-[0.5px] border-gold/60 transition-all duration-700 group-hover:-right-4 group-hover:-bottom-4" />
          <span className="pointer-events-none absolute inset-0 -z-10 blur-2xl bg-[radial-gradient(circle_at_center,color-mix(in_oklab,var(--gold)_28%,transparent),transparent_70%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
          <span className="block bg-ivory p-4 sm:p-5">
            <svg
              viewBox={reviewQr.viewBox}
              role="img"
              aria-hidden="true"
              shapeRendering="crispEdges"
              className="size-32 sm:size-40 md:size-44"
            >
              <path d={reviewQr.path} fill="#0b0b0b" />
            </svg>
          </span>
        </a>
      </Reveal>

      <Reveal delay={120} className="min-w-0">
        <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">{eyebrow}</p>
        <h3 className="mt-5 max-w-[18ch] font-display text-[clamp(1.5rem,5vw,2.4rem)] leading-[1.12] font-light text-ivory">
          {heading}
        </h3>
        <p className="mt-5 max-w-[46ch] font-sans text-sm leading-[1.9] font-light text-muted-foreground">
          {body}
        </p>
        <a
          href={reviewQr.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-shape mt-7 inline-flex min-h-11 items-center font-sans text-[10px] tracking-[0.3em] uppercase text-gold transition-colors hover:text-gold-light"
        >
          Write a review &#8594;
        </a>
      </Reveal>
    </div>
  );
}

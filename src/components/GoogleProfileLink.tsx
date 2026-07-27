import { site } from "@/content/site";

/**
 * Google Business Profile trust link. Used only where it genuinely reassures —
 * hero, reviews, contact, footer — never as a repeated badge.
 */
export function GoogleProfileLink({
  label = "View Google reviews",
  className = "",
  showStars = true,
}: {
  label?: string;
  className?: string;
  showStars?: boolean;
}) {
  return (
    <a
      href={site.mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} — opens the Anayat Events Google Business Profile in a new tab`}
      className={`group/gbp inline-flex items-center gap-3 font-sans text-[10px] tracking-[0.28em] uppercase text-ivory transition-colors hover:text-gold ${className}`}
    >
      <GoogleGlyph />
      {showStars && (
        <span aria-hidden className="text-gold tracking-[0.1em]">
          ★★★★★
        </span>
      )}
      <span className="relative">
        {label}
        <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-[700ms] [transition-timing-function:var(--ease-lux)] group-hover/gbp:origin-left group-hover/gbp:scale-x-100" />
      </span>
    </a>
  );
}

function GoogleGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 48 48"
      className="h-4 w-4 shrink-0 transition-transform duration-[900ms] [transition-timing-function:var(--ease-lux)] group-hover/gbp:scale-110"
    >
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2.5 24 .5 14.6.5 6.5 5.9 2.6 13.8l7.8 6C12.3 14 17.6 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.15-3.1-.42-4.5H24v9h12.7c-.55 2.9-2.2 5.4-4.7 7.1l7.6 5.9c4.4-4.1 6.9-10.2 6.9-17.5Z" />
      <path fill="#FBBC05" d="M10.4 28.2A14.6 14.6 0 0 1 9.6 24c0-1.5.27-2.9.75-4.2l-7.8-6A23.9 23.9 0 0 0 0 24c0 3.9.93 7.5 2.6 10.2l7.8-6Z" />
      <path fill="#34A853" d="M24 47.5c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.3-8.3 2.3-6.4 0-11.7-4.5-13.6-10.4l-7.8 6C6.5 42.1 14.6 47.5 24 47.5Z" />
    </svg>
  );
}

import { Link } from "@tanstack/react-router";
import { MessageCircle, Phone, PenLine } from "lucide-react";

import { site } from "@/content/site";

/**
 * Sticky concierge bar — one tap to WhatsApp, call, or request a proposal.
 * Present on every page: a hairline gold-edged glass rail pinned to the bottom
 * on mobile, condensed to a floating pill on desktop.
 */
export function ConciergeBar() {
  const item =
    "group/cc relative flex min-h-11 flex-1 items-center justify-center gap-2 px-4 py-4 font-sans text-[10px] tracking-[0.28em] uppercase text-ivory/75 transition-colors duration-500 hover:text-gold lg:flex-none lg:py-3.5";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 print:hidden lg:inset-x-auto lg:right-8 lg:bottom-8">
      <nav
        aria-label="Concierge"
        className="pointer-events-auto flex items-stretch border-t-[0.5px] border-gold/30 bg-[color-mix(in_oklab,var(--background)_82%,transparent)] backdrop-blur-xl lg:rounded-full lg:border-[0.5px] lg:px-2 lg:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)]"
      >
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={item}
          aria-label={`WhatsApp ${site.short} on ${site.whatsappDisplay}`}
        >
          <MessageCircle className="size-4 shrink-0" strokeWidth={1.25} aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <span className="my-3 w-px bg-gold/20" aria-hidden="true" />

        <a href={site.phoneHref} className={item} aria-label={`Call ${site.phoneDisplay}`}>
          <Phone className="size-4 shrink-0" strokeWidth={1.25} aria-hidden="true" />
          <span>Call</span>
        </a>

        <span className="my-3 w-px bg-gold/20" aria-hidden="true" />

        <Link to="/contact" className={item} aria-label="Request a proposal">
          <PenLine className="size-4 shrink-0" strokeWidth={1.25} aria-hidden="true" />
          <span className="hidden sm:inline">Request a proposal</span>
          <span className="sm:hidden">Proposal</span>
        </Link>
      </nav>
    </div>
  );
}

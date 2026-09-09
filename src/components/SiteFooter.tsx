import { Link } from "@tanstack/react-router";

import { footerColumns } from "@/content/navigation";
import { site } from "@/content/site";
import { logo } from "@/content/images";
import { photo } from "@/content/images";
import { SmartImg } from "@/components/ui/SmartImg";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxLink, LuxAnchor } from "@/components/ui/LuxButton";
import { GoogleProfileLink } from "@/components/GoogleProfileLink";
import { useLiveRating } from "@/hooks/use-live-rating";

type FooterItem = { label: string; to: string; params?: Record<string, string> };

/** One index column. Collapses into a disclosure below `sm`, opens as a plain
 *  list from `sm` up — so the phone footer is a short, scannable menu rather
 *  than a fifty-link scroll. */
function IndexColumn({ heading, items }: { heading: string; items: readonly FooterItem[] }) {
  const list = (
    <ul className="space-y-3 pb-2 sm:pb-0">
      {items.map((item) => (
        <li key={`${item.to}-${item.label}`}>
          <Link
            to={item.to}
            params={item.params as never}
            className="inline-block py-0.5 font-sans text-[13px] leading-relaxed font-light text-ivory/72 transition-colors hover:text-gold"
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="border-b border-border/70 lg:border-0">
      {/* Phone and tablet: disclosure keeps the index scannable. */}
      <details className="group/col lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-4 [&::-webkit-details-marker]:hidden">
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
            {heading}
          </span>
          <span
            aria-hidden
            className="relative grid h-6 w-6 shrink-0 place-items-center text-gold"
          >
            <span className="absolute h-px w-3 bg-current" />
            <span className="absolute h-3 w-px bg-current transition-transform duration-500 [transition-timing-function:var(--ease-lux)] group-open/col:rotate-90 group-open/col:opacity-0" />
          </span>
        </summary>
        <div className="pb-5">{list}</div>
      </details>

      {/* Desktop: always visible */}
      <div className="hidden lg:block">
        <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
          {heading}
        </p>
        <div className="mt-6">{list}</div>
      </div>
    </div>

  );
}

/**
 * Cinematic finale. A closing frame and the house line, a contact rail, a
 * collapsible index and the copyright — the last element on every page.
 */
export function SiteFooter() {
  const liveRating = useLiveRating();
  const closing = photo("ae-08");

  return (
    <footer className="relative isolate overflow-hidden border-t border-border">
      {/* Closing frame dissolves out of the page above. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[60svh] md:h-[70svh]">
        <SmartImg
          id={closing.id} fallbackUrl={closing.url} sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-25 drift-slow"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, color-mix(in oklab, var(--background) 70%, transparent) 40%, var(--background) 100%)",
          }}
        />
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 grain" />
      </div>

      {/* ── I. The last word ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-[92rem] px-5 pt-20 pb-14 text-center sm:px-6 md:px-12 md:pt-32 md:pb-20">
        <Reveal>
          <img
            src={logo}
            alt={`${site.name} logo`}
            width={96}
            height={96}
            className="mx-auto h-16 w-16 rounded-full object-cover sm:h-20 sm:w-20 md:h-24 md:w-24"
          />
        </Reveal>
        <h2 className="mx-auto mt-8 max-w-[14ch] font-display text-[clamp(2.15rem,11vw,4.6rem)] leading-[0.98] font-light text-ivory md:mt-10">
          <RevealWords text="You think." />
          <span className="foil-text block italic">
            <RevealWords text="We do." delay={180} />
          </span>
        </h2>
        <Reveal delay={420}>
          <p className="mx-auto mt-6 max-w-xl font-sans text-[14px] leading-[1.9] font-light text-ivory/70 sm:text-[15px] sm:leading-[2] md:mt-8">
            {site.description}
          </p>
        </Reveal>
        <Reveal
          delay={520}
          className="mt-9 md:mt-12"
          innerClassName="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
        >
          <LuxLink to="/contact" tone="foil" className="justify-center">
            Begin an enquiry
          </LuxLink>
          <LuxAnchor href={site.whatsappHref} tone="ghost" className="justify-center">
            WhatsApp a planner
          </LuxAnchor>
        </Reveal>
      </div>

      {/* ── II. Contact rail + index (wordmark bleeds behind) ──────────── */}
      <div className="relative isolate">
        {/* Background wordmark — full-bleed, edge to edge, no framing rule. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
        >
          <span className="absolute inset-0 wordmark-bed" />
          <span className="grain absolute inset-0" />
          <p className="absolute inset-x-0 bottom-[6%] text-center font-display font-light leading-[0.82] tracking-[-0.035em] text-transparent opacity-55 [background-image:linear-gradient(to_bottom,color-mix(in_oklab,var(--gold-light)_19%,transparent),color-mix(in_oklab,var(--gold)_8%,transparent)_65%,transparent)] [background-clip:text] [-webkit-background-clip:text] text-[26vw] lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2 lg:whitespace-nowrap lg:text-[14.4vw] lg:opacity-100">
            <span className="block lg:inline">Anayat</span>{" "}
            <span className="block lg:inline">Events</span>
          </p>
        </div>

        <div className="mx-auto max-w-[92rem] px-5 pt-12 sm:px-6 md:px-12 md:pt-16">
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.6fr)]">
            {/* The studio */}
            <div className="min-w-0">
              <p className="font-sans text-[10px] tracking-[0.34em] uppercase text-gold-deep">
                The studio
              </p>
              <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-y-0">
                <div>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block max-w-xs font-sans text-[13.5px] leading-[1.9] font-light text-ivory/70 transition-colors hover:text-gold"
                  >
                    {site.address.full}
                  </a>
                  <p className="mt-3 font-sans text-[13.5px] font-light text-ivory/70">
                    {site.hours}
                  </p>
                </div>
                <div className="space-y-2 lg:mt-8">
                  {site.contacts.map((c) => (
                    <a
                      key={c.tel}
                      href={c.tel}
                      className="block font-display text-[1.05rem] leading-snug font-light text-ivory transition-colors hover:text-gold sm:text-lg"
                    >
                      {c.name} — {c.display}
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                {[
                  { label: "WhatsApp", href: site.whatsappHref },
                  { label: "Instagram", href: site.instagram },
                ].map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group/f relative font-sans text-[10px] tracking-[0.28em] uppercase text-ivory transition-colors hover:text-gold"
                  >
                    {l.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-[700ms] [transition-timing-function:var(--ease-lux)] group-hover/f:origin-left group-hover/f:scale-x-100" />
                  </a>
                ))}
              </div>
              <div className="mt-7">
                <GoogleProfileLink label="Google Business Profile" showStars={false} />
              </div>
            </div>

            {/* The index */}
            <nav
              aria-label="Footer"
              className="grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-10"
            >
              {footerColumns.map((col) => (
                <IndexColumn key={col.heading} heading={col.heading} items={col.items} />
              ))}
            </nav>
          </div>

          {/* Last element on the page. The only space beneath it is the
              clearance the fixed concierge bar needs, nothing more. */}
          <div className="mt-12 flex flex-col gap-3 border-t border-border pt-7 pb-[max(6.5rem,calc(4.5rem+env(safe-area-inset-bottom)))] sm:flex-row sm:items-center sm:justify-between md:mt-16 md:pt-8 lg:pb-24">
            <p className="font-sans text-[9.5px] leading-relaxed tracking-[0.22em] uppercase text-ivory/70 sm:text-[10px] sm:tracking-[0.24em]">
              © {new Date().getFullYear()} {site.legalName}
            </p>
            <p className="font-sans text-[9.5px] leading-relaxed tracking-[0.22em] uppercase text-ivory/70 sm:text-right sm:text-[10px] sm:tracking-[0.24em]">
              {site.serviceArea} · Rated {liveRating.rating} from {liveRating.count} reviews
            </p>
            <p className="font-sans text-[9.5px] leading-relaxed tracking-[0.22em] uppercase text-ivory/50 sm:text-right sm:text-[10px] sm:tracking-[0.24em]">
              Design &amp; Developed by{" "}
              <a
                href="https://naumanellahi.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/80 transition-colors duration-500 hover:text-gold"
              >
                Nauman Ellahi
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

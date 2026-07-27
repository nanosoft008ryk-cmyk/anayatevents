import { Link } from "@tanstack/react-router";

import { footerColumns } from "@/content/navigation";
import { site } from "@/content/site";
import { logo } from "@/content/images";
import { photo } from "@/content/images";
import { imgAttrs } from "@/lib/img";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxLink, LuxAnchor } from "@/components/ui/LuxButton";

/**
 * Cinematic finale. The footer opens with a full-bleed closing frame and the
 * house line, then settles into a quiet editorial index — no boxes, no
 * link soup, hairlines only.
 */
export function SiteFooter() {
  const closing = photo("ae-08");

  return (
    <footer className="relative isolate overflow-hidden border-t border-border">
      {/* Closing frame dissolves out of the page above. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-[70svh]">
        <img
          {...imgAttrs(closing.id, closing.url, "100vw")}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-25 drift-slow"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, color-mix(in oklab, var(--background) 62%, transparent) 40%, var(--background) 100%)",
          }}
        />
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 grain" />
      </div>

      {/* ── The last word ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[92rem] px-6 pt-28 pb-20 text-center md:px-12 md:pt-40">
        <Reveal>
          <img
            src={logo}
            alt={`${site.name} logo`}
            width={96}
            height={96}
            className="mx-auto h-20 w-20 rounded-full object-cover md:h-24 md:w-24"
          />
        </Reveal>
        <h2 className="mx-auto mt-10 max-w-[14ch] font-display text-[2.6rem] leading-[0.98] font-light text-ivory md:text-[4.6rem]">
          <RevealWords text="You think." />
          <span className="block italic text-foil">
            <RevealWords text="We do." delay={180} />
          </span>
        </h2>
        <Reveal delay={420}>
          <p className="mx-auto mt-8 max-w-xl font-sans text-[15px] leading-[2] font-light text-ivory/65">
            {site.description}
          </p>
        </Reveal>
        <Reveal delay={520} className="mt-12 flex flex-wrap justify-center gap-4">
          <LuxLink to="/contact" tone="foil">
            Begin an enquiry
          </LuxLink>
          <LuxAnchor href={site.whatsappHref} tone="ghost">
            WhatsApp a planner
          </LuxAnchor>
        </Reveal>
      </div>

      {/* ── The index ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[92rem] px-6 pb-36 md:px-12 lg:pb-20">
        <div className="grid gap-16 border-t border-border pt-16 lg:grid-cols-[1fr_2.1fr]">
          <div>
            <p className="font-sans text-[10px] tracking-[0.34em] uppercase text-gold-deep">
              The studio
            </p>
            <p className="mt-6 max-w-xs font-sans text-sm leading-[1.95] font-light text-muted-foreground">
              {site.address.full}
            </p>
            <p className="mt-4 font-sans text-sm font-light text-muted-foreground">
              {site.hours}
            </p>
            <div className="mt-8 space-y-2">
              {site.contacts.map((c) => (
                <a
                  key={c.tel}
                  href={c.tel}
                  className="block font-display text-lg font-light text-ivory transition-colors hover:text-gold"
                >
                  {c.name} — {c.display}
                </a>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { label: "WhatsApp", href: site.whatsappHref },
                { label: "Instagram", href: site.instagram },
                { label: "Google", href: site.mapsUrl },
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
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                  {col.heading}
                </p>
                <ul className="mt-6 space-y-3">
                  {col.items.map((item) => (
                    <li key={`${item.to}-${item.label}`}>
                      <Link
                        to={item.to}
                        params={(item as { params?: Record<string, string> }).params as never}
                        className="font-sans text-[13px] font-light text-muted-foreground transition-colors hover:text-gold"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p className="font-sans text-[10px] tracking-[0.24em] uppercase text-muted-foreground">
            {site.serviceArea} · Rated {site.rating.value} from {site.rating.count} reviews
          </p>
        </div>
      </div>
    </footer>
  );
}

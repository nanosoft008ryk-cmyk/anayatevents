import { Link } from "@tanstack/react-router";

import { footerColumns } from "@/content/navigation";
import { site } from "@/content/site";
import { logo } from "@/content/images";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-36 md:px-10 lg:pb-20">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <img src={logo} alt={`${site.name} logo`} className="h-16 w-16 rounded-full object-cover" />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug font-light text-ivory">
              {site.tagline}
            </p>
            <p className="mt-5 max-w-sm font-sans text-sm leading-[1.9] font-light text-muted-foreground">
              {site.address.full}
            </p>
            <p className="mt-3 font-sans text-sm font-light text-muted-foreground">{site.hours}</p>
            <div className="mt-6 space-y-2">
              {site.contacts.map((c) => (
                <a
                  key={c.tel}
                  href={c.tel}
                  className="block font-sans text-sm font-light text-ivory transition-colors hover:text-gold"
                >
                  {c.name} — {c.display}
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={site.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="btn-shape inline-flex items-center border border-border-strong px-5 py-3 font-sans text-[10px] tracking-[0.22em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                WhatsApp
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="btn-shape inline-flex items-center border border-border-strong px-5 py-3 font-sans text-[10px] tracking-[0.22em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                Instagram
              </a>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-shape inline-flex items-center border border-border-strong px-5 py-3 font-sans text-[10px] tracking-[0.22em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                Google
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.heading}>
                <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                  {col.heading}
                </p>
                <ul className="mt-5 space-y-2.5">
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
          <p className="font-sans text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p className="font-sans text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            {site.serviceArea} · Rated {site.rating.value} from {site.rating.count} reviews
          </p>
        </div>
      </div>
    </footer>
  );
}

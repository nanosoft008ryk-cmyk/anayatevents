import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { logo } from "@/content/images";

export function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open || mobile
          ? "border-b border-border bg-background/92 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} — home`}>
          <img src={logo} alt="" className="h-10 w-10 rounded-full object-cover md:h-11 md:w-11" />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-lg font-light tracking-wide text-ivory">
              Anayat Events
            </span>
            <span className="mt-1 font-sans text-[9px] tracking-[0.34em] uppercase text-gold">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navigation.map((group) => (
            <div key={group.label} onMouseEnter={() => setOpen(group.columns ? group.label : null)}>
              <Link
                to={group.to}
                className="font-sans text-[11px] tracking-[0.24em] uppercase text-muted-foreground transition-colors hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {group.label}
              </Link>
            </div>
          ))}
          <Link
            to="/contact"
            className="border border-gold px-6 py-3 font-sans text-[11px] tracking-[0.24em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Enquire
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobile((v) => !v)}
          aria-expanded={mobile}
          aria-label="Toggle menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-px w-6 bg-ivory transition-transform ${mobile ? "translate-y-[6px] rotate-45" : ""}`}
          />
          <span className={`h-px w-6 bg-ivory transition-opacity ${mobile ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-ivory transition-transform ${mobile ? "-translate-y-[6px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Desktop mega panel */}
      {open && (
        <div className="hidden border-t border-border bg-background/97 backdrop-blur-xl lg:block">
          <div className="mx-auto max-w-7xl px-10 py-12">
            <div className="grid gap-10 md:grid-cols-4">
              {navigation
                .find((g) => g.label === open)
                ?.columns?.map((col) => (
                  <div key={col.heading}>
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold-deep">
                      {col.heading}
                    </p>
                    <ul className="mt-5 space-y-3">
                      {col.items.map((item) => (
                        <li key={`${item.to}-${item.label}`}>
                          <Link
                            to={item.to}
                            params={item.params as never}
                            className="font-display text-lg font-light text-muted-foreground transition-colors hover:text-gold"
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
        </div>
      )}

      {/* Mobile drawer */}
      {mobile && (
        <div className="max-h-[80vh] overflow-y-auto border-t border-border bg-background lg:hidden">
          <div className="px-6 py-8">
            {navigation.map((group) => (
              <div key={group.label} className="border-b border-border py-5">
                <Link
                  to={group.to}
                  className="font-display text-2xl font-light text-ivory"
                >
                  {group.label}
                </Link>
                {group.columns && (
                  <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2">
                    {group.columns
                      .flatMap((c) => c.items)
                      .slice(0, 8)
                      .map((item) => (
                        <li key={`${item.to}-${item.label}`}>
                          <Link
                            to={item.to}
                            params={item.params as never}
                            className="font-sans text-[12px] font-light text-muted-foreground"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-8">
              <Link
                to="/contact"
                className="border border-gold px-6 py-4 text-center font-sans text-[11px] tracking-[0.24em] uppercase text-gold"
              >
                Enquire
              </Link>
              <a
                href={site.phoneHref}
                className="border border-border-strong px-6 py-4 text-center font-sans text-[11px] tracking-[0.24em] uppercase text-ivory"
              >
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

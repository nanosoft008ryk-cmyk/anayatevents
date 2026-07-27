import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

import { navigation } from "@/content/navigation";
import { site } from "@/content/site";
import { logo, photo } from "@/content/images";
import { imgAttrs } from "@/lib/img";

export function SiteHeader() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 32);
      setHidden(y > 320 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  const solid = scrolled || !!open || mobile;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,backdrop-filter] duration-[900ms] [transition-timing-function:var(--ease-lux)] ${
        hidden && !open && !mobile ? "-translate-y-full" : "translate-y-0"
      } ${solid ? "bg-background/85 backdrop-blur-2xl" : "bg-transparent"}`}
      onMouseLeave={() => setOpen(null)}
    >
      <div
        className={`mx-auto flex max-w-[92rem] items-center justify-between px-6 transition-[padding] duration-700 md:px-12 ${
          solid ? "py-3.5" : "py-7"
        }`}
      >
        <Link to="/" className="group/logo flex items-center gap-4" aria-label={`${site.name} — home`}>
          <img
            src={logo}
            alt=""
            className={`rounded-full object-cover transition-all duration-700 [transition-timing-function:var(--ease-lux)] ${
              solid ? "h-9 w-9" : "h-12 w-12"
            }`}
          />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-[1.15rem] font-light tracking-[0.04em] text-ivory">
              Anayat Events
            </span>
            <span className="mt-1.5 font-sans text-[8px] tracking-[0.44em] uppercase text-gold">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {navigation.map((group) => (
            <div
              key={group.label}
              className="py-2"
              onMouseEnter={() => setOpen(group.columns ? group.label : null)}
            >
              <Link
                to={group.to}
                className="group/nav relative font-sans text-[10px] tracking-[0.34em] uppercase text-muted-foreground transition-colors duration-500 hover:text-gold"
                activeProps={{ className: "text-gold" }}
              >
                {group.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px w-full bg-gold transition-transform duration-700 [transition-timing-function:var(--ease-lux)] ${
                    open === group.label
                      ? "origin-left scale-x-100"
                      : "origin-right scale-x-0 group-hover/nav:origin-left group-hover/nav:scale-x-100"
                  }`}
                />
              </Link>
            </div>
          ))}
          <Link
            to="/contact"
            className="group/cta relative isolate overflow-hidden px-7 py-3.5 font-sans text-[10px] tracking-[0.34em] uppercase text-gold transition-colors duration-500 hover:text-primary-foreground"
          >
            <span className="absolute inset-0 -z-10 border border-border-strong transition-colors duration-500 group-hover/cta:border-gold" />
            <span className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-gold transition-transform duration-[800ms] [transition-timing-function:var(--ease-lux)] group-hover/cta:scale-y-100" />
            Enquire
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobile((v) => !v)}
          aria-expanded={mobile}
          aria-label="Toggle menu"
          className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
        >
          <span
            className={`h-px bg-ivory transition-all duration-500 ${mobile ? "w-6 translate-y-[7px] rotate-45" : "w-7"}`}
          />
          <span className={`h-px w-5 bg-gold transition-opacity duration-300 ${mobile ? "opacity-0" : ""}`} />
          <span
            className={`h-px bg-ivory transition-all duration-500 ${mobile ? "w-6 -translate-y-[7px] -rotate-45" : "w-7"}`}
          />
        </button>
      </div>

      <span
        className={`mx-auto block h-px max-w-[92rem] origin-left bg-gradient-to-r from-transparent via-border-strong to-transparent transition-transform duration-[900ms] [transition-timing-function:var(--ease-lux)] ${
          solid ? "scale-x-100" : "scale-x-0"
        }`}
      />

      {/* Desktop panel — editorial, with a plate on the right */}
      {open && (
        <div className="hidden bg-background/95 backdrop-blur-2xl lg:block">
          <div className="mx-auto grid max-w-[92rem] grid-cols-[1.6fr_0.6fr] gap-16 px-12 py-14">
            <div className="grid gap-12 md:grid-cols-3">
              {navigation
                .find((g) => g.label === open)
                ?.columns?.map((col, ci) => (
                  <div
                    key={col.heading}
                    className="animate-[fade-in_0.7s_var(--ease-lux)_both]"
                    style={{ animationDelay: `${ci * 70}ms` }}
                  >
                    <p className="font-sans text-[9px] tracking-[0.38em] uppercase text-gold-deep">
                      {col.heading}
                    </p>
                    <span className="mt-4 block h-px w-full bg-border" />
                    <ul className="mt-5 space-y-2.5">
                      {col.items.map((item) => (
                        <li key={`${item.to}-${item.label}`}>
                          <Link
                            to={item.to}
                            params={item.params as never}
                            className="group/mi inline-flex items-center gap-3 font-display text-[1.15rem] font-light text-muted-foreground transition-colors duration-500 hover:text-gold"
                          >
                            <span className="h-px w-0 bg-gold transition-all duration-500 group-hover/mi:w-4" />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
            <div className="animate-[fade-in_0.9s_var(--ease-lux)_both]">
              <img
                {...imgAttrs("ae-13", photo("ae-13").url, "20vw")}
                alt=""
                loading="lazy"
                decoding="async"
                className="aspect-[3/4] w-full object-cover [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
              />
              <p className="mt-4 font-sans text-[9px] tracking-[0.3em] uppercase text-muted-foreground">
                {site.tagline}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mobile — full-height cinematic drawer */}
      {mobile && (
        <div className="relative h-[calc(100svh-4.5rem)] overflow-y-auto bg-background lg:hidden">
          <img
            {...imgAttrs("ae-22", photo("ae-22").url, "100vw")}
            alt=""
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
          />
          <div className="relative px-6 pt-6 pb-16">
            {navigation.map((group, gi) => (
              <div
                key={group.label}
                className="animate-[fade-in_0.6s_var(--ease-lux)_both] border-b border-border py-6"
                style={{ animationDelay: `${gi * 60}ms` }}
              >
                <Link to={group.to} className="font-display text-3xl font-light text-ivory">
                  {group.label}
                </Link>
                {group.columns && (
                  <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
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
            <div className="flex flex-col gap-3 pt-10">
              <Link
                to="/contact"
                className="bg-gold px-6 py-4 text-center font-sans text-[11px] tracking-[0.3em] uppercase text-primary-foreground"
              >
                Enquire
              </Link>
              <a
                href={site.phoneHref}
                className="border border-border-strong px-6 py-4 text-center font-sans text-[11px] tracking-[0.3em] uppercase text-ivory"
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

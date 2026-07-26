import { Link } from "@tanstack/react-router";

import { site } from "@/content/site";

export function CtaBand({
  eyebrow = "Begin",
  title = "Tell us the date. We will hold the rest.",
  body = "One planner reads every enquiry. Expect a considered reply within 12 working hours — never a template.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">{eyebrow}</p>
            <h2 className="mt-6 max-w-2xl font-display text-4xl leading-[1.06] font-light text-ivory md:text-5xl">
              {title}
            </h2>
            <p className="mt-6 max-w-xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
              {body}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Link
              to="/contact"
              className="border border-gold bg-gold px-8 py-4 font-sans text-[11px] tracking-[0.24em] uppercase text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start an enquiry
            </Link>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="border border-border-strong px-8 py-4 font-sans text-[11px] tracking-[0.24em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

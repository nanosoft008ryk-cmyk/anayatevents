import { createFileRoute, Link } from "@tanstack/react-router";

import { site, stats } from "@/content/site";
import { photo } from "@/content/images";
import { serviceFamilies, services } from "@/content/services";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { pageMeta, jsonLd, breadcrumbSchema, type Crumb } from "@/lib/seo";

const PATH = "/about";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: PATH },
];

export const Route = createFileRoute("/about/")({
  head: () => ({
    ...pageMeta({
      title: "About Anayat Events & Catering — Luxury Event House in Lahore",
      description:
        "A Lahore event management and catering house since 2016: in-house design, fabrication, floral and kitchen crews, 500+ celebrations, 5.0 from 62 Google reviews.",
      path: PATH,
      image: photo("ae-02").url,
    }),
    scripts: [jsonLd(breadcrumbSchema(trail))],
  }),
  component: AboutPage,
});

function AboutPage() {
  const hero = photo("ae-02");
  const second = photo("ae-18");

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">
          Est. {site.founded} · Lahore
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          One house. Design, fabrication,
          <span className="block italic">florals and the kitchen.</span>
        </h1>
        <p className="mt-7 max-w-2xl font-display text-xl leading-relaxed font-light italic text-muted-foreground md:text-2xl">
          {site.tagline}
        </p>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <img
            src={hero.url}
            alt={hero.alt}
            className="aspect-[16/9] w-full border border-border object-cover"
          />
        </div>
      </section>

      <section className="border-t border-border mt-16 md:mt-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 md:grid-cols-[0.7fr_1.3fr] md:px-10 md:py-24 lg:gap-24">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
            The house
          </p>
          <div className="space-y-6 max-w-2xl">
            <p className="font-display text-2xl leading-relaxed font-light text-ivory md:text-3xl">
              Most event companies in Lahore are brokers. They take your date, then rent the
              stage, sub-contract the flowers and call a caterer they have never eaten with.
            </p>
            <p className="font-sans text-base leading-[1.9] font-light text-muted-foreground">
              We are built the other way. Since {site.founded} we have kept design, carpentry,
              lighting, floral and the kitchen inside one house, under one production head. A
              stage is drawn in our studio, built in our workshop, lit and photographed before it
              ever reaches your venue. A menu is cooked, tasted and re-cooked by the same chefs
              who will stand behind the line on your night.
            </p>
            <p className="font-sans text-base leading-[1.9] font-light text-muted-foreground">
              That control is the whole product. It is why a barat set can be re-cut two days out
              without a panic, why marigold is still fresh at one in the morning, and why eight
              hundred plates leave the kitchen within minutes of each other. Nothing is
              coordinated by phone call between four vendors who have never met.
            </p>
            <p className="font-sans text-base leading-[1.9] font-light text-muted-foreground">
              We work across {site.serviceArea}, from farmhouses on Bedian Road to hotel ballrooms
              in Gulberg and private lawns in DHA. {site.rating.count} verified Google reviews sit
              at {site.rating.value} — the number we are most careful about protecting.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background px-6 py-12 md:px-10 md:py-16">
              <p className="font-display text-4xl font-light text-gold md:text-5xl">{s.value}</p>
              <p className="mt-4 font-sans text-[11px] tracking-[0.22em] uppercase text-ivory">
                {s.label}
              </p>
              <p className="mt-2 font-sans text-xs font-light text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 md:grid-cols-2 md:items-center md:px-10 md:py-24">
          <img
            src={second.url}
            alt={second.alt}
            loading="lazy"
            className="aspect-[4/5] w-full border border-border object-cover"
          />
          <div>
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
              What we take on
            </p>
            <h2 className="mt-6 font-display text-3xl leading-tight font-light text-ivory md:text-4xl">
              Weddings first, but not only weddings.
            </h2>
            <ul className="mt-8 divide-y divide-border border-y border-border">
              {serviceFamilies.map((family) => (
                <li key={family} className="py-5">
                  <p className="font-display text-xl font-light text-ivory">{family}</p>
                  <p className="mt-1.5 font-sans text-sm leading-relaxed font-light text-muted-foreground">
                    {services
                      .filter((s) => s.family === family)
                      .map((s) => s.name)
                      .join(" · ")}
                  </p>
                </li>
              ))}
            </ul>

            <Link
              to="/about/process"
              className="mt-8 inline-block border border-gold px-8 py-4 font-sans text-[11px] tracking-[0.24em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
            >
              How we work
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

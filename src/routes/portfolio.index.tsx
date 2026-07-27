import { createFileRoute, Link } from "@tanstack/react-router";

import { portfolioCategories } from "@/content/portfolio";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

const PATH = "/portfolio";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Portfolio", path: PATH },
];

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    ...pageMeta({
      title: "Event Portfolio — Lahore Weddings & Celebrations | Anayat Events",
      description:
        "Photographic portfolio from Anayat Events Lahore — wedding stages, floral installations, mehndi celebrations, farmhouse builds, dining and lounge design.",
      path: PATH,
      image: photo("ae-13").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "Portfolio collections",
          path: PATH,
          items: portfolioCategories.map((c) => ({
            name: c.name,
            path: `/portfolio/${c.slug}`,
          })),
        }),
      ),
    ],
  }),
  component: PortfolioIndex,
});

function PortfolioIndex() {
  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">The work</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          Rooms we built,
          <span className="block italic">photographed as they stood.</span>
        </h1>
        <p className="mt-7 max-w-2xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
          Six collections, drawn from our own archive. No stock photography, no borrowed sets —
          every frame is a room this crew built in Lahore.
        </p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {portfolioCategories.map((c) => {
              const img = photo(c.hero);
              return (
                <Link
                  key={c.slug}
                  to="/portfolio/$slug"
                  params={{ slug: c.slug }}
                  className="group bg-background"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent" />
                  </div>
                  <div className="p-8">
                    <h2 className="font-display text-2xl font-light text-ivory transition-colors group-hover:text-gold">
                      {c.name}
                    </h2>
                    <p className="mt-3 font-sans text-sm leading-relaxed font-light text-muted-foreground">
                      {c.lede}
                    </p>
                    <p className="mt-4 font-sans text-[11px] tracking-[0.2em] uppercase text-gold-deep">
                      {c.photos.length} frames
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link
            to="/vault"
            className="mt-12 btn-shape inline-flex items-center border border-gold px-8 py-4 font-sans text-[11px] tracking-[0.24em] uppercase text-gold transition-colors hover:bg-gold hover:text-primary-foreground"
          >
            Enter the Vault — full archive
          </Link>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

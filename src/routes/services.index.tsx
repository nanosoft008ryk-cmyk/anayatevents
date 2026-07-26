import { createFileRoute, Link } from "@tanstack/react-router";

import { services } from "@/content/services";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  itemListSchema,
  type Crumb,
} from "@/lib/seo";

const PATH = "/services";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Services", path: PATH },
];

const families = ["Weddings", "Celebrations", "Catering", "Design & Production"] as const;

export const Route = createFileRoute("/services/")({
  head: () => ({
    ...pageMeta({
      title: "Luxury Event Services in Lahore | Anayat Events & Catering",
      description:
        "Seventeen event disciplines under one house in Lahore — wedding planning, mehndi and walima production, corporate events, live BBQ and luxury catering, florals and stage design.",
      path: PATH,
      image: photo("ae-24").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "Event services in Lahore",
          path: PATH,
          items: services.map((s) => ({ name: s.name, path: `/services/${s.slug}` })),
        }),
      ),
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">
          Seventeen disciplines
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          Everything an evening needs,
          <span className="block italic">held by one house.</span>
        </h1>
        <p className="mt-7 max-w-2xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
          Planning, design, fabrication, florals, lighting and the kitchen all sit inside the same
          team. Choose the discipline you need, or hand us the whole week.
        </p>
      </section>

      {families.map((family) => {
        const list = services.filter((s) => s.family === family);
        if (list.length === 0) return null;
        return (
          <section key={family} className="border-t border-border">
            <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
              <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold-deep">
                {family}
              </p>
              <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s) => {
                  const img = photo(s.hero);
                  return (
                    <Link
                      key={s.slug}
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="group bg-background"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
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
                          {s.name}
                        </h2>
                        <p className="mt-3 font-sans text-sm leading-relaxed font-light text-muted-foreground">
                          {s.lede}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBand />
    </main>
  );
}

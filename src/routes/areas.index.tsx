import { createFileRoute, Link } from "@tanstack/react-router";

import { locations } from "@/content/locations";
import { photo } from "@/content/images";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  itemListSchema,
  type Crumb,
} from "@/lib/seo";

const PATH = "/areas";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Areas", path: PATH },
];

export const Route = createFileRoute("/areas/")({
  head: () => ({
    ...pageMeta({
      title: "Areas We Serve in Lahore | Anayat Events & Catering",
      description:
        "Event management and catering across every district of Lahore — DHA, Bahria Town, Gulberg, Model Town, Johar Town, Cantt, Raiwind and the farmhouse belt.",
      path: PATH,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "Areas served across Lahore",
          path: PATH,
          items: locations.map((l) => ({
            name: l.shortName,
            path: `/areas/${l.slug}`,
          })),
        }),
      ),
    ],
  }),
  component: AreasIndex,
});

function AreasIndex() {
  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-16 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">
          {site.serviceArea}
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          Every postcode in Lahore,
          <span className="block italic">produced by the same team.</span>
        </h1>
        <p className="mt-7 max-w-2xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
          Each district of this city runs on its own rules — gate protocols, sound
          cut-offs, load-in windows, kitchen access. These pages set out what we know
          about producing in each one.
        </p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => {
              const img = photo(location.hero);
              return (
                <Link
                  key={location.slug}
                  to="/areas/$slug"
                  params={{ slug: location.slug }}
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
                      {location.shortName}
                    </h2>
                    <p className="mt-3 font-sans text-sm leading-relaxed font-light text-muted-foreground">
                      {location.lede}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";

import { articlesByDate } from "@/content/journal";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

const PATH = "/journal";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Journal", path: PATH },
];

export const Route = createFileRoute("/journal/")({
  head: () => ({
    ...pageMeta({
      title: "The Journal — Wedding & Event Writing from Lahore | Anayat Events",
      description:
        "Long-form writing on planning, design, catering and venues in Lahore — timelines, real costs, floral craft and stage design, written by the team that builds them.",
      path: PATH,
      image: photo(articlesByDate[0].hero).url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "Journal articles",
          path: PATH,
          items: articlesByDate.map((a) => ({ name: a.title, path: `/journal/${a.slug}` })),
        }),
      ),
    ],
  }),
  component: JournalIndex,
});

function JournalIndex() {
  const [lead, ...rest] = articlesByDate;
  const leadImg = photo(lead.hero);

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">The Journal</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          Written by the people
          <span className="block italic">who build the rooms.</span>
        </h1>
        <p className="mt-7 max-w-2xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
          No listicles, no borrowed advice. Working knowledge from the production floor in Lahore.
        </p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <Link
            to="/journal/$slug"
            params={{ slug: lead.slug }}
            className="group grid gap-10 lg:grid-cols-2 lg:items-center"
          >
            <div className="aspect-[4/3] overflow-hidden border border-border">
              <img
                src={leadImg.url}
                alt={leadImg.alt}
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                {lead.category} · {lead.readingTime}
              </p>
              <h2 className="mt-5 font-display text-4xl leading-tight font-light text-ivory transition-colors group-hover:text-gold md:text-5xl">
                {lead.title}
              </h2>
              <p className="mt-5 max-w-xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
                {lead.excerpt}
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => {
              const img = photo(a.hero);
              return (
                <Link
                  key={a.slug}
                  to="/journal/$slug"
                  params={{ slug: a.slug }}
                  className="group bg-background"
                >
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={img.url}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-8">
                    <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                      {a.category} · {a.readingTime}
                    </p>
                    <h2 className="mt-4 font-display text-2xl leading-snug font-light text-ivory transition-colors group-hover:text-gold">
                      {a.title}
                    </h2>
                    <p className="mt-3 font-sans text-sm leading-relaxed font-light text-muted-foreground">
                      {a.excerpt}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

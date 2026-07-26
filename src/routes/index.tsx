import { createFileRoute, Link } from "@tanstack/react-router";

import { site, consultationSteps, stats } from "@/content/site";
import { photo } from "@/content/images";
import { services } from "@/content/services";
import { locations } from "@/content/locations";
import { portfolioCategories } from "@/content/portfolio";
import { testimonials } from "@/content/testimonials";
import { articlesByDate } from "@/content/journal";
import { CtaBand } from "@/components/CtaBand";
import { pageMeta, jsonLd, itemListSchema } from "@/lib/seo";

const HERO = "ae-22";
const HOME_PHOTOS = ["ae-13", "ae-14", "ae-10", "ae-16", "ae-26", "ae-03"];

export const Route = createFileRoute("/")({
  head: () => ({
    ...pageMeta({
      title: "Anayat Events & Catering — Luxury Event Management in Lahore",
      description:
        "Lahore's luxury event management and catering house. Weddings, mehndi, walima, corporate and private celebrations — designed, built and served by one accountable team.",
      path: "/",
      image: photo(HERO).url,
    }),
    scripts: [
      jsonLd(
        itemListSchema({
          name: "Signature services",
          path: "/",
          items: services.slice(0, 8).map((s) => ({
            name: s.name,
            path: `/services/${s.slug}`,
          })),
        }),
      ),
    ],
  }),
  component: Home,
});

function Home() {
  const hero = photo(HERO);
  const gallery = HOME_PHOTOS.map(photo);
  const featured = services.slice(0, 6);
  const journal = articlesByDate.slice(0, 3);

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="relative min-h-[100svh] w-full overflow-hidden">
        <img
          src={hero.url}
          alt={hero.alt}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pt-36 pb-20 md:px-10 md:pb-28">
          <p className="font-sans text-[11px] tracking-[0.4em] uppercase text-gold">
            Lahore · Since {site.founded}
          </p>
          <h1 className="mt-8 max-w-5xl font-display text-[3.2rem] leading-[0.98] font-light text-ivory md:text-[6rem]">
            An evening built
            <span className="block italic text-gold-light">before you arrive at it.</span>
          </h1>
          <p className="mt-8 max-w-xl font-sans text-[15px] leading-[1.9] font-light text-muted-foreground md:text-base">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="border border-gold bg-gold px-8 py-4 font-sans text-[11px] tracking-[0.24em] uppercase text-primary-foreground transition-opacity hover:opacity-90"
            >
              Begin an enquiry
            </Link>
            <Link
              to="/portfolio"
              className="border border-border-strong px-8 py-4 font-sans text-[11px] tracking-[0.24em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              View the work
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-background px-6 py-10 md:px-10 md:py-14">
              <p className="font-display text-4xl font-light text-gold md:text-5xl">{s.value}</p>
              <p className="mt-3 font-sans text-[11px] tracking-[0.24em] uppercase text-ivory">
                {s.label}
              </p>
              <p className="mt-1.5 font-sans text-xs font-light text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 lg:py-36">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">The house</p>
          <div>
            <h2 className="font-display text-4xl leading-[1.08] font-light text-ivory md:text-[3.4rem]">
              We do not sell decor. We take responsibility for an evening.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <p className="font-sans text-[15px] leading-[1.9] font-light text-muted-foreground">
                Design, fabrication, florals, lighting and the kitchen all sit inside one house.
                Nothing is subcontracted to a stranger and then hoped for. The person who reads your
                first message stands at your gate on the night.
              </p>
              <p className="font-sans text-[15px] leading-[1.9] font-light text-muted-foreground">
                That is the whole difference. It is why a family of four hundred can sit down within
                minutes of each other, and why the marigold is still fresh at one in the morning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
                What we do
              </p>
              <h2 className="mt-6 font-display text-4xl font-light text-ivory md:text-5xl">
                Seventeen disciplines, one crew.
              </h2>
            </div>
            <Link
              to="/services"
              className="font-sans text-[11px] tracking-[0.24em] uppercase text-gold hover:text-gold-light"
            >
              All services →
            </Link>
          </div>

          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group bg-background p-8 transition-colors hover:bg-surface/40 md:p-10"
              >
                <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                  {s.family}
                </p>
                <h3 className="mt-5 font-display text-2xl font-light text-ivory transition-colors group-hover:text-gold md:text-3xl">
                  {s.name}
                </h3>
                <p className="mt-4 font-sans text-sm leading-[1.85] font-light text-muted-foreground">
                  {s.lede}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial gallery — a handful only; the rest lives in the Vault */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
                Selected work
              </p>
              <h2 className="mt-6 font-display text-4xl font-light text-ivory md:text-5xl">
                Six rooms from a longer archive.
              </h2>
            </div>
            <Link
              to="/vault"
              className="font-sans text-[11px] tracking-[0.24em] uppercase text-gold hover:text-gold-light"
            >
              Enter the Vault →
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((img) => (
              <figure key={img.id} className="group overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden border border-border">
                  <img
                    src={img.url}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>
                <figcaption className="mt-3 font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap gap-3">
            {portfolioCategories.map((c) => (
              <Link
                key={c.slug}
                to="/portfolio/$slug"
                params={{ slug: c.slug }}
                className="border border-border-strong px-6 py-3 font-sans text-[11px] tracking-[0.2em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">The process</p>
          <div className="mt-14 grid gap-12 md:grid-cols-3 lg:grid-cols-5">
            {consultationSteps.map((s) => (
              <div key={s.step}>
                <span className="font-display text-3xl font-light text-gold-deep">{s.step}</span>
                <h3 className="mt-4 font-display text-xl font-light text-ivory">{s.title}</h3>
                <p className="mt-3 font-sans text-[13px] leading-[1.85] font-light text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
            {site.rating.value} from {site.rating.count} Google reviews
          </p>
          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
            {testimonials.slice(0, 3).map((t) => (
              <figure key={t.id} className="bg-background p-8 md:p-10">
                <blockquote className="font-display text-xl leading-snug font-light italic text-ivory">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 font-sans text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  {t.name} · {t.event} · {t.area}
                </figcaption>
              </figure>
            ))}
          </div>
          <Link
            to="/reviews"
            className="mt-10 inline-block font-sans text-[11px] tracking-[0.24em] uppercase text-gold hover:text-gold-light"
          >
            Read all reviews →
          </Link>
        </div>
      </section>

      {/* Areas */}
      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-24">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
            Where we work
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-light text-ivory md:text-5xl">
            Every postcode in Lahore, produced by the same team.
          </h2>
          <ul className="mt-10 flex flex-wrap gap-3">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  to="/areas/$slug"
                  params={{ slug: l.slug }}
                  className="inline-flex border border-border-strong px-6 py-3 font-sans text-[11px] tracking-[0.2em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
                >
                  {l.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journal */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 lg:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
                The journal
              </p>
              <h2 className="mt-6 font-display text-4xl font-light text-ivory md:text-5xl">
                Written by the people who build it.
              </h2>
            </div>
            <Link
              to="/journal"
              className="font-sans text-[11px] tracking-[0.24em] uppercase text-gold hover:text-gold-light"
            >
              All writing →
            </Link>
          </div>
          <div className="mt-14 grid gap-px border border-border bg-border md:grid-cols-3">
            {journal.map((a) => (
              <Link
                key={a.slug}
                to="/journal/$slug"
                params={{ slug: a.slug }}
                className="group bg-background p-8 md:p-10"
              >
                <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                  {a.category} · {a.readingTime}
                </p>
                <h3 className="mt-5 font-display text-2xl leading-snug font-light text-ivory transition-colors group-hover:text-gold">
                  {a.title}
                </h3>
                <p className="mt-4 font-sans text-sm leading-[1.85] font-light text-muted-foreground">
                  {a.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

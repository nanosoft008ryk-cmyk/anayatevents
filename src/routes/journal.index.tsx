import { createFileRoute, Link } from "@tanstack/react-router";

import {
  articlesByDate,
  featuredSlugs,
  editorsPickSlugs,
  editorsNote,
  getArticle,
  articleExtras,
  journalCategories,
  type Article,
} from "@/content/journal";
import { photo, photosByIds } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { CategoryExplorer } from "@/components/journal/CategoryExplorer";
import { NewsletterInvite } from "@/components/journal/NewsletterInvite";
import { CtaBand } from "@/components/CtaBand";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, abs, type Crumb } from "@/lib/seo";

const PATH = "/journal";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Journal", path: PATH },
];

function pick(slug: string) {
  return getArticle(slug) as Article;
}

export const Route = createFileRoute("/journal/")({
  head: () => ({
    ...pageMeta({
      title: "The Anayat Journal — Luxury Weddings, Design & Hospitality in Lahore",
      description:
        "Celebration craft from Lahore: planning timelines, stage architecture, floral work, catering and venue guides, written by the team that builds them.",
      path: PATH,
      image: photo(pick(featuredSlugs[0]).hero).url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": abs(`${PATH}#blog`),
        name: "The Anayat Journal",
        url: abs(PATH),
        description:
          "Editorial writing on luxury celebrations, event design, catering and venues in Lahore.",
        inLanguage: "en",
        publisher: { "@id": abs("/#business") },
      }),
      jsonLd(
        itemListSchema({
          name: "Featured stories",
          path: PATH,
          items: featuredSlugs.map((s) => ({
            name: pick(s).title,
            path: `/journal/${s}`,
          })),
        }),
      ),
    ],
  }),
  component: JournalIndex,
});

function Meta({ a, className }: { a: Article; className?: string }) {
  return (
    <p
      className={`font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep ${className ?? ""}`}
    >
      {a.category} · {a.readingTime} ·{" "}
      <time dateTime={a.date}>
        {new Date(a.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
      </time>
    </p>
  );
}

function JournalIndex() {
  const [coverSlug, secondSlug, thirdSlug] = featuredSlugs;
  const cover = pick(coverSlug);
  const second = pick(secondSlug);
  const third = pick(thirdSlug);
  const picks = editorsPickSlugs.map(pick);
  const featured = new Set([...featuredSlugs, ...editorsPickSlugs]);
  const trending = articlesByDate.filter((a) => !featured.has(a.slug)).slice(0, 4);

  return (
    <main className="bg-background">
      {/* ── Masthead ─────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[92svh] flex-col justify-end overflow-hidden">
        <CinematicBackdrop frames={photosByIds(["ae-14", "ae-22", "ae-17", "ae-25"])} />
        <div className="mx-auto w-full max-w-[92rem] px-6 pt-40 pb-24 md:px-12 lg:pb-32">
          <Breadcrumbs trail={trail} className="mb-10" />
          <div className="flex items-start gap-6">
            <span aria-hidden className="mt-3 hidden h-24 w-px rule-foil md:block" />
            <div>
              <Reveal>
                <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
                  The Anayat Journal · Issue in progress
                </p>
              </Reveal>
              <h1 className="mt-8 max-w-[15ch] font-display text-[3.2rem] leading-[0.95] font-light text-ivory md:text-[6rem] lg:text-[7.4rem]">
                <RevealWords text="The art of" />
                <span className="block italic text-foil">
                  <RevealWords text="extraordinary celebrations." delay={220} />
                </span>
              </h1>
              <Reveal delay={520}>
                <p className="mt-5 max-w-xl font-sans text-[15px] leading-[2] font-light text-ivory/70">
                  Ideas, inspiration and craftsmanship — recorded from the production floor
                  in Lahore, where the ladders, the flowers and the kitchens actually are.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Editor's note ────────────────────────────────────────────────── */}
      <section className="chapter light-left">
        <div className="mx-auto grid max-w-[92rem] gap-14 px-6 py-28 md:px-12 lg:grid-cols-[0.9fr_1.4fr] lg:py-40">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              {editorsNote.eyebrow}
            </p>
            <span aria-hidden className="mt-8 block h-px w-24 rule-foil" />
          </Reveal>
          <div>
            {editorsNote.lines.map((line, i) => (
              <Reveal key={line.slice(0, 24)} delay={i * 110}>
                <p
                  className={
                    i === 0
                      ? "font-display text-[1.65rem] leading-[1.45] font-light text-ivory md:text-[2.4rem]"
                      : "mt-8 max-w-2xl font-sans text-[15px] leading-[2] font-light text-muted-foreground"
                  }
                >
                  {line}
                </p>
              </Reveal>
            ))}
            <Reveal delay={380}>
              <p className="mt-10 font-display text-lg font-light italic text-gold">
                {editorsNote.signature}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Cover story ──────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="mx-auto max-w-[92rem] px-6 pb-8 md:px-12">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              The cover story
            </p>
          </Reveal>
        </div>
        <Link
          to="/journal/$slug"
          params={{ slug: cover.slug }}
          className="group block"
          aria-label={cover.title}
        >
          <div className="relative isolate">
            <Plate
              image={photo(cover.hero)}
              ratio="21/10"
              speed={0.4}
              fade="both"
              sizes="100vw"
              className="min-h-[60svh]"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto max-w-[92rem] px-6 pb-14 md:px-12 md:pb-20">
              <Meta a={cover} />
              <h2 className="mt-6 max-w-[18ch] font-display text-[2.4rem] leading-[1.02] font-light text-ivory transition-colors duration-700 group-hover:text-gold md:text-[4.4rem]">
                {cover.title}
              </h2>
              <p className="mt-6 max-w-2xl font-sans text-[15px] leading-[1.95] font-light text-ivory/70">
                {articleExtras(cover.slug).deck}
              </p>
            </div>
          </div>
        </Link>
      </section>

      {/* ── Two supporting features, deliberately unequal ────────────────── */}
      <section className="chapter">
        <div className="mx-auto grid max-w-[92rem] gap-16 px-6 py-28 md:px-12 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-24 lg:py-36">
          <Link to="/journal/$slug" params={{ slug: second.slug }} className="group">
            <Plate image={photo(second.hero)} ratio="5/4" speed={0.16} />
            <Meta a={second} className="mt-8" />
            <h3 className="mt-5 max-w-[20ch] font-display text-3xl leading-[1.08] font-light text-ivory transition-colors duration-700 group-hover:text-gold md:text-[3rem]">
              {second.title}
            </h3>
            <p className="mt-5 max-w-xl font-sans text-sm leading-[1.95] font-light text-muted-foreground">
              {second.excerpt}
            </p>
          </Link>

          <Link to="/journal/$slug" params={{ slug: third.slug }} className="group lg:pb-10">
            <Meta a={third} />
            <h3 className="mt-5 font-display text-2xl leading-[1.12] font-light text-ivory transition-colors duration-700 group-hover:text-gold md:text-[2.3rem]">
              {third.title}
            </h3>
            <p className="mt-5 font-sans text-sm leading-[1.95] font-light text-muted-foreground">
              {third.excerpt}
            </p>
            <span aria-hidden className="mt-10 block h-px w-full bg-border" />
            <Plate image={photo(third.hero)} ratio="4/3" className="mt-10" />
          </Link>
        </div>
      </section>

      {/* ── Departments ──────────────────────────────────────────────────── */}
      <section className="chapter light-right">
        <div className="mx-auto max-w-[92rem] px-6 py-28 md:px-12 lg:py-40">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
            <div>
              <Reveal>
                <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                  Departments
                </p>
              </Reveal>
              <Reveal delay={110} variant="mask">
                <h2 className="mt-7 max-w-[16ch] font-display text-[2.4rem] leading-[1.02] font-light text-ivory md:text-[3.6rem]">
                  Read by the thing
                  <span className="block italic">you are deciding.</span>
                </h2>
              </Reveal>
            </div>
            <p className="max-w-sm font-sans text-sm leading-[1.95] font-light text-muted-foreground">
              Four departments, each edited as its own small publication.
            </p>
          </div>
          <CategoryExplorer />
        </div>
      </section>

      {/* ── Editor's picks ───────────────────────────────────────────────── */}
      <section className="chapter">
        <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Editor&rsquo;s picks
            </p>
          </Reveal>
          <div className="mt-16 grid gap-14 lg:grid-cols-3">
            {picks.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <Link
                  to="/journal/$slug"
                  params={{ slug: a.slug }}
                  className="group block"
                  style={{ marginTop: i === 1 ? "3.5rem" : undefined }}
                >
                  <Plate image={photo(a.hero)} ratio={i === 1 ? "3/4" : "4/5"} />
                  <p className="mt-7 font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                    {a.category}
                  </p>
                  <h3 className="mt-4 font-display text-2xl leading-[1.14] font-light text-ivory transition-colors duration-700 group-hover:text-gold">
                    {a.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending insights ────────────────────────────────────────────── */}
      <section className="chapter light-left">
        <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                Trending insights
              </p>
              <h2 className="mt-7 font-display text-[2rem] leading-[1.06] font-light text-ivory md:text-[3rem]">
                What people are reading
                <span className="block italic">this season.</span>
              </h2>
            </Reveal>
            <LuxTextLink to="/journal/category/planning">All departments</LuxTextLink>
          </div>

          <ol className="mt-14">
            {trending.map((a, i) => (
              <li key={a.slug} className="border-t border-border last:border-b">
                <Link
                  to="/journal/$slug"
                  params={{ slug: a.slug }}
                  className="group grid gap-4 py-8 md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-10"
                >
                  <span className="font-sans text-[10px] tracking-[0.34em] uppercase text-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-xl leading-[1.2] font-light text-ivory transition-colors duration-700 group-hover:text-gold md:text-[1.9rem]">
                      {a.title}
                    </span>
                    <span className="mt-3 block max-w-2xl font-sans text-sm leading-[1.9] font-light text-muted-foreground">
                      {a.excerpt}
                    </span>
                  </span>
                  <span className="font-sans text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                    {a.category} · {a.readingTime}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <section className="chapter">
        <div className="mx-auto grid max-w-[92rem] gap-14 px-6 py-24 md:px-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-32">
          <div>
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                The letter
              </p>
            </Reveal>
            <Reveal delay={110} variant="mask">
              <h2 className="mt-7 max-w-[15ch] font-display text-[2.3rem] leading-[1.02] font-light text-ivory md:text-[3.4rem]">
                A few letters a year,
                <span className="block italic">sent when there is something to say.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-lg font-sans text-[15px] leading-[2] font-light text-muted-foreground">
                Season notes from the studio: what is blooming, what is being built, and the
                dates that quietly disappear before most families start looking.
              </p>
            </Reveal>
          </div>
          <Reveal delay={160}>
            <NewsletterInvite />
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="From reading to building"
        title="Bring the inspiration to a table with us."
        body={`Every piece here began as a real commission. If something you have read belongs in your own evening, tell us the date — ${journalCategories.length} departments of thinking arrive with the planner.`}
      />
    </main>
  );
}

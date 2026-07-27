import { createFileRoute } from "@tanstack/react-router";

import { photo } from "@/content/images";
import { teamPage } from "@/content/about";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CtaBand } from "@/components/CtaBand";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink, LuxAnchor } from "@/components/ui/LuxButton";
import { pageMeta, jsonLd, breadcrumbSchema, type Crumb } from "@/lib/seo";

const PATH = "/about/team";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Meet The Team", path: PATH },
];

export const Route = createFileRoute("/about/team")({
  head: () => ({
    ...pageMeta({
      title: "Meet The Team — The Hands Behind Anayat Events, Lahore",
      description:
        "Founders Mian Saif and Mian Asif, the design studio, workshop, floral bench and kitchen. The people who stay awake so that your family does not have to.",
      path: PATH,
      image: photo("ae-19").url,
    }),
    scripts: [jsonLd(breadcrumbSchema(trail))],
  }),
  component: TeamPage,
});

function TeamPage() {
  return (
    <main className="bg-background">
      {/* ── Hero: floating composition — offset plates, type between them ─ */}
      <section className="relative isolate mx-auto max-w-[92rem] px-6 pt-36 pb-20 md:px-12 md:pt-44 overflow-hidden">
        <HeroBackdrop id="ae-11" priority />
        <Breadcrumbs trail={trail} className="mb-12" />
        <div className="grid items-end gap-10 lg:grid-cols-[0.55fr_1fr_0.4fr] lg:gap-14">
          <Reveal variant="mask" className="hidden lg:block">
            <Plate image={photo("ae-19")} ratio="3/4" speed={12} sizes="25vw" />
          </Reveal>

          <div className="lg:pb-10">
            <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
              {teamPage.hero.eyebrow}
            </p>
            <h1 className="mt-8 font-display text-[2.7rem] leading-[0.98] font-light text-ivory sm:text-5xl lg:text-[5rem]">
              <RevealWords text={teamPage.hero.title} />
            </h1>
            <Reveal delay={520}>
              <p className="mt-5 max-w-xl font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
                {teamPage.hero.lede}
              </p>
            </Reveal>
          </div>

          <Reveal variant="mask" delay={200} className="hidden lg:mt-24 lg:block">
            <Plate image={photo("ae-06")} ratio="4/5" speed={-10} sizes="20vw" />
          </Reveal>
        </div>
      </section>

      {/* ── Profiles: editorial rows, monogram as portrait ──────────────── */}
      <section aria-label="The people">
        {teamPage.members.map((m, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={m.name} className="border-t border-border">
              <div
                className={`mx-auto grid max-w-[92rem] gap-12 px-6 py-20 md:px-12 lg:gap-20 lg:py-28 ${
                  flip ? "lg:grid-cols-[1fr_0.8fr]" : "lg:grid-cols-[0.8fr_1fr]"
                }`}
              >
                {/* Monogram plate */}
                <div className={flip ? "lg:order-2" : ""}>
                  <Reveal variant="mask">
                    <div className="relative">
                      <Plate
                        image={photo(m.photo)}
                        ratio="4/5"
                        speed={flip ? -8 : 8}
                        imgClassName="brightness-[0.62] saturate-[0.7]"
                        sizes="(min-width: 1024px) 38vw, 100vw"
                      />
                      <span className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[6rem] leading-none font-light text-foil lg:text-[9rem]">
                        {m.monogram}
                      </span>
                      <span className="pointer-events-none absolute inset-x-8 bottom-8 h-px bg-gold/50" />
                    </div>
                  </Reveal>
                </div>

                <div className={flip ? "lg:order-1" : ""}>
                  <Reveal>
                    <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
                      {m.role} · {m.since}
                    </p>
                  </Reveal>
                  <Reveal delay={80} variant="mask">
                    <h2 className="mt-6 font-display text-[2.3rem] leading-[1.05] font-light text-ivory lg:text-[3.4rem]">
                      {m.name}
                    </h2>
                  </Reveal>
                  <Reveal delay={150}>
                    <p className="mt-8 max-w-xl font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
                      {m.intro}
                    </p>
                  </Reveal>

                  <dl className="mt-10 max-w-xl divide-y divide-border border-y border-border">
                    <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                      <dt className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                        Believes
                      </dt>
                      <dd className="font-sans text-[14px] leading-[1.95] font-light text-muted-foreground">
                        {m.philosophy}
                      </dd>
                    </div>
                    <div className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                      <dt className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                        Favourite hour
                      </dt>
                      <dd className="font-sans text-[14px] leading-[1.95] font-light text-muted-foreground">
                        {m.favourite}
                      </dd>
                    </div>
                  </dl>

                  <Reveal delay={220}>
                    <blockquote className="mt-10 max-w-[24ch] font-display text-2xl leading-[1.45] font-light italic text-gold lg:text-[2rem]">
                      “{m.quote}”
                    </blockquote>
                  </Reveal>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* ── Speak to a founder ──────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[92rem] gap-12 px-6 py-24 md:px-12 lg:grid-cols-[1fr_1fr] lg:items-end lg:py-32">
          <div>
            <Reveal variant="mask">
              <h2 className="max-w-[16ch] font-display text-[2.2rem] leading-[1.06] font-light text-ivory lg:text-[3.4rem]">
                Speak to a founder, not a switchboard.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-lg font-sans text-[15px] leading-[2.1] font-light text-muted-foreground">
                Both numbers below reach one of the two people who will actually stand on your lawn.
                {" "}
                {site.responseTime.toLowerCase()} is our usual reply, most often sooner.
              </p>
            </Reveal>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {site.contacts.map((c) => (
              <li key={c.name} className="flex flex-wrap items-center justify-between gap-4 py-6">
                <div>
                  <p className="font-display text-xl font-light text-ivory">{c.name}</p>
                  <p className="mt-1 font-sans text-[13px] font-light text-muted-foreground">
                    {c.display}
                  </p>
                </div>
                <div className="flex gap-4">
                  <LuxAnchor href={c.tel} external={false} tone="quiet" arrow={false}>
                    Call
                  </LuxAnchor>
                  <LuxAnchor href={c.whatsapp} tone="ghost" arrow={false}>
                    WhatsApp
                  </LuxAnchor>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-[92rem] px-6 pb-24 md:px-12">
        <div className="flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-10">
          <LuxTextLink to="/contact">Begin a conversation</LuxTextLink>
          <LuxTextLink to="/about/behind-the-scenes">Watch them work</LuxTextLink>
          <LuxTextLink to="/about/careers">Join the house</LuxTextLink>
        </div>
      </section>

      <CtaBand
        eyebrow="Meet us properly"
        title="Tea at the studio, whenever you're ready."
        body="Come and see the workshop, the bench and the kitchen. Bring your date; bring your doubts."
      />
      <RelatedConstellation path="/about/team" heading="Continue" />
    </main>
  );
}

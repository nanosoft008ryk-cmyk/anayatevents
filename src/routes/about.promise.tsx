import { createFileRoute } from "@tanstack/react-router";

import { photo } from "@/content/images";
import { promisePage } from "@/content/about";
import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { CtaBand } from "@/components/CtaBand";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

const PATH = "/about/promise";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Our Promise", path: PATH },
];

export const Route = createFileRoute("/about/promise")({
  head: () => ({
    ...pageMeta({
      title: "Our Promise — Seven Human Promises, Written Plainly",
      description:
        "Truth early, one planner throughout, the number in the proposal is the number, weekly notes, fresh and hot on time, and we stay until the last car leaves.",
      path: PATH,
      image: photo("ae-12").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "Our promise",
          path: PATH,
          items: promisePage.promises.map((p) => ({ name: p.title, path: PATH })),
        }),
      ),
    ],
  }),
  component: PromisePage,
});

function PromisePage() {
  return (
    <main className="bg-background">
      {/* ── Hero: the quietest page on the site. Type on air. ───────────── */}
      <section className="mx-auto max-w-3xl px-6 pt-40 pb-16 text-center md:pt-52">
        <Breadcrumbs trail={trail} className="mb-14 justify-center [&_ol]:justify-center" />
        <p className="font-sans text-[10px] tracking-[0.48em] uppercase text-gold">
          {promisePage.hero.eyebrow}
        </p>
        <h1 className="mt-10 font-display text-[2.6rem] leading-[1.02] font-light text-ivory sm:text-5xl lg:text-[4.4rem]">
          <RevealWords text={promisePage.hero.title} />
        </h1>
        <Reveal delay={520}>
          <span aria-hidden className="mx-auto mt-5 block h-px w-16 bg-gold" />
        </Reveal>
        <Reveal delay={620}>
          <p className="mx-auto mt-12 max-w-xl font-display text-xl leading-[1.7] font-light italic text-muted-foreground">
            {promisePage.preamble}
          </p>
        </Reveal>
      </section>

      {/* ── A single plate, dissolving, as a breath ─────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-8">
        <Reveal variant="mask">
          <Plate
            image={photo("ae-12")}
            ratio="21/9"
            speed={6}
            fade="both"
            sizes="(min-width: 1024px) 70vw, 100vw"
          />
        </Reveal>
      </section>

      {/* ── The promises: a hand-numbered letter, centred column ────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
        <ol>
          {promisePage.promises.map((p, i) => (
            <li key={p.index} className="border-b border-border py-12 first:border-t">
              <Reveal delay={i * 40}>
                <p className="font-display text-sm font-light tracking-[0.3em] text-gold-deep">
                  {p.index}
                </p>
                <h2 className="mt-5 font-display text-[1.8rem] leading-[1.2] font-light text-ivory lg:text-[2.4rem]">
                  {p.title}
                </h2>
                <p className="mt-6 font-sans text-[15px] leading-[2.15] font-light text-muted-foreground">
                  {p.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={120}>
          <div className="mt-16">
            <p className="font-display text-3xl font-light italic text-gold">
              {promisePage.signoff}
            </p>
            <p className="mt-4 font-sans text-[10px] tracking-[0.32em] uppercase text-muted-foreground">
              {site.name} · {site.address.locality}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-wrap gap-x-12 gap-y-5 border-t border-border pt-10">
          <LuxTextLink to="/about/why-us">How this feels in practice</LuxTextLink>
          <LuxTextLink to="/contact">Hold us to it</LuxTextLink>
        </div>
      </section>

      <CtaBand
        eyebrow="Take us at our word"
        title="Then ask us to prove it on your date."
        body="One message is enough to start. We will reply personally, and honestly, about what your evening needs."
      />
      <RelatedConstellation path="/about/promise" heading="Continue" />
    </main>
  );
}

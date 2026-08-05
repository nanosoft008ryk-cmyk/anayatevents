import { createFileRoute } from "@tanstack/react-router";

import { site } from "@/content/site";
import { photo, photosByIds } from "@/content/images";
import { menuTiers, setupIncludes, menuPdf, menuPdfFilename } from "@/content/menu";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxAnchor } from "@/components/ui/LuxButton";
import { ProposalDialog } from "@/components/ProposalDialog";
import { pageMeta, jsonLd, breadcrumbSchema, abs, type Crumb } from "@/lib/seo";

const PATH = "/menu";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Menu", path: PATH },
];

export const Route = createFileRoute("/menu")({
  head: () => ({
    ...pageMeta({
      title: "Catering Menu & Per-Guest Packages — Anayat Events, Lahore",
      description:
        "Anayat Events catering menus in Lahore: economy Rs 2,600, standard Rs 4,200 and executive Rs 6,000 per guest, minimum 250 guests — buffet, bar-bq, tandoor and full farmhouse setup included. Download the menu card.",
      path: PATH,
      image: photo("ae-13").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "Menu",
        "@id": abs(`${PATH}#menu`),
        name: "Anayat Events & Catering — wedding and event menus",
        url: abs(PATH),
        inLanguage: "en",
        provider: { "@id": abs("/#business") },
        hasMenuSection: menuTiers.map((tier) => ({
          "@type": "MenuSection",
          name: `${tier.name} menu`,
          description: tier.note,
          offers: {
            "@type": "Offer",
            price: tier.price,
            priceCurrency: "PKR",
            eligibleQuantity: {
              "@type": "QuantitativeValue",
              minValue: tier.minimumGuests,
              unitText: "guests",
            },
          },
          hasMenuItem: tier.courses.flatMap((course) =>
            course.items.map((item) => ({
              "@type": "MenuItem",
              name: item,
              menuAddOn: undefined,
              suitableForDiet: undefined,
              description: course.heading,
            })),
          ),
        })),
      }),
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <main className="bg-background">
      {/* ── Opening ──────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[86svh] flex-col justify-end overflow-hidden">
        <CinematicBackdrop frames={photosByIds(["ae-13", "ae-21", "ae-06"])} interval={8000} />
        <div className="mx-auto w-full max-w-[92rem] px-6 pt-40 pb-20 md:px-12 lg:pb-28">
          <Breadcrumbs trail={trail} className="mb-10" />
          <div className="flex items-start gap-6">
            <span aria-hidden className="mt-3 hidden h-20 w-px rule-foil md:block" />
            <div>
              <Reveal>
                <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
                  The kitchen
                </p>
              </Reveal>
              <h1 className="mt-8 max-w-[16ch] font-display text-[3rem] leading-[0.96] font-light text-ivory md:text-[5.6rem]">
                <RevealWords text="The house" />
                <span className="block italic text-foil">
                  <RevealWords text="menu." delay={180} />
                </span>
              </h1>
              <Reveal delay={440}>
                <p className="mt-5 max-w-xl font-sans text-[15px] leading-[2] font-light text-ivory/70">
                  Five tables, cooked by our own kitchen and served by our own crew. Every price
                  below is per guest, for a minimum of 250, and already carries the farmhouse
                  setup — crockery, seating, lighting, generator and valet.
                </p>
              </Reveal>
              <Reveal delay={620}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <LuxAnchor href={menuPdf} tone="foil" external download={menuPdfFilename}>
                    Download the menu card
                  </LuxAnchor>
                  <LuxAnchor href={site.whatsappHref} tone="ghost" external>
                    Ask about a custom menu
                  </LuxAnchor>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── The tables ───────────────────────────────────────────────────── */}
      <section className="chapter light-left">
        <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Per guest · minimum 250 guests
            </p>
          </Reveal>

          <div className="mt-16 space-y-24 lg:space-y-32">
            {menuTiers.map((tier, index) => {
              const mirrored = index % 2 === 1;
              return (
                <article
                  key={tier.slug}
                  id={tier.slug}
                  className="grid scroll-mt-32 gap-12 border-t border-border pt-12 lg:grid-cols-12 lg:gap-16"
                >
                  {/* Card scan */}
                  <Reveal
                    className={`lg:col-span-5 ${mirrored ? "lg:order-2" : ""}`}
                    delay={80}
                  >
                    <figure className="relative overflow-hidden bg-[color-mix(in_oklab,var(--background)_60%,black)]">
                      <img
                        src={tier.card}
                        alt={tier.cardAlt}
                        width={1240}
                        height={1754}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full"
                      />
                      <figcaption className="sr-only">{tier.cardAlt}</figcaption>
                    </figure>
                  </Reveal>

                  {/* Written menu */}
                  <div className={`lg:col-span-7 ${mirrored ? "lg:order-1" : ""}`}>
                    <Reveal>
                      <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                        {tier.family}
                      </p>
                      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
                        <h2 className="font-display text-[2.4rem] leading-[0.95] font-light text-ivory md:text-[3.4rem]">
                          {tier.name}
                        </h2>
                        <p className="font-display text-[2rem] leading-none font-light text-gold md:text-[2.6rem]">
                          {tier.priceLabel}
                          <span className="ml-3 font-sans text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                            per guest
                          </span>
                        </p>
                      </div>
                      <p className="mt-6 max-w-2xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
                        {tier.note}
                      </p>
                    </Reveal>

                    <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
                      {tier.courses.map((course, i) => (
                        <Reveal key={course.heading} delay={i * 70}>
                          <dt className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold">
                            {course.heading}
                          </dt>
                          <dd className="mt-4 space-y-2">
                            {course.items.map((item) => (
                              <p
                                key={item}
                                className="font-display text-lg leading-snug font-light text-ivory/85 md:text-xl"
                              >
                                {item}
                              </p>
                            ))}
                          </dd>
                        </Reveal>
                      ))}
                    </dl>

                    <Reveal delay={160}>
                      <div className="mt-12 flex flex-wrap gap-4">
                        <ProposalDialog>
                          <button
                            type="button"
                            className="btn-shape border border-gold bg-gold px-7 py-3.5 font-sans text-[10px] tracking-[0.26em] uppercase text-primary-foreground transition-opacity hover:opacity-90"
                          >
                            Request this menu
                          </button>
                        </ProposalDialog>
                        <LuxAnchor href={site.whatsappHref} tone="ghost" external>
                          WhatsApp {site.whatsappDisplay}
                        </LuxAnchor>
                      </div>
                    </Reveal>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Setup included ───────────────────────────────────────────────── */}
      <section className="chapter">
        <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Included with every table
            </p>
            <h2 className="mt-8 max-w-[18ch] font-display text-[2.4rem] leading-[0.98] font-light text-ivory md:text-[3.6rem]">
              The setup arrives with the food.
            </h2>
          </Reveal>
          <ul className="mt-14 grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {setupIncludes.map((item, i) => (
              <Reveal key={item} delay={i * 50}>
                <li className="flex items-baseline gap-4 border-b border-border pb-5">
                  <span
                    aria-hidden
                    className="font-sans text-[10px] tracking-[0.28em] text-gold-deep"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-light text-ivory/85 md:text-xl">
                    {item}
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={200}>
            <p className="mt-12 max-w-2xl font-sans text-[14px] leading-[2] font-light text-muted-foreground">
              Menus are a starting point, never a ceiling. Dietary requirements, regional dishes,
              live counters and a bespoke tasting are arranged on request — speak to a planner and
              we will write a table around your evening.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <LuxAnchor href={menuPdf} tone="foil" external download={menuPdfFilename}>
                Download the full menu (PDF)
              </LuxAnchor>
              <LuxAnchor href={site.phoneHref} tone="ghost">
                Call {site.phoneDisplay}
              </LuxAnchor>
            </div>
          </Reveal>
        </div>
      </section>

      <RelatedConstellation path={PATH} />
    </main>
  );
}

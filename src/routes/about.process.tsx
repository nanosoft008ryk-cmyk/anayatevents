import { createFileRoute } from "@tanstack/react-router";

import { consultationSteps, site } from "@/content/site";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

const PATH = "/about/process";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Our Process", path: PATH },
];

export const Route = createFileRoute("/about/process")({
  head: () => ({
    ...pageMeta({
      title: "Our Process — From Enquiry to Evening | Anayat Events Lahore",
      description:
        "The five stages of an Anayat Events commission: enquiry, conversation, designed proposal, production build and the evening itself — with timelines and what you receive.",
      path: PATH,
      image: photo("ae-06").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "Our planning process",
          path: PATH,
          items: consultationSteps.map((s) => ({ name: s.title, path: PATH })),
        }),
      ),
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  const hero = photo("ae-06");

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">The method</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          Five stages,
          <span className="block italic">no surprises on the day.</span>
        </h1>
        <p className="mt-7 max-w-2xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
          Every commission runs the same way, whether it is a nikah for forty at home or a full
          wedding week for eight hundred. Replies within {site.responseTime.toLowerCase()}.
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
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <ol className="divide-y divide-border border-y border-border">
            {consultationSteps.map((step) => (
              <li key={step.step} className="grid gap-6 py-12 md:grid-cols-[140px_1fr] md:gap-14">
                <p className="font-display text-5xl font-light text-gold-deep">{step.step}</p>
                <div className="max-w-2xl">
                  <h2 className="font-display text-3xl font-light text-ivory md:text-4xl">
                    {step.title}
                  </h2>
                  <p className="mt-4 font-sans text-base leading-[1.9] font-light text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand
        eyebrow="Stage one"
        title="Send the date. We will take it from there."
        body="Tell us the date, the guest count and the feeling you want left behind. One planner replies personally."
      />
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";

import { site, consultationSteps } from "@/content/site";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AreaMap } from "@/components/AreaMap";
import { pageMeta, jsonLd, breadcrumbSchema, abs, type Crumb } from "@/lib/seo";

const PATH = "/contact";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: PATH },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...pageMeta({
      title: "Contact Anayat Events & Catering — Lahore Event Planners",
      description:
        "Speak to a planner directly. Call or WhatsApp 0321 416 9707, or visit the studio at Green Acres Housing Society, Lahore. Open daily 2–10 PM.",
      path: PATH,
      image: photo("ae-24").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "@id": abs(`${PATH}#contactpage`),
        name: "Contact Anayat Events & Catering",
        url: abs(PATH),
        about: { "@id": abs("/#business") },
      }),

    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const hero = photo("ae-24");

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">Enquiries</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          Tell us the date.
          <span className="block italic">We will hold the rest.</span>
        </h1>
        <p className="mt-7 max-w-2xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
          No forms that vanish into an inbox. Call or message a planner directly —{" "}
          {site.responseTime.toLowerCase()} on written enquiries, immediately by phone during
          studio hours.
        </p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {site.contacts.map((c, i) => (
              <div key={c.display} className="bg-background p-8 md:p-12">
                <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                  {i === 0 ? "Primary planner" : "Second line"}
                </p>
                <p className="mt-5 font-display text-3xl font-light text-ivory">{c.name}</p>
                <p className="mt-2 font-display text-2xl font-light text-gold">{c.display}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href={c.tel}
                    className="btn-shape inline-flex items-center border border-gold bg-gold px-7 py-3.5 font-sans text-[11px] tracking-[0.24em] uppercase text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    Call
                  </a>
                  <a
                    href={c.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-shape inline-flex items-center border border-border-strong px-7 py-3.5 font-sans text-[11px] tracking-[0.24em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-10 border border-border p-8 md:grid-cols-3 md:p-12">
            <div>
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                Studio
              </p>
              <p className="mt-4 font-sans text-sm leading-[1.85] font-light text-muted-foreground">
                {site.address.street}
                <br />
                {site.address.locality} {site.address.postalCode}, Pakistan
              </p>
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                Hours
              </p>
              <p className="mt-4 font-sans text-sm leading-[1.85] font-light text-muted-foreground">
                {site.hours}
                <br />
                Consultations by appointment
              </p>
            </div>
            <div>
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold-deep">
                Elsewhere
              </p>
              <p className="mt-4 font-sans text-sm leading-[1.85] font-light text-muted-foreground">
                <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">
                  Instagram
                </a>
                <br />
                <a href={site.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-gold">
                  Google Business Profile
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <img
              src={hero.url}
              alt={hero.alt}
              loading="lazy"
              className="aspect-[4/3] w-full border border-border object-cover"
            />
            <div>
              <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
                What happens next
              </p>
              <ol className="mt-8 divide-y divide-border border-y border-border">
                {consultationSteps.slice(0, 3).map((s) => (
                  <li key={s.step} className="flex gap-6 py-6">
                    <span className="font-display text-2xl font-light text-gold-deep">
                      {s.step}
                    </span>
                    <div>
                      <p className="font-display text-xl font-light text-ivory">{s.title}</p>
                      <p className="mt-2 font-sans text-sm leading-[1.85] font-light text-muted-foreground">
                        {s.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <AreaMap
        areaName="Lahore"
        travelNote="The studio sits in Green Acres Housing Society, minutes from Bedian Road and within easy reach of DHA, Bahria Town and the Ring Road."
      />

    </main>
  );
}

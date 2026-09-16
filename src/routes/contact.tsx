import { createFileRoute } from "@tanstack/react-router";

import { site, consultationSteps } from "@/content/site";
import { photo, photosByIds } from "@/content/images";
import { testimonials } from "@/content/testimonials";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedConstellation } from "@/components/RelatedConstellation";
import { AreaMap } from "@/components/AreaMap";
import { CinematicBackdrop } from "@/components/CinematicBackdrop";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { JourneyRail } from "@/components/services/JourneyRail";
import { LuxAnchor } from "@/components/ui/LuxButton";
import { EnquiryLetter } from "@/components/contact/EnquiryLetter";
import { pageMeta, jsonLd, breadcrumbSchema, abs, type Crumb } from "@/lib/seo";

const PATH = "/contact";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Contact", path: PATH },
];

export const Route = createFileRoute("/contact")({
  head: () => ({
    ...pageMeta({
      title: "Contact Anayat Events & Catering — Speak to a Planner in Lahore",
      description:
        "Begin a conversation, not a form. Call 0321 416 9707 or WhatsApp 0321 033 3224 — a planner replies personally within 12 working hours. Lahore, open daily 2–10 PM.",
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
  const quote = testimonials[0];

  return (
    <main className="bg-background">
      {/* ── Invitation ───────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden">
        <CinematicBackdrop frames={photosByIds(["ae-24", "ae-03", "ae-16"])} interval={8000} />
        <div className="mx-auto w-full max-w-[92rem] px-6 pt-40 pb-20 md:px-12 lg:pb-28">
          <Breadcrumbs trail={trail} className="mb-10" />
          <div className="flex items-start gap-6">
            <span aria-hidden className="mt-3 hidden h-20 w-px rule-foil md:block" />
            <div>
              <Reveal>
                <p className="font-sans text-[10px] tracking-[0.46em] uppercase text-gold">
                  An invitation
                </p>
              </Reveal>
              <h1 className="mt-8 max-w-[16ch] font-display text-[3rem] leading-[0.96] font-light text-ivory md:text-[5.6rem]">
                <RevealWords text="Let&rsquo;s create" />
                <span className="block italic text-foil">
                  <RevealWords text="something unforgettable." delay={200} />
                </span>
              </h1>
              <Reveal delay={480}>
                <p className="mt-5 max-w-xl font-sans text-[15px] leading-[2] font-light text-ivory/70">
                  There is no queue and no ticket number. One planner reads every enquiry and
                  answers it themselves — {site.responseTime.toLowerCase()} in writing, and
                  immediately by phone during studio hours.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Speak to a person ────────────────────────────────────────────── */}
      <section className="chapter light-left">
        <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
          <Reveal>
            <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
              Speak to a planner
            </p>
          </Reveal>
          <div className="mt-14 grid gap-16 lg:grid-cols-2">
            {site.contacts.map((c, i) => (
              <Reveal key={c.display} delay={i * 110}>
                <div className="border-t border-border pt-8">
                  <p className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                    {i === 0 ? "Founding planner" : "Second line"}
                  </p>
                  <p className="mt-6 font-display text-[2.2rem] leading-none font-light text-ivory md:text-[3rem]">
                    {c.name}
                  </p>
                  <a
                    href={c.tel}
                    className="mt-4 block font-display text-2xl font-light text-gold transition-colors hover:text-gold-light md:text-[2rem]"
                  >
                    {c.display}
                  </a>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <LuxAnchor href={c.tel} tone="foil">
                      Call {c.name.split(" ")[1] ?? c.name}
                    </LuxAnchor>
                    <LuxAnchor href={c.whatsapp} tone="ghost" external>
                      WhatsApp
                    </LuxAnchor>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Write to us ──────────────────────────────────────────────────── */}
      <section className="chapter">
        <div className="mx-auto grid max-w-[92rem] gap-16 px-6 py-24 md:px-12 lg:grid-cols-[1fr_1.15fr] lg:gap-24 lg:py-32">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                Or write to us
              </p>
            </Reveal>
            <Reveal delay={110} variant="mask">
              <h2 className="mt-7 max-w-[14ch] font-display text-[2.3rem] leading-[1.02] font-light text-ivory md:text-[3.4rem]">
                Tell us the date.
                <span className="block italic">We will hold the rest.</span>
              </h2>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-8 max-w-md font-sans text-[15px] leading-[2] font-light text-muted-foreground">
                A few lines are enough — the date, the occasion, roughly how many people you
                expect. Everything else we will discover together.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <Plate image={photo("ae-06")} ratio="4/5" className="mt-14 hidden lg:block" />
            </Reveal>
          </div>

          <Reveal delay={160}>
            <EnquiryLetter />
          </Reveal>
        </div>
      </section>

      {/* ── What happens next ────────────────────────────────────────────── */}
      <section className="chapter light-right">
        <div className="mx-auto max-w-[92rem] px-6 py-24 md:px-12 lg:py-32">
          <div className="mb-16 max-w-2xl">
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                What happens next
              </p>
            </Reveal>
            <Reveal delay={110} variant="mask">
              <h2 className="mt-7 font-display text-[2.2rem] leading-[1.04] font-light text-ivory md:text-[3.2rem]">
                Five moments between
                <span className="block italic">the message and the evening.</span>
              </h2>
            </Reveal>
          </div>
          <JourneyRail
            stages={consultationSteps.map((s) => ({ label: s.title, body: s.body }))}
          />
        </div>
      </section>

      {/* ── A word from a family ─────────────────────────────────────────── */}
      {quote && (
        <section className="chapter">
          <div className="mx-auto max-w-[92rem] px-6 py-20 md:px-12 lg:py-28">
            <Reveal variant="mask">
              <blockquote className="mx-auto max-w-4xl text-center">
                <p className="font-display text-[1.8rem] leading-[1.35] font-light italic text-ivory md:text-[2.8rem]">
                  &ldquo;{quote.quote}&rdquo;
                </p>
                <footer className="mt-8 font-sans text-[10px] tracking-[0.34em] uppercase text-gold-deep">
                  {quote.name} · {quote.event}
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── The studio ───────────────────────────────────────────────────── */}
      <section className="chapter light-left">
        <div className="mx-auto grid max-w-[92rem] gap-16 px-6 py-24 md:px-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-32">
          <Plate image={photo("ae-24")} ratio="5/4" speed={0.18} />
          <div>
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                The studio
              </p>
            </Reveal>
            <Reveal delay={110} variant="mask">
              <h2 className="mt-7 max-w-[15ch] font-display text-[2.1rem] leading-[1.04] font-light text-ivory md:text-[3rem]">
                Come and sit with us
                <span className="block italic">under the palms.</span>
              </h2>
            </Reveal>
            <dl className="mt-12 grid gap-10 sm:grid-cols-2">
              <div>
                <dt className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                  Address
                </dt>
                <dd className="mt-4 font-sans text-sm leading-[1.95] font-light text-muted-foreground">
                  {site.address.street}
                  <br />
                  {site.address.locality} {site.address.postalCode}, Pakistan
                </dd>
              </div>
              {site.email && (
                <div>
                  <dt className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                    Email
                  </dt>
                  <dd className="mt-4 font-sans text-sm leading-[1.95] font-light text-muted-foreground">
                    <a href={site.emailHref} className="transition-colors hover:text-gold">
                      {site.email}
                    </a>
                    <br />
                    Replies {site.responseTime.toLowerCase()}
                  </dd>
                </div>
              )}
              <div>
                <dt className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                  Hours
                </dt>
                <dd className="mt-4 font-sans text-sm leading-[1.95] font-light text-muted-foreground">
                  {site.hours}
                  <br />
                  Consultations by appointment
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                  Elsewhere
                </dt>
                <dd className="mt-4 font-sans text-sm leading-[1.95] font-light text-muted-foreground">
                  <a
                    href={site.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    Instagram
                  </a>
                  <br />
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    Google Business Profile
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-sans text-[10px] tracking-[0.32em] uppercase text-gold-deep">
                  Reply time
                </dt>
                <dd className="mt-4 font-sans text-sm leading-[1.95] font-light text-muted-foreground">
                  {site.responseTime}
                  <br />
                  Personally, by a planner
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <AreaMap
        areaName="Lahore"
        travelNote="The studio sits in Green Acres Extension, minutes from Bedian Road and within easy reach of DHA, Bahria Town and the Ring Road."
      />
      <RelatedConstellation path="/contact" heading="Continue" />
    </main>
  );
}

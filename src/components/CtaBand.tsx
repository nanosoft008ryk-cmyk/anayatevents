import { site } from "@/content/site";
import { photo } from "@/content/images";
import { Reveal } from "@/components/motion/Reveal";
import { LuxLink, LuxAnchor } from "@/components/ui/LuxButton";

export function CtaBand({
  eyebrow = "Begin",
  title = "Tell us the date. We will hold the rest.",
  body = "One planner reads every enquiry. Expect a considered reply within 12 working hours — never a template.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Plate dissolves into the page above and the footer below — no band edges. */}
      <div className="absolute inset-0 -z-10">
        <img
          src={photo("ae-16").url}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-30 drift-slow"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, color-mix(in oklab, var(--background) 58%, transparent) 45%, var(--background) 100%)",
          }}
        />
        <div className="absolute inset-0 vignette" />
        <div className="absolute inset-0 grain" />
      </div>

      <div className="mx-auto max-w-[92rem] px-6 py-32 md:px-12 lg:py-44">
        <div className="grid gap-14 lg:grid-cols-[1.45fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                {eyebrow}
              </p>
            </Reveal>
            <Reveal delay={120} variant="mask">
              <h2 className="mt-8 max-w-[16ch] font-display text-[2.6rem] leading-[1.02] font-light text-ivory lg:text-[4.2rem]">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-8 max-w-xl font-sans text-[15px] leading-[2] font-light text-muted-foreground">
                {body}
              </p>
            </Reveal>
          </div>

          <Reveal delay={300} className="flex flex-wrap gap-4 lg:justify-end">
            <LuxLink to="/contact" tone="foil">
              Start an enquiry
            </LuxLink>
            <LuxAnchor href={site.whatsappHref} tone="ghost">
              WhatsApp
            </LuxAnchor>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

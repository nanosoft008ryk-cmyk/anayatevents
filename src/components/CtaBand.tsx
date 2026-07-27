import { site } from "@/content/site";
import { photo } from "@/content/images";
import { Reveal } from "@/components/motion/Reveal";
import { LuxLink, LuxAnchor } from "@/components/ui/LuxButton";
import { imgAttrs } from "@/lib/img";

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
          {...imgAttrs("ae-16", photo("ae-16").url, "100vw")}
          alt=""
          loading="lazy"
          decoding="async"
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

      <div className="mx-auto max-w-[92rem] px-5 py-24 sm:px-6 md:px-12 md:py-32 lg:py-44">
        <div className="grid gap-10 md:gap-14 lg:grid-cols-[1.45fr_1fr] lg:items-end">
          <div>
            <Reveal>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
                {eyebrow}
              </p>
            </Reveal>
            <Reveal delay={120} variant="mask">
              <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(2.1rem,8.5vw,4.2rem)] leading-[1.04] font-light text-ivory md:mt-8">
                {title}
              </h2>
            </Reveal>
            <Reveal delay={220}>
              <p className="mt-6 max-w-xl font-sans text-[14px] leading-[1.9] font-light text-muted-foreground md:mt-8 md:text-[15px] md:leading-[2]">
                {body}
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={300}
            innerClassName="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:justify-end"
          >
            <LuxLink to="/contact" tone="foil" className="justify-center">
              Start an enquiry
            </LuxLink>
            <LuxAnchor href={site.whatsappHref} tone="ghost" className="justify-center">
              WhatsApp
            </LuxAnchor>
          </Reveal>
        </div>
      </div>

    </section>
  );
}

import type { ReactNode } from "react";

/**
 * Shared editorial shell for legal pages. Quiet typography, generous measure,
 * same house voice as the rest of the site.
 */
export function PolicyPage({
  eyebrow,
  title,
  lede,
  trailNode,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  trailNode?: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="bg-background">
      <section className="mx-auto max-w-[92rem] px-6 pt-40 pb-16 md:px-12">
        {trailNode}
        <p className="mt-10 font-sans text-[10px] tracking-[0.42em] uppercase text-gold">
          {eyebrow}
        </p>
        <h1 className="mt-6 max-w-[16ch] font-display text-[2.8rem] leading-[0.95] font-light text-ivory lg:text-[4.6rem]">
          {title}
        </h1>
        <p className="mt-5 max-w-xl font-sans text-[14px] leading-[2] font-light text-foreground/70">
          {lede}
        </p>
      </section>

      <section className="mx-auto max-w-[92rem] px-6 pb-32 md:px-12">
        <div className="hairline mb-16 opacity-60" />
        <div className="max-w-2xl space-y-8 font-sans text-[13.5px] leading-[2] font-light text-muted-foreground [&_h2]:mt-14 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-light [&_h2]:text-ivory [&_p]:mt-4">
          {children}
        </div>
      </section>
    </main>
  );
}

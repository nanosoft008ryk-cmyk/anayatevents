import { Reveal } from "@/components/motion/Reveal";
import type { AnswerItem } from "@/content/answers";

/**
 * Answer-first content block.
 *
 * Each entry is a real question rendered as an H3 with a direct answer in the
 * first sentence, so both readers and answer engines can lift the pairing
 * without interpretation. Purely semantic markup — no client JavaScript.
 */
export function AnswerBlock({
  id = "answers",
  eyebrow = "Straight answers",
  heading,
  items,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  heading: string;
  items: AnswerItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby={`${id}-heading`} className={`relative py-24 lg:py-36 ${className}`}>
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <Reveal variant="fade">
          <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal variant="rise" delay={80}>
          <h2
            id={`${id}-heading`}
            className="mt-6 max-w-4xl font-display text-[2rem] leading-[1.1] font-light text-ivory sm:text-5xl"
          >
            {heading}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-x-16 gap-y-12 lg:grid-cols-2">
          {items.map((item, i) => (
            <Reveal key={item.q} variant="rise" delay={i * 60}>
              <article className="max-w-xl">
                <h3 className="font-display text-xl leading-snug font-light text-ivory sm:text-2xl">
                  {item.q}
                </h3>
                <p className="mt-4 font-sans text-[15px] leading-[2] font-light text-ivory/70">
                  {item.a}
                </p>
              </article>
              <span className="mt-8 block hairline" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

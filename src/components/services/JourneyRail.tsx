import { Reveal } from "@/components/motion/Reveal";

export interface JourneyStage {
  label: string;
  body: string;
}

/**
 * Vertical event journey. A gold rail draws itself down the page and each
 * stage arrives from the margin — a timeline that reads like a score, not a
 * process diagram.
 */
export function JourneyRail({ stages }: { stages: JourneyStage[] }) {
  return (
    <ol className="relative mx-auto max-w-4xl">
      <span
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[7px] w-px bg-gradient-to-b from-transparent via-gold/45 to-transparent md:left-1/2"
      />
      {stages.map((s, i) => {
        const right = i % 2 === 1;
        return (
          <li
            key={s.label}
            className={`relative py-10 pl-12 md:w-1/2 md:py-14 md:pl-0 ${
              right ? "md:ml-auto md:pl-16 md:text-left" : "md:pr-16 md:text-right"
            }`}
          >
            <span
              aria-hidden="true"
              className={`absolute top-[3.35rem] left-0 h-3.5 w-3.5 rounded-full border border-gold bg-background md:top-[4.4rem] ${
                right ? "md:-left-[7px]" : "md:right-[-7px] md:left-auto"
              }`}
            />
            <Reveal variant="rise" duration={1000} delay={i * 40}>
              <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-display text-4xl leading-none font-light text-ivory md:text-5xl">
                {s.label}
              </h3>
              <p className="mt-4 font-sans text-sm leading-[1.95] font-light text-ivory/65">
                {s.body}
              </p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

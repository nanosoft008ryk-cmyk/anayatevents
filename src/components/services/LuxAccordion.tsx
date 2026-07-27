import { useState } from "react";

/** Luxury accordion — hairline rules, gold marker, eased height reveal. */
export function LuxAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group/acc flex w-full items-start justify-between gap-8 py-7 text-left"
              >
                <span
                  className={`font-display text-xl leading-snug font-light transition-colors duration-500 md:text-2xl ${
                    isOpen ? "text-gold" : "text-ivory group-hover/acc:text-gold-light"
                  }`}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className="relative mt-3 h-3 w-3 shrink-0"
                >
                  <span className="absolute top-1/2 left-0 h-px w-3 bg-gold" />
                  <span
                    className={`absolute top-0 left-1/2 h-3 w-px bg-gold transition-transform duration-700 [transition-timing-function:var(--ease-lux)] ${
                      isOpen ? "scale-y-0" : "scale-y-100"
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-[800ms] [transition-timing-function:var(--ease-lux)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-8 font-sans text-[15px] leading-[1.95] font-light text-ivory/65">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

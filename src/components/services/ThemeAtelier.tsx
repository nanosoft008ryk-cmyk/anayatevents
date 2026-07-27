import { useState } from "react";

import { photo } from "@/content/images";
import { imgAttrs } from "@/lib/img";

export interface AtelierTheme {
  key: string;
  name: string;
  note: string;
  image: string;
  palette: string[];
}

/**
 * Decor atelier — a moodboard that changes its own light. Selecting a theme
 * dissolves the plate, re-tints the frame and swaps the material notes.
 */
export function ThemeAtelier({ themes }: { themes: AtelierTheme[] }) {
  const [active, setActive] = useState(0);
  const theme = themes[active];

  return (
    <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
      <div>
        <ul className="flex flex-wrap gap-3 lg:flex-col lg:items-start lg:gap-1">
          {themes.map((t, i) => (
            <li key={t.key}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={i === active}
                className={`btn-shape group/th inline-flex items-center gap-4 px-5 py-3 font-display text-2xl font-light transition-colors duration-500 md:text-4xl ${
                  i === active ? "text-gold" : "text-ivory/45 hover:text-ivory"
                }`}
              >
                <span
                  className={`h-px bg-gold transition-all duration-[800ms] [transition-timing-function:var(--ease-lux)] ${
                    i === active ? "w-12" : "w-3 group-hover/th:w-7"
                  }`}
                />
                {t.name}
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-9 max-w-md font-sans text-sm leading-[1.95] font-light text-ivory/65">
          {theme.note}
        </p>

        <div className="mt-8 flex gap-3">
          {theme.palette.map((c) => (
            <span
              key={c}
              className="h-9 w-9 rounded-full border border-border-strong transition-transform duration-700 hover:scale-110"
              style={{ background: c }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[25px]">
        {themes.map((t, i) => {
          const img = photo(t.image);
          return (
            <img
              key={t.key}
              {...imgAttrs(img.id, img.url, "(min-width: 1024px) 55vw, 100vw")}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1400ms] [transition-timing-function:var(--ease-lux)] ${
                i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
              }`}
            />
          );
        })}
        <span className="pointer-events-none absolute inset-0 vignette" />
        <span className="pointer-events-none absolute inset-0 grain" />
        <span className="pointer-events-none absolute right-6 bottom-6 font-sans text-[10px] tracking-[0.36em] uppercase text-ivory/80">
          {theme.name}
        </span>
      </div>
    </div>
  );
}

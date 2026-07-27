import { useId } from "react";

import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import type { GoogleReview } from "@/lib/google-reviews.functions";

export type SortKey = "newest" | "rating";

/**
 * Themes are derived from the words clients actually use, so a filter only
 * ever appears when the live reviews genuinely support it.
 */
const THEMES: { key: string; label: string; match: RegExp }[] = [
  { key: "weddings", label: "Weddings", match: /\b(wedding|barat|walima|nikah|mehndi|shaadi|bride|groom)\b/i },
  { key: "catering", label: "Catering", match: /\b(food|catering|menu|bbq|cuisine|dish|taste|meal|dinner)\b/i },
  { key: "decor", label: "Decor", match: /\b(decor|decoration|stage|floral|flower|light|setup|design)\b/i },
  { key: "corporate", label: "Corporate", match: /\b(corporate|company|conference|office|brand|launch|seminar)\b/i },
  { key: "birthdays", label: "Celebrations", match: /\b(birthday|anniversary|party|engagement|celebration)\b/i },
];

export const themesPresent = (reviews: GoogleReview[]) =>
  THEMES.filter((t) => reviews.filter((r) => t.match.test(r.text)).length >= 2);

export function matchesTheme(review: GoogleReview, key: string) {
  if (key === "all") return true;
  const theme = THEMES.find((t) => t.key === key);
  return theme ? theme.match.test(review.text) : true;
}

export function matchesQuery(review: GoogleReview, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    review.text.toLowerCase().includes(q) || review.author.toLowerCase().includes(q)
  );
}

/** A drawing gold rule under the active item — navigation, not pills. */
function RuleButton({
  active,
  children,
  onClick,
  pressedLabel,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
  pressedLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={pressedLabel}
      className={cn(
        "relative py-1 font-sans text-[10px] tracking-[0.28em] uppercase transition-colors duration-500",
        active ? "text-gold" : "text-muted-foreground hover:text-ivory",
      )}
    >
      {children}
      <span
        aria-hidden="true"
        className={cn(
          "absolute -bottom-1 left-0 h-px w-full origin-left bg-gold transition-transform duration-700 [transition-timing-function:var(--ease-lux)]",
          active ? "scale-x-100" : "scale-x-0",
        )}
      />
    </button>
  );
}

/**
 * Reading controls for the live set: order, theme and a quiet search. Rendered
 * only where the data makes them meaningful.
 */
export function ReviewNavigator({
  sort,
  onSort,
  theme,
  onTheme,
  themes,
  query,
  onQuery,
  count,
}: {
  sort: SortKey;
  onSort: (key: SortKey) => void;
  theme: string;
  onTheme: (key: string) => void;
  themes: { key: string; label: string }[];
  query: string;
  onQuery: (value: string) => void;
  count: number;
}) {
  const searchId = useId();

  return (
    <Reveal>
      <div className="mx-auto max-w-[92rem] px-6 md:px-12">
        <div className="flex flex-col gap-10 border-y border-border py-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
            <span className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep">
              Read by
            </span>
            <div className="flex flex-wrap items-center gap-x-9 gap-y-4" role="group" aria-label="Order reviews">
              <RuleButton active={sort === "newest"} onClick={() => onSort("newest")}>
                Newest
              </RuleButton>
              <RuleButton active={sort === "rating"} onClick={() => onSort("rating")}>
                Highest rated
              </RuleButton>
            </div>

            {themes.length > 0 ? (
              <div
                className="flex flex-wrap items-center gap-x-9 gap-y-4"
                role="group"
                aria-label="Filter reviews by theme"
              >
                <RuleButton active={theme === "all"} onClick={() => onTheme("all")}>
                  All
                </RuleButton>
                {themes.map((t) => (
                  <RuleButton key={t.key} active={theme === t.key} onClick={() => onTheme(t.key)}>
                    {t.label}
                  </RuleButton>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-5">
            <label
              htmlFor={searchId}
              className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold-deep"
            >
              Search
            </label>
            <input
              id={searchId}
              type="search"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="a word, a name"
              className="w-full min-w-0 border-b border-border bg-transparent pb-2 font-sans text-[13px] font-light text-ivory transition-colors duration-500 placeholder:text-muted-foreground/70 focus:border-gold focus:outline-none lg:w-56"
            />
          </div>
        </div>

        <p aria-live="polite" className="mt-5 font-sans text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
          {count === 0
            ? "No review matches that yet"
            : `${count} review${count === 1 ? "" : "s"} in view`}
        </p>
      </div>
    </Reveal>
  );
}

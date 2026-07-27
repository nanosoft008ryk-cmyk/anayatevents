import { Link } from "@tanstack/react-router";

import { relatedFor, type NodeKind, type RelatedOptions } from "@/lib/entity-graph";

/**
 * The derived internal-linking block. It renders whatever the entity graph
 * says relates to this page — services, collections, journal pieces, nearby
 * areas, FAQ topics — so no page can become an orphan and no page needs a
 * hand-written list of links.
 */
export function RelatedConstellation({
  kind,
  slug,
  heading = "Continue",
  options,
}: {
  kind: NodeKind;
  slug: string;
  heading?: string;
  options?: RelatedOptions;
}) {
  const groups = relatedFor(kind, slug, options);
  if (groups.length === 0) return null;

  return (
    <section className="border-t border-border" aria-labelledby="related-constellation">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <p
          id="related-constellation"
          className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold"
        >
          {heading}
        </p>

        <div className="mt-12 grid gap-14 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.kind}>
              <h2 className="font-display text-xl font-light text-ivory/90">{group.label}</h2>
              <ul className="mt-6 space-y-5">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="group block"
                      aria-label={`${item.name} — ${group.label.toLowerCase()}`}
                    >
                      <span className="font-sans text-[13px] tracking-[0.06em] text-ivory transition-colors group-hover:text-gold">
                        {item.name}
                      </span>
                      <span className="mt-1 block h-px w-0 bg-gold transition-all duration-500 group-hover:w-16" />
                      <span className="mt-2 block max-w-[42ch] font-sans text-[13px] leading-[1.8] font-light text-muted-foreground">
                        {item.blurb}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

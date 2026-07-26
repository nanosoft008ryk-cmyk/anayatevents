import { Link } from "@tanstack/react-router";
import type { Crumb } from "@/lib/seo";

/**
 * Visible breadcrumb trail for leaf pages.
 *
 * Pass the SAME Crumb[] to breadcrumbSchema() in the route's head() so the
 * rendered trail and the BreadcrumbList JSON-LD are generated from one array
 * and can never disagree. The final crumb is the current page: rendered as
 * plain text with aria-current, and still position N in the schema.
 */
export function Breadcrumbs({ trail, className = "" }: { trail: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-x-2">
              {isLast ? (
                <span aria-current="page" className="text-gold">
                  {crumb.name}
                </span>
              ) : (
                <Link
                  to={crumb.path}
                  className="transition-colors hover:text-foreground focus-visible:text-foreground"
                >
                  {crumb.name}
                </Link>
              )}
              {!isLast && (
                <span aria-hidden="true" className="text-border-strong">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

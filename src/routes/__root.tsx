import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { jsonLd, organizationSchema, websiteSchema, siteNavigationSchema } from "../lib/seo";
import { verificationMeta } from "../content/verification";
import { navigation } from "../content/navigation";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { ConciergeBar } from "../components/ConciergeBar";
import { site } from "../content/site";


function NotFoundComponent() {
  const routes: { to: string; label: string; note: string }[] = [
    { to: "/services", label: "Services", note: "Weddings, catering, design & production" },
    { to: "/portfolio", label: "Portfolio", note: "Collections and completed case studies" },
    { to: "/journal", label: "Journal", note: "Planning notes from the house" },
    { to: "/areas", label: "Areas we serve", note: "DHA, Bahria Town and across Lahore" },
    { to: "/contact", label: "Enquire", note: "Begin a conversation with a planner" },
  ];

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-[92rem] px-6 pt-40 pb-28 md:px-12">
        <p className="font-sans text-[10px] tracking-[0.42em] uppercase text-gold">Error 404</p>
        <h1 className="mt-6 max-w-[18ch] font-display text-[2.8rem] leading-[0.95] font-light text-ivory lg:text-[5rem]">
          This page has left the room.
        </h1>
        <p className="mt-5 max-w-lg font-sans text-[14px] leading-[2] font-light text-foreground/70">
          The address you followed no longer exists — or never did. Everything worth reading is one
          line below.
        </p>

        <div className="mt-16 hairline opacity-60" />

        <ul className="mt-2 divide-y divide-border">
          {routes.map((r) => (
            <li key={r.to}>
              <Link
                to={r.to}
                className="group/nf flex flex-col gap-1 py-7 transition-colors sm:flex-row sm:items-baseline sm:justify-between"
              >
                <span className="font-display text-2xl font-light text-ivory transition-colors group-hover/nf:text-gold lg:text-3xl">
                  {r.label}
                </span>
                <span className="font-sans text-[12px] font-light text-muted-foreground">
                  {r.note}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 flex flex-wrap items-center gap-x-14 gap-y-6">
          <Link
            to="/"
            className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold transition-colors hover:text-ivory"
          >
            Return home
          </Link>
          <a
            href={site.phoneHref}
            className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory transition-colors hover:text-gold"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
      </section>
    </main>
  );
}


function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  // Sitewide defaults ONLY. Title, description, canonical and og:image are
  // owned by leaf routes via pageMeta() so nothing is ever emitted twice.
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { property: "og:site_name", content: site.legalName },
      { property: "og:locale", content: "en_PK" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0d0d0d" },
      { httpEquiv: "content-language", content: "en-PK" },
      // Ownership verification — paste tokens in src/content/verification.ts.
      ...verificationMeta,
      { title: "Anayat Events" },
      { property: "og:title", content: "Anayat Events" },
      { name: "twitter:title", content: "Anayat Events" },
      { name: "description", content: "Anayat Luxe Events is a premium event management and catering website showcasing luxury services." },
      { property: "og:description", content: "Anayat Luxe Events is a premium event management and catering website showcasing luxury services." },
      { name: "twitter:description", content: "Anayat Luxe Events is a premium event management and catering website showcasing luxury services." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/MWYvK9OKoZNhCCTgMs8DanFwdj93/social-images/social-1785160503867-WhatsApp_Image_2026-07-25_at_5.07.55_PM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/MWYvK9OKoZNhCCTgMs8DanFwdj93/social-images/social-1785160503867-WhatsApp_Image_2026-07-25_at_5.07.55_PM.webp" },
      { property: "og:type", content: "website" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      // Preload the two display faces actually used above the fold so late
      // font swaps don't shift the hero.
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "https://fonts.gstatic.com/s/cormorantgaramond/v21/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtKky2F7g.woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "https://fonts.gstatic.com/s/jost/v20/92zatBhPNqw73oTd4jQmfxI.woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@200;300;400;500&display=swap",
      },
    ],
    scripts: [jsonLd(organizationSchema()), jsonLd(websiteSchema())],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SiteFooter />
      <ConciergeBar />
    </QueryClientProvider>
  );
}

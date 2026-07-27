import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import {
  portfolioCategories,
  getPortfolioCategory,
  type PortfolioCategory,
} from "@/content/portfolio";
import { photo } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  imageGallerySchema,
  type Crumb,
} from "@/lib/seo";

function trailFor(slug: string): Crumb[] {
  const category = getPortfolioCategory(slug);
  return [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: category?.name ?? "Collection", path: `/portfolio/${slug}` },
  ];
}

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const category = getPortfolioCategory(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    const path = `/portfolio/${params.slug}`;
    if (!loaderData) {
      return { meta: [{ title: "Collection unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const { category } = loaderData;
    const trail = trailFor(params.slug);
    return {
      ...pageMeta({
        title: category.metaTitle,
        description: category.metaDescription,
        path,
        image: photo(category.hero).url,
      }),
      scripts: [
        jsonLd(breadcrumbSchema(trail)),
        jsonLd(
          imageGallerySchema({
            name: category.name,
            description: category.metaDescription,
            path,
            images: category.photos.map((id) => {
              const p = photo(id);
              return { url: p.url, alt: p.alt, caption: p.caption };
            }),
          }),
        ),
      ],
    };
  },
  component: PortfolioCategoryPage,
});

function PortfolioCategoryPage() {
  const { category } = Route.useLoaderData() as { category: PortfolioCategory };
  const trail = trailFor(category.slug);
  const frames = category.photos.map(photo);
  const others = portfolioCategories.filter((c) => c.slug !== category.slug);

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">Collection</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          {category.name}
        </h1>
        <p className="mt-7 max-w-2xl font-display text-xl leading-relaxed font-light italic text-muted-foreground md:text-2xl">
          {category.lede}
        </p>
        <div className="mt-8 max-w-2xl space-y-5">
          {category.body.map((para) => (
            <p
              key={para.slice(0, 40)}
              className="font-sans text-[15px] leading-[1.85] font-light text-muted-foreground"
            >
              {para}
            </p>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {frames.map((img) => (
              <figure key={img.id} className="break-inside-avoid">
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full border border-border object-cover"
                />
                <figcaption className="mt-3 font-sans text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
            Other collections
          </p>
          <ul className="mt-8 flex flex-wrap gap-4">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/portfolio/$slug"
                  params={{ slug: c.slug }}
                  className="btn-shape btn-shape inline-flex items-center border border-border-strong px-6 py-3 font-sans text-[11px] tracking-[0.2em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

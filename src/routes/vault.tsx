import { createFileRoute } from "@tanstack/react-router";

import { photos } from "@/content/images";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import {
  pageMeta,
  jsonLd,
  breadcrumbSchema,
  imageGallerySchema,
  type Crumb,
} from "@/lib/seo";

const PATH = "/vault";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "The Vault", path: PATH },
];

export const Route = createFileRoute("/vault")({
  head: () => ({
    ...pageMeta({
      title: "The Vault — Complete Event Photography Archive | Anayat Events",
      description:
        "The complete Anayat Events archive: every stage, floral installation, mehndi set, farmhouse build, dining room and lounge we have photographed in Lahore.",
      path: PATH,
      image: photos[0].url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        imageGallerySchema({
          name: "The Vault — complete archive",
          description:
            "Every photograph from Anayat Events & Catering's Lahore archive, unfiltered and in one place.",
          path: PATH,
          images: photos.map((p) => ({ url: p.url, alt: p.alt, caption: p.caption })),
        }),
      ),
    ],
  }),
  component: Vault,
});

function Vault() {
  return (
    <main className="bg-background">
      <section className="mx-auto max-w-7xl px-6 pt-32 pb-12 md:px-10 md:pt-40">
        <Breadcrumbs trail={trail} className="mb-8" />
        <p className="font-sans text-[11px] tracking-[0.34em] uppercase text-gold">
          {photos.length} frames · complete archive
        </p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] font-light text-ivory md:text-7xl">
          The Vault
        </h1>
        <p className="mt-5 max-w-2xl font-sans text-[15px] leading-[1.85] font-light text-muted-foreground">
          Everything we have photographed, in one place and in no particular order — the way an
          archive should be read.
        </p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-5">
            {photos.map((img) => (
              <figure key={img.id} className="break-inside-avoid">
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full border border-border object-cover"
                />
                <figcaption className="mt-2.5 font-sans text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                  {img.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}

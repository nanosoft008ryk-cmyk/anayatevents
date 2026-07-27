import { createFileRoute } from "@tanstack/react-router";

import { photo } from "@/content/images";
import { whyPage } from "@/content/about";
import { site, stats } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Plate } from "@/components/Plate";
import { Reveal, RevealWords } from "@/components/motion/Reveal";
import { LuxTextLink } from "@/components/ui/LuxButton";
import { pageMeta, jsonLd, breadcrumbSchema, itemListSchema, type Crumb } from "@/lib/seo";

const PATH = "/about/why-us";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Why Choose Us", path: PATH },
];

export const Route = createFileRoute("/about/why-us")({
  head: () => ({
    ...pageMeta({
      title: "Why Choose Us — How An Anayat Evening Actually Feels",
      description:
        "One planner throughout, nothing sub-contracted, a build that finishes early and a crew still there at one in the morning. What tends to be different, without the superlatives.",
      path: PATH,
      image: photo("ae-18").url,
    }),
    scripts: [
      jsonLd(breadcrumbSchema(trail)),
      jsonLd(
        itemListSchema({
          name: "What tends to be different",
          path: PATH,
          items: whyPage.differences.map((d) => ({ name: d.title, path: PATH })),
        }),
      ),
    ],
  }),
  component: WhyPage;
});

function WhyPage() {
  return <div />;
}

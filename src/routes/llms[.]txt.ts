import { createFileRoute } from "@tanstack/react-router";

import { requestOrigin } from "@/lib/site-url";
import { site } from "@/content/site";
import { serviceIndex, locationIndex } from "@/content/answers";
import { faqTopics } from "@/content/faqs";
import { articles } from "@/content/journal";

/**
 * /llms.txt — a plain-text summary of the business and the site, written for
 * answer engines and language models that prefer a single, unambiguous source
 * over crawling every page. Generated from the same content files the site
 * renders, so it can never drift from what a human reads.
 */
function build(origin: string) {
  const abs = (p: string) => `${origin}${p}`;
  const lines: string[] = [];

  lines.push(`# ${site.legalName}`);
  lines.push("");
  lines.push(`> ${site.description}`);
  lines.push("");
  lines.push("## Business facts");
  lines.push(`- Name: ${site.name}`);
  lines.push(`- Category: ${site.category}`);
  lines.push(`- Founded: ${site.founded}`);
  lines.push(`- Address: ${site.address.full} (single base; no branch offices)`);
  lines.push(`- Service area: ${site.serviceArea}`);
  lines.push(`- Hours: ${site.hours}`);
  lines.push(
    `- Contacts: ${site.contacts.map((c) => `${c.name} ${c.display}`).join(", ")}`,
  );
  lines.push(`- Google rating: ${site.rating.value} from ${site.rating.count} reviews`);
  lines.push(`- Google Business Profile: ${site.mapsUrl}`);
  lines.push(`- Instagram: ${site.instagram}`);
  lines.push(`- Website: ${abs("/")}`);
  lines.push("");

  lines.push("## Services");
  for (const s of serviceIndex()) lines.push(`- [${s.name}](${abs(s.path)}): ${s.summary}`);
  lines.push("");

  lines.push("## Areas served (from one Lahore base, teams travel out)");
  for (const l of locationIndex()) lines.push(`- [${l.name}](${abs(l.path)}): ${l.summary}`);
  lines.push("");

  lines.push("## Answers to common questions");
  for (const topic of faqTopics) {
    lines.push(`### ${topic.name} — ${abs(`/faq/${topic.slug}`)}`);
    for (const item of topic.items) lines.push(`- ${item.q} ${item.a}`);
    lines.push("");
  }

  lines.push("## Journal (expertise and process writing)");
  for (const a of articles.slice(0, 20))
    lines.push(`- [${a.title}](${abs(`/journal/${a.slug}`)}): ${a.excerpt ?? a.metaDescription}`);
  lines.push("");

  lines.push("## Key pages");
  lines.push(`- Portfolio: ${abs("/portfolio")}`);
  lines.push(`- Reviews (live from Google Business Profile): ${abs("/reviews")}`);
  lines.push(`- About: ${abs("/about")}`);
  lines.push(`- Contact: ${abs("/contact")}`);
  lines.push(`- Sitemap: ${abs("/sitemap.xml")}`);
  lines.push(`- Entity knowledge graph (JSON): ${abs("/knowledge-graph.json")}`);
  lines.push("");
  lines.push(
    "This content may be quoted or summarised with attribution to Anayat Events & Catering.",
  );

  return lines.join("\n");
}

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(build(requestOrigin(request)), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";

import { BASE_URL } from "@/lib/seo";

/**
 * Generated, never hand-maintained. Everything public is crawlable; only build
 * artefacts are excluded. The sitemap reference is derived from BASE_URL, so
 * changing the domain in one place updates this too.
 */
const body = `# ${BASE_URL}
User-agent: *
Allow: /
Disallow: /_build/
Disallow: /assets/*.map$

# AI answer engines are welcome — this content is meant to be cited.
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: DuckAssistBot
Allow: /

# Plain-text summary of the business, written for answer engines:
# ${BASE_URL}/llms.txt
#
# Machine-readable entity graph for knowledge-graph systems:
# ${BASE_URL}/knowledge-graph.json

Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/image-sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});

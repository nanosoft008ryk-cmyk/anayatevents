import { createFileRoute } from "@tanstack/react-router";

import { requestOrigin } from "@/lib/site-url";

/**
 * Generated, never hand-maintained. Everything public is crawlable; only build
 * artefacts are excluded. Every absolute URL is derived from the origin of
 * the incoming request, so this file is correct on any domain or host.
 */
const buildBody = (origin: string) => `# ${origin}
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
# ${origin}/llms.txt
#
# Machine-readable entity graph for knowledge-graph systems:
# ${origin}/knowledge-graph.json

Sitemap: ${origin}/sitemap.xml
Sitemap: ${origin}/image-sitemap.xml
`;

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(buildBody(requestOrigin(request)), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});

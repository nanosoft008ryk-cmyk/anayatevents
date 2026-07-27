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

Sitemap: ${BASE_URL}/sitemap.xml
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

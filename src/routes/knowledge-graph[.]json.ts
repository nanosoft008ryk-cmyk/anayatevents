import { createFileRoute } from "@tanstack/react-router";

import { BASE_URL } from "@/lib/seo";
import { knowledgeGraphDocument } from "@/lib/knowledge-graph";

/**
 * /knowledge-graph.json — the site's entity graph, published for answer
 * engines, knowledge-graph crawlers and the build-time validator. Generated
 * entirely from /src/content, so it can never disagree with the pages.
 */
export const Route = createFileRoute("/knowledge-graph.json")({
  server: {
    handlers: {
      GET: () =>
        new Response(JSON.stringify(knowledgeGraphDocument(BASE_URL), null, 2), {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";

import { requestOrigin } from "@/lib/site-url";
import { knowledgeGraphDocument } from "@/lib/knowledge-graph";

/**
 * /knowledge-graph.json — the site's entity graph, published for answer
 * engines, knowledge-graph crawlers and the build-time validator. Generated
 * entirely from /src/content, so it can never disagree with the pages.
 */
export const Route = createFileRoute("/knowledge-graph.json")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(JSON.stringify(knowledgeGraphDocument(requestOrigin(request)), null, 2), {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});

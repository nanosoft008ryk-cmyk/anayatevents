import { createFileRoute } from "@tanstack/react-router";

import { BASE_URL } from "@/lib/seo";

const body = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;

export const Route = createFileRoute("/robots/txt")({
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

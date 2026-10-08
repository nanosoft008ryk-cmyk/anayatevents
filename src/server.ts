import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

type HtmlRewriterLike = {
  on(
    selector: string,
    handler: { element(el: { remove(): void }): void },
  ): HtmlRewriterLike;
  transform(response: Response): Response;
};

// Hydration chunks are preloaded in <head>, where they share the first round
// trips with the stylesheet, fonts and hero photograph and delay first paint
// on a slow phone. src/client.tsx only imports the app once the server HTML
// has painted, and Vite's preload helper fetches that import's chunks in
// parallel, so the head hints are dropped and the visible page arrives first.
// HTMLRewriter is the Cloudflare Workers streaming rewriter; on any other
// runtime the response passes through untouched.
function dropModulePreloads(response: Response): Response {
  const Rewriter = (globalThis as { HTMLRewriter?: new () => HtmlRewriterLike }).HTMLRewriter;
  if (!Rewriter) return response;
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) return response;
  return new Rewriter()
    .on('link[rel="modulepreload"]', {
      element(el) {
        el.remove();
      },
    })
    .transform(response);
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return dropModulePreloads(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

/* ---------------------------------------------------------------------------
 * IndexNow: tell Bing, Yandex, Seznam, Naver (and the engines that read from
 * them) about every URL in the live sitemaps in one go.
 *
 *   node scripts/indexnow.mjs                  # https://www.anayatevent.com
 *   node scripts/indexnow.mjs --base=https://… # another host
 *
 * The key file public/<key>.txt proves we own the host. Google does not use
 * IndexNow; submit /sitemap-index.xml in Search Console for Google.
 * ------------------------------------------------------------------------- */

const KEY = "e55ba2f2e022ec3d66509fc052897f29";
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);
const BASE = String(args.base ?? "https://www.anayatevent.com").replace(/\/+$/, "");
const host = new URL(BASE).host;

const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

const index = await (await fetch(`${BASE}/sitemap-index.xml`)).text();
const urls = new Set();
for (const sitemap of locs(index)) {
  const xml = await (await fetch(sitemap)).text();
  for (const u of locs(xml)) if (new URL(u).host === host) urls.add(u);
}
console.log(`${urls.size} URLs found on ${host}`);

const list = [...urls];
for (let i = 0; i < list.length; i += 10000) {
  const batch = list.slice(i, i + 10000);
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation: `${BASE}/${KEY}.txt`, urlList: batch }),
  });
  console.log(`batch ${i / 10000 + 1}: ${batch.length} URLs -> HTTP ${res.status}`);
}

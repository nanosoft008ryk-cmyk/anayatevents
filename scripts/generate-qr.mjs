import QRCode from "qrcode";
import fs from "fs";
const url = "https://search.google.com/local/writereview?placeid=ChIJw5brYgUBGTkRJO-Hwy3rsF4";
const svg = await QRCode.toString(url, { type: "svg", errorCorrectionLevel: "H", margin: 0, color: { dark: "#000000", light: "#00000000" } });
const path = svg.match(/<path[^>]*d="([^"]+)"[^>]*\/>\s*<\/svg>/s);
const m = [...svg.matchAll(/d="([^"]+)"/g)].map((x)=>x[1]);
const vb = svg.match(/viewBox="([^"]+)"/)[1];
fs.writeFileSync("src/content/review-qr.ts", `/**
 * Google review QR — generated from the business's canonical
 * "write a review" deep link with high error correction.
 * Regenerate with: node scripts/generate-qr.mjs
 */
export const reviewQr = {
  url: ${JSON.stringify(url)},
  viewBox: ${JSON.stringify(vb)},
  path: ${JSON.stringify(m[m.length - 1])},
} as const;
`);
console.log(vb, m.length, m[m.length-1].length);

/**
 * Search-engine and platform ownership verification.
 *
 * Paste the token value between the quotes and it is emitted automatically in
 * the global <head> of every page. Empty strings emit nothing, so the markup
 * stays clean until a property is actually claimed. This is the only place
 * verification is ever configured.
 */
export const verification = {
  /** Google Search Console → HTML tag method → content="…" */
  google: "",
  /** Bing Webmaster Tools → msvalidate.01 */
  bing: "",
  /** Yandex Webmaster → yandex-verification */
  yandex: "",
  /** Pinterest business claim → p:domain_verify */
  pinterest: "",
  /** Meta Business Suite → facebook-domain-verification */
  facebook: "",
} as const;

export const verificationMeta = (
  [
    ["google-site-verification", verification.google],
    ["msvalidate.01", verification.bing],
    ["yandex-verification", verification.yandex],
    ["p:domain_verify", verification.pinterest],
    ["facebook-domain-verification", verification.facebook],
  ] as const
)
  .filter(([, content]) => content.trim().length > 0)
  .map(([name, content]) => ({ name, content }));

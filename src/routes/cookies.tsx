import { createFileRoute } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { pageMeta, jsonLd, breadcrumbSchema, webPageSchema, type Crumb } from "@/lib/seo";
import { PolicyPage } from "@/components/PolicyPage";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Cookie Policy", path: "/cookies" },
];

const TITLE = "Cookie Policy | Anayat Events & Catering Lahore";
const DESCRIPTION =
  "This website sets no advertising or tracking cookies. A plain explanation of what is stored in your browser and what is not.";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    ...pageMeta({ title: TITLE, description: DESCRIPTION, path: "/cookies" }),
    scripts: [
      jsonLd(webPageSchema({ name: "Cookie Policy", description: DESCRIPTION, path: "/cookies" })),
      jsonLd(breadcrumbSchema(trail)),
    ],
  }),
  component: Cookies,
});

function Cookies() {
  return (
    <PolicyPage heroPhoto="ae-13"
      eyebrow="Legal"
      title="Cookie Policy"
      lede="A short policy, because there is very little to declare."
      trailNode={<Breadcrumbs trail={trail} />}
    >
      <Reveal>
        <h2>What this site stores</h2>
        <p>
          This is a static website. It sets no advertising cookies, no cross-site trackers and no
          analytics profile. Your browser may cache images and fonts so pages load quickly on a
          second visit; that cache is ordinary browser behaviour and holds nothing about you.
        </p>
        <h2>Third-party embeds</h2>
        <p>
          The contact page embeds a Google Map of our location, and links out to our Google Business
          Profile, Instagram and WhatsApp. Those services may set their own cookies once you
          interact with them, under their own policies — not ours.
        </p>
        <h2>Your control</h2>
        <p>
          Nothing on this site requires cookies to function. You can block or clear them in your
          browser at any time and every page will continue to work exactly as it does now.
        </p>
      </Reveal>
    </PolicyPage>
  );
}

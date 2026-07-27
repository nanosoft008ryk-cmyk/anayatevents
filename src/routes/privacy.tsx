import { createFileRoute } from "@tanstack/react-router";

import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { pageMeta, jsonLd, breadcrumbSchema, webPageSchema, type Crumb } from "@/lib/seo";
import { PolicyPage } from "@/components/PolicyPage";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Privacy Policy", path: "/privacy" },
];

const TITLE = "Privacy Policy | Anayat Events & Catering Lahore";
const DESCRIPTION =
  "How Anayat Events & Catering handles enquiry details, photography and third-party services. Plainly written, no data resale, no tracking beyond what a website needs.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    ...pageMeta({ title: TITLE, description: DESCRIPTION, path: "/privacy" }),
    scripts: [
      jsonLd(webPageSchema({ name: "Privacy Policy", description: DESCRIPTION, path: "/privacy" })),
      jsonLd(breadcrumbSchema(trail)),
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Privacy Policy"
      lede="We collect the minimum a planning conversation requires, and nothing beyond it."
      trailNode={<Breadcrumbs trail={trail} />}
    >
      <Reveal>
        <h2>What we collect</h2>
        <p>
          When you send an enquiry we receive the name, phone number, event date, guest count and
          notes you choose to give us. Nothing else is requested and no field is inferred.
        </p>
        <h2>How it is used</h2>
        <p>
          Solely to answer your enquiry, prepare a proposal and, if you engage us, to plan and
          deliver your event. Enquiry details are never sold, rented or shared with advertisers.
        </p>
        <h2>Who else sees it</h2>
        <p>
          Only the vendors and crew directly involved in delivering your event, and only the detail
          they need. We use WhatsApp and standard telephony to speak with you; their own policies
          govern messages carried on their networks.
        </p>
        <h2>Photography</h2>
        <p>
          We photograph our own production work. Images of your event are only published with your
          permission, and we remove any published image on request.
        </p>
        <h2>Retention and your rights</h2>
        <p>
          Enquiries that do not become bookings are kept for one season and then deleted. You may
          ask us at any time what we hold, ask for a correction, or ask us to delete it. Write or
          call {site.phoneDisplay} and we will act on it.
        </p>
      </Reveal>
    </PolicyPage>
  );
}

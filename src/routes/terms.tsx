import { createFileRoute } from "@tanstack/react-router";

import { site } from "@/content/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Reveal } from "@/components/motion/Reveal";
import { pageMeta, jsonLd, breadcrumbSchema, webPageSchema, type Crumb } from "@/lib/seo";
import { PolicyPage } from "@/components/PolicyPage";

const trail: Crumb[] = [
  { name: "Home", path: "/" },
  { name: "Terms of Service", path: "/terms" },
];

const TITLE = "Terms of Service | Anayat Events & Catering Lahore";
const DESCRIPTION =
  "The terms on which Anayat Events & Catering quotes, books and delivers events in Lahore — proposals, bookings, changes, photography and liability.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    ...pageMeta({ title: TITLE, description: DESCRIPTION, path: "/terms" }),
    scripts: [
      jsonLd(webPageSchema({ name: "Terms of Service", description: DESCRIPTION, path: "/terms" })),
      jsonLd(breadcrumbSchema(trail)),
    ],
  }),
  component: Terms;
});

function Terms() {
  return (
    <PolicyPage
      eyebrow="Legal"
      title="Terms of Service"
      lede="What you can expect from us, and what we ask in return."
      trailNode={<Breadcrumbs trail={trail} />}
    >
      <Reveal>
        <h2>Proposals and pricing</h2>
        <p>
          Every proposal is written for one event, one date and one guest count. Figures hold for
          thirty days; beyond that, seasonal floral and produce pricing is re-quoted honestly rather
          than absorbed silently.
        </p>
        <h2>Booking a date</h2>
        <p>
          A date is held only once a booking advance is received. Until then we will tell you plainly
          if another family is enquiring about the same evening.
        </p>
        <h2>Changes</h2>
        <p>
          One revision round is included with every proposal. Guest count changes are accepted up to
          the kitchen cut-off communicated in your schedule; after that, catering counts are fixed.
        </p>
        <h2>On the day</h2>
        <p>
          We deliver the scope written in your signed proposal. Where a venue, weather or a
          third-party vendor forces a change, we take the decision that protects the evening and
          tell you the same day.
        </p>
        <h2>Photography</h2>
        <p>
          We may photograph our own production work. Publication of anything recognisable is subject
          to your permission — see the Privacy Policy.
        </p>
        <h2>Reaching us</h2>
        <p>
          {site.legalName}, {site.address.full}. Telephone {site.phoneDisplay}. We answer enquiries{" "}
          {site.responseTime.toLowerCase()}.
        </p>
      </Reveal>
    </PolicyPage>
  );
}

## Anayat Events & Catering — Complete Site Architecture

Verified from the Google Business Profile you shared:
- Name: Anayat Events & Catering | Event Management Lahore
- Category: Event management company
- Rating: 5.0 from 62 Google reviews
- Address: The Palms 7 Farmhouse, Green Acres Housing Society, Lahore 54000
- Tagline (logo): "You Think. We Do."

Not visible from the shared link: phone, WhatsApp, email, exact hours, review text. I'll wire these through one `settings.json` with clearly marked placeholders so you can drop the real values in one file. Send them any time and I'll fill them in.

Assets: 26 real photographs (from your 4 archives) + the gold AE logo. No stock, no AI imagery. About 6-8 hero/feature photos on the homepage; the rest live in the Portfolio/Vault.

---

### Design system (noir & gold, logo-matched)

- Palette: `#0d0d0d` base, `#1a1a1a` surfaces, `#c9a84c` gold, `#f0d78c` light gold, warm ivory text.
- Typography: a high-contrast display serif for headings (editorial, Vogue/AD register) paired with a wide-tracked sans for eyebrows, nav and body.
- Tokens only — every colour, gradient, shadow, gold foil and glass surface defined in `src/styles.css`; no hardcoded colour utilities anywhere.
- Custom primitives, no default shadcn look: `GoldButton` (magnetic hover + sweeping foil shine), `GlassPanel`, `EditorialCard`, `FrameImage` (mask-reveal on scroll), `Rule` (hairline gold dividers), `Eyebrow`, `SectionHeading`, `Reveal` (staggered typography reveal), `Parallax`.
- Motion: Motion for React — slow crossfade hero, mask reveals, parallax drift, scroll-linked opacity. All motion respects `prefers-reduced-motion`.
- Hero: full-screen cinematic crossfade across multiple real photographs with slow Ken-Burns drift, permanent layered overlay (dark gradient + vignette + subtle blur floor) so headline and CTA stay readable on every frame.

### Page architecture (~46 routes)

```text
/                                Home
/about                           Our Story
/about/philosophy                Brand Philosophy
/about/team                      Meet the Team
/about/behind-the-brand          Behind the Brand

/services                        Services index
/services/wedding-planning
/services/luxury-weddings
/services/destination-weddings
/services/mehndi-planning
/services/walima-planning
/services/nikah-planning
/services/corporate-events
/services/birthday-events
/services/luxury-catering
/services/live-bbq-catering
/services/outdoor-catering
/services/farmhouse-events
/services/stage-decoration
/services/floral-design
/services/venue-management
/services/private-events

/locations                       Service-area index
/locations/wedding-planner-lahore
/locations/wedding-planner-dha-lahore
/locations/wedding-planner-bahria-town-lahore
/locations/wedding-planner-johar-town
/locations/wedding-planner-gulberg
/locations/wedding-planner-model-town
/locations/wedding-planner-wapda-town
/locations/wedding-planner-valencia-town
/locations/wedding-planner-cantt
/locations/wedding-planner-raiwind-road
/locations/luxury-catering-dha

/portfolio                       Portfolio index
/portfolio/luxury-weddings
/portfolio/outdoor-weddings
/portfolio/corporate-events
/portfolio/luxury-catering
/portfolio/stage-decor
/portfolio/venue-decoration
/vault                           Full gallery (all remaining photography)

/journal                         Editorial index
/journal/$slug                   8 long-form articles (wedding, venue, food,
                                 decor-trend, corporate, seasonal guides)

/faq                             FAQ Centre (grouped: wedding, catering,
                                 corporate, pricing, booking, venue)
/contact                         Luxury contact experience
/privacy
/terms
/not-found (splat)
```

Every route is reachable from navigation, footer, or a parent index page — no orphans. Each page carries unique copy, its own hero photograph, its own testimonial pull, its own FAQ block, and its own CTA.

### Content system (static, no backend)

`src/content/`: `settings.json`, `services.json`, `locations.json`, `portfolio.json`, `gallery.json`, `articles.json`, `faq.json`, `testimonials.json`, `team.json`, `venues.json`. Route files render from these; adding an entry adds a page and a sitemap row automatically.

Photographs are uploaded via Lovable Assets (CDN) with one pointer per image, tagged by category (wedding / decor / food / corporate / candid) so each page pulls the right visual register and no photo is reused as an obvious duplicate on adjacent pages.

### SEO

- Per-route `head()`: unique title, meta description, canonical (self-referencing), og:title/description/image, twitter card.
- Schema.org: `LocalBusiness` + `AggregateRating` (5.0 / 62) sitewide, plus `Service`, `Event`, `FAQPage`, `Article`, `BreadcrumbList` per page type.
- Visible breadcrumbs on every non-home page; dense contextual internal linking (service ↔ location ↔ portfolio ↔ journal).
- `/sitemap.xml` as a server route that derives its entries from the content JSON + route tree — never hand-maintained. `robots.txt` allows crawling and references the sitemap once a domain is set. No `lastmod` values, since there are no authoritative per-page timestamps.
- Semantic HTML, single H1 per page, descriptive alt text on all 26 photographs, accessible heading order.

### Performance

Static prerendered pages, code-split routes, responsive AVIF/WebP variants of every photograph, lazy loading everywhere below the fold, LCP hero preload, minimal JS beyond the motion layer.

### Build order

1. Design system + tokens + shared primitives + nav/footer + asset pipeline (26 photos + logo).
2. Home (cinematic hero) → About cluster → Contact.
3. Services index + 16 service pages.
4. Locations index + 11 location pages.
5. Portfolio + 6 category pages + Vault gallery.
6. Journal + 8 articles, FAQ Centre, Privacy, Terms.
7. Sitemap route, robots, schema pass, internal-link audit, performance/accessibility pass.

Once you approve, I'll start at step 1 and report at each cluster.

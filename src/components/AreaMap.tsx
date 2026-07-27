import { site } from "@/content/site";

/**
 * Location + directions block for area pages.
 *
 * The studio address in site.ts is the fixed origin for every area page; the
 * area's own name is what changes, so the directions links are built per area
 * and the embedded map is centred on the studio.
 */
export function AreaMap({
  areaName,
  travelNote,
}: {
  areaName: string;
  travelNote: string;
}) {
  const destination = site.address.full;
  const googleDirections = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
    `${areaName}, Lahore, Pakistan`,
  )}&destination=${encodeURIComponent(destination)}&travelmode=driving`;
  const appleDirections = `https://maps.apple.com/?saddr=${encodeURIComponent(
    `${areaName}, Lahore`,
  )}&daddr=${encodeURIComponent(destination)}&dirflg=d`;
  const wazeDirections = `https://waze.com/ul?ll=${site.geo.lat},${site.geo.lng}&navigate=yes`;

  return (
    <section
      aria-labelledby="area-map-heading"
      className="border-t border-border bg-surface/40"
    >
      <div className="mx-auto grid max-w-7xl gap-0 px-6 py-20 md:px-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-gold">
            Find us
          </p>
          <h2
            id="area-map-heading"
            className="mt-5 font-display text-4xl leading-[1.08] font-light text-ivory md:text-5xl"
          >
            The studio, and the road
            <span className="block italic">from {areaName}.</span>
          </h2>

          <p className="mt-6 max-w-md font-sans text-sm leading-relaxed font-light text-muted-foreground">
            {travelNote}
          </p>

          <dl className="mt-10 space-y-6 border-t border-border pt-8">
            <div>
              <dt className="font-sans text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                Address
              </dt>
              <dd className="mt-2 font-display text-lg font-light text-ivory">
                {site.address.street}
                <span className="block text-muted-foreground">
                  {site.address.locality} {site.address.postalCode}, Pakistan
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-sans text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                Visiting hours
              </dt>
              <dd className="mt-2 font-sans text-sm font-light text-ivory">{site.hours}</dd>
            </div>
            <div>
              <dt className="font-sans text-[10px] tracking-[0.28em] uppercase text-muted-foreground">
                Service area
              </dt>
              <dd className="mt-2 font-sans text-sm font-light text-ivory">
                {site.serviceArea}
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={googleDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shape inline-flex items-center border border-gold bg-gold px-6 py-3 font-sans text-[11px] tracking-[0.22em] uppercase text-primary-foreground transition-colors hover:bg-gold-light"
            >
              Directions from {areaName}
            </a>
            <a
              href={appleDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shape inline-flex items-center border border-border-strong px-6 py-3 font-sans text-[11px] tracking-[0.22em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              Apple Maps
            </a>
            <a
              href={wazeDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shape inline-flex items-center border border-border-strong px-6 py-3 font-sans text-[11px] tracking-[0.22em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              Waze
            </a>
            <a
              href={site.phoneHref}
              className="btn-shape inline-flex items-center border border-border-strong px-6 py-3 font-sans text-[11px] tracking-[0.22em] uppercase text-ivory transition-colors hover:border-gold hover:text-gold"
            >
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-14 lg:mt-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-border lg:aspect-auto lg:h-full lg:min-h-[520px]">
            <iframe
              title={`Map showing ${site.name} in ${site.address.locality}, serving ${areaName}`}
              src={site.mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full grayscale-[35%] contrast-[1.05]"
            />
          </div>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block font-sans text-[11px] tracking-[0.22em] uppercase text-gold underline-offset-4 hover:underline"
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}

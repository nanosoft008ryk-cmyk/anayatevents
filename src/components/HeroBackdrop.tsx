import { photo } from "@/content/images";
import { SmartImg } from "@/components/ui/SmartImg";

/**
 * Full-bleed cinematic photograph that sits behind a page's opening section.
 * Purely atmospheric: the image dissolves into the page background so the
 * headline type stays the hero.
 */
export function HeroBackdrop({
  id,
  priority = false,
}: {
  id: string;
  priority?: boolean;
}) {
  const image = photo(id);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden"
    >
      <SmartImg
        id={image.id}
        fallbackUrl={image.url}
        sizes="100vw"
        alt=""
        priority={priority}
        className="h-full w-full object-cover opacity-40 kenburns"
      />
      <span
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--background) 72%, transparent) 0%, color-mix(in oklab, var(--background) 55%, transparent) 42%, var(--background) 100%)",
        }}
      />
      <span className="absolute inset-0 vignette opacity-90" />
      <span className="absolute inset-0 grain" />
    </div>
  );
}

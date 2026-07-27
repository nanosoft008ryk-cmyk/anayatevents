import { photo } from "@/content/images";
import { imgAttrs } from "@/lib/img";

/**
 * Full-bleed cinematic photograph that sits behind a page's opening section.
 * Purely atmospheric: the image dissolves into the page background so the
 * headline type stays the hero.
 */
export function HeroBackdrop({
  id,
  height = "tall",
  priority = false,
}: {
  id: string;
  /** How far the frame reaches down the opening section. */
  height?: "tall" | "short";
  priority?: boolean;
}) {
  const image = photo(id);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${
        height === "tall" ? "" : ""
      }`}
    >
      <img
        {...imgAttrs(image.id, image.url, "100vw")}
        alt=""
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
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

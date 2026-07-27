import { createServerFn } from "@tanstack/react-start";

export interface GoogleReview {
  id: string;
  rating: number;
  text: string;
  author: string;
  authorUri?: string;
  photoUri?: string;
  relativeTime: string;
  publishTime: string;
  url?: string;
}

export interface GoogleReviewsPayload {
  /** "5.0" style display value, live from the Google Business Profile. */
  rating: string;
  /** Total number of Google ratings — the number shown across the site. */
  ratingCount: number;
  mapsUri: string;
  reviews: GoogleReview[];
  /** True when Google could not be reached and the static fallback is shown. */
  stale: boolean;
}

/** The business's Google Place — resolved once from Places Text Search. */
const PLACE_ID = "ChIJw5brYgUBGTkRJO-Hwy3rsF4";

const GATEWAY = "https://connector-gateway.lovable.dev/google_maps";

const FIELD_MASK = [
  "id",
  "rating",
  "userRatingCount",
  "googleMapsUri",
  "reviews",
].join(",");

/** Last-known values, used only if Google is unreachable at render time. */
const FALLBACK: GoogleReviewsPayload = {
  rating: "5.0",
  ratingCount: 62,
  mapsUri:
    "https://www.google.com/maps/place/Anayat+Events+%26+Catering+%7C+Event+Management+Lahore/data=!4m2!3m1!1s0x3919010562eb96c3:0x5eb0eb2dc387ef24",
  reviews: [],
  stale: true,
};

interface PlacesReview {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  googleMapsUri?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
}

/**
 * Live Google Business Profile rating, total review count and the reviews
 * Google exposes publicly for the place. Nothing here is hand-maintained: when
 * a customer leaves a new review, the next render picks it up.
 *
 * Note: the Places API returns the most relevant public reviews for a place
 * (currently up to five), not the full history — the total count is always
 * live and the "read all on Google" link covers the rest.
 */
export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleReviewsPayload> => {
    const lovableKey = process.env.LOVABLE_API_KEY;
    const mapsKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!lovableKey || !mapsKey) return FALLBACK;

    try {
      const res = await fetch(
        `${GATEWAY}/places/v1/places/${PLACE_ID}?languageCode=en`,
        {
          headers: {
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": mapsKey,
            "X-Goog-FieldMask": FIELD_MASK,
          },
        },
      );

      if (!res.ok) {
        console.error(
          `Google Places request failed [${res.status}]: ${await res.text()}`,
        );
        return FALLBACK;
      }

      const data = (await res.json()) as {
        rating?: number;
        userRatingCount?: number;
        googleMapsUri?: string;
        reviews?: PlacesReview[];
      };

      const reviews: GoogleReview[] = (data.reviews ?? [])
        .map((r, i) => ({
          id: r.name ?? `review-${i}`,
          rating: r.rating ?? 5,
          text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
          author: r.authorAttribution?.displayName ?? "Google user",
          authorUri: r.authorAttribution?.uri,
          photoUri: r.authorAttribution?.photoUri,
          relativeTime: r.relativePublishTimeDescription ?? "",
          publishTime: r.publishTime ?? "",
          url: r.googleMapsUri,
        }))
        .filter((r) => r.text.length > 0)
        .sort((a, b) => (a.publishTime < b.publishTime ? 1 : -1));

      return {
        rating: (data.rating ?? 5).toFixed(1),
        ratingCount: data.userRatingCount ?? FALLBACK.ratingCount,
        mapsUri: data.googleMapsUri ?? FALLBACK.mapsUri,
        reviews,
        stale: false,
      };
    } catch (err) {
      console.error("Google Places request threw:", err);
      return FALLBACK;
    }
  },
);

import { useQuery } from "@tanstack/react-query";

import { googleReviewsQuery } from "@/lib/google-reviews";
import { site } from "@/content/site";

/**
 * Live Google rating for inline trust lines. Renders the last-known figures
 * until Google answers, so nothing ever flashes empty — but the number shown
 * is the live one the moment it arrives.
 */
export function useLiveRating() {
  const { data } = useQuery({
    ...googleReviewsQuery(),
    placeholderData: {
      rating: site.rating.value,
      ratingCount: site.rating.count,
      mapsUri: site.mapsUrl,
      reviews: [],
      stale: true,
    },
  });

  return {
    rating: data?.rating ?? site.rating.value,
    count: data?.ratingCount ?? site.rating.count,
    mapsUri: data?.mapsUri ?? site.mapsUrl,
  };
}

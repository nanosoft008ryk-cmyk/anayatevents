import { queryOptions } from "@tanstack/react-query";

import { getGoogleReviews } from "./google-reviews.functions";

/**
 * One query for the whole site: the header/hero rating line, the About page
 * proof line and the Reviews page all read the same live payload, so a new
 * Google review updates every surface at once.
 */
export const googleReviewsQuery = () =>
  queryOptions({
    queryKey: ["google-reviews"],
    queryFn: () => getGoogleReviews(),
    // Google's numbers move slowly; an hour of freshness keeps the page fast.
    staleTime: 60 * 60 * 1000,
    gcTime: 6 * 60 * 60 * 1000,
  });

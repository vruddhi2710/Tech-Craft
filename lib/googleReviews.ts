export type DisplayReview = {
  name: string
  course: string
  rating: string
  text: string
  url?: string
}

type GooglePlaceReview = {
  author_name?: string
  author_url?: string
  rating?: number
  relative_time_description?: string
  text?: string
}

type GooglePlaceDetailsResponse = {
  result?: {
    name?: string
    rating?: number
    reviews?: GooglePlaceReview[]
    user_ratings_total?: number
  }
  error_message?: string
  status?: string
}

export async function getGoogleReviews(): Promise<DisplayReview[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return []
  }

  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'name,rating,user_ratings_total,reviews',
    reviews_sort: 'newest',
    key: apiKey,
  })

  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${params}`, {
      signal: AbortSignal.timeout(3500),
      next: {
        revalidate: 60 * 60 * 6,
      },
    })

    if (!response.ok) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`Google reviews request failed with HTTP ${response.status}.`)
      }

      return []
    }

    const data = await response.json() as GooglePlaceDetailsResponse

    if (data.status !== 'OK' || !data.result?.reviews?.length) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `Google reviews unavailable: ${data.status || 'UNKNOWN'}${data.error_message ? ` - ${data.error_message}` : ''}`,
        )
      }

      return []
    }

    return data.result.reviews
      .filter((review) => review.author_name && review.text)
      .map((review) => ({
        name: review.author_name || 'Google User',
        course: review.relative_time_description || 'Google Review',
        rating: String(review.rating || 5),
        text: review.text || '',
        url: review.author_url,
      }))
  } catch {
    return []
  }
}

'use client'

import { Star } from 'lucide-react'
import type { DisplayReview } from '../lib/googleReviews'

type ReviewsCarouselProps = {
  reviews: DisplayReview[]
}

function renderStars(rating: string) {
  const roundedRating = Math.round(Number(rating) || 5)

  return Array.from({ length: 5 }, (_, index) => (
    <Star
      key={index}
      className="h-4 w-4"
      fill={index < roundedRating ? 'currentColor' : 'none'}
    />
  ))
}

export default function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const reviewGroups = [...reviews, ...reviews]

  return (
    <div className="mt-16 overflow-hidden pb-6">
      <div className="reviews-marquee flex w-max gap-6">
        {reviewGroups.map((review, index) => (
          <div
            key={`${review.name}-${index}`}
            aria-hidden={index >= reviews.length ? 'true' : undefined}
            className="w-[320px] shrink-0 rounded-xl border border-zinc-200 bg-white p-6 text-left shadow-xl shadow-zinc-200/70 md:w-[380px]"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-black text-white">
                  G
                </div>

                <div>
                  <h3 className="font-bold text-zinc-950">
                    {review.url && index < reviews.length ? (
                      <a href={review.url} target="_blank" rel="noreferrer" className="transition hover:text-blue-600">
                        {review.name}
                      </a>
                    ) : (
                      review.name
                    )}
                  </h3>
                  <p className="text-sm text-zinc-500">{review.course}</p>
                </div>
              </div>

              <div className="rounded-md bg-blue-50 px-3 py-1 text-sm font-black text-blue-600">
                {review.rating}/5
              </div>
            </div>

            <div className="mt-5 flex gap-1 text-yellow-400" aria-label={`${review.rating} star rating`}>
              {renderStars(review.rating)}
            </div>

            <p className="mt-4 leading-7 text-zinc-600">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

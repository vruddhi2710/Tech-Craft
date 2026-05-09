import { getGoogleReviews, type DisplayReview } from '../lib/googleReviews'

const fallbackReviews: DisplayReview[] = [
  {
    name: 'Vruddhi S.',
    course: 'Python Student',
    rating: '5.0',
    text: 'Amazing mentorship and practical learning. The sessions made coding feel easy to understand.',
  },
  {
    name: 'Riya P.',
    course: 'GenAI Workshop',
    rating: '5.0',
    text: 'Best AI workshop experience for students. The examples were useful and very hands-on.',
  },
  {
    name: 'Aarav M.',
    course: 'ReactJS Course',
    rating: '5.0',
    text: 'Loved the real projects and internship guidance. I could finally build my own portfolio.',
  },
  {
    name: 'Neha K.',
    course: 'Web Design',
    rating: '5.0',
    text: 'The design lessons were clear, practical, and helped me improve my Figma screens quickly.',
  },
  {
    name: 'Dev S.',
    course: 'Tech-Craft Internship',
    rating: '5.0',
    text: 'Great support from mentors. The project tasks helped me gain confidence for real work.',
  },
]

function renderStars(rating: string) {
  const roundedRating = Math.round(Number(rating) || 5)
  return '★★★★★'.slice(0, roundedRating).padEnd(5, '☆')
}

export default async function Testimonials() {
  const googleReviews = await getGoogleReviews()
  const reviews = googleReviews.length > 0 ? googleReviews : fallbackReviews
  const movingReviews = [...reviews, ...reviews]

  return (
    <section className="py-24 bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Google Reviews
        </p>

        <h2 className="mt-4 text-5xl font-bold">
          Student Reviews
        </h2>
      </div>

      <div className="mt-16 overflow-hidden">
        <div className="reviews-marquee flex w-max gap-6">
          {movingReviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="w-[320px] shrink-0 rounded-3xl border border-white/10 bg-slate-950 p-6 text-left shadow-2xl shadow-black/20 md:w-[380px]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg font-bold text-blue-600">
                    G
                  </div>

                  <div>
                    <h3 className="font-bold text-white">
                      {review.url ? (
                        <a href={review.url} target="_blank" rel="noreferrer" className="transition hover:text-cyan-200">
                          {review.name}
                        </a>
                      ) : (
                        review.name
                      )}
                    </h3>
                    <p className="text-sm text-slate-400">{review.course}</p>
                  </div>
                </div>

                <div className="rounded-full bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100">
                  {review.rating}/5
                </div>
              </div>

              <div className="mt-5 text-yellow-300" aria-label={`${review.rating} star rating`}>
                {renderStars(review.rating)}
              </div>

              <p className="mt-4 leading-7 text-slate-300">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}

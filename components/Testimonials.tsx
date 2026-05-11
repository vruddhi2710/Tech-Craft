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
    <section id="reviews" className="bg-zinc-50 py-24 text-zinc-950">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">
          Google Reviews
        </p>

        <h2 className="mt-4 text-4xl font-black sm:text-5xl">
          Student Reviews
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
          Real feedback from learners building skills with Tech-Craft.
        </p>
      </div>

      <div className="mt-16 overflow-hidden">
        <div className="reviews-marquee flex w-max gap-6">
          {movingReviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className="w-[320px] shrink-0 rounded-xl border border-zinc-200 bg-white p-6 text-left shadow-xl shadow-zinc-200/70 md:w-[380px]"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-black text-white">
                    G
                  </div>

                  <div>
                    <h3 className="font-bold text-zinc-950">
                      {review.url ? (
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

              <div className="mt-5 text-yellow-400" aria-label={`${review.rating} star rating`}>
                {renderStars(review.rating)}
              </div>

              <p className="mt-4 leading-7 text-zinc-600">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

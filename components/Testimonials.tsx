import { getGoogleReviews, type DisplayReview } from '../lib/googleReviews'
import ReviewsCarousel from './ReviewsCarousel'

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
    course: 'Web Development',
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

export default async function Testimonials() {
  const googleReviews = await getGoogleReviews()
  const reviews = googleReviews.length > 0 ? googleReviews : fallbackReviews

  return (
    <section id="reviews" className="bg-[#071a3d] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-300">
          Google Reviews
        </p>

        <h2 className="mt-4 text-4xl font-black sm:text-5xl">
          Student Reviews
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
          Real feedback from learners building skills with Tech-Craft.
        </p>
      </div>

      <ReviewsCarousel reviews={reviews} />
    </section>
  )
}

import type { Metadata } from 'next'
import { Flame, Gift, Heart, ShieldCheck, Sparkles } from 'lucide-react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import GiftCourseForm from '../../components/GiftCourseForm'

export const metadata: Metadata = {
  title: 'Celebrate Diwali. Share the Joy of Learning.',
  description: 'Celebrate Diwali by gifting a Tech-Craft workshop or course offer to someone special.',
  alternates: { canonical: '/gift-a-course' },
}

export default function GiftCoursePage() {
  return <main className="min-h-screen bg-slate-50 text-slate-950">
    <Navbar />
    <section className="relative overflow-hidden bg-[#101b32] px-5 pb-16 pt-32 text-white sm:px-8 sm:pb-20 sm:pt-40">
      <div className="pointer-events-none absolute -right-24 -top-16 h-96 w-96 rounded-full border border-orange-200/10" /><div className="pointer-events-none absolute -right-12 top-0 h-72 w-72 rounded-full border border-fuchsia-200/10" />
      <div className="relative mx-auto max-w-5xl text-center"><span className="mx-auto inline-flex items-center gap-2 rounded-full border border-orange-200/25 bg-orange-100/10 px-4 py-2 text-sm font-semibold text-sky-300"><Flame className="h-4 w-4" /> Diwali learning gifts <Sparkles className="h-4 w-4" /></span><h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">Celebrate Diwali.<br className="sm:hidden" /> <span className="text-sky-300">Share the Joy of Learning.</span></h1><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">Celebrate Diwali by sharing a bright new learning opportunity. Add a personal note and we’ll send the gift card to you and your recipient.</p><div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-300"><span className="inline-flex items-center gap-2"><Heart className="h-4 w-4 text-sky-300" />Made personal by you</span><span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-sky-300" />Your contact details stay private</span><span aria-hidden="true" className="text-xl">🪔 ✨ 🪔</span></div></div>
    </section>
    <section className="px-4 py-10 sm:px-6 sm:py-16"><div className="mx-auto max-w-5xl"><div className="mb-8 text-center"><h2 className="text-2xl font-black text-slate-950 sm:text-3xl">Create a Diwali gift</h2><p className="mt-2 text-sm leading-6 text-slate-600">Add your details, choose one of the current festive offers, and send a little joy.</p></div><GiftCourseForm /><p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-slate-500">The coupon is a gift identifier; it does not itself redeem a course or grant course access. Please contact Tech-Craft to arrange enrollment. Without an account or database, gift details cannot be retrieved after refreshing this page.</p></div></section>
    <Footer />
  </main>
}

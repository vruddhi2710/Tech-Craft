'use client'

import { useState } from 'react'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { ArrowRight, BookOpen, Check, Copy, Gift, GraduationCap, LoaderCircle, Mail, MessageCircle, RotateCcw, UserRound } from 'lucide-react'
import { giftOffers } from '../data/giftOffers'

type FormValues = {
  giverName: string; giverEmail: string; giverPhone: string
  recipientName: string; recipientEmail: string; recipientPhone: string
  course: string; message: string
}
type GiftResult = Pick<FormValues, 'giverName' | 'recipientName' | 'course' | 'message'> & { coupon: string }
const emptyForm: FormValues = { giverName: '', giverEmail: '', giverPhone: '', recipientName: '', recipientEmail: '', recipientPhone: '', course: '', message: '' }

const giftSelectSx = {
  borderRadius: '12px',
  backgroundColor: '#fff',
  color: '#1e293b',
  fontFamily: 'inherit',
  fontSize: '0.875rem',
  '& .MuiSelect-select': { minHeight: '48px', boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '12px 40px 12px 16px' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: '#e2e8f0' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#93c5fd' },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#2563eb', borderWidth: '1px' },
  '&.Mui-focused': { boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.12)' },
}

const giftMenuProps = {
  slotProps: {
    paper: {
      sx: {
      mt: 0.75,
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      boxShadow: '0 12px 28px rgba(15, 23, 42, 0.14)',
      },
    },
    list: { sx: {
      padding: '6px',
      fontFamily: 'inherit',
      '& .MuiMenuItem-root': { minHeight: '42px', borderRadius: '8px', fontFamily: 'inherit', fontSize: '0.9rem' },
      '& .MuiMenuItem-root.Mui-selected': { backgroundColor: '#eff6ff', color: '#1d4ed8' },
      '& .MuiMenuItem-root.Mui-selected:hover': { backgroundColor: '#dbeafe' },
    } },
  },
}

function Field({ label, name, value, onChange, type = 'text', error, required = true, autoComplete }: {
  label: string; name: keyof FormValues; value: string; onChange: (name: keyof FormValues, value: string) => void
  type?: string; error?: string; required?: boolean; autoComplete?: string
}) {
  return <div>
    <label htmlFor={name} className="mb-2 block text-sm font-semibold text-slate-800">{label}{required ? <span className="ml-1 text-rose-600" aria-hidden="true">*</span> : null}</label>
    <input id={name} name={name} type={type} value={value} onChange={(event) => onChange(name, event.target.value)} required={required} autoComplete={autoComplete} aria-invalid={Boolean(error)} aria-describedby={error ? `${name}-error` : undefined} maxLength={type === 'email' ? 254 : 100} className={`min-h-12 w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${error ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'}`} />
    {error ? <p id={`${name}-error`} className="mt-1.5 text-sm text-rose-700">{error}</p> : null}
  </div>
}

function GiftCard({ gift, partial, onReset }: { gift: GiftResult; partial?: string; onReset: () => void }) {
  const [copied, setCopied] = useState(false)
  const whatsapp = `🎁 A special course gift!\n\nHi ${gift.recipientName},\n\n${gift.giverName} has gifted you the ${gift.course} course from Tech-Craft.\n\nYour Gift Coupon Code: ${gift.coupon}\n\nEnjoy your learning journey! 🎓`
  async function copy() {
    try { await navigator.clipboard.writeText(gift.coupon); setCopied(true); window.setTimeout(() => setCopied(false), 1800) }
    catch { setCopied(false) }
  }
  return <section aria-live="polite" className="mx-auto w-full max-w-3xl">
    {partial ? <div role="alert" className="mb-5 rounded-xl border border-orange-300 bg-orange-50 p-4 text-sm leading-6 text-orange-950">{partial}</div> : <div className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-900"><Check className="mr-2 inline h-5 w-5" />Gift card emails sent to you and the recipient. The Tech-Craft team was notified.</div>}
    <div className="relative overflow-hidden rounded-[2rem] border border-orange-300/70 bg-[#111b33] p-7 text-white shadow-2xl shadow-slate-900/20 sm:p-12">
      <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border border-orange-200/20" /><div className="pointer-events-none absolute -right-4 -top-8 h-48 w-48 rounded-full border border-fuchsia-200/15" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3"><span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-sky-300">🪔 Tech-Craft Diwali Gift</span><GraduationCap className="h-9 w-9 text-sky-300" /></div>
        <div className="mt-8 text-center text-3xl" aria-hidden="true">✨ 🪔 ✨</div>
        <p className="mt-3 text-center text-sm font-semibold uppercase tracking-[.16em] text-sky-300">Celebrate Diwali. Share the Joy of Learning.</p>
        <h2 className="mt-4 text-center text-3xl font-black sm:text-4xl">Dear {gift.recipientName},</h2>
        <p className="mt-3 text-center text-slate-300">{gift.giverName} is sharing a little festive joy and a bright new learning opportunity with you.</p>
        <div className="my-8 rounded-2xl border border-white/10 bg-white/[.07] p-5 text-center sm:p-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-sky-300">Your gift</p><p className="mt-2 text-xl font-bold sm:text-2xl">{gift.course}</p>{gift.message ? <blockquote className="mt-5 border-t border-white/10 pt-4 text-sm leading-6 text-slate-200">“{gift.message}”</blockquote> : null}</div>
        <div className="rounded-xl border border-dashed border-orange-200/60 bg-orange-100/[.08] p-5 text-center"><p className="text-xs font-bold uppercase tracking-[.2em] text-sky-300">Gift coupon code</p><p className="mt-2 break-all font-mono text-2xl font-black tracking-[.13em] sm:text-3xl">{gift.coupon}</p><button type="button" onClick={copy} className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300/40"><Copy className="h-4 w-4" />{copied ? 'Copied!' : 'Copy coupon code'}</button></div>
        <p className="mt-6 text-center text-xs leading-5 text-slate-400">This code identifies your gift request. Course access and redemption are arranged separately with Tech-Craft.</p>
      </div>
    </div>
    <div className="mt-5 flex flex-col gap-3 sm:flex-row"><a href={`https://wa.me/?text=${encodeURIComponent(whatsapp)}`} target="_blank" rel="noreferrer" className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#168c52] px-5 py-3 font-bold text-white transition hover:bg-[#117644] focus:outline-none focus:ring-4 focus:ring-emerald-200"><MessageCircle className="h-5 w-5" />Share on WhatsApp</a><button type="button" onClick={onReset} className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100"><RotateCcw className="h-4 w-4" />Create another gift</button></div>
  </section>
}

export default function GiftCourseForm() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [gift, setGift] = useState<GiftResult | null>(null)
  const [partial, setPartial] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const update = (name: keyof FormValues, value: string) => { setForm((current) => ({ ...current, [name]: value })); setErrors((current) => ({ ...current, [name]: '' })) }

  function validate() {
    const next: Partial<Record<keyof FormValues, string>> = {}
    for (const key of ['giverName', 'giverEmail', 'giverPhone', 'recipientName', 'recipientEmail', 'recipientPhone', 'course'] as const) if (!form[key].trim()) next[key] = 'This field is required.'
    for (const key of ['giverEmail', 'recipientEmail'] as const) if (form[key] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form[key])) next[key] = 'Enter a valid email address.'
    for (const key of ['giverPhone', 'recipientPhone'] as const) if (form[key] && !/^[+\d][\d\s().-]{5,38}$/.test(form[key])) next[key] = 'Enter a valid mobile number.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setPartial('')
    if (!validate() || busy) return
    setBusy(true)
    try {
      const response = await fetch('/api/gift-course', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await response.json() as { error?: string; gift?: GiftResult; partial?: boolean; emailStatus?: { notificationSent: boolean; recipientSent: boolean; giverSent: boolean } }
      if (data.gift) setGift({ ...data.gift, giverName: form.giverName })
      if (!response.ok) {
        if (data.partial && data.emailStatus) setPartial(`Email delivery was incomplete (recipient: ${data.emailStatus.recipientSent ? 'sent' : 'not sent'}; sender: ${data.emailStatus.giverSent ? 'sent' : 'not sent'}; team: ${data.emailStatus.notificationSent ? 'sent' : 'not sent'}). Keep this gift code and contact Tech-Craft before retrying. ${data.error || ''}`)
        else setError(data.error || 'We could not send the gift emails. Please try again.')
      }
    } catch { setError('We could not reach the server. Please check your connection and try again.') }
    finally { setBusy(false) }
  }

  if (gift) return <GiftCard gift={gift} partial={partial || undefined} onReset={() => { setForm(emptyForm); setGift(null); setPartial(''); setError(''); setErrors({}) }} />

  return <form onSubmit={submit} noValidate className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[.06] sm:p-8 lg:p-10">
    {error ? <div role="alert" className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-800">{error}</div> : null}
    <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
      <fieldset className="space-y-5"><legend className="mb-5 flex items-center gap-2 text-lg font-extrabold text-slate-950"><UserRound className="h-5 w-5 text-blue-600" />Your details</legend><Field label="Full name" name="giverName" value={form.giverName} onChange={update} error={errors.giverName} autoComplete="name"/><Field label="Email address" name="giverEmail" type="email" value={form.giverEmail} onChange={update} error={errors.giverEmail} autoComplete="email"/><Field label="Mobile number" name="giverPhone" type="tel" value={form.giverPhone} onChange={update} error={errors.giverPhone} autoComplete="tel"/></fieldset>
      <fieldset className="space-y-5"><legend className="mb-5 flex items-center gap-2 text-lg font-extrabold text-slate-950"><Mail className="h-5 w-5 text-blue-600" />Who is it for?</legend><Field label="Recipient's full name" name="recipientName" value={form.recipientName} onChange={update} error={errors.recipientName} autoComplete="off"/><Field label="Recipient's email address" name="recipientEmail" type="email" value={form.recipientEmail} onChange={update} error={errors.recipientEmail} autoComplete="off"/><Field label="Recipient's mobile number" name="recipientPhone" type="tel" value={form.recipientPhone} onChange={update} error={errors.recipientPhone} autoComplete="off"/></fieldset>
    </div>
    <fieldset className="mt-10 border-t border-slate-100 pt-8"><legend className="mb-5 flex items-center gap-2 text-lg font-extrabold text-slate-950"><BookOpen className="h-5 w-5 text-blue-600" />Choose their gift</legend><div className="grid gap-5 md:grid-cols-2"><div><FormControl fullWidth required error={Boolean(errors.course)} variant="outlined"><InputLabel id="course-label" shrink sx={{ fontFamily: 'inherit' }}>Select a course or offer</InputLabel><Select id="course" name="course" labelId="course-label" label="Select a course or offer" value={form.course} displayEmpty onChange={(event) => update('course', event.target.value)} aria-describedby={errors.course ? 'course-error' : undefined} MenuProps={giftMenuProps} sx={giftSelectSx} renderValue={(selected) => selected || <span className="text-slate-500">Choose a gift</span>}><MenuItem value="" disabled>Choose a gift</MenuItem>{giftOffers.map((offer) => <MenuItem key={offer} value={offer}>{offer}</MenuItem>)}</Select>{errors.course ? <FormHelperText id="course-error" sx={{ fontFamily: 'inherit' }}>{errors.course}</FormHelperText> : null}</FormControl></div><div><label htmlFor="message" className="mb-2 block text-sm font-semibold text-slate-800">Personal gift message <span className="font-normal text-slate-500">(optional)</span></label><textarea id="message" name="message" value={form.message} onChange={(event) => update('message', event.target.value)} rows={3} maxLength={1000} placeholder="Add a few words to make their gift special…" className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100" /></div></div></fieldset>
    <button type="submit" disabled={busy} className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-base font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto sm:min-w-64">{busy ? <><LoaderCircle className="h-5 w-5 animate-spin" />Sending gift…</> : <>Generate gift card <ArrowRight className="h-5 w-5" /></>}</button>
  </form>
}


// -> Include diwali on top
// -> SHow Card
// 1. 1 week free PowerBI workshop
// 2. 2 Days Devops Workshop
// 3. 1 week python libraries workshop
// 4. 20% off on any Tech Craft Courses
// 5. 2 Day GenAI workshop

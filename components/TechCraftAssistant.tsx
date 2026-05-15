'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  ArrowRight,
  Bot,
  GraduationCap,
  Send,
  Sparkles,
  X,
} from 'lucide-react'

type ChatHistoryItem = {
  role: 'user' | 'assistant'
  text: string
}

type Message = {
  role: 'user' | 'bot'
  content: string
}

type CourseButton = {
  title: string
  url: string
}

type ParsedReply = {
  text: string
  courseBtn: CourseButton | null
  courseList: string[] | null
}

const QUICK_CHIPS = [
  { label: 'All Courses', msg: 'Which courses do you offer?' },
  { label: 'MERN Stack', msg: 'Tell me about MERN Stack' },
  { label: 'Python', msg: 'Tell me about Python' },
  { label: 'GenAI', msg: 'Tell me about Generative AI' },
  { label: 'Demo', msg: 'Can I attend a demo class?' },
  { label: 'Internships', msg: 'Do you provide internships?' },
  { label: 'Enroll', msg: 'How can I enroll?' },
]

const COURSE_LINKS: CourseButton[] = [
  { title: 'Python', url: '/courses/python' },
  { title: 'Full Stack', url: '/courses/full-stack' },
  { title: 'Python Full Stack', url: '/courses/full-stack' },
  { title: 'MERN Stack', url: '/courses/mern-stack' },
  { title: 'ReactJS', url: '/courses/reactjs' },
  { title: 'NodeJs', url: '/courses/nodejs' },
  { title: 'SQL', url: '/courses/sql' },
  { title: 'Basic Coding (C/C++)', url: '/courses/basic-coding' },
  { title: 'GenAI', url: '/courses/genai' },
  { title: 'Generative AI', url: '/courses/genai' },
]

function parseReply(raw: string): ParsedReply {
  let text = raw
  let courseBtn: CourseButton | null = null
  let courseList: string[] | null = null

  const btnMatch = text.match(/COURSE_BTN:(\{[^}]+\})/)
  if (btnMatch) {
    try {
      courseBtn = JSON.parse(btnMatch[1]) as CourseButton
    } catch {
      courseBtn = null
    }
    text = text.replace(btnMatch[0], '').trim()
  }

  const listMatch = text.match(/COURSE_LIST:(\[[^\]]+\])/)
  if (listMatch) {
    try {
      courseList = JSON.parse(listMatch[1]) as string[]
    } catch {
      courseList = null
    }
    text = text.replace(listMatch[0], '').trim()
  }

  if (!courseBtn && !courseList) {
    courseBtn = detectCourseButton(text)
  }

  return { text, courseBtn, courseList }
}

function detectCourseButton(text: string) {
  const normalized = text.toLowerCase()

  return (
    COURSE_LINKS.find((course) => {
      const title = course.title.toLowerCase()
      const slug = course.url.split('/').pop()?.replaceAll('-', ' ') || ''

      return (
        normalized.includes(title) ||
        normalized.includes(slug) ||
        (title.includes('mern') && normalized.includes('mern')) ||
        (title.includes('react') && normalized.includes('react')) ||
        (title.includes('node') && normalized.includes('node')) ||
        (title.includes('genai') && normalized.includes('generative')) ||
        (title.includes('basic coding') && normalized.includes('c/c++')) ||
        (title.includes('full stack') && normalized.includes('python full stack'))
      )
    }) || null
  )
}

function getCourseByTitle(title: string) {
  const normalizedTitle = title.toLowerCase()

  return COURSE_LINKS.find((course) => {
    const courseTitle = course.title.toLowerCase()

    return (
      courseTitle === normalizedTitle ||
      (courseTitle === 'genai' && normalizedTitle === 'generative ai') ||
      (courseTitle === 'full stack' && normalizedTitle === 'python full stack')
    )
  })
}

function TypingDots() {
  return (
    <div className="flex gap-1.5 px-1 py-1.5">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-blue-600"
          style={{ animation: `tcBlink 1.2s ${index * 0.2}s infinite` }}
        />
      ))}
    </div>
  )
}

function BotAvatar() {
  return (
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
      <Bot className="h-4 w-4" />
    </div>
  )
}

function MessageBubble({
  msg,
  onNavigate,
  onCourseSelect,
}: {
  msg: Message
  onNavigate: (url: string) => void
  onCourseSelect: (title: string) => void
}) {
  if (msg.role === 'user') {
    return (
      <div className="mb-3 flex justify-end">
        <div className="max-w-[78%] rounded-xl rounded-br-md bg-blue-600 px-4 py-2.5 text-sm font-bold leading-6 text-white shadow-lg shadow-blue-600/15">
          {msg.content}
        </div>
      </div>
    )
  }

  const { text, courseBtn, courseList } = parseReply(msg.content)
  const lines = text.split('\n')

  return (
    <div className="mb-4 flex items-start gap-2.5">
      <BotAvatar />
      <div className="max-w-[84%] rounded-xl rounded-tl-md border border-zinc-200 bg-white px-4 py-3 text-sm leading-6 text-zinc-700 shadow-sm">
        {lines.map((line, index) => {
          const trimmed = line.trim()
          if (!trimmed) return null

          if (trimmed.startsWith('•') || trimmed.startsWith('*') || trimmed.startsWith('-')) {
            return (
              <div key={index} className="my-1 flex gap-2">
                <span className="mt-0.5 shrink-0 font-black text-blue-600">•</span>
                <span>{trimmed.replace(/^[•*\-]\s*/, '')}</span>
              </div>
            )
          }

          if (trimmed.endsWith(':') && trimmed.length < 50) {
            return (
              <p
                key={index}
                className="mb-1 mt-3 text-xs font-black uppercase tracking-[0.14em] text-blue-600"
              >
                {trimmed}
              </p>
            )
          }

          return (
            <p key={index} className="my-1">
              {trimmed}
            </p>
          )
        })}

        {courseList ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {courseList.map((item) => {
              const title = item.split('|')[0]

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onCourseSelect(title)}
                  className="rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-black text-blue-700 transition hover:border-blue-200 hover:bg-white"
                >
                  {title}
                </button>
              )
            })}
          </div>
        ) : null}

        {courseBtn ? (
          <button
            type="button"
            onClick={() => onNavigate(courseBtn.url)}
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-xs font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            {courseBtn.url.startsWith('/courses/') ? `View ${courseBtn.title}` : courseBtn.title}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default function TechCraftAssistant() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'bot',
      content:
        'Hello! Welcome to Tech-Craft Institute.\n\nAsk me about courses, internships, fees, batch timing, or career guidance.',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState<ChatHistoryItem[]>([])
  const messagesRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const messagePanel = messagesRef.current
    if (messagePanel) {
      messagePanel.scrollTop = messagePanel.scrollHeight
    }
  }, [messages, loading, isOpen])

  if (pathname?.startsWith('/admin')) {
    return null
  }

  const handleNavigate = (url: string) => {
    setIsOpen(false)
    router.push(url)
  }

  const sendMessage = async (text?: string) => {
    const userText = (text || input).trim()
    if (!userText || loading) return

    setInput('')
    setIsOpen(true)
    setMessages((prev) => [...prev, { role: 'user', content: userText }])
    setLoading(true)

    try {
      const res = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userText,
          history,
        }),
      })

      const data = (await res.json()) as { reply?: string; error?: string }

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Unable to get a response.')
      }

      const reply = data.reply || 'Sorry, I could not get a response. Please try again.'

      setMessages((prev) => [...prev, { role: 'bot', content: reply }])
      setHistory((prev) => [
        ...prev.slice(-8),
        { role: 'user', text: userText },
        { role: 'assistant', text: reply },
      ])
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong.'

      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: `Oops! ${message}\n\nPlease try again in a moment or use the inquiry form for quick help.`,
        },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <>
      <style>{`
        @keyframes tcBlink {
          0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-2px); }
        }

        .tc-chat-scroll::-webkit-scrollbar {
          width: 7px;
        }

        .tc-chat-scroll::-webkit-scrollbar-thumb {
          background: #d4d4d8;
          border-radius: 999px;
        }
      `}</style>

      {isOpen ? (
        <section
          className="fixed bottom-24 right-4 z-[59] flex h-[min(560px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-[390px] flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-2xl shadow-zinc-950/20 sm:right-6 lg:bottom-6 lg:right-20"
          aria-label="Tech-Craft chatbot"
        >
          <header className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-[#f5f9ff] px-4 py-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <GraduationCap className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-black text-zinc-950">Tech-Craft Assistant</p>
                <p className="flex items-center gap-1.5 text-xs font-bold text-zinc-500">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  Course guidance online
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-50 hover:text-zinc-950"
              aria-label="Close chatbot"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div ref={messagesRef} className="tc-chat-scroll flex-1 overflow-y-auto bg-zinc-50 px-4 py-4">
            {messages.map((msg, index) => (
              <MessageBubble
                key={`${msg.role}-${index}`}
                msg={msg}
                onNavigate={handleNavigate}
                onCourseSelect={(title) => {
                  const course = getCourseByTitle(title)
                  if (course) {
                    sendMessage(`Tell me about ${course.title}`)
                    return
                  }
                  sendMessage(`Tell me about ${title}`)
                }}
              />
            ))}

            {loading ? (
              <div className="mb-4 flex items-start gap-2.5">
                <BotAvatar />
                <div className="rounded-xl rounded-tl-md border border-zinc-200 bg-white px-4 py-3 shadow-sm">
                  <TypingDots />
                </div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-zinc-200 bg-white px-4 py-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {QUICK_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => sendMessage(chip.msg)}
                  disabled={loading}
                  className="shrink-0 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-black text-zinc-600 transition hover:border-blue-100 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    sendMessage()
                  }
                }}
                placeholder="Ask about courses..."
                disabled={loading}
                className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5 text-sm font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed"
              />

              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:shadow-none"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group fixed bottom-24 right-5 z-[58] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 text-white shadow-2xl shadow-blue-600/30 transition hover:-translate-y-0.5 hover:from-blue-700 hover:via-sky-600 hover:to-cyan-600 lg:bottom-6 lg:right-6"
        aria-label="Open Tech-Craft assistant"
      >
        <Bot className="h-6 w-6 transition group-hover:scale-105" />
        <Sparkles className="absolute right-3 top-3 h-3 w-3 text-blue-100" />
      </button>
    </>
  )
}

'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Moon,
  Pencil,
  Plus,
  Search,
  Sun,
  Trash2,
  UserCircle,
  X,
} from 'lucide-react'
import type { Course } from '../../data/courses'
import type { AdminBlog, AdminEvent } from '../../lib/adminData'

type AdminView = 'dashboard' | 'courses' | 'blogs' | 'events'
type Theme = 'light' | 'dark'

type ApiState = {
  loading: boolean
  error: string
}

type LoginState = {
  email: string
  password: string
}

type ResetState = {
  email: string
  resetCode: string
  newPassword: string
}

type CourseForm = {
  slug: string
  title: string
  duration: string
  desc: string
  tagline: string
  level: string
  image: string
  modules: string
  outline: string
  highlights: string
  tools: string
  projects: string
}

type BlogForm = {
  id: string
  title: string
  description: string
  content: string
  author: string
  publishDate: string
  image: string
}

type EventForm = {
  slug: string
  title: string
  description: string
  date: string
  time: string
  venue: string
  course: string
  mode: AdminEvent['mode']
  seats: string
  highlights: string
  image: string
}

const navItems = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'courses' as const, label: 'Courses', icon: BookOpen },
  { id: 'blogs' as const, label: 'Blogs', icon: FileText },
  { id: 'events' as const, label: 'Events', icon: CalendarDays },
]

const emptyCourseForm: CourseForm = {
  slug: '',
  title: '',
  duration: '',
  desc: '',
  tagline: '',
  level: 'Beginner Friendly',
  image: '',
  modules: '',
  outline: '',
  highlights: '',
  tools: '',
  projects: '',
}

const emptyBlogForm: BlogForm = {
  id: '',
  title: '',
  description: '',
  content: '',
  author: '',
  publishDate: '',
  image: '',
}

const emptyEventForm: EventForm = {
  slug: '',
  title: '',
  description: '',
  date: '',
  time: '',
  venue: '',
  course: '',
  mode: 'Offline',
  seats: '',
  highlights: '',
  image: '',
}

function lines(items?: string[]) {
  return items?.join('\n') || ''
}

function outlineLines(course: Course) {
  return course.outline?.map((item) => `${item.title}: ${item.topics.join(', ')}`).join('\n') || ''
}

function courseToForm(course: Course): CourseForm {
  return {
    slug: course.slug,
    title: course.title,
    duration: course.duration,
    desc: course.desc,
    tagline: course.tagline,
    level: course.level,
    image: course.image,
    modules: lines(course.modules),
    outline: outlineLines(course),
    highlights: lines(course.highlights),
    tools: lines(course.tools),
    projects: lines(course.projects),
  }
}

function eventToForm(event: AdminEvent): EventForm {
  return {
    slug: event.slug,
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    venue: event.venue,
    course: event.course,
    mode: event.mode,
    seats: event.seats,
    highlights: lines(event.highlights),
    image: event.image,
  }
}

function blogToForm(blog: AdminBlog): BlogForm {
  return { ...blog }
}

async function readJson<T>(response: Response) {
  const data = await response.json() as T & { error?: string }
  if (!response.ok) {
    throw new Error(data.error || 'Request failed.')
  }

  return data
}

export default function AdminPanel() {
  const [sessionChecked, setSessionChecked] = useState(false)
  const [adminEmail, setAdminEmail] = useState('')
  const [loginForm, setLoginForm] = useState<LoginState>({ email: '', password: '' })
  const [resetForm, setResetForm] = useState<ResetState>({ email: '', resetCode: '', newPassword: '' })
  const [showReset, setShowReset] = useState(false)
  const [authError, setAuthError] = useState('')
  const [authMessage, setAuthMessage] = useState('')
  const [view, setView] = useState<AdminView>('dashboard')
  const [collapsed, setCollapsed] = useState(false)
  const [theme, setTheme] = useState<Theme>('light')
  const [apiState, setApiState] = useState<ApiState>({ loading: false, error: '' })
  const [actionMessage, setActionMessage] = useState('')
  const [courses, setCourses] = useState<Course[]>([])
  const [blogs, setBlogs] = useState<AdminBlog[]>([])
  const [events, setEvents] = useState<AdminEvent[]>([])
  const [courseSearch, setCourseSearch] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')
  const [blogSearch, setBlogSearch] = useState('')
  const [eventSearch, setEventSearch] = useState('')
  const [courseModal, setCourseModal] = useState<CourseForm | null>(null)
  const [blogModal, setBlogModal] = useState<BlogForm | null>(null)
  const [eventModal, setEventModal] = useState<EventForm | null>(null)
  const [previewBlog, setPreviewBlog] = useState<AdminBlog | null>(null)
  const [weeklyBlogs, setWeeklyBlogs] = useState<BlogForm[]>([])

  const isDark = theme === 'dark'
  const shellClass = isDark ? 'bg-zinc-950 text-white' : 'bg-[#f5f9ff] text-zinc-950'
  const panelClass = isDark ? 'border-white/10 bg-zinc-900 text-white' : 'border-zinc-200 bg-white text-zinc-950'
  const mutedClass = isDark ? 'text-zinc-400' : 'text-zinc-600'
  const inputClass = isDark
    ? 'border-white/10 bg-zinc-950 text-white placeholder:text-zinc-500 focus:border-blue-400 focus:ring-blue-500/20'
    : 'border-zinc-200 bg-zinc-50 text-zinc-950 placeholder:text-zinc-400 focus:border-blue-500 focus:ring-blue-100'

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch('/api/admin/auth/session')
        const data = await readJson<{ authenticated: boolean; email?: string | null }>(response)
        if (data.authenticated && data.email) {
          setAdminEmail(data.email)
          await loadAdminData()
        }
      } catch {
        setAuthError('')
      } finally {
        setSessionChecked(true)
      }
    }

    checkSession()
  }, [])

  async function loadAdminData() {
    setApiState({ loading: true, error: '' })
    try {
      const [coursesResponse, blogsResponse, eventsResponse] = await Promise.all([
        fetch('/api/admin/courses'),
        fetch('/api/admin/blogs'),
        fetch('/api/admin/events'),
      ])
      const coursesData = await readJson<{ courses: Course[] }>(coursesResponse)
      const blogsData = await readJson<{ blogs: AdminBlog[] }>(blogsResponse)
      const eventsData = await readJson<{ events: AdminEvent[] }>(eventsResponse)
      setCourses(coursesData.courses)
      setBlogs(blogsData.blogs)
      setEvents(eventsData.events)
    } catch (error) {
      setApiState({ loading: false, error: error instanceof Error ? error.message : 'Unable to load admin data.' })
      return
    }
    setApiState({ loading: false, error: '' })
  }

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAuthError('')
    setAuthMessage('')

    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      })
      const data = await readJson<{ email: string }>(response)
      setAdminEmail(data.email)
      await loadAdminData()
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login failed.')
    }
  }

  async function resetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAuthError('')
    setAuthMessage('')

    try {
      const response = await fetch('/api/admin/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(resetForm),
      })
      const data = await readJson<{ message: string }>(response)
      setAuthMessage(data.message)
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Password reset failed.')
    }
  }

  async function logout() {
    await fetch('/api/admin/auth/logout', { method: 'POST' })
    setAdminEmail('')
    setLoginForm({ email: '', password: '' })
    setCourses([])
    setBlogs([])
    setEvents([])
  }

  async function saveCourse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!courseModal) return

    await runAction(async () => {
      const method = courseModal.slug ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/courses', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseModal),
      })
      const data = await readJson<{ courses: Course[] }>(response)
      setCourses(data.courses)
      setCourseModal(null)
    }, 'Course saved successfully.')
  }

  async function deleteCourse(slug: string) {
    if (!window.confirm('Delete this course? This action cannot be undone.')) return

    await runAction(async () => {
      const response = await fetch(`/api/admin/courses?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' })
      const data = await readJson<{ courses: Course[] }>(response)
      setCourses(data.courses)
    }, 'Course deleted successfully.')
  }

  async function saveBlog(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!blogModal) return

    await runAction(async () => {
      const method = blogModal.id ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/blogs', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogModal),
      })
      const data = await readJson<{ blogs: AdminBlog[] }>(response)
      setBlogs(data.blogs)
      setBlogModal(null)
    }, 'Blog saved successfully.')
  }

  async function saveWeeklyBlogs() {
    await runAction(async () => {
      const response = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ blogs: weeklyBlogs }),
      })
      const data = await readJson<{ blogs: AdminBlog[] }>(response)
      setBlogs(data.blogs)
      setWeeklyBlogs([])
    }, 'Weekly blogs uploaded successfully.')
  }

  async function deleteBlog(id: string) {
    if (!window.confirm('Delete this blog? This action cannot be undone.')) return

    await runAction(async () => {
      const response = await fetch(`/api/admin/blogs?id=${encodeURIComponent(id)}`, { method: 'DELETE' })
      const data = await readJson<{ blogs: AdminBlog[] }>(response)
      setBlogs(data.blogs)
    }, 'Blog deleted successfully.')
  }

  async function saveEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!eventModal) return

    await runAction(async () => {
      const method = eventModal.slug ? 'PUT' : 'POST'
      const response = await fetch('/api/admin/events', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventModal),
      })
      const data = await readJson<{ events: AdminEvent[] }>(response)
      setEvents(data.events)
      setEventModal(null)
    }, 'Event saved successfully.')
  }

  async function deleteEvent(slug: string) {
    if (!window.confirm('Delete this event? This action cannot be undone.')) return

    await runAction(async () => {
      const response = await fetch(`/api/admin/events?slug=${encodeURIComponent(slug)}`, { method: 'DELETE' })
      const data = await readJson<{ events: AdminEvent[] }>(response)
      setEvents(data.events)
    }, 'Event deleted successfully.')
  }

  async function runAction(action: () => Promise<void>, successMessage: string) {
    setApiState({ loading: true, error: '' })
    setActionMessage('')

    try {
      await action()
      setActionMessage(successMessage)
      setApiState({ loading: false, error: '' })
    } catch (error) {
      setApiState({
        loading: false,
        error: error instanceof Error ? error.message : 'Admin action failed.',
      })
    }
  }

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch = `${course.title} ${course.desc}`.toLowerCase().includes(courseSearch.toLowerCase())
      const matchesFilter = courseFilter === 'all' || course.level === courseFilter
      return matchesSearch && matchesFilter
    })
  }, [courses, courseFilter, courseSearch])

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => `${blog.title} ${blog.author}`.toLowerCase().includes(blogSearch.toLowerCase()))
  }, [blogs, blogSearch])

  const filteredEvents = useMemo(() => {
    return events.filter((event) => `${event.title} ${event.venue}`.toLowerCase().includes(eventSearch.toLowerCase()))
  }, [events, eventSearch])

  const courseLevels = ['all', ...Array.from(new Set(courses.map((course) => course.level)))]

  if (!sessionChecked) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f5f9ff] font-black">Loading admin...</div>
  }

  if (!adminEmail) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f9ff] px-6 py-12 text-zinc-950">
        <div className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-8 shadow-2xl shadow-blue-100/70">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">Tech-Craft Admin</p>
          <h1 className="mt-3 text-4xl font-black">{showReset ? 'Reset Password' : 'Admin Login'}</h1>
          <p className="mt-3 leading-7 text-zinc-600">
            {showReset ? 'Reset works only for the configured admin email.' : 'Sign in to manage courses, blogs, and events.'}
          </p>

          <form onSubmit={showReset ? resetPassword : login} className="mt-8 grid gap-5">
            <label>
              <span className="text-sm font-black">Email</span>
              <input
                required
                type="email"
                value={showReset ? resetForm.email : loginForm.email}
                onChange={(event) => showReset
                  ? setResetForm({ ...resetForm, email: event.target.value })
                  : setLoginForm({ ...loginForm, email: event.target.value })}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            {showReset ? (
              <>
                <label>
                  <span className="text-sm font-black">Reset Code</span>
                  <input
                    required
                    value={resetForm.resetCode}
                    onChange={(event) => setResetForm({ ...resetForm, resetCode: event.target.value })}
                    className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
                <label>
                  <span className="text-sm font-black">New Password</span>
                  <input
                    required
                    minLength={8}
                    type="password"
                    value={resetForm.newPassword}
                    onChange={(event) => setResetForm({ ...resetForm, newPassword: event.target.value })}
                    className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </>
            ) : (
              <label>
                <span className="text-sm font-black">Password</span>
                <input
                  required
                  type="password"
                  value={loginForm.password}
                  onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                  className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </label>
            )}

            {authError ? <p className="rounded-md bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{authError}</p> : null}
            {authMessage ? <p className="rounded-md bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">{authMessage}</p> : null}

            <button className="rounded-md bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
              {showReset ? 'Verify Reset' : 'Login'}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setShowReset((current) => !current)
              setAuthError('')
              setAuthMessage('')
            }}
            className="mt-5 text-sm font-black text-blue-600 hover:text-blue-700"
          >
            {showReset ? 'Back to login' : 'Forgot Password?'}
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className={`min-h-screen transition ${shellClass}`}>
      <div className="flex min-h-screen">
        <aside className={`${collapsed ? 'w-20' : 'w-72'} hidden shrink-0 border-r p-4 transition-all lg:block ${isDark ? 'border-white/10 bg-zinc-900' : 'border-zinc-200 bg-white'}`}>
          <SidebarContent
            collapsed={collapsed}
            view={view}
            setView={setView}
            logout={logout}
            email={adminEmail}
          />
        </aside>

        <section className="min-w-0 flex-1">
          <header className={`sticky top-0 z-30 border-b px-4 py-4 backdrop-blur-xl lg:px-8 ${isDark ? 'border-white/10 bg-zinc-950/90' : 'border-zinc-200 bg-white/90'}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className={`text-sm font-bold ${mutedClass}`}>Admin Panel</p>
                <h1 className="text-2xl font-black capitalize">{view}</h1>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCollapsed((current) => !current)}
                  className={`hidden h-10 w-10 items-center justify-center rounded-md border transition lg:flex ${panelClass}`}
                  aria-label="Collapse sidebar"
                >
                  {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                </button>
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className={`flex h-10 w-10 items-center justify-center rounded-md border transition ${panelClass}`}
                  aria-label="Toggle theme"
                >
                  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 lg:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setView(item.id)}
                  className={`rounded-md px-3 py-2 text-sm font-black ${view === item.id ? 'bg-blue-600 text-white' : panelClass}`}
                >
                  {item.label}
                </button>
              ))}
              <button type="button" onClick={logout} className={`rounded-md px-3 py-2 text-sm font-black ${panelClass}`}>
                Logout
              </button>
            </div>
          </header>

          <div className="p-4 lg:p-8">
            {apiState.loading ? <p className="mb-5 rounded-md bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">Processing admin request...</p> : null}
            {apiState.error ? <p className="mb-5 rounded-md bg-rose-50 px-4 py-3 text-sm font-bold text-rose-700">{apiState.error}</p> : null}
            {actionMessage ? <p className="mb-5 rounded-md bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">{actionMessage}</p> : null}
            {view === 'dashboard' ? renderDashboard() : null}
            {view === 'courses' ? renderCourses() : null}
            {view === 'blogs' ? renderBlogs() : null}
            {view === 'events' ? renderEvents() : null}
          </div>
        </section>
      </div>

      {courseModal ? renderCourseModal() : null}
      {blogModal ? renderBlogModal() : null}
      {eventModal ? renderEventModal() : null}
      {previewBlog ? renderBlogPreview() : null}
    </main>
  )

  function renderDashboard() {
    const cards = [
      { label: 'Courses', value: courses.length, icon: BookOpen },
      { label: 'Blogs', value: blogs.length, icon: FileText },
      { label: 'Events', value: events.length, icon: CalendarDays },
    ]

    return (
      <div className="grid gap-6">
        <div className={`rounded-xl border p-6 shadow-xl shadow-blue-100/20 ${panelClass}`}>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className={`text-sm font-black uppercase tracking-[0.18em] ${mutedClass}`}>Welcome Back</p>
              <h2 className="mt-2 text-4xl font-black">Tech-Craft Control Center</h2>
              <p className={`mt-3 max-w-2xl leading-7 ${mutedClass}`}>Manage courses, weekly blogs, events, and your admin workspace from one responsive dashboard.</p>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-blue-600 px-5 py-4 text-white">
              <UserCircle className="h-10 w-10" />
              <div>
                <p className="text-sm font-bold text-blue-100">Admin Profile</p>
                <p className="font-black">{adminEmail}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.label} className={`rounded-xl border p-6 shadow-xl shadow-blue-100/20 ${panelClass}`}>
                <Icon className="h-7 w-7 text-blue-600" />
                <p className="mt-4 text-4xl font-black">{card.value}</p>
                <p className={`mt-1 text-sm font-bold ${mutedClass}`}>{card.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  function renderCourses() {
    return (
      <div className="grid gap-6">
        <Toolbar
          title="Course Management"
          actionLabel="Add Course"
          onAction={() => setCourseModal(emptyCourseForm)}
          search={courseSearch}
          setSearch={setCourseSearch}
          inputClass={inputClass}
        />

        <select value={courseFilter} onChange={(event) => setCourseFilter(event.target.value)} className={`w-full rounded-lg border px-4 py-3 outline-none focus:ring-4 md:w-72 ${inputClass}`}>
          {courseLevels.map((level) => <option key={level} value={level}>{level === 'all' ? 'All Levels' : level}</option>)}
        </select>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredCourses.map((course) => (
            <div key={course.slug} className={`overflow-hidden rounded-xl border shadow-xl shadow-blue-100/20 ${panelClass}`}>
              <img src={course.image} alt={course.title} className="h-44 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black">{course.title}</h3>
                    <p className="mt-1 text-sm font-bold text-blue-600">{course.duration}</p>
                  </div>
                  <ActionButtons onEdit={() => setCourseModal(courseToForm(course))} onDelete={() => deleteCourse(course.slug)} />
                </div>
                <p className={`mt-3 line-clamp-3 leading-7 ${mutedClass}`}>{course.desc}</p>
                <p className={`mt-4 text-sm font-bold ${mutedClass}`}>{course.modules.length} modules</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function renderBlogs() {
    return (
      <div className="grid gap-6">
        <Toolbar
          title="Blog Management"
          actionLabel="Add Blog"
          onAction={() => setBlogModal(emptyBlogForm)}
          search={blogSearch}
          setSearch={setBlogSearch}
          inputClass={inputClass}
        />

        <div className={`rounded-xl border p-5 ${panelClass}`}>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-black">Weekly Blog Batch Upload</h3>
              <p className={`mt-1 text-sm ${mutedClass}`}>Add multiple blog drafts and publish them together for a week.</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setWeeklyBlogs([...weeklyBlogs, { ...emptyBlogForm, publishDate: new Date().toISOString().slice(0, 10) }])} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-black text-white">Add Draft</button>
              <button type="button" disabled={!weeklyBlogs.length} onClick={saveWeeklyBlogs} className="rounded-md bg-zinc-950 px-4 py-2 text-sm font-black text-white disabled:opacity-50">Upload Week</button>
            </div>
          </div>

          {weeklyBlogs.length ? (
            <div className="mt-5 grid gap-4">
              {weeklyBlogs.map((blog, index) => (
                <div key={index} className="grid gap-3 rounded-lg border border-zinc-200 p-4 md:grid-cols-3">
                  <input placeholder="Title" value={blog.title} onChange={(event) => updateWeeklyBlog(index, 'title', event.target.value)} className={`rounded-lg border px-3 py-2 outline-none ${inputClass}`} />
                  <input placeholder="Author" value={blog.author} onChange={(event) => updateWeeklyBlog(index, 'author', event.target.value)} className={`rounded-lg border px-3 py-2 outline-none ${inputClass}`} />
                  <input type="date" value={blog.publishDate} onChange={(event) => updateWeeklyBlog(index, 'publishDate', event.target.value)} className={`rounded-lg border px-3 py-2 outline-none ${inputClass}`} />
                  <input placeholder="Image URL" value={blog.image} onChange={(event) => updateWeeklyBlog(index, 'image', event.target.value)} className={`rounded-lg border px-3 py-2 outline-none md:col-span-3 ${inputClass}`} />
                  <textarea placeholder="Description" value={blog.description} onChange={(event) => updateWeeklyBlog(index, 'description', event.target.value)} className={`rounded-lg border px-3 py-2 outline-none md:col-span-3 ${inputClass}`} />
                  <textarea placeholder="Rich content" value={blog.content} onChange={(event) => updateWeeklyBlog(index, 'content', event.target.value)} className={`min-h-28 rounded-lg border px-3 py-2 outline-none md:col-span-3 ${inputClass}`} />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <div key={blog.id} className={`overflow-hidden rounded-xl border shadow-xl shadow-blue-100/20 ${panelClass}`}>
              {blog.image ? <img src={blog.image} alt={blog.title} className="h-44 w-full object-cover" /> : null}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-black">{blog.title}</h3>
                    <p className="mt-1 text-sm font-bold text-blue-600">{blog.author} · {blog.publishDate}</p>
                  </div>
                  <ActionButtons onEdit={() => setBlogModal(blogToForm(blog))} onDelete={() => deleteBlog(blog.id)} />
                </div>
                <p className={`mt-3 line-clamp-3 leading-7 ${mutedClass}`}>{blog.description}</p>
                <button type="button" onClick={() => setPreviewBlog(blog)} className="mt-4 text-sm font-black text-blue-600">Preview Blog</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  function renderEvents() {
    return (
      <div className="grid gap-6">
        <Toolbar
          title="Event Management"
          actionLabel="Add Event"
          onAction={() => setEventModal(emptyEventForm)}
          search={eventSearch}
          setSearch={setEventSearch}
          inputClass={inputClass}
        />
        <div className="overflow-hidden rounded-xl border border-zinc-200">
          <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <div key={event.slug} className={`overflow-hidden rounded-xl border ${panelClass}`}>
                <img src={event.image} alt={event.title} className="h-40 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-black">{event.title}</h3>
                      <p className="mt-1 text-sm font-bold text-blue-600">{event.date} · {event.time}</p>
                    </div>
                    <ActionButtons onEdit={() => setEventModal(eventToForm(event))} onDelete={() => deleteEvent(event.slug)} />
                  </div>
                  <p className={`mt-3 ${mutedClass}`}>{event.venue}</p>
                  <p className={`mt-3 line-clamp-3 leading-7 ${mutedClass}`}>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  function updateWeeklyBlog(index: number, field: keyof BlogForm, value: string) {
    setWeeklyBlogs((current) => current.map((blog, currentIndex) => currentIndex === index ? { ...blog, [field]: value } : blog))
  }

  function renderCourseModal() {
    if (!courseModal) return null
    return (
      <Modal title={courseModal.slug ? 'Update Course' : 'Add Course'} onClose={() => setCourseModal(null)} panelClass={panelClass}>
        <form onSubmit={saveCourse} className="grid gap-4 md:grid-cols-2">
          <TextInput label="Course Name" value={courseModal.title} onChange={(value) => setCourseModal({ ...courseModal, title: value })} inputClass={inputClass} required />
          <TextInput label="Course Duration" value={courseModal.duration} onChange={(value) => setCourseModal({ ...courseModal, duration: value })} inputClass={inputClass} required />
          <TextInput label="Course Description" value={courseModal.desc} onChange={(value) => setCourseModal({ ...courseModal, desc: value })} inputClass={inputClass} required />
          <TextInput label="Thumbnail/Image URL" value={courseModal.image} onChange={(value) => setCourseModal({ ...courseModal, image: value })} inputClass={inputClass} required />
          <TextInput label="Level" value={courseModal.level} onChange={(value) => setCourseModal({ ...courseModal, level: value })} inputClass={inputClass} />
          <TextInput label="Tagline" value={courseModal.tagline} onChange={(value) => setCourseModal({ ...courseModal, tagline: value })} inputClass={inputClass} />
          <TextArea label="Course Modules" value={courseModal.modules} onChange={(value) => setCourseModal({ ...courseModal, modules: value })} inputClass={inputClass} />
          <TextArea label="Course Outline" value={courseModal.outline} onChange={(value) => setCourseModal({ ...courseModal, outline: value })} inputClass={inputClass} placeholder="Module title: topic one, topic two" />
          <TextArea label="Highlights" value={courseModal.highlights} onChange={(value) => setCourseModal({ ...courseModal, highlights: value })} inputClass={inputClass} />
          <TextArea label="Tools" value={courseModal.tools} onChange={(value) => setCourseModal({ ...courseModal, tools: value })} inputClass={inputClass} />
          <TextArea label="Projects" value={courseModal.projects} onChange={(value) => setCourseModal({ ...courseModal, projects: value })} inputClass={inputClass} />
          <ModalActions />
        </form>
      </Modal>
    )
  }

  function renderBlogModal() {
    if (!blogModal) return null
    return (
      <Modal title={blogModal.id ? 'Update Blog' : 'Add Blog'} onClose={() => setBlogModal(null)} panelClass={panelClass}>
        <form onSubmit={saveBlog} className="grid gap-4 md:grid-cols-2">
          <TextInput label="Blog Title" value={blogModal.title} onChange={(value) => setBlogModal({ ...blogModal, title: value })} inputClass={inputClass} required />
          <TextInput label="Author Name" value={blogModal.author} onChange={(value) => setBlogModal({ ...blogModal, author: value })} inputClass={inputClass} required />
          <TextInput label="Publish Date" type="date" value={blogModal.publishDate} onChange={(value) => setBlogModal({ ...blogModal, publishDate: value })} inputClass={inputClass} required />
          <TextInput label="Blog Image" value={blogModal.image} onChange={(value) => setBlogModal({ ...blogModal, image: value })} inputClass={inputClass} />
          <TextArea label="Blog Description" value={blogModal.description} onChange={(value) => setBlogModal({ ...blogModal, description: value })} inputClass={inputClass} />
          <TextArea label="Rich Blog Content" value={blogModal.content} onChange={(value) => setBlogModal({ ...blogModal, content: value })} inputClass={inputClass} placeholder="Write the full blog content here." />
          <ModalActions />
        </form>
      </Modal>
    )
  }

  function renderEventModal() {
    if (!eventModal) return null
    return (
      <Modal title={eventModal.slug ? 'Update Event' : 'Add Event'} onClose={() => setEventModal(null)} panelClass={panelClass}>
        <form onSubmit={saveEvent} className="grid gap-4 md:grid-cols-2">
          <TextInput label="Event Name" value={eventModal.title} onChange={(value) => setEventModal({ ...eventModal, title: value })} inputClass={inputClass} required />
          <TextInput label="Event Date" type="date" value={eventModal.date} onChange={(value) => setEventModal({ ...eventModal, date: value })} inputClass={inputClass} required />
          <TextInput label="Event Time" value={eventModal.time} onChange={(value) => setEventModal({ ...eventModal, time: value })} inputClass={inputClass} required />
          <TextInput label="Event Location" value={eventModal.venue} onChange={(value) => setEventModal({ ...eventModal, venue: value })} inputClass={inputClass} required />
          <TextInput label="Course / Category" value={eventModal.course} onChange={(value) => setEventModal({ ...eventModal, course: value })} inputClass={inputClass} />
          <TextInput label="Event Image" value={eventModal.image} onChange={(value) => setEventModal({ ...eventModal, image: value })} inputClass={inputClass} required />
          <label className="block">
            <span className="text-sm font-black">Mode</span>
            <select value={eventModal.mode} onChange={(event) => setEventModal({ ...eventModal, mode: event.target.value as AdminEvent['mode'] })} className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-4 ${inputClass}`}>
              <option>Offline</option>
              <option>Online</option>
              <option>Hybrid</option>
            </select>
          </label>
          <TextInput label="Seats" value={eventModal.seats} onChange={(value) => setEventModal({ ...eventModal, seats: value })} inputClass={inputClass} />
          <TextArea label="Event Description" value={eventModal.description} onChange={(value) => setEventModal({ ...eventModal, description: value })} inputClass={inputClass} />
          <TextArea label="Highlights" value={eventModal.highlights} onChange={(value) => setEventModal({ ...eventModal, highlights: value })} inputClass={inputClass} />
          <ModalActions />
        </form>
      </Modal>
    )
  }

  function renderBlogPreview() {
    if (!previewBlog) return null
    return (
      <Modal title="Blog Preview" onClose={() => setPreviewBlog(null)} panelClass={panelClass}>
        <article>
          {previewBlog.image ? <img src={previewBlog.image} alt={previewBlog.title} className="mb-6 h-64 w-full rounded-lg object-cover" /> : null}
          <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-600">{previewBlog.author} · {previewBlog.publishDate}</p>
          <h2 className="mt-3 text-4xl font-black">{previewBlog.title}</h2>
          <p className={`mt-4 text-lg leading-8 ${mutedClass}`}>{previewBlog.description}</p>
          <div className={`mt-6 whitespace-pre-line leading-8 ${mutedClass}`}>{previewBlog.content}</div>
        </article>
      </Modal>
    )
  }
}

function SidebarContent({
  collapsed,
  view,
  setView,
  logout,
  email,
}: {
  collapsed: boolean
  view: AdminView
  setView: (view: AdminView) => void
  logout: () => void
  email: string
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl font-black text-white">TC</div>
        {!collapsed ? (
          <>
            <h2 className="mt-4 text-2xl font-black">Tech-Craft</h2>
            <p className="mt-1 truncate text-sm font-bold text-zinc-500">{email}</p>
          </>
        ) : null}
      </div>

      <nav className="grid gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = view === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-black transition ${active ? 'bg-blue-600 text-white' : 'text-zinc-600 hover:bg-blue-50 hover:text-blue-700'}`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed ? item.label : null}
            </button>
          )
        })}
      </nav>

      <button type="button" onClick={logout} className="mt-auto flex items-center gap-3 rounded-md px-3 py-3 text-sm font-black text-rose-600 transition hover:bg-rose-50">
        <LogOut className="h-5 w-5" />
        {!collapsed ? 'Logout' : null}
      </button>
    </div>
  )
}

function Toolbar({
  title,
  actionLabel,
  onAction,
  search,
  setSearch,
  inputClass,
}: {
  title: string
  actionLabel: string
  onAction: () => void
  search: string
  setSearch: (value: string) => void
  inputClass: string
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <h2 className="text-3xl font-black">{title}</h2>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search..." className={`w-full rounded-lg border py-3 pl-10 pr-4 outline-none focus:ring-4 sm:w-72 ${inputClass}`} />
        </label>
        <button type="button" onClick={onAction} className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
          <Plus className="h-4 w-4" />
          {actionLabel}
        </button>
      </div>
    </div>
  )
}

function ActionButtons({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex gap-2">
      <button type="button" onClick={onEdit} className="flex h-9 w-9 items-center justify-center rounded-md bg-blue-50 text-blue-600 transition hover:bg-blue-600 hover:text-white" aria-label="Edit">
        <Pencil className="h-4 w-4" />
      </button>
      <button type="button" onClick={onDelete} className="flex h-9 w-9 items-center justify-center rounded-md bg-rose-50 text-rose-600 transition hover:bg-rose-600 hover:text-white" aria-label="Delete">
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  )
}

function Modal({ title, children, onClose, panelClass }: { title: string; children: React.ReactNode; onClose: () => void; panelClass: string }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-zinc-950/60 px-4 py-6 backdrop-blur-sm">
      <div className={`max-h-[calc(100vh-3rem)] w-full max-w-5xl overflow-y-auto rounded-xl border p-6 shadow-2xl shadow-zinc-950/30 ${panelClass}`}>
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-black">{title}</h2>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100 text-zinc-950 transition hover:bg-zinc-200" aria-label="Close modal">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function TextInput({ label, value, onChange, inputClass, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; inputClass: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-sm font-black">{label}</span>
      <input required={required} type={type} value={value} onChange={(event) => onChange(event.target.value)} className={`mt-2 w-full rounded-lg border px-4 py-3 outline-none focus:ring-4 ${inputClass}`} />
    </label>
  )
}

function TextArea({ label, value, onChange, inputClass, placeholder = '' }: { label: string; value: string; onChange: (value: string) => void; inputClass: string; placeholder?: string }) {
  return (
    <label className="block md:col-span-2">
      <span className="text-sm font-black">{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className={`mt-2 min-h-28 w-full rounded-lg border px-4 py-3 outline-none focus:ring-4 ${inputClass}`} />
    </label>
  )
}

function ModalActions() {
  return (
    <div className="flex justify-end md:col-span-2">
      <button className="rounded-md bg-blue-600 px-6 py-3 font-black text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
        Save Changes
      </button>
    </div>
  )
}

import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { courses as defaultCourses, type Course } from '../data/courses'
import { events as defaultEvents, type EventItem } from '../data/events'

export type AdminBlog = {
  id: string
  title: string
  description: string
  content: string
  author: string
  publishDate: string
  image: string
}

export type AdminEvent = EventItem & {
  image: string
}

export type AdminInquiry = {
  id: string
  submittedAt: string
  name: string
  address: string
  course: string
  courseTitle: string
  email: string
  phone: string
  message: string
  notifyEmail: string
}

const dataDirectory = path.join(process.cwd(), 'data', 'admin')
const coursesPath = path.join(dataDirectory, 'courses.json')
const blogsPath = path.join(dataDirectory, 'blogs.json')
const eventsPath = path.join(dataDirectory, 'events.json')
const inquiriesPath = path.join(dataDirectory, 'inquiries.json')

async function ensureDirectory() {
  await mkdir(dataDirectory, { recursive: true })
}

async function readJson<T>(filePath: string, fallback: T) {
  try {
    const file = await readFile(filePath, 'utf8')
    const parsed = JSON.parse(file)
    return parsed as T
  } catch {
    await ensureDirectory()
    await writeFile(filePath, `${JSON.stringify(fallback, null, 2)}\n`, 'utf8')
    return fallback
  }
}

async function writeJson<T>(filePath: string, value: T) {
  await ensureDirectory()
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
}

const defaultAdminEvents: AdminEvent[] = defaultEvents.map((event) => ({
  ...event,
  image: '/images/pythonfullstack.png',
}))

export async function readAdminCourses() {
  const courses = await readJson<Course[]>(coursesPath, defaultCourses)
  if (!courses.length && defaultCourses.length) {
    await writeJson(coursesPath, defaultCourses)
    return defaultCourses
  }

  return courses
}

export async function writeAdminCourses(courses: Course[]) {
  await writeJson(coursesPath, courses)
}

export async function readAdminBlogs() {
  return readJson<AdminBlog[]>(blogsPath, [])
}

export async function writeAdminBlogs(blogs: AdminBlog[]) {
  await writeJson(blogsPath, blogs)
}

export function getTodayInIndia() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

export function getPublishedBlogs(blogs: AdminBlog[], today = getTodayInIndia()) {
  return blogs
    .filter((blog) => blog.publishDate <= today)
    .sort((first, second) => second.publishDate.localeCompare(first.publishDate))
}

export function getBlogById(blogs: AdminBlog[], id: string, today = getTodayInIndia()) {
  return getPublishedBlogs(blogs, today).find((blog) => blog.id === id)
}

export async function readAdminEvents() {
  return readJson<AdminEvent[]>(eventsPath, defaultAdminEvents)
}

export async function writeAdminEvents(events: AdminEvent[]) {
  await writeJson(eventsPath, events)
}

export async function readAdminInquiries() {
  return readJson<AdminInquiry[]>(inquiriesPath, [])
}

export async function appendAdminInquiry(inquiry: AdminInquiry) {
  const inquiries = await readAdminInquiries()
  await writeJson(inquiriesPath, [inquiry, ...inquiries])
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function listFromText(value: string) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function outlineFromText(value: string) {
  return value
    .split('\n')
    .map((line) => {
      const [title, topics = ''] = line.split(':')
      return {
        title: title?.trim() || 'Module',
        topics: topics.split(',').map((topic) => topic.trim()).filter(Boolean),
      }
    })
    .filter((item) => item.title)
}

import { NextResponse } from 'next/server'
import { readAdminCourses } from '../../../lib/adminData'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type ChatHistoryItem = {
  role: 'user' | 'assistant'
  text: string
}

type ChatbotRequest = {
  message?: string
  history?: ChatHistoryItem[]
}

type CourseRecord = Awaited<ReturnType<typeof readAdminCourses>>[number]

const enrollmentReply =
  'You can enroll by opening the inquiry form and sharing your name, phone number, preferred course, and message.\n\nOur team will contact you with batch timing, fees, and guidance.\nCOURSE_BTN:{"title":"Enroll Now","url":"/inquiry"}'

const contactPhone = '+91 88498 70596'
const contactEmail = 'techcraft1999@gmail.com'
const officeTiming = '10.30 AM - 06.30 PM, Monday - Saturday'
const bullet = '\u2022'
const demoReply = `Yes, demo sessions are available at Tech-Craft. You can attend a demo class or trial guidance session before choosing your course.

Demo Class Details:
${bullet} Free session availability depends on the current course and batch schedule
${bullet} You can discuss course content, duration, projects, fees guidance, and career path
${bullet} Demo timing is confirmed by the Tech-Craft team after registration

Registration Process:
${bullet} Submit the inquiry form with your preferred course and mention demo class
${bullet} Or contact Tech-Craft directly

Timings: ${officeTiming}
Phone: ${contactPhone}
Email: ${contactEmail}
COURSE_BTN:{"title":"Book Demo Session","url":"/inquiry"}`

const courseAliases: Record<string, string[]> = {
  reactjs: ['react', 'reactjs', 'react js'],
  python: ['python'],
  genai: ['genai', 'generative ai', 'generative', 'ai course'],
  sql: ['sql', 'database'],
  nodejs: ['node', 'nodejs', 'node js'],
  'basic-coding': ['basic coding', 'basic coding c c++', 'c c++', 'c++', 'c programming'],
  'mern-stack': ['mern', 'mern stack'],
  'full-stack': ['full stack', 'python full stack', 'python fullstack'],
}

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9+#]+/g, ' ').trim()
}

function courseUrl(slug: string) {
  return `/courses/${slug}`
}

function isDemoIntent(normalized: string) {
  return (
    normalized.includes('demo') ||
    normalized.includes('trial') ||
    normalized.includes('free session') ||
    normalized.includes('sample class') ||
    normalized.includes('attend class')
  )
}

function isAllCoursesIntent(normalized: string) {
  return (
    normalized.includes('all course') ||
    normalized.includes('which course') ||
    normalized.includes('what course') ||
    normalized.includes('course list') ||
    normalized.includes('list courses') ||
    normalized.includes('courses offered') ||
    normalized.includes('available courses')
  )
}

function findMatchedCourse(courses: CourseRecord[], normalized: string) {
  return courses.find((course) => {
    const names = [course.title, course.slug, ...(courseAliases[course.slug] || [])].map(normalize)
    return names.some((name) => normalized.includes(name))
  })
}

function formatOfficialOutline(course: CourseRecord) {
  if (course.outline?.length) {
    return course.outline
      .map((section, index) => {
        const topics = section.topics.map((topic) => `${bullet} ${topic}`).join('\n')
        return `Module ${index + 1}: ${section.title}\n${topics}`
      })
      .join('\n\n')
  }

  return course.modules.map((module, index) => `Module ${index + 1}: ${module}`).join('\n')
}

function formatCourseReply(course: CourseRecord) {
  const technologies = course.tools.length ? course.tools : course.modules

  return `${course.title}
${course.desc}
${course.tagline}

Technologies Covered:
${technologies.map((item) => `${bullet} ${item}`).join('\n')}

Official Course Outline:
${formatOfficialOutline(course)}

Official Features:
${course.highlights.map((item) => `${bullet} ${item}`).join('\n')}

Projects:
${course.projects.map((item) => `${bullet} ${item}`).join('\n')}

Duration: ${course.duration}
Level: ${course.level}
COURSE_BTN:{"title":"${course.title}","url":"${courseUrl(course.slug)}"}`
}

async function buildLocalReply(message: string) {
  const courses = await readAdminCourses()
  const normalized = normalize(message)
  const matchedCourse = findMatchedCourse(courses, normalized)

  if (isDemoIntent(normalized)) {
    return demoReply
  }

  if (matchedCourse) {
    return formatCourseReply(matchedCourse)
  }

  if (normalized.includes('enroll') || normalized.includes('admission') || normalized.includes('join')) {
    return enrollmentReply
  }

  if (normalized.includes('internship')) {
    return 'Yes, Tech-Craft provides internship-focused learning with practical tasks, project work, mentoring, and career support.\n\nYou can explore the internship page or ask our team for current batch details.\nCOURSE_BTN:{"title":"Internship","url":"/internship"}'
  }

  if (
    isAllCoursesIntent(normalized) ||
    normalized === 'courses' ||
    normalized === 'course'
  ) {
    const courseList = courses.map((course) => `${course.title}|${courseUrl(course.slug)}`)
    return `Tech-Craft offers career-focused courses in web development, coding, databases, and AI.\n\nCourses:\n${courses
      .map((course) => `- ${course.title}: ${course.duration}`)
      .join('\n')}\nCOURSE_LIST:${JSON.stringify(courseList)}`
  }

  if (normalized.includes('fee') || normalized.includes('fees') || normalized.includes('price') || normalized.includes('cost')) {
    return 'Fees can vary by course, batch type, and training plan.\n\nPlease share your preferred course through the inquiry form, and the Tech-Craft team will give you the latest fee and batch details.\nCOURSE_BTN:{"title":"Ask About Fees","url":"/inquiry"}'
  }

  return null
}

async function buildPrompt(message: string, history: ChatHistoryItem[]) {
  const courses = await readAdminCourses()
  const courseContext = courses
    .map((course) => {
      return [
        `Title: ${course.title}`,
        `URL: ${courseUrl(course.slug)}`,
        `Description: ${course.desc}`,
        `Tagline: ${course.tagline}`,
        `Duration: ${course.duration}`,
        `Level: ${course.level}`,
        `Highlights: ${course.highlights.join('; ')}`,
        `Tools: ${course.tools.join(', ')}`,
        `Modules: ${course.modules.join('; ')}`,
        `Outline: ${(course.outline || [])
          .map((section) => `${section.title}: ${section.topics.join(', ')}`)
          .join(' | ')}`,
        `Projects: ${course.projects.join('; ')}`,
      ].join('\n')
    })
    .join('\n\n')

  const recentHistory = history
    .slice(-8)
    .map((item) => `${item.role}: ${item.text}`)
    .join('\n')

  return `You are the Tech-Craft Institute website assistant.
Answer only about Tech-Craft courses, internships, enrollment, batch guidance, fees guidance, and career guidance.
Use a warm, concise tone. Keep replies under 140 words.
Use plain text lines. For lists, start items with the "•" character.
Use only the course data shown below. Do not add tools, topics, modules, projects, fees, guarantees, addresses, phone numbers, or batch dates that are not present in the official data below.
If official data is missing for a detail, say the institute team can confirm it.
For demo, demo class, trial session, sample class, or free session requests, explain demo availability, registration process, timing confirmation, and contact details.
Use these contact details for demo replies: Phone ${contactPhone}, Email ${contactEmail}, Timings ${officeTiming}.
For demo replies, append exactly:
COURSE_BTN:{"title":"Book Demo Session","url":"/inquiry"}
When the student asks about a specific course, first show the course information, then append exactly one marker at the end:
COURSE_BTN:{"title":"Course Title","url":"/courses/course-slug"}
Specific course replies must include:
Brief overview, "Technologies Covered:", "Official Course Outline:", "Official Features:", "Projects:", "Duration:", "Level:", then the COURSE_BTN marker.
For all-course answers, append:
COURSE_LIST:["Title|/courses/slug","Title|/courses/slug"]
Course-list buttons are only for selecting a course in chat; do not tell users the page opens automatically.

Courses:
${courseContext}

Recent chat:
${recentHistory || 'No previous chat.'}

Student message:
${message}`
}

async function askGemini(message: string, history: ChatHistoryItem[]) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return null
  }

  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash'
  const prompt = await buildPrompt(message, history)
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.35,
            maxOutputTokens: 360,
          },
        }),
      }
    )

    if (!response.ok) {
      return null
    }

    const data = (await response.json()) as {
      candidates?: {
        content?: {
          parts?: {
            text?: string
          }[]
        }
      }[]
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null
  } catch {
    return null
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ChatbotRequest
    const message = body.message?.trim()

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 })
    }

    if (isDemoIntent(normalize(message))) {
      return NextResponse.json({ reply: demoReply })
    }

    const localReply = await buildLocalReply(message)
    if (localReply) {
      return NextResponse.json({ reply: localReply })
    }

    const history = Array.isArray(body.history) ? body.history : []
    const geminiReply = await askGemini(message, history)
    const reply = geminiReply || 'I can help you choose a Tech-Craft course, compare learning paths, explain internships, or guide you toward enrollment.\n\nPopular options include Python, ReactJS, MERN Stack, Full Stack, SQL, NodeJs, Basic Coding, and GenAI.\nCOURSE_LIST:["Python|/courses/python","ReactJS|/courses/reactjs","MERN Stack|/courses/mern-stack","GenAI|/courses/genai"]'

    return NextResponse.json({ reply })
  } catch {
    return NextResponse.json(
      { error: 'Unable to answer right now. Please try again.' },
      { status: 500 }
    )
  }
}

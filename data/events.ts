export type EventItem = {
  slug: string
  title: string
  course: string
  date: string
  time: string
  venue: string
  mode: 'Offline' | 'Online' | 'Hybrid'
  seats: string
  description: string
  highlights: string[]
}

export const events: EventItem[] = [
  {
    slug: 'react-project-workshop',
    title: 'React Project Building Workshop',
    course: 'ReactJS',
    date: '2026-05-24',
    time: '11:00 AM - 01:00 PM',
    venue: 'Tech-Craft Academy, Ahmedabad',
    mode: 'Offline',
    seats: 'Limited seats',
    description: 'A practical workshop for students who want to understand React components, state, and project structure through a guided build.',
    highlights: ['Live component building', 'React project structure', 'Doubt solving session'],
  },
  {
    slug: 'sql-database-session',
    title: 'SQL Database Basics Session',
    course: 'SQL',
    date: '2026-05-31',
    time: '10:30 AM - 12:30 PM',
    venue: 'Tech-Craft Academy, Ahmedabad',
    mode: 'Offline',
    seats: 'Open for beginners',
    description: 'Learn how databases work, how tables connect, and how SQL queries are used in real projects and reporting.',
    highlights: ['Database fundamentals', 'SELECT and WHERE practice', 'Real query examples'],
  },
  {
    slug: 'mern-stack-career-talk',
    title: 'MERN Stack Career Roadmap',
    course: 'MERN Stack',
    date: '2026-06-07',
    time: '04:00 PM - 05:30 PM',
    venue: 'Tech-Craft Academy, Ahmedabad',
    mode: 'Hybrid',
    seats: 'Registration required',
    description: 'A roadmap session covering frontend, backend, database, project building, and placement preparation for MERN learners.',
    highlights: ['MERN learning path', 'Portfolio project guidance', 'Placement preparation tips'],
  },
  {
    slug: 'python-api-demo',
    title: 'Python API Demo Class',
    course: 'Python',
    date: '2026-06-14',
    time: '11:30 AM - 01:00 PM',
    venue: 'Tech-Craft Academy, Ahmedabad',
    mode: 'Offline',
    seats: 'Limited seats',
    description: 'A beginner-friendly demo class showing how Python can be used for APIs, automation, and backend workflows.',
    highlights: ['Python backend basics', 'API request and response flow', 'Postman testing overview'],
  },
]

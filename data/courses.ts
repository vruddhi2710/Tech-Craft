export type Course = {
  slug: string
  title: string
  desc: string
  tagline: string
  duration: string
  level: string
  image: string
  highlights: string[]
  tools: string[]
  modules: string[]
  projects: string[]
}

export const courses: Course[] = [
  {
    slug: 'reactjs',
    title: 'ReactJS',
    desc: 'Frontend Development with live projects',
    tagline: 'Build fast, modern interfaces with components, hooks, routing, and real production patterns.',
    duration: '8 weeks',
    level: 'Beginner to Intermediate',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c',
    highlights: [
      'Learn React fundamentals through hands-on UI builds',
      'Create responsive pages with reusable components',
      'Connect frontend apps to APIs and deploy them online',
    ],
    tools: ['React', 'Next.js', 'Tailwind CSS', 'GitHub', 'Vercel'],
    modules: [
      'JavaScript refresh and component thinking',
      'Props, state, events, hooks, and forms',
      'Routing, API calls, loading states, and deployment',
    ],
    projects: ['Portfolio website', 'Course dashboard', 'API-powered mini app'],
  },
  {
    slug: 'python',
    title: 'Python',
    desc: 'Automation + AI + backend development',
    tagline: 'Use Python to automate tasks, work with data, build APIs, and create practical AI workflows.',
    duration: '10 weeks',
    level: 'Beginner Friendly',
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935',
    highlights: [
      'Start from Python basics and move into real automation',
      'Build backend APIs and connect them to simple interfaces',
      'Use Python libraries for files, data, and AI-powered tasks',
    ],
    tools: ['Python', 'Flask', 'FastAPI', 'Pandas', 'OpenAI APIs'],
    modules: [
      'Python syntax, functions, loops, and data structures',
      'Files, automation scripts, packages, and virtual environments',
      'APIs, data workflows, and AI integrations',
    ],
    projects: ['Automation script', 'Backend API', 'AI assistant prototype'],
  },
  {
    slug: 'genai',
    title: 'GenAI',
    desc: 'AI tools, prompt engineering & APIs',
    tagline: 'Learn how modern AI tools work and build useful AI features with prompts, workflows, and APIs.',
    duration: '6 weeks',
    level: 'Beginner to Intermediate',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
    highlights: [
      'Understand prompt structure, model behavior, and AI workflows',
      'Create assistants, content tools, and automation flows',
      'Build API-based AI features for websites and apps',
    ],
    tools: ['ChatGPT', 'OpenAI APIs', 'Prompt Engineering', 'Automation Tools', 'No-code AI'],
    modules: [
      'Prompting fundamentals and structured outputs',
      'AI tools for research, content, coding, and productivity',
      'Building AI apps with APIs and safe evaluation habits',
    ],
    projects: ['Prompt toolkit', 'AI content workflow', 'Custom AI app prototype'],
  },
  {
    slug: 'web-design',
    title: 'Web Design',
    desc: 'Figma, Canva & UI/UX basics',
    tagline: 'Design clean, modern websites with strong layouts, visual hierarchy, and user-friendly flows.',
    duration: '6 weeks',
    level: 'Beginner Friendly',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e',
    highlights: [
      'Learn layout, color, typography, spacing, and UI patterns',
      'Design polished website screens in Figma and Canva',
      'Create assets and handoff-ready designs for development',
    ],
    tools: ['Figma', 'Canva', 'Wireframes', 'UI Kits', 'Responsive Design'],
    modules: [
      'Design basics, visual hierarchy, and layout systems',
      'Figma components, prototyping, and responsive screens',
      'Brand assets, social creatives, and developer handoff',
    ],
    projects: ['Landing page design', 'Mobile app screen set', 'Brand kit and portfolio case study'],
  },
]

export function getCourse(slug: string) {
  return courses.find((course) => course.slug === slug)
}

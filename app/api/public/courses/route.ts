import { NextResponse } from 'next/server'
import { readAdminCourses } from '../../../../lib/adminData'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  const courses = await readAdminCourses()
  return NextResponse.json({
    courses: courses.map((course) => ({
      slug: course.slug,
      title: course.title,
    })),
  })
}

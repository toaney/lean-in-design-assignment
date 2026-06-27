import { NextRequest, NextResponse } from 'next/server'
import { ARTICLES } from '@/lib/data/articles'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const page  = Math.max(1, parseInt(searchParams.get('page')  ?? '1', 10))
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))
  const topicsParam   = searchParams.get('topics')
  const audienceParam = searchParams.get('audience')

  let filtered = ARTICLES.slice()

  if (topicsParam) {
    const topics = topicsParam.split(',').map(t => t.trim()).filter(Boolean)
    if (topics.length) filtered = filtered.filter(a => topics.some(t => a.topics.includes(t)))
  }

  if (audienceParam) {
    const audience = audienceParam.split(',').map(a => a.trim()).filter(Boolean)
    if (audience.length) filtered = filtered.filter(a => audience.some(aud => a.audience.includes(aud)))
  }

  const total = filtered.length
  const start = (page - 1) * limit
  const articles = filtered.slice(start, start + limit)

  return NextResponse.json({ articles, total, page, limit, has_more: start + limit < total })
}

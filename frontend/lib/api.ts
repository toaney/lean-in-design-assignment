import type { ArticlesResponse, CirclesResponse, HomeStats, CircleStep } from './types'

const SERVER_API = process.env.API_URL || 'http://localhost:8000'
const CLIENT_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

function apiBase(isServer = false) {
  return isServer ? SERVER_API : CLIENT_API
}

export async function fetchArticles(
  page = 1,
  limit = 20,
  topics: string[] = [],
  audience: string[] = [],
  isServer = false
): Promise<ArticlesResponse> {
  const params = new URLSearchParams({ page: String(page), limit: String(limit) })
  const filteredTopics = topics.filter(t => t !== 'All Topics')
  const filteredAudience = audience.filter(a => a !== 'For Everyone')
  if (filteredTopics.length) params.set('topics', filteredTopics.join(','))
  if (filteredAudience.length) params.set('audience', filteredAudience.join(','))

  const res = await fetch(`${apiBase(isServer)}/api/articles?${params}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error('Failed to fetch articles')
  return res.json()
}

export async function fetchCircles(isServer = false): Promise<CirclesResponse> {
  const res = await fetch(`${apiBase(isServer)}/api/circles`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error('Failed to fetch circles')
  return res.json()
}

export async function fetchCircleSteps(isServer = false): Promise<{ steps: CircleStep[] }> {
  const res = await fetch(`${apiBase(isServer)}/api/circles/steps`, {
    next: { revalidate: 86400 },
  })
  if (!res.ok) throw new Error('Failed to fetch circle steps')
  return res.json()
}

export async function fetchHomeStats(isServer = false): Promise<HomeStats> {
  const res = await fetch(`${apiBase(isServer)}/api/home/stats`, {
    next: { revalidate: 86400 },
  })
  if (!res.ok) throw new Error('Failed to fetch home stats')
  return res.json()
}

export async function fetchFeaturedArticles(isServer = false): Promise<{ articles: import('./types').Article[] }> {
  const res = await fetch(`${apiBase(isServer)}/api/home/featured`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error('Failed to fetch featured articles')
  return res.json()
}

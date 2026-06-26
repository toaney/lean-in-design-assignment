'use client'

import { useState, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import ArticleCard from './ArticleCard'

const Masonry = dynamic(() => import('masonic').then(m => m.Masonry), { ssr: false })
import ArticleFilters from './ArticleFilters'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import type { Article } from '@/lib/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Props {
  initialArticles: Article[]
  initialHasMore: boolean
  initialTotal: number
}

async function getArticles(page: number, topics: string[], audience: string[]) {
  const params = new URLSearchParams({ page: String(page), limit: '20' })
  const filteredTopics = topics.filter(t => t !== 'All Topics')
  const filteredAudience = audience.filter(a => a !== 'For Everyone')
  if (filteredTopics.length) params.set('topics', filteredTopics.join(','))
  if (filteredAudience.length) params.set('audience', filteredAudience.join(','))
  const res = await fetch(`${API_URL}/api/articles?${params}`)
  if (!res.ok) throw new Error('Failed to fetch articles')
  return res.json()
}

export default function ArticlesClient({ initialArticles, initialHasMore, initialTotal }: Props) {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(initialTotal)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedAudience, setSelectedAudience] = useState<string[]>([])
  const sentinelRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)
    try {
      const nextPage = page + 1
      const data = await getArticles(nextPage, selectedTopics, selectedAudience)
      setArticles(prev => [...prev, ...data.articles])
      setHasMore(data.has_more)
      setPage(nextPage)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page, selectedTopics, selectedAudience])

  useIntersectionObserver(sentinelRef, loadMore, { rootMargin: '300px' })

  const handleFilterChange = useCallback(async (topics: string[], audience: string[]) => {
    setSelectedTopics(topics)
    setSelectedAudience(audience)
    setLoading(true)
    try {
      const data = await getArticles(1, topics, audience)
      setArticles(data.articles)
      setHasMore(data.has_more)
      setTotal(data.total)
      setPage(1)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <>
      <ArticleFilters
        selectedTopics={selectedTopics}
        selectedAudience={selectedAudience}
        onChange={handleFilterChange}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Result count */}
        <p className="mb-6 text-sm font-light text-gray-500" aria-live="polite" aria-atomic="true">
          {loading && articles.length === 0
            ? 'Loading…'
            : `Showing ${articles.length} of ${total} articles`}
        </p>

        {articles.length === 0 && !loading && (
          <div className="py-20 text-center">
            <p className="text-lg font-light text-gray-500">
              No articles match the selected filters.
            </p>
            <button
              onClick={() => handleFilterChange([], [])}
              className="mt-4 text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              Clear all filters
            </button>
          </div>
        )}

        {articles.length > 0 && (
          <Masonry
            key={`${selectedTopics.join(',')}-${selectedAudience.join(',')}-${articles.length}`}
            items={articles}
            render={ArticleCard}
            columnWidth={280}
            columnGutter={16}
            rowGutter={16}
            itemKey={(item: any) => item?.id}
            overscanBy={2}
          />
        )}

        {/* Intersection sentinel */}
        <div ref={sentinelRef} className="h-1" aria-hidden="true" />

        {/* Loading indicator */}
        {loading && articles.length > 0 && (
          <div
            className="flex justify-center py-10"
            role="status"
            aria-live="polite"
            aria-label="Loading more articles"
          >
            <span className="inline-block h-6 w-6 animate-spin rounded-full border-2
              border-primary border-t-transparent" />
          </div>
        )}

        {!hasMore && articles.length > 0 && !loading && (
          <p className="py-10 text-center text-sm font-light text-gray-400">
            You've seen all {total} articles
          </p>
        )}
      </div>
    </>
  )
}

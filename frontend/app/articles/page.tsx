import type { Metadata } from 'next'
import { fetchArticles } from '@/lib/api'
import ArticlesClient from '@/components/articles/ArticlesClient'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Research, news, and practical advice to help women navigate the workplace, advance their careers, and inspire the next generation.',
}

export default async function ArticlesPage() {
  const data = await fetchArticles(1, 20, [], [], true)

  return (
    <>
      {/* Page header */}
      <div className="px-4 pb-3 pt-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-4xl font-bold leading-tight text-charcoal md:text-5xl">
            Articles
          </h1>
        </div>
      </div>

      <ArticlesClient
        initialArticles={data.articles}
        initialHasMore={data.has_more}
        initialTotal={data.total}
      />
    </>
  )
}

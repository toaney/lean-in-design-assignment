import type { Metadata } from 'next'
import { ARTICLES } from '@/lib/data/articles'
import ArticlesClient from '@/components/articles/ArticlesClient'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Research, news, and practical advice to help women navigate the workplace, advance their careers, and inspire the next generation.',
}

export default function ArticlesPage() {
  const initial = ARTICLES.slice(0, 20)

  return (
    <>
      <div className="px-4 pb-3 pt-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="font-display text-4xl font-bold leading-tight text-charcoal md:text-5xl">
            Articles
          </h1>
        </div>
      </div>

      <ArticlesClient
        initialArticles={initial}
        initialHasMore={ARTICLES.length > 20}
        initialTotal={ARTICLES.length}
      />
    </>
  )
}

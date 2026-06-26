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
      <div className="bg-secondary px-4 py-14 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
            Research & stories
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            Articles
          </h1>
          <p className="mt-3 max-w-xl text-base font-light text-white/75">
            Data-backed insights, inspiring stories, and practical advice for women at every stage.
          </p>
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

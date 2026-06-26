import Image from 'next/image'
import Link from 'next/link'
import type { Article } from '@/lib/types'

interface Props {
  articles: Article[]
}

export default function ResearchSection({ articles }: Props) {
  return (
    <section aria-labelledby="research-heading" className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
              Latest insights
            </p>
            <h2
              id="research-heading"
              className="font-display text-3xl font-bold text-secondary md:text-4xl"
            >
              Research, news, and stories
            </h2>
          </div>
          <Link
            href="/articles"
            className="shrink-0 text-sm font-semibold text-primary underline-offset-4
              hover:underline focus-visible:underline"
          >
            See all articles →
          </Link>
        </div>

        {/* Article grid */}
        <ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
        >
          {articles.slice(0, 6).map(article => (
            <li key={article.id}>
              <article className="group h-full overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read: ${article.title}`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <Image
                      src={article.image_url}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    {article.topics[0] && (
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal">
                        {article.topics[0]}
                      </p>
                    )}
                    <h3 className="font-display text-lg font-semibold leading-snug text-secondary
                      group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-relaxed text-gray-600 line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

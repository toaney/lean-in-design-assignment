import Image from 'next/image'
import type { Article } from '@/lib/types'

interface MasonicRenderProps {
  index: number
  data: Article
  width: number
}

export default function ArticleCard({ data: article }: MasonicRenderProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white
      transition-shadow hover:shadow-md">
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read article: ${article.title}`}
      >
        {/* Thumbnail */}
        <div className="relative w-full overflow-hidden bg-gray-100" style={{ aspectRatio: '16/9' }}>
          <Image
            src={article.image_url}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Topic tag */}
          {article.topics[0] && (
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-teal">
              {article.topics[0]}
            </p>
          )}

          {/* Title */}
          <h2 className="font-display text-sm font-semibold leading-snug text-secondary
            group-hover:text-primary transition-colors sm:text-base">
            {article.title}
          </h2>

          {/* Summary */}
          <p className="mt-2 text-xs font-light leading-relaxed text-gray-600 line-clamp-2 sm:text-sm">
            {article.summary}
          </p>

          {/* Audience tags */}
          {article.audience.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Relevant for">
              {article.audience.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary/8 px-2 py-0.5 text-xs font-light text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </article>
  )
}

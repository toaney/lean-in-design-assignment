import Image from 'next/image'
import type { Circle } from '@/lib/types'

interface Props {
  circles: Circle[]
}

export default function CirclesDirectory({ circles }: Props) {
  return (
    <section aria-labelledby="directory-heading" className="py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
            Your community
          </p>
          <h2
            id="directory-heading"
            className="font-display text-3xl font-bold text-secondary md:text-4xl"
          >
            Browse Circles
          </h2>
          <p className="mt-3 max-w-xl text-base font-light text-gray-600">
            Find a Circle that fits your life — by location, career stage, or interest.
          </p>
        </div>

        <ul
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
          aria-label="Available Lean In Circles"
        >
          {circles.map(circle => (
            <li key={circle.id}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl
                border border-gray-200 bg-white transition-shadow hover:shadow-md">
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <Image
                    src={circle.image_url}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {circle.remote && (
                    <span className="absolute right-2 top-2 rounded-full bg-teal px-2.5 py-0.5
                      text-xs font-semibold text-white">
                      Remote
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                    {circle.category}
                  </p>
                  <h3 className="mt-1 font-display text-base font-semibold text-secondary">
                    {circle.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-400">{circle.location}</p>
                  <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-gray-600 line-clamp-2">
                    {circle.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {circle.member_count} members
                    </span>
                    <a
                      href="https://leanin.org/circles/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded bg-primary px-3 py-1.5 text-xs font-semibold text-white
                        transition-colors hover:bg-primary-hover
                        focus-visible:outline-2 focus-visible:outline-offset-2
                        focus-visible:outline-primary"
                      aria-label={`Request to join ${circle.name}`}
                    >
                      Request to join
                    </a>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

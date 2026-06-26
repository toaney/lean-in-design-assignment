import Image from 'next/image'
import Link from 'next/link'
import type { HomeStats } from '@/lib/types'

const HERO_IMAGES = [
  'https://leanin.org/media/images/Circles_HP1.width-500.jpg',
  'https://leanin.org/media/images/Circles_HP2.width-500.jpg',
  'https://leanin.org/media/images/Circles_HP3.width-500.jpg',
  'https://leanin.org/media/images/Circles_HP4.width-500.jpg',
  'https://leanin.org/media/images/Circles_HP5.width-500.jpg',
  'https://leanin.org/media/images/Circles_HP6.width-500.jpg',
]

interface Props {
  stats: HomeStats
}

export default function CirclesHero({ stats }: Props) {
  return (
    <section
      aria-labelledby="circles-hero-heading"
      className="bg-secondary text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left — copy */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal">
              Lean In Circles
            </p>
            <h1
              id="circles-hero-heading"
              className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl"
            >
              Build your community.
              <br />
              <span className="text-primary">Advance your career.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg font-light leading-relaxed text-white/80">
              A Lean In Circle is a peer group of women who meet regularly to
              support each other's goals, share advice, and hold each other
              accountable. It's one of the most powerful things you can do for
              your career.
            </p>

            {/* Stats */}
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {[
                { value: stats.circles_count, label: 'Circles worldwide' },
                { value: stats.countries_count, label: 'Countries' },
                { value: stats.promotion_rate, label: 'More likely to get promoted' },
                { value: stats.satisfaction_rate, label: 'Say it changed their life' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold text-primary">
                      {value}
                    </span>
                    <span className="mt-1 block text-xs font-light text-white/60 leading-snug">
                      {label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/circles"
                className="rounded px-6 py-3 text-sm font-semibold text-white transition-colors
                  bg-primary hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2
                  focus-visible:outline-white"
              >
                Start a Circle
              </Link>
              <a
                href="https://leanin.org/networks/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border border-white/30 px-6 py-3 text-sm font-semibold text-white
                  transition-colors hover:border-white/70 hover:bg-white/10
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Find a Circle near you
              </a>
            </div>
          </div>

          {/* Right — image mosaic */}
          <div
            aria-hidden="true"
            className="grid grid-cols-3 gap-2 sm:gap-3"
          >
            {HERO_IMAGES.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-lg bg-white/10 ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                }`}
                style={{ aspectRatio: i === 0 ? '1 / 1' : '1 / 1' }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 33vw, 20vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

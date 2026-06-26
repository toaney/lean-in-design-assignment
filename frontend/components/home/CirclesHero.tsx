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

// Triple the images so the loop is seamless at -33.33% translate
const MARQUEE_IMAGES = [...HERO_IMAGES, ...HERO_IMAGES, ...HERO_IMAGES]

interface Props {
  stats: HomeStats
}

export default function CirclesHero({ stats }: Props) {
  return (
    <section
      aria-labelledby="circles-hero-heading"
      className="bg-background overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 lg:py-32">
        <div className="grid grid-cols-[1fr_72px] items-start gap-4 sm:grid-cols-[1fr_100px] sm:gap-6 lg:grid-cols-[1fr_300px] lg:items-center lg:gap-16">
          {/* Left — copy */}
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal">
              Lean In Circles
            </p>
            <h1
              id="circles-hero-heading"
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
            >
              Build your community.
              <br />
              <span className="text-primary">Advance your career.</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg font-light leading-relaxed text-gray-600">
              A Lean In Circle is a peer group of women who meet regularly to
              support each other's goals, share advice, and hold each other
              accountable. It's one of the most powerful things you can do for
              your career.
            </p>

            {/* Stats */}
            <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
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
                    <span className="mt-1 block text-xs font-light leading-snug text-gray-500">
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
                className="rounded-full bg-primary px-7 py-3 text-sm font-semibold text-white
                  transition-colors hover:bg-primary-hover
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Start a Circle
              </Link>
              <a
                href="https://leanin.org/networks/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gray-300 px-7 py-3 text-sm font-semibold
                  text-charcoal transition-colors hover:border-charcoal hover:bg-gray-100
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
              >
                Find a Circle near you
              </a>
            </div>
          </div>

          {/* Vertical auto-scrolling circle strip — visible at all sizes */}
          <div
            aria-hidden="true"
            className="relative h-[480px] overflow-hidden sm:h-[540px] lg:h-[580px]"
          >
            {/* Fade masks at top and bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10
              bg-gradient-to-b from-background to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10
              bg-gradient-to-t from-background to-transparent" />

            {/* Scrolling strip */}
            <div className="flex flex-col gap-2 animate-marquee-y lg:gap-4">
              {MARQUEE_IMAGES.map((src, i) => (
                <div
                  key={i}
                  className="relative w-full shrink-0 overflow-hidden rounded-full"
                  style={{ aspectRatio: '1 / 1' }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 72px, (max-width: 1024px) 100px, 300px"
                    className="object-cover"
                    priority={i < 3}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

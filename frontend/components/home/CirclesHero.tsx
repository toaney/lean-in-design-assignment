import Link from 'next/link'
import type { HomeStats } from '@/lib/types'
import AnimatedNetworkGraph from './AnimatedNetworkGraph'

interface Props {
  stats: HomeStats
}

export default function CirclesHero({ stats }: Props) {
  return (
    <section
      aria-labelledby="circles-hero-heading"
      className="relative overflow-hidden bg-white"
    >
      {/* D3 network chart with entrance animation — full section width, no overflow */}
      <AnimatedNetworkGraph
        className="absolute inset-0 opacity-[0.15] lg:opacity-20"
      />

      {/* Gradient mask — always visible; stronger on sm/md to protect text legibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10 lg:via-white/80 lg:to-transparent"
        style={{ zIndex: 1 }}
      />

      {/* Foreground content */}
      <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 lg:py-32" style={{ zIndex: 2 }}>
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal">
            Lean In Circles
          </p>
          <h1
            id="circles-hero-heading"
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-charcoal md:text-6xl lg:text-7xl"
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
          <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
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
              className="rounded-full border border-gray-300 bg-white px-7 py-3 text-sm font-semibold
                text-charcoal transition-colors hover:border-charcoal hover:bg-gray-100
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            >
              Find a Circle near you
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

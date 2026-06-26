import Image from 'next/image'
import Link from 'next/link'

const LIVE = 'https://leanin.org'

export default function HeroSection() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative overflow-hidden bg-white"
    >
<div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-12 py-12 lg:grid-cols-2 lg:py-20">

          {/* Left — headline + CTAs */}
          <div>
            <p className="mb-5 text-sm font-semibold uppercase tracking-widest text-charcoal/60">
              Lean In
            </p>
            <h1
              id="home-hero-heading"
              className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-charcoal md:text-6xl lg:text-7xl"
            >
              We inspire and equip women to{' '}
              <span className="text-secondary">lead.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-charcoal/70">
              Lean In helps millions of women achieve their ambitions and works
              with organizations to create workplaces where women can thrive.
            </p>

            <div className="mt-12 flex flex-wrap gap-4">
              <Link
                href="/circles"
                className="rounded-full bg-secondary px-8 py-3.5 text-sm font-semibold text-white
                  transition-colors hover:bg-[#772e25]
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
              >
                Get started
              </Link>
              <a
                href={`${LIVE}/about/`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-charcoal/30 bg-white px-8 py-3.5 text-sm font-semibold
                  text-charcoal/90 transition-colors hover:border-charcoal hover:text-charcoal
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
              >
                Learn more about our work
              </a>
            </div>

            {/* Quick stats */}
            <dl className="mt-16 grid grid-cols-3 gap-8 border-t border-charcoal/10 pt-10">
              {[
                { value: '150K+', label: 'Circles worldwide' },
                { value: '180+', label: 'Countries' },
                { value: '11 years', label: 'Of research & advocacy' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-bold text-secondary">
                      {value}
                    </span>
                    <span className="mt-1 block text-xs font-light text-charcoal/50">
                      {label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right — image */}
          <div className="relative hidden overflow-hidden rounded-3xl lg:block" style={{ aspectRatio: '4/5' }}>
            <Image
              src="https://blogs-images.forbes.com/clareoconnor/files/2017/04/x-1200x1625.jpg"
              alt="Women in a Lean In Circle"
              fill
              sizes="45vw"
              className="object-cover"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  )
}

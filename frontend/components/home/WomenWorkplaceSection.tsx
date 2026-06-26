const LIVE = 'https://leanin.org'

export default function WomenWorkplaceSection() {
  return (
    <section
      aria-labelledby="witw-heading"
      className="bg-secondary text-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Left */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal">
              Annual Report
            </p>
            <h2
              id="witw-heading"
              className="font-display text-3xl font-bold leading-tight md:text-4xl"
            >
              Women in the Workplace
            </h2>
            <p className="mt-4 text-base font-light leading-relaxed text-white/75">
              For eleven years, Lean In and McKinsey have partnered to track the
              state of women in corporate America. The data is clear: progress is
              stalling. This report gives leaders the insights and tools to
              change that.
            </p>
            <a
              href={`${LIVE}/report/women-in-the-workplace/`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded border border-white/30 px-6 py-3 text-sm font-semibold
                text-white transition-colors hover:border-white/70 hover:bg-white/10
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Read the full report →
            </a>
          </div>

          {/* Right — stat cards */}
          <ul
            className="grid grid-cols-2 gap-4"
            aria-label="Key report findings"
            role="list"
          >
            {[
              {
                stat: '54%',
                description:
                  "Only half of companies highly prioritize women's advancement",
              },
              {
                stat: '11th year',
                description:
                  'Women continue to fall behind at the first step to manager',
              },
              {
                stat: '2x',
                description:
                  'Women are twice as likely as men to be laid off during downturns',
              },
              {
                stat: '1 in 4',
                description:
                  "Women of color say they're the only one like them in the room",
              },
            ].map(({ stat, description }) => (
              <li
                key={stat}
                className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <p className="font-display text-2xl font-bold text-primary">{stat}</p>
                <p className="mt-2 text-sm font-light leading-snug text-white/70">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

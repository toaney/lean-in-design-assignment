import Image from 'next/image'

const LIVE = 'https://leanin.org'

const FINDINGS = [
  {
    image: 'https://leanin.org/media/images/Post_2_-_navy_1.width-500.png',
    stat: '54%',
    headline: "Only half of companies highly prioritize women's career advancement",
  },
  {
    image: 'https://leanin.org/media/images/Option_B3_-_column_gap.width-500.png',
    stat: 'Ambition gap',
    headline: "Women's ambition falls behind men's — but matches when they receive equal support",
  },
  {
    image: 'https://leanin.org/media/images/Option_D_-_navy.width-500.png',
    stat: '11th year',
    headline: 'Women are still held back by a broken rung at the first step to manager',
  },
]

export default function WomenWorkplaceSection() {
  return (
    <section aria-label="Women in the Workplace 2025" className="overflow-hidden bg-gray-50">
      <div className="mx-auto max-w-7xl">

        {/* ── Title: sm + md only (lifted above the grid) ── */}
        <div className="px-8 pb-2 pt-10 md:px-14 lg:hidden">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal">
            Annual Report
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-charcoal md:text-5xl">
            Women in the Workplace 2025
          </h2>
        </div>

        {/* ── Main grid ──
              sm  → 1 col: image full-width, then right column below
              md  → 2 col [image | findings stacked]
              lg  → 2 col [image | title + text + CTA + findings 3-up] */}
        <div className="grid md:grid-cols-[2fr_3fr]">

          {/* Image */}
          <div className="flex items-center justify-center bg-gray-100 px-10 py-10 md:py-12 lg:px-12 lg:py-16">
            <Image
              src="https://leanin.org/media/images/wiw-2025-cover_jEYFaaA.width-500.png"
              alt="Women in the Workplace 2025 report cover"
              width={500}
              height={700}
              className="h-auto w-full max-w-[260px] shadow-2xl md:max-w-[240px] lg:max-w-[360px]"
              priority
            />
          </div>

          {/* Right column */}
          <div className="flex flex-col justify-center px-8 py-10 md:py-12 lg:px-14 lg:py-20">

            {/* Title: lg only (sm/md sees it above the grid) */}
            <div className="hidden lg:block">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal">
                Annual Report
              </p>
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-charcoal xl:text-5xl">
                Women in the Workplace 2025
              </h2>
            </div>

            {/* Description */}
            <p className="mt-4 max-w-xl text-base font-light leading-relaxed text-gray-600 lg:mt-4">
              For eleven years, Lean In and McKinsey have partnered to track the
              state of women in corporate America. The 2025 report reveals where
              progress is stalling — and what leaders must do to reverse it.
            </p>

            {/* CTA */}
            <a
              href={`${LIVE}/report/women-in-the-workplace/`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block self-start rounded-full border-2 border-primary px-7 py-3
                text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Read the full report →
            </a>

            {/* Key findings
                  sm/md → stacked single column
                  lg    → 3-column grid */}
            <ul
              className="mt-8 grid gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-5"
              aria-label="Key findings from the report"
              role="list"
            >
              {FINDINGS.map(({ image, stat, headline }) => (
                <li
                  key={stat}
                  className="flex items-center gap-4 overflow-hidden rounded-2xl bg-white p-4 shadow-sm
                    lg:flex-col lg:items-stretch lg:gap-0 lg:p-0"
                >
                  {/* sm/md: 80×80 thumbnail · lg: full-width 4:3 image */}
                  <div
                    className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl
                      lg:aspect-[4/3] lg:h-auto lg:w-full lg:rounded-none"
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 80px, 20vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 lg:p-4">
                    <p className="font-display text-xl font-bold text-primary">{stat}</p>
                    <p className="mt-1.5 text-xs font-light leading-snug text-gray-600">{headline}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}

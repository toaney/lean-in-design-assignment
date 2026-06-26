import Image from 'next/image'

const LIVE = 'https://leanin.org'

const RESEARCH_ITEMS = [
  {
    title: 'Women in the Workplace 2024',
    source: 'Lean In & McKinsey & Company',
    href: `${LIVE}/report/women-in-the-workplace/`,
    image: 'https://leanin.org/media/images/GettyImages-2207850541.original.jpg',
    description:
      'The most comprehensive study on the state of women in corporate America — tracking progress, setbacks, and what leaders can do.',
  },
  {
    title: 'The Broken Rung Report',
    source: 'Lean In',
    href: `${LIVE}/articles/what-is-broken-rung/`,
    image: 'https://leanin.org/media/images/GettyImages-2264062718.original.jpg',
    description:
      'Women fall behind at the very first step to manager. This landmark report defines the problem and charts a path forward.',
  },
  {
    title: 'The AI Gender Gap',
    source: 'Lean In Research',
    href: `${LIVE}/articles/ai-gender-gap/`,
    image: 'https://leanin.org/media/images/GettyImages-2228519291.original.jpg',
    description:
      'Men are using AI at work 22% more than women. New research on why the gap exists and how to close it.',
  },
  {
    title: 'Gen Z Women and Leadership',
    source: 'Lean In & SurveyMonkey',
    href: `${LIVE}/articles/gen-z-women-leadership-factsheet/`,
    image: 'https://leanin.org/media/images/Men_Uncomfortable_Mentoring-tile-image_9oBcRSU.original.jpg',
    description:
      'More Gen Z women would pursue leadership if they believed companies actually wanted them. The data is striking.',
  },
  {
    title: 'Global Perspectives on the Broken Rung',
    source: 'Lean In & McKinsey',
    href: `${LIVE}/articles/imagine-support-womans-world/`,
    image: 'https://leanin.org/media/images/GettyImages-2193765051.original.jpg',
    description:
      'New data from India, Nigeria, and Kenya reveals the broken rung is a global crisis — and a global opportunity.',
  },
  {
    title: 'Report: Supporting Black Women at Work',
    source: 'Lean In',
    href: `${LIVE}/articles/what-happens-companies-support-black-women/`,
    image: 'https://leanin.org/media/images/Circles_HP1.width-500.jpg',
    description:
      'When companies invest in Black women, everyone wins. The data on what works and why more companies need to try.',
  },
]

export default function MoreResearchSection() {
  return (
    <section
      aria-labelledby="more-research-heading"
      className="py-16"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-teal">
              Reports & data
            </p>
            <h2
              id="more-research-heading"
              className="font-display text-2xl font-bold tracking-tight text-charcoal md:text-3xl"
            >
              More research from Lean In and others
            </h2>
          </div>
          <a
            href={`${LIVE}/report/`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-semibold text-primary underline-offset-4
              hover:underline focus-visible:underline"
          >
            All reports →
          </a>
        </div>

        {/* Research list */}
        <ul className="divide-y divide-gray-200" role="list">
          {RESEARCH_ITEMS.map(item => (
            <li key={item.title}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 py-4 sm:gap-6
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {/* Thumbnail */}
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl sm:h-16 sm:w-16">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                    {item.source}
                  </p>
                  <h3 className="mt-0.5 font-display text-sm font-semibold leading-snug text-charcoal
                    group-hover:text-primary transition-colors sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 hidden text-xs font-light leading-relaxed text-gray-500 sm:block line-clamp-1">
                    {item.description}
                  </p>
                </div>

                <span
                  className="ml-2 shrink-0 text-gray-300 group-hover:text-primary transition-colors"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

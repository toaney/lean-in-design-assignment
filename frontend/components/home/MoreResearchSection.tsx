const LIVE = 'https://leanin.org'

const RESEARCH_ITEMS = [
  {
    title: 'Women in the Workplace 2024',
    source: 'Lean In & McKinsey & Company',
    href: `${LIVE}/report/women-in-the-workplace/`,
    description:
      'The most comprehensive study on the state of women in corporate America — tracking progress, setbacks, and what leaders can do.',
  },
  {
    title: 'The Broken Rung Report',
    source: 'Lean In',
    href: `${LIVE}/articles/what-is-broken-rung/`,
    description:
      'Women fall behind at the very first step to manager. This landmark report defines the problem and charts a path forward.',
  },
  {
    title: 'The AI Gender Gap',
    source: 'Lean In Research',
    href: `${LIVE}/articles/ai-gender-gap/`,
    description:
      'Men are using AI at work 22% more than women. New research on why the gap exists and how to close it.',
  },
  {
    title: 'Gen Z Women and Leadership',
    source: 'Lean In & SurveyMonkey',
    href: `${LIVE}/articles/gen-z-women-leadership-factsheet/`,
    description:
      'More Gen Z women would pursue leadership if they believed companies actually wanted them. The data is striking.',
  },
  {
    title: 'Global Perspectives on the Broken Rung',
    source: 'Lean In & McKinsey',
    href: `${LIVE}/articles/imagine-support-womans-world/`,
    description:
      'New data from India, Nigeria, and Kenya reveals the broken rung is a global crisis — and a global opportunity.',
  },
  {
    title: 'Report: Supporting Black Women at Work',
    source: 'Lean In',
    href: `${LIVE}/articles/what-happens-companies-support-black-women/`,
    description:
      'When companies invest in Black women, everyone wins. The data on what works and why more companies need to try.',
  },
]

export default function MoreResearchSection() {
  return (
    <section
      aria-labelledby="more-research-heading"
      className="py-20"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
              Reports & data
            </p>
            <h2
              id="more-research-heading"
              className="font-display text-3xl font-bold text-secondary md:text-4xl"
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
                className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-start sm:gap-8
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div className="shrink-0 sm:w-56">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal">
                    {item.source}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-secondary
                    group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-light leading-relaxed text-gray-600">
                    {item.description}
                  </p>
                </div>
                <span
                  className="ml-auto shrink-0 self-center text-xl text-gray-300
                    group-hover:text-primary transition-colors"
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

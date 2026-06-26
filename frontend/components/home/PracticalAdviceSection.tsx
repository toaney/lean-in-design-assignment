const LIVE = 'https://leanin.org'

const GUIDES = [
  {
    title: 'How to negotiate for raises and promotions',
    href: `${LIVE}/education/negotiating-for-raises-and-promotions/`,
    tag: 'Equal Pay',
    description:
      'Women face a double bind when negotiating. Research-backed strategies that get results without the social penalty.',
  },
  {
    title: 'Accelerate your career',
    href: `${LIVE}/education/how-to-accelerate-your-career/`,
    tag: 'Career Growth',
    description:
      'Build visibility, earn sponsorship, and take concrete steps toward your next promotion with actionable frameworks.',
  },
  {
    title: 'Managing bias',
    href: `${LIVE}/education/managing-bias/`,
    tag: 'Workplace Bias',
    description:
      'Understand the most common forms of unconscious bias and learn tools to recognize and counter them every day.',
  },
  {
    title: 'Raising girls to be confident leaders',
    href: `${LIVE}/girls/`,
    tag: 'For Girls',
    description:
      'Help the girls in your life build the confidence, resilience, and voice they need to thrive now and lead in the future.',
  },
]

export default function PracticalAdviceSection() {
  return (
    <section
      aria-labelledby="practical-advice-heading"
      className="bg-gray-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
            Guides & tools
          </p>
          <h2
            id="practical-advice-heading"
            className="font-display text-4xl font-bold tracking-tight text-charcoal md:text-5xl"
          >
            Practical advice for work and life
          </h2>
        </div>

        {/* Guide cards */}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {GUIDES.map(guide => (
            <li key={guide.title}>
              <a
                href={guide.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm
                  transition-shadow hover:shadow-lg focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="mb-3 inline-block rounded-full bg-gray-100 px-3 py-1
                  text-xs font-semibold text-gray-600">
                  {guide.tag}
                </span>
                <h3 className="font-display text-base font-semibold leading-snug text-charcoal
                  group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="mt-3 flex-1 text-sm font-light leading-relaxed text-gray-600">
                  {guide.description}
                </p>
                <span
                  className="mt-5 text-sm font-semibold text-primary group-hover:underline
                    underline-offset-4"
                  aria-hidden="true"
                >
                  Read guide →
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

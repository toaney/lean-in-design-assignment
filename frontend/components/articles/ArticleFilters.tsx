'use client'

const TOPICS = [
  'All Topics',
  'Mentorship',
  'Advocacy',
  'Broken Rung',
  'Burnout',
  'Workplace Bias',
  'Confidence',
  'Leadership',
  'Inclusion',
  'Career Growth',
  'Equal Pay',
  'Resilience',
]

const AUDIENCE = [
  'For Everyone',
  'Allies & Partners',
  'Early Career Women',
  'Working Mothers',
  'Women in the Workplace',
  'Women of Color',
  'Managers & Employers',
  'Girls',
]

interface Props {
  selectedTopics: string[]
  selectedAudience: string[]
  onChange: (topics: string[], audience: string[]) => void
}

export default function ArticleFilters({ selectedTopics, selectedAudience, onChange }: Props) {
  function selectTopic(topic: string) {
    if (topic === 'All Topics') {
      onChange([], selectedAudience)
      return
    }
    // Single-select: toggle off if already selected, otherwise select only this one
    const next = selectedTopics[0] === topic ? [] : [topic]
    onChange(next, selectedAudience)
  }

  function selectAudience(label: string) {
    if (label === 'For Everyone') {
      onChange(selectedTopics, [])
      return
    }
    const next = selectedAudience[0] === label ? [] : [label]
    onChange(selectedTopics, next)
  }

  const noTopicFilter = selectedTopics.length === 0
  const noAudienceFilter = selectedAudience.length === 0

  return (
    <div className="sticky top-12 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 md:px-8">
        {/* Topics */}
        <fieldset className="mb-1.5">
          <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">Topics</legend>
          <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Filter by topic">
            <button
              role="radio"
              aria-checked={noTopicFilter}
              onClick={() => onChange([], selectedAudience)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                ${noTopicFilter
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-primary hover:text-primary'
                }`}
            >
              All Topics
            </button>
            {TOPICS.slice(1).map(topic => {
              const active = selectedTopics[0] === topic
              return (
                <button
                  key={topic}
                  role="radio"
                  aria-checked={active}
                  onClick={() => selectTopic(topic)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                    ${active
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-primary hover:text-primary'
                    }`}
                >
                  {topic}
                </button>
              )
            })}
          </div>
        </fieldset>

        {/* Audience */}
        <fieldset>
          <legend className="mb-1 text-xs font-semibold uppercase tracking-widest text-gray-400">This is for</legend>
          <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label="Filter by audience">
            <button
              role="radio"
              aria-checked={noAudienceFilter}
              onClick={() => onChange(selectedTopics, [])}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                ${noAudienceFilter
                  ? 'border-teal bg-teal text-white'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-teal hover:text-teal'
                }`}
            >
              For Everyone
            </button>
            {AUDIENCE.slice(1).map(label => {
              const active = selectedAudience[0] === label
              return (
                <button
                  key={label}
                  role="radio"
                  aria-checked={active}
                  onClick={() => selectAudience(label)}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary
                    ${active
                      ? 'border-teal bg-teal text-white'
                      : 'border-gray-300 bg-white text-gray-600 hover:border-teal hover:text-teal'
                    }`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </fieldset>
      </div>
    </div>
  )
}

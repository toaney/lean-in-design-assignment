'use client'

import { useState, useRef, useEffect } from 'react'

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

function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-3 w-3 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
    >
      <polyline points="2,4 6,8 10,4" />
    </svg>
  )
}

export default function ArticleFilters({ selectedTopics, selectedAudience, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  const noTopicFilter    = selectedTopics.length === 0
  const noAudienceFilter = selectedAudience.length === 0
  const activeCount      = selectedTopics.length + selectedAudience.length

  function selectTopic(topic: string) {
    if (topic === 'All Topics') { onChange([], selectedAudience); return }
    const next = selectedTopics[0] === topic ? [] : [topic]
    onChange(next, selectedAudience)
  }

  function selectAudience(label: string) {
    if (label === 'For Everyone') { onChange(selectedTopics, []); return }
    const next = selectedAudience[0] === label ? [] : [label]
    onChange(selectedTopics, next)
  }

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const pillBase = 'rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2'

  return (
    <div ref={barRef} className="sticky top-[80px] z-40 border-b border-gray-200 bg-white shadow-sm">

      {/* ── Mobile: single toggle row ── */}
      <div className="md:hidden">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5">
          <button
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-filter-panel"
            className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-1.5
              text-xs font-semibold text-gray-700 transition-colors hover:border-gray-400
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Filters
            {activeCount > 0 && (
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {activeCount}
              </span>
            )}
            <ChevronDown open={open} />
          </button>

          {activeCount > 0 && (
            <button
              onClick={() => { onChange([], []); setOpen(false) }}
              className="text-xs font-semibold text-gray-400 hover:text-gray-600
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Dropdown panel — absolute so it overlays content without shifting layout */}
        {open && (
          <div
            id="mobile-filter-panel"
            role="dialog"
            aria-label="Article filters"
            className="absolute left-0 right-0 top-full border-t border-gray-100 bg-white px-4 pb-5 pt-4 shadow-lg"
          >
            {/* Topics */}
            <p id="mob-topics-label" className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Topics
            </p>
            <div className="mb-4 flex flex-wrap gap-1.5" role="radiogroup" aria-labelledby="mob-topics-label">
              <button
                role="radio" aria-checked={noTopicFilter}
                onClick={() => onChange([], selectedAudience)}
                className={`${pillBase} focus-visible:outline-primary ${noTopicFilter ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white text-gray-600 hover:border-primary hover:text-primary'}`}
              >
                All Topics
              </button>
              {TOPICS.slice(1).map(topic => {
                const active = selectedTopics[0] === topic
                return (
                  <button
                    key={topic} role="radio" aria-checked={active}
                    onClick={() => selectTopic(topic)}
                    className={`${pillBase} focus-visible:outline-primary ${active ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white text-gray-600 hover:border-primary hover:text-primary'}`}
                  >
                    {topic}
                  </button>
                )
              })}
            </div>

            {/* Audience */}
            <p id="mob-audience-label" className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
              This is for
            </p>
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-labelledby="mob-audience-label">
              <button
                role="radio" aria-checked={noAudienceFilter}
                onClick={() => onChange(selectedTopics, [])}
                className={`${pillBase} focus-visible:outline-teal ${noAudienceFilter ? 'border-teal bg-teal text-white' : 'border-gray-300 bg-white text-gray-600 hover:border-teal hover:text-teal'}`}
              >
                For Everyone
              </button>
              {AUDIENCE.slice(1).map(label => {
                const active = selectedAudience[0] === label
                return (
                  <button
                    key={label} role="radio" aria-checked={active}
                    onClick={() => selectAudience(label)}
                    className={`${pillBase} focus-visible:outline-teal ${active ? 'border-teal bg-teal text-white' : 'border-gray-300 bg-white text-gray-600 hover:border-teal hover:text-teal'}`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Desktop: inline pill rows ── */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-7xl px-4 py-2 md:px-8">

          <div className="mb-1.5 flex items-start gap-3">
            <span id="filter-topics-label" className="mt-[5px] shrink-0 text-xs font-semibold uppercase tracking-widest text-gray-400">
              Topics
            </span>
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-labelledby="filter-topics-label">
              <button
                role="radio" aria-checked={noTopicFilter}
                onClick={() => onChange([], selectedAudience)}
                className={`${pillBase} focus-visible:outline-primary ${noTopicFilter ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white text-gray-600 hover:border-primary hover:text-primary'}`}
              >
                All Topics
              </button>
              {TOPICS.slice(1).map(topic => {
                const active = selectedTopics[0] === topic
                return (
                  <button
                    key={topic} role="radio" aria-checked={active}
                    onClick={() => selectTopic(topic)}
                    className={`${pillBase} focus-visible:outline-primary ${active ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white text-gray-600 hover:border-primary hover:text-primary'}`}
                  >
                    {topic}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span id="filter-audience-label" className="mt-[5px] shrink-0 text-xs font-semibold uppercase tracking-widest text-gray-400">
              This is for
            </span>
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-labelledby="filter-audience-label">
              <button
                role="radio" aria-checked={noAudienceFilter}
                onClick={() => onChange(selectedTopics, [])}
                className={`${pillBase} focus-visible:outline-teal ${noAudienceFilter ? 'border-teal bg-teal text-white' : 'border-gray-300 bg-white text-gray-600 hover:border-teal hover:text-teal'}`}
              >
                For Everyone
              </button>
              {AUDIENCE.slice(1).map(label => {
                const active = selectedAudience[0] === label
                return (
                  <button
                    key={label} role="radio" aria-checked={active}
                    onClick={() => selectAudience(label)}
                    className={`${pillBase} focus-visible:outline-teal ${active ? 'border-teal bg-teal text-white' : 'border-gray-300 bg-white text-gray-600 hover:border-teal hover:text-teal'}`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

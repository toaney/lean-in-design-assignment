'use client'

import { useAuth } from '@/context/AuthContext'
import ScrollExperience from './ScrollExperience'
import CirclesDirectory from './CirclesDirectory'
import CirclesContent from './CirclesContent'
import NetworkGraph from './NetworkGraph'
import type { Circle, CircleStep } from '@/lib/types'

interface Props {
  steps: CircleStep[]
  circles: Circle[]
}

export default function CirclesPageClient({ steps, circles }: Props) {
  const { isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return (
      <>
        {/* Logged-in hero */}
        <div className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-background px-4 py-14 text-center md:px-8">
          <NetworkGraph className="absolute inset-0 h-full w-full opacity-40" />
          <div className="relative z-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
              Welcome back
            </p>
            <h1 className="font-display text-4xl font-bold text-charcoal md:text-5xl">
              Your Circles community
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base font-light text-gray-600">
              Browse active Circles, request to join one near you, or start your own.
            </p>
            <a
              href="https://leanin.org/circles/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-bold text-white
                transition-colors hover:bg-primary-hover
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Start a Circle
            </a>
          </div>
        </div>
        <CirclesDirectory circles={circles} />
      </>
    )
  }

  return (
    <>
      {/* Page heading hero */}
      <div className="relative flex min-h-[75vh] flex-col items-center justify-center overflow-hidden bg-background px-4 py-20 text-center md:px-8">
        <NetworkGraph className="absolute inset-0 h-full w-full opacity-40" />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-charcoal md:text-6xl">
            Lean In Circles
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg font-light text-gray-600">
            Small groups, big impact. Discover what a Circle can do for you.
          </p>
          <a
            href="https://leanin.org/circles/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5
              text-sm font-bold text-white shadow-lg transition-colors hover:bg-primary-hover
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Start a Circle
          </a>
        </div>
      </div>

      {/* Scroll-jacking steps experience */}
      <ScrollExperience steps={steps} />

      {/* Additional circles content */}
      <CirclesContent />
    </>
  )
}

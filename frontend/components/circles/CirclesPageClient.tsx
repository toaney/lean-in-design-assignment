'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import ScrollExperience from './ScrollExperience'
import CirclesDirectory from './CirclesDirectory'
import CirclesContent from './CirclesContent'
import type { Circle, CircleStep } from '@/lib/types'

interface Props {
  steps: CircleStep[]
  circles: Circle[]
}

export default function CirclesPageClient({ steps, circles }: Props) {
  const { isLoggedIn } = useAuth()
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()

  const ctaOpacity = useTransform(scrollY, [0, 120], [1, 0])
  const ctaPointerEvents = useTransform(scrollY, v => (v > 60 ? 'none' : 'auto'))

  if (isLoggedIn) {
    return (
      <>
        {/* Logged-in hero */}
        <div className="bg-background px-4 py-14 text-center md:px-8">
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
        <CirclesDirectory circles={circles} />
      </>
    )
  }

  return (
    <>
      {/* Sticky "Start a Circle" CTA that fades when scroll-jack begins */}
      <motion.div
        aria-hidden={false}
        style={{ opacity: ctaOpacity, pointerEvents: ctaPointerEvents }}
        className="fixed top-[4.5rem] left-1/2 z-40 -translate-x-1/2 md:top-[4rem]"
      >
        <a
          href="https://leanin.org/circles/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm
            font-bold text-white shadow-lg transition-colors hover:bg-primary-hover
            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          <span aria-hidden="true">+</span>
          Start a Circle
        </a>
      </motion.div>

      {/* Page heading above scroll experience */}
      <div
        ref={heroRef}
        className="bg-background px-4 py-16 text-center md:px-8 md:py-20"
      >
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-charcoal md:text-6xl">
          Lean In Circles
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg font-light text-gray-600">
          Small groups, big impact. Discover what a Circle can do for you.
        </p>
      </div>

      {/* Scroll-jacking steps experience */}
      <ScrollExperience steps={steps} />

      {/* Additional circles content */}
      <CirclesContent />
    </>
  )
}

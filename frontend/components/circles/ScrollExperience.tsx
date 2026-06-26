'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import type { CircleStep } from '@/lib/types'

interface SlideData {
  id: string
  type: 'intro' | 'step' | 'cta'
  step?: CircleStep
  color: string  // hex value for background interpolation
  accent: string
}

// Hex colors — background interpolates between these, never jumps
const COLORS = {
  dark: '#111111',
  red: '#b21f24',
  crimson: '#780000',
}

function buildSlides(steps: CircleStep[]): SlideData[] {
  return [
    { id: 'intro', type: 'intro', color: COLORS.dark, accent: 'text-teal' },
    ...steps.map((step, i) => ({
      id: `step-${step.step}`,
      type: 'step' as const,
      step,
      color: i % 2 === 0 ? COLORS.crimson : COLORS.red,
      accent: 'text-white/40',
    })),
    { id: 'cta', type: 'cta', color: COLORS.dark, accent: 'text-white/60' },
  ]
}

interface ContentPanelProps {
  slide: SlideData
  scrollYProgress: MotionValue<number>
  index: number
  total: number
}

function ContentPanel({ slide, scrollYProgress, index, total }: ContentPanelProps) {
  const slotSize = 1 / total
  const start = index * slotSize
  const end = (index + 1) * slotSize
  const fadeW = slotSize * 0.22  // fade occupies 22% of each slot on each edge

  const opacity = useTransform(
    scrollYProgress,
    [start, start + fadeW, end - fadeW, end],
    [0, 1, 1, 0],
  )

  return (
    <motion.div
      role="group"
      aria-label={
        slide.type === 'intro'
          ? 'Introduction'
          : slide.type === 'cta'
          ? 'Get started'
          : `Step ${slide.step?.step}: ${slide.step?.title}`
      }
      className="absolute inset-0 flex items-center justify-center px-6"
      style={{ opacity }}
    >
      <div className="mx-auto max-w-2xl text-white">
        {slide.type === 'intro' && (
          <>
            <p className={`mb-4 text-sm font-semibold uppercase tracking-widest ${slide.accent}`}>
              How it works
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Six steps to your Circle
            </h2>
            <p className="mt-6 max-w-lg text-lg font-light text-white/70">
              Starting a Lean In Circle takes less than an hour. Here's exactly how.
            </p>
          </>
        )}

        {slide.type === 'step' && slide.step && (
          <>
            <p className={`mb-3 font-display text-8xl font-black leading-none ${slide.accent} md:text-[10rem]`}>
              {slide.step.step}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
              {slide.step.title}
            </h2>
            <p className="mt-5 max-w-md text-lg font-light leading-relaxed text-white/80">
              {slide.step.description}
            </p>
          </>
        )}

        {slide.type === 'cta' && (
          <div className="text-center">
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Ready to start your Circle?
            </h2>
            <p className="mx-auto mt-6 max-w-md text-lg font-light text-white/70">
              Join 150,000+ Circles in 180 countries. It only takes a few minutes to begin.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="https://leanin.org/circles/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-white px-8 py-3 text-sm font-bold text-white
                  transition-colors hover:bg-white hover:text-gray-900
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started on Lean In
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Step progress dots */}
      {slide.type === 'step' && (
        <div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2"
          aria-hidden="true"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className={`block h-1 rounded-full transition-all duration-500 ${
                i < (slide.step?.step ?? 0)
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-white/25'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

interface Props {
  steps: CircleStep[]
}

export default function ScrollExperience({ steps }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const slides = buildSlides(steps)

  // Background color interpolates smoothly across all slide positions
  const bgInputs = slides.map((_, i) => i / (slides.length - 1))
  const bgValues = slides.map(s => s.color)
  const backgroundColor = useTransform(scrollYProgress, bgInputs, bgValues)

  return (
    <>
      {/* Scroll-jacking container — desktop only */}
      <div
        ref={containerRef}
        className="hidden md:block"
        style={{ height: `${slides.length * 100}vh` }}
        aria-label="Circle creation steps — scroll to explore"
      >
        <motion.div
          className="sticky top-0 h-screen overflow-hidden"
          style={{ backgroundColor }}
          role="region"
        >
          {slides.map((slide, i) => (
            <ContentPanel
              key={slide.id}
              slide={slide}
              scrollYProgress={scrollYProgress}
              index={i}
              total={slides.length}
            />
          ))}
        </motion.div>
      </div>

      {/* Static layout — mobile */}
      <div className="md:hidden">
        <div className="bg-gray-900 px-6 py-16 text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal">
            How it works
          </p>
          <h2 className="font-display text-3xl font-bold">Six steps to your Circle</h2>
          <p className="mt-4 text-base font-light text-white/70">
            Starting a Lean In Circle takes less than an hour.
          </p>
        </div>

        {steps.map((step, i) => (
          <div
            key={step.step}
            style={{ backgroundColor: i % 2 === 0 ? COLORS.crimson : COLORS.red }}
            className="px-6 py-12 text-white"
          >
            <p className="font-display text-5xl font-black text-white/20">{step.step}</p>
            <h3 className="mt-2 font-display text-xl font-bold">{step.title}</h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-white/75">
              {step.description}
            </p>
          </div>
        ))}

        <div className="bg-gray-900 px-6 py-16 text-center text-white">
          <h2 className="font-display text-2xl font-bold">Ready to start your Circle?</h2>
          <a
            href="https://leanin.org/circles/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full border-2 border-white px-8 py-3 text-sm
              font-bold text-white hover:bg-white hover:text-gray-900 transition-colors"
          >
            Get started on Lean In
          </a>
        </div>
      </div>
    </>
  )
}

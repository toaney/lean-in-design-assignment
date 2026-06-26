'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import type { CircleStep } from '@/lib/types'

interface SlideData {
  id: string
  type: 'intro' | 'step' | 'cta'
  step?: CircleStep
  bg: string
  accent: string
}

function buildSlides(steps: CircleStep[]): SlideData[] {
  return [
    {
      id: 'intro',
      type: 'intro',
      bg: 'bg-secondary',
      accent: 'text-teal',
    },
    ...steps.map(step => ({
      id: `step-${step.step}`,
      type: 'step' as const,
      step,
      bg: step.step % 2 === 0 ? 'bg-secondary' : 'bg-molten-lava',
      accent: 'text-white/60',
    })),
    {
      id: 'cta',
      type: 'cta',
      bg: 'bg-primary',
      accent: 'text-white/70',
    },
  ]
}

interface SlidePanelProps {
  slide: SlideData
  scrollYProgress: MotionValue<number>
  index: number
  total: number
}

function SlidePanel({ slide, scrollYProgress, index, total }: SlidePanelProps) {
  const start = index / total
  const end = (index + 1) / total
  const mid = start + (end - start) * 0.3
  const preMid = end - (end - start) * 0.3

  const opacity = useTransform(scrollYProgress, [start, mid, preMid, end], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [start, mid, preMid, end], [50, 0, 0, -50])

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
      className={`absolute inset-0 flex items-center justify-center px-6 ${slide.bg}`}
      style={{ opacity }}
    >
      <motion.div
        className="mx-auto max-w-2xl text-white"
        style={{ y }}
      >
        {slide.type === 'intro' && (
          <>
            <p className={`mb-4 text-sm font-semibold uppercase tracking-widest ${slide.accent}`}>
              How it works
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight md:text-6xl">
              Six steps to your Circle
            </h2>
            <p className="mt-6 max-w-lg text-lg font-light text-white/75">
              Starting a Lean In Circle takes less than an hour. Here's exactly how.
            </p>
          </>
        )}

        {slide.type === 'step' && slide.step && (
          <>
            <p className={`mb-3 font-display text-8xl font-black leading-none ${slide.accent} md:text-[12rem]`}>
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
            <p className="mx-auto mt-6 max-w-md text-lg font-light text-white/85">
              Join 150,000+ Circles in 180 countries. It only takes a few minutes to begin.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="https://leanin.org/circles/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded border-2 border-white px-8 py-3 text-sm font-bold text-white
                  transition-colors hover:bg-white hover:text-primary
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Get started on Lean In
              </a>
            </div>
          </div>
        )}
      </motion.div>

      {/* Step progress dots */}
      {slide.type === 'step' && (
        <div
          className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2"
          aria-hidden="true"
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                i < (slide.step?.step ?? 0)
                  ? 'w-6 bg-white'
                  : 'w-1.5 bg-white/30'
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

  return (
    <>
      {/* Scroll-jacking container — desktop only */}
      <div
        ref={containerRef}
        className="hidden md:block"
        style={{ height: `${slides.length * 100}vh` }}
        aria-label="Circle creation steps — scroll to explore"
      >
        <div className="sticky top-0 h-screen overflow-hidden" role="region">
          {slides.map((slide, i) => (
            <SlidePanel
              key={slide.id}
              slide={slide}
              scrollYProgress={scrollYProgress}
              index={i}
              total={slides.length}
            />
          ))}
        </div>
      </div>

      {/* Static layout — mobile */}
      <div className="md:hidden">
        {/* Intro */}
        <div className="bg-secondary px-6 py-16 text-white">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal">
            How it works
          </p>
          <h2 className="font-display text-3xl font-bold">Six steps to your Circle</h2>
          <p className="mt-4 text-base font-light text-white/75">
            Starting a Lean In Circle takes less than an hour.
          </p>
        </div>

        {/* Steps */}
        {steps.map((step, i) => (
          <div
            key={step.step}
            className={`px-6 py-12 text-white ${i % 2 === 0 ? 'bg-secondary' : 'bg-molten-lava'}`}
          >
            <p className="font-display text-5xl font-black text-white/20">{step.step}</p>
            <h3 className="mt-2 font-display text-xl font-bold">{step.title}</h3>
            <p className="mt-3 text-sm font-light leading-relaxed text-white/75">
              {step.description}
            </p>
          </div>
        ))}

        {/* CTA */}
        <div className="bg-primary px-6 py-16 text-center text-white">
          <h2 className="font-display text-2xl font-bold">Ready to start your Circle?</h2>
          <a
            href="https://leanin.org/circles/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded border-2 border-white px-8 py-3 text-sm font-bold
              text-white hover:bg-white hover:text-primary transition-colors"
          >
            Get started on Lean In
          </a>
        </div>
      </div>
    </>
  )
}

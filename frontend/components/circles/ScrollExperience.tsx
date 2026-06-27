'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import type { CircleStep } from '@/lib/types'
import StepNetworkGraph from './StepNetworkGraph'

// Step images — use full-width Getty/Lean In photos (higher quality than fill-500x333 crops)
const STEP_IMAGES: Record<number, string> = {
  1: 'https://leanin.org/media/images/GettyImages-2212415119.width-500.jpg',
  2: 'https://leanin.org/media/images/GettyImages-1442158565.width-500.jpg',
  3: 'https://leanin.org/media/images/Circle_LP_1_Uz2l0yX.width-500.jpg',
  4: 'https://leanin.org/media/images/GettyImages-1889706062.width-500.jpg',
  5: 'https://leanin.org/media/images/GettyImages-2228519291.width-500.jpg',
  6: 'https://leanin.org/media/images/Circles_LP5_new.width-500.jpg',
}
const INTRO_IMAGE = 'https://leanin.org/media/images/Circle_LP_1_Uz2l0yX.width-500.jpg'

interface SlideData {
  id: string
  type: 'intro' | 'step'
  step?: CircleStep
  image: string
}

function buildSlides(steps: CircleStep[]): SlideData[] {
  return [
    { id: 'intro', type: 'intro', image: INTRO_IMAGE },
    ...steps.map(step => ({
      id: `step-${step.step}`,
      type: 'step' as const,
      step,
      image: STEP_IMAGES[step.step] ?? INTRO_IMAGE,
    })),
  ]
}

// Returns an opacity MotionValue for a slide at position `index` out of `total`.
// First slide starts at full opacity; last stays at full opacity at scroll end.
function useFade(
  scrollYProgress: MotionValue<number>,
  index: number,
  total: number,
): MotionValue<number> {
  const slot = 1 / total
  const s = index * slot
  const e = (index + 1) * slot
  const fw = slot * 0.22

  const inputs =
    index === 0          ? [0, e - fw, e] :
    index === total - 1  ? [s, s + fw, 1] :
                           [s, s + fw, e - fw, e]

  const outputs =
    index === 0          ? [1, 1, 0] :
    index === total - 1  ? [0, 1, 1] :
                           [0, 1, 1, 0]

  return useTransform(scrollYProgress, inputs, outputs)
}

// ── Slide image panel ────────────────────────────────────────
function SlideImage({
  slide,
  scrollYProgress,
  index,
  total,
}: {
  slide: SlideData
  scrollYProgress: MotionValue<number>
  index: number
  total: number
}) {
  const opacity = useFade(scrollYProgress, index, total)
  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <Image
        src={slide.image}
        alt=""
        fill
        sizes="50vw"
        className="object-cover"
        priority={index < 2}
      />
    </motion.div>
  )
}

// ── Slide text content ───────────────────────────────────────
function SlideContent({
  slide,
  scrollYProgress,
  index,
  total,
}: {
  slide: SlideData
  scrollYProgress: MotionValue<number>
  index: number
  total: number
}) {
  const opacity = useFade(scrollYProgress, index, total)
  return (
    <motion.div
      className="absolute inset-0 flex items-center"
      style={{ opacity }}
      aria-hidden={undefined}
    >
      <div className="px-10 xl:px-16">
        {slide.type === 'intro' && (
          <>
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal">
              How it works
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-charcoal xl:text-5xl">
              Six steps to your Circle
            </h2>
            <p className="mt-5 max-w-sm text-base font-light leading-relaxed text-gray-500">
              Starting a Lean In Circle takes less than an hour. Here's exactly how.
            </p>
          </>
        )}

        {slide.type === 'step' && slide.step && (
          <>
            <p className="font-display text-[6rem] font-black leading-none text-gray-100 xl:text-[8rem]">
              {slide.step.step}
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold leading-tight text-charcoal xl:text-4xl">
              {slide.step.title}
            </h2>
            <p className="mt-4 max-w-sm text-base font-light leading-relaxed text-gray-500">
              {slide.step.description}
            </p>
          </>
        )}

      </div>
    </motion.div>
  )
}

// ── Vertical progress indicator ──────────────────────────────
function ProgressBar({
  steps,
  activeIndex,
}: {
  steps: CircleStep[]
  activeIndex: number   // raw slide index: 0=intro, 1-N=steps, N+1=cta
}) {
  return (
    <div
      className="flex h-full flex-col items-center justify-center gap-0 py-8"
      aria-hidden="true"
    >
      {steps.map((step, i) => {
        const slideIndex = i + 1
        const isActive = activeIndex === slideIndex
        const isPast   = activeIndex > slideIndex
        return (
          <div key={step.step} className="flex flex-col items-center">
            {/* Connecting line above (not before first dot) */}
            {i > 0 && (
              <div
                className={`w-px transition-colors duration-500 ${
                  activeIndex >= slideIndex ? 'bg-primary' : 'bg-gray-200'
                }`}
                style={{ height: 28 }}
              />
            )}
            {/* Dot — empty outlined circle */}
            <div
              title={`Step ${step.step}: ${step.title}`}
              className={`rounded-full bg-transparent transition-all duration-300 ${
                isActive
                  ? 'h-4 w-4 border-2 border-primary shadow-[0_0_0_3px_rgba(196,69,54,0.15)]'
                  : isPast
                  ? 'h-3 w-3 border-2 border-primary/40'
                  : 'h-3 w-3 border-2 border-gray-300'
              }`}
            />
          </div>
        )
      })}
    </div>
  )
}

// ── Main component ───────────────────────────────────────────
interface Props {
  steps: CircleStep[]
}

export default function ScrollExperience({ steps }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const slides = buildSlides(steps)
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', latest => {
    setActiveIndex(Math.round(latest * (slides.length - 1)))
  })

  // Scroll-linked opacity for the step network graph:
  // fades in as intro exits, stays visible through all steps
  const slot = 1 / slides.length
  const fw = slot * 0.22
  const graphOpacity = useTransform(
    scrollYProgress,
    [slot * (1 - fw), slot],
    [0, 1],
  )

  // nodeCount: 0 on intro, 1–6 on steps, clamped at steps.length
  const nodeCount = Math.max(0, Math.min(steps.length, activeIndex))

  return (
    <>
      {/* ── Desktop: scroll-jacking ── */}
      <div
        ref={containerRef}
        className="hidden md:block"
        style={{ height: `${slides.length * 100}vh` }}
        aria-label="Circle creation steps — scroll to explore"
      >
        <div className="sticky top-[80px] h-[calc(100vh-80px)] overflow-hidden bg-white">
          <div className="grid h-full" style={{ gridTemplateColumns: '1fr 1fr 56px' }}>

            {/* Left: image layers */}
            <div className="relative h-full overflow-hidden bg-gray-100">
              {slides.map((slide, i) => (
                <SlideImage
                  key={slide.id}
                  slide={slide}
                  scrollYProgress={scrollYProgress}
                  index={i}
                  total={slides.length}
                />
              ))}
            </div>

            {/* Centre: text content (top) + growing network graph (bottom) */}
            <div className="relative h-full flex flex-col">
              {/* Text slides — upper portion */}
              <div className="relative" style={{ flex: 3 }}>
                {slides.map((slide, i) => (
                  <SlideContent
                    key={slide.id}
                    slide={slide}
                    scrollYProgress={scrollYProgress}
                    index={i}
                    total={slides.length}
                  />
                ))}
              </div>

              {/* Growing network graph — lower portion, visible during steps */}
              <motion.div style={{ flex: 2, opacity: graphOpacity }}>
                <StepNetworkGraph nodeCount={nodeCount} className="h-full w-full" />
              </motion.div>
            </div>

            {/* Right: vertical progress dots */}
            <div>
              <ProgressBar steps={steps} activeIndex={activeIndex} />
            </div>

          </div>
        </div>
      </div>

      {/* ── Mobile: static stacked cards ── */}
      <div className="md:hidden">
        <div className="px-6 py-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-teal">
            How it works
          </p>
          <h2 className="font-display text-3xl font-bold text-charcoal">
            Six steps to your Circle
          </h2>
          <p className="mt-3 text-base font-light text-gray-500">
            Starting a Lean In Circle takes less than an hour.
          </p>
        </div>

        {steps.map((step) => (
          <div key={step.step} className="border-t border-gray-100">
            <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-100">
              <Image
                src={STEP_IMAGES[step.step] ?? INTRO_IMAGE}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="px-6 py-8">
              <p className="font-display text-5xl font-black leading-none text-gray-100">
                {step.step}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-charcoal">
                {step.title}
              </h3>
              <p className="mt-2 text-sm font-light leading-relaxed text-gray-500">
                {step.description}
              </p>
            </div>
          </div>
        ))}

      </div>
    </>
  )
}

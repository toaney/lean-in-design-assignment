'use client'

import { useState } from 'react'
import Image from 'next/image'

const LIVE = 'https://leanin.org'

const TESTIMONIALS = [
  {
    quote:
      "In the times of AI and rapid transformation, I am convinced that women-led communities are not optional, they are essential infrastructure.",
    name: 'Circle member',
    location: 'India',
    image: 'https://leanin.org/media/images/GettyImages-2212415119.width-500.jpg',
  },
  {
    quote:
      "My Circle gave me the confidence to negotiate my salaries and promotions, find mentorship and sponsorship.",
    name: 'Circle member',
    location: 'Netherlands',
    image: 'https://leanin.org/media/images/GettyImages-1442158565.width-500.jpg',
  },
  {
    quote:
      "Because of my Circle I found the career change I was looking for, as simple as that.",
    name: 'Circle member',
    location: 'Spain',
    image: 'https://leanin.org/media/images/GettyImages-1889706062.width-500.jpg',
  },
  {
    quote:
      "My Circle has taught me that success doesn't have to be lonely. That persistence is easier when it's shared.",
    name: 'Circle member',
    location: 'Greece',
    image: 'https://leanin.org/media/images/GettyImages-2228519291.width-500.jpg',
  },
]

const FEATURES = [
  {
    title: 'Leadership materials',
    description:
      'Step-by-step meeting guides and our research-backed leadership curriculum.',
  },
  {
    title: 'Exclusive events',
    description:
      'Free leadership training, virtual Lean In events, and local Network gatherings.',
  },
  {
    title: 'Early access',
    description: 'Be the first to hear about new programming and research.',
  },
  {
    title: 'Ongoing support',
    description:
      'Connect with other Circle Leaders, local Networks, and the Lean In team whenever you need guidance.',
  },
]

const FAQS = [
  {
    q: 'What is a Lean In Circle?',
    a: 'A Lean In Circle is a small group of peers — typically 8–12 people — who meet regularly to support each other\'s personal and professional growth. Members use discussion guides from LeanIn.Org to talk about leadership, confidence, negotiation, burnout, and resilience. The goal is simple: help women lean into their ambitions, together.',
  },
  {
    q: 'How do Lean In Circles work?',
    a: 'Circles meet regularly for structured, honest conversations about work and life. Each meeting focuses on a specific topic and includes discussion questions and practical exercises. Circles are small and consistent so trust can grow, confidential so members can speak openly, and action-oriented so conversations lead to real change.',
  },
  {
    q: 'How do I start a Lean In Circle?',
    a: 'Starting a Circle is simple. Gather a small group of women committed to growing together and register your Circle on connect.leanin.org. We provide free meeting guides, leadership tips for Circle leaders, and ongoing support. You don\'t need to be an expert — you just need to be willing to facilitate conversation and create space for others.',
  },
  {
    q: 'How do Lean In Circles help women advance at work?',
    a: 'Circles help women build confidence, strengthen leadership skills, and take concrete steps toward their goals. Members practice negotiating and self-advocacy, giving and receiving feedback, setting boundaries, and navigating bias and setbacks. When women support each other, they are more likely to stay ambitious — and to stay in the workforce.',
  },
  {
    q: 'Are Lean In Circles only for working women?',
    a: 'Lean In Circles are for women at all stages of life and career — including students, entrepreneurs, women returning to work, and those navigating career transitions. Some Circles are women-only spaces. Others are open to allies. Each Circle sets its own guidelines.',
  },
  {
    q: 'How often do Circles meet, and how long are meetings?',
    a: 'Most Circles meet once a month for about 90 minutes. The frequency and length are up to your group, but regular, consistent meetings are key to building trust and momentum. Many Circles choose a standing date — the first Tuesday of each month, for example — so it becomes a reliable part of members\' schedules.',
  },
  {
    q: 'Do I have to be a leader to join or start a Circle?',
    a: 'Not at all. Circles are for women who want to grow into leadership — not just those who are already there. There is no experience level required. Circle Leaders are not experts or coaches; they are facilitators who create space for the group. Lean In provides all the materials and training you need.',
  },
  {
    q: 'Is there a cost to join a Lean In Circle?',
    a: 'Joining or starting a Lean In Circle is completely free. All meeting guides, discussion materials, and Circle Leader training are available at no cost through your registration on connect.leanin.org. Some local Networks may organize events with associated costs, but the core Circle experience is always free.',
  },
]

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const total = TESTIMONIALS.length

  const prev = () => setCurrent(i => (i - 1 + total) % total)
  const next = () => setCurrent(i => (i + 1) % total)

  return (
    <div className="relative">
      {/* Sliding track */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {TESTIMONIALS.map(({ quote, name, location, image }) => (
            <div
              key={location}
              className="flex w-full shrink-0 flex-col overflow-hidden md:flex-row"
            >
              {/* Image panel */}
              <div className="relative h-64 w-full md:h-auto md:w-2/5 md:shrink-0">
                <Image
                  src={image}
                  alt={`Circle member from ${location}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Quote panel */}
              <div className="flex flex-1 flex-col justify-center bg-gray-50 p-10 lg:p-14">
                <span
                  className="mb-4 block font-display text-6xl font-black leading-none text-primary/15"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <p className="text-xl font-light leading-relaxed text-charcoal lg:text-2xl">
                  {quote}
                </p>
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <p className="text-sm font-semibold text-charcoal">{name}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-teal">
                    {location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous testimonial"
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center
          justify-center rounded-full bg-white shadow-md text-charcoal
          transition-colors hover:bg-primary hover:text-white
          focus-visible:outline-2 focus-visible:outline-primary"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next testimonial"
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center
          justify-center rounded-full bg-white shadow-md text-charcoal
          transition-colors hover:bg-primary hover:text-white
          focus-visible:outline-2 focus-visible:outline-primary"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonial navigation">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to testimonial ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-6 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className="font-display text-base font-semibold text-charcoal md:text-lg">{q}</span>
        <span
          className={`ml-4 shrink-0 text-xl text-gray-400 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm font-light leading-relaxed text-gray-600 md:text-base">
          {a}
        </p>
      )}
    </div>
  )
}

export default function CirclesContent() {
  return (
    <>
      {/* Go further, faster — dark section with stats */}
      <section className="py-24" style={{ backgroundColor: '#EDDDD4' }} aria-labelledby="go-further-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal">
                Why it works
              </p>
              <h2
                id="go-further-heading"
                className="font-display text-4xl font-bold leading-tight tracking-tight text-charcoal md:text-5xl"
              >
                Go further, faster.
              </h2>
              <p className="mt-6 text-lg font-light leading-relaxed text-charcoal/70">
                You'll get access to proven leadership lessons and practical activities
                designed to build your skills and confidence. Your Circle peers will offer
                accountability and support every step of the way.
              </p>
              <a
                href="https://connect.leanin.org"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-block rounded-full bg-primary px-7 py-3 text-sm font-semibold
                  text-white transition-colors hover:bg-primary-hover
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Start Your Circle
              </a>
            </div>
            <ul className="grid grid-cols-2 gap-4" role="list">
              {[
                { stat: '95%', label: 'say their Circle led to positive changes in their life' },
                { stat: '2×', label: 'more likely to get a promotion or raise' },
                { stat: '150K+', label: 'Circles active in 180+ countries worldwide' },
                { stat: '8–12', label: 'members per Circle for meaningful connection' },
              ].map(({ stat, label }) => (
                <li key={stat} className="rounded-2xl border border-charcoal/10 bg-white p-6">
                  <p className="font-display text-3xl font-bold text-primary">{stat}</p>
                  <p className="mt-2 text-sm font-light leading-snug text-charcoal/60">{label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Connect with other women — testimonial carousel */}
      <section className="py-24" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
              Circle members
            </p>
            <h2
              id="testimonials-heading"
              className="font-display text-4xl font-bold tracking-tight text-charcoal md:text-5xl"
            >
              Connect with other women
            </h2>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Everything you need */}
      <section className="bg-gray-50 py-24" aria-labelledby="features-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
              What's included
            </p>
            <h2
              id="features-heading"
              className="font-display text-4xl font-bold tracking-tight text-charcoal md:text-5xl"
            >
              Everything you need to lead your Circle
            </h2>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
            {FEATURES.map(({ title, description }) => (
              <li key={title} className="rounded-2xl bg-white p-7 shadow-sm">
                <h3 className="font-display text-lg font-semibold text-charcoal">{title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-gray-600">
                  {description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24" aria-labelledby="faq-heading">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="mb-12">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
              Common questions
            </p>
            <h2
              id="faq-heading"
              className="font-display text-4xl font-bold tracking-tight text-charcoal md:text-5xl"
            >
              Frequently asked questions
            </h2>
          </div>
          <div>
            {FAQS.map(faq => (
              <FAQItem key={faq.q} {...faq} />
            ))}
          </div>
          <p className="mt-10 text-sm font-light text-gray-500">
            Still have questions?{' '}
            <a
              href={`${LIVE}/circles/`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-teal underline underline-offset-2 hover:text-primary"
            >
              Visit our full Circles guide
            </a>{' '}
            or reach out to the Lean In team.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 text-center text-white" style={{ backgroundColor: '#772e25' }}>
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">
            Ready to find your people?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg font-light text-white/70">
            Join 150,000+ Circles in 180 countries. It only takes a few minutes to begin.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="https://connect.leanin.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-bold text-[#772e25]
                transition-colors hover:bg-gray-100
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Start a Circle
            </a>
            <a
              href={`${LIVE}/networks/`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white px-8 py-3 text-sm font-bold text-white
                transition-colors hover:bg-white hover:text-primary
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Find a Circle near you
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

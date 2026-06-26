'use client'

import { useState } from 'react'
import Image from 'next/image'

const LIVE = 'https://leanin.org'

const CIRCLE_STEPS = [
  {
    image: 'https://leanin.org/media/images/Circles_LP_Step_1.2e16d0ba.fill-500x333.jpg',
    title: 'Get started online',
    description: 'Create an account and register your Circle to unlock all resources.',
  },
  {
    image: 'https://leanin.org/media/images/Circles_LP_Step_2.2e16d0ba.fill-500x333.jpg',
    title: 'Attend Circle Leader Training',
    description: 'Join complimentary virtual sessions for guidance and practical tools.',
  },
  {
    image: 'https://leanin.org/media/images/Circle_Step_3.2e16d0ba.fill-500x333.jpg',
    title: 'Invite members',
    description: 'Use customizable templates to invite women you know and respect.',
  },
  {
    image: 'https://leanin.org/media/images/Circles_LP_Step_4.2e16d0ba.fill-500x333.jpg',
    title: 'Host your first meeting',
    description: 'Use our step-by-step agendas and discussion guides to run your first session.',
  },
  {
    image: 'https://leanin.org/media/images/41268458e4e86a84f847ac2204fffa0ca4.2e16d0ba.fill-500x333.jpg',
    title: 'Build the habit',
    description: 'Schedule regular monthly meetings and pick discussion topics in advance.',
  },
  {
    image: 'https://leanin.org/media/images/Circles_LP_Step_6.2e16d0ba.fill-500x333.jpg',
    title: 'Join a Network',
    description: 'Connect with other Circle Leaders and join local Lean In community events.',
  },
]

const TESTIMONIALS = [
  {
    quote:
      "In the times of AI and rapid transformation, I am convinced that women-led communities are not optional — they are essential infrastructure. They create safer spaces to learn, challenge bias, and enable women to lead authentically.",
    location: 'India',
  },
  {
    quote:
      "My Circle gave me the confidence to negotiate my salaries and promotions, find mentorship and sponsorship. It gave me the tools to navigate a difficult workplace for women.",
    location: 'Netherlands',
  },
  {
    quote:
      "Because of my Circle I found the career change I was looking for, as simple as that. It made me see the opportunities in front of me, finding the courage to dare.",
    location: 'Spain',
  },
  {
    quote:
      "My Circle has taught me that success doesn't have to be lonely. That persistence is easier when it's shared. And that community can be the difference between giving up and continuing forward.",
    location: 'Greece',
  },
]

const FEATURES = [
  {
    title: 'Leadership materials',
    description:
      'Step-by-step meeting guides and research-backed leadership curriculum.',
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
    a: 'Starting a Circle is simple. Gather a small group of women committed to growing together and register your Circle on connect.leanin.org. We provide free meeting guides, leadership tips for Circle leaders, and ongoing support and resources. You don\'t need to be an expert — you just need to be willing to facilitate conversation and create space for others.',
  },
  {
    q: 'How do Lean In Circles help women advance at work?',
    a: 'Circles help women build confidence, strengthen leadership skills, and take concrete steps toward their goals. Members practice negotiating and self-advocacy, giving and receiving feedback, setting boundaries, and navigating bias and setbacks. When women support each other, they are more likely to stay ambitious — and to stay in the workforce.',
  },
  {
    q: 'Are Lean In Circles only for working women?',
    a: 'Lean In Circles are for women at all stages of life and career — including students, entrepreneurs, women returning to work, and those navigating career transitions. Some Circles are women-only spaces. Others are open to allies. Each Circle sets its own guidelines.',
  },
]

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
      {/* Start your Circle — 6 steps with circular images */}
      <section className="py-24" aria-labelledby="start-circle-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
              How it works
            </p>
            <h2
              id="start-circle-heading"
              className="font-display text-4xl font-bold tracking-tight text-charcoal md:text-5xl"
            >
              Start a Circle in 6 steps
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg font-light text-gray-600">
              Anyone can lead a Circle — no expertise required, just the willingness
              to create space for honest conversation.
            </p>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2" role="list">
            {CIRCLE_STEPS.map((step, i) => (
              <li key={step.title} className="flex items-center gap-5 rounded-2xl bg-gray-50 p-5">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-4 ring-white">
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-gray-400">
                    {i + 1}
                  </span>
                  <h3 className="mt-1 font-display text-base font-semibold text-charcoal">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs font-light leading-relaxed text-gray-600">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-14 text-center">
            <a
              href="https://connect.leanin.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-primary px-8 py-3 text-sm font-bold text-white
                transition-colors hover:bg-primary-hover
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Start a Circle today
            </a>
          </div>
        </div>
      </section>

      {/* Go further, faster — dark section with stats */}
      <section className="bg-gray-900 py-24 text-white" aria-labelledby="go-further-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-teal">
                Why it works
              </p>
              <h2
                id="go-further-heading"
                className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl"
              >
                Go further, faster.
              </h2>
              <p className="mt-6 text-lg font-light leading-relaxed text-white/70">
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
                Start a Circle
              </a>
            </div>
            <ul className="grid grid-cols-2 gap-4" role="list">
              {[
                { stat: '95%', label: 'say their Circle led to positive changes in their life' },
                { stat: '2×', label: 'more likely to get a promotion or raise' },
                { stat: '150K+', label: 'Circles active in 180+ countries worldwide' },
                { stat: '8–12', label: 'members per Circle for meaningful connection' },
              ].map(({ stat, label }) => (
                <li key={stat} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="font-display text-3xl font-bold text-primary">{stat}</p>
                  <p className="mt-2 text-sm font-light leading-snug text-white/60">{label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Member testimonials */}
      <section className="py-24" aria-labelledby="testimonials-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">
              Member stories
            </p>
            <h2
              id="testimonials-heading"
              className="font-display text-4xl font-bold tracking-tight text-charcoal md:text-5xl"
            >
              What Circle members say
            </h2>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2" role="list">
            {TESTIMONIALS.map(({ quote, location }) => (
              <li key={location} className="flex flex-col rounded-2xl bg-gray-50 p-8">
                <p className="flex-1 text-lg font-light leading-relaxed text-charcoal">
                  &ldquo;{quote}&rdquo;
                </p>
                <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-teal">
                  {location}
                </p>
              </li>
            ))}
          </ul>
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-24 text-center text-white">
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
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-primary
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

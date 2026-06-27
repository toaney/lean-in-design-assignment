import type { Metadata } from 'next'
import { CIRCLE_STEPS, CIRCLES } from '@/lib/data/circles'
import CirclesPageClient from '@/components/circles/CirclesPageClient'

export const metadata: Metadata = {
  title: 'Circles',
  description:
    "Start or join a Lean In Circle — a peer group of women who meet regularly to support each other's goals and advance their careers.",
}

export default function CirclesPage() {
  return (
    <CirclesPageClient
      steps={CIRCLE_STEPS}
      circles={CIRCLES}
    />
  )
}

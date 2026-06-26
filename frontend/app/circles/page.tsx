import type { Metadata } from 'next'
import { fetchCircleSteps, fetchCircles } from '@/lib/api'
import ScrollExperience from '@/components/circles/ScrollExperience'
import CirclesDirectory from '@/components/circles/CirclesDirectory'
import CirclesPageClient from '@/components/circles/CirclesPageClient'

export const metadata: Metadata = {
  title: 'Circles',
  description:
    "Start or join a Lean In Circle — a peer group of women who meet regularly to support each other's goals and advance their careers.",
}

export default async function CirclesPage() {
  const [stepsData, circlesData] = await Promise.all([
    fetchCircleSteps(true),
    fetchCircles(true),
  ])

  return (
    <CirclesPageClient
      steps={stepsData.steps}
      circles={circlesData.circles}
    />
  )
}

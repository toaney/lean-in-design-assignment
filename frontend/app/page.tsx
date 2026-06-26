import { fetchHomeStats, fetchFeaturedArticles } from '@/lib/api'
import HeroSection from '@/components/home/HeroSection'
import CirclesHero from '@/components/home/CirclesHero'
import WomenWorkplaceSection from '@/components/home/WomenWorkplaceSection'
import ResearchSection from '@/components/home/ResearchSection'
import PracticalAdviceSection from '@/components/home/PracticalAdviceSection'
import MoreResearchSection from '@/components/home/MoreResearchSection'

export default async function HomePage() {
  const [stats, featured] = await Promise.all([
    fetchHomeStats(true),
    fetchFeaturedArticles(true),
  ])

  return (
    <>
      <HeroSection />
      <CirclesHero stats={stats} />
      <WomenWorkplaceSection />
      <ResearchSection articles={featured.articles} />
      <PracticalAdviceSection />
      <MoreResearchSection />
    </>
  )
}

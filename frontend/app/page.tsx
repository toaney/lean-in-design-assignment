import { HOME_STATS } from '@/lib/data/home'
import { FEATURED_ARTICLE_IDS } from '@/lib/data/home'
import { ARTICLES } from '@/lib/data/articles'
import HeroSection from '@/components/home/HeroSection'
import CirclesHero from '@/components/home/CirclesHero'
import WomenWorkplaceSection from '@/components/home/WomenWorkplaceSection'
import ResearchSection from '@/components/home/ResearchSection'
import PracticalAdviceSection from '@/components/home/PracticalAdviceSection'
import MoreResearchSection from '@/components/home/MoreResearchSection'

export default function HomePage() {
  const idSet = new Set(FEATURED_ARTICLE_IDS)
  const featured = ARTICLES
    .filter(a => idSet.has(a.id))
    .sort((a, b) => FEATURED_ARTICLE_IDS.indexOf(a.id) - FEATURED_ARTICLE_IDS.indexOf(b.id))

  return (
    <>
      <HeroSection />
      <CirclesHero stats={HOME_STATS} />
      <WomenWorkplaceSection />
      <ResearchSection articles={featured} />
      <PracticalAdviceSection />
      <MoreResearchSection />
    </>
  )
}

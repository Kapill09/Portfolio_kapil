import { achievements } from '@/data/achievements'
import { AchievementsList } from '@/components/achievements/AchievementsList'
import { Footer } from '@/components/layout/Footer'

export const metadata = {
  title: 'Achievements & Recognition - Kapil Meena',
  description: 'Certifications, competitions, hackathons, and milestones by Kapil Meena.',
}

export default function AchievementsPage() {
  return (
    <>
      <AchievementsList achievements={achievements} />
      <Footer />
    </>
  )
}

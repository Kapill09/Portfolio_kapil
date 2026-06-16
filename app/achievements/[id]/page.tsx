import { notFound } from 'next/navigation'
import { achievements, getAchievementById } from '@/data/achievements'
import { AchievementDetail } from '@/components/achievements/AchievementDetail'
import { Footer } from '@/components/layout/Footer'

interface AchievementPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return achievements.map((achievement) => ({
    id: achievement.id,
  }))
}

export async function generateMetadata({ params }: AchievementPageProps) {
  const { id } = await params
  const achievement = getAchievementById(id)

  if (!achievement) {
    return { title: 'Achievement Not Found' }
  }

  return {
    title: `${achievement.title} - Kapil Meena`,
    description: achievement.summary,
  }
}

export default async function AchievementPage({ params }: AchievementPageProps) {
  const { id } = await params
  const achievement = getAchievementById(id)

  if (!achievement) {
    notFound()
  }

  return (
    <>
      <AchievementDetail achievement={achievement} />
      <Footer />
    </>
  )
}

'use client'

import { motion } from 'framer-motion'
import type { Achievement } from '@/data/achievements'
import { Container } from '@/components/layout/Container'
import { FloatingBackButton } from '@/components/projects/FloatingBackButton'

interface AchievementDetailProps {
  achievement: Achievement
}

export function AchievementDetail({ achievement }: AchievementDetailProps) {
  return (
    <motion.main
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen overflow-x-hidden pb-20 pt-32 md:pb-28 md:pt-36"
    >
      <FloatingBackButton href="/achievements" label="Achievements" />

      <Container className="max-w-[1120px]">
        <div className="grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="space-y-4">
            {(achievement.images || [achievement.image]).map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="box-border min-w-0 max-w-[342px] overflow-hidden rounded-2xl border border-[hsl(var(--cloud-border))] bg-white/86 p-3 shadow-[var(--shadow-cloud)] backdrop-blur-md dark:bg-black/35 sm:max-w-full"
              >
                <img
                  src={img}
                  alt={`${achievement.title} certificate ${index + 1}`}
                  className="block max-w-full rounded-xl"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="box-border min-w-0 max-w-[342px] overflow-hidden rounded-2xl border border-[hsl(var(--cloud-border))] bg-[hsl(var(--cloud-white)/0.78)] p-6 shadow-[var(--shadow-cloud)] backdrop-blur-md sm:max-w-full md:p-8"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--text-muted))]">
              {achievement.category}
            </p>
            <h1 className="break-words text-3xl font-extrabold leading-tight text-[hsl(var(--text-primary))] md:text-5xl">
              {achievement.title}
            </h1>
            <p className="mt-5 break-words text-lg leading-relaxed text-[hsl(var(--text-secondary))]">
              {achievement.description}
            </p>

            <dl className="mt-8 grid gap-4 border-t border-[hsl(var(--cloud-border))] pt-6">
              <div>
                <dt className="text-sm font-bold uppercase tracking-[0.16em] text-[hsl(var(--text-muted))]">
                  Date
                </dt>
                <dd className="mt-1 text-lg font-semibold text-[hsl(var(--text-primary))]">
                  {achievement.date}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-bold uppercase tracking-[0.16em] text-[hsl(var(--text-muted))]">
                  Organization
                </dt>
                <dd className="mt-1 text-lg font-semibold text-[hsl(var(--text-primary))]">
                  {achievement.organization}
                </dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </Container>
    </motion.main>
  )
}

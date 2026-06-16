'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Achievement } from '@/data/achievements'
import { Container } from '@/components/layout/Container'

interface AchievementsListProps {
  achievements: Achievement[]
}

export function AchievementsList({ achievements }: AchievementsListProps) {
  return (
    <motion.section
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen overflow-hidden pb-12 md:pb-20 lg:pb-28 pt-24 md:pt-28 lg:pt-36"
    >
      <Container className="max-w-[1080px]">
        <div className="mx-auto max-w-3xl text-center px-4">
          <motion.p
            className="mb-2 md:mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[hsl(var(--text-muted))]"
            style={{ animation: 'fade-rise 0.55s var(--ease-out-expo) both' }}
          >
            Awards
          </motion.p>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[hsl(var(--text-primary))]"
            style={{ animation: 'fade-rise 0.65s var(--ease-out-expo) 80ms both' }}
          >
            Achievements & Recognition
          </motion.h1>
          <motion.p
            className="mx-auto mt-3 md:mt-5 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-[hsl(var(--text-secondary))]"
            style={{ animation: 'fade-rise 0.65s var(--ease-out-expo) 140ms both' }}
          >
            A collection of certifications, competitions, hackathons, and milestones.
          </motion.p>
        </div>

        <div className="mt-8 md:mt-12 lg:mt-14 grid gap-3 md:gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.28 }}
              transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={`/achievements/${achievement.id}`}
                className="group flex flex-col gap-3 md:gap-5 rounded-lg sm:rounded-xl md:rounded-2xl border border-[hsl(var(--cloud-border))] bg-[hsl(var(--cloud-white)/0.76)] p-3 sm:p-4 md:p-5 shadow-[var(--shadow-cloud)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--accent)/0.45)] hover:shadow-[var(--shadow-cloud-hover)] md:flex-row md:items-center"
              >
                <div
                  className="hidden shrink-0 overflow-hidden rounded-lg sm:rounded-xl border border-black/5 bg-white shadow-inner dark:border-white/10 md:block"
                  style={{ width: 160, height: 120, minWidth: 160, minHeight: 120 }}
                >
                  <img
                    src={achievement.image}
                    alt={`${achievement.title} certificate thumbnail`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-2 md:mb-3 flex flex-wrap items-center gap-1.5 md:gap-2">
                    <span className="rounded-full bg-[hsl(var(--accent-soft))] px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-bold uppercase tracking-[0.12em] text-[hsl(var(--accent))]">
                      {achievement.category}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-[hsl(var(--text-muted))] truncate">
                      {achievement.date} / {achievement.organization}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[hsl(var(--text-primary))]">
                    {achievement.title}
                  </h2>
                  <p className="mt-1.5 md:mt-2 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-[hsl(var(--text-secondary))]">
                    {achievement.summary}
                  </p>
                </div>

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--cloud-border))] text-[hsl(var(--text-muted))] transition-all duration-300 group-hover:border-[hsl(var(--accent)/0.38)] group-hover:bg-[hsl(var(--accent-soft))] group-hover:text-[hsl(var(--accent))]">
                  <ArrowUpRight className="size-5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </motion.section>
  )
}

'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Project } from '@/data/projects'

interface ProjectTechProps {
  project: Project
}

export function ProjectTech({ project }: ProjectTechProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useScrollAnimation(ref)

  const allTechs = Object.values(project.techStackGroups).flat()
  const uniqueTechs = Array.from(new Set(allTechs))

  return (
    <section id="tech-stack" className="py-6 md:py-8 lg:py-12 border-y border-[hsl(var(--cloud-border))] scroll-mt-28">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6 md:gap-12"
        >
          <h3 className="text-xs sm:text-sm font-semibold tracking-widest text-[hsl(var(--text-muted))] uppercase shrink-0 pt-0.5 sm:pt-1">
            Technologies
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-[hsl(var(--text-primary))] font-medium leading-relaxed break-words">
            {uniqueTechs.join(' / ')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

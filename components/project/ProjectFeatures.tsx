'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Project } from '@/data/projects'

interface ProjectFeaturesProps {
  project: Project
}

export function ProjectFeatures({ project }: ProjectFeaturesProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useScrollAnimation(ref)

  // Get only first 6 features
  const features = project.features.slice(0, 6)

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--text-primary))] mb-6 md:mb-8 lg:mb-12" style={{ letterSpacing: '-0.02em' }}>
            Key Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-4 sm:p-5 md:p-6 lg:p-7 rounded-lg border border-[hsl(var(--cloud-border))] bg-[hsl(var(--sky-start))/0.2] backdrop-blur-sm hover:border-[hsl(var(--accent))] hover:bg-[hsl(var(--sky-start))/0.3] transition-all duration-300"
              >
                {/* Feature Icon Placeholder */}
                <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gradient-to-br from-[hsl(var(--accent))] to-blue-600 flex items-center justify-center mb-3 sm:mb-4 text-white font-bold text-sm sm:text-lg">
                  {i + 1}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[hsl(var(--text-primary))] mb-2" style={{ letterSpacing: '-0.01em' }}>
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-[hsl(var(--text-secondary))] leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

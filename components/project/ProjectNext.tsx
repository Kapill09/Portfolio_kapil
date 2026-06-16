'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { projects } from '@/data/projects'
import type { Project } from '@/data/projects'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Magnetic } from '@/components/magnetic/Magnetic'

interface ProjectNextProps {
  project: Project
}

export function ProjectNext({ project }: ProjectNextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useScrollAnimation(ref)

  const currentIndex = projects.findIndex((p) => p.id === project.id)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1]
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Separator */}
          <div className="w-full h-px bg-[hsl(var(--cloud-border))] mb-8 md:mb-10 lg:mb-12" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
            {/* Previous Project */}
            <Magnetic maxDistance={15}>
              <Link 
                href={`/projects/${prevProject.id}`} 
                className="group flex flex-col items-center md:items-start text-center md:text-left transition-colors w-full md:w-auto"
              >
                <span className="text-xs sm:text-sm font-medium text-[hsl(var(--text-muted))] uppercase tracking-widest mb-1.5 sm:mb-2 flex items-center gap-2">
                  <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:-translate-x-1 flex-shrink-0" />
                  Previous Project
                </span>
                <span className="text-lg sm:text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))] group-hover:text-[hsl(var(--accent))] transition-colors duration-300 break-words">
                  {prevProject.title}
                </span>
              </Link>
            </Magnetic>

            {/* Next Project */}
            <Magnetic maxDistance={15}>
              <Link 
                href={`/projects/${nextProject.id}`} 
                className="group flex flex-col items-center md:items-end text-center md:text-right transition-colors w-full md:w-auto"
              >
                <span className="text-xs sm:text-sm font-medium text-[hsl(var(--text-muted))] uppercase tracking-widest mb-1.5 sm:mb-2 flex items-center gap-2">
                  Next Project
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" />
                </span>
                <span className="text-lg sm:text-2xl md:text-3xl font-bold text-[hsl(var(--text-primary))] group-hover:text-[hsl(var(--accent))] transition-colors duration-300 break-words">
                  {nextProject.title}
                </span>
              </Link>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Github } from '@/components/ui/Icons'
import { Magnetic } from '@/components/magnetic/Magnetic'
import type { Project } from '@/data/projects'
import { ProjectVisual } from '@/components/projects/ProjectVisual'

interface ProjectHeroProps {
  project: Project
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="pt-20 sm:pt-24 md:pt-28 lg:pt-36 pb-8 md:pb-12">
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1600px] mx-auto">
        <div className="mx-auto w-full max-w-[92%] sm:max-w-[90%] md:max-w-full">
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          layoutId={`project-visual-${project.id}`}
          className="relative w-full aspect-[3/2] sm:aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] rounded-lg sm:rounded-2xl md:rounded-3xl overflow-hidden bg-gradient-to-br shadow-lg md:shadow-2xl"
          style={{ animation: 'fade-rise 0.75s var(--ease-out-expo) both' }}
        >
          <ProjectVisual project={project} label={`${project.title} hero image`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-black/5" />

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 lg:p-16">
            <h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 md:mb-4 text-balance leading-tight"
              style={{ textShadow: '0 4px 20px rgba(0,0,0,0.18)' }}
            >
              {project.title}
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-2xl text-white/90 max-w-3xl font-medium mb-4 md:mb-6" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              {project.shortDescription}
            </p>
            <div className="mt-4 md:mt-7 flex flex-wrap gap-2 sm:gap-3">
              {project.github && (
                <Magnetic maxDistance={10}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/18 px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/28"
                  >
                    <Github className="size-4" />
                    GitHub
                  </a>
                </Magnetic>
              )}
              {project.link && (
                <Magnetic maxDistance={10}>
                  <a
                    href={project.link}
                    target={project.link.startsWith('http') ? '_blank' : undefined}
                    rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-bold text-[#172233] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90"
                  >
                    <ExternalLink className="size-4" />
                    Live Demo
                  </a>
                </Magnetic>
              )}
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  )
}

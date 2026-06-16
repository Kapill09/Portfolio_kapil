'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'
import { Container } from '@/components/layout/Container'
import { Footer } from '@/components/layout/Footer'
import { FloatingBackButton } from './FloatingBackButton'
import { ProjectCard } from './ProjectCard'

interface ProjectsGalleryProps {
  projects: Project[]
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  return (
    <>
      <FloatingBackButton href="/#projects" />
      <motion.section
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen overflow-hidden pb-20 pt-32 md:pb-28 md:pt-36"
      >
        <Container className="max-w-[1320px]">
          <div className="mx-auto max-w-3xl text-center px-4 sm:px-0">
            <motion.p
              className="mb-3 sm:mb-4 inline-flex rounded-full border-2 border-dashed border-[#bdbdb8] bg-[#fafaf8] px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold uppercase tracking-[.18em] text-[hsl(var(--text-muted))] shadow-[0_3px_0_#cfcfca] dark:border-white/15 dark:bg-black/45"
              style={{ animation: 'fade-rise 0.55s var(--ease-out-expo) both' }}
            >
              Projects Gallery
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[hsl(var(--text-primary))]"
              style={{ animation: 'fade-rise 0.65s var(--ease-out-expo) 80ms both' }}
            >
              Selected work in one place.
            </motion.h1>
            <motion.p
              className="mx-auto mt-4 sm:mt-5 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-[hsl(var(--text-secondary))]"
              style={{ animation: 'fade-rise 0.65s var(--ease-out-expo) 140ms both' }}
            >
              A polished shelf of products, experiments, and case studies built from the central project data.
            </motion.p>
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            className="mt-8 sm:mt-12 md:mt-14 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </Container>
      </motion.section>
      <Footer />
    </>
  )
}

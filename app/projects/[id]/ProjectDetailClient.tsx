'use client'

import { motion } from 'framer-motion'
import type { Project } from '@/data/projects'
import { ProjectHero } from '@/components/project/ProjectHero'
import { ProjectStory } from '@/components/project/ProjectStory'
import { ProjectFeatures } from '@/components/project/ProjectFeatures'
import { ProjectTech } from '@/components/project/ProjectTech'
import { ProjectGallery } from '@/components/project/ProjectGallery'
import { ProjectNext } from '@/components/project/ProjectNext'
import { Footer } from '@/components/layout/Footer'
import { FloatingBackButton } from '@/components/projects/FloatingBackButton'

interface ProjectDetailClientProps {
  project: Project
}

export function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <FloatingBackButton href="/projects" />
      <ProjectHero project={project} />
      <ProjectTech project={project} />
      <ProjectStory project={project} />
      <ProjectFeatures project={project} />
      <ProjectGallery project={project} />
      <ProjectNext project={project} />
      <Footer />
    </motion.div>
  )
}

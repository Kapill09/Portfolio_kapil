'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Folder } from '@/components/projects/Folder'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function Projects() {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingVisible = useScrollAnimation(headingRef)

  return (
    <section id="projects" className="overflow-hidden py-12 sm:py-16 md:py-20 lg:py-32">
      <Container>
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <SectionHeading
            title="Featured Projects"
            subtitle="A few things I've designed and built. Hover over the folder to take a closer look."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 45 }}
          animate={isHeadingVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 md:mt-6 lg:mt-8"
        >
          <Folder />
        </motion.div>
      </Container>
    </section>
  )
}

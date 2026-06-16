'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Project } from '@/data/projects'

interface ProjectStoryProps {
  project: Project
}

// Parse markdown-like list format into components
function ParsedContent({ content, accentColor = 'hsl(var(--accent))' }: { content: string | string[], accentColor?: string }) {
  // Handle array input directly
  if (Array.isArray(content)) {
    return (
      <ul className="space-y-3 mb-4">
        {content.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-3 h-3 rounded-full mt-2" style={{ backgroundColor: accentColor }} />
            <span className="text-[hsl(var(--text-secondary))] leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  const lines = content.split('\n').filter(line => line.trim())
  const elements = []
  let isInList = false
  let listItems: string[] = []

  for (const line of lines) {
    if (line.startsWith('###')) {
      // Render accumulated list if any
      if (listItems.length > 0) {
        elements.push({ type: 'list', items: listItems })
        listItems = []
        isInList = false
      }
      // Add heading
      const heading = line.replace(/###\s*/, '').trim()
      elements.push({ type: 'heading', content: heading })
    } else if (line.startsWith('- ') || line.startsWith('• ')) {
      // Collect list items
      isInList = true
      listItems.push(line.replace(/^[-•]\s*/, '').trim())
    } else if (line.trim()) {
      // Render accumulated list if any
      if (listItems.length > 0) {
        elements.push({ type: 'list', items: listItems })
        listItems = []
        isInList = false
      }
      // Add paragraph
      elements.push({ type: 'paragraph', content: line.trim() })
    }
  }

  // Render remaining list
  if (listItems.length > 0) {
    elements.push({ type: 'list', items: listItems })
  }

  return (
    <>
      {elements.map((el, idx) => {
        if (el.type === 'heading') {
          return (
            <h4 key={idx} className="text-base font-semibold text-[hsl(var(--text-primary))] mt-6 mb-4 first:mt-0">
              {el.content}
            </h4>
          )
        } else if (el.type === 'list') {
          return (
            <ul key={idx} className="space-y-3 mb-4">
              {el.items?.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-3 h-3 rounded-full mt-2" style={{ backgroundColor: accentColor }} />
                  <span className="text-[hsl(var(--text-secondary))] leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          )
        } else {
          return (
            <p key={idx} className="text-[hsl(var(--text-secondary))] leading-relaxed mb-4">
              {el.content}
            </p>
          )
        }
      })}
    </>
  )
}

export function ProjectStory({ project }: ProjectStoryProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useScrollAnimation(ref)

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-32">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* SECTION 1: OVERVIEW */}
          <div className="mb-12 md:mb-16 lg:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--text-primary))] mb-4 md:mb-6 lg:mb-8" style={{ letterSpacing: '-0.02em' }}>
              Overview
            </h2>
            <div className="text-base sm:text-lg text-[hsl(var(--text-secondary))] leading-relaxed">
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-[hsl(var(--text-primary))]">
                {project.story.overview || project.story.problem}
              </p>
            </div>
          </div>

          {/* SECTION 2: HOW IT WORKS */}
          {project.howItWorks && project.howItWorks.length > 0 && (
            <div className="mb-12 md:mb-16 lg:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[hsl(var(--text-primary))] mb-4 md:mb-6 lg:mb-8" style={{ letterSpacing: '-0.02em' }}>
                How It Works
              </h2>
              <div className="text-base sm:text-lg text-[hsl(var(--text-secondary))] leading-relaxed space-y-6 md:space-y-8 lg:space-y-10 max-w-3xl">
                {project.howItWorks.map((step) => (
                  <div key={step.number}>
                    <h4 className="font-semibold text-[hsl(var(--text-primary))] mb-2">{step.number}. {step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: PROBLEM SOLVED & IMPACT */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
            {/* Problem Solved Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg md:rounded-xl border border-[hsl(var(--accent)/0.35)] bg-[hsl(var(--cloud-white)/0.88)] dark:bg-[hsl(var(--cloud-white)/0.14)] backdrop-blur-sm hover:border-[hsl(var(--accent))] transition-all hover:shadow-lg"
              style={{
                boxShadow: '0 0 20px 1px hsl(var(--accent) / 0.18), 0 0 40px 2px hsl(var(--accent) / 0.08)'
              }}
            >
              <div className="h-px w-12 bg-[hsl(var(--accent))] mb-4 md:mb-6" />
              <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-[hsl(var(--text-primary))] mb-4 md:mb-6" style={{ letterSpacing: '-0.01em' }}>
                Problem Solved
              </h3>
              <div className="text-sm sm:text-base text-[hsl(var(--text-secondary))] leading-relaxed [&_ul_span:first-child]:bg-white">
                <ParsedContent content={project.story.problem} />
              </div>
            </motion.div>

            {/* Impact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg md:rounded-xl border border-emerald-100/40 bg-emerald-50/90 dark:border-emerald-500/40 dark:bg-emerald-500/12 backdrop-blur-sm hover:border-emerald-200 transition-all hover:shadow-lg"
              style={{
                boxShadow: '0 0 10px 1px rgba(16, 185, 129, 0.06), 0 0 14px 2px rgba(16, 185, 129, 0.03)'
              }}
            >
              <div className="h-px w-12 bg-emerald-200 mb-4 md:mb-6" />
              <h3 className="text-xl sm:text-2xl md:text-2xl font-bold text-[hsl(var(--text-primary))] mb-4 md:mb-6" style={{ letterSpacing: '-0.01em' }}>
                Impact
              </h3>
              <div className="text-sm sm:text-base text-[hsl(var(--text-secondary))] leading-relaxed [&_ul_span:first-child]:bg-emerald-50/80">
                <ParsedContent content={project.story.impact} accentColor="rgb(52, 211, 153)" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

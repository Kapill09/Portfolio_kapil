'use client'

import { useRef } from 'react'
import { Container } from '@/components/layout/Container'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

export function Education() {
  const ref = useRef<HTMLDivElement>(null)
  const isVisible = useScrollAnimation(ref)

  return (
    <section id="education" className="py-12 sm:py-16 md:py-20 lg:py-32">
      <Container>
        <div
          ref={ref}
          className={`max-w-[800px] mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-8 md:mb-10 lg:mb-12">
            <div className="h-px bg-gradient-to-r from-[hsl(var(--cloud-border))] to-transparent flex-1" />
            <span className="text-xs sm:text-sm font-semibold tracking-widest text-[hsl(var(--text-muted))] uppercase whitespace-nowrap">
              Academic
            </span>
            <div className="h-px bg-gradient-to-r from-transparent to-[hsl(var(--cloud-border))] flex-1" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--text-primary))] mb-8 md:mb-10 lg:mb-12 text-center" style={{ letterSpacing: '-0.02em' }}>
            Education
          </h2>

          <div className="relative pl-6 sm:pl-8 md:pl-0">
            {/* Desktop timeline line - hidden on mobile */}
            <div className="hidden md:block absolute left-[30%] top-0 bottom-0 w-px bg-[hsl(var(--cloud-border))]" />

            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 lg:gap-16">
              {/* Timeline Info */}
              <div className="md:w-[30%] md:text-right shrink-0 relative">
                {/* Timeline dot */}
                <div className="absolute left-[-26px] sm:left-[-32px] md:left-auto md:right-[-32px] top-1 sm:top-1.5 w-3 h-3 rounded-full bg-[hsl(var(--accent))] ring-4 ring-[hsl(var(--sky-start))]" />
                
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-[hsl(var(--text-primary))]">
                  2023 - 2027
                </h3>
                <p className="text-xs sm:text-sm text-[hsl(var(--text-muted))] mt-1">Delhi, India</p>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[hsl(var(--text-primary))] mb-1.5 sm:mb-2" style={{ letterSpacing: '-0.01em' }}>
                  National Institute of Technology Delhi
                </h3>
                <p className="text-base sm:text-lg text-[hsl(var(--accent))] font-medium mb-4 md:mb-6">
                  Bachelor of Technology in Computer Science and Engineering
                </p>
                
                <p className="text-sm sm:text-base md:text-lg text-[hsl(var(--text-secondary))] leading-relaxed">
                  At NIT Delhi, I have been building a strong foundation in computer science through software development, machine learning, and problem-solving. Alongside academics, I enjoy transforming ideas into practical products, from full-stack web applications to data-driven systems. My journey has focused on continuously learning, building, and improving through hands-on projects and real-world challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

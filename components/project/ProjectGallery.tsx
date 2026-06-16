'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import type { Project } from '@/data/projects'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProjectGalleryProps {
  project: Project
}

export function ProjectGallery({ project }: ProjectGalleryProps) {
  const headingRef = useRef<HTMLDivElement>(null)
  const isHeadingVisible = useScrollAnimation(headingRef)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const images = project.gallery

  if (!images || images.length === 0) return null

  const goTo = (newIndex: number) => {
    setDirection(newIndex > currentIndex ? 1 : -1)
    setCurrentIndex(newIndex)
  }

  const goNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeadingVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 md:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[hsl(var(--text-primary))] mb-2 sm:mb-3 md:mb-4" style={{ letterSpacing: '-0.02em' }}>
            Gallery
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[hsl(var(--text-secondary))] max-w-xl mx-auto">
            Visual snapshots of the project in action.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isHeadingVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="cloud-container p-0 overflow-hidden"
          style={{ borderRadius: 'var(--radius-xl)' }}
        >
          {/* Clean gallery frame */}
          <div className="relative rounded-lg sm:rounded-2xl md:rounded-3xl overflow-hidden bg-[hsl(var(--cloud-white))] shadow-lg md:shadow-2xl border border-[hsl(var(--cloud-border))]">
            <div className="px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 border-b border-[hsl(var(--cloud-border))] bg-[hsl(var(--cloud-white))]">
              <div className="text-xs sm:text-sm uppercase tracking-[0.26em] font-semibold text-[hsl(var(--text-muted))]">
                {project.title} gallery
              </div>
            </div>

            {/* Image area */}
            <div className="relative aspect-[16/9] sm:aspect-[4/3] md:aspect-[16/9] bg-gradient-to-br from-[hsl(var(--cloud-white))] to-[hsl(var(--cloud-border)_/_0.3)] overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentIndex]}
                    alt={`${project.title} screenshot ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    priority={currentIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-lg flex items-center justify-center text-[hsl(var(--text-primary))] hover:bg-white dark:hover:bg-black/70 transition-all duration-300 hover:scale-105"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-md shadow-lg flex items-center justify-center text-[hsl(var(--text-primary))] hover:bg-white dark:hover:bg-black/70 transition-all duration-300 hover:scale-105"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 py-3 md:py-5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'w-6 sm:w-8 h-2 sm:h-2.5 bg-[hsl(var(--accent))]'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[hsl(var(--text-muted)_/_0.3)] hover:bg-[hsl(var(--text-muted)_/_0.5)]'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

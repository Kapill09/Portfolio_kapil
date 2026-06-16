'use client'

import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface MagneticCardProps {
  children: React.ReactNode
  className?: string
  /** Maximum rotation in degrees */
  maxRotation?: number
  /** Maximum translation/shift in pixels */
  maxShift?: number
}

export function MagneticCard({ children, className = '', maxRotation = 5, maxShift = 10 }: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Spring physics for smooth entry/exit and movement
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  // Map mouse position to rotation and translation
  const rotateX = useTransform(springY, [-1, 1], [maxRotation, -maxRotation])
  const rotateY = useTransform(springX, [-1, 1], [-maxRotation, maxRotation])
  
  // OPTIMIZATION: Combine all transforms into single motion.div
  // Avoid nested motion.div which double-calculates transforms
  const translateX = useTransform(springX, [-1, 1], [-maxShift, maxShift])
  const translateY = useTransform(springY, [-1, 1], [-maxShift, maxShift])
  const innerTranslateX = useTransform(springX, [-1, 1], [-maxShift * 0.5, maxShift * 0.5])
  const innerTranslateY = useTransform(springY, [-1, 1], [-maxShift * 0.5, maxShift * 0.5])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    
    // Calculate relative mouse position between -1 and 1
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = (mouseX / rect.width) * 2 - 1
    const yPct = (mouseY / rect.height) * 2 - 1

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
      style={{
        transformPerspective: 1000,
        rotateX,
        rotateY,
        x: useTransform(
          [translateX, innerTranslateX],
          ([outer, inner]) => (outer as number) + (inner as number)
        ),
        y: useTransform(
          [translateY, innerTranslateY],
          ([outer, inner]) => (outer as number) + (inner as number)
        ),
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  )
}

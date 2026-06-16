'use client'

import React, { useRef, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticProps {
  children: React.ReactNode
  /** Maximum pixel distance the element can move from center */
  maxDistance?: number
  /** Sensitivity to cursor proximity (larger = attracts from further away) */
  range?: number
  className?: string
}

export function Magnetic({ children, maxDistance = 10, range = 100, className = '' }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // OPTIMIZATION: Premium spring physics with reduced damping for smoother feel
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  // OPTIMIZATION: Cache bounding rect to avoid repeated calculations
  const rectRef = useRef<DOMRect | null>(null)
  const lastUpdateRef = useRef<number>(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return

    const now = performance.now()
    // OPTIMIZATION: Only recalculate if bounding rect changes significantly
    // Update rect every 100ms or if mouse moved significantly
    if (now - lastUpdateRef.current > 100) {
      rectRef.current = ref.current.getBoundingClientRect()
      lastUpdateRef.current = now
    }

    const rect = rectRef.current
    if (!rect) return

    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    // OPTIMIZATION: Use squared distance to avoid sqrt() calls
    const distanceSquared = distanceX * distanceX + distanceY * distanceY
    const rangeSquared = range * range

    // If cursor is within range, attract
    if (distanceSquared < rangeSquared) {
      const distance = Math.sqrt(distanceSquared)
      // Calculate an intensity factor (closer = stronger pull, up to maxDistance)
      // using a smooth easing curve
      const intensity = 1 - distance / range
      x.set((distanceX / distance) * maxDistance * intensity)
      y.set((distanceY / distance) * maxDistance * intensity)
    } else {
      x.set(0)
      y.set(0)
    }
  }, [x, y, maxDistance, range])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
    rectRef.current = null
  }, [x, y])

  useEffect(() => {
    // OPTIMIZATION: Use passive: true for better scroll performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseout', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave])

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: springX, y: springY, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
}

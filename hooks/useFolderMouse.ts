'use client'

import { useCallback } from 'react'
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'

const spring = { stiffness: 150, damping: 24, mass: 0.7 }

export function useFolderMouse() {
  const prefersReducedMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, spring)
  const smoothY = useSpring(pointerY, spring)

  const rotateX = useTransform(smoothY, [-1, 1], [2.6, -2.6])
  const rotateY = useTransform(smoothX, [-1, 1], [-3.2, 3.2])
  const shiftX = useTransform(smoothX, [-1, 1], [-5, 5])

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLElement>) => {
      if (prefersReducedMotion || event.pointerType === 'touch') return

      const bounds = event.currentTarget.getBoundingClientRect()
      pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2)
      pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2)
    },
    [pointerX, pointerY, prefersReducedMotion],
  )

  const resetPointer = useCallback(() => {
    pointerX.set(0)
    pointerY.set(0)
  }, [pointerX, pointerY])

  return { rotateX, rotateY, shiftX, onPointerMove, resetPointer }
}


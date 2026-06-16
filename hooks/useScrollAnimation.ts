'use client'

import { useEffect, useState, RefObject } from 'react'

export function useScrollAnimation(ref: RefObject<HTMLElement | null>, threshold = 0.15): boolean {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element) // Only animate once
        }
      },
      { threshold }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [ref, threshold])

  return isVisible
}

import { useEffect, useState } from 'react'

interface ScrollPosition {
  x: number
  y: number
}

export function useScroll() {
  const [scroll, setScroll] = useState<ScrollPosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScroll({
        x: window.scrollX,
        y: window.scrollY,
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scroll
}

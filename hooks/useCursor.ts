import { useEffect, useState } from 'react'

interface CursorPosition {
  x: number
  y: number
}

export function useCursor() {
  const [cursor, setCursor] = useState<CursorPosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return cursor
}

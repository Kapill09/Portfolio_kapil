'use client'

import { useEffect, useState } from 'react'

export function StarField() {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Generate sparse, small stars
    const generated = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1 + 0.5, // 0.5px to 1.5px (very small)
      delay: Math.random() * 10,     // Staggered twinkle start
      duration: Math.random() * 4 + 4, // 4s to 8s (slow twinkle)
    }))
    setStars(generated)
  }, [])

  if (stars.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 hidden dark:block" aria-hidden="true">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white/80"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animation: `star-twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            willChange: 'opacity, transform',
          }}
        />
      ))}
    </div>
  )
}

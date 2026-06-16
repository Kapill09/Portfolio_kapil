'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return (
    <main className="relative z-10">
      {children}
    </main>
  )
}

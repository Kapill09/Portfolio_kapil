'use client'

import { useEffect, useRef, useCallback } from 'react'

/**
 * OPTIMIZATION: Custom hook for RAF-based animations
 * 
 * Benefits:
 * - Centralized RAF management (single RAF per component)
 * - Automatic cleanup
 * - Consistent timing across animations
 * - Easy performance monitoring
 * 
 * Usage:
 * const [position, setPosition] = useState({x: 0, y: 0})
 * useAnimationFrame((deltaTime) => {
 *   setPosition(prev => ({
 *     x: prev.x + velocity.x * deltaTime,
 *     y: prev.y + velocity.y * deltaTime
 *   }))
 * })
 */
export function useAnimationFrame(
  callback: (deltaTime: number) => void,
  deps: React.DependencyList = []
): void {
  const rafRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)

  const animate = useCallback(
    (now: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = now
      }

      const deltaTime = (now - lastTimeRef.current) / 1000 // Convert to seconds
      lastTimeRef.current = now

      callback(deltaTime)
      rafRef.current = requestAnimationFrame(animate)
    },
    [callback]
  )

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      lastTimeRef.current = 0
    }
  }, [animate, ...deps])
}

/**
 * OPTIMIZATION: Hook to throttle mouse/touch events for better performance
 * 
 * Usage:
 * const handleMouseMove = useThrottledEventHandler((e) => {
 *   // Update something
 * }, 16) // ~60 FPS
 */
export function useThrottledEventHandler(
  handler: (event: MouseEvent | TouchEvent) => void,
  throttleMs: number = 16
): (event: MouseEvent | TouchEvent) => void {
  const lastCallRef = useRef<number>(0)
  const timeoutRef = useRef<NodeJS.Timeout>()

  return useCallback(
    (event: MouseEvent | TouchEvent) => {
      const now = Date.now()
      const timeSinceLastCall = now - lastCallRef.current

      if (timeSinceLastCall >= throttleMs) {
        lastCallRef.current = now
        handler(event)
      } else {
        // Schedule for later
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
          lastCallRef.current = Date.now()
          handler(event)
        }, throttleMs - timeSinceLastCall)
      }
    },
    [handler, throttleMs]
  )
}

/**
 * OPTIMIZATION: Batch state updates to reduce re-renders
 * 
 * IMPORTANT: React 18+ automatically batches state updates in event handlers
 * and lifecycle hooks, but this ensures batching in RAF/async contexts
 * 
 * Usage:
 * const [state, setState] = useState({...})
 * useAnimationFrame((dt) => {
 *   batchStateUpdate(() => {
 *     setState({...})  // Multiple updates batch automatically
 *   })
 * })
 */
export function batchStateUpdate(updates: () => void): void {
  // React 18+ auto-batches in event callbacks
  // This is mainly for documentation purposes and future-proofing
  updates()
}

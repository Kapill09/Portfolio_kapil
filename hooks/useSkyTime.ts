import { useEffect, useState } from 'react'

export type SkyState = 'sunrise' | 'day' | 'afternoon' | 'sunset' | 'night'

/**
 * Returns the current sky state based on the visitor's local time.
 * sunrise: 05:00-08:00, day: 08:00-15:00, afternoon: 15:00-17:00,
 * sunset: 17:00-19:00, night: 19:00-05:00.
 */
export function useSkyTime(): SkyState {
  const getState = (): SkyState => {
    const hour = new Date().getHours()

    if (hour >= 5 && hour < 8) return 'sunrise'
    if (hour >= 8 && hour < 15) return 'day'
    if (hour >= 15 && hour < 17) return 'afternoon'
    if (hour >= 17 && hour < 19) return 'sunset'

    return 'night'
  }

  const [state, setState] = useState<SkyState>('day')

  useEffect(() => {
    const update = () => setState(getState())
    const handleVisibilityChange = () => {
      if (!document.hidden) update()
    }

    update()

    const intervalId = window.setInterval(update, 60_000)

    window.addEventListener('focus', update)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('focus', update)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return state
}

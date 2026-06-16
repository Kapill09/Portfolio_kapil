import { useEffect, useState } from 'react'

export function useTheme() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const isDarkMode = localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    localStorage.setItem('theme', !isDark ? 'dark' : 'light')
  }

  return { isDark, toggleTheme, mounted }
}

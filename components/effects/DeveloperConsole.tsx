'use client'

import { useEffect } from 'react'

const banner = `
  _  __          _____ _____ _      
 | |/ /    /\\   |  __ \\_   _| |     
 | ' /    /  \\  | |__) || | | |     
 |  <    / /\\ \\ |  ___/ | | | |     
 | . \\  / ____ \\| |    _| |_| |____ 
 |_|\\_\\/_/    \\_\\_|   |_____|______|

  Hello there! Looking under the hood?
  I love working with folks who dig deeper.
  
  Let's build something great together.
  Email: meenakapil2404@gmail.com
  GitHub: github.com/kapilmeena
`

export function DeveloperConsole() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return

    // Prevent running multiple times if strict mode is on
    if ((window as any).__CONSOLE_EASTER_EGG_MOUNTED) return
    ;(window as any).__CONSOLE_EASTER_EGG_MOUNTED = true

    // Print the banner with styling
    console.log(
      `%c${banner}`,
      'font-family: monospace; color: #3b82f6; font-size: 14px; font-weight: bold;'
    )
    
    console.log(
      '%cIf you are reading this, you should probably hire me.',
      'font-size: 16px; font-weight: bold; background: #0f172a; color: #fff; padding: 10px; border-radius: 4px;'
    )

    // A little devtools detection trick (runs occasionally)
    let devtoolsOpen = false
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      
      if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
          devtoolsOpen = true
          console.log(
            '%c🛠️ DevTools detected! Looking for bugs? Feel free to open an issue or PR on the repo.',
            'color: #22c55e; font-size: 14px; font-weight: bold; padding: 4px;'
          )
        }
      } else {
        devtoolsOpen = false
      }
    }

    window.addEventListener('resize', detectDevTools)
    // Run once on load
    detectDevTools()

    return () => {
      window.removeEventListener('resize', detectDevTools)
    }
  }, [])

  return null // This component doesn't render anything in the DOM
}

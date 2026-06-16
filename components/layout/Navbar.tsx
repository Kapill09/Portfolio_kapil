'use client'

import { useState, useEffect } from 'react'

import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Magnetic } from '@/components/magnetic/Magnetic'

const navLinks = [
  { label: 'Home', href: '/#home', section: 'home' },
  { label: 'Experience', href: '/#experience', section: 'experience' },
  { label: 'Education', href: '/#education', section: 'education' },
  { label: 'Projects', href: '/#projects', section: 'projects' },
  { label: 'Certificates', href: '/achievements', section: 'achievements' },
  { label: 'Contact', href: '/#contact', section: 'contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Track scroll position to update active section
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection('')
      return
    }

    const handleScroll = () => {
      const sections = ['home', 'education', 'projects', 'contact']
      let currentSection = 'home'
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          // If the top of the section is near or above the middle of the viewport
          if (rect.top <= window.innerHeight / 2) {
            currentSection = section
            break
          }
        }
      }
      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashIndex = href.indexOf('#')

    if (pathname === '/' && hashIndex >= 0) {
      e.preventDefault()
      const target = document.querySelector(href.slice(hashIndex))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }

    setIsMobileOpen(false)
  }

  const isLinkActive = (href: string, section: string) => {
    if (href === '/achievements') {
      return pathname.startsWith('/achievements')
    }

    return pathname === '/' && activeSection === section
  }

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-6 left-1/2 z-50 hidden md:flex items-center gap-2 p-2 rounded-full 
                   bg-white/70 dark:bg-black/50 backdrop-blur-md border border-black/5 dark:border-white/10
                   shadow-lg dark:shadow-black/50"
      >
        {/* Logo Badge */}
        <Magnetic maxDistance={4}>
          <div className="flex items-center justify-center w-10 h-10 ml-1 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs sm:text-sm select-none">
            KM
          </div>
        </Magnetic>

        {/* Separator */}
        <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-2" />

        {/* Nav Links */}
        <div className="flex items-center gap-0.5 sm:gap-1" onMouseLeave={() => setHoveredSection(null)}>
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href, link.section)
            const isHovered = hoveredSection === link.href

            return (
              <Magnetic key={link.href} maxDistance={6}>
                <Link
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredSection(link.href)}
                  className={`relative px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-colors duration-300 rounded-full inline-block
                    ${isActive 
                      ? 'text-white dark:text-slate-900' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                    }`}
                >
                  {/* Active Pill Highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-full bg-slate-900 dark:bg-white -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Capsule Background */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="hover-capsule"
                      className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/10 -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </Magnetic>
            )
          })}
        </div>

        {/* Separator */}
        <div className="w-px h-6 bg-black/10 dark:bg-white/10 mx-2" />

        {/* Theme Toggle */}
        
      </motion.nav>

      {/* Mobile Nav Header */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-3 left-3 right-3 z-50 md:hidden"
      >
        <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 rounded-full 
                     bg-white/70 dark:bg-black/50 backdrop-blur-md border border-black/5 dark:border-white/10
                     shadow-lg dark:shadow-black/50">
          <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs select-none">
            KM
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            <div className="w-px h-3.5 sm:h-4 bg-black/10 dark:bg-white/10 mx-1" />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 dark:focus-visible:outline-white"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-[calc(100%+8px)] left-0 right-0 p-2 sm:p-3 rounded-2xl sm:rounded-3xl
                       bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-black/5 dark:border-white/10
                       shadow-xl dark:shadow-black/50 flex flex-col gap-0.5 sm:gap-1"
            >
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href, link.section)
                
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium rounded-xl sm:rounded-2xl flex items-center justify-between transition-colors
                      ${isActive 
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/10'
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  )
}

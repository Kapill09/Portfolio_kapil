'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Mail, X } from 'lucide-react'
import { Github, Linkedin } from '@/components/ui/Icons'
import { Magnetic } from '@/components/magnetic/Magnetic'

const socialLinks = [
  { icon: Github, href: 'https://github.com/Kapill09', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/kapil-meena-b4884a313/', label: 'LinkedIn' },
  { icon: Mail, href: 'meenakapil2005@gmail.com', label: 'Email' },
]

export function Hero() {
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-20 sm:pt-24 md:pt-32 md:pb-24">
      <Container className="relative z-10">
        <motion.div 
          className="max-w-[800px] mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p 
            className="text-sm sm:text-base md:text-lg md:text-xl text-[hsl(var(--text-muted))] font-medium tracking-wide mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Hello, I'm Kapil Meena
          </motion.p>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[hsl(var(--text-primary))] mb-4 sm:mb-6 text-balance"
            style={{ letterSpacing: '-0.03em', lineHeight: 1.1 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Full Stack Developer & Machine Learning Enthusiast
          </motion.h1>

          <motion.p 
            className="text-base sm:text-lg md:text-xl text-[hsl(var(--text-secondary))] leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            I build modern web applications and intelligent systems.
            Currently pursuing Computer Science at NIT Delhi and turning ideas into products through software and machine learning.
          </motion.p>

          {/* Actions & Socials */}
          <motion.div 
            className="flex flex-col items-center gap-6 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Magnetic maxDistance={10}>
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => setIsResumeOpen(true)}
                  className="text-sm sm:text-base"
                >
                  Resume
                </Button>
              </Magnetic>
              <Magnetic maxDistance={10}>
                <Button variant="outline" size="lg" href="#contact" className="text-sm sm:text-base">
                  Contact
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Magnetic>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Magnetic key={label} maxDistance={12}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[hsl(var(--text-muted))] hover:text-[hsl(var(--accent))] transition-colors duration-300 block p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Resume Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setIsResumeOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-5xl h-[80vh] sm:h-[85vh] md:h-[90vh] bg-[hsl(var(--cloud-white))] dark:bg-[#0b1021] border border-black/10 dark:border-white/10 rounded-2xl sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                <h3 className="text-lg sm:text-xl font-bold text-[hsl(var(--text-primary))] truncate">
                  Resume / CV
                </h3>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-[hsl(var(--text-muted))] hover:text-[hsl(var(--text-primary))] transition-colors duration-200 cursor-pointer flex-shrink-0 ml-2"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* PDF Viewport */}
              <div className="flex-1 bg-white/50 dark:bg-black/10 relative overflow-hidden">
                <iframe
                  src="/resume/kapil-meena-resume.pdf#toolbar=0"
                  className="w-full h-full border-none"
                  title="Kapil Meena Resume"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

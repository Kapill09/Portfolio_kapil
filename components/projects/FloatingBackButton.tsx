'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface FloatingBackButtonProps {
  href: string
  label?: string
}

export function FloatingBackButton({ href, label = 'Go Back' }: FloatingBackButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-3 top-20 sm:left-4 md:left-8 md:top-28 lg:left-12 z-40"
    >
      <Link
        href={href}
        className="group inline-flex items-center gap-2 rounded-full border border-[#d3d3cf] bg-[#fafaf8]/90 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-[#24323b] shadow-[0_10px_30px_rgba(32,73,95,.14),inset_0_1px_0_white] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(32,73,95,.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent))] dark:border-white/10 dark:bg-black/55 dark:text-white"
      >
        <ArrowLeft className="size-3.5 sm:size-4 transition-transform duration-300 group-hover:-translate-x-0.5 flex-shrink-0" />
        <span className="hidden sm:inline">{label}</span>
        <span className="sm:hidden">Back</span>
      </Link>
    </motion.div>
  )
}

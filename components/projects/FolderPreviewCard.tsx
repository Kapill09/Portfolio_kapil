'use client'

import { motion, type Variants } from 'framer-motion'
import { DashboardArtwork, NatureArtwork, RemixArtwork } from './ProjectArtwork'
import type { CSSProperties } from 'react'

export type FolderPreviewVariant = 'remix' | 'dashboard' | 'nature'

interface FolderPreviewCardProps {
  variant: FolderPreviewVariant
  className: string
  active: boolean
  lift: string
  style?: CSSProperties
}

const spring = { type: 'spring' as const, stiffness: 135, damping: 19, mass: 0.8 }

export function FolderPreviewCard({ variant, className, active, lift, style }: FolderPreviewCardProps) {
  const variants: Variants = {
    resting: { y: '0px' },
    active: { y: lift },
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`absolute overflow-hidden rounded-[clamp(18px,2.4vw,32px)] border-2 border-white/90 bg-white shadow-[0_24px_55px_rgba(32,61,76,.24)] will-change-transform ${className}`}
      style={{
        ...style,
        willChange: 'transform',
      }}
      variants={variants}
      initial="resting"
      animate={active ? 'active' : 'resting'}
      transition={spring}
    >
      {variant === 'remix' && <RemixArtwork />}
      {variant === 'dashboard' && <DashboardArtwork />}
      {variant === 'nature' && <NatureArtwork />}
    </motion.div>
  )
}

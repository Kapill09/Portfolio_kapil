'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useFolderMouse } from '@/hooks/useFolderMouse'
import { FolderPreviewCard } from './FolderPreviewCard'

export function Folder() {
  const [isActive, setIsActive] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const { rotateX, rotateY, shiftX, onPointerMove, resetPointer } = useFolderMouse()

  const closeFolder = () => {
    setIsActive(false)
    resetPointer()
  }

  return (
    <div
      className="relative mx-auto w-full max-w-[890px] [perspective:1400px] px-4 sm:px-0"
      onPointerEnter={() => setIsActive(true)}
      onPointerMove={onPointerMove}
      onPointerLeave={closeFolder}
      onFocusCapture={() => setIsActive(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeFolder()
      }}
    >
      <motion.div
        className="relative aspect-[1.2/1] w-full [transform-style:preserve-3d] sm:aspect-[1.25/1] md:aspect-[1.35/1] lg:aspect-[1.42/1]"
        style={prefersReducedMotion ? undefined : { rotateX, rotateY, x: shiftX, willChange: 'transform' }}
      >
        <div className="absolute inset-x-[3%] bottom-[1.5%] top-[13%] rounded-[clamp(28px,4vw,48px)] border border-[#d9d9d6] bg-[#f8f8f6] shadow-[0_24px_70px_rgba(32,73,95,.16),inset_0_0_0_8px_rgba(255,255,255,.72)] dark:border-slate-700/80 dark:bg-slate-900/95 dark:shadow-[0_24px_70px_rgba(2,6,23,.42),inset_0_0_0_8px_rgba(30,41,59,.42)] [html[data-sky-state=night]_&]:border-slate-700/80 [html[data-sky-state=night]_&]:bg-slate-900/95 [html[data-sky-state=night]_&]:shadow-[0_24px_70px_rgba(2,6,23,.42),inset_0_0_0_8px_rgba(30,41,59,.42)]" />
        <div className="absolute inset-x-[4.15%] bottom-[3%] top-[15%] rounded-[clamp(23px,3.5vw,41px)] border-2 border-dashed border-[#c8c8c3] dark:border-slate-600/70 [html[data-sky-state=night]_&]:border-slate-600/70" />

        <FolderPreviewCard
          variant="remix"
          active={isActive}
          lift="clamp(-22px, -1.5vw, -8px)"
          className="bottom-[39%] left-[14%] z-10 h-[49%] -rotate-[4.5deg]"
          style={{ width: 'calc(64% + 50px)' }}
        />
        <FolderPreviewCard
          variant="dashboard"
          active={isActive}
          lift="clamp(-52px, -3.7vw, -16px)"
          className="bottom-[38%] left-[27%] z-20 h-[51%] rotate-[5deg]"
          style={{ width: 'calc(58% + 50px)' }}
        />
        <FolderPreviewCard
          variant="nature"
          active={isActive}
          lift="clamp(-88px, -6.2vw, -28px)"
          className="bottom-[37%] left-[7%] z-30 h-[50%] -rotate-[.8deg]"
          style={{ width: 'calc(70% + 50px)' }}
        />

        <motion.div
          className="absolute inset-x-[3%] bottom-[1.5%] z-40 h-[53%] overflow-hidden rounded-b-[clamp(28px,4vw,48px)] rounded-t-[clamp(18px,2.5vw,30px)] border border-[#d3d3cf] bg-[#fafaf8] shadow-[0_-9px_20px_rgba(45,67,78,.08),inset_0_1px_0_white] dark:border-slate-700/80 dark:bg-slate-900 dark:shadow-[0_-9px_20px_rgba(2,6,23,.34),inset_0_1px_0_rgba(148,163,184,.18)] [html[data-sky-state=night]_&]:border-slate-700/80 [html[data-sky-state=night]_&]:bg-slate-900 [html[data-sky-state=night]_&]:shadow-[0_-9px_20px_rgba(2,6,23,.34),inset_0_1px_0_rgba(148,163,184,.18)]"
          animate={{ y: isActive && !prefersReducedMotion ? 4 : 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 22, mass: 0.8 }}
        >
          <div className="absolute inset-0 opacity-80 [background-image:linear-gradient(#dcdedc_1px,transparent_1px),linear-gradient(90deg,#dcdedc_1px,transparent_1px)] [background-size:clamp(12px,1.6vw,20px)_clamp(12px,1.6vw,20px)] dark:opacity-70 dark:[background-image:linear-gradient(rgba(71,85,105,.42)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,.42)_1px,transparent_1px)] [html[data-sky-state=night]_&]:opacity-70 [html[data-sky-state=night]_&]:[background-image:linear-gradient(rgba(71,85,105,.42)_1px,transparent_1px),linear-gradient(90deg,rgba(71,85,105,.42)_1px,transparent_1px)]" />
          <div className="absolute inset-[10px] rounded-b-[clamp(20px,3.2vw,38px)] rounded-t-[clamp(12px,2vw,22px)] border-2 border-dashed border-[#c6c6c1] dark:border-slate-600/70 [html[data-sky-state=night]_&]:border-slate-600/70" />

          <div className="absolute left-[4%] top-[6%] z-10 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-[#bdbdb8] bg-[#fafaf8] px-[clamp(13px,2vw,24px)] py-[clamp(7px,1vw,12px)] text-[clamp(12px,1.6vw,20px)] font-bold text-[#24323b] shadow-[0_3px_0_#cfcfca] transition-transform group-hover:-translate-y-0.5 dark:border-slate-500/70 dark:bg-slate-800/95 dark:text-slate-100 dark:shadow-[0_3px_0_rgba(15,23,42,.9)] [html[data-sky-state=night]_&]:border-slate-500/70 [html[data-sky-state=night]_&]:bg-slate-800/95 [html[data-sky-state=night]_&]:text-slate-100 [html[data-sky-state=night]_&]:shadow-[0_3px_0_rgba(15,23,42,.9)]">
            View my works
            <ArrowUpRight className="size-[clamp(14px,1.5vw,20px)]" />
          </div>
        </motion.div>

        <Link
          href="/projects"
          aria-label="View all projects"
          className="group absolute inset-[3%] z-50 rounded-[clamp(28px,4vw,48px)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent))]"
        />
      </motion.div>
    </div>
  )
}

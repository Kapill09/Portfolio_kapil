import Image from 'next/image'
import { BarChart3, Bot, FileText, ReceiptText, Sparkles } from 'lucide-react'
import type { Project } from '@/data/projects'
import { DashboardArtwork, NatureArtwork } from './ProjectArtwork'

interface ProjectVisualProps {
  project: Project
  className?: string
  label?: string
  fit?: 'cover' | 'contain'
}

function BrowserBar({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/10 bg-white/70 px-4 py-3 text-[#1b2733]">
      <div className="flex gap-1.5">
        <span className="size-2 rounded-full bg-red-400" />
        <span className="size-2 rounded-full bg-amber-300" />
        <span className="size-2 rounded-full bg-emerald-400" />
      </div>
      <span className="rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold text-black/45">
        {label}
      </span>
      <span className="w-10" />
    </div>
  )
}

function BillingVisual() {
  return (
    <div className="h-full bg-[#f6fbff] text-[#12243a]">
      <BrowserBar label="billify.app" />
      <div className="grid h-[calc(100%-44px)] grid-cols-[.74fr_1fr] gap-5 p-5">
        <div className="rounded-2xl bg-[#10233f] p-5 text-white shadow-xl">
          <ReceiptText className="mb-5 size-8 text-cyan-200" />
          <p className="text-xs uppercase tracking-[.2em] text-white/55">Invoice</p>
          <p className="mt-2 text-3xl font-bold">Rs 42,800</p>
          <div className="mt-6 space-y-3">
            {[72, 56, 86].map((width) => (
              <span key={width} className="block h-2 rounded-full bg-white/18" style={{ width: `${width}%` }} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-sky-100 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold">Revenue</span>
              <BarChart3 className="size-5 text-sky-500" />
            </div>
            <div className="flex h-24 items-end gap-2">
              {[38, 62, 45, 78, 58, 92].map((height, index) => (
                <span key={index} className="flex-1 rounded-t-lg bg-sky-400/70" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-cyan-100 p-4">
              <p className="text-2xl font-bold">2m</p>
              <p className="text-xs text-black/50">invoice time</p>
            </div>
            <div className="rounded-2xl bg-emerald-100 p-4">
              <p className="text-2xl font-bold">Paid</p>
              <p className="text-xs text-black/50">status sync</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PortfolioVisual() {
  return (
    <div className="h-full bg-gradient-to-br from-[#d8efff] via-[#f7fbff] to-[#ffe4b5] p-6 text-[#142236]">
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-full bg-[#142236] text-sm font-black text-white">KM</span>
        <div className="flex gap-2 text-[10px] font-semibold text-black/45">
          <span>Home</span>
          <span>Work</span>
          <span>Contact</span>
        </div>
      </div>
      <div className="mt-10 max-w-[68%]">
        <Sparkles className="mb-3 size-7 text-amber-500" />
        <p className="text-4xl font-extrabold leading-none">Portfolio with motion.</p>
        <p className="mt-3 text-sm leading-relaxed text-black/55">Cloud surfaces, playful folders, and focused project stories.</p>
      </div>
      <div className="absolute bottom-5 right-5 grid w-[42%] grid-cols-2 gap-3">
        <div className="h-20 rounded-2xl bg-white/75 shadow-lg" />
        <div className="h-28 rounded-2xl bg-[#142236] shadow-lg" />
        <div className="col-span-2 h-14 rounded-2xl bg-white/75 shadow-lg" />
      </div>
    </div>
  )
}

function InterviewVisual() {
  return (
    <div className="h-full bg-[#111827] p-5 text-white">
      <BrowserBar label="interview.ai" />
      <div className="grid h-[calc(100%-44px)] grid-cols-[.9fr_1.1fr] gap-5 pt-5">
        <div className="rounded-3xl bg-white/8 p-5">
          <Bot className="mb-5 size-9 text-violet-300" />
          <p className="text-sm text-white/55">Mock session</p>
          <p className="mt-2 text-3xl font-bold leading-none">Frontend round</p>
          <div className="mt-8 rounded-2xl bg-violet-400/20 p-4 text-sm text-violet-100">
            Adaptive follow-up ready
          </div>
        </div>
        <div className="space-y-4">
          {['Question clarity', 'Technical depth', 'Answer structure'].map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/6 p-4">
              <div className="mb-3 flex items-center justify-between text-sm">
                <span>{item}</span>
                <span className="text-violet-200">{88 - index * 7}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-violet-300" style={{ width: `${88 - index * 7}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function GenericVisual({ project }: { project: Project }) {
  return (
    <div className={`flex h-full items-center justify-center bg-gradient-to-br ${project.gradient}`}>
      <div className="rounded-3xl border border-white/60 bg-white/70 p-8 text-center shadow-xl backdrop-blur">
        <FileText className="mx-auto mb-4 size-10 text-[hsl(var(--accent))]" />
        <p className="text-2xl font-bold text-[hsl(var(--text-primary))]">{project.title}</p>
      </div>
    </div>
  )
}

export function ProjectVisual({ project, className = '', label, fit }: ProjectVisualProps) {
  const visual = project.visual ?? 'workspace'
  const hasImage = project.image && (project.image.includes('.png') || project.image.includes('.jpg') || project.image.includes('.jpeg'))
  const imageFit = fit ?? project.imageFit ?? 'cover'

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`} aria-label={label ?? `${project.title} thumbnail`}>
      {hasImage && project.image ? (
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={imageFit === 'contain' ? 'object-contain bg-[#1a1410]' : 'object-cover'}
          priority
        />
      ) : (
        <>
          {visual === 'billing' && <BillingVisual />}
          {visual === 'fraud' && <DashboardArtwork />}
          {visual === 'produce' && <NatureArtwork />}
          {visual === 'portfolio' && <PortfolioVisual />}
          {visual === 'interview' && <InterviewVisual />}
          {(visual === 'workspace' || !['billing', 'fraud', 'produce', 'portfolio', 'interview'].includes(visual)) && (
            <GenericVisual project={project} />
          )}
        </>
      )}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/55" />
    </div>
  )
}

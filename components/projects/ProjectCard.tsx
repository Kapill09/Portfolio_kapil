'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/data/projects'
import { ProjectVisual } from './ProjectVisual'

interface ProjectCardProps {
  project: Project
  index: number
}

const tagStyles = [
  'border-sky-200 bg-sky-100 text-sky-950 shadow-sky-500/18 hover:bg-sky-200',
  'border-emerald-200 bg-emerald-100 text-emerald-950 shadow-emerald-500/18 hover:bg-emerald-200',
  'border-amber-200 bg-amber-100 text-amber-950 shadow-amber-500/18 hover:bg-amber-200',
  'border-violet-200 bg-violet-100 text-violet-950 shadow-violet-500/18 hover:bg-violet-200',
  'border-rose-200 bg-rose-100 text-rose-950 shadow-rose-500/18 hover:bg-rose-200',
]

export function ProjectCard({ project, index }: ProjectCardProps) {
  const techBadges = project.tags.length > 0 ? project.tags : Object.values(project.techStackGroups).flat().slice(0, 4)

  return (
    <motion.article
      whileHover={{ translateY: -8, rotate: index % 2 === 0 ? -0.35 : 0.35 }}
      whileTap={{ scale: 0.985 }}
      className="group relative h-full"
      layout
      style={{ willChange: "transform" }}
    >
      <div className="h-full overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[28px] border border-white/80 bg-[#f9fbff] p-2 sm:p-3 shadow-[0_26px_74px_rgba(21,62,87,.20),inset_0_0_0_7px_rgba(255,255,255,.72)] transition-shadow duration-300 group-hover:shadow-[0_34px_88px_rgba(21,62,87,.28)]">
        <div className="flex h-full flex-col rounded-md sm:rounded-lg md:rounded-xl border-2 border-dashed border-[#b9c8d1] bg-white/72 p-1.5 sm:p-2">
          <Link
            href={`/projects/${project.id}`}
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[hsl(var(--accent))]"
          >
            <motion.div
              layoutId={`project-visual-${project.id}`}
              className="aspect-[16/10] overflow-hidden rounded-sm sm:rounded-md md:rounded-xl lg:rounded-[18px] border-2 border-white bg-white shadow-[0_18px_45px_rgba(32,61,76,.18)]"
              transition={{ type: 'spring', stiffness: 170, damping: 24 }}
            >
              <ProjectVisual project={project} />
            </motion.div>

            <div className="px-1.5 sm:px-2 pb-1.5 sm:pb-2 pt-3 sm:pt-4 md:pt-5">
              <div className="mb-2 sm:mb-3 flex items-start justify-between gap-2 sm:gap-4">
                <div className="min-w-0">
                  <p className="mb-1.5 sm:mb-2 inline-flex rounded-full border-2 border-dashed border-[#9bb1bd] bg-white px-2 sm:px-3 py-0.5 text-xs font-black uppercase tracking-[.16em] text-[#31566b] shadow-[0_2px_0_#d8e2e8]">
                    {project.status}
                  </p>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-tight text-[#0c2236]">
                    {project.title}
                  </h2>
                </div>
                <span className="grid size-10 sm:size-11 shrink-0 place-items-center rounded-full border border-[#bdd2df] bg-white text-[#15364d] shadow-[0_8px_18px_rgba(40,83,106,.14)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                  <ArrowUpRight className="size-4 sm:size-5" />
                </span>
              </div>

              <p className="min-h-[3rem] sm:min-h-[4.5rem] text-sm sm:text-base font-semibold leading-relaxed text-[#36576b]">
                {project.shortDescription}
              </p>
            </div>
          </Link>

          <div className="mt-auto flex flex-wrap gap-1.5 sm:gap-2 px-1.5 sm:px-2 pb-1.5 sm:pb-2 pt-2 sm:pt-3">
            {techBadges.slice(0, 5).map((tag, tagIndex) => (
              <Link
                key={tag}
                href={`/projects/${project.id}#tech-stack`}
                aria-label={`View ${tag} in ${project.title}`}
                className={`rounded-full border px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-black shadow-[0_8px_18px_var(--tw-shadow-color)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_22px_var(--tw--shadow-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent))] ${tagStyles[tagIndex % tagStyles.length]}`}
              >
                  {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
}

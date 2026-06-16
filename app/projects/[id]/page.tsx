import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import { ProjectDetailClient } from './ProjectDetailClient'

interface ProjectPageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return { title: 'Project Not Found' }
  }

  return {
    title: `${project.title} - Kapil Meena`,
    description: project.shortDescription,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return <ProjectDetailClient project={project} />
}

import { projects } from '@/data/projects'
import { ProjectsGallery } from '@/components/projects/ProjectsGallery'

export const metadata = {
  title: 'Projects Gallery - Kapil Meena',
  description: 'A gallery of portfolio projects and detailed case studies by Kapil Meena.',
}

export default function ProjectsPage() {
  return <ProjectsGallery projects={projects} />
}

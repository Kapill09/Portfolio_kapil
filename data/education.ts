export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  year: string
  description?: string
  logo?: string
}

export const education: Education[] = [
  {
    id: '1',
    institution: 'National Institute of Technology, Delhi',
    degree: 'Bachelor of Technology',
    field: 'Computer Science & Engineering',
    year: '2023 — 2027',
    description: 'Pursuing B.Tech in CSE with focus on Machine Learning, Full Stack Development, and algorithmic problem solving.',
  },
]

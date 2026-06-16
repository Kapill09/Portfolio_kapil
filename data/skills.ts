export interface Skill {
  category: string
  items: string[]
}

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'Express', 'MongoDB', 'PostgreSQL'],
  },
  {
    category: 'Machine Learning',
    items: ['TensorFlow', 'PyTorch', 'scikit-learn', 'Data Analysis', 'NLP'],
  },
  {
    category: 'Tools',
    items: ['Git', 'Docker', 'AWS', 'Vercel', 'Linux'],
  },
]

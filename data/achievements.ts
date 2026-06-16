export interface Achievement {
  id: string
  title: string
  summary: string
  description: string
  date: string
  organization: string
  category: 'Competition' | 'Hackathon' | 'Certification'
  image: string
  images?: string[]
}

export const achievements: Achievement[] = [
  {
    id: 'robo-race',
    title: '1st Runner-up – Robotics Obstacle Detection Car Race',
    summary: 'Built an Arduino vehicle achieving 100% obstacle avoidance across a 12+ obstacle track.',
    description:
      '1st Runner-up– Robotics Obstacle Detection Car Race (NIT Delhi, Apr 2024); built an Arduino vehicle achieving 100% obstacle avoidance across a 12+ obstacle track.',
    date: 'Apr 2024',
    organization: 'NIT Delhi',
    category: 'Competition',
    image: '/images/achievements/robo-race-runner-up.png',
    images: ['/images/achievements/robo-race-runner-up.png', '/images/achievements/robo-race-certificate.jpeg'],
  },
  {
    id: 'adobe-hackathon',
    title: 'Adobe Hackathon Participant',
    summary: 'Participated and qualified for Round 2 in a hackathon focused on rapid ideation, collaboration, and product thinking.',
    description:
      'Participated in an Adobe hackathon and qualified for Round 2, working through fast-paced ideation, team collaboration, prototype development, and presentation of a practical solution.',
    date: 'Aug 2025',
    organization: 'Adobe Hackathon',
    category: 'Hackathon',
    image: '/images/achievements/adobe-hackathon-participant.png',
    images: ['/images/achievements/adobe-hackathon-participant.png'],
  },
  {
    id: 'udemy',
    title: 'Udemy Web Development Certificate',
    summary: 'Completed web development coursework covering modern frontend and backend fundamentals.',
    description:
      'Completed a web development certification through Udemy, strengthening fundamentals across responsive interfaces, application structure, and practical full-stack development workflows.',
    date: ' July 2024',
    organization: 'Udemy',
    category: 'Certification',
    image: '/images/achievements/udemy-web-development-certificate.jpg',
    images: ['/images/achievements/udemy-web-development-certificate.jpg'],
  },
  {
    id: 'algo-university',
    title: 'Graph Theory Programming Camp – AlgoUniversity',
    summary: 'Completed an intensive Graph Theory Programming Camp with 9 advanced graph problems solved.',
    description:
      'Successfully completed an intensive Graph Theory Programming Camp mentored by Codeforces Master Manas Kumar Verma. Solved 9 advanced graph problems covering shortest paths, traversals, connectivity, and competitive programming techniques. Strengthened problem-solving skills and algorithmic thinking through hands-on implementation of advanced graph algorithms.',
    date: 'May 2026',
    organization: 'AlgoUniversity',
    category: 'Certification',
    image: '/images/achievements/algo-university-certificate.png',
    images: ['/images/achievements/algo-university-certificate.png'],
  },
]

export function getAchievementById(id: string) {
  return achievements.find((achievement) => achievement.id === id)
}

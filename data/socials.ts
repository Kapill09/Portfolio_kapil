export interface Social {
  name: string
  url: string
  icon: 'github' | 'linkedin' | 'twitter' | 'mail'
}

export const socials: Social[] = [
  { name: 'GitHub', url: 'https://github.com', icon: 'github' },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin' },
  { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
  { name: 'Email', url: 'mailto:kapil@example.com', icon: 'mail' },
]

import { Mail } from 'lucide-react'
import { Github, Linkedin, Twitter } from '@/components/ui/Icons'

const socialIcons = [
  { icon: Github, href: 'https://github.com/Kapill09', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/kapil-meena-b4884a313/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:meenakapil2005@example.com', label: 'Email' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative py-8 md:py-12 mt-6 md:mt-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center gap-4 md:gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {socialIcons.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-[hsl(var(--text-muted))] hover:text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-soft))] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[hsl(var(--accent))]"
                aria-label={label}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            ))}
          </div>

          {/* Attribution */}
          <p className="text-xs sm:text-sm text-[hsl(var(--text-muted))] text-center">
            Built by Kapil Meena · © {currentYear}
          </p>
        </div>
      </div>
    </footer>
  )
}

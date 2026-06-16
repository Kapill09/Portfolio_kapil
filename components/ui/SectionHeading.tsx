interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : ''

  return (
    <div className={`mb-8 md:mb-12 lg:mb-16 max-w-2xl ${alignClass} ${className}`}>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[hsl(var(--text-primary))] mb-2 sm:mb-3 md:mb-4" style={{ letterSpacing: '-0.02em', lineHeight: 1.15 }}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[hsl(var(--text-secondary))] leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  )
}

import React from 'react'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'outline'
}

const variants = {
  default:
    'bg-[hsl(var(--cloud-white))] text-[hsl(var(--text-secondary))] border border-[hsl(var(--cloud-border))]',
  accent:
    'bg-[hsl(var(--accent-soft))] text-[hsl(var(--accent))]',
  outline:
    'border border-[hsl(var(--cloud-border))] text-[hsl(var(--text-muted))]',
}

export function Badge({
  variant = 'default',
  className = '',
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-pill transition-all duration-200 hover:shadow-sm ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

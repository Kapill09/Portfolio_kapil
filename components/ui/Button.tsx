import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  href?: string
}

const variants = {
  primary:
    'bg-[hsl(var(--accent))] text-white hover:bg-[hsl(var(--accent-hover))] shadow-md hover:shadow-lg active:scale-[0.97]',
  outline:
    'border-2 border-[hsl(var(--accent))] text-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-soft))] active:scale-[0.97]',
  ghost:
    'text-[hsl(var(--text-secondary))] hover:text-[hsl(var(--text-primary))] hover:bg-[hsl(var(--cloud-white))]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3.5 text-lg gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  isLoading,
  disabled,
  children,
  href,
  ...props
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center font-medium rounded-pill transition-all duration-300 ease-out cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={baseClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </span>
      ) : (
        children
      )}
    </button>
  )
}

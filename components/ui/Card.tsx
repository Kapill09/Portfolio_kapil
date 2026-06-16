import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  hover?: boolean
}

export function Card({ className = '', children, hover = true, ...props }: CardProps) {
  return (
    <div
      className={`cloud-container ${hover ? 'hover:-translate-y-1 cursor-default' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

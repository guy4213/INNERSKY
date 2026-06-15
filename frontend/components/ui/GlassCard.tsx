import { HTMLAttributes, ReactNode } from 'react'

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  featured?: boolean
}

export default function GlassCard({ children, featured, className = '', ...rest }: GlassCardProps) {
  const featuredClasses = featured ? 'border-electric/50' : ''

  return (
    <div className={`glass-card rounded-xl p-8 ${featuredClasses} ${className}`} {...rest}>
      {children}
    </div>
  )
}

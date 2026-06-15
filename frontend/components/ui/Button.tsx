import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary'
}

export default function Button({ children, variant = 'primary', className = '', ...rest }: ButtonProps) {
  const base =
    'px-8 py-4 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest transition-all'

  const variants = {
    primary: 'bg-electric text-white hover:scale-105 active:scale-95 glow-purple',
    secondary: 'border border-outline/30 text-on-surface hover:bg-surface-variant',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}

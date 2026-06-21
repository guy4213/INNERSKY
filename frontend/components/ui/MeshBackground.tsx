'use client'

import { useEffect } from 'react'

export default function MeshBackground() {
  useEffect(() => {
    const glow = document.querySelector('.mesh-bg') as HTMLElement | null
    if (!glow) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      glow.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(124, 92, 255, 0.10) 0%, transparent 40%),
        radial-gradient(circle at 20% 30%, rgba(124, 92, 255, 0.07) 0%, transparent 50%),
        radial-gradient(circle at 80% 70%, rgba(202, 190, 255, 0.04) 0%, transparent 50%)`
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.glass-card').forEach((card) => {
      card.classList.add('reveal')
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return <div className="mesh-bg" />
}

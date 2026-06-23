'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { getToken } from '@/lib/auth'

const links = [
  { href: '#about', he: 'מי אנחנו', en: 'About' },
  { href: '#services', he: 'שירותים', en: 'Services' },
  { href: '#values', he: 'יתרונות', en: 'Values' },
  { href: '#case-study', he: 'Case Study', en: 'Case Study' },
  { href: '#products', he: 'מוצרים', en: 'Products' },
  { href: '#contact', he: 'צור קשר', en: 'Contact' },
]

export default function Navbar() {
  const { lang, toggle } = useLanguage()
  const [open, setOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsAdmin(!!getToken())
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'F9') {
        router.push('/admin/login')
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [router])

  return (
    <nav
      role="navigation"
      aria-label={lang === 'he' ? 'ניווט ראשי' : 'Main navigation'}
      className="fixed top-0 w-full z-50 border-b border-white/5 bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
      style={{ minHeight: '80px' }}
    >
      <div className="flex justify-between items-center w-full px-6 md:px-10 h-20 max-w-[1440px] mx-auto">
        <div>
          <div className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
            InnerSky
          </div>
          <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
            {lang === 'he' ? 'תפעול נסיעות עסקיות' : 'Corporate Travel Operations'}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
            >
              {lang === 'he' ? link.he : link.en}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {isAdmin && (
            <a
              href="/admin"
              aria-label="Admin panel"
              className="hidden sm:inline-flex items-center gap-1.5 border border-primary/30 text-primary px-3 py-1 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:bg-primary/10 transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>admin_panel_settings</span>
              Admin
            </a>
          )}

          <button
            onClick={toggle}
            aria-label={lang === 'he' ? 'Switch to English' : 'עבור לעברית'}
            className="text-on-surface-variant font-label-sm text-label-sm font-bold uppercase border border-outline/30 rounded-full px-3 py-1 hover:text-primary hover:border-primary/40 transition-colors"
          >
            {lang === 'he' ? 'EN' : 'עב'}
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-flex bg-electric text-white px-6 py-2 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform glow-purple"
          >
            {lang === 'he' ? 'קבע שיחה' : "Let's Talk"}
          </a>

          <button
            className="md:hidden text-on-surface-variant"
            onClick={() => setOpen((v) => !v)}
            aria-label={lang === 'he' ? 'פתח תפריט' : 'Open menu'}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-surface/95">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-on-surface-variant font-medium hover:text-primary transition-colors duration-200"
            >
              {lang === 'he' ? link.he : link.en}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="bg-electric text-white px-6 py-2 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider text-center glow-purple"
          >
            {lang === 'he' ? 'קבע שיחה' : "Let's Talk"}
          </a>
          {isAdmin && (
            <a
              href="/admin"
              className="border border-primary/30 text-primary px-6 py-2 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider text-center"
            >
              Admin
            </a>
          )}
        </div>
      )}
    </nav>
  )
}

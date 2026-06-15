'use client'

import { useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'

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

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
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
          <button
            onClick={toggle}
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
            aria-label="Menu"
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
        </div>
      )}
    </nav>
  )
}

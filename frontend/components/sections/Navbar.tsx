'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import { getToken } from '@/lib/auth'

const links = [
  { href: '#about', he: 'מי אנחנו', en: 'About' },
  { href: '#services', he: 'שירותים', en: 'Services' },
  { href: '#values', he: 'למה InnerSky', en: 'Why InnerSky' },
  { href: '#case-study', he: 'מקרה לדוגמה', en: 'Case Study' },
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

  const langToggleBtn = (
    <button
      onClick={toggle}
      aria-label={lang === 'he' ? 'Switch to English' : 'עבור לעברית'}
      className="text-on-surface-variant font-label-sm text-label-sm font-bold uppercase border border-outline/30 rounded-full px-3 py-1 hover:text-primary hover:border-primary/40 transition-colors"
    >
      {lang === 'he' ? 'EN' : 'עב'}
    </button>
  )

  const hamburgerBtn = (
    <button
      className="text-on-surface-variant"
      onClick={() => setOpen((v) => !v)}
      aria-label={lang === 'he' ? 'פתח תפריט' : 'Open menu'}
    >
      <span className="material-symbols-outlined">menu</span>
    </button>
  )

  return (
    <nav
      role="navigation"
      aria-label={lang === 'he' ? 'ניווט ראשי' : 'Main navigation'}
      className="fixed top-0 w-full z-50 border-b border-white/5 bg-surface/80 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]"
      style={{ minHeight: '80px' }}
    >
      {/* Desktop bar */}
      <div className="hidden md:flex justify-between items-center w-full px-10 h-20 max-w-[1440px] mx-auto">
        <a href="/">
          <Image
            src="/logo.png"
            alt="InnerSky"
            width={400}
            height={80}
            style={{ height: '200px', width: '280px' }}
            priority
          />
        </a>

        <div className="flex items-center gap-8">
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
              className="inline-flex items-center gap-1.5 border border-primary/30 text-primary px-3 py-1 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:bg-primary/10 transition-all"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>admin_panel_settings</span>
              Admin
            </a>
          )}

          {langToggleBtn}

          <a
            href="#contact"
            className="bg-electric text-white px-6 py-2 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider hover:scale-105 transition-transform glow-purple"
          >
            {lang === 'he' ? 'קבע שיחה' : "Let's Talk"}
          </a>
        </div>
      </div>

      {/* Mobile bar: 3-column grid. RTL (Hebrew) reverses visual order so hamburger lands on the right and lang toggle on the left automatically. */}
      <div className="md:hidden grid grid-cols-3 items-center w-full px-4 h-16">
        <div className="flex justify-start">
          {hamburgerBtn}
        </div>
        <div className="flex justify-center">
          <a href="/">
            <Image
              src="/logo.png"
              alt="InnerSky"
              width={200}
              height={40}
              style={{ height: '90px', width: '180px' }}
              priority
            />
          </a>
        </div>
        <div className="flex justify-end">
          {langToggleBtn}
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

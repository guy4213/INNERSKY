'use client'

import { useLanguage } from '@/context/LanguageContext'

const navLinks = [
  { href: '#about', he: 'מי אנחנו', en: 'About' },
  { href: '#services', he: 'שירותים', en: 'Services' },
  { href: '#values', he: 'יתרונות', en: 'Values' },
  { href: '#case-study', he: 'Case Study', en: 'Case Study' },
  { href: '#products', he: 'מוצרים', en: 'Products' },
  { href: '#contact', he: 'צור קשר', en: 'Contact' },
]

export default function Footer() {
  const { lang } = useLanguage()

  return (
    <footer className="w-full py-20 border-t border-white/5 bg-surface-container-lowest">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter px-6 md:px-10 max-w-[1440px] mx-auto">
        <div>
          <div className="font-headline-md text-headline-md font-bold text-on-surface mb-4">InnerSky</div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mb-6">
            {lang === 'he'
              ? 'INNERSKY מסייעת לארגונים לבנות, לנהל ולשפר את מערך הנסיעות העסקיות שלהם.'
              : 'INNERSKY helps organizations build, manage and optimize their corporate travel operations.'}
          </p>
          <a className="text-on-surface-variant hover:text-primary transition-colors" href="#" aria-label="LinkedIn">
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
            </svg>
          </a>
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest mb-2">
            {lang === 'he' ? 'ניווט מהיר' : 'Quick Links'}
          </p>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors"
            >
              {lang === 'he' ? link.he : link.en}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-widest mb-2">
            {lang === 'he' ? 'משפטי' : 'Legal'}
          </p>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">
            {lang === 'he' ? 'מדיניות פרטיות' : 'Privacy Policy'}
          </a>
          <a className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors" href="#">
            {lang === 'he' ? 'תנאי שימוש' : 'Terms of Service'}
          </a>
        </div>

        <div className="md:col-span-3 mt-12 pt-12 border-t border-white/5 text-center">
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            © 2025 InnerSky. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

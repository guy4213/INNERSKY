'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'

const values = [
  {
    icon: 'policy',
    en: 'Policy & Governance',
    he: 'מדיניות ונהלים',
    descHe: 'מדיניות, נהלים וסמכויות.',
    descEn: 'Policies, procedures and authority structures.',
  },
  {
    icon: 'account_balance',
    en: 'Budget Control',
    he: 'ניהול תקציבים',
    descHe: 'שליטה ובקרה תקציבית.',
    descEn: 'Financial oversight and budget management.',
  },
  {
    icon: 'handshake',
    en: 'Supplier Management',
    he: 'ניהול ספקים',
    descHe: 'ניהול ספקים ומשא ומתן.',
    descEn: 'Vendor management and negotiation.',
  },
  {
    icon: 'computer',
    en: 'Systems & Technology',
    he: 'מערכות וטכנולוגיה',
    descHe: 'מערכות, אוטומציה ותהליכים.',
    descEn: 'Systems, automation and processes.',
  },
  {
    icon: 'bar_chart',
    en: 'Visibility & Reporting',
    he: 'בקרה ושקיפות',
    descHe: 'שקיפות ודיווח.',
    descEn: 'Transparency and reporting.',
  },
  {
    icon: 'trending_up',
    en: 'Continuous Improvement',
    he: 'שיפור מתמיד',
    descHe: 'שיפור מתמיד והתאמה לצמיחה.',
    descEn: 'Continuous improvement aligned with growth.',
  },
]

export default function Values() {
  const { lang } = useLanguage()

  return (
    <section id="values" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <h2 className="font-display-lg text-headline-md text-on-surface mb-4">
            {lang === 'he' ? 'למה InnerSky' : 'Why InnerSky'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {values.map((value) => (
            <GlassCard key={value.en} className="flex flex-col items-start">
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '32px' }}>
                {value.icon}
              </span>
              <h3 className="font-headline-md text-headline-md mb-2">
                {lang === 'he' ? value.he : value.en}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {lang === 'he' ? value.descHe : value.descEn}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

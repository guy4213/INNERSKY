'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'

const values = [
  { icon: 'policy', en: 'Policy & Governance', he: 'מדיניות ונהלים', descHe: 'מדיניות, נהלים וסמכויות.' },
  { icon: 'account_balance', en: 'Budget Control', he: 'ניהול תקציבים', descHe: 'שליטה ובקרה תקציבית.' },
  { icon: 'handshake', en: 'Supplier Management', he: 'ניהול ספקים', descHe: 'ניהול ספקים ומשא ומתן.' },
  { icon: 'computer', en: 'Systems & Technology', he: 'מערכות וטכנולוגיה', descHe: 'מערכות, אוטומציה ותהליכים.' },
  { icon: 'bar_chart', en: 'Visibility & Reporting', he: 'בקרה ושקיפות', descHe: 'שקיפות ודיווח.' },
  { icon: 'trending_up', en: 'Continuous Improvement', he: 'שיפור מתמיד', descHe: 'שיפור מתמיד והתאמה לצמיחה.' },
]

export default function Values() {
  const { lang } = useLanguage()

  return (
    <section id="values" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <h2 className="font-display-lg text-headline-md text-on-surface mb-4">
            {lang === 'he' ? 'יתרונות' : 'Values'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {values.map((value) => (
            <GlassCard key={value.en} className="flex flex-col items-start">
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '32px' }}>
                {value.icon}
              </span>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
                {value.en}
              </p>
              <h3 className="font-headline-md text-headline-md mb-2">
                {lang === 'he' ? value.he : value.en}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{value.descHe}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

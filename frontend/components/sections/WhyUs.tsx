'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'

const reasons = [
  { icon: 'workspace_premium', he: 'ניסיון גלובלי', en: 'Global Experience', descHe: 'למעלה מ-20 שנות ניסיון בתחום.' },
  { icon: 'balance', he: 'ראייה עצמאית', en: 'Independent Perspective', descHe: 'מיקוד באינטרסים של הארגון.' },
  { icon: 'precision_manufacturing', he: 'מומחיות תפעולית', en: 'Operational Expertise', descHe: 'תהליך, מדיניות, תקציב, ספקים וטכנולוגיה תחת קורת גג אחת.' },
  { icon: 'expand', he: 'פתרונות סקיילביליים', en: 'Scalable Solutions', descHe: 'בניית תהליכים התומכים בצמיחה.' },
]

export default function WhyUs() {
  const { lang } = useLanguage()

  return (
    <section id="why" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <h2 className="font-display-lg text-headline-md text-on-surface mb-4">
            {lang === 'he' ? 'למה אנחנו' : 'Why Us'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {reasons.map((reason) => (
            <GlassCard key={reason.en} className="flex flex-col items-start">
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '32px' }}>
                {reason.icon}
              </span>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
                {reason.en}
              </p>
              <h3 className="font-headline-md text-headline-md mb-2">
                {lang === 'he' ? reason.he : reason.en}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{reason.descHe}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

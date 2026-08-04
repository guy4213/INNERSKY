'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'

const reasons = [
  {
    icon: 'workspace_premium',
    he: 'ניסיון גלובלי',
    en: 'Global Experience',
    descHe: 'למעלה מ-20 שנות ניסיון בתחום.',
    descEn: 'Over 20 years of experience in corporate travel.',
  },
  {
    icon: 'balance',
    he: 'ראייה עצמאית',
    en: 'Independent Perspective',
    descHe: 'מיקוד באינטרסים של הארגון.',
    descEn: 'Focused entirely on the organization\'s best interests.',
  },
  {
    icon: 'precision_manufacturing',
    he: 'מומחיות תפעולית',
    en: 'Operational Expertise',
    descHe: 'תהליך, מדיניות, תקציב, ספקים וטכנולוגיה תחת קורת גג אחת.',
    descEn: 'Process, policy, budget, suppliers and technology under one roof.',
  },
  {
    icon: 'savings',
    he: 'שליטה בעלויות וחיסכון',
    en: 'Cost control and savings',
    descHe: 'בקרה על ההוצאות, זיהוי חריגות ומיצוי הזדמנויות לחיסכון.',
    descEn: 'Spend oversight, exception identification and maximization of cost-saving opportunities.',
  },
  {
    icon: 'expand',
    he: 'תוצאות עסקיות מדידות',
    en: 'Measurable business outcomes',
    descHe: 'תהליכים המאפשרים למדוד ביצועים, לזהות זליגות ולשפר את עלויות הנסיעה לאורך זמן.',
    descEn: 'Processes that enable performance measurement, leakage identification and continuous travel cost optimization.',
  },
]

export default function WhyUs() {
  const { lang } = useLanguage()

  return (
    <section id="why" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <h2 className="font-display-lg text-headline-md text-on-surface mb-4">
            {lang === 'he' ? 'היתרונות שלנו' : 'Our Advantages'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {reasons.map((reason) => (
            <GlassCard key={reason.en} className="flex flex-col items-start">
              <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '32px' }}>
                {reason.icon}
              </span>
              <h3 className="font-headline-md text-headline-md mb-2">
                {lang === 'he' ? reason.he : reason.en}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {lang === 'he' ? reason.descHe : reason.descEn}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

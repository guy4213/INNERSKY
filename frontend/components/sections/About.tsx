'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'

const industries = [
  { he: 'טכנולוגיה', en: 'Technology' },
  { he: 'תקשורת', en: 'Telecom' },
  { he: 'אנרגיה', en: 'Energy' },
  { he: 'סייבר', en: 'Cyber' },
  { he: 'ארגונים בינלאומיים', en: 'International Organizations' },
]

export default function About() {
  const { lang } = useLanguage()

  return (
    <section id="about" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-7">
            <h2 className="font-display-lg text-headline-md text-on-surface mb-6">
              {lang === 'he' ? 'מי אנחנו' : 'Who We Are'}
            </h2>

            {lang === 'he' ? (
              <div className="font-body-lg text-body-md text-on-surface-variant space-y-4 mb-8">
                <p>
                  INNERSKY מתמחה בניהול ותפעול נסיעות עסקיות עבור ארגונים בישראל ובעולם.
                </p>
                <p>
                  עם למעלה מ-20 שנות ניסיון בניהול תוכניות נסיעות גלובליות, הטמעת מערכות, בניית מדיניות,
                  ניהול ספקים ובקרת תקציבים, אנו מסייעים לחברות להפוך את תחום הנסיעות העסקיות מפעילות
                  תפעולית מורכבת לפונקציה ניהולית יעילה ומבוקרת.
                </p>
                <p>
                  הניסיון שלנו כולל עבודה עם חברות טכנולוגיה, תקשורת, אנרגיה, סייבר וארגונים בינלאומיים
                  בעלי פעילות גלובלית.
                </p>
              </div>
            ) : (
              <div className="font-body-lg text-body-md text-on-surface-variant space-y-4 mb-8">
                <p>
                  INNERSKY specializes in corporate travel operations for organizations with regional and
                  global activity.
                </p>
                <p>
                  With more than 20 years of experience managing global travel programs, policies,
                  suppliers, budgets and technology implementations, we help companies transform travel
                  from a fragmented operational burden into a structured management function.
                </p>
              </div>
            )}

            <p className="italic text-primary font-body-lg text-body-lg glow-text-primary mb-8">
              {lang === 'he'
                ? 'אנו מאמינים כי ניהול נסיעות עסקיות אינו מתחיל בהזמנת טיסה ומלון. הוא מתחיל באסטרטגיה, תהליך, מדיניות ושליטה.'
                : 'We believe travel management begins long before booking a flight. It begins with governance, process, visibility and control.'}
            </p>
          </div>

          <div className="lg:col-span-5">
            <GlassCard>
              <h3 className="font-headline-md text-headline-md mb-6 text-on-surface">
                {lang === 'he' ? 'תחומי פעילות' : 'Industries We Serve'}
              </h3>
              <div className="flex flex-col gap-4">
                {industries.map((industry) => (
                  <div key={industry.en} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">
                      {lang === 'he' ? industry.he : industry.en}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}

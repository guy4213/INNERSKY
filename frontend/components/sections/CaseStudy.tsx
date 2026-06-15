'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'

const results = [
  { he: 'שיפור השליטה בתהליך', en: 'Improved process control' },
  { he: 'אכיפה טובה יותר של מדיניות', en: 'Better policy enforcement' },
  { he: 'צמצום עומסים תפעוליים', en: 'Reduced operational overload' },
  { he: 'שיפור חוויית העובד', en: 'Improved employee experience' },
  { he: 'בקרה טובה יותר על תקציבי נסיעות', en: 'Better control over travel budgets' },
]

export default function CaseStudy() {
  const { lang } = useLanguage()

  return (
    <section id="case-study" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-2">
            Case Study
          </p>
          <h2 className="font-display-lg text-headline-md text-on-surface">Global Technology Company</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <GlassCard className="flex flex-col">
            <span className="material-symbols-outlined text-electric mb-4" style={{ fontSize: '32px' }}>
              report_problem
            </span>
            <h3 className="font-headline-md text-headline-md mb-4">
              {lang === 'he' ? 'האתגר' : 'The Challenge'}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {lang === 'he'
                ? 'גידול משמעותי בפעילות הנסיעות יצר עומס תפעולי, ריבוי גורמי אישור וחוסר שקיפות בתהליך.'
                : 'Significant growth in travel activity created an operational burden, multiple approval layers, and a lack of process visibility.'}
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col">
            <span className="material-symbols-outlined text-primary mb-4" style={{ fontSize: '32px' }}>
              tune
            </span>
            <h3 className="font-headline-md text-headline-md mb-4">
              {lang === 'he' ? 'הפתרון' : 'The Solution'}
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              {lang === 'he'
                ? 'מיפוי מלא של תהליך הנסיעות, התאמת מדיניות, שיפור תהליכי אישור, חיזוק הבקרה התקציבית ושיפור העבודה מול ספקי הנסיעות.'
                : 'A full mapping of the travel process, policy adjustments, improved approval workflows, stronger budget control, and improved supplier collaboration.'}
            </p>
          </GlassCard>

          <GlassCard className="flex flex-col">
            <span className="material-symbols-outlined text-electric mb-4" style={{ fontSize: '32px' }}>
              emoji_events
            </span>
            <h3 className="font-headline-md text-headline-md mb-4">
              {lang === 'he' ? 'התוצאה' : 'The Result'}
            </h3>
            <ul className="flex flex-col gap-2">
              {results.map((result) => (
                <li key={result.en} className="flex items-start gap-2 font-body-md text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">check</span>
                  <span>{lang === 'he' ? result.he : result.en}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'

const challenges = [
  { icon: 'sync_problem', he: 'חוסר אחידות בתהליך', en: 'Process Inconsistency' },
  { icon: 'policy', he: 'חריגות ממדיניות', en: 'Policy Non-Compliance' },
  { icon: 'money_off', he: 'היעדר בקרה תקציבית', en: 'Lack of Budget Control' },
  { icon: 'pending_actions', he: 'עומס אדמיניסטרטיבי', en: 'Administrative Overload' },
  { icon: 'visibility_off', he: 'חוסר שקיפות', en: 'Lack of Visibility' },
  { icon: 'person_off', he: 'חוויית עובד לא עקבית', en: 'Inconsistent Experience' },
]

export default function Challenge() {
  const { lang } = useLanguage()

  return (
    <section id="challenge" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-12">
          <h2 className="font-display-lg text-headline-md text-on-surface mb-6">
            {lang === 'he' ? 'מתי נסיעות מפסיקות "להסתדר לבד"?' : 'When does travel stop "managing itself"?'}
          </h2>

          {lang === 'he' ? (
            <p className="font-body-lg text-body-md text-on-surface-variant">
              בשלבים מוקדמים של החברה, ניהול הנסיעות מתבצע בדרך כלל באופן טבעי. עובדים מזמינים נסיעות.
              מנהלות משרד מטפלות בבקשות. מנהלים מאשרים חריגים. אבל ככל שהארגון גדל, מתחילים להופיע
              אתגרים:
            </p>
          ) : (
            <p className="font-body-lg text-body-md text-on-surface-variant">
              In the early stages of a company, travel management tends to happen naturally. Employees
              book their own trips. Office managers handle requests. Managers approve exceptions. But as
              the organization grows, challenges start to emerge:
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-12">
          {challenges.map((item) => (
            <GlassCard key={item.icon} className="flex flex-col items-start">
              <span className="material-symbols-outlined text-electric mb-4" style={{ fontSize: '32px' }}>
                {item.icon}
              </span>
              <h3 className="font-headline-md text-headline-md mb-2">
                {lang === 'he' ? item.he : item.en}
              </h3>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                {lang === 'he' ? item.en : item.he}
              </p>
            </GlassCard>
          ))}
        </div>

        <p className="italic text-primary font-body-lg text-body-lg glow-text-primary text-center">
          {lang === 'he'
            ? 'זה הרגע שבו ניהול הנסיעות הופך לפונקציה ניהולית.'
            : 'This is the moment when travel management becomes a management function.'}
        </p>
      </div>
    </section>
  )
}

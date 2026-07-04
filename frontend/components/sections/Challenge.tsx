'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'

const processSteps = [
  { he: 'עובדים מזמינים נסיעות', en: 'Employees book their own trips' },
  { he: 'מנהלות משרד מטפלות בבקשות', en: 'Office managers handle requests' },
  { he: 'מנהלים מאשרים חריגים', en: 'Managers approve exceptions' },
]

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
              בשלבים מוקדמים של החברה, ניהול הנסיעות מתבצע בדרך כלל באופן טבעי. אבל ככל שהארגון גדל, מתחילים להופיע אתגרים:
            </p>
          ) : (
            <p className="font-body-lg text-body-md text-on-surface-variant">
              In the early stages of a company, travel management tends to happen naturally. But as the organization grows, challenges start to emerge:
            </p>
          )}
        </div>

        {/* Process flow with arrows */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-12 flex-wrap">
          {processSteps.map((step, i) => (
            <div key={step.en} className="flex flex-col md:flex-row items-center gap-3">
              <div className="glass-card rounded-xl px-5 py-3 text-center text-on-surface font-body-md text-body-md">
                {lang === 'he' ? step.he : step.en}
              </div>
              <span
                className="material-symbols-outlined text-primary"
                style={{
                  fontSize: '28px',
                  transform: lang === 'he' ? 'rotate(180deg)' : undefined,
                }}
              >
                arrow_forward
              </span>
            </div>
          ))}
          <div className="glass-card rounded-xl px-5 py-3 text-center text-electric font-body-md text-body-md border border-electric/30">
            {lang === 'he' ? 'מתחילים אתגרים...' : 'Challenges emerge...'}
          </div>
        </div>

        {/* All challenges in one unified box */}
        <GlassCard className="mb-12 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((item) => (
              <div key={item.icon} className="flex items-center gap-4">
                <span className="material-symbols-outlined text-electric flex-shrink-0" style={{ fontSize: '26px' }}>
                  {item.icon}
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">
                  {lang === 'he' ? item.he : item.en}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        <p
          className="italic text-primary font-bold glow-text-primary text-center"
          style={{ fontSize: '28px', lineHeight: '1.3' }}
        >
          {lang === 'he'
            ? 'זה הרגע שבו ניהול הנסיעות הופך לפונקציה ניהולית.'
            : 'This is the moment when travel management becomes a management function.'}
        </p>
      </div>
    </section>
  )
}

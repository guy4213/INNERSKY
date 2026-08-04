'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'

export default function SavingsStrip() {
  const { lang } = useLanguage()

  return (
    <section className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <GlassCard className="max-w-4xl mx-auto text-center px-8 py-10 md:px-12 md:py-14">
          <span
            className="material-symbols-outlined text-electric mb-4 inline-block"
            style={{ fontSize: '36px' }}
          >
            savings
          </span>
          <p className="font-headline-md text-headline-sm md:text-headline-md text-on-surface leading-[1.5]">
            {lang === 'he'
              ? 'חיסכון בנסיעות עסקיות אינו נובע רק ממחיר הטיסה או המלון. הוא נוצר מהתהליך כולו: תכנון נכון, מדיניות מותאמת, אישורים יעילים, ניצול הסכמים, ניהול ספקים ובקרה שוטפת על ההוצאות.'
              : 'Business travel savings do not come only from the price of a flight or hotel. They are created across the entire process: effective planning, fit-for-purpose policy, efficient approvals, proper use of negotiated agreements, supplier management and continuous spend control.'}
          </p>
        </GlassCard>
      </div>
    </section>
  )
}

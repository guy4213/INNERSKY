'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'

export default function Article() {
  const { lang } = useLanguage()

  return (
    <section id="article" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <GlassCard className="p-12 md:p-16">
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4">
            {lang === 'he' ? 'תוכן' : 'Insights'}
          </p>
          <h2 className="font-display-lg text-headline-md text-on-surface mb-4">
            {lang === 'he' ? 'מאמר' : 'Article'}
          </h2>
          <p className="font-body-lg text-body-md text-on-surface-variant">
          </p>
        </GlassCard>
      </div>
    </section>
  )
}

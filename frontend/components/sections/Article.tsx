'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'
import { Article as ArticleType } from '@/types'

export default function Article({ initialArticle }: { initialArticle: ArticleType | null }) {
  const { lang } = useLanguage()
  const article = initialArticle

  const title = article ? (lang === 'he' ? article.titleHe : article.titleEn) : ''
  const content = article ? (lang === 'he' ? article.contentHe : article.contentEn) : ''

  if (!title && !content) return null

  return (
    <section id="article" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <GlassCard className="p-12 md:p-16">
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-4">
            {lang === 'he' ? 'תוכן' : 'Insights'}
          </p>
          {title && (
            <h2 className="font-display-lg text-headline-md text-on-surface mb-6">{title}</h2>
          )}
          {content && (
            <p className="font-body-lg text-body-md text-on-surface-variant whitespace-pre-wrap">{content}</p>
          )}
        </GlassCard>
      </div>
    </section>
  )
}

'use client'

import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'

const services = [
  {
    icon: 'assignment',
    color: 'text-primary',
    titleEn: 'Travel Operations Audit',
    titleHe: 'להבין את המצב הקיים',
    descHe: 'סקירה מקצועית של מערך הנסיעות הארגוני.',
    includesHe: ['תהליכים', 'מדיניות', 'ספקים', 'תקציבים', 'מערכות', 'מבנה אחריות'],
    resultHe: 'תוצר: דו"ח מסודר עם פערים, סיכונים והמלצות.',
    featured: false,
  },
  {
    icon: 'tune',
    color: 'text-electric',
    titleEn: 'Travel Operations Optimization',
    titleHe: 'לבנות את המודל הנכון',
    descHe: 'תכנון ושיפור מערך הנסיעות.',
    includesHe: ['תהליכי עבודה', 'מדיניות נסיעות', 'תהליכי אישור', 'בקרה תקציבית', 'ניהול ספקים', 'חוויית עובד'],
    resultHe: 'תוצר: מודל עבודה סקיילבילי ובר קיימא.',
    featured: true,
  },
  {
    icon: 'business_center',
    color: 'text-primary',
    titleEn: 'Outsourced Travel Management',
    titleHe: 'ניהול מקצועי במיקור חוץ',
    descHe: 'שירות לחברות שאינן מעוניינות להחזיק פונקציית Travel Management מלאה.',
    includesHe: ['ניהול תהליך', 'אכיפת מדיניות', 'עבודה מול ספקים', 'בקרה תקציבית', 'תמיכה לעובדים', 'דוחות ובקרות'],
    resultHe: '',
    featured: false,
  },
]

export default function Services() {
  const { lang } = useLanguage()

  return (
    <section id="services" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <h2 className="font-display-lg text-headline-md text-on-surface mb-4">
            {lang === 'he' ? 'שירותים' : 'Services'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {services.map((service) => (
            <GlassCard key={service.titleEn} featured={service.featured} className="relative flex flex-col">
              {service.featured && (
                <span className="absolute top-6 right-6 bg-electric text-white font-label-sm text-label-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {lang === 'he' ? 'פופולרי' : 'Popular'}
                </span>
              )}

              <span className={`material-symbols-outlined ${service.color} mb-8`} style={{ fontSize: '32px' }}>
                {service.icon}
              </span>

              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">
                {service.titleEn}
              </p>
              <h3 className="font-headline-md text-headline-md mb-4">{service.titleHe}</h3>

              <p className="font-body-md text-body-md text-on-surface-variant mb-4">{service.descHe}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {service.includesHe.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1 rounded-full border border-outline/20 text-on-surface-variant"
                  >
                    {item}
                  </span>
                ))}
              </div>

              {service.resultHe && (
                <p className="font-body-md text-body-md text-primary mt-auto">{service.resultHe}</p>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}

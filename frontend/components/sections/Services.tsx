'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'
import { getServices } from '@/lib/api'
import { Service } from '@/types'

const fallbackServices: Service[] = [
  {
    id: 1, orderIndex: 1, icon: 'assignment', color: 'text-primary', featured: false,
    titleHe: 'ניתוח תפעול הנסיעות', titleEn: 'Travel Operations Audit',
    descHe: 'להבין את המצב הקיים — סקירה מקצועית של מערך הנסיעות הארגוני.',
    descEn: "Understanding the current state — a professional review of the organization's travel operations.",
    includesHe: 'תהליכים,מדיניות,ספקים,תקציבים,מערכות,מבנה אחריות',
    includesEn: 'Processes,Policy,Suppliers,Budgets,Systems,Accountability structure',
    resultHe: 'תוצר: דו"ח מסודר המציג פערים, סיכונים, מוקדי זליגה והזדמנויות לחיסכון ולשיפור.',
    resultEn: 'Deliverable: A structured report identifying gaps, risks, sources of cost leakage and opportunities for improvement and cost savings.',
    visible: true,
    updatedAt: '',
  },
  {
    id: 2, orderIndex: 2, icon: 'tune', color: 'text-electric', featured: true,
    titleHe: 'שדרוג התשתיות לניהול ותפעול הנסיעות בארגון', titleEn: 'Travel Operations Optimization',
    descHe: 'תכנון ושיפור מערך הנסיעות.',
    descEn: 'Planning and improving the travel operations framework.',
    includesHe: 'תהליכי עבודה,מדיניות נסיעות,תהליכי אישור,בקרה תקציבית,ניהול ספקים,חוויית עובד',
    includesEn: 'Workflows,Travel policy,Approval processes,Budget control,Supplier management,Employee experience',
    resultHe: 'תוצר: מודל עבודה מדיד ובר קיימא, המשפר את השליטה בהוצאות ומאפשר צמצום עלויות מיותרות וחיסכון לאורך זמן.',
    resultEn: 'Deliverable: A measurable, sustainable operating model that improves spend control, reduces unnecessary costs and enables long-term savings.',
    visible: true,
    updatedAt: '',
  },
  {
    id: 3, orderIndex: 3, icon: 'business_center', color: 'text-primary', featured: false,
    titleHe: 'שירות חיצוני לניהול ותפעול תהליך הנסיעות בארגון', titleEn: 'Outsourced Travel Management',
    descHe: 'שירות לחברות שאינן מעוניינות להחזיק פונקציית ניהול נסיעות מלאה.',
    descEn: 'A service for organizations that prefer not to maintain a full in-house travel management function.',
    includesHe: 'ניהול תהליך,אכיפת מדיניות,עבודה מול ספקים,בקרה תקציבית,תמיכה לעובדים,דוחות ובקרות,זיהוי שוטף של מוקדי זליגה והזדמנויות לחיסכון',
    includesEn: 'Process management,Policy enforcement,Supplier relations,Budget control,Employee support,Reports & controls,Ongoing identification of cost leakage and cost-saving opportunities',
    resultHe: '', resultEn: '',
    visible: true,
    updatedAt: '',
  },
]

export default function Services() {
  const { lang } = useLanguage()
  const [services, setServices] = useState<Service[]>(fallbackServices)

  useEffect(() => {
    getServices().then((res) => {
      if (res.success && res.data) {
        setServices(res.data)
      }
    })
  }, [])

  if (services.length === 0) return null

  return (
    <section id="services" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <h2 className="font-display-lg text-headline-md text-on-surface mb-4">
            {lang === 'he' ? 'שירותים' : 'Services'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {services.map((service) => {
            const includesArr = (lang === 'he' ? service.includesHe : service.includesEn)
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
            const result = lang === 'he' ? service.resultHe : service.resultEn

            return (
              <GlassCard key={service.id} featured={service.featured} className="relative flex flex-col">
                {service.featured && (
                  <span className="absolute top-6 right-6 bg-electric text-white font-label-sm text-label-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {lang === 'he' ? 'פופולרי' : 'Popular'}
                  </span>
                )}

                <span className={`material-symbols-outlined ${service.color} mb-8`} style={{ fontSize: '32px' }}>
                  {service.icon}
                </span>

                <h3 className="font-headline-md text-headline-md mb-4">
                  {lang === 'he' ? service.titleHe : service.titleEn}
                </h3>

                <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                  {lang === 'he' ? service.descHe : service.descEn}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {includesArr.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1 rounded-full border border-outline/20 text-on-surface-variant"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {result && (
                  <p className="font-body-md text-body-md text-primary mt-auto">{result}</p>
                )}
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const defaultServices = [
  {
    orderIndex: 1,
    icon: 'assignment',
    color: 'text-primary',
    featured: false,
    titleHe: 'ניתוח תפעול הנסיעות',
    titleEn: 'Travel Operations Audit',
    descHe: 'להבין את המצב הקיים — סקירה מקצועית של מערך הנסיעות הארגוני.',
    descEn: "Understanding the current state — a professional review of the organization's travel operations.",
    includesHe: 'תהליכים,מדיניות,ספקים,תקציבים,מערכות,מבנה אחריות',
    includesEn: 'Processes,Policy,Suppliers,Budgets,Systems,Accountability structure',
    resultHe: 'תוצר: דו"ח מסודר עם פערים, סיכונים והמלצות.',
    resultEn: 'Output: A structured report with gaps, risks and recommendations.',
  },
  {
    orderIndex: 2,
    icon: 'tune',
    color: 'text-electric',
    featured: true,
    titleHe: 'שדרוג התשתיות לניהול ותפעול הנסיעות בארגון',
    titleEn: 'Travel Operations Optimization',
    descHe: 'תכנון ושיפור מערך הנסיעות.',
    descEn: 'Planning and improving the travel operations framework.',
    includesHe: 'תהליכי עבודה,מדיניות נסיעות,תהליכי אישור,בקרה תקציבית,ניהול ספקים,חוויית עובד',
    includesEn: 'Workflows,Travel policy,Approval processes,Budget control,Supplier management,Employee experience',
    resultHe: 'תוצר: מודל עבודה מדיד ובר קיימא.',
    resultEn: 'Output: A measurable and sustainable operating model.',
  },
  {
    orderIndex: 3,
    icon: 'business_center',
    color: 'text-primary',
    featured: false,
    titleHe: 'שירות חיצוני לניהול ותפעול תהליך הנסיעות בארגון',
    titleEn: 'Outsourced Travel Management',
    descHe: 'שירות לחברות שאינן מעוניינות להחזיק פונקציית ניהול נסיעות מלאה.',
    descEn: 'A service for organizations that prefer not to maintain a full in-house travel management function.',
    includesHe: 'ניהול תהליך,אכיפת מדיניות,עבודה מול ספקים,בקרה תקציבית,תמיכה לעובדים,דוחות ובקרות',
    includesEn: 'Process management,Policy enforcement,Supplier relations,Budget control,Employee support,Reports & controls',
    resultHe: '',
    resultEn: '',
  },
]

async function main() {
  for (const orderIndex of [1, 2, 3]) {
    const existing = await prisma.product.findFirst({ where: { orderIndex } })
    if (!existing) {
      await prisma.product.create({ data: { orderIndex } })
    }
  }

  for (const svc of defaultServices) {
    const existing = await prisma.service.findFirst({ where: { orderIndex: svc.orderIndex } })
    if (!existing) {
      await prisma.service.create({ data: svc })
    }
  }

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

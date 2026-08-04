import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const updates = [
  {
    orderIndex: 1,
    data: {
      resultHe: 'תוצר: דו"ח מסודר המציג פערים, סיכונים, מוקדי זליגה והזדמנויות לחיסכון ולשיפור.',
      resultEn:
        'Deliverable: A structured report identifying gaps, risks, sources of cost leakage and opportunities for improvement and cost savings.',
    },
  },
  {
    orderIndex: 2,
    data: {
      resultHe:
        'תוצר: מודל עבודה מדיד ובר קיימא, המשפר את השליטה בהוצאות ומאפשר צמצום עלויות מיותרות וחיסכון לאורך זמן.',
      resultEn:
        'Deliverable: A measurable, sustainable operating model that improves spend control, reduces unnecessary costs and enables long-term savings.',
    },
  },
  {
    orderIndex: 3,
    data: {
      includesHe:
        'ניהול תהליך,אכיפת מדיניות,עבודה מול ספקים,בקרה תקציבית,תמיכה לעובדים,דוחות ובקרות,זיהוי שוטף של מוקדי זליגה והזדמנויות לחיסכון',
      includesEn:
        'Process management,Policy enforcement,Supplier relations,Budget control,Employee support,Reports & controls,Ongoing identification of cost leakage and cost-saving opportunities',
    },
  },
]

async function main() {
  for (const { orderIndex, data } of updates) {
    const result = await prisma.service.updateMany({
      where: { orderIndex },
      data,
    })
    console.log(`orderIndex=${orderIndex}: updated ${result.count} row(s)`)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
    process.exit(1)
  })

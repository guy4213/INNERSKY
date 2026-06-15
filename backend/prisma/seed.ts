import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  for (const orderIndex of [1, 2, 3]) {
    const existing = await prisma.product.findFirst({ where: { orderIndex } })
    if (!existing) {
      await prisma.product.create({ data: { orderIndex } })
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

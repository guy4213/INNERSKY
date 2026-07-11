import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const [email, password] = process.argv.slice(2)
  if (!email || !password) {
    console.error('Usage: npm run admin:create -- <email> <password>')
    process.exit(1)
  }

  const normalized = email.toLowerCase()
  const passwordHash = await bcrypt.hash(password, 10)

  const admin = await prisma.admin.upsert({
    where: { email: normalized },
    update: { passwordHash },
    create: { email: normalized, passwordHash },
  })

  console.log(`Admin ${admin.email} saved (id=${admin.id})`)
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

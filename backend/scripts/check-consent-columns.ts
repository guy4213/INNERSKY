import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const rows = await prisma.$queryRawUnsafe<Array<{ column_name: string; data_type: string; is_nullable: string }>>(
    `SELECT column_name, data_type, is_nullable
     FROM information_schema.columns
     WHERE table_name = 'ContactSubmission'
     ORDER BY ordinal_position`
  )
  console.log('ContactSubmission columns:')
  for (const r of rows) {
    console.log(`  - ${r.column_name} (${r.data_type}, nullable=${r.is_nullable})`)
  }

  const hasConsent = rows.some((r) => r.column_name === 'consentGivenAt')
  const hasVersion = rows.some((r) => r.column_name === 'privacyPolicyVersion')
  console.log('')
  console.log(`consentGivenAt present:       ${hasConsent ? 'YES' : 'NO — needs migration'}`)
  console.log(`privacyPolicyVersion present: ${hasVersion ? 'YES' : 'NO — needs migration'}`)
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

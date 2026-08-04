import cron from 'node-cron'
import { prisma } from '../lib/db'

const RETENTION_MONTHS = 24

async function purgeOldSubmissions() {
  const cutoff = new Date()
  cutoff.setMonth(cutoff.getMonth() - RETENTION_MONTHS)

  const result = await prisma.contactSubmission.deleteMany({
    where: { createdAt: { lt: cutoff } },
  })

  if (result.count > 0) {
    console.log(`[purge] deleted ${result.count} ContactSubmission rows older than ${cutoff.toISOString()}`)
  }
}

export function startPurgeJob() {
  cron.schedule('0 3 * * *', () => {
    purgeOldSubmissions().catch((err) => {
      console.error('[purge] job failed:', err)
    })
  })
  console.log(`[purge] scheduled daily at 03:00, retention ${RETENTION_MONTHS} months`)
}

export { purgeOldSubmissions }

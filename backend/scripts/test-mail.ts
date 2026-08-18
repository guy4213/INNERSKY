import 'dotenv/config'
import { mailer, MAIL_FROM, MAIL_TO, isMailConfigured } from '../src/lib/mailer'

// Sends one test message through the configured SMTP account, bypassing the
// contact route so credentials can be checked without the rate limiter.
async function main() {
  const to = process.argv[2] ?? MAIL_TO

  if (!isMailConfigured) {
    console.error('SMTP is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS and MAIL_TO.')
    process.exit(1)
  }

  console.log(`host : ${process.env.SMTP_HOST}:${process.env.SMTP_PORT ?? 587}`)
  console.log(`from : ${MAIL_FROM}`)
  console.log(`to   : ${to}`)

  await mailer.verify()
  console.log('connection + credentials OK')

  const info = await mailer.sendMail({
    from: MAIL_FROM,
    to,
    subject: 'InnerSky SMTP test',
    html: '<p>If you are reading this, outgoing mail works.</p>',
  })

  console.log(`sent: ${info.messageId}`)
}

main()
  .catch((err) => {
    console.error('FAILED:', err.message)
    process.exit(1)
  })
  .finally(() => mailer.close())

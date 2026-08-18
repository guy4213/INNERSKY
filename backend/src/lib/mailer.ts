import nodemailer from 'nodemailer'

const port = Number(process.env.SMTP_PORT ?? 587)

// Single transport reused across requests - nodemailer pools the connection.
export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port,
  // 465 is implicit TLS; 587 starts plain and upgrades via STARTTLS.
  secure: port === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Falls back to the mailbox itself so a missing MAIL_FROM still sends.
export const MAIL_FROM = process.env.MAIL_FROM ?? process.env.SMTP_USER ?? ''

// RESEND_TO_EMAIL is the pre-SMTP name for the same value - kept as a fallback
// so existing deployments keep working until the variable is renamed.
export const MAIL_TO = process.env.MAIL_TO ?? process.env.RESEND_TO_EMAIL ?? ''

export const isMailConfigured = Boolean(
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && MAIL_TO
)

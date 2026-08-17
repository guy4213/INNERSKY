import { Router } from 'express'
import { prisma } from '../lib/db'
import { resend, RESEND_TO_EMAIL } from '../lib/resend'
import { escapeHtml } from '../lib/sanitize'
import { validate } from '../middleware/validate'
import { contactLimiter } from '../middleware/rateLimiters'
import { contactSchema } from '../validators'

const router = Router()

router.post('/', contactLimiter, validate(contactSchema), async (req, res, next) => {
  try {
    const { name, company, email, phone, message, privacyPolicyVersion } = req.body as {
      name: string
      company?: string
      email: string
      phone?: string
      message: string
      consent: true
      privacyPolicyVersion?: string
    }

    const submission = await prisma.contactSubmission.create({
      data: {
        name,
        company,
        email,
        phone,
        message,
        consentGivenAt: new Date(),
        privacyPolicyVersion: privacyPolicyVersion ?? process.env.PRIVACY_POLICY_VERSION ?? '2026-08-03',
      },
    })

    // The submission is already persisted, so a mail failure must not fail the
    // request - the visitor would re-submit and create duplicate rows.
    if (process.env.RESEND_API_KEY) {
      try {
        const { error: mailError } = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL ?? 'InnerSky <onboarding@resend.dev>',
          to: RESEND_TO_EMAIL,
          subject: `New contact form submission from ${escapeHtml(name)}`,
          html: `
            <p><strong>Name:</strong> ${escapeHtml(name)}</p>
            <p><strong>Company:</strong> ${escapeHtml(company ?? '-')}</p>
            <p><strong>Email:</strong> ${escapeHtml(email)}</p>
            <p><strong>Phone:</strong> ${escapeHtml(phone ?? '-')}</p>
            <p><strong>Message:</strong> ${escapeHtml(message)}</p>
          `,
        })

        // The SDK reports API errors on the response rather than throwing, so an
        // unverified domain or a mistyped recipient would otherwise pass silently.
        if (mailError) {
          console.error(`[contact] email rejected for submission ${submission.id}:`, mailError)
        }
      } catch (mailError) {
        console.error(`[contact] email failed for submission ${submission.id}:`, mailError)
      }
    }

    res.json({ success: true, data: submission })
  } catch (err) {
    next(err)
  }
})

export default router

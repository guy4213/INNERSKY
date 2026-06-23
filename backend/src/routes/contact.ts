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
    const { name, company, email, phone, message } = req.body as {
      name: string
      company?: string
      email: string
      phone?: string
      message: string
    }

    const submission = await prisma.contactSubmission.create({
      data: { name, company, email, phone, message },
    })

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'InnerSky <onboarding@resend.dev>',
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
    }

    res.json({ success: true, data: submission })
  } catch (err) {
    next(err)
  }
})

export default router

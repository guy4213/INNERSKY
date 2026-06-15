import { Router } from 'express'
import { prisma } from '../lib/db'
import { resend, RESEND_TO_EMAIL } from '../lib/resend'

const router = Router()

router.post('/', async (req, res, next) => {
  try {
    const { name, company, email, phone, message } = req.body as {
      name?: string
      company?: string
      email?: string
      phone?: string
      message?: string
    }

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email and message are required' })
    }

    const submission = await prisma.contactSubmission.create({
      data: { name, company, email, phone, message },
    })

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'InnerSky <onboarding@resend.dev>',
        to: RESEND_TO_EMAIL,
        subject: `New contact form submission from ${name}`,
        html: `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Company:</strong> ${company ?? '-'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone ?? '-'}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      })
    }

    res.json({ success: true, data: submission })
  } catch (err) {
    next(err)
  }
})

export default router

import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { submissionUpdateSchema } from '../validators'
import { prisma } from '../lib/db'

const router = Router()

router.get('/submissions', requireAuth, async (_req, res, next) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, data: submissions })
  } catch (err) {
    next(err)
  }
})

router.put('/submissions/:id', requireAuth, validate(submissionUpdateSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { status, notes } = req.body as { status?: string; notes?: string | null }
    const submission = await prisma.contactSubmission.update({
      where: { id },
      data: { status, notes },
    })
    res.json({ success: true, data: submission })
  } catch (err) {
    next(err)
  }
})

function csvEscape(value: unknown): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

router.get('/submissions/export.csv', requireAuth, async (_req, res, next) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })
    const header = [
      'id',
      'createdAt',
      'status',
      'name',
      'company',
      'email',
      'phone',
      'message',
      'notes',
      'consentGivenAt',
      'privacyPolicyVersion',
    ]
    const rows = submissions.map((s) => [
      s.id,
      s.createdAt.toISOString(),
      s.status,
      s.name,
      s.company ?? '',
      s.email,
      s.phone ?? '',
      s.message,
      s.notes ?? '',
      s.consentGivenAt ? s.consentGivenAt.toISOString() : '',
      s.privacyPolicyVersion ?? '',
    ])
    const csv = [header, ...rows].map((r) => r.map(csvEscape).join(',')).join('\r\n')
    const bom = '﻿'
    const filename = `innersky-submissions-${new Date().toISOString().slice(0, 10)}.csv`
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`)
    res.send(bom + csv)
  } catch (err) {
    next(err)
  }
})

export default router

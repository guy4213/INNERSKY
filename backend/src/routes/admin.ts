import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { prisma } from '../lib/db'

const router = Router()

router.get('/submissions', requireAuth, async (req, res, next) => {
  try {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json({ success: true, data: submissions })
  } catch (err) {
    next(err)
  }
})

export default router

import { Router } from 'express'
import { requireAuth, optionalAuth } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { serviceUpdateSchema } from '../validators'
import { prisma } from '../lib/db'
import { AuthRequest } from '../types'

const router = Router()

router.get('/', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const isAdmin = !!req.user
    const services = await prisma.service.findMany({
      where: isAdmin ? undefined : { visible: true },
      orderBy: { orderIndex: 'asc' },
    })
    res.json({ success: true, data: services })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireAuth, validate(serviceUpdateSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { titleHe, titleEn, descHe, descEn, includesHe, includesEn, resultHe, resultEn, visible } = req.body

    const service = await prisma.service.update({
      where: { id },
      data: { titleHe, titleEn, descHe, descEn, includesHe, includesEn, resultHe, resultEn, visible },
    })

    res.json({ success: true, data: service })
  } catch (err) {
    next(err)
  }
})

export default router

import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { serviceUpdateSchema } from '../validators'
import { prisma } from '../lib/db'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const services = await prisma.service.findMany({ orderBy: { orderIndex: 'asc' } })
    res.json({ success: true, data: services })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireAuth, validate(serviceUpdateSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { titleHe, titleEn, descHe, descEn, includesHe, includesEn, resultHe, resultEn } = req.body

    const service = await prisma.service.update({
      where: { id },
      data: { titleHe, titleEn, descHe, descEn, includesHe, includesEn, resultHe, resultEn },
    })

    res.json({ success: true, data: service })
  } catch (err) {
    next(err)
  }
})

export default router

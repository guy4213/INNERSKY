import { Router } from 'express'
import { requireAuth, optionalAuth } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { articleUpdateSchema } from '../validators'
import { prisma } from '../lib/db'
import { AuthRequest } from '../types'

const router = Router()

router.get('/', optionalAuth, async (req: AuthRequest, res, next) => {
  try {
    const isAdmin = !!req.user
    let article = await prisma.article.findFirst()
    if (!article) {
      article = await prisma.article.create({ data: {} })
    }
    if (!isAdmin && !article.visible) {
      return res.json({ success: true, data: null })
    }
    res.json({ success: true, data: article })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireAuth, validate(articleUpdateSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { titleHe, titleEn, contentHe, contentEn, visible } = req.body

    const article = await prisma.article.update({
      where: { id },
      data: { titleHe, titleEn, contentHe, contentEn, visible },
    })

    res.json({ success: true, data: article })
  } catch (err) {
    next(err)
  }
})

export default router

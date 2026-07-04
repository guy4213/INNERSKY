import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { articleUpdateSchema } from '../validators'
import { prisma } from '../lib/db'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    let article = await prisma.article.findFirst()
    if (!article) {
      article = await prisma.article.create({ data: {} })
    }
    res.json({ success: true, data: article })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireAuth, validate(articleUpdateSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { titleHe, titleEn, contentHe, contentEn } = req.body

    const article = await prisma.article.update({
      where: { id },
      data: { titleHe, titleEn, contentHe, contentEn },
    })

    res.json({ success: true, data: article })
  } catch (err) {
    next(err)
  }
})

export default router

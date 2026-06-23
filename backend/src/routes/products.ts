import { Router } from 'express'
import { requireAuth } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { uploadLimiter } from '../app'
import { productUpdateSchema } from '../validators'
import { prisma } from '../lib/db'
import { upload, uploadImageBuffer } from './upload'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { orderIndex: 'asc' } })
    res.json({ success: true, data: products })
  } catch (err) {
    next(err)
  }
})

router.put('/:id', requireAuth, validate(productUpdateSchema), async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const { nameHe, nameEn, descriptionHe, descriptionEn } = req.body

    const product = await prisma.product.update({
      where: { id },
      data: { nameHe, nameEn, descriptionHe, descriptionEn },
    })

    res.json({ success: true, data: product })
  } catch (err) {
    next(err)
  }
})

router.post('/:id/image', requireAuth, uploadLimiter, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' })
    }

    const id = Number(req.params.id)
    const imageUrl = await uploadImageBuffer(req.file.buffer, 'innersky/products')

    const product = await prisma.product.update({
      where: { id },
      data: { imageUrl },
    })

    res.json({ success: true, data: product })
  } catch (err) {
    next(err)
  }
})

export default router

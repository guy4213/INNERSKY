import { Router } from 'express'
import { z } from 'zod'
import { requireAuth } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { prisma } from '../lib/db'

const router = Router()

export const SECTION_KEYS = [
  'hero',
  'about',
  'challenge',
  'savings-strip',
  'services',
  'values',
  'case-study',
  'why-us',
  'products',
  'article',
  'contact',
] as const

type SectionKey = (typeof SECTION_KEYS)[number]

async function ensureSeed() {
  const existing = await prisma.sectionSetting.findMany({ select: { key: true } })
  const existingKeys = new Set(existing.map((s) => s.key))
  const toCreate = SECTION_KEYS.filter((k) => !existingKeys.has(k))
  if (toCreate.length > 0) {
    await prisma.sectionSetting.createMany({
      data: toCreate.map((key) => ({ key, visible: true })),
      skipDuplicates: true,
    })
  }
}

router.get('/', async (_req, res, next) => {
  try {
    await ensureSeed()
    const settings = await prisma.sectionSetting.findMany()
    res.json({ success: true, data: settings })
  } catch (err) {
    next(err)
  }
})

const updateSchema = z.object({
  visible: z.boolean(),
})

router.put('/:key', requireAuth, validate(updateSchema), async (req, res, next) => {
  try {
    const key = req.params.key
    if (!SECTION_KEYS.includes(key as SectionKey)) {
      return res.status(400).json({ success: false, error: 'Unknown section key' })
    }
    const { visible } = req.body as { visible: boolean }
    const setting = await prisma.sectionSetting.upsert({
      where: { key },
      update: { visible },
      create: { key, visible },
    })
    res.json({ success: true, data: setting })
  } catch (err) {
    next(err)
  }
})

export default router

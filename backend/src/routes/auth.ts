import bcrypt from 'bcrypt'
import { Router } from 'express'
import jwt, { SignOptions } from 'jsonwebtoken'
import { prisma } from '../lib/db'
import { requireAuth } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { loginLimiter } from '../middleware/rateLimiters'
import { loginSchema } from '../validators'
import { AuthRequest } from '../types'

const router = Router()

router.post('/login', loginLimiter, validate(loginSchema), async (req, res) => {
  const { email, password } = req.body as { email: string; password: string }

  const admin = await prisma.admin.findUnique({ where: { email: email.toLowerCase() } })
  if (!admin) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' })
  }

  const valid = await bcrypt.compare(password, admin.passwordHash)
  if (!valid) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { role: 'admin', adminId: admin.id, email: admin.email },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' } as SignOptions
  )

  res.json({ success: true, data: { token } })
})

router.get('/verify', requireAuth, (req: AuthRequest, res) => {
  res.json({ success: true, data: { valid: true } })
})

export default router

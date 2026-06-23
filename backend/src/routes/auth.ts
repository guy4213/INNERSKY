import bcrypt from 'bcrypt'
import { Router } from 'express'
import jwt, { SignOptions } from 'jsonwebtoken'
import { requireAuth } from '../middleware/auth'
import { validate } from '../middleware/validate'
import { loginLimiter } from '../app'
import { loginSchema } from '../validators'
import { AuthRequest } from '../types'

const router = Router()

router.post('/login', loginLimiter, validate(loginSchema), async (req, res) => {
  const { email, password } = req.body as { email: string; password: string }

  if (email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' })
  }

  const valid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH as string)
  if (!valid) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { role: 'admin' },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRES_IN ?? '7d' } as SignOptions
  )

  res.json({ success: true, data: { token } })
})

router.get('/verify', requireAuth, (req: AuthRequest, res) => {
  res.json({ success: true, data: { valid: true } })
})

export default router

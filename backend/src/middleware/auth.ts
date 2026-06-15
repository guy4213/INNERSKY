import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { AuthRequest, JwtPayload } from '../types'

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  const token = header?.startsWith('Bearer ') ? header.slice(7) : undefined

  if (!token) {
    return res.status(401).json({ success: false, error: 'Missing authorization token' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload
    req.user = payload
    next()
  } catch {
    return res.status(401).json({ success: false, error: 'Invalid or expired token' })
  }
}

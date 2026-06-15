import { Request } from 'express'

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface JwtPayload {
  role: 'admin'
}

export interface AuthRequest extends Request {
  user?: JwtPayload
}

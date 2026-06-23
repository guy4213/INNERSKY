import rateLimit from 'express-rate-limit'

const tooManyRequestsResponse = { success: false, error: 'Too many requests' }

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: tooManyRequestsResponse,
  standardHeaders: true,
  legacyHeaders: false,
})

export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: tooManyRequestsResponse,
  standardHeaders: true,
  legacyHeaders: false,
})

export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: tooManyRequestsResponse,
  standardHeaders: true,
  legacyHeaders: false,
})

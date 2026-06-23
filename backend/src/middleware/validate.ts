import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))
      return res.status(400).json({ success: false, error: 'Validation error', details })
    }
    req.body = result.data
    next()
  }
}

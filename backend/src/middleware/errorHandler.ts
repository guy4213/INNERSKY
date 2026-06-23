import { NextFunction, Request, Response } from 'express'

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  console.error(err)

  if (err instanceof Error && err.message === 'Only image files are allowed') {
    return res.status(400).json({ success: false, error: err.message })
  }

  const isMulterSizeError = (err as { code?: string }).code === 'LIMIT_FILE_SIZE'
  if (isMulterSizeError) {
    return res.status(400).json({ success: false, error: 'File too large. Maximum size is 5MB.' })
  }

  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : err instanceof Error ? err.message : 'Internal server error'

  res.status(500).json({ success: false, error: message })
}

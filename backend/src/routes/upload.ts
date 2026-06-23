import { Router } from 'express'
import multer from 'multer'
import { requireAuth } from '../middleware/auth'
import cloudinary from '../lib/cloudinary'

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'))
    }
    cb(null, true)
  },
})

export function uploadImageBuffer(buffer: Buffer, folder: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error || !result) return reject(error)
        resolve(result.secure_url)
      }
    )
    stream.end(buffer)
  })
}

const router = Router()

router.post('/', requireAuth, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' })
    }
    const url = await uploadImageBuffer(req.file.buffer, 'innersky')
    res.json({ success: true, data: { url } })
  } catch (err) {
    next(err)
  }
})

export default router

import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import authRoutes from './routes/auth'
import productsRoutes from './routes/products'
import contactRoutes from './routes/contact'
import uploadRoutes from './routes/upload'
import adminRoutes from './routes/admin'
import { errorHandler } from './middleware/errorHandler'
import { prisma } from './lib/db'

const app = express()

app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))
app.use(express.json())

app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({ success: true, data: { status: 'ok', timestamp: new Date().toISOString() } })
  } catch {
    res.status(503).json({ success: false, error: 'Database unavailable' })
  }
})

app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/admin', adminRoutes)
app.use(errorHandler)

export default app

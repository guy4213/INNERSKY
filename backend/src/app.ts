import cors from 'cors'
import express from 'express'
import authRoutes from './routes/auth'
import productsRoutes from './routes/products'
import contactRoutes from './routes/contact'
import uploadRoutes from './routes/upload'
import adminRoutes from './routes/admin'
import { errorHandler } from './middleware/errorHandler'

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/admin', adminRoutes)
app.use(errorHandler)

export default app

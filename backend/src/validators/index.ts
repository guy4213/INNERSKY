import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  company: z.string().max(100).optional(),
  email: z.string().email(),
  phone: z.string().regex(/^[+\d\s\-().]{0,20}$/).optional().or(z.literal('')),
  message: z.string().min(10).max(2000),
})

export const productUpdateSchema = z.object({
  nameHe: z.string().max(200).optional(),
  nameEn: z.string().max(200).optional(),
  descriptionHe: z.string().max(2000).optional(),
  descriptionEn: z.string().max(2000).optional(),
})

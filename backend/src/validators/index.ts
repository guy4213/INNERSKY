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
  consent: z.literal(true),
  privacyPolicyVersion: z.string().max(50).optional(),
})

export const productUpdateSchema = z.object({
  nameHe: z.string().max(200).optional(),
  nameEn: z.string().max(200).optional(),
  descriptionHe: z.string().max(2000).optional(),
  descriptionEn: z.string().max(2000).optional(),
  visible: z.boolean().optional(),
})

export const articleUpdateSchema = z.object({
  titleHe: z.string().max(300).optional(),
  titleEn: z.string().max(300).optional(),
  contentHe: z.string().max(10000).optional(),
  contentEn: z.string().max(10000).optional(),
  visible: z.boolean().optional(),
})

export const submissionUpdateSchema = z.object({
  status: z.enum(['new', 'in_progress', 'handled', 'closed']).optional(),
  notes: z.string().max(2000).nullable().optional(),
})

export const serviceUpdateSchema = z.object({
  titleHe: z.string().max(200).optional(),
  titleEn: z.string().max(200).optional(),
  descHe: z.string().max(2000).optional(),
  descEn: z.string().max(2000).optional(),
  includesHe: z.string().max(1000).optional(),
  includesEn: z.string().max(1000).optional(),
  resultHe: z.string().max(500).optional(),
  resultEn: z.string().max(500).optional(),
  visible: z.boolean().optional(),
})

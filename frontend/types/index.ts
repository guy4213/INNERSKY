export interface Product {
  id: number
  nameHe: string
  nameEn: string
  descriptionHe: string
  descriptionEn: string
  imageUrl: string
  orderIndex: number
  updatedAt: string
}

export interface ContactSubmission {
  id: number
  name: string
  company: string | null
  email: string
  phone: string | null
  message: string
  createdAt: string
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export type Lang = 'he' | 'en'

export interface Article {
  id: number
  titleHe: string
  titleEn: string
  contentHe: string
  contentEn: string
  updatedAt: string
}

export interface Service {
  id: number
  icon: string
  color: string
  titleHe: string
  titleEn: string
  descHe: string
  descEn: string
  includesHe: string
  includesEn: string
  resultHe: string
  resultEn: string
  featured: boolean
  orderIndex: number
  updatedAt: string
}

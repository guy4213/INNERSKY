import { ApiResponse, Article, ContactSubmission, Product, Service } from '@/types'
import type { SectionSetting } from './sectionKeys'
import { getToken } from './auth'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
    },
  })
  return res.json()
}

function authHeaders(): HeadersInit {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export function login(email: string, password: string) {
  return request<{ token: string }>('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
}

export function verifyToken() {
  return request<{ valid: boolean }>('/api/auth/verify', {
    headers: authHeaders(),
  })
}

export function getProducts() {
  return request<Product[]>('/api/products', { headers: authHeaders() })
}

export function updateProduct(id: number, data: Partial<Product>) {
  return request<Product>(`/api/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
}

export function uploadProductImage(id: number, file: File) {
  const formData = new FormData()
  formData.append('image', file)

  return request<Product>(`/api/products/${id}/image`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  })
}

export function sendContactMessage(data: {
  name: string
  company?: string
  email: string
  phone?: string
  message: string
  consent: true
  privacyPolicyVersion: string
}) {
  return request<ContactSubmission>('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
}

export function clearProductImage(id: number) {
  return request<Product>(`/api/products/${id}/image`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
}

export function createProduct() {
  return request<Product>('/api/products', {
    method: 'POST',
    headers: authHeaders(),
  })
}

export function deleteProduct(id: number) {
  return request('/api/products/' + id, {
    method: 'DELETE',
    headers: authHeaders(),
  })
}

export function getSubmissions() {
  return request<ContactSubmission[]>('/api/admin/submissions', {
    headers: authHeaders(),
  })
}

export function updateSubmission(id: number, data: { status?: string; notes?: string | null }) {
  return request<ContactSubmission>(`/api/admin/submissions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
}

export async function downloadSubmissionsCsv() {
  const res = await fetch(`${API_URL}/api/admin/submissions/export.csv`, {
    headers: authHeaders(),
  })
  if (!res.ok) throw new Error('Export failed')
  const blob = await res.blob()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  const disposition = res.headers.get('Content-Disposition') ?? ''
  const match = disposition.match(/filename="?([^"]+)"?/)
  link.download = match?.[1] ?? `innersky-submissions-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export function getArticle() {
  return request<Article>('/api/article', { headers: authHeaders() })
}

export function updateArticle(id: number, data: Partial<Article>) {
  return request<Article>(`/api/article/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
}

export function getServices() {
  return request<Service[]>('/api/services', { headers: authHeaders() })
}

export function updateService(id: number, data: Partial<Service>) {
  return request<Service>(`/api/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  })
}

export function getSections() {
  return request<SectionSetting[]>('/api/sections')
}

export function updateSection(key: string, visible: boolean) {
  return request<SectionSetting>(`/api/sections/${key}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ visible }),
  })
}

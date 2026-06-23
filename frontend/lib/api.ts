import { ApiResponse, ContactSubmission, Product } from '@/types'
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
  return request<Product[]>('/api/products')
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

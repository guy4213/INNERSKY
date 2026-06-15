'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getProducts, getSubmissions, verifyToken } from '@/lib/api'
import { clearToken, getToken } from '@/lib/auth'
import ProductEditor from '@/components/admin/ProductEditor'
import GlassCard from '@/components/ui/GlassCard'
import { ContactSubmission, Product } from '@/types'

export default function AdminPage() {
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])

  useEffect(() => {
    const token = getToken()
    if (!token) {
      router.push('/admin/login')
      return
    }

    verifyToken().then((res) => {
      if (!res.success || !res.data?.valid) {
        clearToken()
        router.push('/admin/login')
        return
      }
      setChecked(true)
    })
  }, [router])

  useEffect(() => {
    if (!checked) return

    getProducts().then((res) => {
      if (res.success && res.data) setProducts(res.data)
    })

    getSubmissions().then((res) => {
      if (res.success && res.data) setSubmissions(res.data)
    })
  }, [checked])

  const handleLogout = () => {
    clearToken()
    router.push('/admin/login')
  }

  if (!checked) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-on-surface-variant">טוען...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen py-12 px-6 max-w-[1440px] mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="font-display-lg text-headline-md text-on-surface">ניהול InnerSky</h1>
        <button
          onClick={handleLogout}
          className="border border-outline/30 text-on-surface px-6 py-2 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:bg-surface-variant transition-all"
        >
          התנתק
        </button>
      </div>

      <h2 className="font-headline-md text-headline-md mb-6">מוצרים</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
        {products.map((product) => (
          <ProductEditor
            key={product.id}
            product={product}
            onUpdated={(updated) =>
              setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
            }
          />
        ))}
      </div>

      <h2 className="font-headline-md text-headline-md mb-6">פניות מטופס יצירת קשר</h2>
      <GlassCard className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-outline/20 font-label-sm text-label-sm uppercase text-on-surface-variant">
              <th className="py-3 px-2">שם</th>
              <th className="py-3 px-2">חברה</th>
              <th className="py-3 px-2">אימייל</th>
              <th className="py-3 px-2">טלפון</th>
              <th className="py-3 px-2">הודעה</th>
              <th className="py-3 px-2">תאריך</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission.id} className="border-b border-outline/10 font-body-md text-body-md text-on-surface-variant">
                <td className="py-3 px-2">{submission.name}</td>
                <td className="py-3 px-2">{submission.company ?? '-'}</td>
                <td className="py-3 px-2">{submission.email}</td>
                <td className="py-3 px-2">{submission.phone ?? '-'}</td>
                <td className="py-3 px-2 max-w-xs truncate">{submission.message}</td>
                <td className="py-3 px-2">{new Date(submission.createdAt).toLocaleDateString('he-IL')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {submissions.length === 0 && (
          <p className="text-on-surface-variant text-center py-6">אין פניות עדיין</p>
        )}
      </GlassCard>
    </main>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getProducts, getSubmissions, verifyToken, createProduct } from '@/lib/api'
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

  const handleAddProduct = async () => {
    const res = await createProduct()
    if (res.success && res.data) {
      setProducts((prev) => [...prev, res.data!])
    }
  }

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
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
        <div className="flex items-center gap-3">
          <a
            href="/"
            className="flex items-center gap-1.5 border border-outline/30 text-on-surface-variant px-4 py-2 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:bg-surface-variant transition-all"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>home</span>
            דף הבית
          </a>
          <button
            onClick={handleLogout}
            className="border border-outline/30 text-on-surface px-6 py-2 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:bg-surface-variant transition-all"
          >
            התנתק
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="font-headline-md text-headline-md">מוצרים</h2>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 bg-electric text-white px-5 py-2 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:scale-105 transition-all glow-purple"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
          הוסף מוצר
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-16">
        {products.map((product) => (
          <ProductEditor
            key={product.id}
            product={product}
            onUpdated={(updated) =>
              setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
            }
            onDeleted={handleDeleteProduct}
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

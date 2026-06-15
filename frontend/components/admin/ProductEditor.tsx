'use client'

import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import ImageUploader from './ImageUploader'
import { updateProduct } from '@/lib/api'
import { Product } from '@/types'

export default function ProductEditor({ product, onUpdated }: { product: Product; onUpdated: (p: Product) => void }) {
  const [form, setForm] = useState({
    nameHe: product.nameHe,
    nameEn: product.nameEn,
    descriptionHe: product.descriptionHe,
    descriptionEn: product.descriptionEn,
  })
  const [imageUrl, setImageUrl] = useState(product.imageUrl)
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const handleSave = async () => {
    setStatus('saving')
    try {
      const res = await updateProduct(product.id, form)
      if (res.success && res.data) {
        setStatus('success')
        onUpdated(res.data)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <GlassCard className="flex flex-col gap-4">
      <h3 className="font-headline-md text-headline-md">מוצר #{product.orderIndex}</h3>

      <ImageUploader
        productId={product.id}
        imageUrl={imageUrl}
        onUploaded={(url) => setImageUrl(url)}
      />

      <input
        value={form.nameHe}
        onChange={handleChange('nameHe')}
        placeholder="שם (עברית)"
        className="bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50"
      />
      <input
        value={form.nameEn}
        onChange={handleChange('nameEn')}
        placeholder="Name (English)"
        className="bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50"
      />
      <textarea
        value={form.descriptionHe}
        onChange={handleChange('descriptionHe')}
        placeholder="תיאור (עברית)"
        rows={3}
        className="bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 resize-none"
      />
      <textarea
        value={form.descriptionEn}
        onChange={handleChange('descriptionEn')}
        placeholder="Description (English)"
        rows={3}
        className="bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 resize-none"
      />

      <button
        onClick={handleSave}
        disabled={status === 'saving'}
        className="bg-electric text-white px-6 py-3 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:scale-105 transition-all glow-purple"
      >
        {status === 'saving' ? 'שומר...' : 'שמור'}
      </button>

      {status === 'success' && <p className="text-primary text-sm">נשמר בהצלחה!</p>}
      {status === 'error' && <p className="text-error text-sm">שגיאה בשמירה.</p>}
    </GlassCard>
  )
}

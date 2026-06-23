'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { uploadProductImage, clearProductImage } from '@/lib/api'

interface ImageUploaderProps {
  productId: number
  imageUrl: string
  onUploaded: (url: string) => void
}

export default function ImageUploader({ productId, imageUrl, onUploaded }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setError('הקובץ גדול מדי. מקסימום 5MB.')
      return
    }

    setUploading(true)
    setError('')

    try {
      const res = await uploadProductImage(productId, file)
      if (res.success && res.data) {
        onUploaded(res.data.imageUrl)
      } else {
        setError(res.error ?? 'העלאה נכשלה')
      }
    } catch {
      setError('העלאה נכשלה')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full h-40 rounded-lg bg-surface-variant overflow-hidden flex items-center justify-center group">
        {imageUrl ? (
          <>
            <Image src={imageUrl} alt="תמונת מוצר" fill className="object-cover" />
            <button
              type="button"
              onClick={async () => {
                const res = await clearProductImage(productId)
                if (res.success) onUploaded('')
              }}
              aria-label="מחק תמונה"
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="material-symbols-outlined text-white" style={{ fontSize: '32px' }}>delete</span>
            </button>
          </>
        ) : (
          <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '40px' }}>
            image
          </span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="העלאת תמונת מוצר"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        aria-label="בחר תמונה להעלאה"
        className="border border-outline/30 text-on-surface px-4 py-2 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:bg-surface-variant transition-all"
      >
        {uploading ? 'מעלה...' : 'העלה תמונה'}
      </button>
      <p className="text-on-surface-variant text-xs">תמונה בלבד · עד 5MB</p>

      {error && <p className="text-error text-sm" role="alert">{error}</p>}
    </div>
  )
}

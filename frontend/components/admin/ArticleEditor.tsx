'use client'

import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import VisibilityToggle from './VisibilityToggle'
import { updateArticle } from '@/lib/api'
import { Article } from '@/types'

const inputCls = 'bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 w-full'

export default function ArticleEditor({
  article,
  onUpdated,
}: {
  article: Article
  onUpdated: (a: Article) => void
}) {
  const [form, setForm] = useState({
    titleHe: article.titleHe,
    titleEn: article.titleEn,
    contentHe: article.contentHe,
    contentEn: article.contentEn,
    visible: article.visible,
  })
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const handleSave = async () => {
    setStatus('saving')
    try {
      const res = await updateArticle(article.id, form)
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
      <input value={form.titleHe} onChange={handleChange('titleHe')} placeholder="כותרת המאמר (עברית)" className={inputCls} />
      <input value={form.titleEn} onChange={handleChange('titleEn')} placeholder="Article title (English)" className={inputCls} />

      <textarea
        value={form.contentHe}
        onChange={handleChange('contentHe')}
        placeholder="תוכן המאמר (עברית)"
        rows={10}
        className={`${inputCls} resize-y`}
      />
      <textarea
        value={form.contentEn}
        onChange={handleChange('contentEn')}
        placeholder="Article content (English)"
        rows={10}
        className={`${inputCls} resize-y`}
      />

      <VisibilityToggle
        visible={form.visible}
        onChange={(next) => setForm((f) => ({ ...f, visible: next }))}
      />

      <button
        onClick={handleSave}
        disabled={status === 'saving'}
        className="bg-electric text-white px-6 py-3 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:scale-105 transition-all glow-purple"
      >
        {status === 'saving' ? 'שומר...' : 'שמור מאמר'}
      </button>

      {status === 'success' && <p className="text-primary text-sm">נשמר בהצלחה!</p>}
      {status === 'error' && <p className="text-error text-sm">שגיאה.</p>}
    </GlassCard>
  )
}

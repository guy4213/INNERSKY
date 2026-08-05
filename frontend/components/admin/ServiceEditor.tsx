'use client'

import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import VisibilityToggle from './VisibilityToggle'
import { updateService } from '@/lib/api'
import { Service } from '@/types'

const inputCls = 'bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 w-full'

export default function ServiceEditor({
  service,
  onUpdated,
}: {
  service: Service
  onUpdated: (s: Service) => void
}) {
  const [form, setForm] = useState({
    titleHe: service.titleHe,
    titleEn: service.titleEn,
    descHe: service.descHe,
    descEn: service.descEn,
    includesHe: service.includesHe,
    includesEn: service.includesEn,
    resultHe: service.resultHe,
    resultEn: service.resultEn,
    visible: service.visible,
  })
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const handleSave = async () => {
    setStatus('saving')
    try {
      const res = await updateService(service.id, form)
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
      <div className="flex items-center gap-2 mb-2">
        <span className={`material-symbols-outlined ${service.color}`} style={{ fontSize: '22px' }}>{service.icon}</span>
        <h3 className="font-headline-md text-headline-md">שירות #{service.orderIndex}</h3>
        {service.featured && (
          <span className="text-xs bg-electric text-white px-2 py-0.5 rounded-full font-bold uppercase">פופולרי</span>
        )}
      </div>

      <input value={form.titleHe} onChange={handleChange('titleHe')} placeholder="כותרת (עברית)" className={inputCls} />
      <input value={form.titleEn} onChange={handleChange('titleEn')} placeholder="Title (English)" className={inputCls} />

      <textarea value={form.descHe} onChange={handleChange('descHe')} placeholder="תיאור (עברית)" rows={2} className={`${inputCls} resize-none`} />
      <textarea value={form.descEn} onChange={handleChange('descEn')} placeholder="Description (English)" rows={2} className={`${inputCls} resize-none`} />

      <div>
        <p className="text-xs text-on-surface-variant mb-1">כולל (עברית) — מופרד בפסיקים</p>
        <textarea value={form.includesHe} onChange={handleChange('includesHe')} rows={2} className={`${inputCls} resize-none`} />
      </div>
      <div>
        <p className="text-xs text-on-surface-variant mb-1">Includes (English) — comma separated</p>
        <textarea value={form.includesEn} onChange={handleChange('includesEn')} rows={2} className={`${inputCls} resize-none`} />
      </div>

      <input value={form.resultHe} onChange={handleChange('resultHe')} placeholder="תוצר (עברית)" className={inputCls} />
      <input value={form.resultEn} onChange={handleChange('resultEn')} placeholder="Result (English)" className={inputCls} />

      <VisibilityToggle
        visible={form.visible}
        onChange={(next) => setForm((f) => ({ ...f, visible: next }))}
      />

      <button
        onClick={handleSave}
        disabled={status === 'saving'}
        className="bg-electric text-white px-6 py-3 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-widest hover:scale-105 transition-all glow-purple"
      >
        {status === 'saving' ? 'שומר...' : 'שמור'}
      </button>

      {status === 'success' && <p className="text-primary text-sm">נשמר בהצלחה!</p>}
      {status === 'error' && <p className="text-error text-sm">שגיאה.</p>}
    </GlassCard>
  )
}

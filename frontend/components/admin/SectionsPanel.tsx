'use client'

import { useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import VisibilityToggle from './VisibilityToggle'
import { useSections } from '@/context/SectionsContext'
import { SECTION_KEYS, SECTION_LABELS, SectionKey } from '@/lib/sectionKeys'

export default function SectionsPanel() {
  const { visibility, setVisibility } = useSections()
  const [saving, setSaving] = useState<SectionKey | null>(null)
  const [error, setError] = useState('')

  const handleToggle = async (key: SectionKey, next: boolean) => {
    setSaving(key)
    setError('')
    const ok = await setVisibility(key, next)
    setSaving(null)
    if (!ok) {
      setError(`שגיאה בעדכון ${SECTION_LABELS[key].he}`)
    }
  }

  return (
    <GlassCard className="flex flex-col gap-3">
      <p className="text-body-md text-on-surface-variant">
        כבו סקשן כדי להסתיר אותו מעמוד הבית ואת הקישור אליו בנווט ובפוטר. השינוי נשמר אוטומטית.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {SECTION_KEYS.map((key) => (
          <VisibilityToggle
            key={key}
            visible={visibility[key]}
            onChange={(next) => handleToggle(key, next)}
            label={`${SECTION_LABELS[key].he}${saving === key ? ' — שומר...' : ''}`}
          />
        ))}
      </div>
      {error && <p className="text-error text-sm">{error}</p>}
    </GlassCard>
  )
}

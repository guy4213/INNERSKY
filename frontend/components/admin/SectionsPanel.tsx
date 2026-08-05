'use client'

import { useEffect, useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import VisibilityToggle from './VisibilityToggle'
import { getSections, updateSection } from '@/lib/api'
import { SECTION_KEYS, SECTION_LABELS, SectionKey, SectionSetting } from '@/lib/sectionKeys'

export default function SectionsPanel() {
  const [state, setState] = useState<Record<SectionKey, boolean>>(() => {
    const init = {} as Record<SectionKey, boolean>
    for (const k of SECTION_KEYS) init[k] = true
    return init
  })
  const [loaded, setLoaded] = useState(false)
  const [saving, setSaving] = useState<SectionKey | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    getSections().then((res) => {
      if (res.success && res.data) {
        setState((prev) => {
          const next = { ...prev }
          for (const s of res.data as SectionSetting[]) {
            if ((SECTION_KEYS as readonly string[]).includes(s.key)) {
              next[s.key] = s.visible
            }
          }
          return next
        })
      }
      setLoaded(true)
    })
  }, [])

  const handleToggle = async (key: SectionKey, next: boolean) => {
    const previous = state[key]
    setState((s) => ({ ...s, [key]: next }))
    setSaving(key)
    setError('')
    try {
      const res = await updateSection(key, next)
      if (!res.success) {
        setState((s) => ({ ...s, [key]: previous }))
        setError(`שגיאה בעדכון ${SECTION_LABELS[key].he}`)
      }
    } catch {
      setState((s) => ({ ...s, [key]: previous }))
      setError(`שגיאה בעדכון ${SECTION_LABELS[key].he}`)
    } finally {
      setSaving(null)
    }
  }

  return (
    <GlassCard className="flex flex-col gap-3">
      <p className="text-body-md text-on-surface-variant">
        כבו סקציה כדי להסתירה מעמוד הבית. משתמשים אנונימיים לא יראו אותה. השינוי נשמר אוטומטית.
      </p>
      {!loaded && <p className="text-on-surface-variant">טוען...</p>}
      {loaded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SECTION_KEYS.map((key) => (
            <VisibilityToggle
              key={key}
              visible={state[key]}
              onChange={(next) => handleToggle(key, next)}
              label={`${SECTION_LABELS[key].he}${saving === key ? ' — שומר...' : ''}`}
            />
          ))}
        </div>
      )}
      {error && <p className="text-error text-sm">{error}</p>}
    </GlassCard>
  )
}

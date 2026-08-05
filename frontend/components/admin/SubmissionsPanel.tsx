'use client'

import { Fragment, useMemo, useState } from 'react'
import GlassCard from '@/components/ui/GlassCard'
import { updateSubmission, downloadSubmissionsCsv } from '@/lib/api'
import { ContactSubmission, SubmissionStatus } from '@/types'

const STATUS_LABELS: Record<SubmissionStatus, string> = {
  new: 'חדשה',
  in_progress: 'בטיפול',
  handled: 'טופלה',
  closed: 'נסגרה',
}

const STATUS_ORDER: SubmissionStatus[] = ['new', 'in_progress', 'handled', 'closed']

const STATUS_STYLE: Record<SubmissionStatus, string> = {
  new: 'bg-electric/20 text-electric border-electric/40',
  in_progress: 'bg-yellow-500/15 text-yellow-300 border-yellow-500/40',
  handled: 'bg-primary/20 text-primary border-primary/40',
  closed: 'bg-outline/20 text-on-surface-variant border-outline/40',
}

type Filter = 'all' | SubmissionStatus

export default function SubmissionsPanel({
  initial,
  onChange,
}: {
  initial: ContactSubmission[]
  onChange: (next: ContactSubmission[]) => void
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [busy, setBusy] = useState<number | null>(null)
  const [exporting, setExporting] = useState(false)
  const [exportError, setExportError] = useState('')

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: initial.length, new: 0, in_progress: 0, handled: 0, closed: 0 }
    for (const s of initial) c[s.status] = (c[s.status] ?? 0) + 1
    return c
  }, [initial])

  const visible = filter === 'all' ? initial : initial.filter((s) => s.status === filter)

  const updateOne = (updated: ContactSubmission) => {
    onChange(initial.map((s) => (s.id === updated.id ? updated : s)))
  }

  const handleStatus = async (id: number, status: SubmissionStatus) => {
    setBusy(id)
    const res = await updateSubmission(id, { status })
    setBusy(null)
    if (res.success && res.data) updateOne(res.data)
  }

  const handleNotesBlur = async (id: number, notes: string) => {
    const current = initial.find((s) => s.id === id)
    if (!current || current.notes === notes) return
    setBusy(id)
    const res = await updateSubmission(id, { notes: notes || null })
    setBusy(null)
    if (res.success && res.data) updateOne(res.data)
  }

  const handleExport = async () => {
    setExporting(true)
    setExportError('')
    try {
      await downloadSubmissionsCsv()
    } catch {
      setExportError('שגיאה בהורדה')
    } finally {
      setExporting(false)
    }
  }

  const buildMailto = (s: ContactSubmission) => {
    const subject = encodeURIComponent(`מענה לפנייתך ל-INNERSKY`)
    const body = encodeURIComponent(
      `שלום ${s.name},\n\nתודה על פנייתך.\n\n---\nהפנייה המקורית:\n${s.message}`
    )
    return `mailto:${s.email}?subject=${subject}&body=${body}`
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        {(['all', ...STATUS_ORDER] as Filter[]).map((k) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`px-4 py-1.5 rounded-full text-label-sm font-bold uppercase tracking-widest border transition-all ${
              filter === k
                ? 'bg-primary/20 text-primary border-primary/40'
                : 'text-on-surface-variant border-outline/30 hover:bg-surface-variant'
            }`}
          >
            {k === 'all' ? 'הכל' : STATUS_LABELS[k]} <span className="opacity-70">({counts[k] ?? 0})</span>
          </button>
        ))}
        <div className="flex-1" />
        <button
          onClick={handleExport}
          disabled={exporting || initial.length === 0}
          className="flex items-center gap-2 border border-outline/30 text-on-surface-variant px-4 py-1.5 rounded-full text-label-sm font-bold uppercase tracking-widest hover:bg-surface-variant transition-all disabled:opacity-50"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
          {exporting ? 'מוריד...' : 'ייצוא CSV'}
        </button>
      </div>
      {exportError && <p className="text-error text-sm">{exportError}</p>}

      <GlassCard className="overflow-x-auto p-0">
        <table className="w-full text-right">
          <thead>
            <tr className="border-b border-outline/20 font-label-sm text-label-sm uppercase text-on-surface-variant">
              <th className="py-3 px-4">סטטוס</th>
              <th className="py-3 px-4">שם</th>
              <th className="py-3 px-4">חברה</th>
              <th className="py-3 px-4">אימייל</th>
              <th className="py-3 px-4">טלפון</th>
              <th className="py-3 px-4">תאריך</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((s) => {
              const expanded = expandedId === s.id
              return (
                <Fragment key={s.id}>
                  <tr
                    className="border-b border-outline/10 font-body-md text-body-md text-on-surface-variant cursor-pointer hover:bg-surface-variant/30 transition-colors"
                    onClick={() => setExpandedId(expanded ? null : s.id)}
                  >
                    <td className="py-3 px-4">
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${STATUS_STYLE[s.status]}`}>
                        {STATUS_LABELS[s.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-on-surface">{s.name}</td>
                    <td className="py-3 px-4">{s.company ?? '-'}</td>
                    <td className="py-3 px-4">{s.email}</td>
                    <td className="py-3 px-4">{s.phone ?? '-'}</td>
                    <td className="py-3 px-4">{new Date(s.createdAt).toLocaleDateString('he-IL')}</td>
                    <td className="py-3 px-4">
                      <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '18px' }}>
                        {expanded ? 'expand_less' : 'expand_more'}
                      </span>
                    </td>
                  </tr>
                  {expanded && (
                    <tr className="border-b border-outline/10 bg-surface-container/40">
                      <td colSpan={7} className="py-4 px-6">
                        <div className="flex flex-col gap-3">
                          <div>
                            <p className="text-xs text-on-surface-variant mb-1">הודעה</p>
                            <p className="text-on-surface whitespace-pre-wrap">{s.message}</p>
                          </div>
                          <div>
                            <p className="text-xs text-on-surface-variant mb-1">הערות פנימיות</p>
                            <textarea
                              defaultValue={s.notes ?? ''}
                              onBlur={(e) => handleNotesBlur(s.id, e.target.value)}
                              placeholder="הוסיפו הערות פנימיות (נשמר אוטומטית ביציאה מהשדה)"
                              rows={2}
                              className="w-full bg-surface-container border border-outline/20 rounded-lg px-3 py-2 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 resize-none"
                            />
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-on-surface-variant">שנה סטטוס:</span>
                            {STATUS_ORDER.map((st) => (
                              <button
                                key={st}
                                onClick={() => handleStatus(s.id, st)}
                                disabled={busy === s.id || s.status === st}
                                className={`text-xs px-3 py-1 rounded-full border transition-all ${
                                  s.status === st
                                    ? `${STATUS_STYLE[st]} cursor-default`
                                    : 'border-outline/30 text-on-surface-variant hover:bg-surface-variant'
                                }`}
                              >
                                {STATUS_LABELS[st]}
                              </button>
                            ))}
                            <div className="flex-1" />
                            <a
                              href={buildMailto(s)}
                              className="inline-flex items-center gap-1.5 bg-electric text-white px-4 py-1.5 rounded-full text-label-sm font-bold uppercase tracking-widest hover:scale-105 transition-all glow-purple"
                            >
                              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>reply</span>
                              השב לפונה
                            </a>
                          </div>
                          {s.consentGivenAt && (
                            <p className="text-xs text-on-surface-variant">
                              הסכמה: {new Date(s.consentGivenAt).toLocaleString('he-IL')}
                              {s.privacyPolicyVersion && ` · גרסת מדיניות: ${s.privacyPolicyVersion}`}
                            </p>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </tbody>
        </table>
        {visible.length === 0 && (
          <p className="text-on-surface-variant text-center py-8">אין פניות בסטטוס זה</p>
        )}
      </GlassCard>
    </div>
  )
}

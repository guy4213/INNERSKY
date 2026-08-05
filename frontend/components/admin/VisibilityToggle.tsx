'use client'

type Props = {
  visible: boolean
  onChange: (next: boolean) => void
  label?: string
}

export default function VisibilityToggle({ visible, onChange, label }: Props) {
  return (
    <label className="flex items-center justify-between gap-3 bg-surface-container/60 border border-outline/20 rounded-lg px-4 py-3 cursor-pointer">
      <span className="flex items-center gap-2 text-body-md text-on-surface">
        <span
          className={`material-symbols-outlined ${visible ? 'text-primary' : 'text-on-surface-variant'}`}
          style={{ fontSize: '20px' }}
        >
          {visible ? 'visibility' : 'visibility_off'}
        </span>
        {label ?? (visible ? 'מוצג באתר' : 'מוסתר מהאתר')}
      </span>
      <span className="relative inline-flex items-center">
        <input
          type="checkbox"
          checked={visible}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <span className="w-11 h-6 bg-outline/30 rounded-full peer-checked:bg-primary transition-colors" />
        <span
          className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5"
        />
      </span>
    </label>
  )
}

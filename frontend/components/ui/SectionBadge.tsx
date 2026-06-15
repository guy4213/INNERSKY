import { ReactNode } from 'react'

export default function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
      <span className="w-2 h-2 rounded-full bg-electric animate-pulse"></span>
      <span className="font-label-sm text-label-sm text-primary uppercase">{children}</span>
    </div>
  )
}

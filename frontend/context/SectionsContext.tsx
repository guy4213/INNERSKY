'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { SECTION_KEYS, SectionKey, toVisibilityMap, SectionSetting } from '@/lib/sectionKeys'
import { updateSection } from '@/lib/api'

type SectionsContextValue = {
  visibility: Record<SectionKey, boolean>
  setVisibility: (key: SectionKey, next: boolean) => Promise<boolean>
}

const SectionsContext = createContext<SectionsContextValue | undefined>(undefined)

export function SectionsProvider({
  initialSections,
  children,
}: {
  initialSections: SectionSetting[] | null
  children: ReactNode
}) {
  const [visibility, setVisibilityState] = useState<Record<SectionKey, boolean>>(() =>
    toVisibilityMap(initialSections)
  )

  const setVisibility = async (key: SectionKey, next: boolean) => {
    if (!(SECTION_KEYS as readonly string[]).includes(key)) return false
    const previous = visibility[key]
    setVisibilityState((v) => ({ ...v, [key]: next }))
    try {
      const res = await updateSection(key, next)
      if (!res.success) {
        setVisibilityState((v) => ({ ...v, [key]: previous }))
        return false
      }
      return true
    } catch {
      setVisibilityState((v) => ({ ...v, [key]: previous }))
      return false
    }
  }

  return (
    <SectionsContext.Provider value={{ visibility, setVisibility }}>
      {children}
    </SectionsContext.Provider>
  )
}

export function useSections() {
  const ctx = useContext(SectionsContext)
  if (!ctx) throw new Error('useSections must be used within a SectionsProvider')
  return ctx
}

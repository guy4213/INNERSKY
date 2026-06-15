'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Lang } from '@/types'

interface LanguageContextValue {
  lang: Lang
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('he')

  useEffect(() => {
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }, [lang])

  const toggle = () => {
    setLang((current) => (current === 'he' ? 'en' : 'he'))
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

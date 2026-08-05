export const SECTION_KEYS = [
  'hero',
  'about',
  'challenge',
  'savings-strip',
  'services',
  'values',
  'case-study',
  'why-us',
  'products',
  'article',
  'contact',
] as const

export type SectionKey = (typeof SECTION_KEYS)[number]

export const SECTION_LABELS: Record<SectionKey, { he: string; en: string }> = {
  hero: { he: 'מסך פתיחה', en: 'Hero' },
  about: { he: 'מי אנחנו', en: 'About' },
  challenge: { he: 'אתגרים', en: 'Challenges' },
  'savings-strip': { he: 'פס מסר חיסכון', en: 'Savings message strip' },
  services: { he: 'שירותים', en: 'Services' },
  values: { he: 'ערכים', en: 'Values' },
  'case-study': { he: 'מקרה בוחן', en: 'Case Study' },
  'why-us': { he: 'למה InnerSky', en: 'Why InnerSky' },
  products: { he: 'מוצרים', en: 'Products' },
  article: { he: 'מאמר', en: 'Article' },
  contact: { he: 'צור קשר', en: 'Contact' },
}

export type SectionSetting = {
  id: number
  key: SectionKey
  visible: boolean
  updatedAt: string
}

export function toVisibilityMap(settings: SectionSetting[] | null | undefined): Record<SectionKey, boolean> {
  const map = {} as Record<SectionKey, boolean>
  for (const k of SECTION_KEYS) map[k] = true
  if (!settings) return map
  for (const s of settings) {
    if ((SECTION_KEYS as readonly string[]).includes(s.key)) {
      map[s.key] = s.visible
    }
  }
  return map
}

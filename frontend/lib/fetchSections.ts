import { SectionSetting } from './sectionKeys'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

export async function fetchSections(): Promise<SectionSetting[] | null> {
  if (!API_URL) return null
  try {
    const res = await fetch(`${API_URL}/api/sections`, { cache: 'no-store' })
    if (!res.ok) return null
    const json = await res.json()
    return json.success && json.data ? json.data : null
  } catch {
    return null
  }
}

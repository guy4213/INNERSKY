import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'מדיניות פרטיות | InnerSky',
  description:
    'מדיניות הפרטיות של InnerSky — איזה מידע נאסף באתר, כיצד נעשה בו שימוש, וכיצד ניתן ליצור קשר בנושא.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'מדיניות פרטיות | InnerSky',
    description: 'מדיניות הפרטיות של InnerSky.',
    url: '/privacy',
    type: 'website',
    locale: 'he_IL',
    siteName: 'InnerSky',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}

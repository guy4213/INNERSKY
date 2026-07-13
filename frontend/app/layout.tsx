import type { Metadata } from 'next'
import { LanguageProvider } from '@/context/LanguageContext'
import MeshBackground from '@/components/ui/MeshBackground'
import ErrorBoundary from '@/components/ErrorBoundary'
import './globals.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.innersky.co.il'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'InnerSky | ניהול נסיעות עסקיות וייעוץ אסטרטגי לארגונים',
  description:
    'InnerSky מלווה ארגונים בבניית מערך נסיעות עסקיות — ייעוץ, הטמעת מערכות (SAP Concur, Navan, TravelPerk, Mesh), חיסכון בעלויות ובקרה תפעולית. מעל 20 שנות ניסיון.',
  keywords: [
    'ניהול נסיעות עסקיות',
    'נסיעות עסקיות',
    'תפעול נסיעות',
    'SAP Concur',
    'Navan',
    'TravelPerk',
    'Mesh Payments',
    'חיסכון בהוצאות נסיעה',
    'מדיניות נסיעות',
    'InnerSky',
  ],
  authors: [{ name: 'עדי פרהודי מרגוליס' }],
  alternates: { canonical: siteUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'InnerSky | ניהול נסיעות עסקיות וייעוץ אסטרטגי לארגונים',
    description:
      'InnerSky מסייעת לארגונים לבנות, לנהל ולשפר את מערך הנסיעות העסקיות שלהם — תהליכים, מדיניות, טכנולוגיה ובקרה.',
    type: 'website',
    locale: 'he_IL',
    siteName: 'InnerSky',
    url: siteUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'InnerSky – ניהול נסיעות עסקיות' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InnerSky | ניהול נסיעות עסקיות',
    description: 'InnerSky מסייעת לארגונים לבנות, לנהל ולשפר את מערך הנסיעות העסקיות שלהם.',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'InnerSky',
  alternateName: 'אינרסקיי',
  description: 'ניהול, תפעול וייעוץ אסטרטגי לנסיעות עסקיות בארגונים',
  url: siteUrl,
  telephone: '+972-54-522-4011',
  email: 'adi.frahoudi@innersky.co.il',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'נתניה',
    addressRegion: 'רמת פולג',
    addressCountry: 'IL',
  },
  founder: { '@type': 'Person', name: 'עדי פרהודי מרגוליס' },
  sameAs: ['https://www.linkedin.com/company/innersky-travel-managment/'],
  areaServed: { '@type': 'Country', name: 'Israel' },
  knowsAbout: [
    'ניהול נסיעות עסקיות',
    'הטמעת מערכות נסיעות',
    'SAP Concur',
    'Navan',
    'TravelPerk',
    'Mesh Payments',
    'ComBtas',
    'מדיניות נסיעות ארגונית',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-gradient-main font-rubik">
        <LanguageProvider>
          <MeshBackground />
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </LanguageProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { LanguageProvider } from '@/context/LanguageContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'InnerSky | Corporate Travel Operations',
  description: 'INNERSKY helps organizations build, manage and optimize their corporate travel operations.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&family=Montserrat:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gradient-main font-rubik">
        <LanguageProvider>
          <div className="mesh-bg"></div>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}

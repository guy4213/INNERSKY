'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import { privacyContent, privacyContactEmail } from '@/lib/privacyContent'
import Navbar from '@/components/sections/Navbar'
import Footer from '@/components/sections/Footer'

export default function PrivacyPage() {
  const { lang } = useLanguage()
  const content = lang === 'he' ? privacyContent.he : privacyContent.en

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-section-gap">
        <article className="max-w-3xl mx-auto px-6 md:px-10">
          <p className="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-2">
            {content.lastUpdated}
          </p>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-8 leading-[1.1] tracking-tight">
            {content.pageTitle}
          </h1>

          <p className="font-body-lg text-body-md text-on-surface-variant mb-12">
            {content.intro}
          </p>

          <div className="flex flex-col gap-10">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                  {section.title}
                </h2>
                {section.paragraphs?.map((p, i) => (
                  <p
                    key={i}
                    className="font-body-md text-body-md text-on-surface-variant mb-3"
                  >
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="flex flex-col gap-2 mt-2">
                    {section.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 font-body-md text-body-md text-on-surface-variant"
                      >
                        <span
                          className="material-symbols-outlined text-primary text-sm mt-1"
                          style={{ fontSize: '18px' }}
                        >
                          check
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <section className="border-t border-white/10 pt-8">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
                {content.contactHeading}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-3">
                {content.contactBody}
              </p>
              {privacyContactEmail && (
                <p className="font-body-md text-body-md">
                  <a
                    href={`mailto:${privacyContactEmail}`}
                    className="text-primary hover:underline"
                  >
                    {privacyContactEmail}
                  </a>
                </p>
              )}
              <p className="font-body-md text-body-md mt-4">
                <Link href="/#contact" className="text-primary hover:underline">
                  {lang === 'he' ? 'מעבר לטופס יצירת קשר' : 'Go to contact form'}
                </Link>
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}

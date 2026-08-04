'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'
import { sendContactMessage } from '@/lib/api'
import { PRIVACY_POLICY_VERSION } from '@/lib/privacyContent'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { lang } = useLanguage()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  })

  const handleChange = (field: 'name' | 'company' | 'email' | 'phone' | 'message') =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }))
    }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!form.consent) return
    setStatus('loading')

    try {
      const res = await sendContactMessage({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        message: form.message,
        consent: true,
        privacyPolicyVersion: PRIVACY_POLICY_VERSION,
      })
      if (res.success) {
        setStatus('success')
        setForm({ name: '', company: '', email: '', phone: '', message: '', consent: false })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5">
            <h2 className="font-display-lg text-headline-md text-on-surface mb-6">
              {lang === 'he'
                ? 'אם אתם רוצים להבין היכן תקציב הנסיעות שלכם מנוהל היטב, היכן הוא זולג ואיפה נמצאות הזדמנויות החיסכון, נשמח להכיר.'
                : 'If you want to understand where your travel budget is well managed, where value is leaking and where the cost-saving opportunities are, we would be happy to talk.'}
            </h2>
          </div>

          <div className="lg:col-span-7">
            <GlassCard>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  required
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder={lang === 'he' ? 'שם*' : 'Name*'}
                  aria-label={lang === 'he' ? 'שם' : 'Name'}
                  className="bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50"
                />
                <input
                  value={form.company}
                  onChange={handleChange('company')}
                  placeholder={lang === 'he' ? 'חברה' : 'Company'}
                  aria-label={lang === 'he' ? 'חברה' : 'Company'}
                  className="bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder={lang === 'he' ? 'אימייל*' : 'Email*'}
                  aria-label={lang === 'he' ? 'אימייל' : 'Email'}
                  className="bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50"
                />
                <input
                  value={form.phone}
                  onChange={handleChange('phone')}
                  placeholder={lang === 'he' ? 'טלפון' : 'Phone'}
                  aria-label={lang === 'he' ? 'טלפון' : 'Phone'}
                  className="bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50"
                />
                <textarea
                  required
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder={lang === 'he' ? 'הודעה*' : 'Message*'}
                  aria-label={lang === 'he' ? 'הודעה' : 'Message'}
                  rows={4}
                  className="bg-surface-container border border-outline/20 rounded-lg px-4 py-3 text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-primary/50 resize-none"
                />

                <label className="flex items-start gap-3 text-body-sm text-on-surface-variant cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={form.consent}
                    onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))}
                    className="mt-1 h-4 w-4 flex-shrink-0 accent-primary cursor-pointer"
                    aria-label={lang === 'he' ? 'אישור מדיניות פרטיות' : 'Privacy policy consent'}
                  />
                  <span>
                    {lang === 'he' ? (
                      <>
                        אני מאשר/ת שקראתי והסכמתי ל
                        <Link
                          href="/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline hover:no-underline"
                        >
                          מדיניות הפרטיות
                        </Link>
                      </>
                    ) : (
                      <>
                        I confirm that I have read and agreed to the{' '}
                        <Link
                          href="/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline hover:no-underline"
                        >
                          Privacy Policy
                        </Link>
                      </>
                    )}
                  </span>
                </label>

                <Button type="submit" variant="primary" disabled={status === 'loading' || !form.consent}>
                  {status === 'loading'
                    ? lang === 'he' ? 'שולח...' : 'Sending...'
                    : lang === 'he' ? 'שליחת הפנייה' : 'Send Message'}
                </Button>

                <div aria-live="polite" aria-atomic="true">
                  {status === 'success' && (
                    <p className="text-primary font-body-md text-body-md">
                      {lang === 'he' ? 'תודה, פנייתך התקבלה. נחזור אליך בהקדם.' : 'Thank you, your message has been received. We will get back to you shortly.'}
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-error font-body-md text-body-md">
                      {lang === 'he'
                        ? 'לא הצלחנו לשלוח את הפנייה. אנא נסו שוב מאוחר יותר או פנו אלינו באמצעות פרטי הקשר המופיעים באתר.'
                        : 'We could not send your message. Please try again later or contact us using the details on the site.'}
                    </p>
                  )}
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  )
}

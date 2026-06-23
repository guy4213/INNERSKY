'use client'

import { FormEvent, useState } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'
import Button from '@/components/ui/Button'
import { sendContactMessage } from '@/lib/api'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { lang } = useLanguage()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', message: '' })

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await sendContactMessage(form)
      if (res.success) {
        setStatus('success')
        setForm({ name: '', company: '', email: '', phone: '', message: '' })
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
                ? 'אם אתם מחפשים דרך לנהל את הנסיעות העסקיות שלכם בצורה מסודרת, מבוקרת ויעילה יותר — נשמח להכיר.'
                : "If you're looking for a way to manage your corporate travel in a more structured and efficient way — let's talk."}
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

                <Button type="submit" variant="primary" disabled={status === 'loading'}>
                  {status === 'loading'
                    ? lang === 'he' ? 'שולח...' : 'Sending...'
                    : lang === 'he' ? 'שלח הודעה' : 'Send Message'}
                </Button>

                <div aria-live="polite" aria-atomic="true">
                  {status === 'success' && (
                    <p className="text-primary font-body-md text-body-md">
                      {lang === 'he' ? 'ההודעה נשלחה בהצלחה!' : 'Message sent successfully!'}
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="text-error font-body-md text-body-md">
                      {lang === 'he' ? 'אירעה שגיאה. נסו שוב.' : 'Something went wrong. Please try again.'}
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

'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import SectionBadge from '@/components/ui/SectionBadge'
import Button from '@/components/ui/Button'

const floatingIcons = ['flight', 'policy', 'bar_chart', 'handshake']

export default function Hero() {
  const { lang } = useLanguage()

  return (
    <section className="relative pt-32 pb-section-gap overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        <div className="lg:col-span-6 z-10">
          <SectionBadge>
            {lang === 'he' ? 'מנוע נסיעות עסקיות מהדור הבא' : 'Next-Gen Travel Operations'}
          </SectionBadge>

          {lang === 'he' ? (
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-[1.1] tracking-tight">
              נסיעות עסקיות אינן רק שירות מקצועי. <br />
              <span className="text-primary italic glow-text-primary"> הן פונקציה ניהולית.</span>
            </h1>
          ) : (
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-[1.1] tracking-tight">
              Corporate travel is not just a travel service. <br />
              <span className="text-primary italic glow-text-primary">It is a management function.</span>
            </h1>
          )}

          {lang === 'he' ? (
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
              כאשר ארגון צומח, ניהול הנסיעות הופך למורכב יותר. אישורים, תקציבים, ספקים, מדיניות, מערכות
              וחוויית העובד הופכים לחלק בלתי נפרד מהפעילות העסקית. INNERSKY מסייעת לחברות לבנות, לנהל
              ולשפר את מערך הנסיעות העסקיות שלהן באמצעות תהליכים, מדיניות, טכנולוגיה ובקרה.
            </p>
          ) : (
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
              As organizations grow, travel becomes increasingly complex. Approvals, budgets, suppliers,
              policies, systems and traveler experience all become critical components of business
              operations. INNERSKY helps organizations build, manage and optimize their corporate travel
              operations through governance, technology and operational excellence.
            </p>
          )}

          <div className="flex flex-wrap gap-4">
            <a href="#contact">
              <Button variant="primary">{lang === 'he' ? 'קבעו שיחת היכרות' : "Let's Talk"}</Button>
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 relative flex justify-center items-center mt-16 lg:mt-0">
          <div className="w-full aspect-square max-w-[600px] animate-float">
            <div className="absolute inset-0 bg-gradient-to-tr from-electric/25 to-transparent rounded-full blur-[100px]"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-[80%] h-[80%] border border-primary/25 rounded-full animate-[spin_30s_linear_infinite]"></div>
              <div className="absolute w-[95%] h-[95%] border border-electric/20 rounded-full animate-[spin_45s_linear_infinite_reverse]"></div>
              <div className="relative w-[70%] h-[70%]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbyTCjYK0yzxEoQKxqq9ZyNmajphLVm2TMqwbZLg4hzh2yLT-qClaODJSMH3zHlDuashqN-BH5_BPG5SKg_FvnYeUSQCj04ELe8Umvg8W4IBP1qGZW0Qm3iwRNcp9oBKt35aFqt6QrUfYDYPNZmgNgVYvisHNaauKCAf0AvjPIgnGsGyrY8QfIZ8NB3IOS-vMF5wC36DQFnzB_JTkmMnch06wuL7N1tb5voI7BEkvpvFY_rx5pvE2b24h7p6cSeWG1xbq1l-V9lmz1"
                  alt="Global Network Visualization"
                  fill
                  priority
                  className="object-cover rounded-full opacity-70 mix-blend-screen"
                />
              </div>

              {floatingIcons.map((icon, i) => (
                <span
                  key={icon}
                  className="material-symbols-outlined absolute text-electric glass-card rounded-full p-3"
                  style={{
                    top: `${[10, 50, 75, 25][i]}%`,
                    left: `${[15, 0, 65, 80][i]}%`,
                    fontSize: '28px',
                  }}
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

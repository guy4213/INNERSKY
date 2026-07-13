'use client'

import Image from 'next/image'
import { useLanguage } from '@/context/LanguageContext'
import GlassCard from '@/components/ui/GlassCard'
import { Product } from '@/types'

export default function Products({ initialProducts }: { initialProducts: Product[] }) {
  const { lang } = useLanguage()
  const products = initialProducts

  if (products.length === 0) return null

  return (
    <section id="products" className="py-section-gap">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <h2 className="font-display-lg text-headline-md text-on-surface mb-4">
            {lang === 'he' ? 'מוצרים' : 'Products'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {products.map((product) => {
            const name = lang === 'he' ? product.nameHe : product.nameEn
            const description = lang === 'he' ? product.descriptionHe : product.descriptionEn
            const fallback = lang === 'he' ? 'תוכן בקרוב' : 'Coming soon'

            return (
              <GlassCard key={product.id}>
                <div className="relative w-full h-48 rounded-lg bg-surface-variant mb-6 overflow-hidden flex items-center justify-center">
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
                      alt={name || (lang === 'he' ? 'מוצר InnerSky' : 'InnerSky product')}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="material-symbols-outlined text-on-surface-variant" style={{ fontSize: '48px' }}>
                      image
                    </span>
                  )}
                </div>
                <h3 className="font-headline-md text-headline-md mb-2">{name || fallback}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {description || fallback}
                </p>
              </GlassCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

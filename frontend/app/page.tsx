import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Challenge from '@/components/sections/Challenge'
import SavingsStrip from '@/components/sections/SavingsStrip'
import Services from '@/components/sections/Services'
import Values from '@/components/sections/Values'
import CaseStudy from '@/components/sections/CaseStudy'
import WhyUs from '@/components/sections/WhyUs'
import Products from '@/components/sections/Products'
import Article from '@/components/sections/Article'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import { Article as ArticleType, Product } from '@/types'
import { SectionSetting, toVisibilityMap } from '@/lib/sectionKeys'

export const dynamic = 'force-dynamic'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ''

async function fetchProducts(): Promise<Product[]> {
  if (!API_URL) return []
  try {
    const res = await fetch(`${API_URL}/api/products`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const json = await res.json()
    return json.success && json.data ? json.data : []
  } catch {
    return []
  }
}

async function fetchArticle(): Promise<ArticleType | null> {
  if (!API_URL) return null
  try {
    const res = await fetch(`${API_URL}/api/article`, { next: { revalidate: 3600 } })
    if (!res.ok) return null
    const json = await res.json()
    return json.success && json.data ? json.data : null
  } catch {
    return null
  }
}

async function fetchSections(): Promise<SectionSetting[] | null> {
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

export default async function Home() {
  const [products, article, sections] = await Promise.all([
    fetchProducts(),
    fetchArticle(),
    fetchSections(),
  ])
  const visible = toVisibilityMap(sections)

  return (
    <>
      <Navbar />
      <main role="main">
        {visible.hero && <Hero />}
        {visible.about && <About />}
        {visible.challenge && <Challenge />}
        {visible['savings-strip'] && <SavingsStrip />}
        {visible.services && <Services />}
        {visible.values && <Values />}
        {visible['case-study'] && <CaseStudy />}
        {visible['why-us'] && <WhyUs />}
        {visible.products && <Products initialProducts={products} />}
        {visible.article && <Article initialArticle={article} />}
        {visible.contact && <Contact />}
      </main>
      <Footer />
    </>
  )
}

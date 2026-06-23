import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Challenge from '@/components/sections/Challenge'
import Services from '@/components/sections/Services'
import Values from '@/components/sections/Values'
import CaseStudy from '@/components/sections/CaseStudy'
import WhyUs from '@/components/sections/WhyUs'
import Products from '@/components/sections/Products'
import Article from '@/components/sections/Article'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main role="main">
        <Hero />
        <About />
        <Challenge />
        <Services />
        <Values />
        <CaseStudy />
        <WhyUs />
        <Products />
        <Article />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

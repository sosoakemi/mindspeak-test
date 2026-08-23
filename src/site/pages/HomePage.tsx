import TeamHeader from '../components/team/TeamHeader'
import Hero from '../components/Hero'
import { PrototypeScrollVideo } from '../components/PrototypeScrollVideo'
import ProductShowcase from '../components/ProductShowcase'
import Stats from '../components/Stats'
import About from '../components/About'
import Features from '../components/Features'
import GameSection from '../components/GameSection'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:text-slate-200">
      <TeamHeader />
      <main>
        <Hero />
        <PrototypeScrollVideo />
        <ProductShowcase />
        <Stats />
        <About />
        <Features />
        <Testimonials />
        <GameSection />
      </main>
      <Footer />
    </div>
  )
}

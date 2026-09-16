import TeamHeader from '../components/team/TeamHeader'
import Hero from '../components/Hero'
import { PrototypeScrollVideo } from '../components/PrototypeScrollVideo'
import Stats from '../components/Stats'
import About from '../components/About'
import Features from '../components/Features'
import HardwareShowcase from '../components/HardwareShowcase'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import TeamTeaser from '../components/TeamTeaser'
import GameSection from '../components/GameSection'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:text-slate-200">
      <TeamHeader />
      <main>
        <Hero />
        <PrototypeScrollVideo />
        <Stats />
        <About />
        <Features />
        <HardwareShowcase />
        <HowItWorks />
        <Testimonials />
        <TeamTeaser />
        <GameSection />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

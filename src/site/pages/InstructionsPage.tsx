import TeamHeader from '../components/team/TeamHeader'
import InstructionsHero from '../components/instructions/InstructionsHero'
import StepsGuide from '../components/instructions/StepsGuide'
import VideoDemo from '../components/instructions/VideoDemo'
import ComponentsCta from '../components/instructions/ComponentsCta'
import Footer from '../components/Footer'

export default function InstructionsPage() {
  return (
    <>
      <TeamHeader />
      <InstructionsHero />
      <StepsGuide />
      <VideoDemo />
      <ComponentsCta />
      <Footer />
    </>
  )
}

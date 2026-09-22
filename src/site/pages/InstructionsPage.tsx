import TeamHeader from '../components/team/TeamHeader'
import InstructionsHero from '../components/instructions/InstructionsHero'
import AccessGuide from '../components/instructions/AccessGuide'
import StepsGuide from '../components/instructions/StepsGuide'
import VideoDemo from '../components/instructions/VideoDemo'
import ComponentsCta from '../components/instructions/ComponentsCta'
import Footer from '../components/Footer'

export default function InstructionsPage() {
  return (
    <>
      <TeamHeader />
      <InstructionsHero />
      <AccessGuide />
      <StepsGuide />
      <VideoDemo />
      <ComponentsCta />
      <Footer />
    </>
  )
}

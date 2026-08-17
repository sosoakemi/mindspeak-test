import TeamHeader from '../components/team/TeamHeader'
import InstructionsHero from '../components/instructions/InstructionsHero'
import StepsGuide from '../components/instructions/StepsGuide'
import VideoDemo from '../components/instructions/VideoDemo'
import ComponentsCta from '../components/instructions/ComponentsCta'
import InstructionsFooter from '../components/instructions/InstructionsFooter'

export default function InstructionsPage() {
  return (
    <>
      <TeamHeader />
      <InstructionsHero />
      <StepsGuide />
      <VideoDemo />
      <ComponentsCta />
      <InstructionsFooter />
    </>
  )
}

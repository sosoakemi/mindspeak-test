import TeamHeader from '../components/team/TeamHeader'
import HeroES from '../components/EntreSinapses/HeroES'
import StatsES from '../components/EntreSinapses/StatsES'
import StoryES from '../components/EntreSinapses/StoryES'
import CharactersES from '../components/EntreSinapses/CharactersES'
import VideoES from '../components/EntreSinapses/VideoES'
import CTAES from '../components/EntreSinapses/CTAES'
import Footer from '../components/Footer'

export default function GamePage() {
  return (
    <>
      <TeamHeader />
      <HeroES />
      <StatsES />
      <StoryES />
      <CharactersES />
      <VideoES />
      <CTAES />
      <Footer />
    </>
  )
}

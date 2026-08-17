import TeamHeader from '../components/team/TeamHeader'
import TeamFooter from '../components/team/TeamFooter'
import ReferencesHero from '../components/references/ReferencesHero'
import ReferenceCard from '../components/references/ReferenceCard'
import ReferencesCta from '../components/references/ReferencesCta'
import { referencesData } from '../data/references'

export default function ReferencesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Light-themed Header */}
      <TeamHeader />

      <main className="flex-grow">
        {/* Hero Banner with Badge and Watermark */}
        <ReferencesHero />

        {/* Card Grid Section with a light background to contrast the white cards */}
        <section className="border-y border-slate-100 bg-slate-50 px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {referencesData.map((ref) => (
                <ReferenceCard key={ref.id} reference={ref} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA section prompting game exploration */}
        <ReferencesCta />
      </main>

      {/* Light-themed Footer */}
      <TeamFooter />
    </div>
  )
}

import { FileText, ArrowUpRight } from 'lucide-react'
import type { Reference } from '../../data/references'

interface ReferenceCardProps {
  reference: Reference
}

export default function ReferenceCard({ reference }: ReferenceCardProps) {
  return (
    <article className="flex flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="flex-grow">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10 text-teal-600">
          <FileText className="h-5 w-5" strokeWidth={1.75} />
        </span>
        
        <h3 className="mt-4 font-display text-lg font-bold leading-snug text-navy-900 line-clamp-2 min-h-[3.5rem]">
          {reference.title}
        </h3>
        
        <p className="mt-2 text-sm italic text-slate-500">
          {reference.authors}
        </p>
        
        <div className="mt-3">
          <span className="inline-block rounded bg-teal-500/10 px-2 py-0.5 text-xs font-semibold tracking-wide text-teal-600">
            {reference.year}
          </span>
        </div>
      </div>
      
      <div className="mt-5 border-t border-slate-100 pt-4">
        <a
          href={reference.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-500"
        >
          Acessar
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </a>
      </div>
    </article>
  )
}

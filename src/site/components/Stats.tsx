const stats = [
  {
    value: 'R$ 800',
    label: 'Preço acessível',
    description: 'Tecnologia BCI ao alcance de todos',
  },
  {
    value: '98%',
    label: 'Precisão',
    description: 'Taxa de acurácia na interpretação',
  },
  {
    value: '5',
    label: 'Meses de uso',
    description: 'Autonomia contínua do dispositivo',
  },
  {
    value: '12',
    label: 'Canais EEG',
    description: 'Sensores de alta resolução',
  },
]

export default function Stats() {
  return (
    <section className="border-y border-slate-100 bg-white px-6 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-display text-3xl font-bold tracking-tight text-navy-900 sm:text-4xl lg:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-800">
              {stat.label}
            </p>
            <p className="mt-1 text-xs text-slate-500">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

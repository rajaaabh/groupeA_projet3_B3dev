function Stats() {
  const stats = [
    { value: '+2 000', label: 'Membres actifs', sub: 'Qui s\'entraînent chaque semaine' },
    { value: '50+', label: 'Cours par semaine', sub: 'Yoga, cross-training, pilates et plus' },
    { value: '4.9', label: 'Note moyenne', sub: 'Basée sur les avis de nos membres' },
    { value: '10', label: 'Coachs certifiés', sub: 'Disponibles pour t\'accompagner' },
  ]

  return (
    <section className="bg-[#0f0f0f] border-t border-b border-white/5 py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((stat) => (
          <div key={stat.value} className="text-center">
            <div className="font-['Bebas_Neue'] text-5xl text-white mb-1 tracking-wide">{stat.value}</div>
            <div className="font-['Inter'] font-semibold text-sm text-white mb-1">{stat.label}</div>
            <div className="font-['Inter'] text-xs text-white/35 leading-relaxed">{stat.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Stats

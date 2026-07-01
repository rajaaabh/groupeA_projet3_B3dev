function Cours() {
  const cours = [
    {
      id: 1,
      title: 'YOGA DYNAMIQUE',
      desc: 'Renforcez votre équilibre et votre souplesse avec nos sessions de Yoga.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80',
    },
    {
      id: 2,
      title: 'CROSS-TRAINING',
      desc: 'Dépassez vos limites avec nos programmes de haute intensité.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80',
    },
    {
      id: 3,
      title: 'PILATES',
      desc: 'Travaillez votre posture et votre gainage en profondeur.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    },
  ]

  return (
    <section className="bg-[#0a0a0a] py-24 px-6 md:px-12">
      <h2 className="font-['Bebas_Neue'] text-5xl text-white text-center tracking-widest mb-14">
        Nos cours collectifs
      </h2>

      <div className="flex flex-wrap gap-6 justify-center max-w-5xl mx-auto">
        {cours.map((course) => (
          <div key={course.id} className="flex-1 min-w-64 max-w-80 rounded-2xl overflow-hidden bg-[#161616] border border-white/5 group">
            <div className="overflow-hidden h-52">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>
            <div className="p-6">
              <h3 className="font-['Bebas_Neue'] text-xl text-white tracking-wide mb-2">
                {course.title}
              </h3>
              <p className="font-['Inter'] text-sm text-white/45 leading-relaxed mb-4">
                {course.desc}
              </p>
              <span className="inline-flex items-center gap-1.5 font-['Inter'] text-xs font-semibold text-[#FF5500]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
                Disponible
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Cours

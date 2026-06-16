function Cours() {
  const cours = [
    {
      id: 1,
      title: 'YOGA DYNAMIQUE',
      desc: 'Renforcez votre équilibre et votre souplesse avec nos sessions de Yoga.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
    },
    {
      id: 2,
      title: 'CROSS-TRAINING',
      desc: 'Dépassez vos limites avec nos programmes de haute intensité.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
    },
    {
      id: 3,
      title: 'PILATES',
      desc: 'Travaillez votre posture et votre gainage en profondeur.',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400',
    },
  ]

  return (
    <section className="bg-white py-20 px-12">
      <h2 className="font-['Bebas_Neue'] text-5xl text-[#1A1A2E] text-center tracking-widest mb-14">
        NOS COURS COLLECTIFS
      </h2>

      <div className="flex flex-wrap gap-8 justify-center max-w-5xl mx-auto">
        {cours.map((course) => (
          <div key={course.id} className="flex-1 min-w-[260px] max-w-[320px] rounded-xl overflow-hidden shadow-md">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="font-['Bebas_Neue'] text-xl text-[#1A1A2E] tracking-wide mb-2">
                {course.title}
              </h3>
              <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed mb-4">
                {course.desc}
              </p>
              <span className="font-['Inter'] text-sm font-semibold text-[#4CAF50]">
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
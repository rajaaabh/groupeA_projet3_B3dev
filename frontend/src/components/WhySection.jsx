function WhySection() {
  const cards = [
    {
      id: 1,
      title: 'SANTÉ MENTALE',
      desc: 'Réduisez le stress et améliorez la qualité de votre sommeil grâce à la libération d\'endorphines.',
    },
    {
      id: 2,
      title: 'VITALITÉ & ÉNERGIE',
      desc: 'Boostez votre métabolisme et gagnez en énergie pour affronter vos journées avec sérénité.',
    },
  ]

  return (
    <section className="bg-white py-20 px-12" id="apropos">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h2 className="font-['Bebas_Neue'] text-5xl text-[#1A1A2E] tracking-widest mb-2">
          POURQUOI INTÉGRER LE SPORT
        </h2>
        <h2 className="font-['Bebas_Neue'] text-5xl text-[#FF6B35] tracking-widest mb-8">
          À VOTRE QUOTIDIEN ?
        </h2>
        <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed">
          La pratique régulière d'une activité physique est le pilier d'une vie équilibrée.
          Au-delà de la condition physique, elle agit directement sur votre santé mentale,
          votre énergie et votre longévité. Chez GymFlow, nous croyons qu'un corps en
          mouvement est un esprit plus fort.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center max-w-3xl mx-auto">
        {cards.map((card) => (
          <div key={card.id} className="flex-1 min-w-[240px] max-w-[340px] bg-[#E8E8E8] rounded-xl p-8">
            <h3 className="font-['Bebas_Neue'] text-xl text-[#1A1A2E] tracking-wide mb-3">
              {card.title}
            </h3>
            <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhySection
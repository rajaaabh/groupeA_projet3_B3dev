function Features() {
  const features = [
    {
      number: '01.',
      title: 'GESTION SIMPLIFIÉE',
      desc: 'Centralisez la gestion de vos membres et de vos abonnements en toute simplicité.',
    },
    {
      number: '02.',
      title: 'RÉSERVATION INTUITIVE',
      desc: 'Automatisez vos réservations de cours et suivez vos inscriptions en temps réel.',
    },
    {
      number: '03.',
      title: 'EXPÉRIENCE PREMIUM',
      desc: "Améliorez l'expérience de vos sportifs grâce à une plateforme fluide et sécurisée.",
    },
  ]

  return (
    <section className="bg-[#E8E8E8] py-20 px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">

        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600"
            alt="Salle de sport"
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </div>

        <div className="flex-1">
          <h2 className="font-['Bebas_Neue'] text-4xl text-[#1A1A2E] tracking-wide mb-10">
            POURQUOI LES MEMBRES<br />
            <span className="text-[#FF6B35]">NOUS CHOISISSENT ?</span>
          </h2>

          <div className="flex flex-col gap-7">
            {features.map((f) => (
              <div key={f.number} className="flex gap-4 items-start">
                <span className="font-['Bebas_Neue'] text-3xl text-[#FF6B35] min-w-[40px]">
                  {f.number}
                </span>
                <div>
                  <h3 className="font-['Inter'] font-bold text-sm text-[#1A1A2E] tracking-widest mb-1">
                    {f.title}
                  </h3>
                  <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default Features
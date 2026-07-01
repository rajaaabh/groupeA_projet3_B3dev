function Features() {
  const features = [
    {
      title: 'TON ABONNEMENT, SOUS CONTRÔLE',
      desc: 'Consulte ton abonnement, ses dates et son statut directement depuis ton espace membre.',
    },
    {
      title: 'RÉSERVE TES COURS EN UN CLIC',
      desc: 'Yoga, cross-training, pilates — choisis ton cours, réserve ta place, arrive prêt.',
    },
    {
      title: 'RESTE MOTIVÉ',
      desc: 'Reçois des notifications, suis ta progression et ne rate plus aucune séance.',
    },
  ]

  return (
    <section className="bg-[#111111] py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80"
            alt="Salle de sport"
            className="w-full h-100 object-cover rounded-2xl grayscale"
          />
        </div>

        <div className="flex-1">
          <h2 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide mb-10 leading-tight">
            Tout ce dont tu as besoin<br />
            <span className="text-[#FF5500]">pour t'entraîner.</span>
          </h2>

          <div className="flex flex-col gap-8">
            {features.map((f) => (
              <div key={f.title} className="flex gap-5 items-start">
                <div className="w-0.5 bg-[#FF5500] self-stretch mt-1 shrink-0 rounded-full" />
                <div>
                  <h3 className="font-['Inter'] font-bold text-xs text-white tracking-widest mb-2 uppercase">
                    {f.title}
                  </h3>
                  <p className="font-['Inter'] text-sm text-white/45 leading-relaxed">
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

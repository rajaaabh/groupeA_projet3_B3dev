function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: 'Crée ton compte',
      desc: "Inscris-toi en 2 minutes. Un email, un mot de passe — t'es dedans.",
    },
    {
      num: 2,
      title: 'Choisis ton abonnement',
      desc: 'Essentiel, Premium ou Étudiant. La formule qui colle à ton rythme.',
    },
    {
      num: 3,
      title: 'Réserve tes cours',
      desc: 'Yoga, cross-training, pilates... Choisis, réserve, arrive prêt.',
    },
  ]

  return (
    <section className="bg-[#0f0f0f] border-t border-b border-white/5 py-24 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">

        <div className="mb-20 text-center">
          <span className="text-[#FF5500] font-['Inter'] text-xs tracking-widest uppercase mb-4 block font-semibold">
            Aussi simple que ça
          </span>
          <h2 className="font-['Bebas_Neue'] text-5xl text-white tracking-wide">
            Comment ça fonctionne ?
          </h2>
        </div>

        {/* Stepper */}
        <div className="relative flex flex-col md:flex-row gap-0 md:gap-0">

          {/* Ligne de connexion horizontale (visible uniquement sur md+) */}
          <div className="hidden md:block absolute top-5 left-[calc(16.66%)] right-[calc(16.66%)] h-px bg-white/10" />

          {steps.map((step, index) => (
            <div key={step.num} className="flex-1 flex flex-col items-center text-center px-8">

              {/* Cercle numéroté */}
              <div className="relative z-10 w-10 h-10 rounded-full bg-[#FF5500] flex items-center justify-center mb-6 shrink-0">
                <span className="font-['Inter'] text-white font-bold text-sm">{step.num}</span>
              </div>

              <h3 className="font-['Inter'] font-bold text-white text-sm uppercase tracking-widest mb-3">
                {step.title}
              </h3>
              <p className="font-['Inter'] text-white/40 text-sm leading-relaxed">
                {step.desc}
              </p>

              {/* Flèche entre les étapes sur mobile */}
              {index < steps.length - 1 && (
                <div className="md:hidden text-white/15 text-2xl my-6">↓</div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HowItWorks

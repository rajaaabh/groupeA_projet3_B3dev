function WhySection() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6 md:px-12" id="apropos">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="rounded-2xl overflow-hidden h-130">
          <img
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80"
            alt="Notre équipe"
            className="w-full h-full object-cover grayscale"
          />
        </div>

        <div>
          <span className="text-[#FF5500] font-['Inter'] text-xs tracking-widest uppercase mb-5 block">
            Notre philosophie
          </span>
          <h2 className="font-['Bebas_Neue'] text-5xl text-white leading-tight tracking-wide mb-6">
            Une salle.<br />Une communauté.<br /><span className="text-[#FF5500]">Un objectif.</span>
          </h2>
          <p className="font-['Inter'] text-white/55 text-sm leading-relaxed mb-5">
            Chez GymFlow, on croit que chaque séance compte. Que tu débuttes ou que tu prépares
            une compétition, notre salle et nos coachs sont là pour t'accompagner à chaque étape.
          </p>
          <p className="font-['Inter'] text-white/55 text-sm leading-relaxed">
            Rejoins une communauté de +2 000 membres qui repoussent leurs limites chaque jour.
            Ton prochain record t'attend.
          </p>
        </div>
      </div>
    </section>
  )
}

export default WhySection

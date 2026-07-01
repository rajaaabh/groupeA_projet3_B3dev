import { Link } from 'react-router-dom'

function JoinMembership() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-32 px-6 md:px-12">
      <img
        src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-xl">
          <span className="text-[#FF5500] font-['Inter'] text-xs tracking-widest uppercase mb-5 block font-semibold">
            Rejoins-nous
          </span>
          <h2 className="font-['Bebas_Neue'] text-6xl md:text-7xl text-white leading-none tracking-wide mb-6">
            Ton prochain<br />
            record commence<br />
            <span className="text-[#FF5500]">aujourd'hui.</span>
          </h2>
          <p className="font-['Inter'] text-white/50 text-sm leading-relaxed">
            Rejoins +2 000 membres qui ont déjà franchi le pas.
            Premier mois sans engagement — annule quand tu veux.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 shrink-0">
          <Link
            to="/register"
            className="px-10 py-4 bg-[#FF5500] text-white rounded-full font-['Inter'] font-semibold text-sm hover:bg-orange-600 transition-colors whitespace-nowrap"
          >
            Commencer maintenant →
          </Link>
          <a
            href="#abonnements"
            className="font-['Inter'] text-white/40 text-xs hover:text-white transition-colors"
          >
            Voir les abonnements
          </a>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex -space-x-2">
              {[11, 22, 33, 44].map(i => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/28?img=${i}`}
                  alt=""
                  className="w-7 h-7 rounded-full border-2 border-[#0a0a0a] object-cover"
                />
              ))}
            </div>
            <span className="text-white/35 font-['Inter'] text-xs">+2 000 membres actifs</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default JoinMembership

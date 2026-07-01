import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative h-screen min-h-175 overflow-hidden bg-[#0a0a0a]">
      <img
        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80"
        alt="GymFlow hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/30 to-black/85" />

      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 pb-22">
        <div className="mb-5">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 text-white text-xs px-4 py-2 rounded-full font-['Inter']">
            <svg className="w-3.5 h-3.5 text-[#FF5500]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            Satisfait ou Remboursé — 30 Jours
          </span>
        </div>

        <div className="flex items-center gap-3 mb-7">
          <div className="flex -space-x-2">
            {[11, 22, 33].map(i => (
              <img
                key={i}
                src={`https://i.pravatar.cc/32?img=${i}`}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-black object-cover"
              />
            ))}
          </div>
          <span className="text-white/70 text-sm font-['Inter']">Rejoins +2 000 membres qui s'entraînent avec GymFlow</span>
          <span className="text-yellow-400 text-sm ml-1">★</span>
          <span className="text-white/70 text-sm font-['Inter']">Noté 4.9 sur 5.0</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h1 className="font-['Bebas_Neue'] text-[clamp(3rem,7vw,5.5rem)] text-white leading-none tracking-wide max-w-2xl">
              Entraîne-toi plus fort.<br />
              Suis tes progrès. <span className="text-[#FF5500]">Dépasse-toi.</span>
            </h1>

            <div className="shrink-0 flex flex-col items-start md:items-end">
              <div className="bg-[#FF5500] rounded-2xl p-4 flex items-center gap-4 w-full md:min-w-57.5">
                <div className="text-white">
                  <div className="text-[10px] opacity-70 font-['Inter'] uppercase tracking-widest mb-0.5">Inscription gratuite</div>
                  <div className="font-semibold font-['Inter'] text-sm">Créer mon compte</div>
                </div>
                <Link
                  to="/register"
                  className="ml-auto w-9 h-9 bg-white rounded-xl flex items-center justify-center text-[#FF5500] text-lg font-bold hover:bg-gray-100 transition-colors shrink-0"
                >
                  →
                </Link>
              </div>
              <p className="text-white/40 text-xs font-['Inter'] mt-2 text-left md:text-right">
                Sans engagement. Résilie quand tu veux.
              </p>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Hero

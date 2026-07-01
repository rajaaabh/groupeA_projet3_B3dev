function Testimonial() {
  return (
    <section className="bg-[#0a0a0a] py-24 px-6 md:px-12">
      <div className="max-w-3xl">
        <div className="flex gap-1 text-yellow-400 text-xl mb-8">
          {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
        </div>
        <blockquote className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white leading-tight tracking-wide mb-10">
          "En 3 mois avec GymFlow, j'ai perdu 8 kilos et pris confiance en moi.
          Les coachs sont au top, les cours sont intenses. Je reviens chaque semaine."
        </blockquote>
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/48?img=47"
            alt="Lucie M."
            className="w-12 h-12 rounded-full object-cover grayscale"
          />
          <div>
            <div className="text-white font-['Inter'] font-semibold text-sm">Lucie M.</div>
            <div className="text-white/40 font-['Inter'] text-xs">Membre Premium · Abonnée depuis janvier 2026</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial

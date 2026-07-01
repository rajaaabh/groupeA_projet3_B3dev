import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 pt-16 pb-8 px-6 md:px-12">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-12 justify-between mb-12">
        <div className="flex-1 min-w-48">
          <div className="mb-4">
            <span className="font-['Bebas_Neue'] text-xl tracking-widest text-white">
              GYM<span className="text-[#FF5500]">FLOW</span>
            </span>
          </div>
          <p className="font-['Inter'] text-xs text-white/30 leading-relaxed">
            Ton espace fitness, toujours avec toi.
            Réserve tes cours, suis ton abonnement
            et dépasse tes limites.
          </p>
        </div>

        <div className="flex-1 min-w-40">
          <h4 className="font-['Inter'] text-xs text-[#FF5500] tracking-widest uppercase mb-5 font-semibold">
            Navigation
          </h4>
          <ul className="flex flex-col gap-3">
            <li><Link to="/" className="font-['Inter'] text-xs text-white/35 hover:text-white transition-colors">Accueil</Link></li>
            <li><Link to="/#abonnements" className="font-['Inter'] text-xs text-white/35 hover:text-white transition-colors">Abonnements</Link></li>
            <li><Link to="/login" className="font-['Inter'] text-xs text-white/35 hover:text-white transition-colors">Espace Membre</Link></li>
          </ul>
        </div>

        <div className="flex-1 min-w-40">
          <h4 className="font-['Inter'] text-xs text-[#FF5500] tracking-widest uppercase mb-5 font-semibold">
            Contact
          </h4>
          <ul className="flex flex-col gap-3">
            <li className="font-['Inter'] text-xs text-white/35">contact@gymflow.com</li>
            <li className="font-['Inter'] text-xs text-white/35">+225 00 00 00 00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 pt-6 text-center">
        <p className="font-['Inter'] text-xs text-white/20">
          © 2026 GymFlow. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}

export default Footer

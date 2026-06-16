import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-[#1A1A2E] border-t border-[#2a2a4a] pt-16 pb-6 px-12">
      <div className="max-w-5xl mx-auto flex flex-wrap gap-12 justify-between mb-12">

        <div className="flex-1 min-w-[200px]">
          <div className="font-['Bebas_Neue'] text-3xl text-white tracking-widest mb-4">
            GYM<span className="text-[#FF6B35]">FLOW</span>
          </div>
          <p className="font-['Inter'] text-sm text-gray-500 leading-relaxed">
            Simplifiez la gestion de votre salle de sport.
            Centralisation, automatisation et performance au
            service de vos membres.
          </p>
        </div>

        <div className="flex-1 min-w-[160px]">
          <h4 className="font-['Bebas_Neue'] text-base text-[#FF6B35] tracking-widest mb-4">
            NAVIGATION
          </h4>
          <ul className="flex flex-col gap-3">
            <li><Link to="/" className="font-['Inter'] text-sm text-gray-500 hover:text-[#FF6B35] transition-colors">Accueil</Link></li>
            <li><Link to="/#abonnements" className="font-['Inter'] text-sm text-gray-500 hover:text-[#FF6B35] transition-colors">Abonnements</Link></li>
            <li><Link to="/login" className="font-['Inter'] text-sm text-gray-500 hover:text-[#FF6B35] transition-colors">Espace Membre</Link></li>
          </ul>
        </div>

        <div className="flex-1 min-w-[160px]">
          <h4 className="font-['Bebas_Neue'] text-base text-[#FF6B35] tracking-widest mb-4">
            CONTACT
          </h4>
          <ul className="flex flex-col gap-3">
            <li className="font-['Inter'] text-sm text-gray-500">Email : contact@gymflow.com</li>
            <li className="font-['Inter'] text-sm text-gray-500">Tél : +225 00 00 00 00</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-[#2a2a4a] pt-6 text-center">
        <p className="font-['Inter'] text-xs text-gray-600">
          © 2026 GymFlow. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}

export default Footer
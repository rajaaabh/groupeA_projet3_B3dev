import { Link } from 'react-router-dom'
import gymImg from '../assets/gymImg.jpg'

function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center"
      style={{
        backgroundImage: `url(${gymImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-[#1A1A2E]/70" />
      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white leading-tight tracking-widest mb-6">
          GYMFLOW : LA GESTION DE VOTRE SALLE{' '}
          <span className="text-[#FF6B35]">SIMPLIFIÉE.</span>
        </h1>
        <p className="font-['Inter'] text-lg text-[#E8E8E8] mb-10 leading-relaxed">
          Centralisez la gestion de vos membres, automatisez vos réservations
          de cours et améliorez l'expérience de vos sportifs avec notre
          solution tout-en-un.
        </p>
        <Link
          to="/register"
          className="inline-block px-10 py-4 bg-[#FF6B35] text-white rounded-lg font-['Inter'] font-bold text-base hover:bg-orange-600 transition-colors"
        >
          Commencer maintenant
        </Link>
      </div>
    </section>
  )
}

export default Hero
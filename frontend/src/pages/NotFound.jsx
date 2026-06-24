import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>

      <span className="font-['Bebas_Neue'] text-[clamp(6rem,20vw,14rem)] text-white/5 leading-none select-none">
        404
      </span>

      <h1 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide -mt-6 mb-3">
        Page introuvable
      </h1>

      <p className="font-['Inter'] text-sm text-white/35 mb-10 max-w-sm leading-relaxed">
        Cette page n'existe pas ou a été déplacée.
      </p>

      <Link
        to="/"
        className="px-8 py-3 bg-[#FF5500] text-white rounded-full font-['Inter'] font-semibold text-sm hover:bg-orange-600 transition-colors"
      >
        Retour à l'accueil
      </Link>

    </div>
  )
}

export default NotFound

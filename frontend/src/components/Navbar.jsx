import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/api'

function Navbar() {
  const navigate = useNavigate()
  const isAuth = !!localStorage.getItem('token')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    localStorage.removeItem('token')
    navigate('/login')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className="bg-[#0a0a0a] sticky top-0 z-50 px-6 md:px-8 py-4 border-b border-white/5">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Link to="/" className="font-['Bebas_Neue'] text-xl tracking-widest group">
            <span className="text-white transition-colors duration-300 group-hover:text-[#FF5500]">GYM</span>
            <span className="text-[#FF5500] transition-colors duration-300 group-hover:text-white">FLOW</span>
          </Link>
        </div>

        <ul className="hidden md:flex gap-8 list-none">
          <li><Link to="/" className="text-white/50 font-['Inter'] text-sm hover:text-white transition-colors">Accueil</Link></li>
          <li><a href="/#abonnements" className="text-white/50 font-['Inter'] text-sm hover:text-white transition-colors">Abonnements</a></li>
          <li><a href="/#apropos" className="text-white/50 font-['Inter'] text-sm hover:text-white transition-colors">À propos</a></li>
        </ul>

        <div className="flex-1 hidden md:flex gap-3 items-center justify-end">
          {isAuth ? (
            <>
              <Link to="/dashboard" className="text-white/60 font-['Inter'] text-sm hover:text-white transition-colors px-3 py-2">
                Mon espace
              </Link>
              <button onClick={handleLogout} className="px-5 py-2 bg-[#FF5500] text-white rounded-full font-['Inter'] text-sm font-medium hover:bg-orange-600 transition-colors">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white/60 font-['Inter'] text-sm hover:text-white transition-colors px-3 py-2">
                Connexion
              </Link>
              <Link to="/register" className="px-5 py-2 bg-[#FF5500] text-white rounded-full font-['Inter'] text-sm font-medium hover:bg-orange-600 transition-colors">
                S'inscrire
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(open => !open)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 -mr-2"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={menuOpen}
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 pb-2 flex flex-col gap-1">
          <Link to="/" onClick={closeMenu} className="text-white/60 font-['Inter'] text-sm hover:text-white transition-colors py-3 px-2 border-b border-white/5">Accueil</Link>
          <a href="/#abonnements" onClick={closeMenu} className="text-white/60 font-['Inter'] text-sm hover:text-white transition-colors py-3 px-2 border-b border-white/5">Abonnements</a>
          <a href="/#apropos" onClick={closeMenu} className="text-white/60 font-['Inter'] text-sm hover:text-white transition-colors py-3 px-2 border-b border-white/5">À propos</a>

          {isAuth ? (
            <>
              <Link to="/dashboard" onClick={closeMenu} className="text-white/60 font-['Inter'] text-sm hover:text-white transition-colors py-3 px-2 border-b border-white/5">Mon espace</Link>
              <button onClick={() => { closeMenu(); handleLogout() }} className="mt-2 px-5 py-3 bg-[#FF5500] text-white rounded-full font-['Inter'] text-sm font-medium hover:bg-orange-600 transition-colors text-center">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="text-white/60 font-['Inter'] text-sm hover:text-white transition-colors py-3 px-2 border-b border-white/5">Connexion</Link>
              <Link to="/register" onClick={closeMenu} className="mt-2 px-5 py-3 bg-[#FF5500] text-white rounded-full font-['Inter'] text-sm font-medium hover:bg-orange-600 transition-colors text-center">
                S'inscrire
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar

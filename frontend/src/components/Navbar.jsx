import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/api'

function Navbar() {
  const navigate = useNavigate()
  const isAuth = !!localStorage.getItem('token')

  const handleLogout = async () => {
    await logout()
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="bg-[#1A1A2E] sticky top-0 z-50 px-12 py-4 flex items-center justify-between">
      <div className="font-['Bebas_Neue'] text-2xl text-white tracking-widest">
        GYM<span className="text-[#FF6B35]">FLOW</span>
      </div>

      <ul className="flex gap-8 list-none">
        <li><Link to="/" className="text-white font-['Inter'] text-sm hover:text-[#FF6B35] transition-colors">Accueil</Link></li>
        <li><Link to="/#abonnements" className="text-white font-['Inter'] text-sm hover:text-[#FF6B35] transition-colors">Abonnements</Link></li>
        <li><Link to="/#apropos" className="text-white font-['Inter'] text-sm hover:text-[#FF6B35] transition-colors">À propos</Link></li>
      </ul>

      <div className="flex gap-3 items-center">
        {isAuth ? (
          <>
            <Link to="/dashboard" className="px-5 py-2 border-2 border-[#FF6B35] text-[#FF6B35] rounded-md text-sm font-semibold font-['Inter'] hover:bg-[#FF6B35] hover:text-white transition-colors">
              Mon espace
            </Link>
            <button onClick={handleLogout} className="px-5 py-2 bg-[#FF6B35] text-white rounded-md text-sm font-semibold font-['Inter'] hover:bg-orange-600 transition-colors">
              Déconnexion
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-5 py-2 border-2 border-[#FF6B35] text-[#FF6B35] rounded-md text-sm font-semibold font-['Inter'] hover:bg-[#FF6B35] hover:text-white transition-colors">
              Connexion
            </Link>
            <Link to="/register" className="px-5 py-2 bg-[#FF6B35] text-white rounded-md text-sm font-semibold font-['Inter'] hover:bg-orange-600 transition-colors">
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
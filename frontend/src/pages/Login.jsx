import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.message || 'Email ou mot de passe incorrect.'); return }
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard')
    } catch {
      setError('Impossible de contacter le serveur.')
    }
  }

  return (
    <div className="min-h-screen flex">

      <div className="flex-1 relative overflow-hidden hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
          alt="Salle de sport GymFlow"
          className="w-full h-full object-cover object-center filter-[grayscale(0.3)]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/15" />
        <div className="absolute bottom-12 left-12 right-12 text-white">
          <p className="font-['Bebas_Neue'] text-4xl leading-tight tracking-wide mb-4">
            Chaque séance te rapproche<br />
            de ta <span className="text-[#FF5500]">meilleure version.</span>
          </p>
          <p className="text-[13px] text-white/50 font-['Inter']">GymFlow — Ton espace fitness, toujours avec toi.</p>
        </div>
      </div>

      <div className="w-full md:max-w-130 bg-[#0a0a0a] flex items-center justify-center px-6 py-10 md:px-14 shrink-0">
        <div className="w-full max-w-95">

          <span className="font-['Bebas_Neue'] text-[22px] tracking-[0.08em] text-white mb-10 block">
            GYM<span className="text-[#FF5500]">FLOW</span>
          </span>

          <h1 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide mb-1.5">Connexion</h1>
          <span className="text-[13px] text-white/35 mb-8 block font-['Inter']">Accède à ton espace membre</span>

          {error && (
            <div className="bg-red-500/8 border border-red-500/20 text-red-400 rounded-lg px-3.5 py-3 text-[13px] mb-5 font-['Inter']">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { id: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
              { id: 'password', label: 'Mot de passe', type: 'password', placeholder: '••••••••' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} className="mb-4.5">
                <label htmlFor={id} className="block text-[11px] font-semibold uppercase tracking-widest text-white/45 mb-2 font-['Inter']">
                  {label}
                </label>
                <input
                  id={id} type={type} name={id} placeholder={placeholder}
                  value={form[id]} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-[#161616] border border-white/[0.07] rounded-lg text-sm text-white outline-none focus:border-[#FF5500] transition-colors placeholder:text-white/20 font-['Inter']"
                />
              </div>
            ))}

            <button type="submit" className="w-full py-3.5 bg-[#FF5500] text-white border-none rounded-lg text-sm font-bold cursor-pointer mt-2.5 hover:bg-[#e04a00] transition-colors block text-center font-['Inter']">
              Se connecter
            </button>
          </form>

          <p className="text-center text-[13px] text-white/30 mt-5 font-['Inter']">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-[#FF5500] font-semibold no-underline hover:underline">S'inscrire</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login

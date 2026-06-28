import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.password_confirmation) { setError('Les mots de passe ne correspondent pas.'); return }
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        const firstError = Object.values(data.errors || {})[0]?.[0] || data.message
        setError(firstError || 'Une erreur est survenue.')
        return
      }
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))
      setSuccess(true)
      navigate('/dashboard')
    } catch {
      setError('Impossible de contacter le serveur.')
    }
  }

  const imageSide = (quote) => (
    <div className="flex-1 relative overflow-hidden hidden md:block">
      <img
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80"
        alt="Coaching GymFlow"
        className="w-full h-full object-cover object-center filter-[grayscale(0.3)]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/15" />
      <div className="absolute bottom-12 left-12 right-12 text-white">
        <p className="font-['Bebas_Neue'] text-4xl leading-tight tracking-wide mb-4">
          {quote.main} <span className="text-[#FF5500]">{quote.accent}</span>
        </p>
        <p className="text-[13px] text-white/50 font-['Inter']">GymFlow — Ton espace fitness, toujours avec toi.</p>
      </div>
    </div>
  )

  if (success) {
    return (
      <div className="min-h-screen flex">
        {imageSide({ main: 'Bienvenue dans la', accent: 'communauté.' })}
        <div className="w-full md:max-w-130 bg-[#0a0a0a] flex items-center justify-center px-6 py-10 md:px-14 shrink-0">
          <div className="w-full max-w-95 text-center">
            <span className="font-['Bebas_Neue'] text-[22px] tracking-[0.08em] text-white mb-10 block">
              GYM<span className="text-[#FF5500]">FLOW</span>
            </span>
            <p className="text-green-400 text-[15px] font-semibold py-5 font-['Inter']">Compte créé avec succès !</p>
            <Link to="/login" className="w-full py-3.5 bg-[#FF5500] text-white border-none rounded-lg text-sm font-bold cursor-pointer mt-5 hover:bg-[#e04a00] transition-colors block text-center font-['Inter'] no-underline">
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {imageSide({ main: "Le premier pas, c'est de", accent: "s'inscrire." })}

      <div className="w-full md:max-w-130 bg-[#0a0a0a] flex items-center justify-center px-6 py-10 md:px-14 shrink-0">
        <div className="w-full max-w-95">

          <span className="font-['Bebas_Neue'] text-[22px] tracking-[0.08em] text-white mb-10 block">
            GYM<span className="text-[#FF5500]">FLOW</span>
          </span>

          <h1 className="font-['Bebas_Neue'] text-4xl text-white tracking-wide mb-1.5">Créer un compte</h1>
          <span className="text-[13px] text-white/35 mb-8 block font-['Inter']">Rejoins la communauté GymFlow</span>

          {error && (
            <div className="bg-red-500/8 border border-red-500/20 text-red-400 rounded-lg px-3.5 py-3 text-[13px] mb-5 font-['Inter']">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { id: 'name', label: 'Nom complet', type: 'text', placeholder: 'Jean Dupont' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
              { id: 'password', label: 'Mot de passe', type: 'password', placeholder: 'Minimum 8 caractères' },
              { id: 'password_confirmation', label: 'Confirmer le mot de passe', type: 'password', placeholder: '••••••••' },
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
              Créer mon compte
            </button>
          </form>

          <p className="text-center text-[13px] text-white/30 mt-5 font-['Inter']">
            Déjà un compte ?{' '}
            <Link to="/login" className="text-[#FF5500] font-semibold no-underline hover:underline">Se connecter</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register

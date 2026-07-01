import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getUser, getSubscriptions, getNotifications, deleteSubscription, updateProfile } from '../services/api'

function Dashboard() {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [subscriptions, setSubscriptions] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelling, setCancelling] = useState(false)
  const [cancelTargetId, setCancelTargetId] = useState(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileForm, setProfileForm] = useState({ name: '', password: '', password_confirmation: '' })
  const [profileError, setProfileError] = useState('')
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [userData, subsData, notifsData] = await Promise.all([
          getUser(),
          getSubscriptions(),
          getNotifications(),
        ])
        if (userData.message === 'Unauthenticated.') {
          localStorage.removeItem('token')
          navigate('/login')
          return
        }
        setUser(userData)
        setSubscriptions(Array.isArray(subsData) ? subsData : [])
        setNotifications(Array.isArray(notifsData) ? notifsData : [])
      } catch {
        setError('Impossible de charger les données. Vérifiez votre connexion.')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [navigate])

  const openProfileModal = () => {
    setProfileForm({ name: user?.name || '', password: '', password_confirmation: '' })
    setProfileError('')
    setProfileSuccess(false)
    setShowProfileModal(true)
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setProfileError('')
    if (profileForm.password && profileForm.password !== profileForm.password_confirmation) {
      setProfileError('Les mots de passe ne correspondent pas.')
      return
    }
    setSavingProfile(true)
    try {
      const payload = { name: profileForm.name }
      if (profileForm.password) {
        payload.password = profileForm.password
        payload.password_confirmation = profileForm.password_confirmation
      }
      const data = await updateProfile(payload)
      if (data.errors || !data.user) {
        const firstError = Object.values(data.errors || {})[0]?.[0] || data.message
        setProfileError(firstError || 'Une erreur est survenue.')
        return
      }
      setUser(data.user)
      localStorage.setItem('user', JSON.stringify(data.user))
      setProfileSuccess(true)
      setTimeout(() => setShowProfileModal(false), 1200)
    } catch {
      setProfileError('Impossible de contacter le serveur.')
    } finally {
      setSavingProfile(false)
    }
  }

  const handleCancel = async () => {
    setCancelling(true)
    try {
      await deleteSubscription(cancelTargetId)
      setSubscriptions(subscriptions.filter(s => s.id !== cancelTargetId))
    } catch {
      setError("Impossible de résilier l'abonnement.")
    } finally {
      setCancelling(false)
      setCancelTargetId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
        <Navbar />
        <p className="text-center py-20 text-sm text-white/30 font-['Inter']">Chargement de votre espace...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Navbar />

      {cancelTargetId && (
        <div className="fixed inset-0 bg-black/70 z-100 flex items-center justify-center p-4" onClick={() => setCancelTargetId(null)}>
          <div className="bg-[#161616] border border-white/8 rounded-2xl p-8 w-full max-w-sm text-center" onClick={e => e.stopPropagation()}>
            <p className="font-['Bebas_Neue'] text-2xl text-white tracking-wide mb-2">Résilier l'abonnement ?</p>
            <p className="text-sm text-white/40 font-['Inter'] mb-6">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setCancelTargetId(null)}
                className="flex-1 py-2.5 bg-white/6 text-white/60 rounded-xl text-sm font-semibold border border-white/8 hover:bg-white/10 transition-colors cursor-pointer font-['Inter']"
              >Annuler</button>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold border-none hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50 font-['Inter']"
              >{cancelling ? '...' : 'Résilier'}</button>
            </div>
          </div>
        </div>
      )}

      {showProfileModal && (
        <div
          className="fixed inset-0 bg-black/70 z-100 flex items-center justify-center p-4"
          onClick={() => setShowProfileModal(false)}
        >
          <div
            className="bg-[#161616] border border-white/8 rounded-2xl p-8 w-full max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">Modifier mon profil</h2>
              <button
                className="text-white/40 hover:text-white transition-colors px-3 py-2 rounded-md bg-transparent border-none cursor-pointer text-base"
                onClick={() => setShowProfileModal(false)}
              >✕</button>
            </div>

            {profileSuccess ? (
              <p className="text-[15px] text-green-400 text-center py-6">Profil mis à jour ✓</p>
            ) : (
              <form onSubmit={handleUpdateProfile} className="flex flex-col gap-4">
                {profileError && (
                  <div className="bg-red-500/8 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
                    {profileError}
                  </div>
                )}
                {[
                  { label: 'Nom', key: 'name', type: 'text', placeholder: '', required: true },
                  { label: 'Nouveau mot de passe', key: 'password', type: 'password', placeholder: '••••••', note: 'laisser vide pour ne pas changer' },
                  { label: 'Confirmer le mot de passe', key: 'password_confirmation', type: 'password', placeholder: '••••••' },
                ].map(({ label, key, type, placeholder, required, note }) => (
                  <div key={key} className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-white/35 font-['Inter']">
                      {label} {note && <span className="normal-case font-normal text-white/20 tracking-normal">({note})</span>}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={profileForm[key]}
                      onChange={e => setProfileForm({ ...profileForm, [key]: e.target.value })}
                      required={required}
                      className="bg-white/4 border border-white/8 rounded-xl px-3.5 py-3 text-sm text-white outline-none focus:border-[#FF5500] transition-colors font-['Inter']"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="mt-1 py-2.5 px-5 bg-[#FF5500] text-white border-none rounded-xl text-sm font-semibold hover:bg-[#e04a00] transition-colors cursor-pointer disabled:opacity-50 font-['Inter']"
                >
                  {savingProfile ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-8 md:px-12 md:py-12">

        {error && (
          <div className="bg-red-500/8 border border-red-500/20 text-red-400 rounded-xl px-4 py-3.5 text-sm mb-6 font-['Inter']">
            {error}
          </div>
        )}

        <div className="mb-10 border-b border-white/6 pb-8">
          <h1 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white tracking-wide leading-none mb-2">
            {getGreeting()}, <span className="text-[#FF5500]">{user?.name}</span>
          </h1>
          <p className="text-sm text-white/40 font-['Inter']">Bienvenue dans ton espace membre GymFlow.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

          <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FF5500] font-['Inter']">Mon profil</span>
              <button
                onClick={openProfileModal}
                className="bg-transparent border border-[#FF5500]/35 text-[#FF5500] px-4 py-2 rounded-md text-xs font-semibold hover:bg-[#FF5500]/10 transition-colors cursor-pointer font-['Inter']"
              >Modifier</button>
            </div>
            <p className="font-['Bebas_Neue'] text-3xl text-white tracking-wide mb-1.5">{user?.name}</p>
            <p className="text-[13px] text-white/35 font-['Inter']">{user?.email}</p>
          </div>

          <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FF5500] mb-4 block font-['Inter']">Mes abonnements</span>

            {subscriptions.length === 0 ? (
              <div className="text-center py-3">
                <div className="text-3xl mb-2.5">🏋️</div>
                <p className="text-sm text-white/35 mb-5 leading-relaxed font-['Inter']">Tu n'as pas encore d'abonnement actif.</p>
                <button
                  onClick={() => navigate('/abonnements')}
                  className="px-5 py-2.5 bg-[#FF5500] text-white border-none rounded-xl text-sm font-semibold hover:bg-[#e04a00] transition-colors cursor-pointer font-['Inter']"
                >Choisir un abonnement</button>
              </div>
            ) : (
              subscriptions.map(sub => (
                <div key={sub.id} className="border border-white/[0.07] rounded-xl p-4 mb-2.5 bg-white/2">
                  <p className="font-['Bebas_Neue'] text-xl text-white tracking-wide mb-1">
                    {sub.subscription_type?.nom_type ?? 'Abonnement'}
                  </p>
                  <p className="text-xs text-white/35 mb-2.5 font-['Inter']">
                    Du {formatDate(sub.date_debut)} au {formatDate(sub.date_fin)}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold font-['Inter'] ${
                      sub.statut === 'actif'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {sub.statut === 'actif' ? 'Actif' : 'Inactif'}
                    </span>
                    <button
                      onClick={() => setCancelTargetId(sub.id)}
                      disabled={cancelling}
                      className="bg-transparent border border-red-500/30 text-red-400 px-4 py-2 rounded-md text-xs font-semibold hover:bg-red-500/8 hover:border-red-500/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-['Inter']"
                    >Résilier</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-[#161616] border border-white/5 rounded-2xl p-6">
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#FF5500] mb-4 block font-['Inter']">Notifications</span>

          {notifications.length === 0 ? (
            <p className="text-sm text-white/25 text-center py-6 font-['Inter']">Aucune notification pour le moment.</p>
          ) : (
            notifications.map(notif => (
              <div key={notif.id} className="flex gap-4 items-start py-4 border-b border-white/4 last:border-0 last:pb-0">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FF5500] mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm text-white/70 leading-relaxed font-['Inter']">{notif.message}</p>
                  <p className="text-xs text-white/25 mt-1 font-['Inter']">{formatDate(notif.created_at)}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

function getGreeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Bonjour'
  if (h >= 12 && h < 18) return 'Bon après-midi'
  return 'Bonsoir'
}

function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default Dashboard

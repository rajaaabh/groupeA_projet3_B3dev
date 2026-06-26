import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getUser, getSubscriptions, getNotifications, deleteSubscription, updateProfile } from '../services/api'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()

  // On stocke les données dans 3 états séparés
  const [user, setUser] = useState(null)
  const [subscriptions, setSubscriptions] = useState([])
  const [notifications, setNotifications] = useState([])

  // État pour gérer le chargement et les erreurs
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [cancelling, setCancelling] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [profileForm, setProfileForm] = useState({ name: '', password: '', password_confirmation: '' })
  const [profileError, setProfileError] = useState('')
  const [profileSuccess, setProfileSuccess] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)

  // Au chargement de la page, on récupère toutes les données
  useEffect(() => {
    async function fetchData() {
      try {
        // On lance les 3 appels API en parallèle pour aller plus vite
        const [userData, subsData, notifsData] = await Promise.all([
          getUser(),
          getSubscriptions(),
          getNotifications(),
        ])

        // Si l'API retourne une erreur d'auth, on redirige vers le login
        if (userData.message === 'Unauthenticated.') {
          localStorage.removeItem('token')
          navigate('/login')
          return
        }

        setUser(userData)
        setSubscriptions(Array.isArray(subsData) ? subsData : [])
        setNotifications(Array.isArray(notifsData) ? notifsData : [])
      } catch (err) {
        setError('Impossible de charger les données. Vérifiez votre connexion.')
      } finally {
        // Dans tous les cas, on arrête le chargement
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  // Résilier un abonnement
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

  const handleCancel = async (subId) => {
    if (!window.confirm('Confirmer la résiliation de cet abonnement ?')) return
    setCancelling(true)
    try {
      await deleteSubscription(subId)
      setSubscriptions(subscriptions.filter(s => s.id !== subId))
    } catch {
      setError('Impossible de résilier l\'abonnement.')
    } finally {
      setCancelling(false)
    }
  }

  // Pendant le chargement, on affiche un message
  if (loading) {
    return (
      <div className="dashboard-page">
        <Navbar />
        <div className="dash-loading">Chargement de votre espace...</div>
      </div>
    )
  }

  return (
    <div className="dashboard-page page-enter">
      <Navbar />

      {showProfileModal && (
        <div className="profile-modal-overlay" onClick={() => setShowProfileModal(false)}>
          <div className="profile-modal" onClick={e => e.stopPropagation()}>
            <div className="profile-modal-header">
              <h2>Modifier mon profil</h2>
              <button className="profile-modal-close" onClick={() => setShowProfileModal(false)}>✕</button>
            </div>

            {profileSuccess ? (
              <p className="profile-success">Profil mis à jour ✓</p>
            ) : (
              <form onSubmit={handleUpdateProfile} className="profile-modal-form">
                {profileError && <div className="dash-error">{profileError}</div>}

                <div className="profile-field">
                  <label>Nom</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                  />
                </div>

                <div className="profile-field">
                  <label>Nouveau mot de passe <span>(laisser vide pour ne pas changer)</span></label>
                  <input
                    type="password"
                    placeholder="••••••"
                    value={profileForm.password}
                    onChange={e => setProfileForm({ ...profileForm, password: e.target.value })}
                  />
                </div>

                <div className="profile-field">
                  <label>Confirmer le mot de passe</label>
                  <input
                    type="password"
                    placeholder="••••••"
                    value={profileForm.password_confirmation}
                    onChange={e => setProfileForm({ ...profileForm, password_confirmation: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-subscribe" disabled={savingProfile}>
                  {savingProfile ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <div className="dashboard-content">

        {/* Message d'erreur si le fetch a échoué */}
        {error && <div className="dash-error">{error}</div>}

        {/* Titre de bienvenue */}
        <div className="dashboard-welcome">
          <h1>{getGreeting()}, <span>{user?.name}</span></h1>
          <p>Bienvenue dans ton espace membre GymFlow.</p>
        </div>

        {/* Grille : infos utilisateur + abonnements */}
        <div className="dashboard-grid">

          {/* Carte : profil utilisateur */}
          <div className="dash-card">
            <div className="profile-card-header">
              <span className="dash-card-label">Mon profil</span>
              <button className="btn-edit-profile" onClick={openProfileModal}>Modifier</button>
            </div>
            <p className="user-name">{user?.name}</p>
            <p className="user-email">{user?.email}</p>
          </div>

          {/* Carte : abonnements */}
          <div className="dash-card">
            <span className="dash-card-label">Mes abonnements</span>

            {subscriptions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '12px 0 8px' }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🏋️</div>
                <p className="sub-empty">Tu n'as pas encore d'abonnement actif.</p>
                <button className="btn-subscribe" onClick={() => navigate('/abonnements')}>
                  Choisir un abonnement
                </button>
              </div>
            ) : (
              subscriptions.map((sub) => (
                <div key={sub.id} className="sub-item">
                  <p className="sub-item-name">
                    {sub.subscription_type?.nom_type ?? 'Abonnement'}
                  </p>
                  <p className="sub-item-dates">
                    Du {formatDate(sub.date_debut)} au {formatDate(sub.date_fin)}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                    <span className={`sub-status ${sub.statut === 'actif' ? 'active' : 'inactive'}`}>
                      {sub.statut === 'actif' ? 'Actif' : 'Inactif'}
                    </span>
                    <button
                      className="btn-cancel"
                      onClick={() => handleCancel(sub.id)}
                      disabled={cancelling}
                    >
                      Résilier
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Section notifications */}
        <div className="dash-notif-section">
          <span className="dash-card-label">Notifications</span>

          {notifications.length === 0 ? (
            <p className="notif-empty">Aucune notification pour le moment.</p>
          ) : (
            notifications.map((notif) => (
              <div key={notif.id} className="notif-item">
                <div className="notif-dot" />
                <div>
                  <p className="notif-message">{notif.message}</p>
                  <p className="notif-date">{formatDate(notif.created_at)}</p>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

// Retourne le bon salut selon l'heure
function getGreeting() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'Bonjour'
  if (h >= 12 && h < 18) return 'Bon après-midi'
  return 'Bonsoir'
}

// Formate une date ISO en format lisible : "12 juin 2026"
function formatDate(dateString) {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default Dashboard

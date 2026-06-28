import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getSubscriptionTypes } from '../services/api'
import './Abonnements.css'

function Abonnements() {
  const navigate = useNavigate()

  // Fallback affiché uniquement si l'API ne répond pas — les boutons sont désactivés car les IDs n'existent pas en base
  const fallback = [
    { id: null, nom_type: 'MENSUEL',      prix: 9.99,  duree_jours: 30,  description: 'Abonnement mensuel renouvelable chaque mois.' },
    { id: null, nom_type: 'TRIMESTRIEL',  prix: 24.99, duree_jours: 90,  description: 'Abonnement trimestriel avec une réduction de 17%.' },
    { id: null, nom_type: 'ANNUEL',       prix: 89.99, duree_jours: 365, description: 'Abonnement annuel, la meilleure offre avec 25% de réduction.' },
  ]

  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Charger les types d'abonnements disponibles
  useEffect(() => {
    getSubscriptionTypes()
      .then(data => {
        // Si l'API renvoie un tableau non vide on l'utilise, sinon on affiche le fallback
        setTypes(Array.isArray(data) && data.length > 0 ? data : fallback)
        setLoading(false)
      })
      .catch(() => {
        setTypes(fallback)
        setLoading(false)
      })
  }, [])

  // Rediriger vers la page de paiement avec les infos du plan
  const handleSubscribe = (typeId, type) => {
    if (!typeId) return
    navigate('/paiement', {
      state: {
        plan: {
          id: typeId,
          name: type.nom_type,
          price: String(type.prix),
          duration: `${type.duree_jours} jours`,
        },
      },
    })
  }

  return (
    <div className="abonnements-page">
      <Navbar />

      <div className="abonnements-content">

        {/* Retour au dashboard */}
        <button className="abonnements-back" onClick={() => navigate('/dashboard')}>
          ← Retour à mon espace
        </button>

        {/* En-tête */}
        <div className="abonnements-header">
          <span>Rejoins GymFlow</span>
          <h1>Choisis ton abonnement</h1>
          <p>Sans engagement. Résilie quand tu veux.</p>
        </div>

        {/* Message d'erreur */}
        {error && <div className="abonnements-error">{error}</div>}

        {/* Cartes */}
        {loading ? (
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'Inter, sans-serif', fontSize: '14px' }}>
            Chargement...
          </p>
        ) : (
          <div className="abonnements-grid">
            {types.map((type, index) => {
              const isFeatured = index === 1

              return (
                <div key={type.id} className={`abo-card ${isFeatured ? 'featured' : ''}`}>

                  <span className="abo-card-name">{type.nom_type}</span>

                  <div className="abo-card-price">{type.prix}€</div>
                  <span className="abo-card-duration">pour {type.duree_jours} jours</span>

                  <hr className="abo-card-sep" />

                  {type.description && (
                    <p className="abo-card-desc">{type.description}</p>
                  )}

                  <button
                    className={`abo-btn ${isFeatured ? 'abo-btn-featured' : 'abo-btn-default'}`}
                    onClick={() => handleSubscribe(type.id, type)}
                    disabled={!type.id}
                    title={!type.id ? 'Service temporairement indisponible' : ''}
                  >
                    {!type.id ? 'Indisponible' : 'Rejoindre'}
                  </button>

                </div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}

export default Abonnements

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getSubscriptionTypes } from '../services/api'

function Abonnements() {
  const navigate = useNavigate()

  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fallback = [
      { id: null, nom_type: 'MENSUEL',      prix: 9.99,  duree_jours: 30,  description: 'Abonnement mensuel renouvelable chaque mois.' },
      { id: null, nom_type: 'TRIMESTRIEL',  prix: 24.99, duree_jours: 90,  description: 'Abonnement trimestriel avec une réduction de 17%.' },
      { id: null, nom_type: 'ANNUEL',       prix: 89.99, duree_jours: 365, description: 'Abonnement annuel, la meilleure offre avec 25% de réduction.' },
    ]
    getSubscriptionTypes()
      .then(data => {
        setTypes(Array.isArray(data) && data.length > 0 ? data : fallback)
        setLoading(false)
      })
      .catch(() => {
        setError('Impossible de charger les abonnements.')
        setTypes(fallback)
        setLoading(false)
      })
  }, [])

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
    <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-10 md:px-12 md:py-14">

        <button
          className="inline-flex items-center gap-1.5 text-sm text-white/30 mb-10 cursor-pointer bg-transparent border-none hover:text-white transition-colors p-0 font-['Inter']"
          onClick={() => navigate('/dashboard')}
        >
          ← Retour à mon espace
        </button>

        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#FF5500] block mb-3 font-['Inter']">
            Rejoins GymFlow
          </span>
          <h1 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white tracking-wide leading-none mb-3">
            Choisis ton abonnement
          </h1>
          <p className="text-sm text-white/35 font-['Inter']">Sans engagement. Résilie quand tu veux.</p>
        </div>

        {error && (
          <div className="bg-red-500/8 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm mb-8 text-center font-['Inter']">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-center text-sm text-white/30 font-['Inter']">Chargement...</p>
        ) : (
          <div className="flex flex-wrap gap-5 justify-center">
            {types.map((type, index) => {
              const isFeatured = index === 1
              return (
                <div
                  key={type.id ?? type.nom_type}
                  className={`flex-1 min-w-65 max-w-75 flex flex-col rounded-2xl p-8 border transition-all duration-200 ${
                    isFeatured
                      ? 'bg-[#FF5500] border-[#FF5500] scale-[1.04] hover:scale-[1.04] hover:-translate-y-1'
                      : 'bg-[#161616] border-white/6 hover:-translate-y-1 hover:border-[#FF5500]/30'
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-[0.15em] mb-5 block font-['Inter'] ${
                    isFeatured ? 'text-white/70' : 'text-white/40'
                  }`}>
                    {type.nom_type}
                  </span>

                  <div className="font-['Bebas_Neue'] text-6xl text-white leading-none tracking-wide mb-1">
                    {type.prix}€
                  </div>

                  <span className={`text-xs mb-5 block font-['Inter'] ${
                    isFeatured ? 'text-white/60' : 'text-white/30'
                  }`}>
                    pour {type.duree_jours} jours
                  </span>

                  <hr className={`border-t mb-5 ${isFeatured ? 'border-white/20' : 'border-white/[0.07]'}`} />

                  {type.description && (
                    <p className={`text-[13px] leading-relaxed flex-1 mb-7 font-['Inter'] ${
                      isFeatured ? 'text-white/75' : 'text-white/40'
                    }`}>
                      {type.description}
                    </p>
                  )}

                  <button
                    onClick={() => handleSubscribe(type.id, type)}
                    disabled={!type.id}
                    className={`w-full py-3.5 rounded-xl text-sm font-bold border-none cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-['Inter'] ${
                      isFeatured
                        ? 'bg-white text-[#FF5500] hover:bg-gray-100'
                        : 'bg-white/6 text-white border border-white/10 hover:bg-white/12'
                    }`}
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

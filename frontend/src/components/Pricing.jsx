import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubscriptionTypes } from '../services/api'

function Pricing() {
  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getSubscriptionTypes()
      .then(data => {
        setTypes(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleChoose = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/register')
    } else {
      navigate('/dashboard')
    }
  }

  const fallback = [
    { id: 1, nom_type: 'ESSENTIEL', prix: 29, duree_jours: 30, description: 'Accès salle · Vestiaires' },
    { id: 2, nom_type: 'PREMIUM', prix: 49, duree_jours: 30, description: 'Accès illimité · Tous les cours · Coaching personnalisé' },
    { id: 3, nom_type: 'ÉTUDIANT', prix: 19, duree_jours: 30, description: 'Accès hors-pic · Tarif réduit' },
  ]

  const displayTypes = types.length > 0 ? types : fallback

  return (
    <section className="bg-[#0f0f0f] py-24 px-6 md:px-12" id="abonnements">
      <h2 className="font-['Bebas_Neue'] text-5xl text-white text-center tracking-widest mb-14">
        Nos abonnements
      </h2>

      {loading ? (
        <p className="text-center text-white/40 font-['Inter'] text-sm">Chargement...</p>
      ) : (
        <div className="flex flex-wrap gap-5 justify-center max-w-5xl mx-auto">
          {displayTypes.map((type, index) => (
            <div
              key={type.id}
              className={`flex flex-col rounded-2xl p-8 flex-1 min-w-64 max-w-80 border transition-transform
                ${index === 1
                  ? 'bg-[#FF5500] border-[#FF5500] scale-105'
                  : 'bg-[#161616] border-white/5'
                }`}
            >
              <h3 className={`font-['Bebas_Neue'] text-xl tracking-widest mb-6
                ${index === 1 ? 'text-white' : 'text-white/50'}`}>
                {type.nom_type.toUpperCase()}
              </h3>

              <div className="mb-6">
                <span className={`font-['Bebas_Neue'] text-6xl leading-none ${index === 1 ? 'text-white' : 'text-white'}`}>
                  {type.prix} FCFA
                </span>
                <span className={`font-['Inter'] text-xs ml-1 ${index === 1 ? 'text-white/70' : 'text-white/30'}`}>
                  /{type.duree_jours} jours
                </span>
              </div>

              {type.description && (
                <p className={`font-['Inter'] text-sm leading-relaxed mb-8 flex-1
                  ${index === 1 ? 'text-white/80' : 'text-white/40'}`}>
                  {type.description}
                </p>
              )}

              <button
                onClick={handleChoose}
                className={`mt-auto px-6 py-3 rounded-xl font-['Inter'] font-semibold text-sm transition-colors cursor-pointer
                  ${index === 1
                    ? 'bg-white text-[#FF5500] hover:bg-gray-100'
                    : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                  }`}
              >
                Rejoindre
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Pricing

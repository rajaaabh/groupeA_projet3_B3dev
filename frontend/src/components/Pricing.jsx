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
    <section className="bg-[#1A1A2E] py-20 px-12" id="abonnements">
      <h2 className="font-['Bebas_Neue'] text-5xl text-white text-center tracking-widest mb-14">
        NOS ABONNEMENTS
      </h2>

      {loading ? (
        <p className="text-center text-white font-['Inter']">Chargement...</p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center max-w-5xl mx-auto">
          {displayTypes.map((type, index) => (
            <div
              key={type.id}
              className={`flex flex-col items-center rounded-xl p-10 flex-1 min-w-[260px] max-w-[320px] text-center transition-transform
                ${index === 1
                  ? 'bg-[#FF6B35] scale-105'
                  : 'bg-white'
                }`}
            >
              <h3 className={`font-['Bebas_Neue'] text-2xl tracking-wide mb-4
                ${index === 1 ? 'text-white' : 'text-[#1A1A2E]'}`}>
                {type.nom_type.toUpperCase()}
              </h3>

              <div className="mb-6">
               <div className="mb-6">
                <span className={`font-['Bebas_Neue'] text-5xl ${index === 1 ? 'text-white' : 'text-[#FF6B35]'}`}>
                    {type.prix}€
                </span>
                <span className={`font-['Inter'] text-sm ml-1 ${index === 1 ? 'text-white' : 'text-gray-400'}`}>
                    /{type.duree_jours} jours
                </span>
                </div>
              </div>

              {type.description && (
                <p className={`font-['Inter'] text-sm leading-relaxed mb-8
                  ${index === 1 ? 'text-white' : 'text-gray-500'}`}>
                  {type.description}
                </p>
              )}

              <button
                onClick={handleChoose}
                className={`mt-auto px-8 py-2 rounded-md font-['Inter'] font-bold text-sm transition-colors
                  ${index === 1
                    ? 'bg-white text-[#FF6B35] hover:bg-gray-100'
                    : 'border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white'
                  }`}
              >
                Choisir
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Pricing
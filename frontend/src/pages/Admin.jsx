import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubscriptions, getSubscriptionTypes, updateSubscription, deleteSubscription, logout } from '../services/api'

function Admin() {
  const [users, setUsers] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [types, setTypes] = useState([])
  const [activeTab, setActiveTab] = useState('users')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newType, setNewType] = useState({ nom_type: '', duree_jours: '', prix: '', description: '' })
  const navigate = useNavigate()

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem('token')
      const [subsData, typesData, usersData] = await Promise.all([
        getSubscriptions(),
        getSubscriptionTypes(),
        fetch('http://localhost:8000/api/users', {
          headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' }
        }).then(r => r.json()),
      ])
      setSubscriptions(Array.isArray(subsData) ? subsData : [])
      setTypes(Array.isArray(typesData) ? typesData : [])
      setUsers(Array.isArray(usersData) ? usersData : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleUpdateStatut = async (id, statut) => {
    await updateSubscription(id, { statut })
    fetchAll()
  }

  const handleDeleteSubscription = async (id) => {
    if (confirm('Supprimer cet abonnement ?')) {
      await deleteSubscription(id)
      fetchAll()
    }
  }

  const handleCreateType = async () => {
    if (!newType.nom_type || !newType.duree_jours || !newType.prix) return
    try {
      const token = localStorage.getItem('token')
      await fetch('http://localhost:8000/api/subscription-types', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newType,
          duree_jours: parseInt(newType.duree_jours),
          prix: parseFloat(newType.prix),
        })
      })
      setNewType({ nom_type: '', duree_jours: '', prix: '', description: '' })
      setShowModal(false)
      fetchAll()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDeleteType = async (id) => {
    if (confirm('Supprimer ce type ?')) {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:8000/api/subscription-types/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchAll()
    }
  }

  const handleDeleteUser = async (id) => {
    if (confirm('Supprimer cet utilisateur ?')) {
      const token = localStorage.getItem('token')
      await fetch(`http://localhost:8000/api/users/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchAll()
    }
  }

  const tabs = [
    { key: 'users', label: 'Utilisateurs', count: users.length },
    { key: 'subscriptions', label: 'Abonnements', count: subscriptions.length },
    { key: 'types', label: "Types d'abonnement", count: types.length },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#E8E8E8] flex items-center justify-center">
        <div className="text-center">
          <div className="font-['Bebas_Neue'] text-4xl text-[#FF6B35] tracking-widest mb-2">GYMFLOW</div>
          <p className="font-['Inter'] text-gray-500">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#E8E8E8]">

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Bebas_Neue'] text-2xl text-[#1A1A2E] tracking-wide">
                NOUVEAU TYPE
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E8E8E8] text-gray-500 hover:bg-gray-300 transition-colors font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="font-['Inter'] text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Nom du type *
                </label>
                <input
                  type="text"
                  placeholder="Ex: Premium"
                  value={newType.nom_type}
                  onChange={e => setNewType({ ...newType, nom_type: e.target.value })}
                  className="w-full border border-[#E8E8E8] rounded-xl px-4 py-3 font-['Inter'] text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-['Inter'] text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                    Durée (jours) *
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 30"
                    value={newType.duree_jours}
                    onChange={e => setNewType({ ...newType, duree_jours: e.target.value })}
                    className="w-full border border-[#E8E8E8] rounded-xl px-4 py-3 font-['Inter'] text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-['Inter'] text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                    Prix (€) *
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 49"
                    value={newType.prix}
                    onChange={e => setNewType({ ...newType, prix: e.target.value })}
                    className="w-full border border-[#E8E8E8] rounded-xl px-4 py-3 font-['Inter'] text-sm focus:outline-none focus:border-[#FF6B35] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="font-['Inter'] text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 block">
                  Description
                </label>
                <textarea
                  placeholder="Ex: Accès illimité à toutes les salles"
                  value={newType.description}
                  onChange={e => setNewType({ ...newType, description: e.target.value })}
                  rows={3}
                  className="w-full border border-[#E8E8E8] rounded-xl px-4 py-3 font-['Inter'] text-sm focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 border-2 border-[#E8E8E8] text-gray-500 rounded-xl font-['Inter'] font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateType}
                className="flex-1 py-3 bg-[#FF6B35] text-white rounded-xl font-['Inter'] font-semibold text-sm hover:bg-orange-600 transition-colors"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-[#1A1A2E] px-8 py-4 flex items-center justify-between shadow-lg mb-3">
        <div className="flex items-center gap-3">
          <div className="font-['Bebas_Neue'] text-2xl text-white tracking-widest">
            GYM<span className="text-[#FF6B35]">FLOW</span>
          </div>
          <span className=" text-white text-xs font-['Inter'] font-semibold px-2 py-1 ">
            ADMIN
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-[#FF6B35] text-white rounded-lg text-sm font-semibold font-['Inter'] hover:bg-orange-600 transition-colors"
        >
          Déconnexion
        </button>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

       {/* Stats */}
        <div className="flex gap-4 mb-8">
        {[
            { label: 'Utilisateurs', value: users.length, bg: 'bg-[#1A1A2E]', textColor: 'text-white' },
            { label: 'Abonnements', value: subscriptions.length, bg: 'bg-[#FF6B35]', textColor: 'text-white' },
            { label: 'Abonnements actifs', value: subscriptions.filter(s => s.statut === 'actif').length, bg: 'bg-[#4CAF50]', textColor: 'text-[#1A1A2E]' },
        ].map(stat => (
            <div key={stat.label} className={`${stat.bg} rounded-2xl p-6 flex items-center gap-4 flex-1`}>
            <p className={`font-['Bebas_Neue'] text-5xl tracking-wide ${stat.textColor}`}>{stat.value}</p>
            <p className={`font-['Inter'] text-sm font-semibold ${stat.textColor} opacity-90 leading-tight`}>{stat.label}</p>
            </div>
        ))}
        </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
            {tabs.map(tab => (
                <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-3 px-5 py-2 rounded-full font-['Inter'] font-semibold text-sm transition-colors
                    ${activeTab === tab.key
                    ? 'bg-[#FF6B35] text-white shadow-md'
                    : 'bg-white text-[#1A1A2E] hover:bg-orange-50'
                    }`}
                >
                {tab.label}
                <span className={`text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold
                ${activeTab === tab.key ? 'bg-white text-[#FF6B35]' : 'bg-[#E8E8E8] text-gray-500'}`}>
                {tab.count}
                </span>
                </button>
            ))}
            </div>

        {/* Utilisateurs */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-[#E8E8E8]">
              <h2 className="font-['Bebas_Neue'] text-2xl text-[#1A1A2E] tracking-wide">
                GESTION DES UTILISATEURS
              </h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F5F5]">
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-8 w-1/4">Nom</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4 w-1/3">Email</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4 w-1/6">Rôle</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4 w-1/6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E8]">
                {users.map(user => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-['Inter'] font-bold text-sm">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-['Inter'] font-semibold text-sm text-[#1A1A2E]">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-['Inter'] text-sm text-gray-500">{user.email}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-['Inter'] font-semibold
                        ${user.role === 'admin' ? 'bg-[#1A1A2E] text-white' : 'bg-orange-100 text-[#FF6B35]'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {user.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="px-3 py-1 bg-red-50 text-red-500 border border-red-200 rounded-lg text-xs font-['Inter'] font-semibold hover:bg-red-500 hover:text-white transition-colors"
                        >
                          Supprimer
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Abonnements */}
        {activeTab === 'subscriptions' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-[#E8E8E8]">
              <h2 className="font-['Bebas_Neue'] text-2xl text-[#1A1A2E] tracking-wide">
                GESTION DES ABONNEMENTS
              </h2>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F5F5]">
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-8">Utilisateur</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4">Type</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4">Début</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4">Fin</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4">Statut</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E8]">
                {subscriptions.map(sub => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-8">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1A1A2E] flex items-center justify-center text-white font-['Inter'] font-bold text-sm">
                          {sub.user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-['Inter'] font-semibold text-sm text-[#1A1A2E]">{sub.user?.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-['Inter'] text-sm text-gray-500">{sub.subscription_type?.nom_type}</td>
                    <td className="py-4 px-4 font-['Inter'] text-sm text-gray-500">
                      {new Date(sub.date_debut).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-4 font-['Inter'] text-sm text-gray-500">
                      {new Date(sub.date_fin).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={sub.statut}
                        onChange={(e) => handleUpdateStatut(sub.id, e.target.value)}
                        className={`font-['Inter'] text-xs font-semibold border-0 rounded-full px-3 py-1 cursor-pointer
                          ${sub.statut === 'actif'
                            ? 'bg-green-100 text-green-600'
                            : sub.statut === 'expiré'
                            ? 'bg-red-100 text-red-500'
                            : 'bg-gray-100 text-gray-500'
                          }`}
                      >
                        <option value="actif">actif</option>
                        <option value="inactif">inactif</option>
                        <option value="expiré">expiré</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDeleteSubscription(sub.id)}
                        className="px-3 py-1 bg-red-50 text-red-500 border border-red-200 rounded-lg text-xs font-['Inter'] font-semibold hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {subscriptions.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-12 text-center font-['Inter'] text-sm text-gray-400">
                      Aucun abonnement trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Types */}
        {activeTab === 'types' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-8 py-5 border-b border-[#E8E8E8] flex items-center justify-between">
              <h2 className="font-['Bebas_Neue'] text-2xl text-[#1A1A2E] tracking-wide">
                TYPES D'ABONNEMENT
              </h2>
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-2 bg-[#FF6B35] text-white rounded-xl font-['Inter'] font-semibold text-sm hover:bg-orange-600 transition-colors"
              >
                + Nouveau type
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F5F5]">
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-8">Nom</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4">Durée</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4">Prix</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4">Description</th>
                  <th className="font-['Inter'] text-xs font-semibold text-gray-400 uppercase tracking-wider text-left py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E8]">
                {types.map(type => (
                  <tr key={type.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-8 font-['Inter'] font-semibold text-sm text-[#1A1A2E]">{type.nom_type}</td>
                    <td className="py-4 px-4 font-['Inter'] text-sm text-gray-500">{type.duree_jours} jours</td>
                    <td className="py-4 px-4 font-['Bebas_Neue'] text-lg text-[#FF6B35]">{type.prix}€</td>
                    <td className="py-4 px-4 font-['Inter'] text-sm text-gray-500">{type.description || '—'}</td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleDeleteType(type.id)}
                        className="px-3 py-1 bg-red-50 text-red-500 border border-red-200 rounded-lg text-xs font-['Inter'] font-semibold hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
                {types.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-12 text-center font-['Inter'] text-sm text-gray-400">
                      Aucun type trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  )
}

export default Admin
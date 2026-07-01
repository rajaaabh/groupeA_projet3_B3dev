import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getSubscriptions, getSubscriptionTypes, updateSubscription, deleteSubscription, logout } from '../services/api'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:9000'

function Admin() {
  const [users, setUsers] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [types, setTypes] = useState([])
  const [activeTab, setActiveTab] = useState('users')
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newType, setNewType] = useState({ nom_type: '', duree_jours: '', prix: '', description: '' })
  const [confirm, setConfirm] = useState({ open: false, message: '', onConfirm: null })
  const navigate = useNavigate()

  const askConfirm = (message, onConfirm) => setConfirm({ open: true, message, onConfirm })
  const closeConfirm = () => setConfirm({ open: false, message: '', onConfirm: null })

  const fetchAll = async () => {
    try {
      const token = localStorage.getItem('token')
      const [subsData, typesData, usersData] = await Promise.all([
        getSubscriptions(),
        getSubscriptionTypes(),
        fetch(`${BASE}/api/users`, {
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

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchAll() }, [])

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

  const handleDeleteSubscription = (id) => {
    askConfirm('Supprimer cet abonnement ?', async () => {
      await deleteSubscription(id)
      fetchAll()
    })
  }

  const handleCreateType = async () => {
    if (!newType.nom_type || !newType.duree_jours || !newType.prix) return
    try {
      const token = localStorage.getItem('token')
      await fetch(`${BASE}/api/subscription-types`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...newType, duree_jours: parseInt(newType.duree_jours), prix: parseFloat(newType.prix) })
      })
      setNewType({ nom_type: '', duree_jours: '', prix: '', description: '' })
      setShowModal(false)
      fetchAll()
    } catch (err) { console.error(err) }
  }

  const handleDeleteType = (id) => {
    askConfirm("Supprimer ce type d'abonnement ?", async () => {
      const token = localStorage.getItem('token')
      await fetch(`${BASE}/api/subscription-types/${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchAll()
    })
  }

  const handleDeleteUser = (id) => {
    askConfirm('Supprimer cet utilisateur ?', async () => {
      const token = localStorage.getItem('token')
      await fetch(`${BASE}/api/users/${id}`, {
        method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` }
      })
      fetchAll()
    })
  }

  const tabs = [
    { key: 'users', label: 'Utilisateurs', count: users.length },
    { key: 'subscriptions', label: 'Abonnements', count: subscriptions.length },
    { key: 'types', label: "Types", count: types.length },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="font-['Bebas_Neue'] text-4xl text-[#FF5500] tracking-widest mb-2">GYMFLOW</div>
          <p className="font-['Inter'] text-white/30 text-sm">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* Modal confirmation */}
      {confirm.open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-sm p-6 md:p-8">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
              <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <h3 className="font-['Bebas_Neue'] text-2xl text-white text-center tracking-wide mb-2">Confirmation</h3>
            <p className="font-['Inter'] text-sm text-white/45 text-center mb-8 leading-relaxed">{confirm.message}</p>
            <div className="flex gap-3">
              <button onClick={closeConfirm} className="flex-1 py-3 bg-white/5 border border-white/10 text-white/60 rounded-xl font-['Inter'] font-semibold text-sm hover:bg-white/10 transition-colors">
                Annuler
              </button>
              <button onClick={() => { confirm.onConfirm(); closeConfirm() }} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-['Inter'] font-semibold text-sm hover:bg-red-600 transition-colors">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal création type */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="bg-[#111111] border border-white/10 rounded-2xl w-full max-w-md p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">Nouveau type</h2>
              <button onClick={() => setShowModal(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white/50 hover:bg-white/10 transition-colors">✕</button>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <label className="font-['Inter'] text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Nom du type *</label>
                <input type="text" placeholder="Ex: Premium" value={newType.nom_type} onChange={e => setNewType({ ...newType, nom_type: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-['Inter'] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF5500] transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-['Inter'] text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Durée (jours) *</label>
                  <input type="number" placeholder="30" value={newType.duree_jours} onChange={e => setNewType({ ...newType, duree_jours: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-['Inter'] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF5500] transition-colors" />
                </div>
                <div>
                  <label className="font-['Inter'] text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Prix (FCFA) *</label>
                  <input type="number" placeholder="49" value={newType.prix} onChange={e => setNewType({ ...newType, prix: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-['Inter'] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF5500] transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-['Inter'] text-xs font-semibold text-white/40 uppercase tracking-wider mb-1.5 block">Description</label>
                <textarea placeholder="Ex: Accès illimité à toutes les salles" value={newType.description} onChange={e => setNewType({ ...newType, description: e.target.value })} rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-['Inter'] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#FF5500] transition-colors resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 bg-white/5 border border-white/10 text-white/60 rounded-xl font-['Inter'] font-semibold text-sm hover:bg-white/10 transition-colors">Annuler</button>
              <button onClick={handleCreateType} className="flex-1 py-3 bg-[#FF5500] text-white rounded-xl font-['Inter'] font-semibold text-sm hover:bg-orange-600 transition-colors">Créer</button>
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-[#0a0a0a] border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-3">
          <span className="font-['Bebas_Neue'] text-xl text-white tracking-widest">
            GYM<span className="text-[#FF5500]">FLOW</span>
          </span>
          <span className="text-[#FF5500] font-['Inter'] text-xs font-semibold uppercase tracking-widest border border-[#FF5500]/30 px-2 py-0.5 rounded-full">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={() => navigate('/')} className="px-3 md:px-5 py-2 bg-white/5 border border-white/10 text-white/60 rounded-full text-sm font-semibold font-['Inter'] hover:bg-white/10 transition-colors">
            Accueil
          </button>
          <button onClick={handleLogout} className="px-3 md:px-5 py-2 bg-white/5 border border-white/10 text-white/60 rounded-full text-sm font-semibold font-['Inter'] hover:bg-white/10 transition-colors">
            Déconnexion
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8">
          {[
            { label: 'Utilisateurs', value: users.length, color: 'text-white' },
            { label: 'Abonnements', value: subscriptions.length, color: 'text-[#FF5500]' },
            { label: 'Abonnements actifs', value: subscriptions.filter(s => s.statut === 'actif').length, color: 'text-green-400' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#111111] border border-white/5 rounded-2xl p-5 md:p-6 flex items-center gap-4">
              <p className={`font-['Bebas_Neue'] text-5xl tracking-wide ${stat.color}`}>{stat.value}</p>
              <p className="font-['Inter'] text-sm text-white/40 leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-5 md:mb-6">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 md:px-5 py-2 rounded-full font-['Inter'] font-semibold text-sm transition-colors
                ${activeTab === tab.key ? 'bg-[#FF5500] text-white' : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10'}`}>
              {tab.label}
              <span className={`text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold
                ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-white/5 text-white/30'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Utilisateurs */}
        {activeTab === 'users' && (
          <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
            <div className="px-5 md:px-8 py-5 border-b border-white/5">
              <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">Gestion des utilisateurs</h2>
            </div>

            {/* Table desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-8">Nom</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Email</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Rôle</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map(user => (
                    <tr key={user.id} className="hover:bg-white/2 transition-colors">
                      <td className="py-4 px-8">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#FF5500] flex items-center justify-center text-white font-bold text-sm shrink-0">{user.name.charAt(0).toUpperCase()}</div>
                          <span className="font-['Inter'] font-semibold text-sm text-white">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-['Inter'] text-sm text-white/40">{user.email}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-['Inter'] font-semibold ${user.role === 'admin' ? 'bg-[#FF5500]/15 text-[#FF5500] border border-[#FF5500]/20' : 'bg-white/5 text-white/40 border border-white/10'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {user.role !== 'admin' && (
                          <button onClick={() => handleDeleteUser(user.id)} className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-['Inter'] font-semibold hover:bg-red-500/20 transition-colors">
                            Supprimer
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards mobile */}
            <div className="md:hidden divide-y divide-white/5">
              {users.map(user => (
                <div key={user.id} className="p-5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#FF5500] flex items-center justify-center text-white font-bold text-sm shrink-0">{user.name.charAt(0).toUpperCase()}</div>
                    <div className="min-w-0">
                      <p className="font-['Inter'] font-semibold text-sm text-white truncate">{user.name}</p>
                      <p className="font-['Inter'] text-xs text-white/35 truncate">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-['Inter'] font-semibold ${user.role === 'admin' ? 'bg-[#FF5500]/15 text-[#FF5500]' : 'bg-white/5 text-white/40'}`}>
                      {user.role}
                    </span>
                    {user.role !== 'admin' && (
                      <button onClick={() => handleDeleteUser(user.id)} className="px-3 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-['Inter'] font-semibold">
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Abonnements */}
        {activeTab === 'subscriptions' && (
          <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
            <div className="px-5 md:px-8 py-5 border-b border-white/5">
              <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">Gestion des abonnements</h2>
            </div>

            {/* Table desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-8">Utilisateur</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Type</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Début</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Fin</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Statut</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {subscriptions.map(sub => (
                    <tr key={sub.id} className="hover:bg-white/2 transition-colors">
                      <td className="py-4 px-8">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm shrink-0">{sub.user?.name?.charAt(0).toUpperCase()}</div>
                          <span className="font-['Inter'] font-semibold text-sm text-white">{sub.user?.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-['Inter'] text-sm text-white/40">{sub.subscription_type?.nom_type}</td>
                      <td className="py-4 px-4 font-['Inter'] text-sm text-white/40">{new Date(sub.date_debut).toLocaleDateString('fr-FR')}</td>
                      <td className="py-4 px-4 font-['Inter'] text-sm text-white/40">{new Date(sub.date_fin).toLocaleDateString('fr-FR')}</td>
                      <td className="py-4 px-4">
                        <select value={sub.statut} onChange={e => handleUpdateStatut(sub.id, e.target.value)}
                          className={`font-['Inter'] text-xs font-semibold border rounded-full px-3 py-1 cursor-pointer bg-transparent
                            ${sub.statut === 'actif' ? 'border-green-500/30 text-green-400 bg-green-500/10' : sub.statut === 'expiré' ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-white/10 text-white/40 bg-white/5'}`}>
                          <option value="actif">actif</option>
                          <option value="inactif">inactif</option>
                          <option value="expiré">expiré</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <button onClick={() => handleDeleteSubscription(sub.id)} className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-['Inter'] font-semibold hover:bg-red-500/20 transition-colors">
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  {subscriptions.length === 0 && (
                    <tr><td colSpan="6" className="py-12 text-center font-['Inter'] text-sm text-white/20">Aucun abonnement trouvé.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Cards mobile */}
            <div className="md:hidden divide-y divide-white/5">
              {subscriptions.length === 0 && <p className="p-6 text-center font-['Inter'] text-sm text-white/20">Aucun abonnement trouvé.</p>}
              {subscriptions.map(sub => (
                <div key={sub.id} className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm shrink-0">{sub.user?.name?.charAt(0).toUpperCase()}</div>
                      <span className="font-['Inter'] font-semibold text-sm text-white">{sub.user?.name}</span>
                    </div>
                    <button onClick={() => handleDeleteSubscription(sub.id)} className="px-3 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-['Inter'] font-semibold">✕</button>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="font-['Inter'] text-xs text-white/40">{sub.subscription_type?.nom_type}</span>
                    <span className="text-white/15">·</span>
                    <span className="font-['Inter'] text-xs text-white/40">{new Date(sub.date_debut).toLocaleDateString('fr-FR')} → {new Date(sub.date_fin).toLocaleDateString('fr-FR')}</span>
                    <select value={sub.statut} onChange={e => handleUpdateStatut(sub.id, e.target.value)}
                      className={`font-['Inter'] text-xs font-semibold border rounded-full px-3 py-1.5 cursor-pointer bg-transparent ml-auto
                        ${sub.statut === 'actif' ? 'border-green-500/30 text-green-400 bg-green-500/10' : sub.statut === 'expiré' ? 'border-red-500/30 text-red-400 bg-red-500/10' : 'border-white/10 text-white/40 bg-white/5'}`}>
                      <option value="actif">actif</option>
                      <option value="inactif">inactif</option>
                      <option value="expiré">expiré</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Types */}
        {activeTab === 'types' && (
          <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
            <div className="px-5 md:px-8 py-5 border-b border-white/5 flex items-center justify-between gap-3">
              <h2 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide">Types d'abonnement</h2>
              <button onClick={() => setShowModal(true)} className="px-4 md:px-5 py-2 bg-[#FF5500] text-white rounded-xl font-['Inter'] font-semibold text-sm hover:bg-orange-600 transition-colors whitespace-nowrap">
                + Nouveau
              </button>
            </div>

            {/* Table desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-8">Nom</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Durée</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Prix</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Description</th>
                    <th className="font-['Inter'] text-xs font-semibold text-white/25 uppercase tracking-wider text-left py-4 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {types.map(type => (
                    <tr key={type.id} className="hover:bg-white/2 transition-colors">
                      <td className="py-4 px-8 font-['Inter'] font-semibold text-sm text-white">{type.nom_type}</td>
                      <td className="py-4 px-4 font-['Inter'] text-sm text-white/40">{type.duree_jours} jours</td>
                      <td className="py-4 px-4 font-['Bebas_Neue'] text-lg text-[#FF5500]">{type.prix} FCFA</td>
                      <td className="py-4 px-4 font-['Inter'] text-sm text-white/40">{type.description || '—'}</td>
                      <td className="py-4 px-4">
                        <button onClick={() => handleDeleteType(type.id)} className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-['Inter'] font-semibold hover:bg-red-500/20 transition-colors">
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                  {types.length === 0 && <tr><td colSpan="5" className="py-12 text-center font-['Inter'] text-sm text-white/20">Aucun type trouvé.</td></tr>}
                </tbody>
              </table>
            </div>

            {/* Cards mobile */}
            <div className="md:hidden divide-y divide-white/5">
              {types.length === 0 && <p className="p-6 text-center font-['Inter'] text-sm text-white/20">Aucun type trouvé.</p>}
              {types.map(type => (
                <div key={type.id} className="p-5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-['Inter'] font-semibold text-sm text-white mb-1">{type.nom_type}</p>
                    <p className="font-['Inter'] text-xs text-white/35">{type.duree_jours} jours · <span className="text-[#FF5500] font-['Bebas_Neue'] text-sm">{type.prix} FCFA</span></p>
                    {type.description && <p className="font-['Inter'] text-xs text-white/25 mt-0.5 truncate">{type.description}</p>}
                  </div>
                  <button onClick={() => handleDeleteType(type.id)} className="px-3 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-xs font-['Inter'] font-semibold shrink-0">✕</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default Admin
